export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex h-11 w-11 items-center justify-center ${className}`}
      aria-hidden
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 opacity-80 blur-md" />
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-violet-300/40 bg-violet-950/80">
        <span className="font-display text-sm font-bold tracking-tighter text-violet-100">
          PR
        </span>
      </div>
    </div>
  );
}
