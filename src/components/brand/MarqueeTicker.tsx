import React from "react";
import BarcodeTrim from "./BarcodeTrim";

export default function MarqueeTicker() {
  const announcements = [
    "⚡ CONNECT . COLLABORATE . THRIVE.",
    "🔥 GDG FUOYE HACKATHON REGISTRATION IS LIVE",
    "💬 NEW GIST: CAMPUS SHUTTLE TIMETABLE EXPANDED",
    "🚀 38 OPEN STUDENT PROJECT ROLES WAITING FOR YOU",
    "🎉 IKOLE TECH & ROBOTICS EXHIBITION THIS FRIDAY",
    "🔌 LINK UP WITH FELLOW DESIGNERS & DEVS",
    "✨ KAMPUS KONNECT — THE OFFICIAL STUDENT NETWORK",
  ];

  return (
    <div className="bg-[var(--color-ink)] text-white text-xs font-meta uppercase tracking-wider overflow-hidden border-b-2 border-[var(--color-ink)] select-none">
      <BarcodeTrim height="h-2" className="opacity-40" />
      <div className="py-2 flex whitespace-nowrap overflow-hidden bg-[var(--color-purple)]">
        <div className="inline-flex gap-8 animate-marquee font-bold">
          {announcements.concat(announcements).map((item, index) => (
            <span key={index} className="inline-flex items-center gap-2">
              <span className="text-[var(--color-yellow)] font-black text-sm">✦</span>
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

