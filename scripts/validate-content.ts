import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { lessonSchema } from "../lib/schema";
import { PILOT_LESSONS } from "../lib/curriculum";

const CONTENT_DIR = path.join(process.cwd(), "content", "lessons");

function getYamlFiles(): string[] {
  const files: string[] = [];
  for (const subject of ["english", "maths"]) {
    const dir = path.join(CONTENT_DIR, subject);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (f.endsWith(".yaml") || f.endsWith(".yml")) {
        files.push(path.join(dir, f));
      }
    }
  }
  return files;
}

function main() {
  const files = getYamlFiles();
  if (files.length === 0) {
    console.error("No YAML lesson files found.");
    process.exit(1);
  }

  const ids = new Set<string>();
  let errors = 0;

  for (const file of files) {
    const raw = fs.readFileSync(file, "utf8");
    let data: unknown;
    try {
      data = yaml.load(raw);
    } catch (e) {
      console.error(`${file}: invalid YAML`, e);
      errors++;
      continue;
    }

    const result = lessonSchema.safeParse(data);
    if (!result.success) {
      console.error(`${file}: schema validation failed`);
      console.error(result.error.format());
      errors++;
      continue;
    }

    if (ids.has(result.data.id)) {
      console.error(`Duplicate lesson id: ${result.data.id}`);
      errors++;
    }
    ids.add(result.data.id);
    console.log(`✓ ${result.data.id}`);
  }

  for (const subject of ["english", "maths"] as const) {
    for (const meta of PILOT_LESSONS[subject].lessons) {
      if (!ids.has(meta.id)) {
        console.warn(
          `⚠ Pilot lesson ${meta.id} listed in curriculum but no YAML file`,
        );
      }
    }
  }

  if (errors > 0) {
    console.error(`\n${errors} error(s).`);
    process.exit(1);
  }

  console.log(`\nValidated ${ids.size} lesson(s) successfully.`);
}

main();
