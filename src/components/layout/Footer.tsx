import React from "react";
import Link from "next/link";
import BarcodeTrim from "@/components/brand/BarcodeTrim";
import Logo from "@/components/brand/Logo";
import Sticker from "@/components/brand/Sticker";
import { Sparkles, MapPin, Heart, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-white border-t-4 border-[var(--color-ink)] mt-24 relative overflow-hidden select-none">
      {/* Top Barcode Ribbon */}
      <BarcodeTrim height="h-3" className="opacity-70 bg-white" />

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Column (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-white p-3 rounded-2xl inline-block border-2 border-[var(--color-ink)] shadow-sticker">
              <Logo size="md" withTagline={true} />
            </div>

            <p className="text-sm font-body text-slate-300 max-w-sm leading-relaxed">
              The bold, expressive community network for university students. Discover activities, link up with creators, share semester builds, and thrive together across Oye & Ikole.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Sticker variant="yellow" withBrackets={false} emoji="🔥">
                KAMPUS KONNECT
              </Sticker>
              <Sticker variant="green" withBrackets={false} emoji="⚡">
                FUOYE STUDENT NETWORK
              </Sticker>
            </div>
          </div>

          {/* Nav Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-meta font-extrabold text-xs uppercase tracking-widest text-[var(--color-yellow)] block">
              ✦ EXPLORE PLATFORM
            </span>
            <ul className="space-y-2.5 font-heading font-bold text-sm uppercase tracking-wide">
              <li>
                <Link href="/" className="hover:text-[var(--color-yellow)] transition flex items-center gap-1.5">
                  <span>Home Hub</span>
                </Link>
              </li>
              <li>
                <Link href="/gists" className="hover:text-[var(--color-yellow)] transition flex items-center gap-1.5">
                  <span>Campus Gists</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[var(--color-red)] text-white">HOT</span>
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[var(--color-yellow)] transition flex items-center gap-1.5">
                  <span>Campus Events</span>
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[var(--color-yellow)] transition flex items-center gap-1.5">
                  <span>Student Projects</span>
                </Link>
              </li>
              <li>
                <Link href="/teammates" className="hover:text-[var(--color-yellow)] transition flex items-center gap-1.5">
                  <span>Find People</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Campuses & Coordinates (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-meta font-extrabold text-xs uppercase tracking-widest text-[var(--color-yellow)] block">
              ✦ CAMPUS HUBS
            </span>

            <div className="p-4 rounded-card bg-[var(--color-purple)]/60 border-2 border-white/20 space-y-3 text-xs font-body">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[var(--color-yellow)] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-heading uppercase tracking-wide text-xs">
                    Oye Main Campus
                  </strong>
                  <span className="text-slate-300">
                    Faculty of Science, Arts, Social Sciences, Management, Education, Pharmacy
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-white/10">
                <MapPin className="w-4 h-4 text-[var(--color-green)] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-heading uppercase tracking-wide text-xs">
                    Ikole Engineering & Agri Campus
                  </strong>
                  <span className="text-slate-300">
                    Faculty of Engineering & Faculty of Agriculture, Ikole-Ekiti
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Big Tagline Banner */}
        <div className="mt-12 pt-8 border-t-2 border-white/15 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="font-display text-xl sm:text-2xl text-[var(--color-yellow)] tracking-wider">
            CONNECT . COLLABORATE . THRIVE.
          </div>
          <div className="font-meta text-xs text-slate-400">
            Open-source community project built with{" "}
            <span className="text-[var(--color-red)]">♥</span> for FUOYE students.
          </div>
        </div>
      </div>

      {/* Bottom Barcode Ribbon */}
      <BarcodeTrim height="h-3" className="opacity-70 bg-white" />
    </footer>
  );
}
