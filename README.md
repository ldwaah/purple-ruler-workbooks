# Purple Ruler KS4 Workbooks

Lesson-aligned add-on workbooks for Purple Ruler KS4 English (AQA) and Maths (Edexcel).

## Pilot content

- **English:** Year 10, lesson units 1-3 (*An Inspector Calls* - context)
- **Maths:** Year 10, lesson units 1-3 (Number strand)

## Quick start

```bash
cd purple-ruler-workbooks
npm install
npm run validate-content
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run validate-content` | Validate all YAML lesson files |

## Routes

| Path | Description |
|------|-------------|
| `/` | Home - subject picker |
| `/english`, `/maths` | Pilot workbook lists |
| `/workbook/[lessonId]` | Interactive workbook |
| `/workbook/[lessonId]/print` | Printable layout |
| `/api/pdf/[lessonId]` | PDF download |

## Adding content

See [docs/content-authoring.md](docs/content-authoring.md) and [docs/curriculum-index.md](docs/curriculum-index.md).

## Progress

Student responses are stored in **localStorage** on the device (`purple-ruler:progress:{lessonId}`).
