# English Forge PRD

## 1. Executive Summary

**Problem Statement**: The learner has IELTS 6.5 overall, with speaking 6.0 and writing 6.5, and often understands individual words but cannot quickly assemble natural English sentences for speaking.

**Proposed Solution**: Build a focused local web app for Chinese-to-English output practice. The learner reads a Chinese prompt, types an English translation, reveals a reference answer, and saves the attempt to a local history file for later review.

**Success Criteria**:
- The learner can complete a practice cycle in under 60 seconds: prompt, answer, reveal, save, next.
- The MVP includes 120 curated prompts across software development, daily conversation, and IELTS writing.
- Each saved attempt is appended to a local project-path history file in JSONL format.
- Practice history remains available after browser refresh and server restart.
- The UI works on desktop and mobile widths without overlapping text or controls.

## 2. User Experience & Functionality

**User Personas**:
- Primary user: an IELTS 6.5 learner who wants to convert Chinese meaning into natural spoken/written English.
- Secondary user: a software developer preparing for English work communication, interviews, meetings, and technical explanations.

**User Stories**:
- As a learner, I want to see one Chinese prompt at a time so that I can focus on active English output.
- As a learner, I want to type my own translation before seeing the answer so that I can expose expression gaps.
- As a learner, I want to reveal a reference answer with useful variants so that I can learn natural phrasing, not word-by-word translation.
- As a learner, I want my attempts saved locally so that I can organize review notes later.
- As a learner, I want to filter prompts by domain so that I can practice software, daily, or IELTS writing language depending on my goal.

**Acceptance Criteria**:
- The main page displays a Chinese prompt, category, difficulty, keywords, and a large answer box.
- The reference answer is hidden until the user clicks "Reveal answer".
- The user can save an attempt with their answer, the prompt, the reference answer, category, difficulty, review flag, and timestamp.
- The app stores history in `data/practice-history.jsonl` under the project runtime path.
- The app reads and displays recent history from the local file.
- The user can move to the next prompt without losing the current typed answer unless they intentionally reset or save.

**Non-Goals**:
- No account system, cloud sync, multi-user permissions, or database service in the MVP.
- No AI scoring, speech recognition, or automatic pronunciation feedback in the MVP.
- No spaced repetition scheduler beyond a simple "mark for review" flag in the MVP.
- No large content management workflow; prompts are curated in a local JSON file.

## 3. AI System Requirements

No AI runtime is required for the MVP. The app uses curated static prompts and reference answers. A future version may add AI answer feedback, but the MVP avoids API keys, model cost, and quality variance.

## 4. Technical Specifications

**Architecture Overview**:
- Next.js App Router project with a single primary practice page.
- Local JSON prompt bank loaded from `data/questions.json`.
- API routes expose questions and history.
- The browser sends practice attempts to the server, and the server appends JSONL records to local disk.

**Integration Points**:
- `GET /api/questions`: returns the local prompt bank, with optional category filtering.
- `GET /api/history`: returns recent local practice records.
- `POST /api/history`: validates and appends a practice record to `data/practice-history.jsonl`.

**Security & Privacy**:
- All learning history stays on the user's machine by default.
- API validation rejects missing question IDs, missing answers, and invalid payload shapes.
- File writes are limited to the local `data` directory inside the project.

## 5. Risks & Roadmap

**Phased Rollout**:
- MVP: one-page practice flow, 120 curated prompts, local JSONL history, responsive UI.
- v1.1: export history to Markdown, stronger review filters, prompt search, favorite phrases.
- v2.0: optional AI feedback, spoken-answer mode, spaced repetition, custom imported prompt sets.

**Technical Risks**:
- Local file writing does not work on static-only hosting; MVP is intended for local Next.js server usage.
- JSONL history can grow large over time; future versions may paginate or rotate history files.
- Reference answers must avoid translationese; the prompt bank should prioritize natural expressions.
