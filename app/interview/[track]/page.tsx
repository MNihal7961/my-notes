import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getInterviewNote, getInterviewTrack } from "@/lib/notes";
import { generateExamQuestions } from "@/lib/gemini";
import { ExamRunner } from "@/components/exam-runner";
import type { ExamQuestion } from "@/lib/types";

export const dynamic = "force-dynamic";

const INTERVIEW_MIX = { mcq: 4, descriptive: 4, coding: 2 };

export async function generateMetadata(
  props: PageProps<"/interview/[track]">
): Promise<Metadata> {
  const { track: trackSlug } = await props.params;
  const track = getInterviewTrack(trackSlug);
  if (!track) return { title: "Interview not found" };
  return { title: track.title };
}

export default async function InterviewTrackPage(props: PageProps<"/interview/[track]">) {
  const { track: trackSlug } = await props.params;
  const track = getInterviewTrack(trackSlug);

  if (!track) {
    notFound();
  }

  const note = getInterviewNote(trackSlug);

  let questions: ExamQuestion[] | null = null;
  try {
    questions = note ? await generateExamQuestions(note, INTERVIEW_MIX) : null;
  } catch {
    questions = null;
  }

  if (questions && note) {
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
          href={`/interview/${track.slug}`}
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
