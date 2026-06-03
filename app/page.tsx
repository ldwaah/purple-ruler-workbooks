import Link from "next/link";
import { PILOT_LESSONS, LEARNING_JOURNEY } from "@/lib/curriculum";
import { LogoMark } from "@/components/ui/LogoMark";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl pr-panel-active px-8 py-14 sm:px-12 sm:py-20">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/30 blur-[100px]"
          aria-hidden
        />
        <LogoMark size={72} priority className="relative mb-6" />
        <p className="relative font-display text-xs font-semibold uppercase tracking-[0.25em] text-violet-300">
          Beyond the classroom
        </p>
        <h1 className="relative mt-4 max-w-2xl font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
          Workbooks built for your orbit
        </h1>
        <p className="relative mt-6 max-w-xl text-base text-violet-200/85 sm:text-lg">
          Lesson-aligned practice that unlocks one sector at a time. No endless
          scroll — just focused steps mapped to your Purple Ruler scheme of work.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {(["english", "maths"] as const).map((subject) => {
          const meta = PILOT_LESSONS[subject];
          return (
            <Link
              key={subject}
              href={`/${subject}`}
              className="group relative overflow-hidden rounded-2xl pr-panel p-8 transition hover:border-violet-400/40"
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-violet-500/20 blur-2xl transition group-hover:bg-fuchsia-500/25"
                aria-hidden
              />
              <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                {meta.examBoard}
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-white">
                {meta.label}
              </h2>
              <p className="mt-4 text-sm text-violet-300/80">
                {meta.lessons.length} workbook
                {meta.lessons.length !== 1 ? "s" : ""} ready
              </p>
              <span className="mt-6 inline-block font-display text-sm font-semibold text-fuchsia-300 group-hover:text-fuchsia-200">
                Enter →
              </span>
            </Link>
          );
        })}
      </section>

      <section className="pr-panel p-8">
        <h2 className="font-display text-lg font-bold text-white">
          Learning journey
        </h2>
        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-violet-400">
              English · Year 10
            </h3>
            <ul className="mt-3 space-y-2 border-l border-violet-500/30 pl-4 text-sm text-violet-200/80">
              {LEARNING_JOURNEY.english.year10.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-violet-400">
              Maths · Year 10
            </h3>
            <ul className="mt-3 space-y-2 border-l border-violet-500/30 pl-4 text-sm text-violet-200/80">
              {LEARNING_JOURNEY.maths.year10.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
