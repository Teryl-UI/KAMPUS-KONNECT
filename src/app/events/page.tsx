"use client";

import React, { useState, useMemo } from "react";
import Sticker from "@/components/brand/Sticker";
import { CAMPUS_EVENTS, CampusEvent } from "@/data/mockData";
import { Calendar, Search, MapPin, Clock, Users, Check, X, Sparkles, Filter, ArrowUpRight } from "lucide-react";

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCampus, setSelectedCampus] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [rsvpState, setRsvpState] = useState<Record<string, boolean>>({});

  const campusOptions = ["All", "Oye (Main)", "Ikole", "Virtual"];
  const categoryOptions = ["All", "Tech", "Academic", "Career", "Social", "Sports"];

  const toggleRsvp = (eventId: string) => {
    setRsvpState((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCampus("All");
    setSelectedCategory("All");
  };

  const filteredEvents = useMemo(() => {
    return CAMPUS_EVENTS.filter((event) => {
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.organizer.toLowerCase().includes(query) ||
        event.venue.toLowerCase().includes(query) ||
        event.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesCampus =
        selectedCampus === "All" || event.campus.toLowerCase().includes(selectedCampus.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || event.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCampus && matchesCategory;
    });
  }, [searchQuery, selectedCampus, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-4 border-[var(--color-ink)] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sticker variant="green" rotate="left" emoji="⚡">
              EVENT UPDATES
            </Sticker>
            <span className="text-xs font-meta font-extrabold uppercase text-[var(--color-purple)]">
              OYE & IKOLE SCENE
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-[var(--color-ink)]">
            Campus Events & Activities
          </h1>
          <p className="font-body text-sm sm:text-base text-slate-700 max-w-xl mt-1">
            Discover hackathons, departmental symposiums, design sprints, and sports games across both campuses.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <section className="bg-white p-5 rounded-card border-2 border-[var(--color-ink)] shadow-sticker space-y-4">
        {/* Search */}
        <div className="relative">
          <label htmlFor="event-search" className="sr-only">
            Search events
          </label>
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            id="event-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by event title, organizer (e.g. GDG, NACOS), tags, or venue..."
            className="w-full pl-10 pr-4 py-2.5 text-sm border-2 border-[var(--color-ink)] rounded-ui bg-[var(--color-warm-white)] font-body focus:outline-none focus:ring-2 focus:ring-[var(--color-purple)] shadow-sticker-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
          {/* Campus Selector */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-meta font-extrabold uppercase text-slate-500 mr-1">
              Campus:
            </span>
            {campusOptions.map((campus) => (
              <button
                key={campus}
                onClick={() => setSelectedCampus(campus)}
                className={`px-3 py-1.5 rounded-xl text-xs font-heading font-extrabold uppercase border-2 border-[var(--color-ink)] shadow-sticker-sm transition ${
                  selectedCampus === campus
                    ? "bg-[var(--color-purple)] text-white"
                    : "bg-white text-[var(--color-ink)] hover:bg-[var(--color-lavender)]"
                }`}
              >
                {campus === "All" ? "All Campuses" : `${campus} Campus`}
              </button>
            ))}
          </div>

          {/* Category Selector */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-meta font-extrabold uppercase text-slate-500 mr-1">
              Category:
            </span>
            {categoryOptions.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-full text-xs font-heading font-bold uppercase transition border border-[var(--color-ink)] ${
                  selectedCategory === cat
                    ? "bg-[var(--color-yellow)] text-[var(--color-ink)] font-black shadow-sticker-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs font-meta text-slate-600 px-1">
        <span>
          Showing <strong>{filteredEvents.length}</strong> {filteredEvents.length === 1 ? "event" : "events"}
          {(selectedCampus !== "All" || selectedCategory !== "All" || searchQuery) && (
            <span> (filtered)</span>
          )}
        </span>
        {(selectedCampus !== "All" || selectedCategory !== "All" || searchQuery) && (
          <button
            onClick={resetFilters}
            className="text-[var(--color-purple)] hover:underline font-extrabold uppercase"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Events Grid or Empty State */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-card border-2 border-dashed border-[var(--color-ink)] p-8 space-y-4">
          <div className="text-4xl">⚡</div>
          <div className="space-y-1">
            <h3 className="font-heading font-black text-xl text-[var(--color-ink)]">
              No campus events found matching your search
            </h3>
            <p className="font-body text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Try adjusting your keyword or selecting &quot;All Campuses&quot;.
            </p>
          </div>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-ui bg-[var(--color-yellow)] text-[var(--color-ink)] font-heading font-black text-xs uppercase border-2 border-[var(--color-ink)] shadow-sticker"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((event) => {
            const isAttending = !!rsvpState[event.id];
            const currentAttendees = event.attendeesCount + (isAttending ? 1 : 0);

            return (
              <article
                key={event.id}
                className="bg-white rounded-card p-6 border-2 border-[var(--color-ink)] shadow-sticker hover:shadow-sticker-lg transition flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3.5">
                  {/* Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-meta font-extrabold text-xs px-2.5 py-0.5 rounded-full bg-[var(--color-yellow)] text-[var(--color-ink)] border border-[var(--color-ink)]">
                      {event.campus}
                    </span>
                    <span className="font-heading font-bold text-xs uppercase px-2 py-0.5 rounded bg-[var(--color-lavender)] text-[var(--color-purple)]">
                      {event.category}
                    </span>
                  </div>

                  {/* Title & Organizer */}
                  <div>
                    <h2 className="font-heading font-black text-xl text-[var(--color-ink)] leading-snug">
                      {event.title}
                    </h2>
                    <p className="text-xs font-meta text-slate-600 mt-1">
                      By <strong className="text-[var(--color-purple)]">{event.organizer}</strong> • {event.faculty}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="font-body text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Date, Time, Venue */}
                  <div className="space-y-2 pt-2 border-t-2 border-[var(--color-ink)]/10 text-xs font-meta text-slate-700">
                    <div className="flex items-center gap-2 font-bold text-[var(--color-purple)]">
                      <Clock className="w-4 h-4 text-[var(--color-purple)] shrink-0" />
                      <span>{event.date} • {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[var(--color-red)] shrink-0" />
                      <span>{event.venue}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {event.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-meta px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer RSVP */}
                <div className="pt-4 border-t-2 border-[var(--color-ink)]/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-meta font-bold text-slate-600">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span>{currentAttendees} students going</span>
                  </div>

                  <button
                    onClick={() => toggleRsvp(event.id)}
                    className={`px-4 py-2 rounded-ui text-xs font-heading font-black uppercase border-2 border-[var(--color-ink)] shadow-sticker-sm transition ${
                      isAttending
                        ? "bg-[var(--color-green)] text-white"
                        : "bg-[var(--color-yellow)] hover:bg-amber-300 text-[var(--color-ink)]"
                    }`}
                  >
                    {isAttending ? (
                      <span className="flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Attending
                      </span>
                    ) : (
                      <span>RSVP SPOT ⚡</span>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
