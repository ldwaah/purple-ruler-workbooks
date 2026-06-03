/**
 * Prints pilot magic links for local demo or after Supabase seed.
 * Run: npm run seed-tokens [baseUrl]
 */
import { loadEnvLocal } from "./load-env-local";
import { isSupabaseConfigured } from "../lib/db/config";

loadEnvLocal();

const base =
  process.argv[2]?.replace(/\/$/, "") ?? "http://localhost:3000";

const students = [
  { name: "Alex", token: "student-alex-token" },
  { name: "Sam", token: "student-sam-token" },
  { name: "Jordan", token: "student-jordan-token" },
];

const teacherToken = "teacher-pilot-token";
const mode = isSupabaseConfigured() ? "supabase" : "local";

console.log("\nPurple Ruler pilot magic links\n");
console.log(`Base URL: ${base}`);
console.log(`Data store: ${mode}\n`);
console.log("Students (no password):");
for (const s of students) {
  console.log(`  ${s.name}: ${base}/s/${s.token}`);
}
console.log(`\nTeacher dashboard: ${base}/t/${teacherToken}`);
if (mode === "local") {
  console.log(
    "\nWithout Supabase env, submissions use .data/local-db.json (ephemeral on Vercel).",
  );
  console.log("See README → 5-minute Supabase setup for production persistence.\n");
} else {
  console.log("\nSupabase env detected — submissions persist in your project.\n");
}
