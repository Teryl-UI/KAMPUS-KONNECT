"use client";

import React, { useState } from "react";
import { Sparkles, Calendar, Users, Code, Menu, X, Github, Terminal } from "lucide-react";

interface NavbarProps {
  activeTab: "events" | "collab" | "projects" | "agent";
  setActiveTab: (tab: "events" | "collab" | "projects" | "agent") => void;
  onOpenGemma: () => void;
}

export default function Navbar({ activeTab, setActiveTab, onOpenGemma }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Hacktoberfest Announcement Bar */}
      <div className="bg-gradient-to-r from-emerald-700 via-emerald-800 to-teal-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
              Hacktoberfest 2026
            </span>
            <span className="hidden sm:inline">
              Campus Connect is open-source for FUOYE students! Star us on GitHub & submit your PRs.
            </span>
            <span className="sm:hidden">Open-source for FUOYE students 🚀</span>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline text-amber-200 text-xs font-medium"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-emerald-600/20">
              CC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
                  Campus Connect
                </span>
                <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  FUOYE
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Oye & Ikole Campus Collaboration Portal
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("events")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "events"
                  ? "bg-white text-emerald-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Events</span>
            </button>
            <button
              onClick={() => setActiveTab("collab")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "collab"
                  ? "bg-white text-emerald-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Find Teammates</span>
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "projects"
                  ? "bg-white text-emerald-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Code className="w-4 h-4" />
              <span>Project Showcase</span>
            </button>
            <button
              onClick={() => setActiveTab("agent")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "agent"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>Code with Agent</span>
            </button>
          </nav>

          {/* Action Button: Gemma AI */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenGemma}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 hover:from-emerald-700 hover:to-teal-700 transition"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Ask Gemma AI</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenGemma}
              className="p-2 rounded-lg bg-emerald-50 text-emerald-700"
              title="Gemma AI"
            >
              <Sparkles className="w-5 h-5 text-emerald-600" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2">
          <button
            onClick={() => {
              setActiveTab("events");
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === "events" ? "bg-emerald-50 text-emerald-800" : "text-slate-700"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Discover Events</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("collab");
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === "collab" ? "bg-emerald-50 text-emerald-800" : "text-slate-700"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Find Teammates</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("projects");
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === "projects" ? "bg-emerald-50 text-emerald-800" : "text-slate-700"
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Student Projects</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("agent");
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold ${
              activeTab === "agent" ? "bg-emerald-600 text-white" : "text-slate-700 bg-slate-100"
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Code with Agent</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenGemma();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-emerald-600 text-white font-medium text-sm mt-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Open Gemma AI Copilot</span>
          </button>
        </div>
      )}
    </header>
  );
}
