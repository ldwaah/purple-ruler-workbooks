import { Mascot } from "@/components/ui/Mascot";

export function AddonBanner() {
  return (
    <div
      className="flex items-start gap-3 rounded-2xl border-2 border-violet-300 bg-gradient-to-r from-violet-100 to-fuchsia-100 px-4 py-3"
      role="note"
    >
      <Mascot size="sm" mood="think" className="shrink-0" />
      <p className="text-sm text-violet-900">
        <strong className="font-display">Hey — this goes with your lesson!</strong>{" "}
        Do this workbook after your Purple Ruler class to practise what you
        learned. It&apos;s extra practice, not a test day 🙂
      </p>
    </div>
  );
}
