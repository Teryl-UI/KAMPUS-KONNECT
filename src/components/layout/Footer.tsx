import React from "react";
import Link from "next/link";
import { MapPin, ExternalLink, Heart, Globe, Calendar, Users, Code } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-extrabold text-base">
                CC
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                Campus Connect FUOYE
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              An open-source university collaboration platform built for students of the Federal University Oye-Ekiti. Uniting innovators across Oye Main Campus and Ikole Campus to share events, discover projects, and find hackathon teammates.
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-emerald-400 font-medium pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Open-Source Student Initiative • Federal University Oye-Ekiti</span>
            </div>
          </div>

          {/* Platform Navigation */}
          <div>
            <h2 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Explore Platform
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>Campus Events</span>
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-slate-500" />
                  <span>Student Projects</span>
                </Link>
              </li>
              <li>
                <Link href="/teammates" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  <span>Find Teammates</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* FUOYE Campuses */}
          <div>
            <h2 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              FUOYE Campuses
            </h2>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200 block">Oye Main Campus</strong>
                  Km 3, Ado-Oye Road, Oye-Ekiti, Ekiti State
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200 block">Ikole Campus</strong>
                  Faculties of Engineering & Agriculture, Ikole-Ekiti
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Disclaimers */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Campus Connect. Open-source student project.
          </p>
          <p className="flex items-center gap-1.5 text-center">
            Designed with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" aria-label="love" /> for the FUOYE student community.
          </p>
        </div>
      </div>
    </footer>
  );
}

