import React from "react";
import Link from "next/link";
import { Calendar, Users, Code, ArrowRight, Sparkles, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { CAMPUS_EVENTS, STUDENT_PROJECTS } from "@/data/mockData";

export default function HomePage() {
  const featuredEvents = CAMPUS_EVENTS.filter((e) => e.featured).slice(0, 3);
  const featuredProjects = STUDENT_PROJECTS.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-slate-50 to-white pt-12 pb-20 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Campus Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" aria-hidden="true" />
              Federal University Oye-Ekiti • Open-Source Student Hub
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Discover Campus Events. Find Project Partners.{" "}
              <span className="text-emerald-700">
                Build Together at FUOYE.
              </span>
            </h1>

            {/* Introduction */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Campus Connect bridges the gap between <strong>Oye Main Campus</strong> and{" "}
              <strong>Ikole Campus</strong>. Discover student-led workshops, join hackathon teams, and showcase your software, hardware, and research projects to the university community.
            </p>

            {/* Primary & Secondary Call to Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/events"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-md shadow-emerald-700/20 transition focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
              >
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <span>Explore Campus Events</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/teammates"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-800 hover:bg-slate-50 font-semibold text-sm border border-slate-300 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
              >
                <Users className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                <span>Find Project Teammates</span>
              </Link>
            </div>

            {/* Campus Quick Facts */}
            <div className="grid grid-cols-3 gap-4 pt-8 max-w-lg mx-auto border-t border-slate-200 text-center">
              <div>
                <p className="text-2xl font-extrabold text-slate-900">2 Campuses</p>
                <p className="text-xs text-slate-500 font-medium">Oye & Ikole</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-emerald-700">Multi-Faculty</p>
                <p className="text-xs text-slate-500 font-medium">Engineering, Science & Arts</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-900">100% Free</p>
                <p className="text-xs text-slate-500 font-medium">Open-Source Community</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PLATFORM PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Built for FUOYE Students by FUOYE Students
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            A centralized platform tackling the unique collaboration challenges across our campuses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-300 hover:shadow-md transition space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Calendar className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Discover Campus Events</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Find technical workshops, departmental career symposiums, and sports fixtures across Oye and Ikole campuses. Filter by faculty and RSVP directly.
            </p>
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline pt-2"
            >
              <span>Browse all events</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-300 hover:shadow-md transition space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Find Project Teammates</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Need a UI/UX designer for a hackathon or a hardware partner in Ikole for your final-year research? Browse student listings and connect with one click.
            </p>
            <Link
              href="/teammates"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline pt-2"
            >
              <span>Find collaboration requests</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-300 hover:shadow-md transition space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Code className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Showcase Student Innovation</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Share your software tools, IoT prototypes, and academic research with peers. Explore open roles and contribute to student-led projects.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline pt-2"
            >
              <span>Explore student projects</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CAMPUS EVENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Upcoming on Campus</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Featured Campus Events
            </h2>
          </div>
          <Link
            href="/events"
            className="self-start sm:self-auto inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
          >
            <span>View all {CAMPUS_EVENTS.length} events</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100">
                    {event.campus}
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {event.category}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {event.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {event.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
                    <span>{event.venue}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Organized by <strong>{event.organizer}</strong>
                </span>
                <Link
                  href="/events"
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PROJECTS WITH CONTRIBUTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
              <Code className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Student Inventions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Featured Projects Open for Collaboration
            </h2>
          </div>
          <Link
            href="/projects"
            className="self-start sm:self-auto inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
          >
            <span>Explore all projects</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100">
                    {project.campus}
                  </span>
                  {project.lookingForContributors && (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                      Seeking Teammates
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-emerald-700 font-medium mt-0.5">
                    {project.tagline}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {project.openRoles.length} open {project.openRoles.length === 1 ? "role" : "roles"}
                </span>
                <Link
                  href={`/projects/${project.id}`}
                  className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition"
                >
                  View Details & Roles
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to collaborate with fellow FUOYE innovators?
            </h2>
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
              Whether you are coding an app, building IoT circuits in Ikole, designing wireframes, or organizing departmental seminars, Campus Connect is your platform.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/teammates"
              className="px-6 py-3 rounded-xl bg-white text-emerald-800 font-bold text-sm hover:bg-emerald-50 transition shadow-sm"
            >
              Browse Teammate Listings
            </Link>
            <Link
              href="/projects"
              className="px-6 py-3 rounded-xl bg-emerald-900/60 hover:bg-emerald-900 text-white font-semibold text-sm border border-emerald-500/40 transition"
            >
              Explore Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
