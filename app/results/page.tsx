import Link from "next/link";
import { getAllExamResults } from "@/lib/exam-results";
import { ThemeToggle } from "@/components/theme-toggle";
import { logout } from "@/lib/actions/auth";

export const metadata = { title: "Exam Results" };
export const dynamic = "force-dynamic";

export default async function ResultsPage() {
  const results = await getAllExamResults();

  return (
    <div className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
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
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <form action={logout}>
              <button
                type="submit"
                className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Exam Results
        </h1>
        <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
          {results.length} {results.length === 1 ? "attempt" : "attempts"} saved.
        </p>

        {results.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-black/10 p-10 text-center text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400">
            No exam attempts yet. Start one from any note&apos;s detail page.
          </div>
        ) : (
          <div className="mt-8 flex flex-col gap-3">
            {results.map((result) => (
              <Link
                key={result.id}
                href={`/results/${result.id}`}
                className="flex items-center justify-between gap-4 rounded-xl border border-black/5 bg-white p-4 transition-colors hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-900 dark:hover:bg-zinc-800/60"
              >
                <div>
                  <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    {result.noteTitle}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {new Date(result.completedAt).toLocaleString()}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-zinc-100 px-3 py-1 text-sm font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  {Math.round(result.evaluation.overallScore)}/100
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
