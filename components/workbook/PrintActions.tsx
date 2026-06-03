"use client";

export function PrintActions({
  lessonId,
  backHref,
}: {
  lessonId: string;
  backHref: string;
}) {
  return (
    <div className="no-print mb-6 flex flex-wrap gap-4">
      <a href={backHref} className="text-sm text-purple-700 hover:underline">
        ← Back to interactive workbook
      </a>
      <button
        type="button"
        onClick={() => window.print()}
        className="rounded-md bg-purple-700 px-4 py-2 text-sm text-white hover:bg-purple-800"
      >
        Print
      </button>
      <a
        href={`/api/pdf/${lessonId}`}
        className="rounded-md border border-purple-700 px-4 py-2 text-sm text-purple-800 hover:bg-purple-50"
      >
        Download PDF
      </a>
    </div>
  );
}
