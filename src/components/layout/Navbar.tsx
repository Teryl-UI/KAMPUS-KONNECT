"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/brand/Logo";
import Sticker from "@/components/brand/Sticker";
import { Menu, X, Sparkles, MessageCircle, Calendar, Code, Users, ArrowUpRight, CheckCircle2, Info, AlertCircle } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinSuccess, setJoinSuccess] = useState<string | null>(null);
  const [joinName, setJoinName] = useState("");
  const [joinCampus, setJoinCampus] = useState("Oye (Main Campus)");
  const [joinFaculty, setJoinFaculty] = useState("Science");
  const [joinError, setJoinError] = useState("");

  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home", shortLabel: "Home", emoji: null },
    { href: "/ai", label: "Konnect AI", shortLabel: "AI Copilot", emoji: "✨", badge: "GEMMA" },
    { href: "/gists", label: "Campus Gists", shortLabel: "Gists", emoji: "💬", badge: "HOT" },
    { href: "/events", label: "Events", shortLabel: "Events", emoji: "⚡" },
    { href: "/projects", label: "Projects", shortLabel: "Projects", emoji: "🚀" },
    { href: "/teammates", label: "Find People", shortLabel: "People", emoji: "🔌" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Close mobile drawer on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinName.trim()) {
      setJoinError("Please enter your name or campus handle.");
      return;
    }
    setJoinError("");
    const refCode = `KK-MEM-${Math.floor(1000 + Math.random() * 9000)}`;
    setJoinSuccess(refCode);
  };

  const closeJoinModal = () => {
    setShowJoinModal(false);
    setJoinSuccess(null);
    setJoinName("");
    setJoinError("");
  };

  // Keyboard navigation: Escape closes modal or mobile menu
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showJoinModal) closeJoinModal();
        if (mobileMenuOpen) setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showJoinModal, mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[var(--color-warm-white)]/95 backdrop-blur-md border-b-2 border-[var(--color-ink)] shadow-sticker-sm transition-all w-full select-none">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 flex-nowrap w-full gap-2 sm:gap-4">
            {/* Wordmark Logo */}
            <Logo size="md" withTagline={true} />

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center gap-1 xl:gap-2 bg-white py-1.5 px-2 xl:px-3 rounded-2xl border-2 border-[var(--color-ink)] shadow-sticker shrink-0 flex-nowrap whitespace-nowrap"
              aria-label="Main Navigation"
            >
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative inline-flex items-center gap-1 xl:gap-1.5 px-2.5 xl:px-3.5 py-1.5 xl:py-2 rounded-xl text-[11px] xl:text-xs font-heading font-extrabold tracking-wide uppercase transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[var(--color-purple)] shrink-0 whitespace-nowrap ${
                      active
                        ? "bg-[var(--color-purple)] text-white shadow-sticker-sm -translate-y-0.5"
                        : "text-[var(--color-ink)] hover:bg-[var(--color-lavender)] hover:text-[var(--color-purple)]"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.emoji && <span className="text-xs xl:text-sm shrink-0">{link.emoji}</span>}
                    <span className="shrink-0 whitespace-nowrap lg:hidden xl:inline">{link.label}</span>
                    <span className="shrink-0 whitespace-nowrap hidden lg:inline xl:hidden">{link.shortLabel || link.label}</span>
                    {link.badge && (
                      <span className="text-[9px] font-display px-1.5 py-0.5 rounded-full bg-[var(--color-red)] text-white tracking-wider animate-pulse shrink-0 whitespace-nowrap">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Primary Action Button: Join / Link Up */}
            <div className="hidden lg:flex items-center shrink-0 whitespace-nowrap">
              <button
                onClick={() => setShowJoinModal(true)}
                className="relative group overflow-hidden px-3.5 xl:px-5 py-2 xl:py-2.5 rounded-ui bg-[var(--color-yellow)] hover:bg-amber-300 text-[var(--color-ink)] font-heading font-black text-xs xl:text-sm uppercase tracking-wider border-2 border-[var(--color-ink)] shadow-sticker hover:shadow-sticker-lg active:translate-x-0.5 active:translate-y-0.5 transition-all shrink-0 whitespace-nowrap"
              >
                <span className="inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap">
                  <span>JOIN SQUAD</span>
                  <span className="group-hover:rotate-45 transition-transform shrink-0">⚡</span>
                </span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex lg:hidden items-center gap-2 shrink-0 whitespace-nowrap">
              <button
                onClick={() => setShowJoinModal(true)}
                className="px-3 py-1.5 rounded-lg bg-[var(--color-yellow)] text-[var(--color-ink)] border-2 border-[var(--color-ink)] font-heading font-black text-xs shadow-sticker-sm shrink-0 whitespace-nowrap active:translate-y-0.5"
              >
                JOIN
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-white border-2 border-[var(--color-ink)] text-[var(--color-ink)] shadow-sticker-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-purple)] shrink-0"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav
            className="lg:hidden border-t-2 border-[var(--color-ink)] bg-[var(--color-warm-white)] px-5 pt-4 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top-2"
            aria-label="Mobile Navigation"
          >
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 font-heading font-bold text-sm uppercase tracking-wider transition ${
                    active
                      ? "bg-[var(--color-purple)] text-white border-[var(--color-ink)] shadow-sticker"
                      : "bg-white text-[var(--color-ink)] border-[var(--color-ink)] hover:bg-[var(--color-lavender)]"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <span className="flex items-center gap-2.5">
                    {link.emoji && <span>{link.emoji}</span>}
                    <span>{link.label}</span>
                  </span>
                  {link.badge ? (
                    <span className="text-[10px] font-display px-2 py-0.5 rounded-full bg-[var(--color-red)] text-white">
                      {link.badge}
                    </span>
                  ) : (
                    <span className="text-xs opacity-50">→</span>
                  )}
                </Link>
              );
            })}

            <div className="pt-3 border-t-2 border-[var(--color-ink)]/10 mt-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowJoinModal(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[var(--color-red)] text-white font-heading font-black text-sm uppercase tracking-wider border-2 border-[var(--color-ink)] shadow-sticker"
              >
                <span>BECOME A KONNECTOR 🚀</span>
              </button>
            </div>
          </nav>
        )}
      </header>

      {/* Join Community Modal with Validated State */}
      {showJoinModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="join-modal-title"
          onClick={closeJoinModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-ink)]/70 backdrop-blur-sm animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[var(--color-warm-white)] rounded-panel border-4 border-[var(--color-ink)] shadow-sticker-xl max-w-md w-full p-6 sm:p-8 space-y-5 relative overflow-hidden"
          >
            {/* Corner Decorative bar */}
            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[var(--color-yellow)] via-[var(--color-red)] via-[var(--color-purple)] to-[var(--color-green)]" />

            <div className="flex items-start justify-between pt-1">
              <div className="space-y-1">
                <Sticker variant="yellow" rotate="left" emoji="⚡">
                  STUDENT SQUAD
                </Sticker>
                <h2 id="join-modal-title" className="text-2xl font-display uppercase tracking-tight text-[var(--color-ink)] pt-2">
                  Join Kampus Konnect
                </h2>
              </div>
              <button
                onClick={closeJoinModal}
                className="p-2 rounded-xl bg-white border-2 border-[var(--color-ink)] text-[var(--color-ink)] shadow-sticker-sm hover:bg-[var(--color-lavender)]"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {joinSuccess ? (
              <div className="p-5 rounded-card bg-[var(--color-soft-green)] border-2 border-[var(--color-green)] text-[var(--color-ink)] space-y-3">
                <div className="flex items-center gap-2 text-[var(--color-success)] font-heading font-black text-base uppercase">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Squad Membership Activated!</span>
                </div>
                <p className="font-body text-xs text-slate-800 leading-relaxed">
                  Welcome aboard, <strong>{joinName}</strong>! Your demo student profile for <strong>{joinCampus} ({joinFaculty})</strong> is active in this session.
                </p>
                <div className="p-3 rounded-lg bg-white border border-[var(--color-ink)]/15 font-meta text-xs">
                  <span><strong>Demo Membership ID:</strong> {joinSuccess}</span>
                </div>
                <button
                  onClick={closeJoinModal}
                  className="w-full py-2.5 rounded-ui bg-[var(--color-purple)] text-white font-heading font-black text-xs uppercase border-2 border-[var(--color-ink)] shadow-sticker"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              <>
                <p className="text-sm font-body text-slate-700 leading-relaxed">
                  Connect with 1,200+ students across FUOYE Oye & Ikole campuses. Share gists, find hackathon teammates, and get notified about student opportunities.
                </p>

                <form onSubmit={handleJoinSubmit} className="space-y-3.5 pt-1">
                  <div>
                    <label className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                      Full Name / Campus Handle (Demo) *
                    </label>
                    <input
                      type="text"
                      value={joinName}
                      onChange={(e) => {
                        setJoinName(e.target.value);
                        if (joinError) setJoinError("");
                      }}
                      placeholder="e.g. Alex Adebayo"
                      className={`w-full px-3.5 py-2.5 rounded-ui border-2 text-sm font-body bg-white focus:outline-none shadow-sticker-sm ${
                        joinError ? "border-red-600 bg-red-50" : "border-[var(--color-ink)]"
                      }`}
                    />
                    {joinError && (
                      <p className="text-[11px] font-bold text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {joinError}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                        Campus:
                      </label>
                      <select
                        value={joinCampus}
                        onChange={(e) => setJoinCampus(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-ui border-2 border-[var(--color-ink)] bg-white text-xs font-body focus:outline-none shadow-sticker-sm"
                      >
                        <option>Oye (Main Campus)</option>
                        <option>Ikole Campus</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                        Faculty:
                      </label>
                      <select
                        value={joinFaculty}
                        onChange={(e) => setJoinFaculty(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-ui border-2 border-[var(--color-ink)] bg-white text-xs font-body focus:outline-none shadow-sticker-sm"
                      >
                        <option>Science</option>
                        <option>Engineering</option>
                        <option>Social Sciences</option>
                        <option>Arts</option>
                        <option>Agriculture</option>
                        <option>Management</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-ui bg-amber-50 border border-amber-200 text-amber-900 text-[11px] flex items-center gap-2">
                    <Info className="w-3.5 h-3.5 shrink-0 text-amber-700" />
                    <span>Demo Mode: No personal records are stored on a server.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-ui bg-[var(--color-green)] text-white font-heading font-black text-sm uppercase tracking-wider border-2 border-[var(--color-ink)] shadow-sticker hover:shadow-sticker-lg active:translate-x-0.5 active:translate-y-0.5 transition"
                  >
                    JOIN THE KONNECT NOW 🔥
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
