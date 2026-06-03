# Content authoring guide

This guide explains how to add new workbooks without changing application code.

## 1. Find the SoW row

Open the Purple Ruler scheme of work PDF for your subject. Locate:

- **Block title** (e.g. An Inspector Calls and Paper 1 Language Skills)
- **Lesson unit** number(s)
- **Unit aim** and **sub-topic objectives**
- **Teaching strategies** (use these to inspire question types, not copy verbatim)

## 2. Create a YAML file

Path pattern:

```
content/lessons/{subject}/{id}.yaml
```

**ID format:** `english.y10.l04-05` or `maths.y10.l04` (lowercase, dots only).

Copy an existing pilot file and update metadata at the top:

```yaml
id: english.y10.l04-05
subject: english
year: 10
block: inspector-paper1
blockTitle: An Inspector Calls and Paper 1 Language Skills
lessonUnits: "4-5"
examBoard: AQA
title: "Act 1 — Events and Characters"
unitAim: "..."
objectives:
  - "..."
```

## 3. Build five sections

Every lesson **must** include these section types:

| Section | Purpose | Typical items |
|---------|---------|---------------|
| `connect` | Link to live lesson | 1× `info` |
| `practice` | Scaffolded tasks | 3–5 questions |
| `check` | Low-stakes quiz | 2–3 auto-marked |
| `reflect` | Exit slip | 1× `short_text` or `long_text` |
| `stretch` | Optional challenge | 1 harder item |

## 4. Question types

| Type | Use when | Answer field |
|------|----------|--------------|
| `info` | Instructions only | `content` |
| `mcq` | Single correct option | `answer` (exact option text) |
| `multi_select` | Several correct | `answer` (array) |
| `numeric` | Numbers or symbols | `answer` (number or string) |
| `ordering` | Sequence | `answer` (ordered array) |
| `short_text` | Brief explanation | `keywords` (array) |
| `long_text` | Paragraph | `checklist`, optional `exemplar` |

Each item needs a unique `id` (e.g. `en-p1`, `m2-ch3`).

Optional fields: `scaffold`, `hint`, `explanation`, `minWords` (long_text).

## 5. Register the lesson

Add an entry to `lib/curriculum.ts` under `PILOT_LESSONS` so it appears on the subject page.

## 6. Validate

```bash
npm run validate-content
npm run build
```

## 7. Target size

Aim for **8–12 interactive items** per workbook (excluding `info`). Roughly 15–25 minutes of student time.

## Quality checklist

- [ ] Lesson unit numbers match the teacher SoW exactly
- [ ] Objectives copied or paraphrased from SoW sub-topic objectives
- [ ] No duplicate mock exam papers — use skills practice only
- [ ] SEND: scaffolds on extended writing; clear wording
- [ ] English long tasks include `checklist` and `exemplar`
- [ ] Maths numerics include `tolerance` when rounding matters

## Example workflow for lesson 4+

1. Copy `content/lessons/english/english.y10.l01-03.yaml` → `english.y10.l04-05.yaml`
2. Rewrite `objectives`, `sections`, and item prompts for Act 1
3. Add `{ id: "english.y10.l04-05", title: "...", lessonUnits: "4–5", ... }` to `PILOT_LESSONS.english.lessons`
4. Run `npm run validate-content`

No redeploy of components is required if you only add YAML and curriculum entries.
