"use client";

import React, { useState } from "react";
import { Sparkles, X, Wand2, Users, MessageSquare, Copy, Check, Loader2, BookOpen } from "lucide-react";
import { INITIAL_COLLAB_POSTS } from "@/data/mockData";

interface GemmaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyEnhancedText?: (text: string, tags: string[]) => void;
}

export default function GemmaModal({ isOpen, onClose, onApplyEnhancedText }: GemmaModalProps) {
  const [activeTab, setActiveTab] = useState<"enhance" | "match" | "ask">("enhance");

  // Enhance state
  const [rawText, setRawText] = useState("");
  const [postType, setPostType] = useState<"event" | "project" | "collab">("event");
  const [enhancedResult, setEnhancedResult] = useState<string | null>(null);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Match state
  const [skillsInput, setSkillsInput] = useState("React, TailwindCSS, Figma");
  const [lookingForInput, setLookingForInput] = useState("Hackathon or open source project for Hacktoberfest");
  const [matchResult, setMatchResult] = useState<string | null>(null);
  const [isMatching, setIsMatching] = useState(false);

  // Ask state
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [isAsking, setIsAsking] = useState(false);

  if (!isOpen) return null;

  // 1. Call Gemma to Enhance
  const handleEnhance = async () => {
    if (!rawText.trim()) return;
    setIsEnhancing(true);
    setEnhancedResult(null);

    try {
      const res = await fetch("/api/gemma", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "enhance",
          payload: { text: rawText, type: postType },
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setEnhancedResult(data.data.enhanced);
        setSuggestedTags(data.data.suggestedTags || []);
      } else {
        setEnhancedResult("Failed to enhance. Please check the Gemma API key or connection.");
      }
    } catch (err) {
      console.error(err);
      setEnhancedResult("Network error contacting Gemma service.");
    } finally {
      setIsEnhancing(false);
    }
  };

  // 2. Call Gemma to Match Teammates
  const handleMatch = async () => {
    if (!skillsInput.trim()) return;
    setIsMatching(true);
    setMatchResult(null);

    try {
      const skillsArray = skillsInput.split(",").map((s) => s.trim()).filter(Boolean);
      const res = await fetch("/api/gemma", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "match",
          payload: {
            skills: skillsArray,
            lookingFor: lookingForInput,
            posts: INITIAL_COLLAB_POSTS.map((p) => ({
              id: p.id,
              title: p.title,
              skillsRequired: p.skillsRequired,
              campus: p.campus,
            })),
          },
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMatchResult(data.data);
      } else {
        setMatchResult("Could not process matches with Gemma right now.");
      }
    } catch (err) {
      console.error(err);
      setMatchResult("Error communicating with Gemma matcher.");
    } finally {
      setIsMatching(false);
    }
  };

  // 3. Call Gemma to Ask Copilot
  const handleAsk = async () => {
    if (!question.trim()) return;
    setIsAsking(true);
    setAnswer(null);

    try {
      const res = await fetch("/api/gemma", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "ask",
          payload: {
            question: question,
            context: "Campus Connect FUOYE: Campuses in Oye-Ekiti and Ikole-Ekiti. Active tech clubs: GDG FUOYE, NACOS, NUESA, IEEE. Currently celebrating Hacktoberfest 2026.",
          },
        }),
      });

      const data = await res.json();
      if (data.success) {
        setAnswer(data.data);
      } else {
        setAnswer("Could not reach Gemma Copilot at this moment.");
      }
    } catch (err) {
      console.error(err);
      setAnswer("Error asking Gemma.");
    } finally {
      setIsAsking(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                Gemma AI Campus Copilot
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-800">
                  Google Gemma
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                AI assistance for student events, smart matching, and writing
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-2 gap-2">
          <button
            onClick={() => setActiveTab("enhance")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition ${
              activeTab === "enhance"
                ? "border-emerald-600 text-emerald-700 bg-white rounded-t-lg"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <Wand2 className="w-4 h-4" />
            <span>Polish My Post</span>
          </button>
          <button
            onClick={() => setActiveTab("match")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition ${
              activeTab === "match"
                ? "border-emerald-600 text-emerald-700 bg-white rounded-t-lg"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Teammate Matcher</span>
          </button>
          <button
            onClick={() => setActiveTab("ask")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition ${
              activeTab === "ask"
                ? "border-emerald-600 text-emerald-700 bg-white rounded-t-lg"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Campus Q&A</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: ENHANCE */}
          {activeTab === "enhance" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Select Content Type:
                </label>
                <div className="flex gap-2">
                  {(["event", "collab", "project"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setPostType(t)}
                      className={`text-xs px-2.5 py-1 rounded-md capitalize font-medium ${
                        postType === t
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Draft or Rough Ideas:
                </label>
                <textarea
                  rows={4}
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="e.g. Hosting a React workshop next Friday in Oye ETF Hall for beginners. Need people to come with laptops."
                  className="w-full text-sm border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                />
              </div>

              <button
                onClick={handleEnhance}
                disabled={isEnhancing || !rawText.trim()}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition shadow-sm disabled:opacity-50"
              >
                {isEnhancing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Polishing with Gemma...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    <span>Enhance with Gemma AI</span>
                  </>
                )}
              </button>

              {/* Enhanced Output */}
              {enhancedResult && (
                <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      Polished by Gemma:
                    </span>
                    <button
                      onClick={() => copyToClipboard(enhancedResult)}
                      className="flex items-center gap-1 text-xs text-slate-600 hover:text-emerald-700 font-medium"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed font-sans bg-white p-3 rounded-lg border border-slate-200">
                    {enhancedResult}
                  </div>

                  {suggestedTags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-xs text-slate-500 mr-1 self-center">Tags:</span>
                      {suggestedTags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MATCH */}
          {activeTab === "match" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Skills (Comma Separated):
                </label>
                <input
                  type="text"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  placeholder="e.g. Figma, Python, Next.js, Technical Writing"
                  className="w-full text-sm border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  What kind of project or role are you looking for?
                </label>
                <input
                  type="text"
                  value={lookingForInput}
                  onChange={(e) => setLookingForInput(e.target.value)}
                  placeholder="e.g. Hacktoberfest team, Final Year IoT project, Study partner"
                  className="w-full text-sm border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                onClick={handleMatch}
                disabled={isMatching || !skillsInput.trim()}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition shadow-sm disabled:opacity-50"
              >
                {isMatching ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing active posts with Gemma...</span>
                  </>
                ) : (
                  <>
                    <Users className="w-4 h-4" />
                    <span>Find Complementary Teammates</span>
                  </>
                )}
              </button>

              {matchResult && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-2">
                    🎯 Gemma Match Recommendations:
                  </span>
                  <div className="text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed bg-white p-3.5 rounded-lg border border-slate-200">
                    {matchResult}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CAMPUS Q&A */}
          {activeTab === "ask" && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600 bg-emerald-50 p-3 rounded-xl border border-emerald-100 flex items-start gap-2">
                <BookOpen className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  Ask Gemma anything about FUOYE student tech communities, how Hacktoberfest works, or tips for collaborating across Oye and Ikole campuses.
                </span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAsk()}
                  placeholder="e.g. What tech clubs exist in FUOYE and how do I join?"
                  className="flex-1 text-sm border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  onClick={handleAsk}
                  disabled={isAsking || !question.trim()}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition shadow-sm disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isAsking ? <Loader2 className="w-4 h-4 animate-spin" /> : <MessageSquare className="w-4 h-4" />}
                  <span>Ask</span>
                </button>
              </div>

              {answer && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-2">
                    Gemma Copilot Response:
                  </span>
                  <div className="text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed bg-white p-3.5 rounded-lg border border-slate-200">
                    {answer}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

