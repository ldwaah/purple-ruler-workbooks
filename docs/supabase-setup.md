# Supabase setup for Purple Ruler workbooks

One central Vercel app stores student submissions, points, and teacher review. Students use magic links (`/s/[token]`). No student passwords.

## Quick links

| Step | URL |
|------|-----|
| Create free project | [supabase.com/dashboard](https://supabase.com/dashboard) |
| API keys (env vars) | Project → **Settings → API** |
| Run SQL | Project → **SQL → New query** |
| Vercel env vars | [vercel.com](https://vercel.com) → your project → **Settings → Environment Variables** |

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a project (free tier is fine).
2. Open **Project Settings → API** and copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **`anon` public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **`service_role` secret** → `SUPABASE_SERVICE_ROLE_KEY` (server only; never expose to the browser)

Local: copy `.env.example` to `.env.local` and paste the three values.

Vercel: add the same three names for **Production** and **Preview**, or run (after `.env.local` is filled):

```bash
./scripts/sync-vercel-env.sh production
./scripts/sync-vercel-env.sh preview
vercel --prod
```

## 2. Run the SQL schema + seed

**Easiest:** open [SQL editor](https://supabase.com/dashboard/project/_/sql/new), paste the contents of [`supabase/bootstrap.sql`](../supabase/bootstrap.sql), and **Run**.

Or run the split files in order:

1. [`supabase/schema.sql`](../supabase/schema.sql)
2. [`supabase/seed.sql`](../supabase/seed.sql)

Tables: `teachers`, `classes`, `students`, `submissions`, `points`. RLS is enabled; the Next.js API uses the **service role** key only on the server.

## 3. Optional: seed via script (after SQL)

If `.env.local` has your keys and tables exist:

```bash
npm run db:bootstrap
npm run db:verify
```

## 4. Pilot magic links

Production (or set `NEXT_PUBLIC_APP_URL` in `.env.local`):

```bash
npm run seed-tokens https://purpleruler.vercel.app
```

Local:

```bash
npm run seed-tokens
# or: npm run seed-tokens http://localhost:3000
```

| Who | Link |
|-----|------|
| Alex | `/s/student-alex-token` |
| Sam | `/s/student-sam-token` |
| Jordan | `/s/student-jordan-token` |
| Teacher | `/t/teacher-pilot-token` |

## 5. Verify persistence

```bash
npm run dev
npm run test:api
# Leaderboard JSON should show "dbMode":"local" without env, "supabase" with all three vars set
```

On Vercel, `GET /api/leaderboard?token=student-alex-token` returns `dbMode: "supabase"` only when all three env vars are set.

## 6. Vercel env checklist (current project)

As of setup, these must be added manually if not using `sync-vercel-env.sh`:

| Variable | Environments |
|----------|----------------|
| `NEXT_PUBLIC_APP_URL` | Production, Preview (`https://purpleruler.vercel.app`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Production, Preview |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production, Preview |
| `SUPABASE_SERVICE_ROLE_KEY` | Production, Preview |

Check with: `vercel env ls production`

## 7. Optional: file uploads

Printed work uploads are not required for MVP. To add later:

1. Create a Supabase Storage bucket `submissions`.
2. Upload from an API route with the service role.
3. Save `file_url` on `submissions`.

## 8. Local demo without Supabase

If env vars are missing, the app uses `.data/local-db.json` with the same pilot tokens. Data on Vercel serverless is **ephemeral** until Supabase is configured.
