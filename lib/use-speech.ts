"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

export type SpeechStatus = "idle" | "playing" | "paused";
export type SpeechPosition = { line: number; char: number };

// One sentence of a line, spoken as its own utterance (short utterances also
// dodge Chrome's ~15s cutoff). `pauseAfter` is the breath taken before the next one.
type Chunk = { line: number; offset: number; text: string; pauseAfter: number };

// Rough speaking pace at rate 1, used to move the highlight for voices that
// never fire word-boundary events (e.g. Chrome's network "Google" voices).
const CHARS_PER_SECOND = 14.5;

// Pauses (ms at 1× speed) that mimic how a person reads notes aloud.
const PAUSE_AFTER_TITLE = 750;
const PAUSE_AFTER_LABEL = 450;
const PAUSE_AFTER_LINE = 380;
const PAUSE_AFTER_SENTENCE = 240;
const PAUSE_AFTER_CLAUSE = 140;

const EMPTY_VOICES: SpeechSynthesisVoice[] = [];
let cachedVoices: SpeechSynthesisVoice[] = EMPTY_VOICES;

function isSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function subscribeVoices(callback: () => void) {
  if (!isSupported()) return () => {};
  const update = () => {
    cachedVoices = window.speechSynthesis.getVoices();
    callback();
  };
  window.speechSynthesis.addEventListener("voiceschanged", update);
  return () => window.speechSynthesis.removeEventListener("voiceschanged", update);
}

function getVoicesSnapshot() {
  if (cachedVoices.length === 0 && isSupported()) {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) cachedVoices = voices;
  }
  return cachedVoices;
}

function getServerVoices() {
  return EMPTY_VOICES;
}

function voiceScore(voice: SpeechSynthesisVoice) {
  let score = 0;
  if (/natural|neural|premium|enhanced/i.test(voice.name)) score += 8;
  if (/^en[-_]US/i.test(voice.lang)) score += 3;
  else if (/^en[-_](GB|IN|AU|CA|IE)/i.test(voice.lang)) score += 2;
  if (/samantha|daniel|karen|moira|aria|jenny|guy|google/i.test(voice.name)) score += 1;
  if (/novelty|whisper|bells|bahh|boing|bubbles|cellos|zarvox|trinoids|organ|jester|wobble|bad news|good news|superstar|albert|fred|junior|ralph|kathy/i.test(voice.name)) score -= 20;
  return score;
}

// English voices, most human-sounding first.
export function rankVoices(voices: SpeechSynthesisVoice[]) {
  const english = voices.filter((voice) => /^en/i.test(voice.lang));
  const pool = english.length > 0 ? english : voices;
  return [...pool].sort((a, b) => voiceScore(b) - voiceScore(a) || a.name.localeCompare(b.name));
}

// Splits on sentence punctuation followed by a space, so "Node.js" or "e.g." stay intact.
const SENTENCE_PATTERN = /.+?(?:[.!?;]+(?=\s|$)|$)\s*/g;
const ABBREVIATION = /\b(e\.g|i\.e|etc|vs|approx)\.$/i;

function toChunks(lines: string[]): Chunk[] {
  const chunks: Chunk[] = [];
  lines.forEach((text, line) => {
    if (!text?.trim()) return;
    const sentences: { index: number; text: string }[] = [];
    for (const match of text.matchAll(SENTENCE_PATTERN)) {
      const previous = sentences[sentences.length - 1];
      if (previous && ABBREVIATION.test(previous.text.trim())) previous.text += match[0];
      else if (match[0].trim()) sentences.push({ index: match.index, text: match[0] });
    }
    sentences.forEach((match, i) => {
      const sentence = match.text;
      const trimmed = sentence.trim();
      let pauseAfter: number;
      if (i < sentences.length - 1) {
        pauseAfter = trimmed.endsWith(";") ? PAUSE_AFTER_CLAUSE : PAUSE_AFTER_SENTENCE;
      } else if (line === 0) {
        pauseAfter = PAUSE_AFTER_TITLE;
      } else if (trimmed.endsWith(":")) {
        pauseAfter = PAUSE_AFTER_LABEL;
      } else {
        pauseAfter = PAUSE_AFTER_LINE;
      }
      chunks.push({ line, offset: match.index, text: sentence, pauseAfter });
    });
  });
  return chunks;
}

// Scales a pause to the reading speed with a little jitter, so the rhythm isn't metronomic.
function humanPause(ms: number, rate: number) {
  return (ms / rate) * (0.85 + Math.random() * 0.3);
}

type Options = {
  voice: SpeechSynthesisVoice | null;
  rate: number;
  onComplete?: () => void;
};

export function useVoices() {
  return useSyncExternalStore(subscribeVoices, getVoicesSnapshot, getServerVoices);
}

export function useSpeech({ voice, rate, onComplete }: Options) {
  const supported = useSyncExternalStore(subscribeVoices, isSupported, () => false);
  const [status, setStatus] = useState<SpeechStatus>("idle");
  const [position, setPosition] = useState<SpeechPosition | null>(null);

  const optionsRef = useRef({ voice, rate, onComplete });
  const generationRef = useRef(0);
  const statusRef = useRef<SpeechStatus>("idle");
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<number | undefined>(undefined);
  const gapTimerRef = useRef<number | undefined>(undefined);
  // Continuation saved when the user pauses during the gap between sentences.
  const pendingRef = useRef<(() => void) | null>(null);
  const boundaryVoicesRef = useRef(new Set<string>());

  useEffect(() => {
    optionsRef.current = { voice, rate, onComplete };
  }, [voice, rate, onComplete]);

  const updateStatus = useCallback((next: SpeechStatus) => {
    statusRef.current = next;
    setStatus(next);
  }, []);

  const clearTimer = useCallback(() => {
    window.clearInterval(timerRef.current);
    timerRef.current = undefined;
  }, []);

  const speakChunk = useCallback(
    function speakChunk(generation: number, chunks: Chunk[], index: number) {
      if (generation !== generationRef.current) return;

      if (index >= chunks.length) {
        utteranceRef.current = null;
        updateStatus("idle");
        setPosition(null);
        optionsRef.current.onComplete?.();
        return;
      }

      const chunk = chunks[index];
      const { voice: currentVoice, rate: currentRate } = optionsRef.current;
      const utterance = new SpeechSynthesisUtterance(chunk.text);
      if (currentVoice) {
        utterance.voice = currentVoice;
        utterance.lang = currentVoice.lang;
      }
      utterance.rate = currentRate;
      const voiceKey = currentVoice?.voiceURI ?? "default";

      utterance.onstart = () => {
        if (generation !== generationRef.current) return;
        setPosition({ line: chunk.line, char: chunk.offset });
        if (boundaryVoicesRef.current.has(voiceKey)) return;

        // Fallback: estimate the spoken word from elapsed time until (unless)
        // the voice proves it reports real word boundaries.
        let elapsed = 0;
        let lastTick = performance.now();
        clearTimer();
        timerRef.current = window.setInterval(() => {
          const now = performance.now();
          if (statusRef.current === "playing") elapsed += now - lastTick;
          lastTick = now;
          const char = Math.min(
            Math.floor((elapsed / 1000) * CHARS_PER_SECOND * currentRate),
            chunk.text.length - 1
          );
          setPosition({ line: chunk.line, char: chunk.offset + char });
        }, 90);
      };

      utterance.onboundary = (event) => {
        if (generation !== generationRef.current) return;
        if (event.name && event.name !== "word") return;
        boundaryVoicesRef.current.add(voiceKey);
        clearTimer();
        setPosition({ line: chunk.line, char: chunk.offset + event.charIndex });
      };

      utterance.onend = () => {
        clearTimer();
        if (generation !== generationRef.current) return;
        const next = () => speakChunk(generation, chunks, index + 1);
        if (index === chunks.length - 1) {
          next();
          return;
        }
        gapTimerRef.current = window.setTimeout(() => {
          if (generation !== generationRef.current) return;
          if (statusRef.current === "paused") pendingRef.current = next;
          else next();
        }, humanPause(chunk.pauseAfter, currentRate));
      };

      utterance.onerror = (event) => {
        clearTimer();
        if (generation !== generationRef.current) return;
        if (event.error === "interrupted" || event.error === "canceled") return;
        speakChunk(generation, chunks, index + 1);
      };

      // Holding a reference stops Chrome from garbage-collecting the utterance mid-speech.
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [clearTimer, updateStatus]
  );

  const cancelSynth = useCallback(() => {
    clearTimer();
    window.clearTimeout(gapTimerRef.current);
    pendingRef.current = null;
    utteranceRef.current = null;
    const synth = window.speechSynthesis;
    if (synth.paused) synth.resume();
    synth.cancel();
  }, [clearTimer]);

  const play = useCallback(
    (lines: string[]) => {
      if (!isSupported()) return;
      const generation = ++generationRef.current;
      cancelSynth();
      updateStatus("playing");
      // Speaking immediately after cancel() is dropped by some browsers.
      window.setTimeout(() => speakChunk(generation, toChunks(lines), 0), 60);
    },
    [cancelSynth, speakChunk, updateStatus]
  );

  const pause = useCallback(() => {
    if (!isSupported() || statusRef.current !== "playing") return;
    window.speechSynthesis.pause();
    updateStatus("paused");
  }, [updateStatus]);

  const resume = useCallback(() => {
    if (!isSupported() || statusRef.current !== "paused") return;
    updateStatus("playing");
    const pending = pendingRef.current;
    pendingRef.current = null;
    if (pending) pending();
    else window.speechSynthesis.resume();
  }, [updateStatus]);

  const stop = useCallback(() => {
    if (!isSupported()) return;
    generationRef.current++;
    cancelSynth();
    updateStatus("idle");
    setPosition(null);
  }, [cancelSynth, updateStatus]);

  useEffect(() => {
    return () => {
      generationRef.current++;
      if (isSupported()) window.speechSynthesis.cancel();
      window.clearInterval(timerRef.current);
      window.clearTimeout(gapTimerRef.current);
    };
  }, []);

  return { supported, status, position, play, pause, resume, stop };
}
