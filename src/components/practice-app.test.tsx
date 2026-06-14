// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { PracticeApp } from "./practice-app";
import type { HistoryRecord, Question } from "@/lib/types";

afterEach(() => {
  cleanup();
});

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
  },
  {
    id: "web-002",
    category: "web",
    difficulty: "B2",
    prompt: "这个页面首屏应该直接进入练习。",
    referenceAnswer: "The first screen should take users straight into practice.",
    alternatives: ["Users should land directly in the practice experience."],
    notes: ["first screen is natural UI language"],
    keywords: ["first screen", "practice"]
  },
  {
    id: "daily-003",
    category: "daily",
    difficulty: "B2",
    prompt: "我需要一点时间整理我的想法。",
    referenceAnswer: "I need a moment to organize my thoughts.",
    alternatives: ["Give me a second to gather my thoughts."],
    notes: ["gather my thoughts"],
    keywords: ["thinking", "speaking"]
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

  it("navigates to previous, next, and any selected prompt", async () => {
    const user = userEvent.setup();

    render(React.createElement(PracticeApp, {
      questions,
      initialHistory: []
    }));

    expect(screen.getByText("我们需要在生产环境中加入更好的可观测性。")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Next prompt" }));
    expect(screen.getByText("这个页面首屏应该直接进入练习。")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Previous prompt" }));
    expect(screen.getByText("我们需要在生产环境中加入更好的可观测性。")).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText("Choose prompt"), "daily-003");
    expect(screen.getByText("我需要一点时间整理我的想法。")).toBeInTheDocument();
    expect(screen.getByText("3 / 3")).toBeInTheDocument();
  });
});
