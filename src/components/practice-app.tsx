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

function formatRecordTime(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

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
  const progressLabel = `${(questionIndex % filteredQuestions.length) + 1} / ${filteredQuestions.length}`;

  function resetPracticeState() {
    setAnswer("");
    setRevealed(false);
    setMarkedForReview(false);
    setStatus("");
  }

  function selectCategory(nextCategory: Category) {
    setCategory(nextCategory);
    setQuestionIndex(0);
    resetPracticeState();
  }

  function goToPreviousQuestion() {
    setQuestionIndex((current) => (current - 1 + filteredQuestions.length) % filteredQuestions.length);
    resetPracticeState();
  }

  function goToNextQuestion() {
    setQuestionIndex((current) => (current + 1) % filteredQuestions.length);
    resetPracticeState();
  }

  function selectQuestion(questionId: string) {
    const nextIndex = filteredQuestions.findIndex((question) => question.id === questionId);

    if (nextIndex === -1) {
      return;
    }

    setQuestionIndex(nextIndex);
    resetPracticeState();
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
            <h1>English Forge</h1>
            <p className="subhead">Chinese to English output practice</p>
          </div>
          <div className="stats" aria-label="Practice stats">
            <span>{questions.length} prompts</span>
            <span>{history.length} records</span>
          </div>
        </header>

        <div className="layout">
          <section className="practice-panel">
            <div className="section-head">
              <div>
                <p className="section-kicker">Current prompt</p>
                <p className="section-title">Translate the meaning, then compare.</p>
              </div>
              <span className="progress">{progressLabel}</span>
            </div>

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

            <div className="prompt-nav" aria-label="Prompt navigation">
              <button type="button" onClick={goToPreviousQuestion}>
                Previous prompt
              </button>
              <label className="question-picker">
                <span>Choose prompt</span>
                <select
                  aria-label="Choose prompt"
                  value={activeQuestion.id}
                  onChange={(event) => selectQuestion(event.target.value)}
                >
                  {filteredQuestions.map((question, index) => (
                    <option key={question.id} value={question.id}>
                      {String(index + 1).padStart(2, "0")} · {question.prompt}
                    </option>
                  ))}
                </select>
              </label>
              <button type="button" onClick={goToNextQuestion}>
                Next prompt
              </button>
            </div>

            <article className="prompt-block">
              <div className="meta">
                <span>{categoryLabels[activeQuestion.category]}</span>
                <span>{activeQuestion.difficulty}</span>
                <span>{activeQuestion.keywords.join(" / ")}</span>
              </div>
              <p className="prompt">{activeQuestion.prompt}</p>
            </article>

            <div className="writing-block">
              <label className="answer-label" htmlFor="answer">
                Your English translation
              </label>
              <textarea
                id="answer"
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                placeholder="Type your English sentence here..."
              />
            </div>

            <div className="actions">
              <button type="button" onClick={() => setRevealed(true)}>
                Reveal answer
              </button>
              <button type="button" onClick={handleSave} disabled={!answer.trim()}>
                Save attempt
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
                <div>
                  <p className="answer-title">Reference</p>
                  <p className="reference">{activeQuestion.referenceAnswer}</p>
                </div>
                <div className="answer-grid">
                  <div>
                    <p className="answer-title">Alternative</p>
                    <p>{activeQuestion.alternatives[0]}</p>
                  </div>
                  <div>
                    <p className="answer-title">Phrase note</p>
                    <p>{activeQuestion.notes[0]}</p>
                  </div>
                </div>
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
                    <div className="history-meta">
                      <span>{categoryLabels[record.category]}</span>
                      <span>{formatRecordTime(record.createdAt)}</span>
                      {record.markedForReview ? <strong>Review</strong> : null}
                    </div>
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
