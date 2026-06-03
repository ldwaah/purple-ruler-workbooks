export function AddonBanner() {
  return (
    <div
      className="rounded-2xl border-2 border-violet-100 bg-gradient-to-r from-violet-50 to-pink-50 px-5 py-4"
      role="note"
    >
      <p className="text-sm text-violet-800">
        <strong className="font-display text-violet-900">Goes with your lesson</strong>{" "}
        — do this workbook after your Purple Ruler class. It is extra practice, not
        a replacement for live teaching or formal tests.
      </p>
    </div>
  );
}
