# Supabase setup for Purple Ruler workbooks

One central Vercel app stores student submissions, points, and teacher review. Students use magic links (`/s/[token]`). No student passwords.

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a project.
2. Open **Project Settings → API** and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` secret → `SUPABASE_SERVICE_ROLE_KEY` (server only, never expose to the browser)

Add these in Vercel: **Project → Settings → Environment Variables** for Production and Preview.

## 2. Run the SQL schema

In the Supabase SQL editor, run:

```sql
-- Classes (optional simple grouping)
create table if not exists public.classes (
  id text primary key,
  name text not null,
  teacher_id text not null references public.teachers (id) on delete cascade
);

create table if not exists public.teachers (
  id text primary key,
  name text not null,
  token text not null unique
);

-- Fix order: teachers must exist before classes FK
-- If you already created classes, create teachers first without FK, then add FK.

create table if not exists public.students (
  id text primary key,
  name text not null,
  token text not null unique,
  class_id text not null references public.classes (id) on delete cascade
);

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  student_id text not null references public.students (id) on delete cascade,
  lesson_id text not null,
  responses jsonb not null default '{}',
  status text not null default 'submitted' check (status in ('submitted', 'draft')),
  submitted_at timestamptz not null default now(),
  file_url text,
  unique (student_id, lesson_id)
);

create table if not exists public.points (
  student_id text primary key references public.students (id) on delete cascade,
  total_points integer not null default 0
);

create index if not exists submissions_student_idx on public.submissions (student_id);
create index if not exists submissions_submitted_at_idx on public.submissions (submitted_at desc);
create index if not exists students_class_idx on public.students (class_id);

-- RLS: API uses service role; enable RLS and deny anon direct access
alter table public.teachers enable row level security;
alter table public.classes enable row level security;
alter table public.students enable row level security;
alter table public.submissions enable row level security;
alter table public.points enable row level security;
```

Recommended bootstrap order if FK errors occur:

```sql
create table if not exists public.teachers (
  id text primary key,
  name text not null,
  token text not null unique
);

create table if not exists public.classes (
  id text primary key,
  name text not null,
  teacher_id text not null references public.teachers (id) on delete cascade
);

create table if not exists public.students (
  id text primary key,
  name text not null,
  token text not null unique,
  class_id text not null references public.classes (id) on delete cascade
);

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  student_id text not null references public.students (id) on delete cascade,
  lesson_id text not null,
  responses jsonb not null default '{}',
  status text not null default 'submitted',
  submitted_at timestamptz not null default now(),
  file_url text,
  unique (student_id, lesson_id)
);

create table if not exists public.points (
  student_id text primary key references public.students (id) on delete cascade,
  total_points integer not null default 0
);
```

## 3. Seed pilot rows

```sql
insert into public.teachers (id, name, token) values
  ('teacher-pilot', 'Pilot Teacher', 'teacher-pilot-token')
on conflict (id) do nothing;

insert into public.classes (id, name, teacher_id) values
  ('class-pilot-ks4', 'KS4 Pilot', 'teacher-pilot')
on conflict (id) do nothing;

insert into public.students (id, name, token, class_id) values
  ('student-alex', 'Alex', 'student-alex-token', 'class-pilot-ks4'),
  ('student-sam', 'Sam', 'student-sam-token', 'class-pilot-ks4'),
  ('student-jordan', 'Jordan', 'student-jordan-token', 'class-pilot-ks4')
on conflict (id) do nothing;

insert into public.points (student_id, total_points)
select id, 0 from public.students
on conflict (student_id) do nothing;
```

Magic links (replace host with your Vercel URL):

- Student Alex: `https://YOUR_APP.vercel.app/s/student-alex-token`
- Teacher: `https://YOUR_APP.vercel.app/t/teacher-pilot-token`

## 4. Optional: file uploads

Printed work uploads are not required for MVP. To add later:

1. Create a Supabase Storage bucket `submissions`.
2. Upload from an API route with the service role.
3. Save `file_url` on `submissions`.

## 5. Local demo without Supabase

If env vars are missing, the app uses an in-memory / `.data/local-db.json` store with the same pilot tokens. Data on Vercel serverless is ephemeral until Supabase is configured.
