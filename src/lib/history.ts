import { mkdir, readFile, appendFile } from "node:fs/promises";
import { dirname } from "node:path";
import { randomUUID } from "node:crypto";

import type { HistoryRecord, HistoryRecordInput } from "./types";

export const defaultHistoryPath = "data/practice-history.jsonl";

export async function appendHistoryRecord(
  historyPath: string,
  input: HistoryRecordInput
): Promise<HistoryRecord> {
  const record: HistoryRecord = {
    ...input,
    id: randomUUID(),
    createdAt: new Date().toISOString()
  };

  await mkdir(dirname(historyPath), { recursive: true });
  await appendFile(historyPath, `${JSON.stringify(record)}\n`, "utf8");

  return record;
}

export async function getHistoryRecords(
  historyPath: string,
  limit = 20
): Promise<HistoryRecord[]> {
  let raw = "";

  try {
    raw = await readFile(historyPath, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    throw error;
  }

  return raw
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line) as HistoryRecord)
    .reverse()
    .slice(0, limit);
}
