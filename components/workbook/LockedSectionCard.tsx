import type { WorkbookSection } from "@/lib/schema";
import { SECTION_META } from "@/lib/section-progress";

export function LockedSectionCard({
  section,
  index,
}: {
  section: WorkbookSection;
  index: number;
}) {
  const meta = SECTION_META[section.type] ?? {
    label: section.type,
    short: String(index + 1).padStart(2, "0"),
    cheer: "",
    accent: "",
  };

  return (
    <div
      className="flex items-center gap-4 rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/50 px-5 py-4"
      aria-hidden
    >
      <span className="font-display text-lg font-bold text-violet-300">
        {meta.short}
      </span>
      <div>
        <p className="font-display text-xs font-bold uppercase tracking-wider text-violet-400">
          Step {index + 1} (locked)
        </p>
        <p className="font-display text-base text-violet-500">
          {section.title ?? meta.label}
        </p>
      </div>
    </div>
  );
}
