import Link from "next/link";
import type { Metadata } from "next";
import { getFullStackNote } from "@/lib/notes";
import { generateExamQuestions } from "@/lib/gemini";
import { ExamRunner } from "@/components/exam-runner";
import type { ExamQuestion } from "@/lib/types";

export const metadata: Metadata = {
  title: "Full Stack Interview",
};
export const dynamic = "force-dynamic";

const INTERVIEW_MIX = { mcq: 4, descriptive: 4, coding: 2 };

export default async function InterviewPage() {
  const note = getFullStackNote();

  let questions: ExamQuestion[] | null = null;
  try {
    questions = await generateExamQuestions(note, INTERVIEW_MIX);
  } catch {
    questions = null;
  }

  if (questions) {
    return <ExamRunner note={note} questions={questions} />;
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        Couldn&apos;t generate the interview
      </p>
      <p className="max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
        Something went wrong talking to Gemini. Check your GEMINI_API_KEY and try again.
      </p>
      <div className="flex items-center gap-3">
        <Link
          href="/interview"
          className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Try again
        </Link>
        <Link
          href="/"
          className="rounded-full border border-black/10 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
