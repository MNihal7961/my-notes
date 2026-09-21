import Link from "next/link";
import { notFound } from "next/navigation";
import { getExamResultById } from "@/lib/exam-results";
import { isInterviewTrackSlug } from "@/lib/notes";
import { ExamResultView } from "@/components/exam-result-view";

export const metadata = { title: "Exam Result" };

export default async function ResultDetailPage(props: PageProps<"/results/[id]">) {
  const { id } = await props.params;
  const result = await getExamResultById(id);

  if (!result) {
    notFound();
  }

  const backHref = isInterviewTrackSlug(result.slug) ? "/" : `/notes/${result.slug}`;
  const backLabel = isInterviewTrackSlug(result.slug) ? "Back home" : "Back to note";

  return (
    <div className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-3xl px-4 pt-10 sm:px-6 lg:px-8">
        <Link
          href="/results"
          className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
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
      </div>

      <ExamResultView result={result} backHref={backHref} backLabel={backLabel} />
    </div>
  );
}
