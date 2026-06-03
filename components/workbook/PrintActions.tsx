"use client";

export function PrintActions({
  lessonId,
  backHref,
}: {
  lessonId: string;
  backHref: string;
}) {
  return (
    <div className="no-print mb-6 flex flex-wrap gap-3">
      <a href={backHref} className="pr-btn-ghost text-sm">
        Back to workbook
      </a>
      <button type="button" onClick={() => window.print()} className="pr-btn-primary text-sm">
        Print
      </button>
      <a href={`/api/pdf/${lessonId}`} className="pr-btn-ghost text-sm">
        Download PDF
      </a>
    </div>
  );
}
