import Image from "next/image";

const LOGO_SRC = "/purple-ruler-logo.avif";

type LogoMarkProps = {
  className?: string;
  size?: number;
  priority?: boolean;
};

export function LogoMark({
  className = "",
  size = 44,
  priority = false,
}: LogoMarkProps) {
  return (
    <Image
      src={LOGO_SRC}
      alt="Purple Ruler"
      width={size}
      height={size}
      priority={priority}
      className={`object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
