import { z } from "zod";

export const sectionTypes = [
  "connect",
  "practice",
  "check",
  "reflect",
  "stretch",
] as const;

export const itemTypes = [
  "info",
  "mcq",
  "multi_select",
  "numeric",
  "ordering",
  "short_text",
  "long_text",
] as const;

const baseItem = z.object({
  id: z.string(),
  prompt: z.string(),
  scaffold: z.string().optional(),
  hint: z.string().optional(),
});

export const workbookItemSchema = z.discriminatedUnion("type", [
  baseItem.extend({
    type: z.literal("info"),
    content: z.string(),
  }),
  baseItem.extend({
    type: z.literal("mcq"),
    options: z.array(z.string()).min(2),
    answer: z.string(),
    explanation: z.string().optional(),
  }),
  baseItem.extend({
    type: z.literal("multi_select"),
    options: z.array(z.string()).min(2),
    answer: z.array(z.string()).min(1),
    explanation: z.string().optional(),
  }),
  baseItem.extend({
    type: z.literal("numeric"),
    answer: z.union([z.number(), z.string()]),
    tolerance: z.number().optional(),
    unit: z.string().optional(),
    explanation: z.string().optional(),
  }),
  baseItem.extend({
    type: z.literal("ordering"),
    options: z.array(z.string()).min(2),
    answer: z.array(z.string()).min(2),
    explanation: z.string().optional(),
  }),
  baseItem.extend({
    type: z.literal("short_text"),
    keywords: z.array(z.string()).min(1),
    exemplar: z.string().optional(),
    explanation: z.string().optional(),
  }),
  baseItem.extend({
    type: z.literal("long_text"),
    checklist: z.array(z.string()).min(1),
    exemplar: z.string().optional(),
    minWords: z.number().optional(),
  }),
]);

export const workbookSectionSchema = z.object({
  type: z.enum(sectionTypes),
  title: z.string().optional(),
  items: z.array(workbookItemSchema).min(1),
});

export const lessonSchema = z.object({
  id: z.string().regex(/^[a-z]+\.y\d+\.[a-z0-9-]+$/),
  subject: z.enum(["english", "maths"]),
  year: z.union([z.literal(10), z.literal(11)]),
  block: z.string(),
  blockTitle: z.string(),
  lessonUnits: z.string(),
  examBoard: z.string(),
  title: z.string(),
  unitAim: z.string(),
  objectives: z.array(z.string()).min(1),
  lessonsPerWeek: z.number().optional(),
  sections: z
    .array(workbookSectionSchema)
    .min(4)
    .refine(
      (sections) => {
        const types = sections.map((s) => s.type);
        return (
          types.includes("connect") &&
          types.includes("practice") &&
          types.includes("check") &&
          types.includes("reflect")
        );
      },
      {
        message:
          "Lesson must include connect, practice, check, and reflect sections",
      },
    ),
});

export type WorkbookItem = z.infer<typeof workbookItemSchema>;
export type WorkbookSection = z.infer<typeof workbookSectionSchema>;
export type Lesson = z.infer<typeof lessonSchema>;
export type SectionType = (typeof sectionTypes)[number];
