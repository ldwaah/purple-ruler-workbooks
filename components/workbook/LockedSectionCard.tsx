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
    emoji: "📘",
    label: section.type,
    cheer: "",
  };

  return (
    <div
      className="flex items-center gap-4 rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/60 px-5 py-4 opacity-80"
      aria-hidden
    >
      <span className="text-3xl grayscale">{meta.emoji}</span>
      <div>
        <p className="font-display text-sm font-bold text-violet-400">
          Step {index + 1} — locked
        </p>
        <p className="font-display text-lg text-violet-500">
          {section.title ?? meta.label}
        </p>
        <p className="text-sm text-violet-400">
          Finish the bit above to unlock this part 🔓
        </p>
      </div>
    </div>
  );
}
