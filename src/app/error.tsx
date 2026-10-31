"use client";

import React, { useEffect } from "react";
import Sticker from "@/components/brand/Sticker";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log runtime errors in development
    console.error("Application Runtime Error:", error);
  }, [error]);

  return (
    <div
      role="alert"
      className="max-w-xl mx-auto px-4 py-20 text-center space-y-6"
    >
      <div className="inline-flex items-center justify-center gap-2">
        <Sticker variant="red" rotate="left" emoji="⚠️">
          SYSTEM GLITCH
        </Sticker>
      </div>

      <h1 className="text-3xl sm:text-4xl font-display uppercase tracking-tight text-[var(--color-ink)]">
        Something Went Wrong!
      </h1>

      <p className="font-body text-sm text-slate-700 max-w-md mx-auto leading-relaxed">
        We encountered an unexpected bump while loading this section of Kampus Konnect. You can try refreshing the view.
      </p>

      {error.message && (
        <div className="p-3 rounded-ui bg-red-50 border border-red-200 text-red-800 text-xs font-mono max-w-md mx-auto text-left overflow-x-auto">
          {error.message}
        </div>
      )}

      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-ui bg-[var(--color-purple)] text-white font-heading font-black text-xs uppercase tracking-wider border-2 border-[var(--color-ink)] shadow-sticker hover:shadow-sticker-lg active:translate-x-0.5 active:translate-y-0.5 transition"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-ui bg-white text-[var(--color-ink)] font-heading font-bold text-xs uppercase tracking-wider border-2 border-[var(--color-ink)] shadow-sticker-sm hover:bg-[var(--color-yellow)] transition"
        >
          <Home className="w-4 h-4" />
          <span>Go to Home</span>
        </Link>
      </div>
    </div>
  );
}
