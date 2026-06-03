# Purple Ruler KS4 Workbooks

Lesson-aligned add-on workbooks for Purple Ruler KS4 English (AQA) and Maths (Edexcel).

One central app on Vercel. Students open a **magic link** (no password). Submitting a workbook adds **10 points** to the class leaderboard. Teachers review submissions via their own magic link.

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

### Pilot magic links (local demo)

```bash
npm run seed-tokens
```

Example student link: `http://localhost:3000/s/student-alex-token`  
Teacher dashboard: `http://localhost:3000/t/teacher-pilot-token`

Flow: splash → year → hub → workbook → **Submit my work** (+10 points first time per lesson).

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | For production persistence | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | With Supabase | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | With Supabase | Server-only; used in API routes |

Without these, the app builds and runs using a **local in-memory / `.data/local-db.json` fallback** (fine for local demo; **ephemeral on Vercel** until Supabase is wired).

See [docs/supabase-setup.md](docs/supabase-setup.md) for SQL schema and Vercel env setup.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build (works without Supabase) |
| `npm run validate-content` | Validate all YAML lesson files |
| `npm run seed-tokens` | Print pilot student/teacher URLs |

## Routes

| Path | Description |
|------|-------------|
| `/` | Splash → start |
| `/year` | Year picker (requires student magic link cookie) |
| `/hub` | Subject hub + "My points" link |
| `/leaderboard` | Your points + top 5 class list |
| `/s/[token]` | Student magic link (sets session, → `/year`) |
| `/t/[token]` | Teacher submission queue |
| `/need-link` | Gentle message if workbook opened without a link |
| `/workbook/[lessonId]` | Interactive workbook + submit |
| `/workbook/[lessonId]/print` | Printable layout |
| `/api/submissions` | POST hand-in (+10 points first submit per lesson) |
| `/api/leaderboard` | GET class points |
| `/api/pdf/[lessonId]` | PDF download |

## Progress and submit

- Draft answers: **localStorage** (`purple-ruler:progress:{lessonId}`)
- Hand-in: **POST `/api/submissions`** (Supabase or local store)
- Points: **10 per lesson** on first submit; resubmit updates answers without extra points

## Adding content

See [docs/content-authoring.md](docs/content-authoring.md) and [docs/curriculum-index.md](docs/curriculum-index.md).

## Deploy (Vercel)

```bash
npm run build
vercel --prod
```

Add Supabase env vars in the Vercel dashboard for persistent submissions across serverless instances.
