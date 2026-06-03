export type PilotLessonMeta = {
  id: string;
  title: string;
  lessonUnits: string;
  blockTitle: string;
};

export const PILOT_LESSONS: Record<
  "english" | "maths",
  { label: string; examBoard: string; lessonsPerWeek: number; lessons: PilotLessonMeta[] }
> = {
  english: {
    label: "English Language & Literature",
    examBoard: "AQA",
    lessonsPerWeek: 3,
    lessons: [
      {
        id: "english.y10.l01-03",
        title: "An Inspector Calls - Context",
        lessonUnits: "1-3",
        blockTitle: "An Inspector Calls and Paper 1 Language Skills",
      },
    ],
  },
  maths: {
    label: "Mathematics",
    examBoard: "Edexcel",
    lessonsPerWeek: 2,
    lessons: [
      {
        id: "maths.y10.l01",
        title: "Place Value & Inequality Symbols",
        lessonUnits: "1",
        blockTitle: "Number",
      },
      {
        id: "maths.y10.l02",
        title: "Ordering Integers",
        lessonUnits: "2",
        blockTitle: "Number",
      },
      {
        id: "maths.y10.l03",
        title: "Decimals & Place Value",
        lessonUnits: "3",
        blockTitle: "Number",
      },
    ],
  },
};

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
