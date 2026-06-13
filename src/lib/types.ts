export const categories = [
  "all",
  "software",
  "web",
  "java",
  "react",
  "ai",
  "daily",
  "ielts"
] as const;

export type Category = (typeof categories)[number];
export type QuestionCategory = Exclude<Category, "all">;
export type Difficulty = "B2" | "C1";

export type Question = {
  id: string;
  category: QuestionCategory;
  difficulty: Difficulty;
  prompt: string;
  referenceAnswer: string;
  alternatives: string[];
  notes: string[];
  keywords: string[];
};

export type HistoryRecordInput = {
  questionId: string;
  prompt: string;
  userAnswer: string;
  referenceAnswer: string;
  category: QuestionCategory;
  difficulty: Difficulty;
  markedForReview: boolean;
};

export type HistoryRecord = HistoryRecordInput & {
  id: string;
  createdAt: string;
};
