"use client";

import React, { useState, useRef, useEffect } from "react";
import Sticker from "@/components/brand/Sticker";
import { Sparkles, Send, X, Bot, User, Loader2, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Message {
  role: "user" | "gemma";
  content: string;
  time: string;
}

export default function GemmaAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputPrompt, setInputPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "gemma",
      content:
        "⚡ **Hey FUOYE Konnector!** I'm **Gemma**, your campus AI copilot. Ask me to recommend hackathon teammates, find upcoming campus events in Oye & Ikole, or polish your project ideas!",
      time: "Just now",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = customText || inputPrompt;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: textToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputPrompt("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/gemma", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: textToSend.trim() }),
      });

      const data = await res.json();
      const aiReply =
        data.response || data.fallback || "Gemma is online and ready for campus collaboration.";

      setMessages((prev) => [
        ...prev,
        {
          role: "gemma",
          content: aiReply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "gemma",
          content:
            "⚡ **Gemma Copilot**: I'm here! Explore the **/events** and **/projects** tabs to connect with students across Oye and Ikole.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    "Match me with a hackathon team 🚀",
    "What events are happening in Oye & Ikole? ⚡",
    "How do I submit my project to Kampus Konnect?",
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <aside aria-label="Gemma AI Assistant Floating Action" className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[var(--color-purple)] hover:bg-purple-900 text-white font-heading font-black text-xs uppercase tracking-wider border-3 border-[var(--color-ink)] shadow-sticker hover:shadow-sticker-lg active:scale-95 transition-all"
          aria-label={isOpen ? "Close Gemma AI Chat" : "Open Gemma AI Chat"}
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-yellow)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-yellow)]"></span>
          </span>
          <Sparkles className="w-4 h-4 text-[var(--color-yellow)] group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">ASK GEMMA AI</span>
          <span className="sm:hidden">GEMMA</span>
        </button>
      </aside>

      {/* Slide-Up Chat Window */}
      {isOpen && (
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="gemma-dialog-title"
          className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[85vh] h-[550px] bg-[var(--color-warm-white)] rounded-panel border-4 border-[var(--color-ink)] shadow-sticker-xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="bg-[var(--color-purple)] text-white p-4 border-b-3 border-[var(--color-ink)] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[var(--color-yellow)] text-[var(--color-ink)] flex items-center justify-center font-display text-sm border-2 border-[var(--color-ink)] shadow-sticker-sm">
                ⚡
              </div>
              <div>
                <h3 id="gemma-dialog-title" className="font-heading font-black text-sm uppercase tracking-wide flex items-center gap-1.5 text-white">
                  <span>GEMMA COPILOT</span>
                  <span className="text-[10px] font-meta px-1.5 py-0.2 rounded bg-[var(--color-green)] text-white border border-[var(--color-ink)]">
                    ONLINE
                  </span>
                </h3>
                <p className="text-[11px] font-meta text-[var(--color-yellow)]">
                  FUOYE AI Student Community Mentor
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
              aria-label="Close Gemma Assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FCFAF6]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "gemma" && (
                  <div className="w-6 h-6 rounded-full bg-[var(--color-purple)] text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-1">
                    G
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[var(--color-purple)] text-white rounded-tr-none border-2 border-[var(--color-ink)] shadow-sticker-sm font-body"
                      : "bg-white text-[var(--color-ink)] rounded-tl-none border-2 border-[var(--color-ink)] shadow-sticker-sm font-body"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                  <span
                    className={`block text-[9px] mt-1 text-right font-meta ${
                      msg.role === "user" ? "text-purple-200" : "text-slate-400"
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>

                {msg.role === "user" && (
                  <div className="w-6 h-6 rounded-full bg-[var(--color-yellow)] text-[var(--color-ink)] flex items-center justify-center text-[11px] font-black shrink-0 mt-1 border border-[var(--color-ink)]">
                    U
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-500 font-meta p-2 bg-white rounded-lg border border-[var(--color-ink)]/10 w-fit">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[var(--color-purple)]" />
                <span>Gemma is thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-amber-50/70 border-t border-[var(--color-ink)]/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((qp, i) => (
              <button
                key={i}
                onClick={() => handleSend(undefined, qp)}
                disabled={isLoading}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white hover:bg-[var(--color-yellow)] text-[var(--color-ink)] text-[10px] font-heading font-extrabold uppercase border border-[var(--color-ink)] shadow-sticker-sm transition"
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t-2 border-[var(--color-ink)] flex items-center gap-2">
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ask Gemma about events, teams, skills..."
              disabled={isLoading}
              className="flex-1 px-3 py-2 text-xs font-body bg-[var(--color-warm-white)] rounded-ui border-2 border-[var(--color-ink)] focus:outline-none focus:ring-1 focus:ring-[var(--color-purple)]"
            />
            <button
              type="submit"
              disabled={isLoading || !inputPrompt.trim()}
              className="p-2.5 rounded-ui bg-[var(--color-yellow)] hover:bg-amber-300 disabled:opacity-50 text-[var(--color-ink)] border-2 border-[var(--color-ink)] shadow-sticker-sm transition"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </section>
      )}
    </>
  );
}
