import Link from "next/link";
import { notFound } from "next/navigation";
import { getExamResultById } from "@/lib/exam-results";
import { isInterviewTrackSlug } from "@/lib/notes";

export const metadata = { title: "Exam Result" };

export default async function ResultDetailPage(props: PageProps<"/results/[id]">) {
  const { id } = await props.params;
  const result = await getExamResultById(id);

  if (!result) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/results"
        className="mb-6 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path
            fillRule="evenodd"
            d="M17 10a.75.75 0 01-.75.75H6.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L6.612 9.25H16.25A.75.75 0 0117 10z"
            clipRule="evenodd"
          />
        </svg>
        All results
      </Link>

      <div className="rounded-2xl border border-black/5 bg-white p-6 text-center shadow-sm sm:p-10 dark:border-white/10 dark:bg-zinc-900">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 text-2xl font-bold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100">
          {Math.round(result.evaluation.overallScore)}
        </span>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {result.noteTitle}
        </h1>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          {new Date(result.completedAt).toLocaleString()}
        </p>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {result.evaluation.overallFeedback}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {result.questions.map((question, i) => {
          const qResult = result.evaluation.questionResults.find(
            (r) => r.questionId === question.id
          );
          const answer = result.answers.find((a) => a.questionId === question.id)?.answer;
          return (
            <div
              key={question.id}
              className="rounded-xl border border-black/5 bg-white p-5 dark:border-white/10 dark:bg-zinc-900"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  Q{i + 1}. {question.prompt}
                </span>
                {qResult && (
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      qResult.correct
                        ? "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
                    }`}
                  >
                    {qResult.score}/{qResult.maxScore}
                  </span>
                )}
              </div>
              <p className="mb-2 whitespace-pre-wrap text-sm text-zinc-500 dark:text-zinc-400">
                Your answer: {answer || "(no answer given)"}
              </p>
              {qResult && (
                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {qResult.feedback}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <Link
        href={isInterviewTrackSlug(result.slug) ? "/" : `/notes/${result.slug}`}
        className="mt-8 inline-block w-fit rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {isInterviewTrackSlug(result.slug) ? "Back home" : "Back to note"}
      </Link>
    </div>
  );
}
