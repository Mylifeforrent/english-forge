// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { PracticeApp } from "./practice-app";
import type { HistoryRecord, Question } from "@/lib/types";

const questions: Question[] = [
  {
    id: "software-001",
    category: "software",
    difficulty: "B2",
    prompt: "我们需要在生产环境中加入更好的可观测性。",
    referenceAnswer: "We need to add better observability in production.",
    alternatives: ["We need better production observability."],
    notes: ["observability covers logs, metrics, and traces"],
    keywords: ["observability", "production"]
  }
];

describe("PracticeApp", () => {
  it("lets the learner type, reveal the answer, and save the attempt", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn(async () => ({
      id: "history-1",
      createdAt: "2026-06-13T08:00:00.000Z",
      questionId: "software-001",
      prompt: questions[0].prompt,
      userAnswer: "We need better observability in production.",
      referenceAnswer: questions[0].referenceAnswer,
      category: "software",
      difficulty: "B2",
      markedForReview: true
    } satisfies HistoryRecord));

    render(React.createElement(PracticeApp, {
      questions,
      initialHistory: [],
      onSaveAttempt: onSave
    }));

    expect(screen.getByText("我们需要在生产环境中加入更好的可观测性。")).toBeInTheDocument();
    expect(screen.queryByText("We need to add better observability in production.")).not.toBeInTheDocument();

    await user.type(screen.getByLabelText("Your English translation"), "We need better observability in production.");
    await user.click(screen.getByRole("button", { name: "Mark for review" }));
    await user.click(screen.getByRole("button", { name: "Reveal answer" }));

    expect(screen.getByText("We need to add better observability in production.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Save attempt" }));

    expect(onSave).toHaveBeenCalledWith({
      questionId: "software-001",
      prompt: questions[0].prompt,
      userAnswer: "We need better observability in production.",
      referenceAnswer: questions[0].referenceAnswer,
      category: "software",
      difficulty: "B2",
      markedForReview: true
    });
    expect(await screen.findByText("Saved to local history")).toBeInTheDocument();
  });
});
