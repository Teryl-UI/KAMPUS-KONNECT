"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EventsSection from "@/components/EventsSection";
import TeammateSection from "@/components/TeammateSection";
import ProjectSection from "@/components/ProjectSection";
import CodeAgentSection from "@/components/CodeAgentSection";
import GemmaModal from "@/components/GemmaModal";
import Footer from "@/components/Footer";
import { Sparkles } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"events" | "collab" | "projects" | "agent">("events");
  const [isGemmaOpen, setIsGemmaOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenGemma={() => setIsGemmaOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenGemma={() => setIsGemmaOpen(true)}
          onExploreEvents={() => setActiveTab("events")}
          onFindTeammates={() => setActiveTab("collab")}
        />

        {/* Tabbed Content Sections */}
        {activeTab === "events" && <EventsSection onOpenGemma={() => setIsGemmaOpen(true)} />}
        {activeTab === "collab" && <TeammateSection onOpenGemma={() => setIsGemmaOpen(true)} />}
        {activeTab === "projects" && <ProjectSection onOpenGemma={() => setIsGemmaOpen(true)} />}
        {activeTab === "agent" && <CodeAgentSection />}
      </main>

      {/* Gemma AI Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsGemmaOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-sm shadow-xl shadow-emerald-700/30 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span className="hidden sm:inline">Ask Gemma AI</span>
          <span className="sm:hidden">Gemma</span>
        </button>
      </div>

      {/* Gemma AI Copilot Modal */}
      <GemmaModal
        isOpen={isGemmaOpen}
        onClose={() => setIsGemmaOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
