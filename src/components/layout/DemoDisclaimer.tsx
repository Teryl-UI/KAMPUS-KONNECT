"use client";

import React, { useState } from "react";
import { Info, X } from "lucide-react";

export default function DemoDisclaimer() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside
      aria-label="Demonstration Notice"
      className="bg-amber-50 border-b border-amber-200 text-amber-900 text-xs py-2 px-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-700 shrink-0" aria-hidden="true" />
          <span>
            <strong>Demonstration Notice:</strong> Campus Connect is currently running with realistic sample data for Federal University Oye-Ekiti (FUOYE). Student profiles and event listings are for prototype demonstration.
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-amber-700 hover:text-amber-950 p-1 rounded hover:bg-amber-100 transition shrink-0"
          aria-label="Dismiss demonstration notice"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}

