"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Code, Search, Filter, ThumbsUp, ArrowRight, ExternalLink, Users, X } from "lucide-react";
import { STUDENT_PROJECTS, StudentProject } from "@/data/mockData";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [contributionFilter, setContributionFilter] = useState<"all" | "open">("all");
  const [campusFilter, setCampusFilter] = useState<string>("All");
  const [upvotesState, setUpvotesState] = useState<Record<string, boolean>>({});

  // Upvote toggle
  const toggleUpvote = (projectId: string) => {
    setUpvotesState((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("");
    setContributionFilter("all");
    setCampusFilter("All");
  };

  // Filtered projects
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
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
          <Code className="w-4 h-4" aria-hidden="true" />
          <span>Innovation Showcase</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          FUOYE Student Projects & Open-Source Tools
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
          Explore software, hardware prototypes, and student initiatives built across the university. Find open contribution opportunities to join real projects.
        </p>
      </div>

      {/* Search and Filters */}
      <section aria-label="Project search and filters" className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <label htmlFor="project-search" className="sr-only">
            Search student projects
          </label>
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" aria-hidden="true" />
          <input
            id="project-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by name, technologies (e.g. Next.js, IoT, Python), or department..."
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-800 placeholder-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 p-0.5"
              aria-label="Clear search text"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          {/* Status filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
              Status:
            </span>
            <button
              onClick={() => setContributionFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                contributionFilter === "all"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setContributionFilter("open")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                contributionFilter === "open"
                  ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Seeking Contributors Only
            </button>
          </div>

          {/* Campus Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
              Campus:
            </span>
            {["All", "Oye", "Ikole"].map((campus) => (
              <button
                key={campus}
                onClick={() => setCampusFilter(campus)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                  campusFilter === campus
                    ? "bg-emerald-700 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {campus === "All" ? "All" : `${campus} Campus`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong>{filteredProjects.length}</strong> {filteredProjects.length === 1 ? "project" : "projects"}
          {(contributionFilter !== "all" || campusFilter !== "All" || searchQuery) && (
            <span> (filtered)</span>
          )}
        </span>
        {(contributionFilter !== "all" || campusFilter !== "All" || searchQuery) && (
          <button
            onClick={resetFilters}
            className="text-emerald-700 hover:underline font-semibold"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Projects Grid or Empty State */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8 space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Code className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <h3 className="text-slate-800 font-bold text-lg">No student projects matched your search</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Try adjusting your search keywords or switching between open contribution statuses.
            </p>
          </div>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition"
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
                className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3.5">
                  {/* Status & Campus Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {project.campus}
                    </span>
                    {project.lookingForContributors ? (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                        Seeking Teammates
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        Showcase
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h2 className="font-bold text-slate-900 text-lg leading-snug">
                      <Link
                        href={`/projects/${project.id}`}
                        className="hover:text-emerald-700 transition focus:outline-none focus:underline"
                      >
                        {project.title}
                      </Link>
                    </h2>
                    <p className="text-xs text-emerald-700 font-semibold mt-1">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Open Roles preview if any */}
                  {project.openRoles.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900 space-y-1">
                      <span className="font-bold block">
                        Open Team Roles ({project.openRoles.length}):
                      </span>
                      <p className="line-clamp-1 text-slate-700">
                        {project.openRoles.map((r) => r.role).join(" • ")}
                      </p>
                    </div>
                  )}
                </div>

                {/* Creators & Footer Actions */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      By <strong className="text-slate-700">{project.creators[0]?.name}</strong>
                    </span>
                    <span className="text-slate-400">{project.department}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    {/* Upvote Button */}
                    <button
                      onClick={() => toggleUpvote(project.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                        isUpvoted
                          ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                      aria-pressed={isUpvoted}
                      aria-label={`Upvote ${project.title}`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{currentUpvotes}</span>
                    </button>

                    {/* View Details Link */}
                    <Link
                      href={`/projects/${project.id}`}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition shadow-sm"
                    >
                      <span>View Project & Roles</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
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

