import Image from "next/image";

export function NoteCover({
  coverImage,
  accent,
  title,
  className = "",
  priority = false,
  iconSizeClassName = "h-16 w-16 sm:h-20 sm:w-20",
}: {
  coverImage: string;
  accent: string;
  title: string;
  className?: string;
  priority?: boolean;
  iconSizeClassName?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle at 18% 20%, ${accent}3d, transparent 55%), radial-gradient(circle at 82% 25%, ${accent}26, transparent 50%), linear-gradient(135deg, #0b1120 0%, #161f36 55%, #0b1120 100%)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          color: accent,
        }}
      />
      <div
        className="absolute -bottom-12 -right-8 h-36 w-36 rounded-full blur-3xl"
        style={{ backgroundColor: accent, opacity: 0.25 }}
      />
      <div
        className="absolute -top-10 -left-10 h-28 w-28 rounded-full blur-3xl"
        style={{ backgroundColor: accent, opacity: 0.15 }}
      />
      <div
        className={`relative flex items-center justify-center rounded-2xl bg-white/10 shadow-xl ring-1 ring-white/15 backdrop-blur-sm ${iconSizeClassName}`}
      >
        <Image
          src={coverImage}
          alt={`${title} logo`}
          width={64}
          height={64}
          className="h-[55%] w-[55%] object-contain drop-shadow-lg"
          priority={priority}
        />
      </div>
    </div>
  );
}
