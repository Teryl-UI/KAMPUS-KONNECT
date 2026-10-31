import React from "react";
import Link from "next/link";
import Sticker from "@/components/brand/Sticker";
import { ArrowLeft, Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="inline-flex items-center justify-center gap-2">
        <Sticker variant="red" rotate="left" emoji="⚡">
          LOST IN TRANSIT
        </Sticker>
        <Sticker variant="yellow" rotate="right" emoji="🧭">
          ERROR 404
        </Sticker>
      </div>

      <h1 className="text-5xl sm:text-7xl font-display uppercase tracking-tight text-[var(--color-ink)]">
        PAGE NOT FOUND!
      </h1>

      <p className="font-body text-base sm:text-lg text-slate-700 max-w-md mx-auto leading-relaxed">
        The link you followed took a detour past the Oye or Ikole campus gates. This page does not exist or has moved.
      </p>

      <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-ui bg-[var(--color-purple)] hover:bg-purple-900 text-white font-heading font-black text-sm uppercase tracking-wider border-2 border-[var(--color-ink)] shadow-sticker hover:shadow-sticker-lg active:translate-x-0.5 active:translate-y-0.5 transition"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>

        <Link
          href="/events"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-ui bg-[var(--color-warm-white)] hover:bg-[var(--color-yellow)] text-[var(--color-ink)] font-heading font-black text-sm uppercase tracking-wider border-2 border-[var(--color-ink)] shadow-sticker hover:shadow-sticker-lg active:translate-x-0.5 active:translate-y-0.5 transition"
        >
          <Compass className="w-4 h-4" />
          <span>Explore Events</span>
        </Link>
      </div>
    </div>
  );
}

