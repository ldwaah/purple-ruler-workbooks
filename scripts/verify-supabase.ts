/**
 * Verifies Supabase env + pilot tokens. Run: npm run db:verify
 */
import { createClient } from "@supabase/supabase-js";
import { loadEnvLocal } from "./load-env-local";

loadEnvLocal();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

const missing: string[] = [];
if (!url) missing.push("NEXT_PUBLIC_SUPABASE_URL");
if (!anon) missing.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");
if (!service) missing.push("SUPABASE_SERVICE_ROLE_KEY");

if (missing.length) {
  console.log("dbMode: local (env incomplete)");
  console.log("Missing:", missing.join(", "));
  process.exit(0);
}

const sb = createClient(url!, service!, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const PILOT = ["student-alex-token", "student-sam-token", "student-jordan-token"];

async function main() {
  const { error: tableErr } = await sb.from("students").select("id").limit(1);
  if (tableErr) {
    console.log("dbMode: supabase (env set) — schema NOT ready");
    console.error(tableErr.message);
    console.error("Run supabase/bootstrap.sql in the SQL editor.");
    process.exit(1);
  }

  let ok = 0;
  for (const token of PILOT) {
    const { data } = await sb
      .from("students")
      .select("name")
      .eq("token", token)
      .maybeSingle();
    if (data) ok++;
  }

  const { data: teacher } = await sb
    .from("teachers")
    .select("name")
    .eq("token", "teacher-pilot-token")
    .maybeSingle();

  console.log("dbMode: supabase");
  console.log(`Pilot students found: ${ok}/3`);
  console.log(`Teacher pilot: ${teacher ? "yes" : "no"}`);
  process.exit(ok === 3 && teacher ? 0 : 1);
}

main();
