import { describe, expect, it } from "vitest";

import { categories, getQuestions } from "./questions";

describe("question bank", () => {
  it("loads 120 curated prompts", async () => {
    const questions = await getQuestions();

    expect(questions).toHaveLength(120);
  });

  it("covers the required learning domains", async () => {
    const questions = await getQuestions();
    const presentCategories = new Set(questions.map((question) => question.category));

    for (const category of categories.filter((category) => category !== "all")) {
      expect(presentCategories.has(category)).toBe(true);
    }
  });

  it("filters questions by category", async () => {
    const aiQuestions = await getQuestions("ai");

    expect(aiQuestions.length).toBeGreaterThan(0);
    expect(aiQuestions.every((question) => question.category === "ai")).toBe(true);
  });
});
