import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import type { ExamResult } from "@/lib/types";

function getScoreBand(score: number) {
  if (score >= 85) return { label: "Excellent", color: "#22c55e" };
  if (score >= 70) return { label: "Good", color: "#84cc16" };
  if (score >= 50) return { label: "Fair", color: "#f59e0b" };
  return { label: "Needs review", color: "#f43f5e" };
}

function formatDuration(startedAt: string, completedAt: string) {
  const ms = new Date(completedAt).getTime() - new Date(startedAt).getTime();
  const totalSeconds = Math.max(0, Math.round(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return minutes === 0 ? `${seconds}s` : `${minutes}m ${seconds}s`;
}

export function ExamResultView({
  result,
  backHref,
  backLabel,
}: {
  result: ExamResult;
  backHref: string;
  backLabel: string;
}) {
  const score = result.evaluation.overallScore;
  const band = getScoreBand(score);
  const percentage = Math.max(0, Math.min(100, score));

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col overflow-y-auto px-4 py-10 sm:px-6">
      <div className="rounded-2xl border border-black/5 bg-white p-6 text-center shadow-xl sm:p-10 dark:border-white/10 dark:bg-zinc-900">
        <div
          className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(${band.color} ${percentage * 3.6}deg, ${band.color}22 0deg)`,
          }}
        >
          <div className="flex h-[76px] w-[76px] flex-col items-center justify-center rounded-full bg-white dark:bg-zinc-900">
            <span className="text-2xl font-bold" style={{ color: band.color }}>
              {Math.round(score)}
            </span>
            <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500">/ 100</span>
          </div>
        </div>

        <span
          className="mt-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
          style={{ backgroundColor: `${band.color}1f`, color: band.color }}
        >
          {band.label}
        </span>

        <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {result.noteTitle}
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {result.evaluation.overallFeedback}
        </p>

        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-zinc-400 dark:text-zinc-500">
          <span>{new Date(result.completedAt).toLocaleString()}</span>
          <span aria-hidden="true">·</span>
          <span>{formatDuration(result.startedAt, result.completedAt)}</span>
          <span aria-hidden="true">·</span>
          <span>{result.questions.length} questions</span>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {result.questions.map((question, i) => {
          const qResult = result.evaluation.questionResults.find(
            (r) => r.questionId === question.id
          );
          const answer = result.answers.find((a) => a.questionId === question.id)?.answer;
          const correctOptionText =
            question.type === "mcq" && question.correctOptionIndex != null
              ? question.options?.[question.correctOptionIndex]
              : undefined;

          return (
            <div
              key={question.id}
              className="rounded-xl border border-black/5 bg-white p-5 dark:border-white/10 dark:bg-zinc-900"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white ${
                      qResult?.correct ? "bg-green-500" : "bg-amber-500"
                    }`}
                  >
                    {qResult?.correct ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                    )}
                  </span>
                  <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    Q{i + 1}. {question.prompt}
                  </span>
                </div>
                {qResult && (
                  <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    {qResult.score}/{qResult.maxScore}
                  </span>
                )}
              </div>

              <div className="ml-7.5 space-y-2">
                {question.type === "coding" && answer ? (
                  <CodeBlock language={question.language ?? "text"} code={answer} />
                ) : (
                  <p className="whitespace-pre-wrap text-sm text-zinc-500 dark:text-zinc-400">
                    Your answer: {answer || "(no answer given)"}
                  </p>
                )}

                {correctOptionText && !qResult?.correct && (
                  <p className="text-sm text-green-700 dark:text-green-400">
                    Correct answer: {correctOptionText}
                  </p>
                )}

                {qResult && (
                  <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {qResult.feedback}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center gap-3">
        <Link
          href={backHref}
          className="rounded-full border border-black/10 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          {backLabel}
        </Link>
        <Link
          href="/results"
          className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          View all results
        </Link>
      </div>
    </div>
  );
}
