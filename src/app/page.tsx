import { PracticeApp } from "@/components/practice-app";
import { defaultHistoryPath, getHistoryRecords } from "@/lib/history";
import { getQuestions } from "@/lib/questions";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [questions, history] = await Promise.all([
    getQuestions(),
    getHistoryRecords(defaultHistoryPath, 20)
  ]);

  return <PracticeApp questions={questions} initialHistory={history} />;
}
