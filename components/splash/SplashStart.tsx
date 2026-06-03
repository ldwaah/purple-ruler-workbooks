"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const LOGO_WIDTH = 674;
const LOGO_HEIGHT = 142;

export function SplashStart() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/start")}
      className="splash-room fixed inset-0 z-50 flex min-h-[100dvh] w-full cursor-pointer flex-col items-center justify-center gap-10 px-6 focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-400"
      aria-label="Touch the screen to start"
    >
      <div className="flex w-full max-w-2xl flex-col items-center gap-10">
        <Image
          src="/purple-ruler-logo.avif"
          alt="Purple Ruler"
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          priority
          className="h-auto w-full max-w-[min(90vw,520px)]"
          sizes="(max-width: 768px) 90vw, 520px"
        />

        <p className="splash-cta font-display text-center text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          <span className="text-[#7c3aed]">Touch the screen</span>
          <span className="text-[#ec4899]"> to start</span>
        </p>
      </div>
    </button>
  );
}
