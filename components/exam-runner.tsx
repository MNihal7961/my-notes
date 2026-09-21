"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { submitExam } from "@/lib/actions/exam";
import { MicButton } from "@/components/mic-button";
import { ExamResultView } from "@/components/exam-result-view";
import { isInterviewTrackSlug } from "@/lib/notes";
import type { ExamAnswer, ExamQuestion, ExamResult, Note } from "@/lib/types";

export function ExamRunner({
  note,
  questions,
}: {
  note: Note;
  questions: ExamQuestion[];
}) {
  const backHref = isInterviewTrackSlug(note.slug) ? "/" : `/notes/${note.slug}`;
  const backLabel = isInterviewTrackSlug(note.slug) ? "Back home" : "Back to note";
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<ExamResult | null>(null);
  const startedAt = useMemo(() => new Date().toISOString(), []);

  const total = questions.length;
  const question = questions[index];
  const isLast = index === total - 1;

  function setAnswer(questionId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  async function handleSubmit() {
    const unanswered = questions.length - Object.keys(answers).filter((id) => answers[id]?.trim()).length;
    if (unanswered > 0) {
      toast.warning(
        `${unanswered} question${unanswered > 1 ? "s" : ""} left unanswered — submitting anyway.`
      );
    }

    setSubmitting(true);
    try {
      const answerList: ExamAnswer[] = questions.map((q) => ({
        questionId: q.id,
        answer: answers[q.id] ?? "",
      }));
      const examResult = await submitExam(note.slug, questions, answerList, startedAt);
      setResult(examResult);
      toast.success(`Exam graded — ${Math.round(examResult.evaluation.overallScore)}/100.`);
    } catch {
      toast.error("Something went wrong while grading your exam. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return <ExamResultView result={result} backHref={backHref} backLabel={backLabel} />;
  }

  if (submitting) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-50" />
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          Grading your answers with Gemini…
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="shrink-0 border-b border-black/5 bg-white/90 backdrop-blur-md dark:border-white/10 dark:bg-zinc-950/90">
        <div className="mx-auto flex max-w-3xl items-center gap-4 px-4 py-3 sm:px-6">
          <Link
            href={backHref}
            className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Exit
          </Link>
          <span className="hidden truncate text-sm font-semibold text-zinc-800 sm:inline dark:text-zinc-200">
            {isInterviewTrackSlug(note.slug) ? note.title : `${note.title} — Exam`}
          </span>
          <span className="ml-auto text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {index + 1} / {total}
          </span>
        </div>
        <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-800">
          <div
            className="h-full transition-all duration-300 ease-out"
            style={{ width: `${((index + 1) / total) * 100}%`, backgroundColor: note.accent }}
          />
        </div>
      </div>

      <div className="mx-auto flex w-full min-h-0 max-w-3xl flex-1 flex-col overflow-y-auto px-4 py-8 sm:px-6">
        <div className="flex flex-1 flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-xl sm:p-8 dark:border-white/10 dark:bg-zinc-900">
          <span
            className="mb-3 inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide"
            style={{ backgroundColor: `${note.accent}26`, color: note.accent }}
          >
            {question.type === "mcq"
              ? "Multiple choice"
              : question.type === "coding"
                ? "Coding"
                : "Short answer"}
          </span>

          <p className="mb-6 text-lg font-semibold leading-relaxed text-zinc-900 dark:text-zinc-50">
            {question.prompt}
          </p>

          {question.type === "mcq" && (
            <div className="flex flex-col gap-2.5">
              {question.options?.map((option) => {
                const selected = answers[question.id] === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setAnswer(question.id, option)}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                      selected
                        ? "border-transparent bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                        : "border-black/10 text-zinc-700 hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                        selected
                          ? "border-white bg-white dark:border-zinc-900 dark:bg-zinc-900"
                          : "border-zinc-300 dark:border-zinc-600"
                      }`}
                    >
                      {selected && (
                        <span
                          className="h-2 w-2 rounded-full bg-zinc-900 dark:bg-white"
                        />
                      )}
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>
          )}

          {question.type === "descriptive" && (
            <div className="flex flex-1 flex-col gap-3">
              <textarea
                value={answers[question.id] ?? ""}
                onChange={(e) => setAnswer(question.id, e.target.value)}
                placeholder="Type your answer here…"
                rows={6}
                className="w-full flex-1 resize-none rounded-xl border border-black/10 bg-white p-4 text-sm leading-relaxed text-zinc-900 outline-none focus:border-zinc-400 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-600"
              />
              <div>
                <MicButton
                  onResult={(transcript) =>
                    setAnswer(
                      question.id,
                      answers[question.id] ? `${answers[question.id]} ${transcript}` : transcript
                    )
                  }
                />
              </div>
            </div>
          )}

          {question.type === "coding" && (
            <div className="flex flex-1 flex-col gap-2">
              {question.language && (
                <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                  Suggested language: {question.language}
                </span>
              )}
              <textarea
                value={answers[question.id] ?? ""}
                onChange={(e) => setAnswer(question.id, e.target.value)}
                placeholder="// Write your code here"
                rows={10}
                spellCheck={false}
                className="w-full flex-1 resize-none rounded-xl border border-black/10 bg-[#0d1117] p-4 font-mono text-[13px] leading-relaxed text-zinc-100 outline-none focus:border-zinc-600"
              />
            </div>
          )}
        </div>

        <div className="mt-4 flex shrink-0 items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            className="rounded-full border border-black/10 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Previous
          </button>

          {isLast ? (
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-[1.03] active:scale-100"
              style={{ backgroundColor: note.accent, color: "#1c1917" }}
            >
              Submit exam
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}
              className="rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-[1.03] active:scale-100"
              style={{ backgroundColor: note.accent, color: "#1c1917" }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
