"use client";

import React, { useState } from "react";
import Link from "next/link";
import Sticker from "@/components/brand/Sticker";
import BarcodeTrim from "@/components/brand/BarcodeTrim";
import {
  CAMPUS_GISTS,
  CAMPUS_EVENTS,
  STUDENT_PROJECTS,
  TEAMMATE_PROFILES,
  COMMUNITY_OPPORTUNITIES,
} from "@/data/mockData";
import {
  ArrowRight,
  Flame,
  MessageCircle,
  Calendar,
  Code,
  Users,
  Sparkles,
  Bot,
  Lightbulb,
  GraduationCap,
  MapPin,
  Clock,
  ThumbsUp,
  Share2,
  Check,
  Send,
  Zap,
} from "lucide-react";

export default function HomePage() {
  const [rsvpState, setRsvpState] = useState<Record<string, boolean>>({});
  const [gistReactions, setGistReactions] = useState<Record<string, { fire: number; mindblown: number }>>({
    "gist-1": { fire: 184, mindblown: 92 },
    "gist-2": { fire: 312, mindblown: 145 },
    "gist-3": { fire: 240, mindblown: 210 },
  });

  const toggleRsvp = (id: string) => {
    setRsvpState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const reactGist = (gistId: string, type: "fire" | "mindblown") => {
    setGistReactions((prev) => {
      const current = prev[gistId] || { fire: 100, mindblown: 50 };
      return {
        ...prev,
        [gistId]: {
          ...current,
          [type]: current[type] + 1,
        },
      };
    });
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 overflow-x-hidden">
      {/* ========================================================
          1. HERO SECTION: THE POSTER COME TO LIFE
          ======================================================== */}
      <section className="relative pt-8 sm:pt-14 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b-4 border-[var(--color-ink)] bg-[var(--color-warm-white)] pattern-stripes">
        <div className="max-w-7xl mx-auto">
          {/* Floating Sticker Top Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <Sticker variant="yellow" rotate="left" emoji="⚡">
                KAMPUS KONNECT V2
              </Sticker>
              <Sticker variant="purple" rotate="right" emoji="🎓">
                FUOYE STUDENT NETWORK
              </Sticker>
            </div>
            <div className="hidden sm:flex items-center gap-2 font-meta text-xs font-bold text-[var(--color-purple)]">
              <span>OYE MAIN CAMPUS</span>
              <span>✦</span>
              <span>IKOLE CAMPUS</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Bold Maximalist Copy (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Category Pills Stack like in the Poster */}
              <div className="flex flex-wrap items-center gap-2">
                <Sticker variant="red" rotate="left" emoji="💬">
                  CAMPUS GISTS
                </Sticker>
                <Sticker variant="purple" rotate="right" emoji="🔥">
                  ENTERTAINMENT NEWS
                </Sticker>
                <Sticker variant="green" rotate="left" emoji="⚡">
                  EVENT UPDATES
                </Sticker>
                <Sticker variant="yellow" rotate="right" emoji="🔌">
                  CONNECT & LINK-UPS
                </Sticker>
              </div>

              {/* Main Headline from User Spec */}
              <div className="space-y-2">
                <h1 className="font-display uppercase text-4xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight text-[var(--color-ink)]">
                  FIND YOUR <span className="text-[var(--color-purple)] underline decoration-[var(--color-yellow)] decoration-wavy decoration-4">PEOPLE.</span>
                  <br />
                  <span className="text-[var(--color-red)]">MAKE THINGS</span>{" "}
                  <span className="text-[var(--color-green)]">HAPPEN.</span>
                </h1>
              </div>

              {/* Supporting Copy */}
              <p className="font-body text-base sm:text-xl text-slate-800 leading-relaxed max-w-xl font-medium">
                Your campus is full of ideas, opportunities, and people worth knowing. Discover what&apos;s happening, connect with your community, and build something together.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/events"
                  className="px-7 py-4 rounded-ui bg-[var(--color-yellow)] hover:bg-amber-300 text-[var(--color-ink)] font-heading font-black text-sm sm:text-base uppercase tracking-wider border-2 border-[var(--color-ink)] shadow-sticker hover:shadow-sticker-lg active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2"
                >
                  <span>EXPLORE CAMPUS</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/ai"
                  className="px-7 py-4 rounded-ui bg-[var(--color-purple)] hover:bg-purple-900 text-white font-heading font-black text-sm sm:text-base uppercase tracking-wider border-2 border-[var(--color-ink)] shadow-sticker hover:shadow-sticker-lg active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5 text-[var(--color-yellow)]" />
                  <span>KONNECT AI (GEMMA)</span>
                </Link>

                <Link
                  href="/teammates"
                  className="px-5 py-4 rounded-ui bg-white hover:bg-slate-50 text-[var(--color-ink)] font-heading font-black text-sm uppercase tracking-wider border-2 border-[var(--color-ink)] shadow-sticker-sm transition-all flex items-center gap-2"
                >
                  <Users className="w-4 h-4 text-[var(--color-purple)]" />
                  <span>FIND TEAMMATES</span>
                </Link>
              </div>

              {/* Live Badge metrics */}
              <div className="pt-4 flex items-center gap-6 font-meta text-xs uppercase tracking-wider font-extrabold text-[var(--color-ink)]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-green)] animate-ping" />
                  <span>1.4K+ Active Students</span>
                </div>
                <span>✦</span>
                <div>2 Campuses United</div>
                <span>✦</span>
                <div>100% Student-Run</div>
              </div>
            </div>

            {/* Right Column: Visual Poster Collage Card (5 cols) */}
            <div className="lg:col-span-5 relative">
              {/* Outer decorative card with camera focus brackets */}
              <div className="relative rounded-panel p-6 sm:p-8 bg-gradient-to-br from-[var(--color-purple)] via-[#6b2aa6] to-[var(--color-red)] border-4 border-[var(--color-ink)] shadow-sticker-xl text-white overflow-hidden transform lg:rotate-1 hover:rotate-0 transition-transform duration-300">
                {/* Barcode Accent Top */}
                <BarcodeTrim height="h-3" className="mb-4 bg-white opacity-80" />

                {/* Camera Focus Brackets */}
                <div className="absolute top-4 left-4 text-2xl font-mono text-[var(--color-yellow)] font-bold opacity-80">⌜</div>
                <div className="absolute top-4 right-4 text-2xl font-mono text-[var(--color-yellow)] font-bold opacity-80">⌝</div>
                <div className="absolute bottom-4 left-4 text-2xl font-mono text-[var(--color-yellow)] font-bold opacity-80">⌞</div>
                <div className="absolute bottom-4 right-4 text-2xl font-mono text-[var(--color-yellow)] font-bold opacity-80">⌟</div>

                {/* Floating Emojis */}
                <div className="absolute top-8 right-6 text-3xl animate-bounce">🤯</div>
                <div className="absolute bottom-20 left-6 text-3xl animate-pulse">🔥</div>
                <div className="absolute top-1/2 -left-2 text-2xl animate-float">⚡</div>

                <div className="text-center space-y-4 py-6 relative z-10">
                  {/* Circular Poster Badge */}
                  <div className="inline-flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[var(--color-yellow)] text-[var(--color-ink)] border-4 border-[var(--color-ink)] shadow-sticker mx-auto">
                    <span className="font-display text-2xl sm:text-3xl leading-none">KK</span>
                    <span className="font-meta font-extrabold text-[9px] uppercase tracking-widest text-[var(--color-purple)] mt-1">
                      FUOYE SQUAD
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-white drop-shadow-[2px_2px_0px_#19151D]">
                      CONNECT. COLLABORATE. THRIVE.
                    </h2>
                    <p className="font-heading font-bold text-xs uppercase tracking-wider text-[var(--color-yellow)]">
                      THE PULSE OF FEDERAL UNIVERSITY OYE-EKITI
                    </p>
                  </div>

                  {/* Puzzle Category Pills Matrix */}
                  <div className="grid grid-cols-2 gap-2 pt-2 text-left">
                    <div className="p-2.5 rounded-ui bg-white/95 text-[var(--color-ink)] border-2 border-[var(--color-ink)] shadow-sticker-sm text-xs font-heading font-extrabold uppercase">
                      <span className="text-[var(--color-purple)]">💬</span> GISTS & BUZZ
                    </div>
                    <div className="p-2.5 rounded-ui bg-[var(--color-yellow)] text-[var(--color-ink)] border-2 border-[var(--color-ink)] shadow-sticker-sm text-xs font-heading font-extrabold uppercase">
                      <span className="text-[var(--color-red)]">⚡</span> HACKATHONS
                    </div>
                    <div className="p-2.5 rounded-ui bg-[var(--color-green)] text-white border-2 border-[var(--color-ink)] shadow-sticker-sm text-xs font-heading font-extrabold uppercase">
                      <span className="text-[var(--color-yellow)]">🔌</span> LINK-UPS
                    </div>
                    <div className="p-2.5 rounded-ui bg-[var(--color-red)] text-white border-2 border-[var(--color-ink)] shadow-sticker-sm text-xs font-heading font-extrabold uppercase">
                      <span className="text-white">🚀</span> PROJECTS
                    </div>
                  </div>
                </div>

                {/* Bottom Barcode */}
                <BarcodeTrim height="h-3" className="mt-4 bg-white opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          1.5. GEMMA-FIRST AI COPILOT SHOWCASE
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[var(--color-purple)] rounded-panel border-4 border-[var(--color-ink)] shadow-sticker-lg p-8 sm:p-10 text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-[var(--color-yellow)] opacity-20 blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <Sticker variant="yellow" withBrackets={false} emoji="⚡">
                  GOOGLE GEMMA ENGINE
                </Sticker>
                <span className="text-xs font-meta font-extrabold uppercase text-[var(--color-yellow)]">
                  BUILT FOR FUOYE STUDENTS
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-white leading-tight">
                MEET KONNECT AI.
                <br />
                YOUR CAMPUS INTELLIGENCE COPILOT.
              </h2>

              <p className="font-body text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl">
                Powered by Google Gemma, Konnect AI helps you match with hackathon teammates, incubate semester project ideas, understand complex concepts, and explore events across Oye & Ikole campuses.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/ai"
                  className="px-6 py-3 rounded-ui bg-[var(--color-yellow)] hover:bg-amber-300 text-[var(--color-ink)] font-heading font-black text-xs sm:text-sm uppercase tracking-wider border-2 border-[var(--color-ink)] shadow-sticker active:translate-x-0.5 active:translate-y-0.5 transition flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>OPEN KONNECT AI WORKSPACE</span>
                </Link>

                <Link
                  href="/projects"
                  className="px-5 py-3 rounded-ui bg-white/10 hover:bg-white/20 text-white font-heading font-bold text-xs sm:text-sm uppercase tracking-wider border-2 border-white/20 transition flex items-center gap-2"
                >
                  <span>BROWSE PROJECTS</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* 4 Feature Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[var(--color-ink)]">
              <div className="p-4 rounded-xl bg-white border-2 border-[var(--color-ink)] shadow-sticker-sm space-y-1">
                <div className="flex items-center gap-2 text-[var(--color-purple)] font-heading font-black text-xs uppercase">
                  <Users className="w-4 h-4" />
                  <span>Teammate Matcher</span>
                </div>
                <p className="font-body text-[11px] text-slate-600">
                  Matches your skills with active hackathon rosters.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[var(--color-yellow)] border-2 border-[var(--color-ink)] shadow-sticker-sm space-y-1">
                <div className="flex items-center gap-2 text-[var(--color-ink)] font-heading font-black text-xs uppercase">
                  <Lightbulb className="w-4 h-4" />
                  <span>Project Incubator</span>
                </div>
                <p className="font-body text-[11px] text-slate-800">
                  Turns raw ideas into 4-week execution plans.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[var(--color-soft-green)] border-2 border-[var(--color-ink)] shadow-sticker-sm space-y-1">
                <div className="flex items-center gap-2 text-[var(--color-success)] font-heading font-black text-xs uppercase">
                  <GraduationCap className="w-4 h-4" />
                  <span>Study Companion</span>
                </div>
                <p className="font-body text-[11px] text-slate-700">
                  Concept breakdowns and quizzes on demand.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[var(--color-lavender)] border-2 border-[var(--color-ink)] shadow-sticker-sm space-y-1">
                <div className="flex items-center gap-2 text-[var(--color-purple)] font-heading font-black text-xs uppercase">
                  <Bot className="w-4 h-4" />
                  <span>Campus Copilot</span>
                </div>
                <p className="font-body text-[11px] text-slate-700">
                  Verified answers on Oye and Ikole activities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. FEATURED CAMPUS GISTS
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sticker variant="red" rotate="left" emoji="💬">
                CAMPUS GISTS
              </Sticker>
              <span className="text-xs font-meta font-extrabold uppercase text-[var(--color-purple)]">
                WHAT&apos;S POPPING AT FUOYE
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-[var(--color-ink)]">
              Fresh Campus Gists & News
            </h2>
          </div>

          <Link
            href="/gists"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-ui bg-white hover:bg-[var(--color-lavender)] text-[var(--color-purple)] font-heading font-extrabold text-xs uppercase border-2 border-[var(--color-ink)] shadow-sticker transition"
          >
            <span>VIEW ALL GISTS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Gists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CAMPUS_GISTS.slice(0, 3).map((gist) => {
            const reacts = gistReactions[gist.id] || gist.reactions;
            return (
              <article
                key={gist.id}
                className="bg-white rounded-card p-6 border-2 border-[var(--color-ink)] shadow-sticker hover:shadow-sticker-lg hover:-translate-y-1 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-heading font-extrabold uppercase px-2.5 py-1 rounded-md bg-[var(--color-lavender)] text-[var(--color-purple)] border border-[var(--color-ink)]/20">
                      {gist.category}
                    </span>
                    <span className="font-meta text-slate-500 font-semibold">{gist.timeAgo}</span>
                  </div>

                  <h3 className="font-heading font-black text-lg text-[var(--color-ink)] leading-snug">
                    {gist.title}
                  </h3>

                  <p className="font-body text-xs sm:text-sm text-slate-700 leading-relaxed line-clamp-3">
                    {gist.content}
                  </p>
                </div>

                <div className="pt-3 border-t-2 border-[var(--color-ink)]/10 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[var(--color-ink)]">{gist.author}</span>
                    <span className="font-meta text-slate-500">{gist.campus}</span>
                  </div>

                  {/* Reaction Toggles */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => reactGist(gist.id, "fire")}
                      className="px-2.5 py-1 rounded-lg bg-[var(--color-warm-white)] hover:bg-[var(--color-yellow)] text-xs font-bold border border-[var(--color-ink)] flex items-center gap-1 transition"
                      aria-label="React with fire"
                    >
                      <span>🔥</span>
                      <span>{reacts.fire}</span>
                    </button>
                    <button
                      onClick={() => reactGist(gist.id, "mindblown")}
                      className="px-2.5 py-1 rounded-lg bg-[var(--color-warm-white)] hover:bg-[var(--color-lavender)] text-xs font-bold border border-[var(--color-ink)] flex items-center gap-1 transition"
                      aria-label="React with mindblown"
                    >
                      <span>🤯</span>
                      <span>{reacts.mindblown}</span>
                    </button>
                    <span className="ml-auto text-xs font-meta text-slate-500 flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{gist.commentsCount}</span>
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          3. UPCOMING EVENTS
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-section bg-[var(--color-lavender)] border-4 border-[var(--color-ink)] shadow-sticker-lg space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sticker variant="green" rotate="left" emoji="⚡">
                  EVENT UPDATES
                </Sticker>
                <span className="text-xs font-meta font-extrabold uppercase text-[var(--color-ink)]">
                  OYE & IKOLE GATHERINGS
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-[var(--color-ink)]">
                Upcoming Campus Events
              </h2>
            </div>

            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-ui bg-[var(--color-yellow)] hover:bg-amber-300 text-[var(--color-ink)] font-heading font-black text-xs uppercase border-2 border-[var(--color-ink)] shadow-sticker transition"
            >
              <span>SEE ALL EVENTS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CAMPUS_EVENTS.slice(0, 3).map((event) => {
              const isAttending = !!rsvpState[event.id];
              const attendees = event.attendeesCount + (isAttending ? 1 : 0);

              return (
                <div
                  key={event.id}
                  className="bg-white rounded-card p-6 border-2 border-[var(--color-ink)] shadow-sticker hover:shadow-sticker-lg transition flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-meta font-bold text-xs px-2.5 py-0.5 rounded-full bg-[var(--color-yellow)] text-[var(--color-ink)] border border-[var(--color-ink)]">
                        {event.campus}
                      </span>
                      <span className="text-[11px] font-heading font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {event.category}
                      </span>
                    </div>

                    <h3 className="font-heading font-black text-lg text-[var(--color-ink)] leading-snug">
                      {event.title}
                    </h3>

                    <p className="font-body text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t-2 border-[var(--color-ink)]/10 text-xs font-meta text-slate-600">
                      <div className="flex items-center gap-2 font-bold text-[var(--color-purple)]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{event.date} • {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{event.venue}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t-2 border-[var(--color-ink)]/10 flex items-center justify-between">
                    <span className="text-xs font-meta font-bold text-slate-700">
                      {attendees} going
                    </span>

                    <button
                      onClick={() => toggleRsvp(event.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-heading font-extrabold uppercase border-2 border-[var(--color-ink)] shadow-sticker-sm transition ${
                        isAttending
                          ? "bg-[var(--color-green)] text-white"
                          : "bg-[var(--color-purple)] hover:bg-purple-900 text-white"
                      }`}
                    >
                      {isAttending ? "RSVP Confirmed ✓" : "RSVP Spot"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          4. FEATURED STUDENT PROJECTS
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sticker variant="purple" rotate="left" emoji="🚀">
                STUDENT BUILDS
              </Sticker>
              <span className="text-xs font-meta font-extrabold uppercase text-[var(--color-red)]">
                OPEN FOR COLLABORATION
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-[var(--color-ink)]">
              Featured Student Projects
            </h2>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-ui bg-white hover:bg-[var(--color-lavender)] text-[var(--color-purple)] font-heading font-extrabold text-xs uppercase border-2 border-[var(--color-ink)] shadow-sticker transition"
          >
            <span>ALL PROJECTS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STUDENT_PROJECTS.slice(0, 3).map((project) => (
            <article
              key={project.id}
              className="bg-white rounded-card p-6 border-2 border-[var(--color-ink)] shadow-sticker hover:shadow-sticker-lg transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-meta font-bold px-2 py-0.5 rounded bg-[var(--color-soft-green)] text-[var(--color-success)] border border-[var(--color-ink)]/20">
                    {project.campus}
                  </span>
                  {project.lookingForContributors && (
                    <span className="text-[11px] font-heading font-extrabold uppercase px-2 py-0.5 rounded bg-[var(--color-yellow)] text-[var(--color-ink)] border border-[var(--color-ink)]">
                      ⚡ Seeking Roles
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-heading font-black text-lg text-[var(--color-ink)] leading-snug">
                    <Link href={`/projects/${project.id}`} className="hover:text-[var(--color-purple)] transition">
                      {project.title}
                    </Link>
                  </h3>
                  <p className="text-xs font-heading font-bold text-[var(--color-purple)] mt-0.5">
                    {project.tagline}
                  </p>
                </div>

                <p className="font-body text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {project.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-meta px-2 py-0.5 rounded bg-slate-100 text-[var(--color-ink)] font-bold"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t-2 border-[var(--color-ink)]/10 flex items-center justify-between">
                <span className="text-xs font-meta text-slate-600">
                  {project.openRoles.length} open {project.openRoles.length === 1 ? "role" : "roles"}
                </span>
                <Link
                  href={`/projects/${project.id}`}
                  className="px-3.5 py-1.5 rounded-lg bg-[var(--color-purple)] hover:bg-purple-900 text-white font-heading font-extrabold text-xs uppercase border border-[var(--color-ink)] shadow-sticker-sm transition"
                >
                  View Details & Roles →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ========================================================
          5. FIND YOUR PEOPLE / LINK-UPS
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sticker variant="yellow" rotate="right" emoji="🔌">
                CONNECT & LINK-UPS
              </Sticker>
              <span className="text-xs font-meta font-extrabold uppercase text-[var(--color-purple)]">
                MEET YOUR NEXT TEAMMATE
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-[var(--color-ink)]">
              Find Your People
            </h2>
          </div>

          <Link
            href="/teammates"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-ui bg-white hover:bg-[var(--color-lavender)] text-[var(--color-purple)] font-heading font-extrabold text-xs uppercase border-2 border-[var(--color-ink)] shadow-sticker transition"
          >
            <span>BROWSE ALL COLLABORATORS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Teammates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEAMMATE_PROFILES.slice(0, 3).map((profile) => (
            <div
              key={profile.id}
              className="bg-white rounded-card p-6 border-2 border-[var(--color-ink)] shadow-sticker hover:shadow-sticker-lg transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-heading font-black uppercase px-2.5 py-0.5 rounded-full bg-[var(--color-yellow)] text-[var(--color-ink)] border border-[var(--color-ink)]">
                    {profile.projectType}
                  </span>
                  <span className="font-meta text-slate-400">{profile.createdAt}</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-purple)] text-white border-2 border-[var(--color-ink)] shadow-sticker-sm flex items-center justify-center font-display text-lg shrink-0">
                    {profile.emoji}
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-base text-[var(--color-ink)]">
                      {profile.studentName}
                    </h3>
                    <p className="text-xs font-meta text-slate-600">
                      {profile.level} • {profile.department} ({profile.campus})
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-heading font-bold text-xs uppercase tracking-wide text-[var(--color-purple)]">
                    Project: {profile.projectTitle}
                  </h4>
                  <p className="font-body text-xs text-slate-600 mt-1 line-clamp-3 leading-relaxed">
                    {profile.description}
                  </p>
                </div>

                {/* Roles Needed */}
                <div className="space-y-1">
                  <span className="text-[10px] font-meta font-black uppercase text-slate-500 tracking-wider block">
                    Roles Needed:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {profile.rolesNeeded.map((r, i) => (
                      <span
                        key={i}
                        className="text-xs font-heading font-bold px-2 py-0.5 rounded bg-[var(--color-lavender)] text-[var(--color-purple)] border border-[var(--color-ink)]/15"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t-2 border-[var(--color-ink)]/10 flex items-center justify-between">
                <span className="text-xs font-meta text-slate-500">
                  Via {profile.contactChannel}
                </span>
                <a
                  href={profile.contactLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-[var(--color-green)] hover:bg-emerald-600 text-white font-heading font-black text-xs uppercase border-2 border-[var(--color-ink)] shadow-sticker-sm flex items-center gap-1.5 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Link Up</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          6. COMMUNITY OPPORTUNITIES BANNER
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-panel p-8 sm:p-12 bg-gradient-to-r from-[var(--color-purple)] via-[#602699] to-[var(--color-ink)] border-4 border-[var(--color-ink)] shadow-sticker-xl text-white space-y-8 relative overflow-hidden">
          <BarcodeTrim height="h-2" className="bg-white opacity-40 mb-2" />

          <div className="max-w-2xl space-y-3">
            <Sticker variant="yellow" withBrackets={false} emoji="🔥">
              OPPORTUNITIES RADAR
            </Sticker>
            <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-white">
              Grants, Fellowships & Competitions
            </h2>
            <p className="font-body text-sm sm:text-base text-purple-100 leading-relaxed">
              Never miss verified opportunities for FUOYE students. Funding, Google developer ambassador roles, and hackathons with cash prizes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {COMMUNITY_OPPORTUNITIES.map((opp) => (
              <div
                key={opp.id}
                className="bg-white/10 backdrop-blur-md rounded-card p-5 border-2 border-white/20 hover:border-[var(--color-yellow)] transition space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-heading font-extrabold uppercase px-2 py-0.5 rounded bg-[var(--color-yellow)] text-[var(--color-ink)]">
                      {opp.type}
                    </span>
                    <span className="font-meta text-yellow-200 text-[11px]">Due {opp.deadline}</span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-white">
                    {opp.title}
                  </h3>

                  <p className="font-body text-xs text-slate-200 line-clamp-3">
                    {opp.description}
                  </p>

                  <div className="text-xs font-meta font-bold text-[var(--color-yellow)] pt-1">
                    ✦ {opp.perk}
                  </div>
                </div>

                <a
                  href={opp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2 rounded-ui bg-white hover:bg-[var(--color-yellow)] text-[var(--color-ink)] font-heading font-black text-xs uppercase transition shadow-sticker-sm"
                >
                  Apply / Learn More
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          7. JOIN THE SQUAD BIG CTA
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[var(--color-yellow)] rounded-panel p-8 sm:p-14 border-4 border-[var(--color-ink)] shadow-sticker-xl space-y-6">
          <div className="inline-flex items-center gap-2">
            <span className="text-3xl animate-bounce">⚡</span>
            <span className="font-meta font-extrabold text-xs uppercase tracking-widest text-[var(--color-ink)]">
              KAMPUS KONNECT COMMUNITY
            </span>
            <span className="text-3xl animate-bounce">⚡</span>
          </div>

          <h2 className="text-3xl sm:text-6xl font-display uppercase tracking-tight text-[var(--color-ink)] max-w-3xl mx-auto">
            Ready to find your people and build something big?
          </h2>

          <p className="font-body text-base sm:text-lg text-slate-800 max-w-xl mx-auto font-medium">
            Join the student-led culture network across Oye and Ikole. Discover upcoming events, find your next project partner, and share what you make.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/teammates"
              className="px-8 py-4 rounded-ui bg-[var(--color-purple)] hover:bg-purple-900 text-white font-heading font-black text-sm uppercase tracking-wider border-2 border-[var(--color-ink)] shadow-sticker hover:shadow-sticker-lg active:translate-x-0.5 active:translate-y-0.5 transition"
            >
              FIND COLLABORATORS NOW 🚀
            </Link>
            <Link
              href="/gists"
              className="px-8 py-4 rounded-ui bg-white hover:bg-[var(--color-warm-white)] text-[var(--color-ink)] font-heading font-black text-sm uppercase tracking-wider border-2 border-[var(--color-ink)] shadow-sticker hover:shadow-sticker-lg active:translate-x-0.5 active:translate-y-0.5 transition"
            >
              EXPLORE CAMPUS GISTS 💬
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
