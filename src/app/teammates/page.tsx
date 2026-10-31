"use client";

import React, { useState, useMemo } from "react";
import Sticker from "@/components/brand/Sticker";
import { TEAMMATE_PROFILES, TeammateProfile } from "@/data/mockData";
import { Users, Search, MessageCircle, Mail, Github, Send, Plus, X, Sparkles, Filter, Tag, AlertCircle, CheckCircle2 } from "lucide-react";

export default function FindPeoplePage() {
  const [profiles, setProfiles] = useState<TeammateProfile[]>(TEAMMATE_PROFILES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedCampus, setSelectedCampus] = useState<string>("All");
  const [selectedSkill, setSelectedSkill] = useState<string>("All");

  // Post Link-Up Request Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDept, setNewDept] = useState("");
  const [newLevel, setNewLevel] = useState("300L");
  const [newCampus, setNewCampus] = useState<TeammateProfile["campus"]>("Oye (Main)");
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newProjectType, setNewProjectType] = useState<TeammateProfile["projectType"]>("Hackathon");
  const [newRolesNeeded, setNewRolesNeeded] = useState("UI/UX Designer, Frontend Dev");
  const [newSkills, setNewSkills] = useState("Figma, React, Tailwind");
  const [newDesc, setNewDesc] = useState("");
  const [newContactLink, setNewContactLink] = useState("");
  const [newContactChannel, setNewContactChannel] = useState<TeammateProfile["contactChannel"]>("WhatsApp");

  // Form validation & submission state
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);

  // Keyboard navigation: Escape key closes modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const projectTypes = ["All", "Hackathon", "Final Year Project", "Open Source", "Startup"];

  // Dynamically extract all unique skills & interests from profiles
  const allSkills = useMemo(() => {
    const set = new Set<string>();
    TEAMMATE_PROFILES.forEach((p) => {
      p.skillsRequired.forEach((s) => set.add(s));
      p.rolesNeeded.forEach((r) => set.add(r));
    });
    return ["All", ...Array.from(set)];
  }, []);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedType("All");
    setSelectedCampus("All");
    setSelectedSkill("All");
  };

  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!newName.trim()) {
      errors.name = "Please provide your student name or campus handle.";
    }
    if (!newProjectTitle.trim()) {
      errors.projectTitle = "Please provide the project or initiative title.";
    }
    if (!newContactLink.trim()) {
      errors.contactLink = "Please provide a contact handle (e.g. WhatsApp number).";
    }
    if (!newDesc.trim()) {
      errors.description = "Please write a short pitch describing what you need help with.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const created: TeammateProfile = {
      id: `team-${Date.now()}`,
      studentName: newName,
      department: newDept || "Computer Science",
      level: newLevel,
      campus: newCampus,
      projectTitle: newProjectTitle,
      projectType: newProjectType,
      rolesNeeded: newRolesNeeded.split(",").map((r) => r.trim()).filter(Boolean),
      skillsRequired: newSkills.split(",").map((s) => s.trim()).filter(Boolean),
      description: newDesc,
      contactChannel: newContactChannel,
      contactLink: newContactLink.startsWith("http")
        ? newContactLink
        : newContactChannel === "WhatsApp"
        ? `https://wa.me/${newContactLink.replace(/[^0-9]/g, "")}`
        : newContactLink,
      avatarColor: "purple",
      emoji: "⚡",
      createdAt: "Just now",
    };

    setProfiles([created, ...profiles]);
    setSubmissionSuccess(`Listing posted! Reference #LK-${Math.floor(1000 + Math.random() * 9000)}`);
    setFormErrors({});

    setTimeout(() => {
      setIsModalOpen(false);
      setSubmissionSuccess(null);
      setNewName("");
      setNewProjectTitle("");
      setNewDesc("");
      setNewContactLink("");
    }, 2000);
  };

  const filteredProfiles = useMemo(() => {
    return profiles.filter((profile) => {
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

      const matchesSkill =
        selectedSkill === "All" ||
        profile.skillsRequired.some((s) => s.toLowerCase() === selectedSkill.toLowerCase()) ||
        profile.rolesNeeded.some((r) => r.toLowerCase() === selectedSkill.toLowerCase());

      return matchesSearch && matchesType && matchesCampus && matchesSkill;
    });
  }, [profiles, searchQuery, selectedType, selectedCampus, selectedSkill]);

  const getCardTheme = (color: TeammateProfile["avatarColor"]) => {
    switch (color) {
      case "purple":
        return { bg: "bg-[var(--color-purple)]", badge: "bg-[var(--color-lavender)] text-[var(--color-purple)]" };
      case "green":
        return { bg: "bg-[var(--color-green)]", badge: "bg-[var(--color-soft-green)] text-[var(--color-success)]" };
      case "red":
        return { bg: "bg-[var(--color-red)]", badge: "bg-red-100 text-[var(--color-error)]" };
      case "yellow":
        return { bg: "bg-[var(--color-yellow)]", badge: "bg-amber-100 text-[var(--color-warning)]" };
      case "orange":
      default:
        return { bg: "bg-[var(--color-orange)]", badge: "bg-orange-100 text-orange-900" };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-4 border-[var(--color-ink)] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sticker variant="yellow" rotate="right" emoji="🔌">
              CONNECT & LINK-UPS
            </Sticker>
            <span className="text-xs font-meta font-extrabold uppercase text-[var(--color-purple)]">
              COLOR-RIOTED TALENT DIRECTORY
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-[var(--color-ink)]">
            Find Your People & Collaborators
          </h1>
          <p className="font-body text-sm sm:text-base text-slate-700 max-w-xl mt-1">
            Connect with developers, designers, embedded builders, researchers, and creators looking for project partners across FUOYE.
          </p>
        </div>

        <button
          onClick={() => {
            setIsModalOpen(true);
            setFormErrors({});
            setSubmissionSuccess(null);
          }}
          className="self-start md:self-auto px-6 py-3.5 rounded-ui bg-[var(--color-purple)] hover:bg-purple-900 text-white font-heading font-black text-sm uppercase tracking-wider border-2 border-[var(--color-ink)] shadow-sticker hover:shadow-sticker-lg active:translate-x-0.5 active:translate-y-0.5 transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5 text-[var(--color-yellow)]" />
          <span>POST A LINK-UP 🔌</span>
        </button>
      </div>

      {/* Search & Filters */}
      <section aria-label="Teammate search and filters" className="bg-white p-5 rounded-card border-2 border-[var(--color-ink)] shadow-sticker space-y-4">
        {/* Search */}
        <div className="relative">
          <label htmlFor="people-search" className="sr-only">
            Search people
          </label>
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            id="people-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name, role needed (e.g. Designer, Python, IoT), department..."
            className="w-full pl-10 pr-4 py-2.5 text-sm border-2 border-[var(--color-ink)] rounded-ui bg-[var(--color-warm-white)] font-body focus:outline-none focus:ring-2 focus:ring-[var(--color-purple)] shadow-sticker-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-700"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
          {/* Project Type */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-meta font-extrabold uppercase text-slate-500 mr-1">
              Project Type:
            </span>
            {projectTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-heading font-extrabold uppercase border-2 border-[var(--color-ink)] shadow-sticker-sm transition ${
                  selectedType === type
                    ? "bg-[var(--color-purple)] text-white"
                    : "bg-white text-[var(--color-ink)] hover:bg-[var(--color-lavender)]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Campus */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-meta font-extrabold uppercase text-slate-500 mr-1">
              Campus:
            </span>
            {["All", "Oye", "Ikole"].map((campus) => (
              <button
                key={campus}
                onClick={() => setSelectedCampus(campus)}
                className={`px-3 py-1 rounded-lg text-xs font-meta font-bold uppercase border-2 border-[var(--color-ink)] ${
                  selectedCampus === campus
                    ? "bg-[var(--color-yellow)] text-[var(--color-ink)] shadow-sticker-sm"
                    : "bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                {campus === "All" ? "All Campuses" : `${campus} Campus`}
              </button>
            ))}
          </div>
        </div>

        {/* REQ 3: FILTER BY SKILLS & INTERESTS */}
        <div className="pt-2 border-t-2 border-[var(--color-ink)]/10 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-meta font-extrabold uppercase text-slate-600">
            <Tag className="w-3.5 h-3.5 text-[var(--color-green)]" />
            <span>Filter by Skills & Interests:</span>
          </div>

          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
            {allSkills.slice(0, 16).map((skill) => (
              <button
                key={skill}
                onClick={() => setSelectedSkill(skill)}
                className={`px-2.5 py-1 rounded-md text-xs font-meta font-bold transition border ${
                  selectedSkill === skill
                    ? "bg-[var(--color-green)] text-white border-[var(--color-ink)] shadow-sticker-sm"
                    : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
                }`}
              >
                {skill === "All" ? "All Skills" : `#${skill}`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs font-meta text-slate-600 px-1">
        <span>
          Showing <strong>{filteredProfiles.length}</strong> {filteredProfiles.length === 1 ? "profile" : "profiles"}
          {(selectedType !== "All" || selectedCampus !== "All" || selectedSkill !== "All" || searchQuery) && (
            <span> (filtered)</span>
          )}
        </span>
        {(selectedType !== "All" || selectedCampus !== "All" || selectedSkill !== "All" || searchQuery) && (
          <button
            onClick={resetFilters}
            className="text-[var(--color-purple)] hover:underline font-extrabold uppercase"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Profiles Grid */}
      {filteredProfiles.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-card border-2 border-dashed border-[var(--color-ink)] p-8 space-y-4">
          <div className="text-4xl">🔌</div>
          <div className="space-y-1">
            <h3 className="font-heading font-black text-xl text-[var(--color-ink)]">
              No collaborator profiles matched your search
            </h3>
            <p className="font-body text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Try searching for different skills (e.g. Figma, Python, Hardware) or reset the skills filter.
            </p>
          </div>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-ui bg-[var(--color-yellow)] text-[var(--color-ink)] font-heading font-black text-xs uppercase border-2 border-[var(--color-ink)] shadow-sticker"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((profile) => {
            const theme = getCardTheme(profile.avatarColor);
            return (
              <article
                key={profile.id}
                className="bg-white rounded-card p-6 border-2 border-[var(--color-ink)] shadow-sticker hover:shadow-sticker-lg transition-all duration-200 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3.5">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-heading font-black uppercase px-2.5 py-0.5 rounded-full bg-[var(--color-yellow)] text-[var(--color-ink)] border border-[var(--color-ink)]">
                      {profile.projectType}
                    </span>
                    <span className="font-meta text-slate-400 font-bold">{profile.createdAt}</span>
                  </div>

                  {/* Student Persona Header */}
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl ${theme.bg} text-white border-2 border-[var(--color-ink)] shadow-sticker-sm flex items-center justify-center font-display text-xl shrink-0`}
                    >
                      {profile.emoji}
                    </div>
                    <div>
                      <h2 className="font-heading font-black text-lg text-[var(--color-ink)] leading-tight">
                        {profile.studentName}
                      </h2>
                      <p className="text-xs font-meta text-slate-600 font-bold">
                        {profile.level} • {profile.department} ({profile.campus})
                      </p>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div>
                    <h3 className="font-heading font-bold text-xs uppercase tracking-wide text-[var(--color-purple)]">
                      Project: {profile.projectTitle}
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed line-clamp-3">
                      {profile.description}
                    </p>
                  </div>

                  {/* Roles Needed */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-meta font-black uppercase text-slate-500 tracking-wider block">
                      Roles Needed:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.rolesNeeded.map((role, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedSkill(role)}
                          className={`text-xs font-heading font-black uppercase px-2.5 py-1 rounded-md border transition ${
                            selectedSkill === role
                              ? "bg-[var(--color-purple)] text-white border-[var(--color-ink)]"
                              : "bg-[var(--color-lavender)] text-[var(--color-purple)] border-[var(--color-ink)]/15 hover:bg-purple-200"
                          }`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Skills Required */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-meta font-black uppercase text-slate-500 tracking-wider block">
                      Skills Desired:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {profile.skillsRequired.map((skill, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedSkill(skill)}
                          className={`text-[11px] font-meta font-bold px-2 py-0.5 rounded transition ${
                            selectedSkill === skill
                              ? "bg-[var(--color-green)] text-white"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          #{skill}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Link-Up Action */}
                <div className="pt-4 border-t-2 border-[var(--color-ink)]/10 flex items-center justify-between">
                  <span className="text-xs font-meta font-bold text-slate-500">
                    Reach via {profile.contactChannel}
                  </span>

                  <a
                    href={profile.contactLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-ui bg-[var(--color-green)] hover:bg-emerald-600 text-white font-heading font-black text-xs uppercase border-2 border-[var(--color-ink)] shadow-sticker-sm active:translate-y-0.5 transition"
                    aria-label={`Link up with ${profile.studentName}`}
                  >
                    {profile.contactChannel === "WhatsApp" && <MessageCircle className="w-4 h-4" />}
                    {profile.contactChannel === "Email" && <Mail className="w-4 h-4" />}
                    {profile.contactChannel === "GitHub" && <Github className="w-4 h-4" />}
                    <span>LINK UP ⚡</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* POST A LINK-UP MODAL (WITH FORM VALIDATION & NOTICE) */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="teammates-modal-title"
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-ink)]/70 backdrop-blur-sm animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[var(--color-warm-white)] rounded-panel border-4 border-[var(--color-ink)] shadow-sticker-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5"
          >
            <div className="flex items-center justify-between border-b-2 border-[var(--color-ink)] pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-meta font-extrabold uppercase px-2 py-0.5 rounded bg-[var(--color-yellow)] text-[var(--color-ink)] border border-[var(--color-ink)]">
                  SIMULATED COLLABORATION DEMO
                </span>
                <h2 id="teammates-modal-title" className="text-2xl font-display uppercase tracking-tight text-[var(--color-ink)] pt-1">
                  Post a Link-Up Request
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg border-2 border-[var(--color-ink)] bg-white text-[var(--color-ink)] shadow-sticker-sm hover:bg-[var(--color-lavender)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submissionSuccess ? (
              <div className="p-4 rounded-card bg-[var(--color-soft-green)] border-2 border-[var(--color-green)] text-[var(--color-ink)] space-y-2 text-center py-6">
                <CheckCircle2 className="w-8 h-8 text-[var(--color-success)] mx-auto" />
                <h3 className="font-heading font-black text-lg uppercase text-[var(--color-success)]">
                  {submissionSuccess}
                </h3>
                <p className="font-body text-xs text-slate-700">
                  Your simulated link-up request has been added to the directory.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreateProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                    Your Name (Demo) *
                  </label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => {
                      setNewName(e.target.value);
                      if (formErrors.name) setFormErrors((p) => ({ ...p, name: "" }));
                    }}
                    placeholder="e.g. Demilade Adeleke"
                    className={`w-full px-3.5 py-2.5 rounded-ui border-2 text-sm font-body bg-white focus:outline-none shadow-sticker-sm ${
                      formErrors.name ? "border-red-600 bg-red-50" : "border-[var(--color-ink)]"
                    }`}
                  />
                  {formErrors.name && (
                    <p className="text-[11px] font-bold text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {formErrors.name}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                      Department & Level:
                    </label>
                    <input
                      type="text"
                      value={newDept}
                      onChange={(e) => setNewDept(e.target.value)}
                      placeholder="e.g. Mechatronics (300L)"
                      className="w-full px-3 py-2.5 rounded-ui border-2 border-[var(--color-ink)] bg-white text-xs font-body focus:outline-none shadow-sticker-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                      Campus:
                    </label>
                    <select
                      value={newCampus}
                      onChange={(e) => setNewCampus(e.target.value as any)}
                      className="w-full px-3 py-2.5 rounded-ui border-2 border-[var(--color-ink)] bg-white text-xs font-heading font-bold uppercase focus:outline-none shadow-sticker-sm"
                    >
                      <option value="Oye (Main)">Oye (Main Campus)</option>
                      <option value="Ikole">Ikole Campus</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={newProjectTitle}
                    onChange={(e) => {
                      setNewProjectTitle(e.target.value);
                      if (formErrors.projectTitle) setFormErrors((p) => ({ ...p, projectTitle: "" }));
                    }}
                    placeholder="e.g. Autonomous Campus Delivery Drone Prototype"
                    className={`w-full px-3.5 py-2.5 rounded-ui border-2 text-sm font-body bg-white focus:outline-none shadow-sticker-sm ${
                      formErrors.projectTitle ? "border-red-600 bg-red-50" : "border-[var(--color-ink)]"
                    }`}
                  />
                  {formErrors.projectTitle && (
                    <p className="text-[11px] font-bold text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {formErrors.projectTitle}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                      Project Type:
                    </label>
                    <select
                      value={newProjectType}
                      onChange={(e) => setNewProjectType(e.target.value as any)}
                      className="w-full px-3 py-2.5 rounded-ui border-2 border-[var(--color-ink)] bg-white text-xs font-heading font-bold uppercase focus:outline-none shadow-sticker-sm"
                    >
                      <option value="Hackathon">Hackathon</option>
                      <option value="Final Year Project">Final Year Project</option>
                      <option value="Open Source">Open Source</option>
                      <option value="Startup">Startup</option>
                      <option value="Study Group">Study Group</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                      Contact Channel:
                    </label>
                    <select
                      value={newContactChannel}
                      onChange={(e) => setNewContactChannel(e.target.value as any)}
                      className="w-full px-3 py-2.5 rounded-ui border-2 border-[var(--color-ink)] bg-white text-xs font-heading font-bold uppercase focus:outline-none shadow-sticker-sm"
                    >
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="GitHub">GitHub</option>
                      <option value="Email">Email</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                    Roles Needed (Comma separated):
                  </label>
                  <input
                    type="text"
                    value={newRolesNeeded}
                    onChange={(e) => setNewRolesNeeded(e.target.value)}
                    placeholder="e.g. UI/UX Designer, Python Developer, Hardware Lead"
                    className="w-full px-3.5 py-2.5 rounded-ui border-2 border-[var(--color-ink)] bg-white text-sm font-body focus:outline-none shadow-sticker-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                    Skills Desired (Comma separated):
                  </label>
                  <input
                    type="text"
                    value={newSkills}
                    onChange={(e) => setNewSkills(e.target.value)}
                    placeholder="e.g. Figma, C++, ESP32, React"
                    className="w-full px-3.5 py-2.5 rounded-ui border-2 border-[var(--color-ink)] bg-white text-sm font-body focus:outline-none shadow-sticker-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                    Short Pitch / Description *
                  </label>
                  <textarea
                    rows={3}
                    value={newDesc}
                    onChange={(e) => {
                      setNewDesc(e.target.value);
                      if (formErrors.description) setFormErrors((p) => ({ ...p, description: "" }));
                    }}
                    placeholder="Tell students about the vision and what you need help with..."
                    className={`w-full px-3.5 py-2.5 rounded-ui border-2 text-sm font-body bg-white focus:outline-none shadow-sticker-sm ${
                      formErrors.description ? "border-red-600 bg-red-50" : "border-[var(--color-ink)]"
                    }`}
                  />
                  {formErrors.description && (
                    <p className="text-[11px] font-bold text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {formErrors.description}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                    WhatsApp Phone Number or Link *
                  </label>
                  <input
                    type="text"
                    value={newContactLink}
                    onChange={(e) => {
                      setNewContactLink(e.target.value);
                      if (formErrors.contactLink) setFormErrors((p) => ({ ...p, contactLink: "" }));
                    }}
                    placeholder="e.g. 08012345678 or https://wa.me/2348012345678"
                    className={`w-full px-3.5 py-2.5 rounded-ui border-2 text-sm font-body bg-white focus:outline-none shadow-sticker-sm ${
                      formErrors.contactLink ? "border-red-600 bg-red-50" : "border-[var(--color-ink)]"
                    }`}
                  />
                  {formErrors.contactLink && (
                    <p className="text-[11px] font-bold text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {formErrors.contactLink}
                    </p>
                  )}
                </div>

                <div className="p-3 rounded-ui bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                  <span>
                    🔒 <strong>Privacy Note:</strong> This is a front-end demonstration. No real personal records are published to a public database.
                  </span>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2 border-t-2 border-[var(--color-ink)]/10">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-ui border-2 border-[var(--color-ink)] bg-white font-heading font-bold text-xs uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-ui bg-[var(--color-green)] text-white font-heading font-black text-xs uppercase tracking-wider border-2 border-[var(--color-ink)] shadow-sticker hover:shadow-sticker-lg transition"
                  >
                    PUBLISH LINK-UP ⚡
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
