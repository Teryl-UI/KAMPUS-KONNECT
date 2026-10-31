"use client";

import React, { useState, useMemo } from "react";
import { Users, Search, Filter, MessageCircle, Mail, Github, Send, X, Briefcase } from "lucide-react";
import { TEAMMATE_PROFILES, TeammateProfile } from "@/data/mockData";

export default function TeammatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedCampus, setSelectedCampus] = useState<string>("All");

  const projectTypes = ["All", "Hackathon", "Final Year Project", "Open Source", "Startup"];

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedType("All");
    setSelectedCampus("All");
  };

  // Filter logic
  const filteredTeammates = useMemo(() => {
    return TEAMMATE_PROFILES.filter((profile) => {
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        profile.studentName.toLowerCase().includes(query) ||
        profile.projectTitle.toLowerCase().includes(query) ||
        profile.department.toLowerCase().includes(query) ||
        profile.description.toLowerCase().includes(query) ||
        profile.rolesNeeded.some((r) => r.toLowerCase().includes(query)) ||
        profile.skillsRequired.some((s) => s.toLowerCase().includes(query));

      const matchesType = selectedType === "All" || profile.projectType === selectedType;
      const matchesCampus =
        selectedCampus === "All" || profile.campus.toLowerCase().includes(selectedCampus.toLowerCase());

      return matchesSearch && matchesType && matchesCampus;
    });
  }, [searchQuery, selectedType, selectedCampus]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
          <Users className="w-4 h-4" aria-hidden="true" />
          <span>Student Network</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Find Project Teammates & Hackathon Partners
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
          Connect with developers, UI/UX designers, hardware engineers, and researchers across FUOYE faculties looking for collaborators.
        </p>
      </div>

      {/* Search & Filters */}
      <section aria-label="Teammate search and filters" className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        {/* Search */}
        <div className="relative">
          <label htmlFor="teammate-search" className="sr-only">
            Search teammate profiles
          </label>
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" aria-hidden="true" />
          <input
            id="teammate-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name, role needed (e.g. Designer, Python), department, or project..."
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
          {/* Project Type Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
              Project Type:
            </span>
            {projectTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                  selectedType === type
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Campus Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
              Campus:
            </span>
            {["All", "Oye", "Ikole"].map((campus) => (
              <button
                key={campus}
                onClick={() => setSelectedCampus(campus)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                  selectedCampus === campus
                    ? "bg-emerald-700 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {campus === "All" ? "All Campuses" : `${campus} Campus`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong>{filteredTeammates.length}</strong> {filteredTeammates.length === 1 ? "profile" : "profiles"}
          {(selectedType !== "All" || selectedCampus !== "All" || searchQuery) && (
            <span> (filtered)</span>
          )}
        </span>
        {(selectedType !== "All" || selectedCampus !== "All" || searchQuery) && (
          <button
            onClick={resetFilters}
            className="text-emerald-700 hover:underline font-semibold"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Teammates Grid or Empty State */}
      {filteredTeammates.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8 space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Users className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <h3 className="text-slate-800 font-bold text-lg">No teammate requests match your search</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Try searching for different skills (e.g. Figma, Python, Markdown) or reset your campus filter.
            </p>
          </div>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition"
          >
            Reset Teammate Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeammates.map((profile) => (
            <article
              key={profile.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3.5">
                {/* Project Type & Campus Badges */}
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full font-bold bg-amber-100 text-amber-900 border border-amber-200">
                    {profile.projectType}
                  </span>
                  <span className="text-slate-400 font-medium">{profile.createdAt}</span>
                </div>

                {/* Project Title */}
                <h2 className="font-bold text-slate-900 text-base sm:text-lg leading-snug">
                  {profile.projectTitle}
                </h2>

                {/* Roles Needed */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Roles Needed:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.rolesNeeded.map((role, i) => (
                      <span
                        key={i}
                        className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {profile.description}
                </p>

                {/* Skills Desired */}
                <div className="space-y-1 pt-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Desired Skills:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {profile.skillsRequired.map((skill, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                      >
                        #{skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Student Info & Contact Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900">{profile.studentName}</p>
                  <p className="text-[11px] text-slate-500">
                    {profile.level} • {profile.department} ({profile.campus})
                  </p>
                </div>

                <a
                  href={profile.contactLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white transition shadow-sm"
                  aria-label={`Contact ${profile.studentName} via ${profile.contactChannel}`}
                >
                  {profile.contactChannel === "WhatsApp" && <MessageCircle className="w-3.5 h-3.5 text-emerald-200" aria-hidden="true" />}
                  {profile.contactChannel === "Email" && <Mail className="w-3.5 h-3.5 text-emerald-200" aria-hidden="true" />}
                  {profile.contactChannel === "GitHub" && <Github className="w-3.5 h-3.5 text-emerald-200" aria-hidden="true" />}
                  <span>{profile.contactChannel}</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

