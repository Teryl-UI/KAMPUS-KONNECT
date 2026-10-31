"use client";

import React, { useState, useMemo } from "react";
import Sticker from "@/components/brand/Sticker";
import { CAMPUS_GISTS, CampusGist } from "@/data/mockData";
import { Search, MessageCircle, Flame, Plus, X, ArrowUpRight, Share2, Sparkles, Filter, CheckCircle2, AlertCircle, Info } from "lucide-react";

export default function CampusGistsPage() {
  const [gists, setGists] = useState<CampusGist[]>(CAMPUS_GISTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedCampus, setSelectedCampus] = useState<string>("All");

  // Post a Gist Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newCategory, setNewCategory] = useState<CampusGist["category"]>("Campus Gists");
  const [newCampus, setNewCampus] = useState<CampusGist["campus"]>("All Campuses");

  // Form error and success states
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [publishedSuccess, setPublishedSuccess] = useState<string | null>(null);

  // Reactions state
  const [reactionsMap, setReactionsMap] = useState<
    Record<string, { fire: number; mindblown: number; laugh: number }>
  >(() => {
    const initial: Record<string, { fire: number; mindblown: number; laugh: number }> = {};
    CAMPUS_GISTS.forEach((g) => {
      initial[g.id] = { ...g.reactions };
    });
    return initial;
  });

  const categories = [
    "All",
    "Campus Gists",
    "Entertainment News",
    "Hostel Chronicles",
    "Tech Buzz",
    "Academic Scoop",
  ];

  const handleReact = (id: string, type: "fire" | "mindblown" | "laugh") => {
    setReactionsMap((prev) => {
      const current = prev[id] || { fire: 10, mindblown: 5, laugh: 2 };
      return {
        ...prev,
        [id]: {
          ...current,
          [type]: current[type] + 1,
        },
      };
    });
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedCampus("All");
  };

  const handleCreateGist = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!newTitle.trim()) {
      errors.title = "Please provide a catchy headline for your gist.";
    }
    if (!newContent.trim()) {
      errors.content = "Please provide the gist details or story.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const gistRef = `GIST-REF-${Math.floor(1000 + Math.random() * 9000)}`;

    const created: CampusGist = {
      id: `gist-${Date.now()}`,
      title: newTitle,
      content: newContent,
      author: newAuthor.trim() || "Anonymous Konnector",
      authorRole: "Student",
      faculty: "Cross-Faculty",
      campus: newCampus,
      category: newCategory,
      emoji: newCategory === "Tech Buzz" ? "💻" : newCategory === "Entertainment News" ? "🎉" : "💬",
      reactions: { fire: 1, mindblown: 0, laugh: 0 },
      commentsCount: 0,
      timeAgo: "Just now",
      isHot: true,
    };

    setGists([created, ...gists]);
    setReactionsMap((prev) => ({
      ...prev,
      [created.id]: { fire: 1, mindblown: 0, laugh: 0 },
    }));

    setPublishedSuccess(gistRef);
    setFormErrors({});

    setTimeout(() => {
      setIsModalOpen(false);
      setPublishedSuccess(null);
      setNewTitle("");
      setNewContent("");
      setNewAuthor("");
    }, 2000);
  };

  // Filtered gists
  const filteredGists = useMemo(() => {
    return gists.filter((gist) => {
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        gist.title.toLowerCase().includes(query) ||
        gist.content.toLowerCase().includes(query) ||
        gist.author.toLowerCase().includes(query);

      const matchesCat =
        selectedCategory === "All" || gist.category === selectedCategory;

      const matchesCampus =
        selectedCampus === "All" ||
        gist.campus === "All Campuses" ||
        gist.campus.includes(selectedCampus);

      return matchesSearch && matchesCat && matchesCampus;
    });
  }, [gists, searchQuery, selectedCategory, selectedCampus]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-4 border-[var(--color-ink)] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sticker variant="red" rotate="left" emoji="💬">
              CAMPUS GISTS
            </Sticker>
            <span className="text-xs font-meta font-extrabold uppercase text-[var(--color-purple)]">
              THE STUDENT PULSE
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-[var(--color-ink)]">
            Campus Gists & Buzz
          </h1>
          <p className="font-body text-sm sm:text-base text-slate-700 max-w-xl mt-1">
            Student gossip, viral happenings, faculty banter, shuttle news, and major university announcements straight from Oye and Ikole.
          </p>
        </div>

        <button
          onClick={() => {
            setIsModalOpen(true);
            setFormErrors({});
            setPublishedSuccess(null);
          }}
          className="self-start md:self-auto px-6 py-3.5 rounded-ui bg-[var(--color-yellow)] hover:bg-amber-300 text-[var(--color-ink)] font-heading font-black text-sm uppercase tracking-wider border-2 border-[var(--color-ink)] shadow-sticker hover:shadow-sticker-lg active:translate-x-0.5 active:translate-y-0.5 transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>DROP A GIST 💬</span>
        </button>
      </div>

      {/* Search & Category Tabs */}
      <section aria-label="Gists search and category filters" className="bg-white p-5 rounded-card border-2 border-[var(--color-ink)] shadow-sticker space-y-4">
        {/* Search */}
        <div className="relative">
          <label htmlFor="gist-search" className="sr-only">
            Search gists
          </label>
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            id="gist-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search gists by title, author, or keywords (e.g. shuttle, hackathon, hostel)..."
            className="w-full pl-10 pr-4 py-2.5 text-sm border-2 border-[var(--color-ink)] rounded-ui bg-[var(--color-warm-white)] font-body focus:outline-none focus:ring-2 focus:ring-[var(--color-purple)] shadow-sticker-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-700"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-meta font-extrabold uppercase text-slate-500 mr-1">
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-heading font-bold uppercase transition focus:outline-none border-2 border-[var(--color-ink)] shadow-sticker-sm ${
                  selectedCategory === cat
                    ? "bg-[var(--color-purple)] text-white"
                    : "bg-white text-[var(--color-ink)] hover:bg-[var(--color-lavender)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-meta font-extrabold uppercase text-slate-500 mr-1">
              Campus:
            </span>
            {["All", "Oye", "Ikole"].map((campus) => (
              <button
                key={campus}
                onClick={() => setSelectedCampus(campus)}
                className={`px-2.5 py-1 rounded-lg text-xs font-meta font-bold uppercase border-2 border-[var(--color-ink)] ${
                  selectedCampus === campus
                    ? "bg-[var(--color-yellow)] text-[var(--color-ink)]"
                    : "bg-white text-slate-700"
                }`}
              >
                {campus === "All" ? "All" : `${campus}`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs font-meta text-slate-600 px-1">
        <span>
          Showing <strong>{filteredGists.length}</strong> {filteredGists.length === 1 ? "gist" : "gists"}
          {(selectedCategory !== "All" || selectedCampus !== "All" || searchQuery) && (
            <span> (filtered)</span>
          )}
        </span>
        {(selectedCategory !== "All" || selectedCampus !== "All" || searchQuery) && (
          <button
            onClick={resetFilters}
            className="text-[var(--color-purple)] hover:underline font-extrabold uppercase"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Gists Feed or Empty State */}
      {filteredGists.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-card border-2 border-dashed border-[var(--color-ink)] p-8 space-y-4">
          <div className="text-4xl">💬</div>
          <div className="space-y-1">
            <h3 className="font-heading font-black text-xl text-[var(--color-ink)]">
              No campus gists matched your search
            </h3>
            <p className="font-body text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Try searching for different keywords (e.g. shuttle, hackathon, Wi-Fi) or select &quot;All Categories&quot;.
            </p>
          </div>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-ui bg-[var(--color-yellow)] text-[var(--color-ink)] font-heading font-black text-xs uppercase border-2 border-[var(--color-ink)] shadow-sticker"
          >
            Reset Gist Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGists.map((gist) => {
            const reacts = reactionsMap[gist.id] || gist.reactions;
            return (
              <article
                key={gist.id}
                className="bg-white rounded-card p-6 border-2 border-[var(--color-ink)] shadow-sticker hover:shadow-sticker-lg transition flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-heading font-black text-xs uppercase px-2.5 py-1 rounded-md bg-[var(--color-lavender)] text-[var(--color-purple)] border border-[var(--color-ink)]/20">
                      {gist.category}
                    </span>
                    <span className="font-meta text-slate-500 font-bold">{gist.timeAgo}</span>
                  </div>

                  <h2 className="font-heading font-black text-xl text-[var(--color-ink)] leading-snug">
                    {gist.title}
                  </h2>

                  <p className="font-body text-sm text-slate-700 leading-relaxed">
                    {gist.content}
                  </p>
                </div>

                <div className="pt-4 border-t-2 border-[var(--color-ink)]/10 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[var(--color-ink)]">
                      By <strong>{gist.author}</strong> ({gist.authorRole})
                    </span>
                    <span className="font-meta font-bold text-[var(--color-purple)]">
                      {gist.campus}
                    </span>
                  </div>

                  {/* Reaction Pill Buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => handleReact(gist.id, "fire")}
                      className="px-3 py-1.5 rounded-ui bg-[var(--color-warm-white)] hover:bg-[var(--color-yellow)] border-2 border-[var(--color-ink)] text-xs font-heading font-bold flex items-center gap-1.5 transition shadow-sticker-sm active:translate-y-0.5"
                      aria-label="React with fire"
                    >
                      <span>🔥 Fire</span>
                      <span className="font-meta font-extrabold">{reacts.fire}</span>
                    </button>

                    <button
                      onClick={() => handleReact(gist.id, "mindblown")}
                      className="px-3 py-1.5 rounded-ui bg-[var(--color-warm-white)] hover:bg-[var(--color-lavender)] border-2 border-[var(--color-ink)] text-xs font-heading font-bold flex items-center gap-1.5 transition shadow-sticker-sm active:translate-y-0.5"
                      aria-label="React with mindblown"
                    >
                      <span>🤯 Mad o</span>
                      <span className="font-meta font-extrabold">{reacts.mindblown}</span>
                    </button>

                    <button
                      onClick={() => handleReact(gist.id, "laugh")}
                      className="px-3 py-1.5 rounded-ui bg-[var(--color-warm-white)] hover:bg-[var(--color-soft-green)] border-2 border-[var(--color-ink)] text-xs font-heading font-bold flex items-center gap-1.5 transition shadow-sticker-sm active:translate-y-0.5"
                      aria-label="React with laugh"
                    >
                      <span>😂 Laugh</span>
                      <span className="font-meta font-extrabold">{reacts.laugh}</span>
                    </button>

                    <span className="ml-auto font-meta text-xs text-slate-500 font-bold flex items-center gap-1">
                      <MessageCircle className="w-4 h-4 text-slate-400" />
                      <span>{gist.commentsCount} comments</span>
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* DROP A GIST MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-ink)]/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[var(--color-warm-white)] rounded-panel border-4 border-[var(--color-ink)] shadow-sticker-xl max-w-lg w-full p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b-2 border-[var(--color-ink)] pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-meta font-extrabold uppercase px-2 py-0.5 rounded bg-[var(--color-yellow)] text-[var(--color-ink)] border border-[var(--color-ink)]">
                  SIMULATED DEMO INTERACTION
                </span>
                <h2 className="text-2xl font-display uppercase tracking-tight text-[var(--color-ink)] pt-1">
                  Drop a Campus Gist
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg border-2 border-[var(--color-ink)] bg-white text-[var(--color-ink)] shadow-sticker-sm hover:bg-[var(--color-lavender)]"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {publishedSuccess ? (
              <div className="p-5 rounded-card bg-[var(--color-soft-green)] border-2 border-[var(--color-green)] text-[var(--color-ink)] space-y-3 text-center py-6">
                <CheckCircle2 className="w-8 h-8 text-[var(--color-success)] mx-auto" />
                <h3 className="font-heading font-black text-lg uppercase text-[var(--color-success)]">
                  Gist Published (Simulated Session)!
                </h3>
                <p className="font-body text-xs text-slate-700">
                  Your gist has been added to the feed with reference <strong>{publishedSuccess}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreateGist} className="space-y-4">
                <div>
                  <label htmlFor="gist-title" className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                    Gist Catchy Headline *
                  </label>
                  <input
                    id="gist-title"
                    type="text"
                    value={newTitle}
                    onChange={(e) => {
                      setNewTitle(e.target.value);
                      if (formErrors.title) setFormErrors((p) => ({ ...p, title: "" }));
                    }}
                    placeholder="e.g. Science Lecture Hall B Projector Finally Replaced!"
                    className={`w-full px-3.5 py-2.5 rounded-ui border-2 text-sm font-body bg-white focus:outline-none shadow-sticker-sm ${
                      formErrors.title ? "border-red-600 bg-red-50" : "border-[var(--color-ink)]"
                    }`}
                  />
                  {formErrors.title && (
                    <p className="text-[11px] font-bold text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {formErrors.title}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="gist-category" className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                      Category:
                    </label>
                    <select
                      id="gist-category"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3 py-2.5 rounded-ui border-2 border-[var(--color-ink)] bg-white text-xs font-heading font-bold uppercase focus:outline-none shadow-sticker-sm"
                    >
                      <option value="Campus Gists">Campus Gists</option>
                      <option value="Entertainment News">Entertainment News</option>
                      <option value="Hostel Chronicles">Hostel Chronicles</option>
                      <option value="Tech Buzz">Tech Buzz</option>
                      <option value="Academic Scoop">Academic Scoop</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="gist-campus" className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                      Campus:
                    </label>
                    <select
                      id="gist-campus"
                      value={newCampus}
                      onChange={(e) => setNewCampus(e.target.value as any)}
                      className="w-full px-3 py-2.5 rounded-ui border-2 border-[var(--color-ink)] bg-white text-xs font-heading font-bold uppercase focus:outline-none shadow-sticker-sm"
                    >
                      <option value="All Campuses">All Campuses</option>
                      <option value="Oye (Main)">Oye (Main Campus)</option>
                      <option value="Ikole">Ikole Campus</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="gist-author" className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                    Your Handle / Pen Name:
                  </label>
                  <input
                    id="gist-author"
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Anonymous 300L Science"
                    className="w-full px-3.5 py-2.5 rounded-ui border-2 border-[var(--color-ink)] bg-white text-sm font-body focus:outline-none shadow-sticker-sm"
                  />
                </div>

                <div>
                  <label htmlFor="gist-content" className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                    Gist Story / Description *
                  </label>
                  <textarea
                    id="gist-content"
                    rows={4}
                    value={newContent}
                    onChange={(e) => {
                      setNewContent(e.target.value);
                      if (formErrors.content) setFormErrors((p) => ({ ...p, content: "" }));
                    }}
                    placeholder="Give the full gist with all the juicy details..."
                    className={`w-full px-3.5 py-2.5 rounded-ui border-2 text-sm font-body bg-white focus:outline-none shadow-sticker-sm ${
                      formErrors.content ? "border-red-600 bg-red-50" : "border-[var(--color-ink)]"
                    }`}
                  />
                  {formErrors.content && (
                    <p className="text-[11px] font-bold text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {formErrors.content}
                    </p>
                  )}
                </div>

                <div className="p-3 rounded-ui bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                  <Info className="w-4 h-4 shrink-0 text-amber-700" />
                  <span>
                    🔒 <strong>Demo Simulation:</strong> This post will appear in your current browser session.
                  </span>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-ui border-2 border-[var(--color-ink)] bg-white font-heading font-bold text-xs uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-ui bg-[var(--color-red)] text-white font-heading font-black text-xs uppercase tracking-wider border-2 border-[var(--color-ink)] shadow-sticker hover:shadow-sticker-lg transition"
                  >
                    PUBLISH GIST 🔥
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
