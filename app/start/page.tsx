import Link from "next/link";
import { CURRICULUM, LEARNING_JOURNEY } from "@/lib/curriculum";
import { LogoMark } from "@/components/ui/LogoMark";

const SUBJECTS = ["english", "maths"] as const;

export default function StartPage() {
  return (
    <div className="space-y-10">
      <section className="pr-panel-active relative overflow-hidden px-8 py-10 sm:px-10 sm:py-12">
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-pink-200/60 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-violet-200/80 blur-2xl"
          aria-hidden
        />
        <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <LogoMark size={64} priority />
          <div>
            <h1 className="font-display text-3xl font-bold text-violet-900 sm:text-4xl pr-heading-outline">
              Choose your workbook
            </h1>
            <p className="mt-2 max-w-lg text-violet-700">
              Pick a subject below. Each workbook unlocks in small steps, just
              like levelling up.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {SUBJECTS.map((subject) => {
          const meta = CURRICULUM[subject];
          const accent =
            subject === "english"
              ? "from-violet-500 to-purple-600"
              : "from-fuchsia-500 to-pink-500";
          return (
            <Link
              key={subject}
              href={`/${subject}`}
              className="pr-panel group block p-8 transition hover:-translate-y-1 hover:border-violet-300"
            >
              <div
                className={`mb-4 inline-block rounded-2xl bg-gradient-to-br ${accent} px-4 py-2 font-display text-sm font-bold text-white`}
                style={{ boxShadow: "var(--shadow-bubble)" }}
              >
                {meta.examBoard}
              </div>
              <h2 className="font-display text-2xl font-bold text-violet-900">
                {meta.label}
              </h2>
              <p className="mt-3 text-violet-600">
                {meta.lessons.length} workbook
                {meta.lessons.length !== 1 ? "s" : ""} ready
              </p>
              <span className="mt-6 inline-block font-display text-sm font-bold text-pink-500 group-hover:text-pink-600">
                Open subject
              </span>
            </Link>
          );
        })}
      </section>

      <section className="pr-panel p-8">
        <h2 className="font-display text-xl font-bold text-violet-900">
          Your learning journey
        </h2>
        <p className="mt-2 text-sm text-violet-600">
          Full GCSE pathways for Year 10 and Year 11, aligned with your
          scheme of work.
        </p>
        <div className="mt-8 space-y-10">
          {SUBJECTS.map((subject) => {
            const meta = CURRICULUM[subject];
            const journey = LEARNING_JOURNEY[subject];
            return (
              <div key={subject}>
                <h3 className="font-display text-lg font-bold text-violet-900">
                  {meta.label}
                </h3>
                <div className="mt-4 grid gap-8 sm:grid-cols-2">
                  {([10, 11] as const).map((year) => {
                    const strands =
                      year === 10 ? journey.year10 : journey.year11;
                    return (
                      <div key={year}>
                        <h4 className="font-display font-bold text-violet-800">
                          Year {year}
                        </h4>
                        <ol className="mt-3 space-y-2 text-sm text-violet-700">
                          {strands.map((strand, index) => (
                            <li
                              key={strand}
                              className="flex gap-3 rounded-xl border border-violet-100 bg-violet-50/80 px-3 py-2"
                            >
                              <span className="font-display font-bold text-violet-400">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <span>{strand}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
