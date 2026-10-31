"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
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
  HelpCircle
} from "lucide-react";

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params?.id as string;

  const project = STUDENT_PROJECTS.find((p) => p.id === projectId);
  const [upvoted, setUpvoted] = useState(false);
  const [showInvolvementModal, setShowInvolvementModal] = useState(false);

  // If project not found
  if (!project) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
          <HelpCircle className="w-8 h-8" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Project Not Found</h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          The requested student project could not be located. It may have been renamed or archived.
        </p>
        <div className="pt-2">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 text-white font-semibold text-sm hover:bg-emerald-800 transition"
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
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-emerald-700 transition"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to All Student Projects</span>
        </Link>
      </div>

      {/* Main Project Header */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                {project.campus}
              </span>
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                {project.faculty} • {project.department}
              </span>
              {project.lookingForContributors ? (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                  Seeking Teammates
                </span>
              ) : (
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  Showcase Prototype
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {project.title}
            </h1>
            <p className="text-base sm:text-lg text-emerald-700 font-semibold">
              {project.tagline}
            </p>
          </div>

          {/* Upvote & Action Controls */}
          <div className="flex items-center gap-2 self-start">
            <button
              onClick={() => setUpvoted(!upvoted)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                upvoted
                  ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
              aria-pressed={upvoted}
            >
              <ThumbsUp className="w-4 h-4" aria-hidden="true" />
              <span>{currentUpvotes} Upvotes</span>
            </button>
          </div>
        </div>

        {/* Links row */}
        <div className="flex items-center gap-3 pt-2 border-t border-slate-100 flex-wrap">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition"
            >
              <Github className="w-3.5 h-3.5" aria-hidden="true" />
              <span>GitHub Repository</span>
              <ExternalLink className="w-3 h-3 text-slate-400" aria-hidden="true" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Live Deployment Preview</span>
            </a>
          )}
        </div>
      </section>

      {/* Main Two-Column Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Overview, Goals & Open Roles */}
        <div className="lg:col-span-2 space-y-8">
          {/* Detailed Overview */}
          <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Project Overview</h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {project.description}
            </p>
          </section>

          {/* Project Goals */}
          <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Key Project Goals</h2>
            <ul className="space-y-2.5">
              {project.goals.map((goal, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Open Team Roles */}
          <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-700" aria-hidden="true" />
                <span>Open Team Roles & Opportunities</span>
              </h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {project.openRoles.length} Available
              </span>
            </div>

            {project.openRoles.length === 0 ? (
              <p className="text-xs sm:text-sm text-slate-500 italic">
                This project is not currently recruiting new team members. You can still star the repository on GitHub or test the deployment.
              </p>
            ) : (
              <div className="space-y-4">
                {project.openRoles.map((role, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5 hover:border-emerald-300 transition"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                        {role.role}
                      </h3>
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        Active Role
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {role.description}
                    </p>

                    <div className="pt-1">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        Required Skills:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {role.skills.map((s, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-medium"
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

        {/* Right Column: How to Join & Student Creators */}
        <div className="space-y-6">
          {/* How to Get Involved Card */}
          <section className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 space-y-4">
            <h2 className="text-lg font-bold text-emerald-950">How to Get Involved</h2>
            <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
              {project.howToJoin}
            </p>

            <div className="pt-2">
              <a
                href={project.githubUrl || "https://github.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm transition shadow-sm"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>Contact Project Team</span>
              </a>
            </div>
          </section>

          {/* Student Creators Card */}
          <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900">Project Creators</h2>
            <div className="space-y-3">
              {project.creators.map((creator, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs">
                    {creator.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{creator.name}</p>
                    <p className="text-[11px] text-slate-500">
                      {creator.role} • {creator.department}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack Box */}
          <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base font-bold text-slate-900">Tech Stack & Tools</h2>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

