import type { WorkbookItem, WorkbookSection } from "./schema";
import type { ItemResponse } from "./progress";

export const SECTION_META: Record<
  string,
  { label: string; short: string; cheer: string; accent: string }
> = {
  connect: {
    label: "Warm-up",
    short: "01",
    cheer: "Nice — you are ready for practice.",
    accent: "from-violet-500 to-purple-600",
  },
  practice: {
    label: "Practice",
    short: "02",
    cheer: "Practice done. Unlock the next step.",
    accent: "from-cyan-500 to-blue-600",
  },
  check: {
    label: "Quick check",
    short: "03",
    cheer: "Great check. Keep going.",
    accent: "from-emerald-500 to-teal-600",
  },
  reflect: {
    label: "Think it over",
    short: "04",
    cheer: "Thoughtful work. One more step left.",
    accent: "from-amber-500 to-orange-600",
  },
  stretch: {
    label: "Super stretch",
    short: "05",
    cheer: "You finished the whole workbook.",
    accent: "from-fuchsia-500 to-pink-600",
  },
};

export function isItemAnswered(
  item: WorkbookItem,
  response?: ItemResponse,
): boolean {
  if (item.type === "info") return true;

  const value = response?.value;
  if (value === undefined || value === null || value === "") return false;
  if (Array.isArray(value) && value.length === 0) return false;

  if (item.type === "long_text") {
    const words = String(value).trim().split(/\s+/).filter(Boolean).length;
    const min = Math.min(item.minWords ?? 30, 15);
    return words >= min;
  }

  if (item.type === "short_text") {
    return String(value).trim().length >= 8;
  }

  return true;
}

export function isSectionComplete(
  section: WorkbookSection,
  responses: Record<string, ItemResponse>,
): boolean {
  const tasks = section.items.filter((i) => i.type !== "info");
  if (tasks.length === 0) return true;
  return tasks.every((item) => isItemAnswered(item, responses[item.id]));
}

export function inferUnlockedIndex(
  sections: WorkbookSection[],
  responses: Record<string, ItemResponse>,
  saved?: number,
): number {
  if (saved !== undefined && saved >= 0) {
    return Math.min(saved, sections.length - 1);
  }

  let unlocked = 0;
  for (let i = 0; i < sections.length; i++) {
    if (isSectionComplete(sections[i], responses)) {
      unlocked = Math.min(i + 1, sections.length - 1);
    } else {
      break;
    }
  }
  return unlocked;
}
