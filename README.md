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

## 5-minute Supabase setup (production persistence)

Without Supabase, Vercel deployments use an **ephemeral in-memory store** — submissions and leaderboard reset across serverless instances.

1. **Create a project** at [supabase.com/dashboard](https://supabase.com/dashboard) (free).
2. **Copy API keys** from **Settings → API** into `.env.local` (see [`.env.example`](.env.example)):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. **Run SQL once:** Supabase → **SQL** → paste [`supabase/bootstrap.sql`](supabase/bootstrap.sql) → **Run**.
4. **Optional seed script:** `npm run db:bootstrap` then `npm run db:verify`.
5. **Vercel:** add the same three variables under **Settings → Environment Variables** (Production + Preview), or:
   ```bash
   ./scripts/sync-vercel-env.sh production
   vercel --prod
   ```
6. **Check:** `npm run test:api` locally — response includes `"dbMode":"supabase"` when env is complete.

Full detail: [docs/supabase-setup.md](docs/supabase-setup.md).

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | For production persistence | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | With Supabase | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | With Supabase | Server-only; used in API routes |

Copy [`.env.example`](.env.example) → `.env.local` for local development.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build (works without Supabase) |
| `npm run validate-content` | Validate all YAML lesson files |
| `npm run seed-tokens` | Print pilot student/teacher URLs |
| `npm run db:verify` | Check Supabase env + pilot rows |
| `npm run db:bootstrap` | Upsert pilot seed via API (after SQL) |
| `npm run test:api` | Curl smoke test (leaderboard + submit) |

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
| `/api/leaderboard` | GET class points (`dbMode` in JSON) |
| `/api/pdf/[lessonId]` | PDF download |

## Progress and submit

- Draft answers: **localStorage** (`purple-ruler:progress:{lessonId}`)
- Hand-in: **POST `/api/submissions`** (Supabase when all three env vars are set, else local store)
- Points: **10 per lesson** on first submit; resubmit updates answers without extra points

## Adding content

See [docs/content-authoring.md](docs/content-authoring.md) and [docs/curriculum-index.md](docs/curriculum-index.md).

## Deploy (Vercel)

```bash
npm run build
vercel --prod
```

Add Supabase env vars (see **5-minute Supabase setup** above) for persistent submissions across serverless instances.
