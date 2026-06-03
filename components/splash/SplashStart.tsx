"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const SPLASH_WIDTH = 1536;
const SPLASH_HEIGHT = 1024;

export function SplashStart() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/year")}
      className="fixed inset-0 z-50 flex min-h-[100dvh] w-full cursor-pointer items-center justify-center bg-gradient-to-br from-[#7c3aed] via-[#6d28d9] to-[#5b21b6] p-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-300 sm:p-6"
      aria-label="Touch the screen to start"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-12 top-1/4 h-56 w-56 rounded-full bg-pink-400/25 blur-3xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -left-16 bottom-1/4 h-48 w-48 rounded-full bg-violet-300/30 blur-3xl"
      />

      <span className="relative flex max-h-[calc(100dvh-2rem)] max-w-[min(100%,1536px)] flex-col items-center justify-center rounded-3xl border-2 border-violet-300/40 bg-white/95 p-3 shadow-[0_8px_32px_rgba(91,33,182,0.35),0_0_0_1px_rgba(255,255,255,0.15)_inset] ring-4 ring-violet-500/20 sm:p-5">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-3 rounded-2xl bg-gradient-to-b from-violet-50/80 via-white to-violet-50/40 sm:inset-4"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_0_48px_rgba(124,58,237,0.12)]"
        />

        <Image
          src="/touch-to-start.png"
          alt="Touch the screen to start"
          width={SPLASH_WIDTH}
          height={SPLASH_HEIGHT}
          priority
          className="relative z-10 h-auto max-h-[calc(100dvh-5rem)] w-auto max-w-full object-contain"
          sizes="(max-width: 1536px) 100vw, 1536px"
        />
      </span>
    </button>
  );
}
