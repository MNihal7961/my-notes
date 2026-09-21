import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { INTERVIEW_TRACKS } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Mock Interviews",
};

export default function InterviewChooserPage() {
  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-14 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path
            fillRule="evenodd"
            d="M17 10a.75.75 0 01-.75.75H6.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L6.612 9.25H16.25A.75.75 0 0117 10z"
            clipRule="evenodd"
          />
        </svg>
        All notes
      </Link>

      <span className="inline-flex items-center rounded-full bg-zinc-900/5 px-3 py-1 text-xs font-semibold tracking-wide text-zinc-600 uppercase dark:bg-white/10 dark:text-zinc-300">
        Mock interview · Gemini graded
      </span>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
        Pick your mock interview
      </h1>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
        A combined set of questions pulled from your notes, graded by Gemini. Answer by typing,
        code, or speak your answer aloud.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {INTERVIEW_TRACKS.map((track) => (
          <Link
            key={track.slug}
            href={`/interview/${track.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-white/10"
          >
            <div
              className="flex h-32 items-center justify-center"
              style={{
                backgroundImage: `radial-gradient(circle at 30% 30%, ${track.accent}33, transparent 60%), linear-gradient(135deg, #0b1120 0%, #161f36 60%, #0b1120 100%)`,
              }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 shadow-lg ring-1 ring-white/15 backdrop-blur-sm">
                <Image src={track.icon} alt="" width={32} height={32} className="h-8 w-8" />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-2 bg-white p-5 dark:bg-zinc-900">
              <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                {track.title}
              </h2>
              <p className="line-clamp-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                {track.description}
              </p>
              <span
                className="mt-auto flex items-center gap-1.5 pt-3 text-sm font-semibold"
                style={{ color: track.accent }}
              >
                Start interview
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
