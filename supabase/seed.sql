-- Pilot class, teacher, students (alex, sam, jordan). Safe to re-run.

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
