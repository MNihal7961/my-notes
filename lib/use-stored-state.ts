"use client";

import { useCallback, useSyncExternalStore } from "react";

type Stored = string | number | boolean;

const listeners = new Set<() => void>();
// Keeps settings working for the session when localStorage is unavailable.
const memory = new Map<string, string>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function read(key: string): string | null {
  try {
    const value = localStorage.getItem(key);
    if (value !== null) return value;
  } catch {
    // storage unavailable, fall back to memory
  }
  return memory.get(key) ?? null;
}

export function useStoredState<T extends Stored>(key: string, fallback: NoInfer<T>) {
  const raw = useSyncExternalStore(
    subscribe,
    () => read(key),
    () => null
  );

  let value: T = fallback;
  if (raw !== null) {
    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed === typeof fallback) value = parsed;
    } catch {
      // corrupted value, use fallback
    }
  }

  const setValue = useCallback(
    (next: T) => {
      const serialized = JSON.stringify(next);
      memory.set(key, serialized);
      try {
        localStorage.setItem(key, serialized);
      } catch {
        // storage unavailable, memory copy is enough
      }
      listeners.forEach((listener) => listener());
    },
    [key]
  );

  return [value, setValue] as const;
}
