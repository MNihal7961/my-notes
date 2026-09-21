import Link from "next/link";
import { NoteCover } from "@/components/note-cover";
import type { Note } from "@/lib/types";

export function NoteCard({ note }: { note: Note }) {
  const topics = note.topics;

  return (
    <Link
      href={`/notes/${note.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 dark:border-white/10 dark:bg-zinc-900 dark:hover:shadow-black/40"
    >
      <NoteCover
        coverImage={note.coverImage}
        accent={note.accent}
        title={note.title}
        className="h-44 w-full sm:h-48"
        priority
      />

      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="inline-flex w-fit items-center rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          {note.slides.length} slides
        </span>

        <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {note.title}
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {note.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="rounded-md bg-zinc-50 px-2 py-0.5 text-[11px] font-medium text-zinc-500 ring-1 ring-inset ring-zinc-200 dark:bg-zinc-800/60 dark:text-zinc-400 dark:ring-zinc-700"
            >
              {topic}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-1.5 pt-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          View notes
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          >
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
