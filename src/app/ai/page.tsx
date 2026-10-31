"use client";

import React, { useState } from "react";
import Sticker from "@/components/brand/Sticker";
import {
  Sparkles,
  Send,
  Bot,
  Users,
  Lightbulb,
  GraduationCap,
  PenTool,
  Copy,
  Check,
  RotateCcw,
  Loader2,
  ArrowRight,
  Compass,
  CheckCircle2,
  Calendar,
  Layers,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { CAMPUS_EVENTS, STUDENT_PROJECTS, COMMUNITY_OPPORTUNITIES } from "@/data/mockData";

export default function KonnectAIWorkspace() {
  const [activeTab, setActiveTab] = useState<"chat" | "incubator" | "matchmaker" | "learning" | "writing">("chat");

  // Chat State
  const [chatPrompt, setChatPrompt] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "gemma"; text: string }>>([
    {
      role: "gemma",
      text: "⚡ **Hello FUOYE student!** I am **Gemma**, your campus AI copilot. I am grounded in real events, student projects, and opportunities across Oye and Ikole campuses. How can I help you thrive today?",
    },
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Incubator State
  const [ideaText, setIdeaText] = useState("");
  const [projectType, setProjectType] = useState<"Hackathon" | "Final Year Project" | "Startup" | "Open Source">("Hackathon");
  const [incubatorResult, setIncubatorResult] = useState<any | null>(null);
  const [isIncubatorLoading, setIsIncubatorLoading] = useState(false);

  // Matchmaker State
  const [userSkills, setUserSkills] = useState("React, Tailwind, Figma");
  const [lookingFor, setLookingFor] = useState("Hackathon team or backend collaborator");
  const [matchResult, setMatchResult] = useState<any | null>(null);
  const [isMatchLoading, setIsMatchLoading] = useState(false);

  // Learning Companion State
  const [learningTopic, setLearningTopic] = useState("React Server Components vs Client Components");
  const [learningMode, setLearningMode] = useState<"explain" | "quiz" | "flashcards">("explain");
  const [learningOutput, setLearningOutput] = useState<string | null>(null);
  const [isLearningLoading, setIsLearningLoading] = useState(false);

  // Writing Assistant State
  const [draftContent, setDraftContent] = useState("");
  const [writingContext, setWritingContext] = useState<"project_announcement" | "teammate_pitch" | "connection_message" | "simplified_language">("project_announcement");
  const [polishedResult, setPolishedResult] = useState<{ improvedText: string; toneNotes: string } | null>(null);
  const [isWritingLoading, setIsWritingLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // --- Handlers ---
  const handleChatSubmit = async (e?: React.FormEvent, directPrompt?: string) => {
    if (e) e.preventDefault();
    const promptToSend = directPrompt || chatPrompt;
    if (!promptToSend.trim() || isChatLoading) return;

    setChatMessages((prev) => [...prev, { role: "user", text: promptToSend }]);
    setChatPrompt("");
    setIsChatLoading(true);

    try {
      const res = await fetch("/api/gemma", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "chat", prompt: promptToSend }),
      });
      const data = await res.json();
      setChatMessages((prev) => [
        ...prev,
        { role: "gemma", text: data.response || data.fallback || "Gemma is online and ready to assist." },
      ]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        { role: "gemma", text: "⚡ Gemma is currently offline. Explore the /events or /projects tabs for direct campus updates!" },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleIncubateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaText.trim() || isIncubatorLoading) return;
    setIsIncubatorLoading(true);
    try {
      const res = await fetch("/api/gemma", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "incubate_project", idea: ideaText, type: projectType }),
      });
      const data = await res.json();
      setIncubatorResult(data.data);
    } catch {
      setIncubatorResult(null);
    } finally {
      setIsIncubatorLoading(false);
    }
  };

  const handleMatchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userSkills.trim() || isMatchLoading) return;
    setIsMatchLoading(true);
    try {
      const res = await fetch("/api/gemma", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "match_teammates",
          skills: userSkills.split(",").map((s) => s.trim()),
          query: lookingFor,
        }),
      });
      const data = await res.json();
      setMatchResult(data.data);
    } catch {
      setMatchResult(null);
    } finally {
      setIsMatchLoading(false);
    }
  };

  const handleLearningSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!learningTopic.trim() || isLearningLoading) return;
    setIsLearningLoading(true);
    try {
      const res = await fetch("/api/gemma", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "learning_companion", topic: learningTopic, mode: learningMode }),
      });
      const data = await res.json();
      setLearningOutput(data.data?.output || "Output generated.");
    } catch {
      setLearningOutput("Failed to fetch explanation from Gemma.");
    } finally {
      setIsLearningLoading(false);
    }
  };

  const handleWritingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftContent.trim() || isWritingLoading) return;
    setIsWritingLoading(true);
    try {
      const res = await fetch("/api/gemma", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "improve_writing", text: draftContent, context: writingContext }),
      });
      const data = await res.json();
      setPolishedResult(data.data);
    } catch {
      setPolishedResult(null);
    } finally {
      setIsWritingLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="relative rounded-panel bg-[var(--color-purple)] text-white p-8 sm:p-10 border-4 border-[var(--color-ink)] shadow-sticker-lg overflow-hidden">
        <div className="absolute top-3 right-3 hidden sm:flex items-center gap-2">
          <Sticker variant="yellow" rotate="right" emoji="⚡">
            POWERED BY GEMMA
          </Sticker>
        </div>

        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-yellow)] text-[var(--color-ink)] border-2 border-[var(--color-ink)] text-xs font-meta font-black uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FUOYE STUDENT AI WORKSPACE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-white">
            KONNECT AI COPILOT
          </h1>
          <p className="font-body text-sm sm:text-base text-slate-200 leading-relaxed">
            Your university intelligence assistant powered by Google Gemma. Match with hackathon teammates, incubate semester projects, summarize campus opportunities, and polish your pitches.
          </p>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 no-scrollbar border-b-2 border-[var(--color-ink)]/15">
        <button
          onClick={() => setActiveTab("chat")}
          className={`flex items-center gap-2 px-5 py-3 rounded-ui font-heading font-black text-xs sm:text-sm uppercase tracking-wider border-2 border-[var(--color-ink)] transition ${
            activeTab === "chat"
              ? "bg-[var(--color-yellow)] text-[var(--color-ink)] shadow-sticker"
              : "bg-white text-[var(--color-ink)] hover:bg-slate-50"
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>Campus Copilot</span>
        </button>

        <button
          onClick={() => setActiveTab("incubator")}
          className={`flex items-center gap-2 px-5 py-3 rounded-ui font-heading font-black text-xs sm:text-sm uppercase tracking-wider border-2 border-[var(--color-ink)] transition ${
            activeTab === "incubator"
              ? "bg-[var(--color-yellow)] text-[var(--color-ink)] shadow-sticker"
              : "bg-white text-[var(--color-ink)] hover:bg-slate-50"
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          <span>Project Incubator</span>
        </button>

        <button
          onClick={() => setActiveTab("matchmaker")}
          className={`flex items-center gap-2 px-5 py-3 rounded-ui font-heading font-black text-xs sm:text-sm uppercase tracking-wider border-2 border-[var(--color-ink)] transition ${
            activeTab === "matchmaker"
              ? "bg-[var(--color-yellow)] text-[var(--color-ink)] shadow-sticker"
              : "bg-white text-[var(--color-ink)] hover:bg-slate-50"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Teammate Matcher</span>
        </button>

        <button
          onClick={() => setActiveTab("learning")}
          className={`flex items-center gap-2 px-5 py-3 rounded-ui font-heading font-black text-xs sm:text-sm uppercase tracking-wider border-2 border-[var(--color-ink)] transition ${
            activeTab === "learning"
              ? "bg-[var(--color-yellow)] text-[var(--color-ink)] shadow-sticker"
              : "bg-white text-[var(--color-ink)] hover:bg-slate-50"
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Study Companion</span>
        </button>

        <button
          onClick={() => setActiveTab("writing")}
          className={`flex items-center gap-2 px-5 py-3 rounded-ui font-heading font-black text-xs sm:text-sm uppercase tracking-wider border-2 border-[var(--color-ink)] transition ${
            activeTab === "writing"
              ? "bg-[var(--color-yellow)] text-[var(--color-ink)] shadow-sticker"
              : "bg-white text-[var(--color-ink)] hover:bg-slate-50"
          }`}
        >
          <PenTool className="w-4 h-4" />
          <span>Writing Assistant</span>
        </button>
      </div>

      {/* ========================================================
          TAB 1: CAMPUS COPILOT
          ======================================================== */}
      {activeTab === "chat" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-white rounded-panel border-4 border-[var(--color-ink)] shadow-sticker p-6 flex flex-col h-[600px]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "gemma" && (
                    <div className="w-8 h-8 rounded-full bg-[var(--color-purple)] text-white flex items-center justify-center font-black text-xs shrink-0 mt-1 border-2 border-[var(--color-ink)]">
                      ⚡
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[var(--color-purple)] text-white rounded-tr-none border-2 border-[var(--color-ink)] shadow-sticker-sm"
                        : "bg-[var(--color-warm-white)] text-[var(--color-ink)] rounded-tl-none border-2 border-[var(--color-ink)] shadow-sticker-sm"
                    }`}
                  >
                    <div className="whitespace-pre-wrap font-body">{msg.text}</div>
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 text-amber-900 text-xs font-meta w-fit border border-amber-200">
                  <Loader2 className="w-4 h-4 animate-spin text-[var(--color-purple)]" />
                  <span>Gemma is thinking and checking campus records...</span>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleChatSubmit} className="pt-4 border-t-2 border-[var(--color-ink)]/15 flex items-center gap-3">
              <input
                type="text"
                value={chatPrompt}
                onChange={(e) => setChatPrompt(e.target.value)}
                placeholder="Ask about events, hackathons, faculties, or shuttle..."
                className="flex-1 px-4 py-3 rounded-ui border-2 border-[var(--color-ink)] text-sm font-body bg-[var(--color-warm-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-purple)]"
              />
              <button
                type="submit"
                disabled={isChatLoading || !chatPrompt.trim()}
                className="px-6 py-3 rounded-ui bg-[var(--color-yellow)] hover:bg-amber-300 disabled:opacity-50 text-[var(--color-ink)] font-heading font-black text-sm uppercase tracking-wider border-2 border-[var(--color-ink)] shadow-sticker transition flex items-center gap-2"
              >
                <span>Ask</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Quick Context Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[var(--color-warm-white)] rounded-panel border-3 border-[var(--color-ink)] shadow-sticker p-5 space-y-4">
              <h2 className="font-heading font-black text-sm uppercase text-[var(--color-purple)] flex items-center gap-2">
                <Compass className="w-4 h-4" />
                <span>Suggested Questions</span>
              </h2>
              <div className="space-y-2">
                {[
                  "What hackathons or workshops are happening this month?",
                  "How do I travel between Oye and Ikole campuses?",
                  "Which student projects are currently seeking UI/UX designers?",
                  "What are the best tips for the upcoming first semester exams?",
                ].map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleChatSubmit(undefined, q)}
                    className="w-full text-left p-2.5 rounded-lg bg-white hover:bg-[var(--color-yellow)] text-xs font-heading font-bold text-[var(--color-ink)] border border-[var(--color-ink)] shadow-sticker-sm transition"
                  >
                    ✦ {q}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-panel bg-[var(--color-soft-green)] border-2 border-[var(--color-green)] text-xs text-slate-800 space-y-2">
              <span className="font-heading font-black text-xs uppercase text-[var(--color-success)] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Grounded Campus Knowledge</span>
              </span>
              <p className="font-body text-[11px] leading-relaxed">
                Konnect AI queries actual FUOYE event schedules and active project records. It never hallucinates nonexistent deadlines or faculty policies.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 2: PROJECT INCUBATOR
          ======================================================== */}
      {activeTab === "incubator" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-white rounded-panel border-4 border-[var(--color-ink)] shadow-sticker p-6 space-y-5">
            <div className="space-y-1">
              <span className="text-[10px] font-meta font-extrabold uppercase px-2 py-0.5 rounded bg-[var(--color-yellow)] text-[var(--color-ink)] border border-[var(--color-ink)]">
                AI SCAFFOLDING
              </span>
              <h2 className="text-2xl font-display uppercase tracking-tight text-[var(--color-ink)]">
                Incubate Project Idea
              </h2>
              <p className="text-xs font-body text-slate-600">
                Type your rough concept and Gemma will structure an MVP plan, tech stack, and teammate breakdown.
              </p>
            </div>

            <form onSubmit={handleIncubateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                  Project Classification:
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-ui border-2 border-[var(--color-ink)] bg-[var(--color-warm-white)] text-xs font-heading font-bold uppercase focus:outline-none shadow-sticker-sm"
                >
                  <option value="Hackathon">Hackathon Sprint</option>
                  <option value="Final Year Project">Final Year Project</option>
                  <option value="Startup">Student Startup</option>
                  <option value="Open Source">Open-Source Library</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                  Describe Your Rough Idea *
                </label>
                <textarea
                  rows={5}
                  value={ideaText}
                  onChange={(e) => setIdeaText(e.target.value)}
                  placeholder="e.g. A WhatsApp automated bot that alerts Ikole engineering students when inter-campus shuttles are arriving or delayed..."
                  className="w-full px-3.5 py-2.5 rounded-ui border-2 border-[var(--color-ink)] bg-[var(--color-warm-white)] text-xs font-body focus:outline-none shadow-sticker-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isIncubatorLoading || !ideaText.trim()}
                className="w-full py-3.5 rounded-ui bg-[var(--color-purple)] hover:bg-purple-900 disabled:opacity-50 text-white font-heading font-black text-xs uppercase tracking-wider border-2 border-[var(--color-ink)] shadow-sticker transition flex items-center justify-center gap-2"
              >
                {isIncubatorLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[var(--color-yellow)]" />
                    <span>Incubating with Gemma...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[var(--color-yellow)]" />
                    <span>Generate MVP Plan</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 bg-[var(--color-warm-white)] rounded-panel border-4 border-[var(--color-ink)] shadow-sticker p-6 space-y-6">
            {incubatorResult ? (
              <div className="space-y-6">
                <div className="border-b-2 border-[var(--color-ink)] pb-4">
                  <span className="text-xs font-meta text-slate-500 uppercase tracking-widest block">
                    ✦ PROPOSED PROJECT
                  </span>
                  <h3 className="text-2xl font-display uppercase tracking-tight text-[var(--color-ink)] pt-1">
                    {incubatorResult.title}
                  </h3>
                </div>

                {/* MVP Features */}
                <div className="space-y-2">
                  <h4 className="font-heading font-black text-xs uppercase text-[var(--color-purple)] tracking-wide">
                    Core MVP Features:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {incubatorResult.mvpFeatures?.map((f: string, i: number) => (
                      <div key={i} className="p-2.5 rounded-lg bg-white border border-[var(--color-ink)]/20 text-xs font-body flex items-start gap-2 shadow-sticker-sm">
                        <span className="text-[var(--color-green)] font-bold">✓</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack & Roles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white border border-[var(--color-ink)] space-y-2">
                    <h5 className="font-heading font-black text-xs uppercase text-slate-700">Recommended Tech:</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {incubatorResult.techStack?.map((t: string, i: number) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-[var(--color-lavender)] text-[var(--color-purple)] text-[10px] font-heading font-bold uppercase">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[var(--color-ink)] space-y-2">
                    <h5 className="font-heading font-black text-xs uppercase text-slate-700">Roles to Recruit:</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {incubatorResult.openRolesNeeded?.map((r: string, i: number) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-[var(--color-soft-green)] text-[var(--color-success)] text-[10px] font-heading font-bold uppercase">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4-Week Roadmap */}
                <div className="space-y-2">
                  <h4 className="font-heading font-black text-xs uppercase text-[var(--color-purple)] tracking-wide">
                    4-Week Execution Roadmap:
                  </h4>
                  <div className="space-y-2">
                    {incubatorResult.roadmap?.map((rm: any, i: number) => (
                      <div key={i} className="p-3 rounded-lg bg-white border border-[var(--color-ink)] text-xs flex items-center justify-between shadow-sticker-sm">
                        <span className="font-meta font-extrabold text-[var(--color-purple)]">{rm.week}</span>
                        <span className="text-slate-800 font-body text-right">{rm.milestone}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-ui bg-[var(--color-green)] text-white font-heading font-black text-xs uppercase border-2 border-[var(--color-ink)] shadow-sticker hover:bg-emerald-600 transition"
                  >
                    <span>Post this to Student Projects Showcase</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 space-y-3 text-slate-500">
                <Lightbulb className="w-12 h-12 text-[var(--color-yellow)]" />
                <h4 className="font-heading font-black text-base uppercase text-[var(--color-ink)]">
                  Your Incubated Project Plan Will Appear Here
                </h4>
                <p className="font-body text-xs max-w-sm">
                  Enter an idea on the left and click "Generate MVP Plan" to let Gemma break it down into realistic milestones.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 3: TEAMMATE MATCHMAKER
          ======================================================== */}
      {activeTab === "matchmaker" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-white rounded-panel border-4 border-[var(--color-ink)] shadow-sticker p-6 space-y-5">
            <div className="space-y-1">
              <span className="text-[10px] font-meta font-extrabold uppercase px-2 py-0.5 rounded bg-[var(--color-green)] text-white border border-[var(--color-ink)]">
                AI SYNERGY SCOUT
              </span>
              <h2 className="text-2xl font-display uppercase tracking-tight text-[var(--color-ink)]">
                Teammate Matchmaker
              </h2>
              <p className="text-xs font-body text-slate-600">
                Tell Gemma your skills and goals. It will analyze active student projects and suggest matching roles across Oye & Ikole.
              </p>
            </div>

            <form onSubmit={handleMatchSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                  Your Current Skills (comma-separated):
                </label>
                <input
                  type="text"
                  value={userSkills}
                  onChange={(e) => setUserSkills(e.target.value)}
                  placeholder="e.g. React, Tailwind, Python, Figma"
                  className="w-full px-3.5 py-2.5 rounded-ui border-2 border-[var(--color-ink)] bg-[var(--color-warm-white)] text-xs font-body focus:outline-none shadow-sticker-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                  What kind of team are you looking for?
                </label>
                <input
                  type="text"
                  value={lookingFor}
                  onChange={(e) => setLookingFor(e.target.value)}
                  placeholder="e.g. Hacktoberfest open-source project or IoT agri-tech"
                  className="w-full px-3.5 py-2.5 rounded-ui border-2 border-[var(--color-ink)] bg-[var(--color-warm-white)] text-xs font-body focus:outline-none shadow-sticker-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isMatchLoading || !userSkills.trim()}
                className="w-full py-3.5 rounded-ui bg-[var(--color-yellow)] hover:bg-amber-300 disabled:opacity-50 text-[var(--color-ink)] font-heading font-black text-xs uppercase tracking-wider border-2 border-[var(--color-ink)] shadow-sticker transition flex items-center justify-center gap-2"
              >
                {isMatchLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[var(--color-ink)]" />
                    <span>Matching with active projects...</span>
                  </>
                ) : (
                  <>
                    <Users className="w-4 h-4" />
                    <span>Find My Collaboration Match</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 bg-[var(--color-warm-white)] rounded-panel border-4 border-[var(--color-ink)] shadow-sticker p-6 space-y-6">
            {matchResult ? (
              <div className="space-y-5">
                <div className="border-b-2 border-[var(--color-ink)] pb-3">
                  <h3 className="text-xl font-display uppercase tracking-tight text-[var(--color-ink)]">
                    Gemma Match Analysis
                  </h3>
                </div>

                <div className="p-4 rounded-xl bg-white border-2 border-[var(--color-ink)] shadow-sticker-sm space-y-3">
                  <div className="whitespace-pre-wrap font-body text-xs text-slate-800 leading-relaxed">
                    {matchResult.recommendation}
                  </div>
                </div>

                <h4 className="font-heading font-black text-xs uppercase text-[var(--color-purple)] tracking-wide">
                  Recommended Project Spaces:
                </h4>

                <div className="space-y-3">
                  {matchResult.matchedProjects?.map((proj: any) => (
                    <div key={proj.id} className="p-4 rounded-xl bg-white border-2 border-[var(--color-ink)] shadow-sticker-sm flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h5 className="font-heading font-black text-sm uppercase text-[var(--color-ink)]">{proj.title}</h5>
                        <p className="font-body text-xs text-slate-600">{proj.matchReason}</p>
                      </div>
                      <Link
                        href={`/projects/${proj.id}`}
                        className="px-3.5 py-1.5 rounded-lg bg-[var(--color-purple)] text-white font-heading font-black text-xs uppercase border border-[var(--color-ink)] shrink-0 hover:bg-purple-900 transition"
                      >
                        View Roles
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 space-y-3 text-slate-500">
                <Users className="w-12 h-12 text-[var(--color-green)]" />
                <h4 className="font-heading font-black text-base uppercase text-[var(--color-ink)]">
                  Discover Your Match
                </h4>
                <p className="font-body text-xs max-w-sm">
                  Gemma analyzes active student rosters and open project roles to match your unique skillset with team builders.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 4: STUDY COMPANION
          ======================================================== */}
      {activeTab === "learning" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-white rounded-panel border-4 border-[var(--color-ink)] shadow-sticker p-6 space-y-5">
            <div className="space-y-1">
              <span className="text-[10px] font-meta font-extrabold uppercase px-2 py-0.5 rounded bg-[var(--color-lavender)] text-[var(--color-purple)] border border-[var(--color-ink)]">
                ACADEMIC ACCELERATOR
              </span>
              <h2 className="text-2xl font-display uppercase tracking-tight text-[var(--color-ink)]">
                Study Companion
              </h2>
              <p className="text-xs font-body text-slate-600">
                Master complex computer science, engineering, or science concepts with instant quizzes, flashcards, and simple analogies.
              </p>
            </div>

            <form onSubmit={handleLearningSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                  Topic or Concept to Study:
                </label>
                <input
                  type="text"
                  value={learningTopic}
                  onChange={(e) => setLearningTopic(e.target.value)}
                  placeholder="e.g. Asynchronous JavaScript, Microcontrollers, Sorting Algorithms"
                  className="w-full px-3.5 py-2.5 rounded-ui border-2 border-[var(--color-ink)] bg-[var(--color-warm-white)] text-xs font-body focus:outline-none shadow-sticker-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                  Mode:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: "explain", label: "Explain" },
                    { key: "quiz", label: "3-Q Quiz" },
                    { key: "flashcards", label: "Flashcards" },
                  ].map((m) => (
                    <button
                      key={m.key}
                      type="button"
                      onClick={() => setLearningMode(m.key as any)}
                      className={`py-2 rounded-ui text-xs font-heading font-black uppercase border border-[var(--color-ink)] transition ${
                        learningMode === m.key
                          ? "bg-[var(--color-yellow)] text-[var(--color-ink)] shadow-sticker-sm"
                          : "bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLearningLoading || !learningTopic.trim()}
                className="w-full py-3.5 rounded-ui bg-[var(--color-purple)] hover:bg-purple-900 disabled:opacity-50 text-white font-heading font-black text-xs uppercase tracking-wider border-2 border-[var(--color-ink)] shadow-sticker transition flex items-center justify-center gap-2"
              >
                {isLearningLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[var(--color-yellow)]" />
                    <span>Generating study material...</span>
                  </>
                ) : (
                  <>
                    <GraduationCap className="w-4 h-4 text-[var(--color-yellow)]" />
                    <span>Run Study Session</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 bg-[var(--color-warm-white)] rounded-panel border-4 border-[var(--color-ink)] shadow-sticker p-6 space-y-4">
            <div className="border-b-2 border-[var(--color-ink)] pb-3 flex items-center justify-between">
              <h3 className="text-xl font-display uppercase tracking-tight text-[var(--color-ink)]">
                Study Session Notes
              </h3>
              {learningOutput && (
                <button
                  onClick={() => copyToClipboard(learningOutput)}
                  className="px-3 py-1 rounded bg-white hover:bg-slate-50 text-[var(--color-ink)] text-xs font-heading font-bold border border-[var(--color-ink)] flex items-center gap-1 shadow-sticker-sm"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy Notes"}</span>
                </button>
              )}
            </div>

            {learningOutput ? (
              <div className="p-5 rounded-xl bg-white border-2 border-[var(--color-ink)] shadow-sticker-sm max-h-[500px] overflow-y-auto">
                <div className="whitespace-pre-wrap font-body text-xs text-slate-800 leading-relaxed">
                  {learningOutput}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 space-y-3 text-slate-500">
                <GraduationCap className="w-12 h-12 text-[var(--color-purple)]" />
                <h4 className="font-heading font-black text-base uppercase text-[var(--color-ink)]">
                  Ready to Study
                </h4>
                <p className="font-body text-xs max-w-sm">
                  Pick any engineering, science, or general coursework topic. Gemma synthesizes clear breakdown notes and interactive flashcards.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 5: WRITING ASSISTANT
          ======================================================== */}
      {activeTab === "writing" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 bg-white rounded-panel border-4 border-[var(--color-ink)] shadow-sticker p-6 space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-meta font-extrabold uppercase px-2 py-0.5 rounded bg-[var(--color-red)] text-white border border-[var(--color-ink)]">
                COMMUNICATION POLISHER
              </span>
              <h2 className="text-2xl font-display uppercase tracking-tight text-[var(--color-ink)]">
                Writing Assistant
              </h2>
              <p className="text-xs font-body text-slate-600">
                Turn quick bullet points or rough drafts into compelling campus announcements or polite networking messages.
              </p>
            </div>

            <form onSubmit={handleWritingSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                  Draft Purpose:
                </label>
                <select
                  value={writingContext}
                  onChange={(e) => setWritingContext(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-ui border-2 border-[var(--color-ink)] bg-[var(--color-warm-white)] text-xs font-heading font-bold uppercase focus:outline-none shadow-sticker-sm"
                >
                  <option value="project_announcement">Project Launch Announcement</option>
                  <option value="teammate_pitch">Teammate Recruitment Pitch</option>
                  <option value="connection_message">WhatsApp / LinkedIn Networking Message</option>
                  <option value="simplified_language">Plain / Simplified English</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                  Your Raw Text:
                </label>
                <textarea
                  rows={6}
                  value={draftContent}
                  onChange={(e) => setDraftContent(e.target.value)}
                  placeholder="e.g. hey we built an app for calculating gpa in fuoye looking for someone who knows how to make the design look better..."
                  className="w-full px-3.5 py-2.5 rounded-ui border-2 border-[var(--color-ink)] bg-[var(--color-warm-white)] text-xs font-body focus:outline-none shadow-sticker-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isWritingLoading || !draftContent.trim()}
                className="w-full py-3.5 rounded-ui bg-[var(--color-green)] hover:bg-emerald-600 disabled:opacity-50 text-white font-heading font-black text-xs uppercase tracking-wider border-2 border-[var(--color-ink)] shadow-sticker transition flex items-center justify-center gap-2"
              >
                {isWritingLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Polishing with Gemma...</span>
                  </>
                ) : (
                  <>
                    <PenTool className="w-4 h-4" />
                    <span>Polish & Elevate Draft</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-6 bg-[var(--color-warm-white)] rounded-panel border-4 border-[var(--color-ink)] shadow-sticker p-6 space-y-4">
            <div className="border-b-2 border-[var(--color-ink)] pb-3 flex items-center justify-between">
              <h3 className="text-xl font-display uppercase tracking-tight text-[var(--color-ink)]">
                Polished Result
              </h3>
              {polishedResult && (
                <button
                  onClick={() => copyToClipboard(polishedResult.improvedText)}
                  className="px-3 py-1 rounded bg-white hover:bg-slate-50 text-[var(--color-ink)] text-xs font-heading font-bold border border-[var(--color-ink)] flex items-center gap-1 shadow-sticker-sm"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy to Clipboard"}</span>
                </button>
              )}
            </div>

            {polishedResult ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white border-2 border-[var(--color-ink)] shadow-sticker-sm">
                  <div className="whitespace-pre-wrap font-body text-xs text-slate-800 leading-relaxed">
                    {polishedResult.improvedText}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs font-meta text-amber-900">
                  <strong>✦ Gemma Tone Note:</strong> {polishedResult.toneNotes}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 space-y-3 text-slate-500">
                <PenTool className="w-12 h-12 text-[var(--color-red)]" />
                <h4 className="font-heading font-black text-base uppercase text-[var(--color-ink)]">
                  Ready to Polish Your Writing
                </h4>
                <p className="font-body text-xs max-w-sm">
                  Paste your rough thoughts on the left and select the context. Gemma will format it into a confident, professional draft.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
