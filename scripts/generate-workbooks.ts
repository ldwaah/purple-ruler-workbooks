import fs from "fs";
import path from "path";
import yaml from "js-yaml";

type LessonEntry = {
  units: string;
  block: string;
  blockTitle: string;
  title: string;
  unitAim: string;
  objectives: string[];
};

type Manifest = {
  english: { year10: LessonEntry[]; year11: LessonEntry[] };
  maths: { year10: LessonEntry[]; year11: LessonEntry[] };
};

const ROOT = path.join(process.cwd());
const manifest: Manifest = JSON.parse(
  fs.readFileSync(path.join(ROOT, "scripts", "sow-manifest.json"), "utf8"),
);

function unitsToId(units: string): string {
  if (units.includes(".")) {
    return `l${units.replace(/\./g, "-")}`;
  }
  const parts = units.split("-");
  return (
    "l" +
    parts
      .map((p) => {
        const n = parseInt(p, 10);
        return n < 10 ? String(n).padStart(2, "0") : p;
      })
      .join("-")
  );
}

function lessonId(
  subject: "english" | "maths",
  year: 10 | 11,
  units: string,
): string {
  return `${subject}.y${year}.${unitsToId(units)}`;
}

function slugPrefix(subject: string, year: number, index: number): string {
  const s = subject === "english" ? "en" : "m";
  return `${s}${year}${String(index).padStart(2, "0")}`;
}

function buildEnglishYaml(
  entry: LessonEntry,
  subject: "english",
  year: 10 | 11,
  index: number,
): Record<string, unknown> {
  const id = lessonId(subject, year, entry.units);
  const p = slugPrefix(subject, year, index);
  const blockLabel = entry.blockTitle.split(" ")[0] ?? "English";

  return {
    id,
    subject,
    year,
    block: entry.block,
    blockTitle: entry.blockTitle,
    lessonUnits: entry.units,
    examBoard: "AQA",
    title: entry.title,
    lessonsPerWeek: 3,
    unitAim: entry.unitAim,
    objectives: entry.objectives,
    sections: [
      {
        type: "connect",
        title: "Connect to your lesson",
        items: [
          {
            type: "info",
            id: `${p}-c1`,
            prompt: "What we covered in your Purple Ruler lesson",
            content: `Lesson ${entry.units} focused on ${entry.title.toLowerCase()}. You explored key ideas from ${entry.blockTitle} and built skills linked to your GCSE English objectives. Use this workbook after your live lesson to consolidate that learning.`,
          },
        ],
      },
      {
        type: "practice",
        title: "Practice",
        items: [
          {
            type: "mcq",
            id: `${p}-p1`,
            prompt: `Which objective best matches Lesson ${entry.units}?`,
            options: [
              entry.objectives[0],
              "Memorise dates only without analysis",
              "Ignore context when writing about texts",
              "Skip planning before extended writing",
            ],
            answer: entry.objectives[0],
            scaffold: "Choose the aim that matches what you practised in the live lesson.",
          },
          {
            type: "short_text",
            id: `${p}-p2`,
            prompt: `In one or two sentences, explain a key idea from "${entry.title}".`,
            keywords: ["understand", "analyse", "explain", "context", "theme", "character", "language", "structure"],
            exemplar: entry.objectives[0],
          },
          {
            type: "ordering",
            id: `${p}-p3`,
            prompt: "Order these study skills from first step to final step:",
            options: [
              "Review the lesson objective",
              "Collect evidence or examples",
              "Plan your response",
              "Write and check your answer",
            ],
            answer: [
              "Review the lesson objective",
              "Collect evidence or examples",
              "Plan your response",
              "Write and check your answer",
            ],
          },
          {
            type: "mcq",
            id: `${p}-p4`,
            prompt: `Which skill is most important for ${blockLabel} work in this unit?`,
            options: [
              "Using evidence to support ideas",
              "Ignoring the question focus",
              "Copying text without comment",
              "Avoiding subject terminology",
            ],
            answer: "Using evidence to support ideas",
          },
        ],
      },
      {
        type: "check",
        title: "Check your understanding",
        items: [
          {
            type: "multi_select",
            id: `${p}-ch1`,
            prompt: "Select ALL habits that strengthen GCSE English responses:",
            options: [
              "Clear topic sentences",
              "Evidence from the text",
              "Ignoring the question",
              "Checking for accurate terminology",
            ],
            answer: [
              "Clear topic sentences",
              "Evidence from the text",
              "Checking for accurate terminology",
            ],
          },
          {
            type: "short_text",
            id: `${p}-ch2`,
            prompt: "Name one subject term you should use when writing about this unit.",
            keywords: ["context", "theme", "structure", "language", "audience", "purpose", "character", "analysis"],
            exemplar: "Use precise terminology such as context, theme, or structure.",
          },
          {
            type: "mcq",
            id: `${p}-ch3`,
            prompt: "What should you do first when answering an extended question?",
            options: [
              "Plan your main points",
              "Write the conclusion first",
              "Copy the question as your answer",
              "Skip reading the text",
            ],
            answer: "Plan your main points",
          },
        ],
      },
      {
        type: "reflect",
        title: "Reflect",
        items: [
          {
            type: "long_text",
            id: `${p}-rf1`,
            prompt: `Write a short paragraph (about 40-60 words) explaining what you learned in Lesson ${entry.units}.`,
            scaffold: `In Lesson ${entry.units}, I learned that...`,
            checklist: [
              "I stated the main idea from the lesson",
              "I used at least one piece of subject terminology",
              "I linked my learning to the unit aim",
            ],
            exemplar: entry.unitAim,
            minWords: 30,
          },
        ],
      },
      {
        type: "stretch",
        title: "Stretch",
        items: [
          {
            type: "long_text",
            id: `${p}-st1`,
            prompt: `Evaluate how confident you feel about "${entry.title}" and what you will revise next. (50-70 words)`,
            checklist: [
              "I identified one strength",
              "I identified one area to improve",
              "I suggested a specific next step",
            ],
            minWords: 40,
          },
        ],
      },
    ],
  };
}

function buildMathsYaml(
  entry: LessonEntry,
  subject: "maths",
  year: 10 | 11,
  index: number,
): Record<string, unknown> {
  const id = lessonId(subject, year, entry.units);
  const p = slugPrefix(subject, year, index);

  return {
    id,
    subject,
    year,
    block: entry.block,
    blockTitle: entry.blockTitle,
    lessonUnits: entry.units,
    examBoard: "Edexcel",
    title: entry.title,
    lessonsPerWeek: 2,
    unitAim: entry.unitAim,
    objectives: entry.objectives,
    sections: [
      {
        type: "connect",
        title: "Connect to your lesson",
        items: [
          {
            type: "info",
            id: `${p}-c1`,
            prompt: "What we covered in your Purple Ruler lesson",
            content: `Lesson ${entry.units} focused on ${entry.title}. You practised skills from ${entry.blockTitle} and applied them to GCSE-style questions. Use this workbook after your live lesson to strengthen your understanding.`,
          },
        ],
      },
      {
        type: "practice",
        title: "Practice",
        items: [
          {
            type: "mcq",
            id: `${p}-p1`,
            prompt: `Which habit helps you succeed in Lesson ${entry.units}?`,
            options: [
              "Show clear working for each step",
              "Guess without checking",
              "Skip units in calculations",
              "Avoid revising methods",
            ],
            answer: "Show clear working for each step",
          },
          {
            type: "numeric",
            id: `${p}-p2`,
            prompt: "Calculate 15% of 80",
            answer: 12,
            explanation: "15% of 80 = 0.15 × 80 = 12",
          },
          {
            type: "mcq",
            id: `${p}-p3`,
            prompt: "Which value is equal to 3/4?",
            options: ["0.34", "0.75", "0.43", "7.5"],
            answer: "0.75",
          },
          {
            type: "ordering",
            id: `${p}-p4`,
            prompt: "Order these problem-solving steps:",
            options: [
              "Read the question carefully",
              "Choose a method",
              "Show working",
              "Check the answer",
            ],
            answer: [
              "Read the question carefully",
              "Choose a method",
              "Show working",
              "Check the answer",
            ],
          },
        ],
      },
      {
        type: "check",
        title: "Check your understanding",
        items: [
          {
            type: "numeric",
            id: `${p}-ch1`,
            prompt: "Simplify: 4x + 3x",
            answer: "7x",
          },
          {
            type: "mcq",
            id: `${p}-ch2`,
            prompt: "Which symbol makes this true? -2 ___ -5",
            options: [">", "<", "=", "≥"],
            answer: ">",
            explanation: "-2 is greater than -5 on a number line.",
          },
          {
            type: "numeric",
            id: `${p}-ch3`,
            prompt: "Calculate 2.5 × 4",
            answer: 10,
            tolerance: 0.01,
          },
        ],
      },
      {
        type: "reflect",
        title: "Reflect",
        items: [
          {
            type: "short_text",
            id: `${p}-rf1`,
            prompt: `Name one skill from "${entry.title}" you will practise again.`,
            keywords: ["method", "working", "formula", "check", "practice", "accuracy"],
            exemplar: entry.objectives[0],
          },
        ],
      },
      {
        type: "stretch",
        title: "Stretch",
        items: [
          {
            type: "numeric",
            id: `${p}-st1`,
            prompt: "A shirt costs £24. Find the price after a 15% increase.",
            answer: 27.6,
            tolerance: 0.1,
            explanation: "Increase = 24 × 0.15 = 3.6, new price = 27.6",
          },
        ],
      },
    ],
  };
}

function generateCurriculumTs(): string {
  const lines: string[] = [
    `export type LessonMeta = {`,
    `  id: string;`,
    `  title: string;`,
    `  lessonUnits: string;`,
    `  blockTitle: string;`,
    `  year: 10 | 11;`,
    `  block: string;`,
    `};`,
    ``,
    `export type SubjectCurriculum = {`,
    `  label: string;`,
    `  examBoard: string;`,
    `  lessonsPerWeek: number;`,
    `  lessons: LessonMeta[];`,
    `  byYear: {`,
    `    year10: { blockTitle: string; block: string; lessons: LessonMeta[] }[];`,
    `    year11: { blockTitle: string; block: string; lessons: LessonMeta[] }[];`,
    `  };`,
    `};`,
    ``,
    `function groupByBlock(entries: LessonEntry[], year: 10 | 11, subject: "english" | "maths"): SubjectCurriculum["byYear"]["year10"] {`,
    `  const blocks = new Map<string, { blockTitle: string; block: string; lessons: LessonMeta[] }>();`,
    `  for (const e of entries) {`,
    `    const key = e.block;`,
    `    if (!blocks.has(key)) {`,
    `      blocks.set(key, { blockTitle: e.blockTitle, block: e.block, lessons: [] });`,
    `    }`,
    `    blocks.get(key)!.lessons.push({`,
    `      id: \`\${subject}.y\${year}.\${e.units.replace(/\\./g, "-").replace(/^/, "l")}\`.replace(".yl", ".y").replace(/\\.y(\\d+)\\.l/, (_, y) => \`.y\${y}.l\`),`,
    `      title: e.title,`,
    `      lessonUnits: e.units,`,
    `      blockTitle: e.blockTitle,`,
    `      year,`,
    `      block: e.block,`,
    `    });`,
    `  }`,
    `  return Array.from(blocks.values());`,
    `}`,
    ``,
  ];

  // Simpler: build data inline
  function buildSubject(
    subject: "english" | "maths",
    data: { year10: LessonEntry[]; year11: LessonEntry[] },
  ): string {
    const allLessons: string[] = [];
    const year10Blocks = new Map<string, LessonMetaBuild[]>();
    const year11Blocks = new Map<string, LessonMetaBuild[]>();

    type LessonMetaBuild = {
      id: string;
      title: string;
      lessonUnits: string;
      blockTitle: string;
      year: 10 | 11;
      block: string;
    };

    for (const year of [10, 11] as const) {
      const entries = year === 10 ? data.year10 : data.year11;
      const blockMap = year === 10 ? year10Blocks : year11Blocks;
      entries.forEach((e) => {
        const meta: LessonMetaBuild = {
          id: lessonId(subject, year, e.units),
          title: e.title,
          lessonUnits: e.units,
          blockTitle: e.blockTitle,
          year,
          block: e.block,
        };
        allLessons.push(JSON.stringify(meta));
        if (!blockMap.has(e.block)) {
          blockMap.set(e.block, []);
        }
        blockMap.get(e.block)!.push(meta);
      });
    }

    const formatBlock = (
      blockMap: Map<string, LessonMetaBuild[]>,
      entries: LessonEntry[],
    ) => {
      const order: string[] = [];
      for (const e of entries) {
        if (!order.includes(e.block)) order.push(e.block);
      }
      return order
        .map((blockKey) => {
          const first = entries.find((e) => e.block === blockKey)!;
          const lessons = blockMap.get(blockKey) ?? [];
          const lessonStrs = lessons
            .map(
              (l) =>
                `        { id: "${l.id}", title: ${JSON.stringify(l.title)}, lessonUnits: "${l.lessonUnits}", blockTitle: ${JSON.stringify(l.blockTitle)}, year: ${l.year}, block: "${l.block}" },`,
            )
            .join("\n");
          return `      {
        block: "${blockKey}",
        blockTitle: ${JSON.stringify(first.blockTitle)},
        lessons: [
${lessonStrs}
        ],
      }`;
        })
        .join(",\n");
    };

    const examBoard = subject === "english" ? "AQA" : "Edexcel";
    const lessonsPerWeek = subject === "english" ? 3 : 2;
    const label =
      subject === "english"
        ? "English Language & Literature"
        : "Mathematics";

    const flatLessons = [...data.year10, ...data.year11]
      .map((e, i, arr) => {
        const year = i < data.year10.length ? 10 : 11;
        const yr = i < data.year10.length ? 10 : 11;
        return null;
      });

    const allMeta: LessonMetaBuild[] = [];
    for (const year of [10, 11] as const) {
      const entries = year === 10 ? data.year10 : data.year11;
      entries.forEach((e) => {
        allMeta.push({
          id: lessonId(subject, year, e.units),
          title: e.title,
          lessonUnits: e.units,
          blockTitle: e.blockTitle,
          year,
          block: e.block,
        });
      });
    }

    const flatStr = allMeta
      .map(
        (l) =>
          `      { id: "${l.id}", title: ${JSON.stringify(l.title)}, lessonUnits: "${l.lessonUnits}", blockTitle: ${JSON.stringify(l.blockTitle)}, year: ${l.year}, block: "${l.block}" },`,
      )
      .join("\n");

    return `  ${subject}: {
    label: ${JSON.stringify(label)},
    examBoard: "${examBoard}",
    lessonsPerWeek: ${lessonsPerWeek},
    lessons: [
${flatStr}
    ],
    byYear: {
      year10: [
${formatBlock(year10Blocks, data.year10)}
      ],
      year11: [
${formatBlock(year11Blocks, data.year11)}
      ],
    },
  }`;
  }

  return [
    `export type LessonMeta = {`,
    `  id: string;`,
    `  title: string;`,
    `  lessonUnits: string;`,
    `  blockTitle: string;`,
    `  year: 10 | 11;`,
    `  block: string;`,
    `};`,
    ``,
    `export type YearBlock = {`,
    `  block: string;`,
    `  blockTitle: string;`,
    `  lessons: LessonMeta[];`,
    `};`,
    ``,
    `export type SubjectCurriculum = {`,
    `  label: string;`,
    `  examBoard: string;`,
    `  lessonsPerWeek: number;`,
    `  lessons: LessonMeta[];`,
    `  byYear: { year10: YearBlock[]; year11: YearBlock[] };`,
    `};`,
    ``,
    `export const CURRICULUM: Record<"english" | "maths", SubjectCurriculum> = {`,
    buildSubject("english", manifest.english),
    `,`,
    buildSubject("maths", manifest.maths),
    `};`,
    ``,
    `export const LEARNING_JOURNEY = {`,
    `  english: {`,
    `    year10: [`,
    ...[
      ...new Set(manifest.english.year10.map((e) => e.blockTitle)),
    ].map((s) => `      ${JSON.stringify(s)},`),
    `    ],`,
    `    year11: [`,
    ...[
      ...new Set(manifest.english.year11.map((e) => e.blockTitle)),
    ].map((s) => `      ${JSON.stringify(s)},`),
    `    ],`,
    `  },`,
    `  maths: {`,
    `    year10: [`,
    ...[
      ...new Set(manifest.maths.year10.map((e) => e.blockTitle)),
    ].map((s) => `      ${JSON.stringify(s)},`),
    `    ],`,
    `    year11: [`,
    ...[
      ...new Set(manifest.maths.year11.map((e) => e.blockTitle)),
    ].map((s) => `      ${JSON.stringify(s)},`),
    `    ],`,
    `  },`,
    `};`,
    ``,
    `export function getLessonsForYear(`,
    `  subject: "english" | "maths",`,
    `  year: 10 | 11,`,
    `): LessonMeta[] {`,
    `  return CURRICULUM[subject].lessons.filter((l) => l.year === year);`,
    `}`,
    ``,
    `/** @deprecated Use CURRICULUM instead */`,
    `export const PILOT_LESSONS = CURRICULUM;`,
  ].join("\n");
}

function main() {
  let generated = 0;
  const counts = { english: { y10: 0, y11: 0 }, maths: { y10: 0, y11: 0 } };

  for (const subject of ["english", "maths"] as const) {
    for (const year of [10, 11] as const) {
      const entries =
        year === 10 ? manifest[subject].year10 : manifest[subject].year11;
      const dir = path.join(ROOT, "content", "lessons", subject);
      fs.mkdirSync(dir, { recursive: true });

      entries.forEach((entry, index) => {
        const id = lessonId(subject, year, entry.units);
        const data =
          subject === "english"
            ? buildEnglishYaml(entry, subject, year, index + 1)
            : buildMathsYaml(entry, subject, year, index + 1);

        const filePath = path.join(dir, `${id}.yaml`);
        fs.writeFileSync(filePath, yaml.dump(data, { lineWidth: 100 }));
        generated++;
        if (year === 10) counts[subject].y10++;
        else counts[subject].y11++;
      });
    }
  }

  fs.writeFileSync(
    path.join(ROOT, "lib", "curriculum.ts"),
    generateCurriculumTs(),
  );

  console.log(`Generated ${generated} workbook YAML files`);
  console.log(
    `English: Y10=${counts.english.y10}, Y11=${counts.english.y11}, total=${counts.english.y10 + counts.english.y11}`,
  );
  console.log(
    `Maths: Y10=${counts.maths.y10}, Y11=${counts.maths.y11}, total=${counts.maths.y10 + counts.maths.y11}`,
  );
}

main();
