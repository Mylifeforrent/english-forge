import { mkdtemp, readFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { describe, expect, it } from "vitest";

import { appendHistoryRecord, getHistoryRecords } from "./history";

describe("history storage", () => {
  it("appends attempts as JSONL and reads newest records first", async () => {
    const directory = await mkdtemp(join(tmpdir(), "english-forge-"));
    const historyPath = join(directory, "practice-history.jsonl");

    await appendHistoryRecord(historyPath, {
      questionId: "software-001",
      prompt: "我们需要在生产环境中加入更好的可观测性。",
      userAnswer: "We need better observability in production.",
      referenceAnswer: "We need to add better observability in production.",
      category: "software",
      difficulty: "B2",
      markedForReview: false
    });
    await appendHistoryRecord(historyPath, {
      questionId: "daily-001",
      prompt: "我不是很确定，但我可以先查一下。",
      userAnswer: "I am not totally sure, but I can check first.",
      referenceAnswer: "I'm not entirely sure, but I can look into it first.",
      category: "daily",
      difficulty: "B2",
      markedForReview: true
    });

    const raw = await readFile(historyPath, "utf8");
    const lines = raw.trim().split("\n");
    const records = await getHistoryRecords(historyPath, 10);

    expect(lines).toHaveLength(2);
    expect(records).toHaveLength(2);
    expect(records[0].questionId).toBe("daily-001");
    expect(records[0].markedForReview).toBe(true);
    expect(records[0].createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it("returns an empty array when history file does not exist", async () => {
    const directory = await mkdtemp(join(tmpdir(), "english-forge-"));
    const records = await getHistoryRecords(join(directory, "missing.jsonl"));

    expect(records).toEqual([]);
  });
});
