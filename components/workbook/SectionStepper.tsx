"use client";

import type { WorkbookSection } from "@/lib/schema";
import { SECTION_META } from "@/lib/section-progress";

type Props = {
  sections: WorkbookSection[];
  unlockedIndex: number;
};

export function SectionStepper({ sections, unlockedIndex }: Props) {
  return (
    <nav aria-label="Workbook progress" className="w-full">
      <ol className="relative flex flex-col gap-0">
        {sections.map((section, i) => {
          const meta = SECTION_META[section.type] ?? {
            label: section.type,
            short: String(i + 1).padStart(2, "0"),
            cheer: "",
            accent: "from-violet-500 to-purple-600",
          };
          const done = i < unlockedIndex;
          const current = i === unlockedIndex;
          const locked = i > unlockedIndex;

          return (
            <li key={section.type} className="relative flex gap-4 pb-6 last:pb-0">
              {i < sections.length - 1 && (
                <span
                  className={`absolute left-[1.125rem] top-10 bottom-0 w-px ${
                    done ? "bg-violet-400/60" : "bg-white/10"
                  }`}
                  aria-hidden
                />
              )}
              <div
                className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 font-display text-xs font-bold transition-all ${
                  current
                    ? `border-violet-300 bg-gradient-to-br ${meta.accent} text-white shadow-[0_0_24px_-4px_rgba(192,132,252,0.8)]`
                    : done
                      ? "border-violet-400/50 bg-violet-900/80 text-violet-200"
                      : "border-white/10 bg-black/40 text-violet-500/60"
                }`}
              >
                {done ? (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : locked ? (
                  <span className="text-[10px] uppercase tracking-widest opacity-60">
                    ··
                  </span>
                ) : (
                  meta.short
                )}
              </div>
              <div className="min-w-0 pt-1">
                <p
                  className={`font-display text-sm font-semibold ${
                    current
                      ? "text-white"
                      : done
                        ? "text-violet-300"
                        : "text-violet-500/50"
                  }`}
                >
                  {meta.label}
                </p>
                {current && (
                  <p className="mt-0.5 text-xs text-violet-300/80">Active now</p>
                )}
                {locked && (
                  <p className="mt-0.5 text-xs text-violet-500/40">Locked</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
