"use client";

import React, { useState } from "react";
import { CampusEvent, INITIAL_EVENTS } from "@/data/mockData";
import { Calendar, MapPin, Clock, Users, Plus, Filter, Search, Sparkles, Check, Wand2, X } from "lucide-react";

interface EventsSectionProps {
  onOpenGemma: () => void;
}

export default function EventsSection({ onOpenGemma }: EventsSectionProps) {
  const [events, setEvents] = useState<CampusEvent[]>(INITIAL_EVENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCampus, setSelectedCampus] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [rsvpMap, setRsvpMap] = useState<Record<string, boolean>>({});

  // Create Event Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newVenue, setNewVenue] = useState("");
  const [newCampus, setNewCampus] = useState<CampusEvent["campus"]>("Oye (Main)");
  const [newCategory, setNewCategory] = useState<CampusEvent["category"]>("Tech");
  const [newOrganizer, setNewOrganizer] = useState("");
  const [isPolishing, setIsPolishing] = useState(false);

  // Toggle RSVP
  const handleToggleRsvp = (id: string) => {
    setRsvpMap((prev) => {
      const isAttending = !prev[id];
      setEvents((currentEvents) =>
        currentEvents.map((e) =>
          e.id === id ? { ...e, attendeesCount: e.attendeesCount + (isAttending ? 1 : -1) } : e
        )
      );
      return { ...prev, [id]: isAttending };
    });
  };

  // Enhance Event Description using Gemma
  const handlePolishWithGemma = async () => {
    if (!newDesc.trim()) return;
    setIsPolishing(true);

    try {
      const res = await fetch("/api/gemma", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "enhance",
          payload: { text: newDesc, type: "event" },
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setNewDesc(data.data.enhanced);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsPolishing(false);
    }
  };

  // Submit New Event
  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newVenue.trim()) return;

    const created: CampusEvent = {
      id: `evt-${Date.now()}`,
      title: newTitle,
      description: newDesc || "Exciting campus event for FUOYE students.",
      date: newDate || "TBA",
      time: "TBA",
      venue: newVenue,
      campus: newCampus,
      faculty: newCampus === "Ikole" ? "Faculty of Engineering" : "Faculty of Science",
      category: newCategory,
      organizer: newOrganizer || "Student Committee",
      attendeesCount: 1,
      tags: [newCategory, "FUOYE", newCampus],
    };

    setEvents([created, ...events]);
    setIsModalOpen(false);
    // Reset form
    setNewTitle("");
    setNewDesc("");
    setNewVenue("");
    setNewOrganizer("");
  };

  // Filter events
  const filteredEvents = events.filter((ev) => {
    const matchesSearch =
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCampus = selectedCampus === "All" || ev.campus.includes(selectedCampus);
    const matchesCategory = selectedCategory === "All" || ev.category === selectedCategory;
    return matchesSearch && matchesCampus && matchesCategory;
  });

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Calendar className="w-6 h-6 text-emerald-600" />
            <span>Campus Events & Workshops</span>
          </h2>
          <p className="text-sm text-slate-500">
            Never miss a hackathon, seminar, or social gathering across FUOYE campuses.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Post an Event</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events by title, organizer, or keywords..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
            />
          </div>

          {/* Campus Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {["All", "Oye", "Ikole", "Virtual"].map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCampus(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedCampus === c
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {c === "All" ? "All Campuses" : `${c} Campus`}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-slate-100">
          <span className="text-xs text-slate-500 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </span>
          {["All", "Tech", "Career", "Academic", "Sports"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-2.5 py-1 rounded-full font-medium transition ${
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

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300 p-6 space-y-3">
          <Calendar className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-slate-800 font-semibold text-base">No events found matching your search.</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your campus or category filter, or post the first event yourself!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredEvents.map((evt) => {
            const isAttending = !!rsvpMap[evt.id];
            return (
              <div
                key={evt.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100">
                      {evt.campus}
                    </span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {evt.category}
                    </span>
                  </div>

                  {/* Title & Organizer */}
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg leading-snug hover:text-emerald-700 transition">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">Organized by {evt.organizer}</p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {evt.description}
                  </p>

                  {/* Metadata (Date, Time, Venue) */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{evt.date} • {evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{evt.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>{evt.attendeesCount} students going</span>
                  </div>

                  <button
                    onClick={() => handleToggleRsvp(evt.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      isAttending
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    {isAttending ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Attending!</span>
                      </>
                    ) : (
                      <span>RSVP Now</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CREATE EVENT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <span>Post a Campus Event</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Next.js & Gemma AI Hands-on Workshop"
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Campus</label>
                  <select
                    value={newCampus}
                    onChange={(e) => setNewCampus(e.target.value as any)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Oye (Main)">Oye (Main Campus)</option>
                    <option value="Ikole">Ikole Campus</option>
                    <option value="Virtual">Virtual / Online</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Tech">Tech & Hackathons</option>
                    <option value="Academic">Academic & Lectures</option>
                    <option value="Career">Career & Networking</option>
                    <option value="Social">Social Gathering</option>
                    <option value="Sports">Sports</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date & Time</label>
                  <input
                    type="text"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    placeholder="e.g. Nov 15, 2:00 PM"
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Venue *</label>
                  <input
                    type="text"
                    required
                    value={newVenue}
                    onChange={(e) => setNewVenue(e.target.value)}
                    placeholder="e.g. ETF Building Hall A"
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Organizer / Club Name
                </label>
                <input
                  type="text"
                  value={newOrganizer}
                  onChange={(e) => setNewOrganizer(e.target.value)}
                  placeholder="e.g. GDG FUOYE or 400L Class Rep"
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Description with Gemma polish button */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-slate-700">Description</label>
                  <button
                    type="button"
                    onClick={handlePolishWithGemma}
                    disabled={isPolishing || !newDesc.trim()}
                    className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 disabled:opacity-40"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>{isPolishing ? "Polishing with Gemma..." : "Polish with Gemma AI"}</span>
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Write a brief overview. Click 'Polish with Gemma AI' to format nicely!"
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition"
                >
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

