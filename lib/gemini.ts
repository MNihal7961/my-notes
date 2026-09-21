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
          options: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Exactly 4 options for mcq questions; empty array for other types.",
          },
          correctOptionIndex: {
            type: Type.INTEGER,
            description: "0-based index of the correct option for mcq questions; -1 for other types.",
          },
          language: {
            type: Type.STRING,
            description: "Programming language for coding questions; empty string for other types.",
          },
        },
        // options/correctOptionIndex/language are marked required even
        // though they only apply to "mcq"/"coding" questions — the schema
        // can't conditionally require a field based on another field's
        // value, and leaving them optional means the model sometimes
        // omits correctOptionIndex on mcq questions entirely, which
        // silently breaks grading. Non-mcq/coding questions just get an
        // unused placeholder value that the rest of the app never reads.
        required: ["type", "prompt", "options", "correctOptionIndex", "language"],
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

Ask real technical interview questions that test understanding of the concepts themselves (definitions, behavior, trade-offs, "what does this code output", "how would you implement X"). Never ask about how the source material is organized, labeled, formatted, ordered, or prioritized — for example, never ask something like "which topic is marked important" or "what is listed first". If the material spans multiple distinct topics, spread the questions across as many of them as possible rather than clustering on one, and don't ask two questions that test the same narrow concept.

Aim for the difficulty of a real mid-level technical interview: not trivial definition recall, not obscure edge cases. For MCQ questions, make all 4 options plausible (a distractor should reflect a real, common misconception, not an obviously wrong answer), and vary which position (0-3) the correct option is in across questions — don't always put it first. Keep each question prompt concise (1-3 sentences) and clearly answerable from the material above. Do not include an answer key in the question prompt text itself.`;

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
  // options/correctOptionIndex/language are required in the schema so the
  // model reliably fills correctOptionIndex on mcq questions, but that also
  // means non-mcq/coding questions get an unused placeholder value back —
  // drop those so the stored question only carries fields that apply to it.
  return parsed.questions.map((question, i) => ({
    id: `q${i + 1}`,
    type: question.type,
    prompt: question.prompt,
    options: question.type === "mcq" ? question.options : undefined,
    correctOptionIndex: question.type === "mcq" ? question.correctOptionIndex : undefined,
    language: question.type === "coding" ? question.language : undefined,
  }));
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

Grade each question out of 10 based on correctness and understanding, not writing style. If the candidate's answer is "(no answer given)", score it 0 and set correct to false — don't give credit for an empty answer. For MCQ questions, it's correct (score 10) only if the candidate's answer matches the correct option, otherwise score 0 — there's no partial credit on MCQs. For descriptive and coding questions, judge whether the core idea or logic is right — be reasonably lenient on exact wording but strict on technical correctness, and use the 0-10 range for partial understanding rather than only awarding 0 or 10. Set correct to true only when the answer demonstrates solid understanding (score 6 or higher). Give short, specific, encouraging feedback per question (1-2 sentences) — if the answer was wrong or incomplete, briefly say what the right idea is. Then write a short overallFeedback summary (2-3 sentences) on what to revise. You don't need to compute overallScore; it will be calculated separately from your per-question scores.

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

  const parsed = JSON.parse(text) as ExamEvaluation;

  // Don't trust the model's own arithmetic for overallScore, and don't trust
  // "correct" as an independent field it might set inconsistently with its
  // own score — derive both deterministically from the per-question scores
  // so the UI (a checkmark/cross icon next to a numeric score) can never
  // show something contradictory. Also fill in any question the model
  // dropped from its response with a 0, rather than silently losing it.
  const questionResults = questions.map((question) => {
    const found = parsed.questionResults.find((r) => r.questionId === question.id);
    const maxScore = found?.maxScore || 10;
    const score = Math.max(0, Math.min(found?.score ?? 0, maxScore));
    return {
      questionId: question.id,
      score,
      maxScore,
      correct: score >= maxScore * 0.6,
      feedback: found?.feedback || "No feedback returned for this question.",
    };
  });

  const totalScore = questionResults.reduce((sum, r) => sum + r.score, 0);
  const totalMax = questionResults.reduce((sum, r) => sum + r.maxScore, 0);
  const overallScore = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;

  return { overallScore, overallFeedback: parsed.overallFeedback, questionResults };
}
