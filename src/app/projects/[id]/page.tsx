"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Sticker from "@/components/brand/Sticker";
import { STUDENT_PROJECTS } from "@/data/mockData";
import {
  ArrowLeft,
  ThumbsUp,
  Github,
  ExternalLink,
  Users,
  CheckCircle2,
  Code,
  MapPin,
  Send,
  HelpCircle,
  Sparkles,
} from "lucide-react";

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params?.id as string;

  const project = STUDENT_PROJECTS.find((p) => p.id === projectId);
  const [upvoted, setUpvoted] = useState(false);

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="text-5xl">⚡</div>
        <h1 className="text-3xl font-display uppercase tracking-tight text-[var(--color-ink)]">
          Project Not Found
        </h1>
        <p className="font-body text-sm text-slate-700 max-w-md mx-auto">
          The requested student project could not be located on Kampus Konnect.
        </p>
        <div className="pt-2">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-ui bg-[var(--color-yellow)] text-[var(--color-ink)] font-heading font-black text-xs uppercase border-2 border-[var(--color-ink)] shadow-sticker"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Projects Directory</span>
          </Link>
        </div>
      </div>
    );
  }

  const currentUpvotes = project.upvotes + (upvoted ? 1 : 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back Link */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 font-heading font-extrabold text-xs uppercase text-slate-700 hover:text-[var(--color-purple)] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Student Projects</span>
        </Link>
      </div>

      {/* Main Project Header Box */}
      <section className="bg-white rounded-panel p-6 sm:p-10 border-4 border-[var(--color-ink)] shadow-sticker-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-meta font-extrabold text-xs px-2.5 py-0.5 rounded-full bg-[var(--color-yellow)] text-[var(--color-ink)] border border-[var(--color-ink)]">
                {project.campus}
              </span>
              <span className="font-heading font-bold text-xs uppercase px-2.5 py-0.5 rounded bg-[var(--color-lavender)] text-[var(--color-purple)]">
                {project.faculty} • {project.department}
              </span>
              {project.lookingForContributors ? (
                <span className="font-heading font-black text-xs uppercase px-2.5 py-0.5 rounded bg-[var(--color-red)] text-white">
                  ⚡ Seeking Teammates
                </span>
              ) : (
                <span className="font-meta text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  Showcase Prototype
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-[var(--color-ink)]">
              {project.title}
            </h1>
            <p className="font-heading font-bold text-base sm:text-lg text-[var(--color-purple)]">
              {project.tagline}
            </p>
          </div>

          {/* Upvote Control */}
          <div className="self-start">
            <button
              onClick={() => setUpvoted(!upvoted)}
              className={`flex items-center gap-2 px-5 py-3 rounded-ui font-heading font-black text-xs uppercase border-2 border-[var(--color-ink)] shadow-sticker transition ${
                upvoted
                  ? "bg-[var(--color-green)] text-white"
                  : "bg-[var(--color-yellow)] hover:bg-amber-300 text-[var(--color-ink)]"
              }`}
              aria-pressed={upvoted}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{currentUpvotes} UPVOTES</span>
            </button>
          </div>
        </div>

        {/* Links row */}
        <div className="flex items-center gap-3 pt-4 border-t-2 border-[var(--color-ink)]/10 flex-wrap">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-ui text-xs font-heading font-black uppercase bg-[var(--color-ink)] text-white hover:bg-slate-800 border-2 border-[var(--color-ink)] shadow-sticker-sm transition"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-ui text-xs font-heading font-black uppercase bg-[var(--color-warm-white)] text-[var(--color-purple)] hover:bg-[var(--color-lavender)] border-2 border-[var(--color-ink)] shadow-sticker-sm transition"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Deployment Preview</span>
            </a>
          )}
        </div>
      </section>

      {/* Two Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 cols) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Detailed Overview */}
          <section className="bg-white rounded-card p-6 sm:p-8 border-2 border-[var(--color-ink)] shadow-sticker space-y-4">
            <h2 className="text-2xl font-display uppercase tracking-tight text-[var(--color-ink)]">
              Project Overview
            </h2>
            <p className="font-body text-sm sm:text-base text-slate-700 leading-relaxed">
              {project.description}
            </p>
          </section>

          {/* Key Goals */}
          <section className="bg-white rounded-card p-6 sm:p-8 border-2 border-[var(--color-ink)] shadow-sticker space-y-4">
            <h2 className="text-2xl font-display uppercase tracking-tight text-[var(--color-ink)]">
              Key Project Goals
            </h2>
            <ul className="space-y-3">
              {project.goals.map((goal, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-body text-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-green)] shrink-0 mt-0.5" />
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Open Team Roles */}
          <section className="bg-white rounded-card p-6 sm:p-8 border-2 border-[var(--color-ink)] shadow-sticker space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-display uppercase tracking-tight text-[var(--color-ink)] flex items-center gap-2">
                <Users className="w-6 h-6 text-[var(--color-purple)]" />
                <span>Open Team Roles & Collaborations</span>
              </h2>
              <span className="font-heading font-extrabold text-xs uppercase px-2.5 py-1 rounded bg-[var(--color-yellow)] text-[var(--color-ink)] border border-[var(--color-ink)]">
                {project.openRoles.length} Available
              </span>
            </div>

            {project.openRoles.length === 0 ? (
              <p className="font-body text-sm text-slate-500 italic">
                This project is not currently recruiting new team members.
              </p>
            ) : (
              <div className="space-y-4">
                {project.openRoles.map((role, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-card border-2 border-[var(--color-ink)] bg-[var(--color-warm-white)] space-y-3 shadow-sticker-sm"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-heading font-black text-base sm:text-lg text-[var(--color-ink)]">
                        {role.role}
                      </h3>
                      <span className="text-[11px] font-heading font-extrabold uppercase text-white bg-[var(--color-purple)] px-2 py-0.5 rounded">
                        Active Role
                      </span>
                    </div>

                    <p className="font-body text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {role.description}
                    </p>

                    <div>
                      <span className="text-[10px] font-meta font-black uppercase text-slate-500 tracking-wider block mb-1">
                        Required Skills:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {role.skills.map((s, i) => (
                          <span
                            key={i}
                            className="text-xs font-meta font-bold px-2 py-0.5 rounded bg-white border border-[var(--color-ink)] text-slate-800"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right Column (1 col) */}
        <div className="space-y-6">
          {/* How to Join */}
          <section className="bg-[var(--color-yellow)] rounded-card p-6 border-2 border-[var(--color-ink)] shadow-sticker space-y-4">
            <h2 className="text-xl font-display uppercase tracking-tight text-[var(--color-ink)]">
              How to Get Involved
            </h2>
            <p className="font-body text-xs sm:text-sm text-slate-800 leading-relaxed">
              {project.howToJoin}
            </p>

            <div className="pt-2">
              <a
                href={project.githubUrl || "https://github.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-ui bg-[var(--color-purple)] hover:bg-purple-900 text-white font-heading font-black text-xs uppercase tracking-wider border-2 border-[var(--color-ink)] shadow-sticker-sm transition"
              >
                <Send className="w-4 h-4" />
                <span>Contact Project Team</span>
              </a>
            </div>
          </section>

          {/* Student Creators */}
          <section className="bg-white rounded-card p-6 border-2 border-[var(--color-ink)] shadow-sticker space-y-4">
            <h2 className="text-xl font-display uppercase tracking-tight text-[var(--color-ink)]">
              Project Creators
            </h2>
            <div className="space-y-3">
              {project.creators.map((creator, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-purple)] text-white border-2 border-[var(--color-ink)] flex items-center justify-center font-display text-sm">
                    {creator.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-heading font-black text-sm text-[var(--color-ink)]">
                      {creator.name}
                    </p>
                    <p className="text-[11px] font-meta text-slate-500">
                      {creator.role} • {creator.department}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section className="bg-white rounded-card p-6 border-2 border-[var(--color-ink)] shadow-sticker space-y-3">
            <h2 className="text-xl font-display uppercase tracking-tight text-[var(--color-ink)]">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs font-meta font-extrabold px-3 py-1 rounded-lg bg-[var(--color-warm-white)] text-[var(--color-ink)] border border-[var(--color-ink)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
