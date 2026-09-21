"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Note } from "@/lib/types";
import { SlideContent } from "@/components/slide-content";
import { CodeBlock } from "@/components/code-block";
import { ThemeToggle } from "@/components/theme-toggle";

export function SlideDeck({ note, initialIndex = 0 }: { note: Note; initialIndex?: number }) {
  const total = note.slides.length;
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isComplete = index >= total;
  const progress = Math.min(((index + (isComplete ? 0 : 0)) / total) * 100, 100);

  const goTo = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      setIndex(Math.max(0, Math.min(next, total)));
    },
    [index, total]
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") goTo(index + 1);
      if (event.key === "ArrowLeft") goTo(index - 1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, goTo]);

  const accentStyle = useMemo(
    () => ({ "--note-accent": note.accent }) as CSSProperties,
    [note.accent]
  );

  const slide = !isComplete ? note.slides[index] : null;

  return (
    <div className="flex flex-1 flex-col" style={accentStyle}>
      <div className="sticky top-0 z-30 border-b border-black/5 bg-white/90 backdrop-blur-md dark:border-white/10 dark:bg-zinc-950/90">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href={`/notes/${note.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path
                fillRule="evenodd"
                d="M17 10a.75.75 0 01-.75.75H6.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L6.612 9.25H16.25A.75.75 0 0117 10z"
                clipRule="evenodd"
              />
            </svg>
            Exit
          </Link>

          <span className="hidden truncate text-sm font-semibold text-zinc-800 sm:inline dark:text-zinc-200">
            {note.title}
          </span>

          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {isComplete ? total : index + 1} / {total}
            </span>
            <button
              type="button"
              onClick={() => setSidebarOpen((open) => !open)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 lg:hidden dark:border-white/10 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Topics
            </button>
            <ThemeToggle />
          </div>
        </div>
        <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-800">
          <div
            className="h-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%`, backgroundColor: note.accent }}
          />
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-xl border border-black/5 bg-white p-2 dark:border-white/10 dark:bg-zinc-900">
            {note.slides.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => goTo(i)}
                className={`flex w-full items-start gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  i === index && !isComplete
                    ? "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                    : "text-zinc-500 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800/60"
                }`}
              >
                <span className="mt-0.5 w-5 shrink-0 text-xs tabular-nums text-zinc-400">
                  {i + 1}
                </span>
                <span className="line-clamp-2">{s.title}</span>
              </button>
            ))}
          </div>
        </aside>

        {sidebarOpen && (
          <div className="fixed inset-0 z-40 flex lg:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative ml-auto flex h-full w-72 flex-col overflow-y-auto bg-white p-3 shadow-xl dark:bg-zinc-900">
              <div className="mb-2 flex items-center justify-between px-1">
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  Topics
                </span>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-md p-1 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
              </div>
              {note.slides.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => {
                    goTo(i);
                    setSidebarOpen(false);
                  }}
                  className={`flex w-full items-start gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    i === index && !isComplete
                      ? "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                      : "text-zinc-500 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800/60"
                  }`}
                >
                  <span className="mt-0.5 w-5 shrink-0 text-xs tabular-nums text-zinc-400">
                    {i + 1}
                  </span>
                  <span>{s.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col" style={{ perspective: 2000 }}>
          <AnimatePresence mode="wait" initial={false}>
            {isComplete ? (
              <motion.div
                key="complete"
                initial={{ opacity: 0, rotateY: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: direction > 0 ? -100 : 100 }}
                transition={{ duration: 0.45, ease: [0.45, 0.05, 0.25, 1] }}
                style={{
                  transformOrigin: direction > 0 ? "left center" : "right center",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
                className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-black/5 bg-white px-6 py-20 text-center shadow-xl dark:border-white/10 dark:bg-zinc-900"
              >
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full text-3xl"
                  style={{ backgroundColor: `${note.accent}33` }}
                >
                  🎉
                </div>
                <h2 className="mt-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                  You&apos;ve finished {note.title}
                </h2>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  You went through all {total} slides. Revisit any topic from
                  the sidebar, or head back to the note overview.
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => goTo(0)}
                    className="rounded-full border border-black/10 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  >
                    Restart
                  </button>
                  <Link
                    href={`/notes/${note.slug}`}
                    className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                  >
                    Back to overview
                  </Link>
                </div>
              </motion.div>
            ) : (
              slide && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, rotateY: direction > 0 ? 100 : -100 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: direction > 0 ? -100 : 100 }}
                  transition={{ duration: 0.45, ease: [0.45, 0.05, 0.25, 1] }}
                  style={{
                    transformOrigin: direction > 0 ? "left center" : "right center",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                  className="relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-xl sm:p-10 dark:border-white/10 dark:bg-zinc-900"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 w-10"
                    style={{
                      [direction > 0 ? "left" : "right"]: 0,
                      background: `linear-gradient(to ${direction > 0 ? "right" : "left"}, rgba(0,0,0,0.06), transparent)`,
                    }}
                  />
                  <span
                    className="mb-3 inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{ backgroundColor: `${note.accent}26`, color: note.accent }}
                  >
                    Topic {index + 1} of {total}
                  </span>
                  <h2 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
                    {slide.title}
                  </h2>

                  <div className="grid flex-1 gap-8 lg:grid-cols-2 lg:items-start">
                    <SlideContent content={slide.content} />
                    {slide.code && (
                      <CodeBlock language={slide.code.language} code={slide.code.code} />
                    )}
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              className="inline-flex items-center gap-1.5 rounded-full border border-black/10 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path
                  fillRule="evenodd"
                  d="M17 10a.75.75 0 01-.75.75H6.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L6.612 9.25H16.25A.75.75 0 0117 10z"
                  clipRule="evenodd"
                />
              </svg>
              Previous
            </button>

            <select
              value={isComplete ? total : index}
              onChange={(event) => goTo(Number(event.target.value))}
              className="rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-zinc-600 lg:hidden dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300"
            >
              {note.slides.map((s, i) => (
                <option key={s.title} value={i}>
                  {i + 1}. {s.title}
                </option>
              ))}
              <option value={total}>Finish</option>
            </select>

            <button
              type="button"
              onClick={() => goTo(index + 1)}
              disabled={isComplete}
              className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-[1.03] active:scale-100 disabled:cursor-not-allowed disabled:opacity-40"
              style={{ backgroundColor: note.accent, color: "#1c1917" }}
            >
              {index === total - 1 ? "Finish" : "Next"}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
