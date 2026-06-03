export function AddonBanner() {
  return (
    <div
      className="rounded-2xl border border-violet-500/25 bg-violet-950/40 px-5 py-4 backdrop-blur-sm"
      role="note"
    >
      <p className="text-sm text-violet-200/90">
        <strong className="font-display font-semibold text-violet-100">
          Add-on workbook
        </strong>{" "}
        — complete after your Purple Ruler lesson. Extra practice only; not a
        replacement for live teaching or formal assessments.
      </p>
    </div>
  );
}
