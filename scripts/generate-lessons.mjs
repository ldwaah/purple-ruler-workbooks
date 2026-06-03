#!/usr/bin/env node
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { allLessons } from "./curriculum-data.mjs";

const ROOT = path.join(import.meta.dirname, "..");
const CONTENT = path.join(ROOT, "content", "lessons");

function lessonSlug(units) {
  const parts = units.split("-").map((p) => {
    const n = p.replace(/\./g, "");
    if (/^\d+$/.test(n) && n.length === 1) return `0${n}`;
    return n;
  });
  return `l${parts.join("-")}`;
}

function prefix(subject, year, units, section, n) {
  const s = subject === "english" ? "en" : "m";
  const u = units.replace(/[.-]/g, "");
  return `${s}${year}${u}-${section}${n}`;
}

function buildEnglishItems(lesson, section) {
  const topic = lesson.title;
  const aim = lesson.unitAim;
  const obj = lesson.objectives[0] ?? aim;
  const id = (s, n) => prefix(lesson.subject, lesson.year, lesson.lessonUnits, s, n);

  if (section === "connect") {
    return [
      {
        type: "info",
        id: id("c", 1),
        prompt: "What we covered in your Purple Ruler lesson",
        content: `Lessons ${lesson.lessonUnits} focus on ${topic}. ${aim} Use this workbook after your live lesson to consolidate that learning.`,
      },
    ];
  }

  if (section === "practice") {
    return [
      {
        type: "mcq",
        id: id("p", 1),
        prompt: `Which statement best matches the focus of "${topic}"?`,
        options: [
          obj,
          "Memorising quotations without analysis",
          "Ignoring historical and social context",
          "Writing without planning or evidence",
        ],
        answer: obj,
        scaffold: "Think back to your lesson objectives and key terminology.",
      },
      {
        type: "short_text",
        id: id("p", 2),
        prompt: `In one or two sentences, explain a key idea from ${topic}.`,
        keywords: topic.toLowerCase().split(/\W+/).filter((w) => w.length > 4).slice(0, 5),
        scaffold: `A key idea from ${topic} is...`,
        exemplar: `${obj}. This helps you analyse the text with clear, supported ideas.`,
      },
      {
        type: "mcq",
        id: id("p", 3),
        prompt: "Which skill is most important for GCSE English success in this unit?",
        options: [
          "Using evidence and subject terminology",
          "Copying the plot with no analysis",
          "Avoiding context completely",
          "Writing without checking accuracy",
        ],
        answer: "Using evidence and subject terminology",
      },
      {
        type: "ordering",
        id: id("p", 4),
        prompt: "Put these steps for a strong analytical paragraph in the best order:",
        options: [
          "State a clear point linked to the question",
          "Select a relevant quotation or reference",
          "Explain the writer's method and effect",
          "Link back to the question or theme",
        ],
        answer: [
          "State a clear point linked to the question",
          "Select a relevant quotation or reference",
          "Explain the writer's method and effect",
          "Link back to the question or theme",
        ],
      },
    ];
  }

  if (section === "check") {
    return [
      {
        type: "multi_select",
        id: id("ch", 1),
        prompt: `Select ALL objectives linked to ${topic}:`,
        options: [...lesson.objectives, "Ignore audience and purpose", "Skip planning entirely"],
        answer: lesson.objectives,
      },
      {
        type: "short_text",
        id: id("ch", 2),
        prompt: "Name one subject term you should use when writing about this unit.",
        keywords: ["context", "theme", "method", "structure", "language", "audience", "purpose", "character"],
        exemplar: "Use terms such as context, theme, structure, or writer's methods with precise evidence.",
      },
      {
        type: "mcq",
        id: id("ch", 3),
        prompt: "After your live lesson, this workbook helps you to:",
        options: [
          "Consolidate and practise what you learned",
          "Replace all reading of the set texts",
          "Skip reflection on your work",
          "Avoid using feedback from teachers",
        ],
        answer: "Consolidate and practise what you learned",
      },
    ];
  }

  if (section === "reflect") {
    return [
      {
        type: "long_text",
        id: id("rf", 1),
        prompt: `Write about 40-60 words: what did you learn in ${topic}, and what do you still need to practise?`,
        scaffold: `In ${topic}, I learned... I still need to practise...`,
        checklist: [
          "I named a specific skill or idea from the lesson",
          "I gave an example from the text or task",
          "I identified one next step for improvement",
        ],
        minWords: 30,
        exemplar: `In ${topic}, I learned how to link context to the writer's purpose. I still need to practise selecting shorter, sharper quotations and explaining their effect in more detail.`,
      },
    ];
  }

  return [
    {
      type: "long_text",
      id: id("st", 1),
      prompt: `Stretch: write 50-80 words comparing two ideas from ${topic}. Which is more convincing and why?`,
      checklist: [
        "Clear comparison between two ideas",
        "Evidence or example from the unit",
        "Evaluative judgement with justification",
      ],
      minWords: 45,
      exemplar: `Both ideas are important, but linking context to theme is more convincing because it shows why the writer made choices for a real audience, not only what happens in the plot.`,
    },
  ];
}

function buildMathsItems(lesson, section) {
  const topic = lesson.title;
  const aim = lesson.unitAim;
  const obj = lesson.objectives[0] ?? aim;
  const id = (s, n) => prefix(lesson.subject, lesson.year, lesson.lessonUnits, s, n);

  if (section === "connect") {
    return [
      {
        type: "info",
        id: id("c", 1),
        prompt: "What we covered in your Purple Ruler lesson",
        content: `Lessons ${lesson.lessonUnits} cover ${topic}. ${aim} Use this workbook after your live lesson to practise and check your understanding.`,
      },
    ];
  }

  if (section === "practice") {
    return [
      {
        type: "mcq",
        id: id("p", 1),
        prompt: `Which aim best describes "${topic}"?`,
        options: [obj, "Ignore units and notation", "Guess without showing working", "Skip checking answers"],
        answer: obj,
      },
      {
        type: "numeric",
        id: id("p", 2),
        prompt: "Calculate: 3/4 + 1/8 (give as a decimal).",
        answer: 0.875,
        explanation: "3/4 = 0.75; 0.75 + 0.125 = 0.875",
      },
      {
        type: "mcq",
        id: id("p", 3),
        prompt: "When solving GCSE maths problems, you should:",
        options: [
          "Show clear working and check the answer",
          "Hide all working from the examiner",
          "Never include units",
          "Skip reading the question",
        ],
        answer: "Show clear working and check the answer",
      },
      {
        type: "numeric",
        id: id("p", 4),
        prompt: "Simplify: 4x + 3x - 2 (give the coefficient of x as a number, e.g. if answer is 7x-2 write 7).",
        answer: 7,
        explanation: "4x + 3x = 7x, so coefficient is 7",
      },
    ];
  }

  if (section === "check") {
    return [
      {
        type: "mcq",
        id: id("ch", 1),
        prompt: `Which skill is central to ${topic}?`,
        options: [
          lesson.objectives[0],
          "Rounding every answer to the nearest 10 only",
          "Using the wrong formula deliberately",
          "Avoiding diagrams completely",
        ],
        answer: lesson.objectives[0],
      },
      {
        type: "numeric",
        id: id("ch", 2),
        prompt: "What is 15% of 80?",
        answer: 12,
      },
      {
        type: "numeric",
        id: id("ch", 3),
        prompt: "Solve: 2x + 5 = 17. What is x?",
        answer: 6,
      },
    ];
  }

  if (section === "reflect") {
    return [
      {
        type: "short_text",
        id: id("rf", 1),
        prompt: `Explain in one sentence what was challenging in ${topic} and how you overcame it (or will next time).`,
        keywords: ["practice", "method", "working", "check", "formula", "mistake", "help"],
        exemplar: `I found choosing the correct method hardest, so I will write a short plan before calculating and check units at the end.`,
      },
    ];
  }

  return [
    {
      type: "numeric",
      id: id("st", 1),
      prompt: "Stretch: A rectangle has perimeter 30 cm and length 9 cm. What is its width in cm?",
      answer: 6,
      explanation: "Perimeter = 2(l + w); 30 = 2(9 + w); 15 = 9 + w; w = 6",
    },
  ];
}

function buildLessonYaml(lesson) {
  const builder = lesson.subject === "english" ? buildEnglishItems : buildMathsItems;
  return {
    id: lesson.id,
    subject: lesson.subject,
    year: lesson.year,
    block: lesson.block,
    blockTitle: lesson.blockTitle,
    lessonUnits: lesson.lessonUnits,
    examBoard: lesson.examBoard,
    title: lesson.title,
    lessonsPerWeek: lesson.lessonsPerWeek,
    unitAim: lesson.unitAim,
    objectives: lesson.objectives,
    sections: [
      { type: "connect", title: "Connect to your lesson", items: builder(lesson, "connect") },
      { type: "practice", title: "Practice", items: builder(lesson, "practice") },
      { type: "check", title: "Check your understanding", items: builder(lesson, "check") },
      { type: "reflect", title: "Reflect", items: builder(lesson, "reflect") },
      { type: "stretch", title: "Stretch", items: builder(lesson, "stretch") },
    ],
  };
}

function writeCurriculumTs(lessons) {
  const english = lessons.filter((l) => l.subject === "english");
  const maths = lessons.filter((l) => l.subject === "maths");

  const toMeta = (l) => ({
    id: l.id,
    title: l.title,
    lessonUnits: l.lessonUnits.replace(/-/g, "\u2013"),
    blockTitle: l.blockTitle,
    year: l.year,
  });

  const file = `export type LessonMeta = {
  id: string;
  title: string;
  lessonUnits: string;
  blockTitle: string;
  year: 10 | 11;
};

export type SubjectCurriculum = {
  label: string;
  examBoard: string;
  lessonsPerWeek: number;
  lessons: LessonMeta[];
};

export const CURRICULUM: Record<"english" | "maths", SubjectCurriculum> = {
  english: {
    label: "English Language & Literature",
    examBoard: "AQA",
    lessonsPerWeek: 3,
    lessons: ${JSON.stringify(english.map(toMeta), null, 4).replace(/"year": 10/g, '"year": 10 as const').replace(/"year": 11/g, '"year": 11 as const')},
  },
  maths: {
    label: "Mathematics",
    examBoard: "Edexcel",
    lessonsPerWeek: 2,
    lessons: ${JSON.stringify(maths.map(toMeta), null, 4).replace(/"year": 10/g, '"year": 10 as const').replace(/"year": 11/g, '"year": 11 as const')},
  },
};

/** @deprecated Use CURRICULUM */
export const PILOT_LESSONS = CURRICULUM;

export const LEARNING_JOURNEY = {
  english: {
    year10: [
      "Descriptive writing & Paper 1 skills",
      "An Inspector Calls",
      "Macbeth",
      "Power and Conflict poetry",
      "Unseen poetry",
    ],
    year11: [
      "A Christmas Carol",
      "Creative reading & writing (Paper 1)",
      "Paper 2 skills",
      "Revision & consolidation",
    ],
  },
  maths: {
    year10: [
      "Number (place value, fractions, ratio)",
      "Algebra",
      "Geometry & measures",
      "Statistics",
    ],
    year11: [
      "Geometry & vectors",
      "Statistics & probability",
      "Graphs & algebra",
      "Revision course",
    ],
  },
};
`;

  fs.writeFileSync(path.join(ROOT, "lib", "curriculum.ts"), file);
}

function main() {
  const lessons = allLessons().map((l) => ({
    ...l,
    id: `${l.subject}.y${l.year}.${lessonSlug(l.lessonUnits)}`,
  }));

  for (const subject of ["english", "maths"]) {
    const dir = path.join(CONTENT, subject);
    fs.mkdirSync(dir, { recursive: true });
    for (const f of fs.readdirSync(dir)) {
      if (f.endsWith(".yaml") || f.endsWith(".yml")) fs.unlinkSync(path.join(dir, f));
    }
  }

  for (const lesson of lessons) {
    const dir = path.join(CONTENT, lesson.subject);
    const data = buildLessonYaml(lesson);
    const out = path.join(dir, `${lesson.id}.yaml`);
    fs.writeFileSync(out, yaml.dump(data, { lineWidth: 120, noRefs: true }));
  }

  writeCurriculumTs(lessons);

  const counts = { english: { 10: 0, 11: 0 }, maths: { 10: 0, 11: 0 } };
  for (const l of lessons) counts[l.subject][l.year]++;
  console.log("Generated", lessons.length, "lessons");
  console.log(JSON.stringify(counts, null, 2));
}

main();
