# English Forge

English Forge is a local Chinese-to-English output trainer for an IELTS 6.5 learner who wants to speak and write more naturally in software, web, Java, React, AI, daily conversation, and IELTS writing contexts.

## Features

- 120 curated Chinese-to-English practice prompts.
- One-page practice flow: type, reveal answer, save attempt, move next.
- Reference answer, alternative phrasing, and phrase note for each prompt.
- Category filters for software, web, Java, React, AI, daily, and IELTS topics.
- Local JSONL history saved at `data/practice-history.jsonl`.
- Responsive layout for desktop and mobile practice.

## Commands

```bash
npm install
npm run dev
npm test
npm run lint
npm run build
```

Open `http://localhost:3000` after starting the dev server.

## Local History

Saved attempts are appended to:

```text
data/practice-history.jsonl
```

Each line is one JSON record with the prompt, your answer, the reference answer, category, difficulty, review flag, and timestamp. The file is ignored by Git so personal practice notes stay local.
