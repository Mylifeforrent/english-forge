# English Forge UI Prototype

## Design Direction

English Forge should feel like a quiet, focused practice desk for serious daily output training. The first screen is the tool itself, not a marketing page. The interface should be dense enough for repeated use but calm enough to reduce friction.

## Primary Layout

Desktop layout:

```text
┌──────────────────────────────────────────────────────────────┐
│ English Forge                                      Stats row  │
├───────────────────────────────────────┬──────────────────────┤
│ Category filters                       │ Recent history       │
│                                       │ Review-marked chips  │
│ Chinese prompt                         │ Attempt preview      │
│ Keywords / difficulty                  │ Attempt preview      │
│                                       │ Attempt preview      │
│ Translation textarea                   │                      │
│                                       │                      │
│ Reveal answer | Save | Next | Review   │                      │
│                                       │                      │
│ Reference answer panel                 │                      │
└───────────────────────────────────────┴──────────────────────┘
```

Mobile layout:

```text
┌──────────────────────────────┐
│ English Forge                │
│ Category filters             │
│ Chinese prompt               │
│ Translation textarea         │
│ Buttons                      │
│ Reference answer             │
│ Recent history               │
└──────────────────────────────┘
```

## Core States

- **Fresh prompt**: answer panel hidden, textarea focused, save disabled until the user types.
- **Answer revealed**: reference answer, alternate phrasing, and phrase notes appear below actions.
- **Saved attempt**: a short confirmation appears and recent history refreshes.
- **Review marked**: the attempt or prompt shows a visible review indicator.
- **Empty history**: show a compact empty state, not instructional marketing copy.

## Interaction Rules

- Clicking "Reveal answer" never clears the learner's typed answer.
- Clicking "Next" loads the next filtered prompt and hides the answer panel.
- Clicking "Save" appends the current attempt to local JSONL history.
- Category filters include All, Software, Web, Java, React, AI, Daily, IELTS.
- Buttons use recognizable states and stay stable in size across desktop and mobile.

## Visual System

- Tone: focused, editorial, slightly technical.
- Palette: off-white background, ink text, muted green/teal accents, amber review marker, restrained borders.
- Typography: readable sans for UI, slightly more expressive serif or slab heading if available through CSS fallbacks.
- Avoid oversized hero sections, nested cards, decorative blobs, and generic purple gradients.
