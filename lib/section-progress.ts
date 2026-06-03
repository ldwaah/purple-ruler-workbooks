import type { WorkbookItem, WorkbookSection } from "./schema";
import type { ItemResponse } from "./progress";

export const SECTION_META: Record<
  string,
  { emoji: string; label: string; cheer: string }
> = {
  connect: { emoji: "👋", label: "Warm-up", cheer: "Great start — let's go!" },
  practice: { emoji: "✏️", label: "Practice", cheer: "You're getting the hang of it!" },
  check: { emoji: "⭐", label: "Quick check", cheer: "Nice work on that quiz!" },
  reflect: { emoji: "💭", label: "Think it over", cheer: "Brilliant thinking!" },
  stretch: { emoji: "🚀", label: "Super stretch", cheer: "Wow — workbook complete!" },
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
