import React from "react";

interface StickerProps {
  children: React.ReactNode;
  variant?: "white" | "yellow" | "purple" | "green" | "red" | "orange";
  rotate?: "left" | "right" | "none";
  className?: string;
  withBrackets?: boolean;
  emoji?: string;
}

export default function Sticker({
  children,
  variant = "white",
  rotate = "none",
  className = "",
  withBrackets = true,
  emoji,
}: StickerProps) {
  const variantStyles = {
    white: "bg-white text-[var(--color-ink)] border-[var(--color-ink)]",
    yellow: "bg-[var(--color-yellow)] text-[var(--color-ink)] border-[var(--color-ink)]",
    purple: "bg-[var(--color-purple)] text-white border-[var(--color-ink)]",
    green: "bg-[var(--color-green)] text-white border-[var(--color-ink)]",
    red: "bg-[var(--color-red)] text-white border-[var(--color-ink)]",
    orange: "bg-[var(--color-orange)] text-white border-[var(--color-ink)]",
  };

  const rotationStyles = {
    left: "-rotate-2 hover:-rotate-1",
    right: "rotate-2 hover:rotate-1",
    none: "rotate-0",
  };

  return (
    <span
      className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 font-display text-xs tracking-wide uppercase shadow-sticker transition-transform duration-200 select-none ${variantStyles[variant]} ${rotationStyles[rotate]} ${className}`}
    >
      {/* Corner Bracket decoration like poster */}
      {withBrackets && (
        <span
          className="absolute -top-1 -left-1 text-[10px] font-bold opacity-60 text-current leading-none"
          aria-hidden="true"
        >
          ⌜
        </span>
      )}

      {emoji && <span className="text-sm shrink-0">{emoji}</span>}

      <span>{children}</span>

      {withBrackets && (
        <span
          className="absolute -bottom-1 -right-1 text-[10px] font-bold opacity-60 text-current leading-none"
          aria-hidden="true"
        >
          ⌟
        </span>
      )}
    </span>
  );
}

