"use client";

import { useMemo, useState } from "react";

import { categories, type Category, type HistoryRecord, type HistoryRecordInput, type Question } from "@/lib/types";

type PracticeAppProps = {
  questions: Question[];
  initialHistory: HistoryRecord[];
  onSaveAttempt?: (record: HistoryRecordInput) => Promise<HistoryRecord>;
};

const categoryLabels: Record<Category, string> = {
  all: "All",
  software: "Software",
  web: "Web",
  java: "Java",
  react: "React",
  ai: "AI",
  daily: "Daily",
  ielts: "IELTS"
};

async function saveAttempt(record: HistoryRecordInput): Promise<HistoryRecord> {
  const response = await fetch("/api/history", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(record)
  });

  if (!response.ok) {
    throw new Error("Failed to save attempt");
  }

  return response.json();
}

export function PracticeApp({
  questions,
  initialHistory,
  onSaveAttempt = saveAttempt
}: PracticeAppProps) {
  const [category, setCategory] = useState<Category>("all");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [markedForReview, setMarkedForReview] = useState(false);
  const [history, setHistory] = useState(initialHistory);
  const [status, setStatus] = useState("");

  const filteredQuestions = useMemo(() => {
    if (category === "all") {
      return questions;
    }

    return questions.filter((question) => question.category === category);
  }, [category, questions]);

  const activeQuestion = filteredQuestions[questionIndex % filteredQuestions.length] ?? questions[0];

  function selectCategory(nextCategory: Category) {
    setCategory(nextCategory);
    setQuestionIndex(0);
    setAnswer("");
    setRevealed(false);
    setMarkedForReview(false);
    setStatus("");
  }

  function goToNextQuestion() {
    setQuestionIndex((current) => (current + 1) % filteredQuestions.length);
    setAnswer("");
    setRevealed(false);
    setMarkedForReview(false);
    setStatus("");
  }

  async function handleSave() {
    if (!answer.trim()) {
      setStatus("Write your translation first");
      return;
    }

    const saved = await onSaveAttempt({
      questionId: activeQuestion.id,
      prompt: activeQuestion.prompt,
      userAnswer: answer.trim(),
      referenceAnswer: activeQuestion.referenceAnswer,
      category: activeQuestion.category,
      difficulty: activeQuestion.difficulty,
      markedForReview
    });

    setHistory((current) => [saved, ...current].slice(0, 20));
    setStatus("Saved to local history");
  }

  return (
    <main className="shell">
      <section className="workspace" aria-label="English Forge practice">
        <header className="topbar">
          <div>
            <p className="eyebrow">Chinese to English output trainer</p>
            <h1>English Forge</h1>
          </div>
          <div className="stats" aria-label="Practice stats">
            <span>{questions.length} prompts</span>
            <span>{history.length} records</span>
          </div>
        </header>

        <div className="layout">
          <section className="practice-panel">
            <nav className="filters" aria-label="Question categories">
              {categories.map((item) => (
                <button
                  className={item === category ? "active" : ""}
                  key={item}
                  type="button"
                  onClick={() => selectCategory(item)}
                >
                  {categoryLabels[item]}
                </button>
              ))}
            </nav>

            <article className="prompt-block">
              <div className="meta">
                <span>{categoryLabels[activeQuestion.category]}</span>
                <span>{activeQuestion.difficulty}</span>
                <span>{activeQuestion.keywords.join(" / ")}</span>
              </div>
              <p className="prompt">{activeQuestion.prompt}</p>
            </article>

            <label className="answer-label" htmlFor="answer">
              Your English translation
            </label>
            <textarea
              id="answer"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              placeholder="Type your English sentence here..."
            />

            <div className="actions">
              <button type="button" onClick={() => setRevealed(true)}>
                Reveal answer
              </button>
              <button type="button" onClick={handleSave} disabled={!answer.trim()}>
                Save attempt
              </button>
              <button type="button" onClick={goToNextQuestion}>
                Next prompt
              </button>
              <button
                type="button"
                className={markedForReview ? "review active" : "review"}
                onClick={() => setMarkedForReview((current) => !current)}
              >
                Mark for review
              </button>
            </div>

            {status ? <p className="status">{status}</p> : null}

            {revealed ? (
              <section className="answer-panel" aria-label="Reference answer">
                <p className="answer-title">Reference answer</p>
                <p className="reference">{activeQuestion.referenceAnswer}</p>
                <p className="answer-title">Alternative</p>
                <p>{activeQuestion.alternatives[0]}</p>
                <p className="answer-title">Phrase note</p>
                <p>{activeQuestion.notes[0]}</p>
              </section>
            ) : null}
          </section>

          <aside className="history-panel" aria-label="Recent history">
            <div className="history-heading">
              <h2>Recent history</h2>
              <span>{history.filter((record) => record.markedForReview).length} review</span>
            </div>
            {history.length === 0 ? (
              <p className="empty">No saved attempts yet.</p>
            ) : (
              <ul>
                {history.map((record) => (
                  <li key={record.id}>
                    <span>{categoryLabels[record.category]}</span>
                    <p>{record.prompt}</p>
                    <small>{record.userAnswer}</small>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
