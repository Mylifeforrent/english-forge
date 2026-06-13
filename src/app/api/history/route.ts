import { NextResponse } from "next/server";
import { z } from "zod";

import { appendHistoryRecord, defaultHistoryPath, getHistoryRecords } from "@/lib/history";

export const runtime = "nodejs";

const historySchema = z.object({
  questionId: z.string().min(1),
  prompt: z.string().min(1),
  userAnswer: z.string().min(1),
  referenceAnswer: z.string().min(1),
  category: z.enum(["software", "web", "java", "react", "ai", "daily", "ielts"]),
  difficulty: z.enum(["B2", "C1"]),
  markedForReview: z.boolean()
});

export async function GET() {
  return NextResponse.json(await getHistoryRecords(defaultHistoryPath, 20));
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = historySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid history record" }, { status: 400 });
  }

  const saved = await appendHistoryRecord(defaultHistoryPath, parsed.data);
  return NextResponse.json(saved, { status: 201 });
}
