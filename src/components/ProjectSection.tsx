"use client";

import React, { useState } from "react";
import { StudentProject, INITIAL_PROJECTS } from "@/data/mockData";
import { Code, ExternalLink, Github, ThumbsUp, Plus, Sparkles, X } from "lucide-react";

interface ProjectSectionProps {
  onOpenGemma: () => void;
}

export default function ProjectSection({ onOpenGemma }: ProjectSectionProps) {
  const [projects, setProjects] = useState<StudentProject[]>(INITIAL_PROJECTS);
  const [upvotedMap, setUpvotedMap] = useState<Record<string, boolean>>({});

  // Submit Project Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTagline, setNewTagline] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newCreator, setNewCreator] = useState("");
  const [newDept, setNewDept] = useState("");
  const [newTags, setNewTags] = useState("Next.js, TailwindCSS");
  const [newGithub, setNewGithub] = useState("");
  const [newLive, setNewLive] = useState("");
  const [isPolishing, setIsPolishing] = useState(false);

  // Upvote project
  const handleToggleUpvote = (id: string) => {
    setUpvotedMap((prev) => {
      const isUpvoted = !prev[id];
      setProjects((currentProjects) =>
        currentProjects.map((p) =>
          p.id === id ? { ...p, upvotes: p.upvotes + (isUpvoted ? 1 : -1) } : p
        )
      );
      return { ...prev, [id]: isUpvoted };
    });
  };

  // Polish with Gemma
  const handlePolishWithGemma = async () => {
    if (!newDesc.trim()) return;
    setIsPolishing(true);

    try {
      const res = await fetch("/api/gemma", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "enhance",
          payload: { text: newDesc, type: "project" },
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setNewDesc(data.data.enhanced);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsPolishing(false);
    }
  };

  // Submit project
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCreator.trim()) return;

    const created: StudentProject = {
      id: `proj-${Date.now()}`,
      title: newTitle,
      tagline: newTagline || "Student innovation from FUOYE.",
      description: newDesc || "An open-source solution built for campus life.",
      creators: [{ name: newCreator, department: newDept || "Student" }],
      tags: newTags.split(",").map((t) => t.trim()).filter(Boolean),
      githubUrl: newGithub || undefined,
      liveUrl: newLive || undefined,
      upvotes: 1,
      faculty: "Faculty of Science",
    };

    setProjects([created, ...projects]);
    setIsModalOpen(false);
    // Reset
    setNewTitle("");
    setNewTagline("");
    setNewDesc("");
    setNewCreator("");
    setNewDept("");
    setNewGithub("");
    setNewLive("");
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Code className="w-6 h-6 text-emerald-600" />
            <span>FUOYE Student Project Showcase</span>
          </h2>
          <p className="text-sm text-slate-500">
            Inspiring software, hardware, and research projects built by students across faculties.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Showcase Your Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => {
          const isUpvoted = !!upvotedMap[proj.id];
          return (
            <div
              key={proj.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-slate-900 text-lg leading-snug">
                    {proj.title}
                  </h3>
                  <button
                    onClick={() => handleToggleUpvote(proj.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition shrink-0 ${
                      isUpvoted
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{proj.upvotes}</span>
                  </button>
                </div>

                <p className="text-xs font-medium text-emerald-700">{proj.tagline}</p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {proj.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {proj.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Creators & Links */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">
                    {proj.creators.map((c) => c.name).join(", ")}
                  </span>
                  <p className="text-[11px]">{proj.creators[0]?.department}</p>
                </div>

                <div className="flex items-center gap-2">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SUBMIT PROJECT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <Code className="w-5 h-5 text-emerald-600" />
                <span>Showcase Your Project</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Project Name *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. FUOYE Smart Library Assistant"
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Short Tagline</label>
                <input
                  type="text"
                  value={newTagline}
                  onChange={(e) => setNewTagline(e.target.value)}
                  placeholder="e.g. AI-powered book locator and study room booking"
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Creator Name *</label>
                  <input
                    type="text"
                    required
                    value={newCreator}
                    onChange={(e) => setNewCreator(e.target.value)}
                    placeholder="e.g. Adebayo Kunle"
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    placeholder="e.g. Electrical Engineering"
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tech Stack Tags</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="e.g. Python, Next.js, Arduino, Gemma"
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">GitHub Repo URL</label>
                  <input
                    type="url"
                    value={newGithub}
                    onChange={(e) => setNewGithub(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    value={newLive}
                    onChange={(e) => setNewLive(e.target.value)}
                    placeholder="https://..."
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-slate-700">Project Description</label>
                  <button
                    type="button"
                    onClick={handlePolishWithGemma}
                    disabled={isPolishing || !newDesc.trim()}
                    className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 disabled:opacity-40"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>{isPolishing ? "Polishing..." : "Polish with Gemma AI"}</span>
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Tell students about your architecture, challenges, and what you learned!"
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition"
                >
                  Submit Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

