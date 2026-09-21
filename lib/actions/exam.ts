"use server";

import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getNoteBySlug } from "@/lib/notes";
import { generateExamQuestions, evaluateExamAnswers } from "@/lib/gemini";
import { RESULTS_DIR } from "@/lib/exam-results";
import type { ExamAnswer, ExamQuestion, ExamResult } from "@/lib/types";

async function requireSession() {
  const cookieStore = await cookies();
  const username = verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
  if (!username) throw new Error("Not authenticated");
  return username;
}

export async function generateExam(slug: string): Promise<ExamQuestion[]> {
  await requireSession();
  const note = getNoteBySlug(slug);
  if (!note) throw new Error("Note not found");
  return generateExamQuestions(note);
}

export async function submitExam(
  slug: string,
  questions: ExamQuestion[],
  answers: ExamAnswer[],
  startedAt: string
): Promise<ExamResult> {
  await requireSession();
  const note = getNoteBySlug(slug);
  if (!note) throw new Error("Note not found");

  const evaluation = await evaluateExamAnswers(note, questions, answers);

  const result: ExamResult = {
    id: randomUUID(),
    slug,
    noteTitle: note.title,
    startedAt,
    completedAt: new Date().toISOString(),
    questions,
    answers,
    evaluation,
  };

  await mkdir(RESULTS_DIR, { recursive: true });
  await writeFile(
    path.join(RESULTS_DIR, `${result.id}.json`),
    JSON.stringify(result, null, 2),
    "utf-8"
  );

  return result;
}
