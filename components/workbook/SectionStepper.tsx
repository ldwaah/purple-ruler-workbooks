"use client";

import type { WorkbookSection } from "@/lib/schema";
import { SECTION_META } from "@/lib/section-progress";

type Props = {
  sections: WorkbookSection[];
  unlockedIndex: number;
};

export function SectionStepper({ sections, unlockedIndex }: Props) {
  return (
    <ol className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {sections.map((section, i) => {
        const meta = SECTION_META[section.type] ?? {
          emoji: "📘",
          label: section.type,
          cheer: "",
        };
        const unlocked = i <= unlockedIndex;
        const current = i === unlockedIndex;
        const done = i < unlockedIndex;

        return (
          <li key={section.type} className="flex items-center gap-2">
            <div
              className={`flex flex-col items-center rounded-2xl border-3 px-3 py-2 text-center transition-all ${
                current
                  ? "cartoon-card-pop border-4 border-violet-500 bg-white shadow-lg scale-105"
                  : done
                    ? "border-emerald-400 bg-emerald-50 opacity-90"
                    : unlocked
                      ? "border-violet-300 bg-violet-50"
                      : "border-gray-200 bg-gray-100 opacity-50"
              }`}
              title={meta.label}
            >
              <span className="text-2xl" aria-hidden>
                {done ? "✅" : unlocked ? meta.emoji : "🔒"}
              </span>
              <span className="mt-0.5 text-xs font-bold text-violet-900">
                {meta.label}
              </span>
            </div>
            {i < sections.length - 1 && (
              <span
                className={`hidden text-lg sm:inline ${done ? "opacity-100" : "opacity-30"}`}
                aria-hidden
              >
                →
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
