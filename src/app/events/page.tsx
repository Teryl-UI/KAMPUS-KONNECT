"use client";

import React, { useState, useMemo } from "react";
import { Calendar, Search, Filter, MapPin, Clock, Users, Check, X, Tag } from "lucide-react";
import { CAMPUS_EVENTS, CampusEvent } from "@/data/mockData";

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCampus, setSelectedCampus] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [rsvpState, setRsvpState] = useState<Record<string, boolean>>({});

  const campusOptions = ["All", "Oye (Main)", "Ikole", "Virtual"];
  const categoryOptions = ["All", "Tech", "Academic", "Career", "Social", "Sports"];

  // Toggle RSVP
  const toggleRsvp = (eventId: string) => {
    setRsvpState((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCampus("All");
    setSelectedCategory("All");
  };

  // Working search and multi-criteria filter
  const filteredEvents = useMemo(() => {
    return CAMPUS_EVENTS.filter((event) => {
      // 1. Search Query
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.organizer.toLowerCase().includes(query) ||
        event.venue.toLowerCase().includes(query) ||
        event.tags.some((tag) => tag.toLowerCase().includes(query));

      // 2. Campus filter
      const matchesCampus =
        selectedCampus === "All" || event.campus.toLowerCase().includes(selectedCampus.toLowerCase());

      // 3. Category filter
      const matchesCategory =
        selectedCategory === "All" || event.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCampus && matchesCategory;
    });
  }, [searchQuery, selectedCampus, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
          <Calendar className="w-4 h-4" aria-hidden="true" />
          <span>Campus Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          FUOYE Campus Events & Workshops
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
          Discover hackathons, guest lectures, career fairs, and student union gatherings across both Oye Main Campus and Ikole Engineering/Agriculture Campus.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <section aria-label="Event search and filters" className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        {/* Search Input */}
        <div className="relative">
          <label htmlFor="event-search" className="sr-only">
            Search campus events
          </label>
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" aria-hidden="true" />
          <input
            id="event-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by event title, organizer (e.g., GDG, NACOS), tags, or venue..."
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-800 placeholder-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 p-0.5"
              aria-label="Clear search text"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Rows */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
          {/* Campus Selector */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
              Campus:
            </span>
            {campusOptions.map((campus) => (
              <button
                key={campus}
                onClick={() => setSelectedCampus(campus)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                  selectedCampus === campus
                    ? "bg-emerald-700 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {campus === "All" ? "All Campuses" : `${campus} Campus`}
              </button>
            ))}
          </div>

          {/* Category Selector */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
              Category:
            </span>
            {categoryOptions.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong>{filteredEvents.length}</strong> {filteredEvents.length === 1 ? "event" : "events"}
          {(selectedCampus !== "All" || selectedCategory !== "All" || searchQuery) && (
            <span> (filtered)</span>
          )}
        </span>
        {(selectedCampus !== "All" || selectedCategory !== "All" || searchQuery) && (
          <button
            onClick={resetFilters}
            className="text-emerald-700 hover:underline font-semibold"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Events Grid or Empty State */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8 space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Calendar className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <h3 className="text-slate-800 font-bold text-lg">No campus events match your criteria</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Try clearing your search keyword or switching between Oye and Ikole campuses.
            </p>
          </div>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition"
          >
            Reset Search & Filters
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
                className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3.5">
                  {/* Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {event.campus}
                    </span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {event.category}
                    </span>
                  </div>

                  {/* Title & Organizer */}
                  <div>
                    <h2 className="font-bold text-slate-900 text-lg leading-snug">
                      {event.title}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Organized by <strong className="text-slate-700">{event.organizer}</strong> • {event.faculty}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Date, Time & Venue */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                      <span>{event.date} • {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                      <span>{event.venue}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {event.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-100"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer RSVP Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Users className="w-4 h-4 text-slate-400" aria-hidden="true" />
                    <span>{currentAttendees} students attending</span>
                  </div>

                  <button
                    onClick={() => toggleRsvp(event.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                      isAttending
                        ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                    aria-pressed={isAttending}
                  >
                    {isAttending ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                        <span>Attending (RSVP Confirmed)</span>
                      </>
                    ) : (
                      <span>RSVP for Event</span>
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

