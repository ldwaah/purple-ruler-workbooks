/**
 * Prints pilot magic links for local demo or after Supabase seed.
 * Run: npx tsx scripts/seed-tokens.ts [baseUrl]
 */
const base =
  process.argv[2]?.replace(/\/$/, "") ?? "http://localhost:3000";

const students = [
  { name: "Alex", token: "student-alex-token" },
  { name: "Sam", token: "student-sam-token" },
  { name: "Jordan", token: "student-jordan-token" },
];

const teacherToken = "teacher-pilot-token";

console.log("\nPurple Ruler pilot magic links\n");
console.log(`Base URL: ${base}\n`);
console.log("Students (no password):");
for (const s of students) {
  console.log(`  ${s.name}: ${base}/s/${s.token}`);
}
console.log(`\nTeacher dashboard: ${base}/t/${teacherToken}`);
console.log(
  "\nWithout Supabase, submissions use local/.data store (ephemeral on Vercel).\n",
);
