"use client";

import React from "react";
import { Sparkles, Calendar, Users, Rocket, ArrowRight } from "lucide-react";

interface HeroProps {
  onOpenGemma: () => void;
  onExploreEvents: () => void;
  onFindTeammates: () => void;
}

export default function Hero({ onOpenGemma, onExploreEvents, onFindTeammates }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-white to-slate-50 py-12 sm:py-16 border-b border-slate-200">
      {/* Subtle decorative circles */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-5">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            Federal University Oye-Ekiti • Open Source Project
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Discover Events, Find Teammates, and{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
              Build Together at FUOYE
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Connecting students across <strong>Oye Main Campus</strong> and <strong>Ikole Campus</strong>.
            Collaborate on hackathons, find project partners, and supercharge your ideas with{" "}
            <span className="font-semibold text-emerald-700">Google Gemma AI</span>.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onFindTeammates}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition"
            >
              <Users className="w-4 h-4" />
              <span>Find Project Teammates</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreEvents}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-700 font-semibold text-sm border border-slate-300 hover:bg-slate-50 transition"
            >
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>Explore Events</span>
            </button>
            <button
              onClick={onOpenGemma}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm hover:from-amber-400 hover:to-amber-500 shadow-md transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>Gemma AI Helper</span>
            </button>
          </div>

          {/* Highlights row */}
          <div className="grid grid-cols-3 gap-4 pt-6 max-w-lg mx-auto border-t border-slate-200/80">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900">2 Campuses</div>
              <div className="text-xs text-slate-500 font-medium">Oye & Ikole</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-emerald-700">100% Free</div>
              <div className="text-xs text-slate-500 font-medium">Open Source</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-amber-600">Gemma AI</div>
              <div className="text-xs text-slate-500 font-medium">Smart Mentorship</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

