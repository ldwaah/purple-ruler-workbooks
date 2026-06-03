type MascotProps = {
  mood?: "happy" | "cheer" | "think";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZES = { sm: 48, md: 72, lg: 96 };

export function Mascot({
  mood = "happy",
  size = "md",
  className = "",
}: MascotProps) {
  const px = SIZES[size];
  const mouth =
    mood === "cheer"
      ? "M32 58 Q40 68 48 58"
      : mood === "think"
        ? "M36 58 L44 58"
        : "M34 58 Q40 64 46 58";

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 80 80"
      className={`drop-shadow-md ${className}`}
      aria-hidden
    >
      <rect
        x="8"
        y="12"
        width="64"
        height="56"
        rx="12"
        fill="#7c3aed"
        stroke="#5b21b6"
        strokeWidth="3"
      />
      <rect x="14" y="18" width="52" height="8" rx="2" fill="#a78bfa" />
      {[22, 32, 42, 52, 62].map((x) => (
        <line
          key={x}
          x1={x}
          y1="22"
          x2={x}
          y2="62"
          stroke="#c4b5fd"
          strokeWidth="1.5"
        />
      ))}
      <circle cx="28" cy="42" r="5" fill="#fef08a" />
      <circle cx="52" cy="42" r="5" fill="#fef08a" />
      <circle cx="30" cy="41" r="2" fill="#1e1b4b" />
      <circle cx="54" cy="41" r="2" fill="#1e1b4b" />
      <path
        d={mouth}
        fill="none"
        stroke="#1e1b4b"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {mood === "cheer" && (
        <text x="58" y="24" fontSize="14">
          ✨
        </text>
      )}
    </svg>
  );
}
