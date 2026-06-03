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
      onClick={() => router.push("/start")}
      className="fixed inset-0 z-50 flex min-h-[100dvh] w-full cursor-pointer items-center justify-center bg-white p-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-400 sm:p-6"
      aria-label="Touch the screen to start"
    >
      <Image
        src="/touch-to-start.png"
        alt="Touch the screen to start"
        width={SPLASH_WIDTH}
        height={SPLASH_HEIGHT}
        priority
        className="h-auto max-h-[calc(100dvh-2rem)] w-auto max-w-[min(100%,1536px)] object-contain"
        sizes="(max-width: 1536px) 100vw, 1536px"
      />
    </button>
  );
}
