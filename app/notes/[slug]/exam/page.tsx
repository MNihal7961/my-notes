import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getNoteBySlug } from "@/lib/notes";
import { generateExamQuestions } from "@/lib/gemini";
import { ExamRunner } from "@/components/exam-runner";
import type { ExamQuestion } from "@/lib/types";

export async function generateMetadata(
  props: PageProps<"/notes/[slug]/exam">
): Promise<Metadata> {
  const { slug } = await props.params;
  const note = getNoteBySlug(slug);
  if (!note) return { title: "Note not found" };
  return { title: `${note.title} — Exam` };
}

export default async function ExamPage(props: PageProps<"/notes/[slug]/exam">) {
  const { slug } = await props.params;
  const note = getNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  let questions: ExamQuestion[] | null = null;
  try {
    questions = await generateExamQuestions(note);
  } catch {
    questions = null;
  }

  if (questions) {
    return <ExamRunner note={note} questions={questions} />;
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        Couldn&apos;t generate the exam
      </p>
      <p className="max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
        Something went wrong talking to Gemini. Check your GEMINI_API_KEY and try again.
      </p>
      <div className="flex items-center gap-3">
        <Link
          href={`/notes/${note.slug}/exam`}
          className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Try again
        </Link>
        <Link
          href={`/notes/${note.slug}`}
          className="rounded-full border border-black/10 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Back to note
        </Link>
      </div>
    </div>
  );
}
