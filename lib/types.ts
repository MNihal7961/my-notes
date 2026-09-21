export type SlideCode = {
  language: string;
  code: string;
};

export type Slide = {
  title: string;
  content: string;
  code?: SlideCode;
};

export type NoteData = {
  title: string;
  description: string;
  coverImage: string;
  accent: string;
  topics: string[];
  slides: Slide[];
};

export type Note = NoteData & {
  slug: string;
};

export type QuestionType = "mcq" | "descriptive" | "coding";

export type ExamQuestion = {
  id: string;
  type: QuestionType;
  prompt: string;
  options?: string[];
  correctOptionIndex?: number;
  language?: string;
};

export type ExamAnswer = {
  questionId: string;
  answer: string;
};

export type QuestionEvaluation = {
  questionId: string;
  score: number;
  maxScore: number;
  correct: boolean;
  feedback: string;
};

export type ExamEvaluation = {
  overallScore: number;
  overallFeedback: string;
  questionResults: QuestionEvaluation[];
};

export type ExamResult = {
  id: string;
  slug: string;
  noteTitle: string;
  startedAt: string;
  completedAt: string;
  questions: ExamQuestion[];
  answers: ExamAnswer[];
  evaluation: ExamEvaluation;
};
