"use client";

import type { SpeechStatus } from "@/lib/use-speech";

const RATES = [0.75, 1, 1.25, 1.5, 1.75, 2];

const selectClass =
  "h-9 rounded-full border border-black/10 bg-white px-3 text-sm font-medium text-zinc-600 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300";

export function ListenControls({
  accent,
  supported,
  disabled,
  status,
  onToggle,
  onStop,
  rate,
  onRateChange,
  voices,
  voiceURI,
  onVoiceChange,
  autoAdvance,
  onAutoAdvanceChange,
  pageSound,
  onPageSoundChange,
}: {
  accent: string;
  supported: boolean;
  disabled: boolean;
  status: SpeechStatus;
  onToggle: () => void;
  onStop: () => void;
  rate: number;
  onRateChange: (rate: number) => void;
  voices: SpeechSynthesisVoice[];
  voiceURI: string;
  onVoiceChange: (voiceURI: string) => void;
  autoAdvance: boolean;
  onAutoAdvanceChange: (value: boolean) => void;
  pageSound: boolean;
  onPageSoundChange: (value: boolean) => void;
}) {
  const label = status === "playing" ? "Pause" : status === "paused" ? "Resume" : "Listen";

  return (
    <div className="mb-3 flex shrink-0 flex-wrap items-center gap-2">
      {supported && (
        <>
          <button
            type="button"
            onClick={onToggle}
            disabled={disabled}
            aria-label={`${label} to this slide`}
            className="inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-sm font-semibold shadow-sm transition-transform hover:scale-[1.03] active:scale-100 disabled:cursor-not-allowed disabled:opacity-40"
            style={{ backgroundColor: accent, color: "#1c1917" }}
          >
            {status === "playing" ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path d="M6.3 2.84A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.27l9.344-5.891a1.5 1.5 0 000-2.538L6.3 2.841z" />
              </svg>
            )}
            {label}
          </button>

          {status !== "idle" && (
            <button
              type="button"
              onClick={onStop}
              aria-label="Stop reading"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                <rect x="4" y="4" width="12" height="12" rx="1.5" />
              </svg>
            </button>
          )}

          <select
            value={rate}
            onChange={(event) => onRateChange(Number(event.target.value))}
            aria-label="Reading speed"
            className={selectClass}
          >
            {RATES.map((value) => (
              <option key={value} value={value}>
                {value}×
              </option>
            ))}
          </select>

          {voices.length > 0 && (
            <select
              value={voiceURI}
              onChange={(event) => onVoiceChange(event.target.value)}
              aria-label="Voice"
              className={`${selectClass} hidden max-w-56 sm:block`}
            >
              {voices.map((voice) => (
                <option key={voice.voiceURI} value={voice.voiceURI}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          )}

          <label className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border border-black/10 px-3 text-sm font-medium text-zinc-600 select-none dark:border-white/10 dark:text-zinc-300">
            <input
              type="checkbox"
              checked={autoAdvance}
              onChange={(event) => onAutoAdvanceChange(event.target.checked)}
              className="h-3.5 w-3.5"
              style={{ accentColor: accent }}
            />
            Auto-turn
          </label>
        </>
      )}

      <button
        type="button"
        onClick={() => onPageSoundChange(!pageSound)}
        aria-label={pageSound ? "Mute page turn sound" : "Unmute page turn sound"}
        title={pageSound ? "Page turn sound on" : "Page turn sound off"}
        className="ml-auto flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        {pageSound ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4.5 w-4.5">
            <path d="M10.5 3.75a.75.75 0 00-1.264-.546L5.203 7H2.667a.75.75 0 00-.7.48A6.985 6.985 0 001.5 10c0 .887.165 1.737.468 2.52.111.29.39.48.7.48h2.535l4.033 3.796a.75.75 0 001.264-.546V3.75zM16.45 5.05a.75.75 0 00-1.06 1.061 5.5 5.5 0 010 7.778.75.75 0 001.06 1.06 7 7 0 000-9.899z" />
            <path d="M14.329 7.172a.75.75 0 00-1.061 1.06 2.5 2.5 0 010 3.536.75.75 0 001.06 1.06 4 4 0 000-5.656z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4.5 w-4.5">
            <path d="M10.047 3.062a.75.75 0 01.453.688v12.5a.75.75 0 01-1.264.546L5.203 13H2.667a.75.75 0 01-.7-.48A6.985 6.985 0 011.5 10c0-.887.165-1.737.468-2.52a.75.75 0 01.7-.48h2.535l4.033-3.796a.75.75 0 01.811-.142zM13.78 7.22a.75.75 0 10-1.06 1.06L14.44 10l-1.72 1.72a.75.75 0 001.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L16.56 10l1.72-1.72a.75.75 0 00-1.06-1.06l-1.72 1.72-1.72-1.72z" />
          </svg>
        )}
      </button>
    </div>
  );
}
