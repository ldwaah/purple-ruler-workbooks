/**
 * Upserts pilot seed rows when Supabase tables already exist.
 * Schema must be applied first (SQL editor: supabase/bootstrap.sql).
 *
 * Run: npm run db:bootstrap
 */
import { createClient } from "@supabase/supabase-js";
import { loadEnvLocal } from "./load-env-local";

loadEnvLocal();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local",
  );
  console.error("Copy .env.example → .env.local and add keys from Supabase API settings.");
  process.exit(1);
}

const sb = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function upsert(
  table: string,
  rows: Record<string, unknown>[],
  onConflict: string,
): Promise<void> {
  const { error } = await sb.from(table).upsert(rows, { onConflict });
  if (error) throw new Error(`${table}: ${error.message}`);
}

async function main() {
  const probe = await sb.from("teachers").select("id").limit(1);
  if (probe.error) {
    console.error("Cannot reach teachers table:", probe.error.message);
    console.error(
      "\nRun supabase/bootstrap.sql in the Supabase SQL editor first:\n" +
        "  https://supabase.com/dashboard/project/_/sql/new\n",
    );
    process.exit(1);
  }

  await upsert(
    "teachers",
    [{ id: "teacher-pilot", name: "Pilot Teacher", token: "teacher-pilot-token" }],
    "id",
  );
  await upsert(
    "classes",
    [{ id: "class-pilot-ks4", name: "KS4 Pilot", teacher_id: "teacher-pilot" }],
    "id",
  );
  await upsert(
    "students",
    [
      {
        id: "student-alex",
        name: "Alex",
        token: "student-alex-token",
        class_id: "class-pilot-ks4",
      },
      {
        id: "student-sam",
        name: "Sam",
        token: "student-sam-token",
        class_id: "class-pilot-ks4",
      },
      {
        id: "student-jordan",
        name: "Jordan",
        token: "student-jordan-token",
        class_id: "class-pilot-ks4",
      },
    ],
    "id",
  );

  const { data: students } = await sb
    .from("students")
    .select("id")
    .eq("class_id", "class-pilot-ks4");
  if (students?.length) {
    await upsert(
      "points",
      students.map((s) => ({ student_id: s.id, total_points: 0 })),
      "student_id",
    );
  }

  console.log("Supabase pilot seed OK (teacher + 3 students + points rows).");
  console.log("Run: npm run seed-tokens [your-vercel-url]");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
