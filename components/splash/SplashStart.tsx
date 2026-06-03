"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export function SplashStart() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/start")}
      className="fixed inset-0 z-50 flex min-h-screen w-full cursor-pointer items-center justify-center bg-white focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-400"
      aria-label="Touch the screen to start"
    >
      <Image
        src="/splash-start.png"
        alt="Purple Ruler — Touch the screen to start"
        width={1024}
        height={682}
        priority
        className="h-auto max-h-[100dvh] w-full max-w-[1200px] object-contain px-2 sm:px-6"
        sizes="100vw"
      />
    </button>
  );
}
