import { GoogleGenAI, Type } from "@google/genai";
import type { ExamAnswer, ExamEvaluation, ExamQuestion, Note } from "@/lib/types";

// Pinned dated models (e.g. gemini-2.0-flash, gemini-2.5-flash-lite) get
// retired by Google on a rolling basis — this alias always resolves to the
// current lite model so exam generation doesn't silently break again later.
const MODEL = "gemini-flash-lite-latest";

function getClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set");
  return new GoogleGenAI({ apiKey });
}

const questionsSchema = {
  type: Type.OBJECT,
  properties: {
    questions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          type: { type: Type.STRING, enum: ["mcq", "descriptive", "coding"] },
          prompt: { type: Type.STRING },
          options: { type: Type.ARRAY, items: { type: Type.STRING } },
          correctOptionIndex: { type: Type.INTEGER },
          language: { type: Type.STRING },
        },
        required: ["type", "prompt"],
      },
    },
  },
  required: ["questions"],
};

export type QuestionMix = { mcq: number; descriptive: number; coding: number };

const DEFAULT_MIX: QuestionMix = { mcq: 2, descriptive: 2, coding: 1 };

export async function generateExamQuestions(
  note: Note,
  mix: QuestionMix = DEFAULT_MIX
): Promise<ExamQuestion[]> {
  const ai = getClient();
  const total = mix.mcq + mix.descriptive + mix.coding;

  // Strip decorative emoji (e.g. a title like "Event Loop ⭐", or a
  // "🔥 MUST KNOW" checklist heading) — these are reading aids for a
  // student, not quizzable facts, but left in raw they invite meta
  // questions like "which topic is starred?" instead of technical ones.
  const stripDecoration = (text: string) =>
    text.replace(/\p{Extended_Pictographic}/gu, "").replace(/[ \t]{2,}/g, " ").trim();

  const slideSummary = note.slides
    .map((slide, i) => {
      const code = slide.code ? `\n\`\`\`${slide.code.language}\n${slide.code.code.trim()}\n\`\`\`` : "";
      return `${i + 1}. ${stripDecoration(slide.title)}\n${stripDecoration(slide.content)}${code}`;
    })
    .join("\n\n");

  const prompt = `You are creating a short interview-prep exam for a study-notes app.
Topic: ${note.title}
Below are the topic's study material. Base every question strictly on the underlying technical concepts in this material.

${slideSummary}

Generate exactly ${total} exam questions:
- ${mix.mcq} multiple-choice question${mix.mcq === 1 ? "" : "s"} (type "mcq") with exactly 4 short "options" and a 0-based "correctOptionIndex"
- ${mix.descriptive} short-answer / descriptive question${mix.descriptive === 1 ? "" : "s"} (type "descriptive") that ask${mix.descriptive === 1 ? "s" : ""} the candidate to explain a concept in their own words
- ${mix.coding} coding question${mix.coding === 1 ? "" : "s"} (type "coding") that ask${mix.coding === 1 ? "s" : ""} the candidate to write a short code snippet; set "language" to the most relevant language for each

Ask real technical interview questions that test understanding of the concepts themselves (definitions, behavior, trade-offs, "what does this code output", "how would you implement X"). Never ask about how the source material is organized, labeled, formatted, ordered, or prioritized — for example, never ask something like "which topic is marked important" or "what is listed first". If the material spans multiple distinct topics, spread the questions across as many of them as possible rather than clustering on one. Keep each question prompt concise (1-3 sentences) and clearly answerable from the material above. Do not include an answer key in the question prompt text itself.`;

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: questionsSchema,
    },
  });

  const text = response.text;
  if (!text) throw new Error("Gemini returned no content while generating questions");

  const parsed = JSON.parse(text) as { questions: Omit<ExamQuestion, "id">[] };
  return parsed.questions.map((question, i) => ({ ...question, id: `q${i + 1}` }));
}

const evaluationSchema = {
  type: Type.OBJECT,
  properties: {
    overallScore: { type: Type.NUMBER },
    overallFeedback: { type: Type.STRING },
    questionResults: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          questionId: { type: Type.STRING },
          score: { type: Type.NUMBER },
          maxScore: { type: Type.NUMBER },
          correct: { type: Type.BOOLEAN },
          feedback: { type: Type.STRING },
        },
        required: ["questionId", "score", "maxScore", "correct", "feedback"],
      },
    },
  },
  required: ["overallScore", "overallFeedback", "questionResults"],
};

export async function evaluateExamAnswers(
  note: Note,
  questions: ExamQuestion[],
  answers: ExamAnswer[]
): Promise<ExamEvaluation> {
  const ai = getClient();

  const qaBlocks = questions
    .map((question) => {
      const answer =
        answers.find((a) => a.questionId === question.id)?.answer?.trim() ||
        "(no answer given)";
      const optionsText = question.options
        ? `\nOptions: ${question.options.join(" | ")}`
        : "";
      const correctText =
        question.type === "mcq" && question.correctOptionIndex != null
          ? `\nCorrect option: ${question.options?.[question.correctOptionIndex]}`
          : "";
      return `Question (${question.type}) [id=${question.id}]: ${question.prompt}${optionsText}${correctText}\nCandidate's answer: ${answer}`;
    })
    .join("\n\n");

  const prompt = `You are grading a short interview-prep exam on "${note.title}" for a study-notes app.

${qaBlocks}

Grade each question out of 10 based on correctness and understanding, not writing style. For MCQ questions, it's correct only if the candidate's answer matches the correct option. For descriptive and coding questions, judge whether the core idea or logic is right — be reasonably lenient on exact wording but strict on technical correctness. Give short, specific, encouraging feedback per question (1-2 sentences). Then give an overallScore out of 100 and a short overallFeedback summary (2-3 sentences) on what to revise.

Use these exact question ids in questionResults, one entry each: ${questions.map((q) => q.id).join(", ")}`;

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: evaluationSchema,
    },
  });

  const text = response.text;
  if (!text) throw new Error("Gemini returned no content while evaluating answers");

  return JSON.parse(text) as ExamEvaluation;
}
