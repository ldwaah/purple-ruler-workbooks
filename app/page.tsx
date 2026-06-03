import Link from "next/link";
import { PILOT_LESSONS, LEARNING_JOURNEY } from "@/lib/curriculum";
import { Mascot } from "@/components/ui/Mascot";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="cartoon-card flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:text-left">
        <Mascot size="lg" mood="cheer" />
        <div>
          <h1 className="font-display text-3xl font-bold text-violet-900 sm:text-4xl">
            Your KS4 workbook adventure!
          </h1>
          <p className="mt-2 max-w-xl text-violet-800">
            Short, colourful practice that matches your Purple Ruler lessons.
            One step unlocks the next — no giant scroll of doom!
          </p>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        {(["english", "maths"] as const).map((subject) => {
          const meta = PILOT_LESSONS[subject];
          const emoji = subject === "english" ? "📖" : "🔢";
          return (
            <Link
              key={subject}
              href={`/${subject}`}
              className="cartoon-card block p-6 transition hover:scale-[1.02] hover:border-violet-400"
            >
              <span className="text-4xl" aria-hidden>
                {emoji}
              </span>
              <h2 className="mt-2 font-display text-xl font-bold text-violet-900">
                {meta.label}
              </h2>
              <p className="text-sm font-semibold text-fuchsia-600">
                {meta.examBoard}
              </p>
              <p className="mt-3 text-sm text-violet-700">
                {meta.lessons.length} workbook
                {meta.lessons.length !== 1 ? "s" : ""} ready · tap to start
              </p>
            </Link>
          );
        })}
      </section>

      <section className="cartoon-card p-6">
        <h2 className="font-display text-lg font-bold text-violet-900">
          Where you&apos;re headed 🗺️
        </h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="font-display font-bold text-violet-800">
              English — Year 10
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-violet-700">
              {LEARNING_JOURNEY.english.year10.map((s) => (
                <li key={s}>✦ {s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display font-bold text-violet-800">
              Maths — Year 10
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-violet-700">
              {LEARNING_JOURNEY.maths.year10.map((s) => (
                <li key={s}>✦ {s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
