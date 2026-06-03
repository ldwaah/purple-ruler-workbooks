-- All-in-one: paste into Supabase → SQL → New query → Run
-- Files: schema.sql + seed.sql (kept in sync for copy-paste convenience)

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

alter table public.teachers enable row level security;
alter table public.classes enable row level security;
alter table public.students enable row level security;
alter table public.submissions enable row level security;
alter table public.points enable row level security;

insert into public.teachers (id, name, token) values
  ('teacher-pilot', 'Pilot Teacher', 'teacher-pilot-token')
on conflict (id) do update set name = excluded.name, token = excluded.token;

insert into public.classes (id, name, teacher_id) values
  ('class-pilot-ks4', 'KS4 Pilot', 'teacher-pilot')
on conflict (id) do update set name = excluded.name, teacher_id = excluded.teacher_id;

insert into public.students (id, name, token, class_id) values
  ('student-alex', 'Alex', 'student-alex-token', 'class-pilot-ks4'),
  ('student-sam', 'Sam', 'student-sam-token', 'class-pilot-ks4'),
  ('student-jordan', 'Jordan', 'student-jordan-token', 'class-pilot-ks4')
on conflict (id) do update set
  name = excluded.name,
  token = excluded.token,
  class_id = excluded.class_id;

insert into public.points (student_id, total_points)
select id, 0 from public.students
where class_id = 'class-pilot-ks4'
on conflict (student_id) do nothing;
