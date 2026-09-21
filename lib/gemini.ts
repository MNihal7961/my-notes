import { GoogleGenAI, Type } from "@google/genai";
import type { ExamAnswer, ExamEvaluation, ExamQuestion, Note } from "@/lib/types";

const MODEL = "gemini-2.0-flash";

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

export async function generateExamQuestions(note: Note): Promise<ExamQuestion[]> {
  const ai = getClient();

  const slideSummary = note.slides
    .map((slide, i) => `${i + 1}. ${slide.title}\n${slide.content.trim()}`)
    .join("\n\n");

  const prompt = `You are creating a short interview-prep exam for a study-notes app.
Topic: ${note.title}
Below are the topic's study slides. Base every question strictly on this material.

${slideSummary}

Generate exactly 5 exam questions:
- 2 multiple-choice questions (type "mcq") with exactly 4 short "options" and a 0-based "correctOptionIndex"
- 2 short-answer / descriptive questions (type "descriptive") that ask the candidate to explain a concept in their own words
- 1 coding question (type "coding") that asks the candidate to write a short code snippet; set "language" to the most relevant language for this topic

Keep each question prompt concise (1-3 sentences) and clearly answerable from the material above. Do not include an answer key in the question prompt text itself.`;

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
