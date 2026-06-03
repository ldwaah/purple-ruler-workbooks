# Curriculum index

Full workbook coverage for Purple Ruler KS4 English (AQA) and Maths (Edexcel), Years 10 and 11.

## Lesson counts

| Subject | Year 10 | Year 11 | Total |
|---------|---------|---------|-------|
| English | 55 | 26 | 81 |
| Maths | 49 | 26 | 75 |
| **Total** | **104** | **52** | **156** |

Lesson units match the Purple Ruler Scheme of Work PDFs in the parent folder (grouped units such as `1-3`, `4-5`).

## Regenerating workbooks

```bash
npm run generate-workbooks
npm run validate-content
```

Source manifest: `scripts/sow-manifest.json` (extracted from SoW PDFs).

## File naming

| Pattern | Example |
|---------|---------|
| `content/lessons/{subject}/{id}.yaml` | `content/lessons/english/english.y10.l01-03.yaml` |
| ID format | `english.y10.l04-05`, `maths.y11.l37-39` |

## Validation

```bash
npm run validate-content
npm run build
```
