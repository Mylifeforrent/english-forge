import { NextRequest, NextResponse } from "next/server";

import { categories, getQuestions } from "@/lib/questions";
import type { Category } from "@/lib/types";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category") ?? "all";
  const safeCategory = categories.includes(category as Category)
    ? (category as Category)
    : "all";

  return NextResponse.json(await getQuestions(safeCategory));
}
