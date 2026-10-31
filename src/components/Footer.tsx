"use client";

import React from "react";
import { Github, Heart, Sparkles, Code, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-base">
                CC
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                Campus Connect FUOYE
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              An open-source collaboration ecosystem for Federal University Oye-Ekiti students.
              Connecting Oye & Ikole campuses for events, hackathons, and project teams.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold pt-1">
              <Sparkles className="w-4 h-4" />
              <span>Built for Hacktoberfest with Google Gemma AI</span>
            </div>
          </div>

          {/* Campuses & Faculties */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Campuses Covered
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Oye Main Campus (Science, Arts, Social Sci)</li>
              <li>Ikole Campus (Engineering & Agriculture)</li>
              <li>FUOYE GDG & NACOS Student Clubs</li>
              <li>Virtual & Inter-Faculty Hackathons</li>
            </ul>
          </div>

          {/* Open Source */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Contribute
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#github" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <a href="#contributing" className="hover:text-emerald-400 transition">
                  Contributing Guidelines
                </a>
              </li>
              <li>
                <a href="#hacktoberfest" className="hover:text-emerald-400 transition">
                  Hacktoberfest 2026 Issues
                </a>
              </li>
              <li>
                <a href="#license" className="hover:text-emerald-400 transition">
                  MIT License
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 FUOYE Campus Connect. Open source under the MIT License.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> by FUOYE student contributors.
          </p>
        </div>
      </div>
    </footer>
  );
}

