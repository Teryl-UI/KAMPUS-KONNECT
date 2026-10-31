import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withTagline?: boolean;
}

export default function Logo({ className = "", size = "md", withTagline = false }: LogoProps) {
  const isSm = size === "sm";
  const isLg = size === "lg";

  return (
    <Link
      href="/"
      className={`inline-flex flex-col items-start group focus:outline-none select-none shrink-0 whitespace-nowrap ${className}`}
      aria-label="Kampus Konnect Home"
    >
      <div className="flex items-center gap-2 shrink-0 whitespace-nowrap">
        {/* Puzzle Icon Badge with Plug and Speech Bubble */}
        <div
          className={`relative rounded-xl border-2 border-[var(--color-ink)] shadow-sticker bg-gradient-to-br from-[var(--color-yellow)] via-[var(--color-red)] to-[var(--color-purple)] flex items-center justify-center text-white font-display transition-transform group-hover:scale-105 shrink-0 ${
            isSm ? "w-8 h-8 text-xs" : isLg ? "w-14 h-14 text-2xl" : "w-10 h-10 text-base"
          }`}
        >
          <span className="drop-shadow-[1px_1px_0px_#19151D] tracking-tighter">KK</span>
          {/* Mini speech bubble dot */}
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[var(--color-green)] border border-[var(--color-ink)] flex items-center justify-center text-[7px]">
            ⚡
          </span>
        </div>

        {/* Chunky Typography */}
        <div className="flex flex-col shrink-0 whitespace-nowrap">
          <div className="flex items-center gap-1 shrink-0 whitespace-nowrap">
            <span
              className={`font-display tracking-tight text-[var(--color-ink)] uppercase leading-none ${
                isSm ? "text-base" : isLg ? "text-3xl" : "text-xl sm:text-2xl"
              }`}
            >
              KAMPUS
            </span>
            <span
              className={`font-display tracking-tight text-[var(--color-purple)] uppercase leading-none ${
                isSm ? "text-base" : isLg ? "text-3xl" : "text-xl sm:text-2xl"
              }`}
            >
              KONNECT
            </span>
            {/* Small sticker plug */}
            <span className="text-xs -mt-1 hidden sm:inline" aria-hidden="true">
              🔌
            </span>
          </div>

          {withTagline && (
            <span className="font-meta font-extrabold text-[9px] sm:text-[10px] tracking-widest text-[var(--color-red)] uppercase mt-0.5 hidden 2xl:block whitespace-nowrap">
              CONNECT . COLLABORATE . THRIVE.
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

