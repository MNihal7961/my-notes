import { readdir, readFile } from "fs/promises";
import path from "path";
import type { ExamResult } from "@/lib/types";

export const RESULTS_DIR = path.join(process.cwd(), "data", "exam-results");

export async function getAllExamResults(): Promise<ExamResult[]> {
  try {
    const files = await readdir(RESULTS_DIR);
    const jsonFiles = files.filter((file) => file.endsWith(".json"));

    const results = await Promise.all(
      jsonFiles.map(async (file) => {
        const content = await readFile(path.join(RESULTS_DIR, file), "utf-8");
        return JSON.parse(content) as ExamResult;
      })
    );

    return results.sort(
      (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

export async function getExamResultById(id: string): Promise<ExamResult | null> {
  const results = await getAllExamResults();
  return results.find((result) => result.id === id) ?? null;
}
