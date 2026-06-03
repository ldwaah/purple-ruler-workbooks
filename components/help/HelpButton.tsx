"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";

const HELP_ICON = "/need-help.svg";
const TEACHER_EMAIL = process.env.NEXT_PUBLIC_TEACHER_HELP_EMAIL?.trim();

export function HelpButton() {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Need help"
        aria-haspopup="dialog"
        aria-expanded={open}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-violet-200 bg-white shadow-[var(--shadow-bubble)] transition hover:border-pink-300 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-300/60 sm:bottom-8 sm:right-8"
      >
        <Image
          src={HELP_ICON}
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 object-contain"
          aria-hidden
        />
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
          <button
            type="button"
            aria-label="Close help"
            className="absolute inset-0 bg-violet-950/35 backdrop-blur-[2px]"
            onClick={close}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative w-full max-w-md rounded-t-3xl border-2 border-violet-100 bg-gradient-to-b from-white to-violet-50 px-6 pb-8 pt-6 shadow-[var(--shadow-card)] sm:rounded-3xl"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center sm:hidden">
              <span className="h-1 w-10 rounded-full bg-violet-200" aria-hidden />
            </div>
            <h2
              id={titleId}
              className="font-display text-xl font-bold text-violet-900"
            >
              Need help?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-violet-800">
              Stuck? Ask your teacher in your lesson.
            </p>
            <p className="mt-2 text-sm text-violet-600">
              It is okay to need help. Your teacher is there for you.
            </p>
            {TEACHER_EMAIL && (
              <p className="mt-4">
                <a
                  href={`mailto:${TEACHER_EMAIL}`}
                  className="text-sm font-semibold text-pink-600 underline decoration-pink-200 underline-offset-2 hover:text-pink-700"
                >
                  Email your teacher
                </a>
              </p>
            )}
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="pr-btn-primary mt-6 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
