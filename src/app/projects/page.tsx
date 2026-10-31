"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Sticker from "@/components/brand/Sticker";
import { STUDENT_PROJECTS, StudentProject } from "@/data/mockData";
import { Code, Search, ThumbsUp, ArrowRight, ExternalLink, Users, X, Sparkles } from "lucide-react";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [contributionFilter, setContributionFilter] = useState<"all" | "open">("all");
  const [campusFilter, setCampusFilter] = useState<string>("All");
  const [upvotesState, setUpvotesState] = useState<Record<string, boolean>>({});

  const toggleUpvote = (projectId: string) => {
    setUpvotesState((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  const resetFilters = () => {
    setSearchQuery("");
    setContributionFilter("all");
    setCampusFilter("All");
  };

  const filteredProjects = useMemo(() => {
    return STUDENT_PROJECTS.filter((project) => {
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.tagline.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.department.toLowerCase().includes(query) ||
        project.tags.some((t) => t.toLowerCase().includes(query)) ||
        project.creators.some((c) => c.name.toLowerCase().includes(query));

      const matchesContribution =
        contributionFilter === "all" || (contributionFilter === "open" && project.lookingForContributors);

      const matchesCampus =
        campusFilter === "All" || project.campus.toLowerCase().includes(campusFilter.toLowerCase());

      return matchesSearch && matchesContribution && matchesCampus;
    });
  }, [searchQuery, contributionFilter, campusFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-4 border-[var(--color-ink)] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sticker variant="purple" rotate="left" emoji="🚀">
              STUDENT BUILDS
            </Sticker>
            <span className="text-xs font-meta font-extrabold uppercase text-[var(--color-red)]">
              INNOVATION VAULT
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-[var(--color-ink)]">
            Student Projects & Inventions
          </h1>
          <p className="font-body text-sm sm:text-base text-slate-700 max-w-xl mt-1">
            Software apps, robotics hardware, AI tools, and research created by FUOYE students. Explore open contribution opportunities!
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <section className="bg-white p-5 rounded-card border-2 border-[var(--color-ink)] shadow-sticker space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <label htmlFor="project-search" className="sr-only">
            Search projects
          </label>
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            id="project-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by name, technologies (e.g. Next.js, IoT, Python), or department..."
            className="w-full pl-10 pr-4 py-2.5 text-sm border-2 border-[var(--color-ink)] rounded-ui bg-[var(--color-warm-white)] font-body focus:outline-none focus:ring-2 focus:ring-[var(--color-purple)] shadow-sticker-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          {/* Status filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-meta font-extrabold uppercase text-slate-500 mr-1">
              Status:
            </span>
            <button
              onClick={() => setContributionFilter("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-heading font-extrabold uppercase border-2 border-[var(--color-ink)] shadow-sticker-sm transition ${
                contributionFilter === "all"
                  ? "bg-[var(--color-purple)] text-white"
                  : "bg-white text-[var(--color-ink)] hover:bg-[var(--color-lavender)]"
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setContributionFilter("open")}
              className={`px-3 py-1.5 rounded-xl text-xs font-heading font-extrabold uppercase border-2 border-[var(--color-ink)] shadow-sticker-sm transition ${
                contributionFilter === "open"
                  ? "bg-[var(--color-yellow)] text-[var(--color-ink)]"
                  : "bg-white text-[var(--color-ink)] hover:bg-[var(--color-lavender)]"
              }`}
            >
              ⚡ Seeking Contributors
            </button>
          </div>

          {/* Campus Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-meta font-extrabold uppercase text-slate-500 mr-1">
              Campus:
            </span>
            {["All", "Oye", "Ikole"].map((campus) => (
              <button
                key={campus}
                onClick={() => setCampusFilter(campus)}
                className={`px-3 py-1.5 rounded-lg text-xs font-meta font-bold uppercase border-2 border-[var(--color-ink)] ${
                  campusFilter === campus
                    ? "bg-[var(--color-green)] text-white shadow-sticker-sm"
                    : "bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                {campus === "All" ? "All" : `${campus} Campus`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs font-meta text-slate-600 px-1">
        <span>
          Showing <strong>{filteredProjects.length}</strong> {filteredProjects.length === 1 ? "project" : "projects"}
          {(contributionFilter !== "all" || campusFilter !== "All" || searchQuery) && (
            <span> (filtered)</span>
          )}
        </span>
        {(contributionFilter !== "all" || campusFilter !== "All" || searchQuery) && (
          <button
            onClick={resetFilters}
            className="text-[var(--color-purple)] hover:underline font-extrabold uppercase"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Projects Grid or Empty State */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-card border-2 border-dashed border-[var(--color-ink)] p-8 space-y-4">
          <div className="text-4xl">🚀</div>
          <div className="space-y-1">
            <h3 className="font-heading font-black text-xl text-[var(--color-ink)]">
              No student projects matched your search
            </h3>
            <p className="font-body text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Try adjusting your technology keywords or selecting &quot;All Projects&quot;.
            </p>
          </div>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-ui bg-[var(--color-yellow)] text-[var(--color-ink)] font-heading font-black text-xs uppercase border-2 border-[var(--color-ink)] shadow-sticker"
          >
            Reset Project Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const isUpvoted = !!upvotesState[project.id];
            const currentUpvotes = project.upvotes + (isUpvoted ? 1 : 0);

            return (
              <article
                key={project.id}
                className="bg-white rounded-card p-6 border-2 border-[var(--color-ink)] shadow-sticker hover:shadow-sticker-lg transition flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-meta font-extrabold text-xs px-2.5 py-0.5 rounded-full bg-[var(--color-lavender)] text-[var(--color-purple)] border border-[var(--color-ink)]">
                      {project.campus}
                    </span>
                    {project.lookingForContributors ? (
                      <span className="font-heading font-black text-[11px] uppercase px-2 py-0.5 rounded bg-[var(--color-yellow)] text-[var(--color-ink)] border border-[var(--color-ink)]">
                        ⚡ Open Roles
                      </span>
                    ) : (
                      <span className="text-[11px] font-meta font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        Showcase
                      </span>
                    )}
                  </div>

                  <div>
                    <h2 className="font-heading font-black text-xl text-[var(--color-ink)] leading-snug">
                      <Link
                        href={`/projects/${project.id}`}
                        className="hover:text-[var(--color-purple)] transition"
                      >
                        {project.title}
                      </Link>
                    </h2>
                    <p className="text-xs font-heading font-bold text-[var(--color-purple)] mt-1">
                      {project.tagline}
                    </p>
                  </div>

                  <p className="font-body text-xs sm:text-sm text-slate-700 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-meta font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Open Roles preview */}
                  {project.openRoles.length > 0 && (
                    <div className="p-3 rounded-xl bg-[var(--color-warm-white)] border-2 border-[var(--color-ink)]/15 text-xs text-[var(--color-ink)] space-y-1">
                      <span className="font-heading font-extrabold uppercase text-[10px] text-[var(--color-purple)] block">
                        Seeking Teammates ({project.openRoles.length}):
                      </span>
                      <p className="line-clamp-1 font-body font-semibold">
                        {project.openRoles.map((r) => r.role).join(" • ")}
                      </p>
                    </div>
                  )}
                </div>

                {/* Creators & Footer */}
                <div className="pt-4 border-t-2 border-[var(--color-ink)]/10 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-body text-slate-600">
                      By <strong>{project.creators[0]?.name}</strong>
                    </span>
                    <span className="font-meta text-slate-500">{project.department}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => toggleUpvote(project.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-extrabold uppercase border-2 border-[var(--color-ink)] shadow-sticker-sm transition ${
                        isUpvoted
                          ? "bg-[var(--color-green)] text-white"
                          : "bg-[var(--color-warm-white)] text-[var(--color-ink)] hover:bg-[var(--color-yellow)]"
                      }`}
                      aria-pressed={isUpvoted}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{currentUpvotes}</span>
                    </button>

                    <Link
                      href={`/projects/${project.id}`}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-ui bg-[var(--color-purple)] hover:bg-purple-900 text-white font-heading font-extrabold text-xs uppercase border-2 border-[var(--color-ink)] shadow-sticker-sm transition"
                    >
                      <span>View & Roles</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
