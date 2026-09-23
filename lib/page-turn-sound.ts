"use client";

// Real page-flip recordings from Kenney's "RPG Audio" pack (CC0, public domain),
// see public/sounds/LICENSE-kenney-rpg-audio.txt. Decoded once into Web Audio
// buffers so each turn plays instantly, with a slight random pitch so repeated
// flips don't sound identical.

const SOUND_URLS = ["/sounds/page-flip-1.mp3", "/sounds/page-flip-2.mp3"];

let context: AudioContext | null = null;
let buffers: Promise<AudioBuffer[]> | null = null;
let lastPlayed = -1;

function getContext() {
  if (context) return context;
  const AudioContextClass =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;
  context = new AudioContextClass();
  return context;
}

function loadBuffers(ctx: AudioContext) {
  buffers ??= Promise.all(
    SOUND_URLS.map(async (url) => {
      const response = await fetch(url);
      return ctx.decodeAudioData(await response.arrayBuffer());
    })
  ).catch(() => {
    buffers = null;
    return [];
  });
  return buffers;
}

export function preloadPageTurn() {
  try {
    const ctx = getContext();
    if (ctx) void loadBuffers(ctx);
  } catch {
    // audio unavailable
  }
}

export async function playPageTurn(volume = 0.8) {
  try {
    const ctx = getContext();
    if (!ctx) return;
    if (ctx.state === "suspended") void ctx.resume();

    const loaded = await loadBuffers(ctx);
    if (loaded.length === 0) return;

    // Avoid playing the same recording twice in a row.
    let pick = Math.floor(Math.random() * loaded.length);
    if (pick === lastPlayed && loaded.length > 1) pick = (pick + 1) % loaded.length;
    lastPlayed = pick;

    const source = ctx.createBufferSource();
    source.buffer = loaded[pick];
    source.playbackRate.value = 0.94 + Math.random() * 0.12;
    const gain = ctx.createGain();
    gain.gain.value = volume;
    source.connect(gain).connect(ctx.destination);
    source.start();
  } catch {
    // audio unavailable, stay silent
  }
}
