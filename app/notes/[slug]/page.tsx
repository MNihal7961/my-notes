import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllNotes, getNoteBySlug } from "@/lib/notes";
import { NoteCover } from "@/components/note-cover";
import { ThemeToggle } from "@/components/theme-toggle";

export function generateStaticParams() {
  return getAllNotes().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata(
  props: PageProps<"/notes/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const note = getNoteBySlug(slug);

  if (!note) {
    return { title: "Note not found" };
  }

  return {
    title: note.title,
    description: note.description,
  };
}

export default async function NoteDetailPage(props: PageProps<"/notes/[slug]">) {
  const { slug } = await props.params;
  const note = getNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  const codeSlideCount = note.slides.filter((slide) => slide.code).length;

  return (
    <div className="flex flex-1 flex-col">
      <section className="border-b border-black/5 dark:border-white/10">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M17 10a.75.75 0 01-.75.75H6.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L6.612 9.25H16.25A.75.75 0 0117 10z"
                  clipRule="evenodd"
                />
              </svg>
              All notes
            </Link>
            <ThemeToggle />
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
            <NoteCover
              coverImage={note.coverImage}
              accent={note.accent}
              title={note.title}
              className="h-40 w-full rounded-2xl shadow-lg sm:h-36 sm:w-56 sm:shrink-0"
              iconSizeClassName="h-16 w-16"
              priority
            />

            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
                {note.title}
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                {note.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {note.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-200 dark:bg-zinc-800/60 dark:text-zinc-300 dark:ring-zinc-700"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link
              href={`/notes/${note.slug}/slides`}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition-transform hover:scale-[1.03] hover:bg-zinc-800 active:scale-100 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Start learning
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>

            <Link
              href={`/notes/${note.slug}/exam`}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 px-6 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Start exam
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v3.5a.75.75 0 00.22.53l2.5 2.5a.75.75 0 101.06-1.06l-2.28-2.28V6.75z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>

            <div className="flex items-center gap-5 text-sm text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M4.75 2a.75.75 0 01.75.75V4h9V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0119 6.75v10.5A2.75 2.75 0 0116.25 20H3.75A2.75 2.75 0 011 17.25V6.75A2.75 2.75 0 013.75 4H4V2.75A.75.75 0 014.75 2zm-1 6.5a.25.25 0 00-.25.25v8.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25v-8.5a.25.25 0 00-.25-.25H3.75z" clipRule="evenodd" />
                </svg>
                {note.slides.length} slides
              </span>
              <span className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm4.75 7.75a.75.75 0 000 1.5h.878l-1.196 3.987a.75.75 0 001.436.43l1.5-5a.75.75 0 00-.719-.917H9.25z" clipRule="evenodd" />
                </svg>
                {codeSlideCount} code examples
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            What you&apos;ll cover
          </h2>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            Tap a topic to jump straight to it
          </span>
        </div>
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {note.slides.map((slide, index) => (
            <li key={slide.title}>
              <Link
                href={`/notes/${note.slug}/slides?slide=${index}`}
                className="group flex items-start gap-3 rounded-xl border border-black/5 bg-white p-4 transition-colors hover:border-black/10 hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-900 dark:hover:border-white/20 dark:hover:bg-zinc-800/60"
              >
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                  style={{ backgroundColor: note.accent, color: "#1c1917" }}
                >
                  {index + 1}
                </span>
                <div className="flex flex-1 flex-col gap-0.5">
                  <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    {slide.title}
                  </span>
                  {slide.code && (
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">
                      Includes code example
                    </span>
                  )}
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="mt-0.5 h-4 w-4 shrink-0 text-zinc-300 opacity-0 transition-opacity group-hover:opacity-100 dark:text-zinc-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
