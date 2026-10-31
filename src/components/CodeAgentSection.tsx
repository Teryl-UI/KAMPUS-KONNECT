"use client";

import React, { useState } from "react";
import { Terminal, Code2, Database, Bug, GitPullRequest, Sparkles, Copy, Check, Loader2, Play } from "lucide-react";

export default function CodeAgentSection() {
  const [mode, setMode] = useState<"scaffold" | "debug" | "supabase" | "git_pr">("scaffold");
  const [promptInput, setPromptInput] = useState(
    "Create an interactive campus event card component with RSVP count, date badge, and share button in Tailwind CSS and React."
  );
  const [outputCode, setOutputCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Preset sample prompts for students
  const PRESETS: Record<typeof mode, string[]> = {
    scaffold: [
      "Create an interactive event card with RSVP counter and campus badge in React & Tailwind",
      "Build a student skill-tag input selector with add and remove badges",
      "Create a WhatsApp contact floating pill with green pulse animation",
    ],
    supabase: [
      "Generate a PostgreSQL table for student hackathon teams with members array and RLS policies",
      "Write a Supabase schema for campus event bookmarks with user_id foreign key",
      "Create a storage bucket security policy for student project screenshots",
    ],
    debug: [
      "Fix: TypeError: Cannot read properties of undefined (reading 'map') in React",
      "Fix: Hydration failed because the server-rendered HTML didn't match the client",
      "Fix: Failed to compile - Module not found: Can't resolve '@/components/Navbar'",
    ],
    git_pr: [
      "I added an Ikole campus filter to the events board. Generate git commands and a PR description",
      "I created a new Figma-styled dark mode toggle. Prepare my Hacktoberfest PR",
      "I fixed an issue where empty event lists did not show an empty state. Write my commit and PR",
    ],
  };

  const handleGenerateCode = async () => {
    if (!promptInput.trim()) return;
    setIsLoading(true);
    setOutputCode(null);

    try {
      const res = await fetch("/api/gemma", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "code",
          payload: {
            mode,
            prompt: promptInput,
            language: mode === "supabase" ? "SQL" : "TypeScript",
          },
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setOutputCode(data.data);
      } else {
        setOutputCode("// Gemma Agent encountered an issue. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setOutputCode("// Network error communicating with Gemma Coding Agent.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!outputCode) return;
    navigator.clipboard.writeText(outputCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>AI Developer Studio</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Code with Gemma Agent</span>
            <span className="text-xs bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded-full">
              Hacktoberfest Ready
            </span>
          </h2>
          <p className="text-sm text-slate-500">
            Let the Gemma AI Agent write components, design Supabase databases, debug errors, and draft your Hacktoberfest PRs!
          </p>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-200/60 p-1.5 rounded-2xl">
        <button
          onClick={() => {
            setMode("scaffold");
            setPromptInput(PRESETS.scaffold[0]);
          }}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition ${
            mode === "scaffold"
              ? "bg-white text-emerald-800 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Code2 className="w-4 h-4 text-emerald-600" />
          <span>Scaffold UI</span>
        </button>

        <button
          onClick={() => {
            setMode("supabase");
            setPromptInput(PRESETS.supabase[0]);
          }}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition ${
            mode === "supabase"
              ? "bg-white text-emerald-800 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Database className="w-4 h-4 text-teal-600" />
          <span>Supabase SQL</span>
        </button>

        <button
          onClick={() => {
            setMode("debug");
            setPromptInput(PRESETS.debug[0]);
          }}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition ${
            mode === "debug"
              ? "bg-white text-emerald-800 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Bug className="w-4 h-4 text-rose-600" />
          <span>Debug Error</span>
        </button>

        <button
          onClick={() => {
            setMode("git_pr");
            setPromptInput(PRESETS.git_pr[0]);
          }}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition ${
            mode === "git_pr"
              ? "bg-white text-emerald-800 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <GitPullRequest className="w-4 h-4 text-purple-600" />
          <span>Git & PR Guide</span>
        </button>
      </div>

      {/* Preset Pills */}
      <div className="space-y-1.5">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
          Quick Preset Prompts:
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESETS[mode].map((preset, idx) => (
            <button
              key={idx}
              onClick={() => setPromptInput(preset)}
              className="text-xs bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 px-3 py-1.5 rounded-xl border border-slate-200 transition text-left"
            >
              💡 {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          {mode === "debug" ? "Paste your error log or buggy code:" : "Describe what you want Gemma Agent to code:"}
        </label>
        <textarea
          rows={3}
          value={promptInput}
          onChange={(e) => setPromptInput(e.target.value)}
          placeholder="Describe the component, SQL table, or error..."
          className="w-full text-sm font-mono p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50/50"
        />

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-slate-400">
            Powered by Google Gemma 2 / Generative AI
          </span>
          <button
            onClick={handleGenerateCode}
            disabled={isLoading || !promptInput.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-semibold text-sm transition shadow-md shadow-emerald-700/20 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Agent Coding...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Run Agent</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Output Code / Result Pane */}
      {outputCode && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
          {/* Terminal Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-slate-400 ml-2">
                gemma-agent-output.{mode === "supabase" ? "sql" : mode === "git_pr" ? "md" : "tsx"}
              </span>
            </div>

            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* Code Body */}
          <div className="p-5 overflow-x-auto text-xs sm:text-sm font-mono text-emerald-300 whitespace-pre-wrap leading-relaxed max-h-[500px]">
            {outputCode}
          </div>
        </div>
      )}
    </section>
  );
}

