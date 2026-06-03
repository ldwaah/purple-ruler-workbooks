import type { Lesson } from "@/lib/schema";

const SECTION_LABELS: Record<string, string> = {
  connect: "Connect",
  practice: "Practice",
  check: "Check",
  reflect: "Reflect",
  stretch: "Stretch",
};

export function PrintWorkbook({ lesson }: { lesson: Lesson }) {
  let q = 0;

  return (
    <article className="print-workbook mx-auto max-w-3xl space-y-6 p-8 text-base text-gray-900">
      <header className="border-b-2 border-purple-700 pb-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-purple-700">
          Purple Ruler - KS4 Workbook (add-on)
        </p>
        <h1 className="mt-2 text-2xl font-bold">{lesson.title}</h1>
        <p className="mt-1 text-sm">
          {lesson.subject === "english" ? "English" : "Mathematics"} · Year{" "}
          {lesson.year} · Lesson unit(s) {lesson.lessonUnits} · {lesson.examBoard}
        </p>
        <p className="text-sm">Block: {lesson.blockTitle}</p>
      </header>

      <p className="text-sm italic">{lesson.unitAim}</p>

      {lesson.sections.map((section) => (
        <section key={section.type} className="break-inside-avoid">
          <h2 className="border-b border-gray-400 pb-1 text-lg font-bold">
            {section.title ?? SECTION_LABELS[section.type]}
          </h2>
          <div className="mt-3 space-y-4">
            {section.items.map((item) => {
              const num = item.type === "info" ? null : ++q;
              return (
                <div key={item.id} className="space-y-2">
                  <p className="font-medium">
                    {num !== null ? `${num}. ` : ""}
                    {item.prompt}
                  </p>
                  {item.scaffold && (
                    <p className="text-sm italic text-gray-600">
                      Scaffold: {item.scaffold}
                    </p>
                  )}
                  {item.type === "info" && "content" in item && (
                    <p className="text-sm whitespace-pre-wrap">{item.content}</p>
                  )}
                  {(item.type === "mcq" || item.type === "multi_select") && (
                    <ul className="ml-4 list-disc text-sm">
                      {item.options.map((o) => (
                        <li key={o}>{o}</li>
                      ))}
                    </ul>
                  )}
                  {item.type === "ordering" && (
                    <ol className="ml-4 list-decimal text-sm">
                      {item.options.map((o) => (
                        <li key={o}>{o}</li>
                      ))}
                    </ol>
                  )}
                  <div className="min-h-[2.5rem] border-b border-dotted border-gray-400" />
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <footer className="border-t pt-4 text-xs text-gray-500">
        Complete after your Purple Ruler lesson. Progress can be saved online at
        the workbook URL.
      </footer>
    </article>
  );
}
