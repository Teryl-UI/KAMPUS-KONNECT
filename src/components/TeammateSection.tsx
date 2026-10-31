"use client";

import React, { useState } from "react";
import { CollabPost, INITIAL_COLLAB_POSTS } from "@/data/mockData";
import { Users, Plus, MessageCircle, Github, Sparkles, Filter, X, Send, Briefcase } from "lucide-react";

interface TeammateSectionProps {
  onOpenGemma: () => void;
}

export default function TeammateSection({ onOpenGemma }: TeammateSectionProps) {
  const [posts, setPosts] = useState<CollabPost[]>(INITIAL_COLLAB_POSTS);
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedCampus, setSelectedCampus] = useState<string>("All");

  // Create Collab Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newCampus, setNewCampus] = useState<CollabPost["campus"]>("Oye (Main)");
  const [newProjectType, setNewProjectType] = useState<CollabPost["projectType"]>("Hackathon");
  const [newRolesNeeded, setNewRolesNeeded] = useState("Frontend Dev, UI Designer");
  const [newSkills, setNewSkills] = useState("React, TailwindCSS, Figma");
  const [newDesc, setNewDesc] = useState("");
  const [newContactHandle, setNewContactHandle] = useState("");
  const [isPolishing, setIsPolishing] = useState(false);

  // Filter posts
  const filteredPosts = posts.filter((p) => {
    const matchesType = selectedType === "All" || p.projectType === selectedType;
    const matchesCampus = selectedCampus === "All" || p.campus.includes(selectedCampus);
    return matchesType && matchesCampus;
  });

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
          payload: { text: newDesc, type: "collab" },
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

  // Submit Post
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim()) return;

    const created: CollabPost = {
      id: `collab-${Date.now()}`,
      title: newTitle,
      author: newAuthor,
      authorRole: newRole || "FUOYE Student",
      faculty: newCampus === "Ikole" ? "Faculty of Engineering" : "Faculty of Science",
      department: "Computer Science",
      campus: newCampus,
      projectType: newProjectType,
      rolesNeeded: newRolesNeeded.split(",").map((r) => r.trim()).filter(Boolean),
      skillsRequired: newSkills.split(",").map((s) => s.trim()).filter(Boolean),
      description: newDesc || "Looking for passionate teammates to build together.",
      contactPlatform: "WhatsApp",
      contactHandle: newContactHandle.startsWith("http")
        ? newContactHandle
        : `https://wa.me/${newContactHandle.replace(/[^0-9]/g, "")}`,
      createdAt: "Just now",
    };

    setPosts([created, ...posts]);
    setIsModalOpen(false);
    // Reset
    setNewTitle("");
    setNewAuthor("");
    setNewRole("");
    setNewDesc("");
    setNewContactHandle("");
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-600" />
            <span>Teammate & Project Matcher</span>
          </h2>
          <p className="text-sm text-slate-500">
            Find developers, designers, hardware builders, and writers for hackathons & projects.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenGemma}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow-sm transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Matchmaker</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Post a Request</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-500 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Type:</span>
          </span>
          {["All", "Hackathon", "Final Year Project", "Open Source", "Startup"].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition ${
                selectedType === t
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 text-xs">
          {["All", "Oye", "Ikole"].map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCampus(c)}
              className={`px-2.5 py-1 rounded-md font-medium ${
                selectedCampus === c
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {c === "All" ? "Both Campuses" : `${c} Campus`}
            </button>
          ))}
        </div>
      </div>

      {/* Collab Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition p-5 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Badge & Time */}
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full font-bold bg-amber-100 text-amber-900 border border-amber-200">
                  {post.projectType}
                </span>
                <span className="text-slate-400">{post.createdAt}</span>
              </div>

              {/* Title */}
              <h3 className="font-bold text-slate-900 text-base leading-snug">
                {post.title}
              </h3>

              {/* Roles Needed */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Roles Needed:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {post.rolesNeeded.map((r, i) => (
                    <span
                      key={i}
                      className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                {post.description}
              </p>

              {/* Required Skills */}
              <div className="space-y-1 pt-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Skills:
                </span>
                <div className="flex flex-wrap gap-1">
                  {post.skillsRequired.map((s, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600"
                    >
                      #{s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Poster Info & Contact CTA */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">{post.author}</p>
                <p className="text-[11px] text-slate-500">
                  {post.authorRole} • {post.campus}
                </p>
              </div>

              <a
                href={post.contactHandle}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-sm"
              >
                {post.contactPlatform === "WhatsApp" ? (
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-200" />
                ) : (
                  <Send className="w-3.5 h-3.5 text-emerald-200" />
                )}
                <span>Contact</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE POST MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                <span>Post a Teammate Request</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Building an AI Study Assistant for FUOYE"
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Samuel Adeleke"
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Level & Dept</label>
                  <input
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    placeholder="e.g. 300L Computer Science"
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Campus</label>
                  <select
                    value={newCampus}
                    onChange={(e) => setNewCampus(e.target.value as any)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Oye (Main)">Oye (Main Campus)</option>
                    <option value="Ikole">Ikole Campus</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project Type</label>
                  <select
                    value={newProjectType}
                    onChange={(e) => setNewProjectType(e.target.value as any)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Hackathon">Hackathon</option>
                    <option value="Final Year Project">Final Year Project</option>
                    <option value="Open Source">Open Source</option>
                    <option value="Startup">Startup / Commercial</option>
                    <option value="Study Group">Study Group</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Roles Needed (Comma separated)</label>
                <input
                  type="text"
                  value={newRolesNeeded}
                  onChange={(e) => setNewRolesNeeded(e.target.value)}
                  placeholder="e.g. UI/UX Designer, Backend Developer"
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Skills Desired (Comma separated)</label>
                <input
                  type="text"
                  value={newSkills}
                  onChange={(e) => setNewSkills(e.target.value)}
                  placeholder="e.g. Figma, Next.js, Python"
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-slate-700">Project Pitch</label>
                  <button
                    type="button"
                    onClick={handlePolishWithGemma}
                    disabled={isPolishing || !newDesc.trim()}
                    className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 disabled:opacity-40"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>{isPolishing ? "Polishing with Gemma..." : "Polish with Gemma AI"}</span>
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Briefly describe what you are building. Gemma can help format it!"
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">WhatsApp Phone Number or Link</label>
                <input
                  type="text"
                  value={newContactHandle}
                  onChange={(e) => setNewContactHandle(e.target.value)}
                  placeholder="e.g. 08012345678 or https://wa.me/2348012345678"
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
                  Publish Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

