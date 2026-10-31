import React from "react";
import Sticker from "@/components/brand/Sticker";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="min-h-[50vh] flex flex-col items-center justify-center p-8 space-y-4"
    >
      <div className="inline-flex items-center gap-2">
        <Sticker variant="yellow" rotate="left" emoji="⚡">
          LOADING SQUAD
        </Sticker>
      </div>

      <div className="flex items-center gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-[var(--color-purple)]" />
        <span className="font-heading font-extrabold text-base uppercase tracking-wider text-[var(--color-ink)]">
          Syncing Campus Feed...
        </span>
      </div>
      <p className="font-meta text-xs text-slate-500">
        Fetching the freshest gists, events, and teammate link-ups.
      </p>
    </div>
  );
}

