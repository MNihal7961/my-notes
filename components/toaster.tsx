"use client";

import { Toaster as SonnerToaster } from "sonner";
import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return false;
}

export function Toaster() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <SonnerToaster
      theme={isDark ? "dark" : "light"}
      position="top-right"
      richColors
      closeButton
    />
  );
}
