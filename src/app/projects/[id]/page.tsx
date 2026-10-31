"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Sticker from "@/components/brand/Sticker";
import { STUDENT_PROJECTS } from "@/data/mockData";
import {
  ArrowLeft,
  ThumbsUp,
  Github,
  ExternalLink,
  Users,
  CheckCircle2,
  Code,
  MapPin,
  Send,
  HelpCircle,
  Sparkles,
  X,
  Info,
  Check,
  AlertCircle,
  FileCheck
} from "lucide-react";

interface ApplicationData {
  role: string;
  applicantName: string;
  department: string;
  level: string;
  contactHandle: string;
  pitchNote: string;
  referenceId: string;
  timestamp: string;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params?.id as string;

  const project = STUDENT_PROJECTS.find((p) => p.id === projectId);
  const [upvoted, setUpvoted] = useState(false);

  // Demo Project Participation state
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [applicantName, setApplicantName] = useState("");
  const [applicantDept, setApplicantDept] = useState("");
  const [applicantLevel, setApplicantLevel] = useState("300L");
  const [applicantContact, setApplicantContact] = useState("");
  const [applicantNote, setApplicantNote] = useState("");

  // Validation errors
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submittedApplication, setSubmittedApplication] = useState<ApplicationData | null>(null);

  // Keyboard navigation: Escape key closes modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isApplyModalOpen) {
        setIsApplyModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isApplyModalOpen]);

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="text-5xl">⚡</div>
        <h1 className="text-3xl font-display uppercase tracking-tight text-[var(--color-ink)]">
          Project Not Found
        </h1>
        <p className="font-body text-sm text-slate-700 max-w-md mx-auto">
          The requested student project could not be located on Kampus Konnect.
        </p>
        <div className="pt-2">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-ui bg-[var(--color-yellow)] text-[var(--color-ink)] font-heading font-black text-xs uppercase border-2 border-[var(--color-ink)] shadow-sticker"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Projects Directory</span>
          </Link>
        </div>
      </div>
    );
  }

  const currentUpvotes = project.upvotes + (upvoted ? 1 : 0);

  const openApplicationForRole = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    setSubmittedApplication(null);
    setFormErrors({});
    setIsApplyModalOpen(true);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!applicantName.trim()) {
      errors.applicantName = "Please provide your student name.";
    }
    if (!applicantDept.trim()) {
      errors.applicantDept = "Please enter your department.";
    }
    if (!applicantContact.trim()) {
      errors.applicantContact = "Please provide a contact handle (WhatsApp/Email).";
    }
    if (!applicantNote.trim()) {
      errors.applicantNote = "Please share a brief note on how you can contribute.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Success: Store simulated application
    const appData: ApplicationData = {
      role: selectedRole || project.openRoles[0]?.role || "Collaborator",
      applicantName,
      department: applicantDept,
      level: applicantLevel,
      contactHandle: applicantContact,
      pitchNote: applicantNote,
      referenceId: `KONNECT-APP-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: "Just now",
    };

    setSubmittedApplication(appData);
    setFormErrors({});
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back Link */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 font-heading font-extrabold text-xs uppercase text-slate-700 hover:text-[var(--color-purple)] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Student Projects</span>
        </Link>
      </div>

      {/* Main Project Header Box */}
      <section className="bg-white rounded-panel p-6 sm:p-10 border-4 border-[var(--color-ink)] shadow-sticker-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-meta font-extrabold text-xs px-2.5 py-0.5 rounded-full bg-[var(--color-yellow)] text-[var(--color-ink)] border border-[var(--color-ink)]">
                {project.campus}
              </span>
              <span className="font-heading font-bold text-xs uppercase px-2.5 py-0.5 rounded bg-[var(--color-lavender)] text-[var(--color-purple)]">
                {project.faculty} • {project.department}
              </span>
              {project.lookingForContributors ? (
                <span className="font-heading font-black text-xs uppercase px-2.5 py-0.5 rounded bg-[var(--color-red)] text-white">
                  ⚡ Seeking Teammates
                </span>
              ) : (
                <span className="font-meta text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  Showcase Prototype
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-[var(--color-ink)]">
              {project.title}
            </h1>
            <p className="font-heading font-bold text-base sm:text-lg text-[var(--color-purple)]">
              {project.tagline}
            </p>
          </div>

          {/* Upvote & Express Interest Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 self-start">
            <button
              onClick={() => setUpvoted(!upvoted)}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-ui font-heading font-black text-xs uppercase border-2 border-[var(--color-ink)] shadow-sticker transition ${
                upvoted
                  ? "bg-[var(--color-green)] text-white"
                  : "bg-[var(--color-yellow)] hover:bg-amber-300 text-[var(--color-ink)]"
              }`}
              aria-pressed={upvoted}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{currentUpvotes} UPVOTES</span>
            </button>

            {project.lookingForContributors && (
              <button
                onClick={() => openApplicationForRole(project.openRoles[0]?.role || "Collaborator")}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-ui bg-[var(--color-green)] hover:bg-emerald-600 text-white font-heading font-black text-xs uppercase border-2 border-[var(--color-ink)] shadow-sticker hover:shadow-sticker-lg transition"
              >
                <span>APPLY TO JOIN ⚡</span>
              </button>
            )}
          </div>
        </div>

        {/* Links row */}
        <div className="flex items-center gap-3 pt-4 border-t-2 border-[var(--color-ink)]/10 flex-wrap">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-ui text-xs font-heading font-black uppercase bg-[var(--color-ink)] text-white hover:bg-slate-800 border-2 border-[var(--color-ink)] shadow-sticker-sm transition"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-ui text-xs font-heading font-black uppercase bg-[var(--color-warm-white)] text-[var(--color-purple)] hover:bg-[var(--color-lavender)] border-2 border-[var(--color-ink)] shadow-sticker-sm transition"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Deployment Preview</span>
            </a>
          )}
        </div>

        {/* Success simulated banner if user already submitted */}
        {submittedApplication && (
          <div className="p-4 rounded-xl bg-[var(--color-soft-green)] border-2 border-[var(--color-green)] text-[var(--color-ink)] flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[var(--color-green)] shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-heading font-black text-sm uppercase text-[var(--color-success)]">
                Application Submitted (Simulated Demo): {submittedApplication.referenceId}
              </p>
              <p className="font-body">
                You expressed interest in the <strong>{submittedApplication.role}</strong> role. In production, this notification goes directly to the project creators.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Two Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 cols) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Detailed Overview */}
          <section className="bg-white rounded-card p-6 sm:p-8 border-2 border-[var(--color-ink)] shadow-sticker space-y-4">
            <h2 className="text-2xl font-display uppercase tracking-tight text-[var(--color-ink)]">
              Project Overview
            </h2>
            <p className="font-body text-sm sm:text-base text-slate-700 leading-relaxed">
              {project.description}
            </p>
          </section>

          {/* Key Goals */}
          <section className="bg-white rounded-card p-6 sm:p-8 border-2 border-[var(--color-ink)] shadow-sticker space-y-4">
            <h2 className="text-2xl font-display uppercase tracking-tight text-[var(--color-ink)]">
              Key Project Goals
            </h2>
            <ul className="space-y-3">
              {project.goals.map((goal, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-body text-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-green)] shrink-0 mt-0.5" />
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Open Team Roles with Direct "Apply for Role" Action */}
          <section className="bg-white rounded-card p-6 sm:p-8 border-2 border-[var(--color-ink)] shadow-sticker space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-display uppercase tracking-tight text-[var(--color-ink)] flex items-center gap-2">
                <Users className="w-6 h-6 text-[var(--color-purple)]" />
                <span>Open Team Roles & Collaborations</span>
              </h2>
              <span className="font-heading font-extrabold text-xs uppercase px-2.5 py-1 rounded bg-[var(--color-yellow)] text-[var(--color-ink)] border border-[var(--color-ink)]">
                {project.openRoles.length} Available
              </span>
            </div>

            {project.openRoles.length === 0 ? (
              <p className="font-body text-sm text-slate-500 italic">
                This project is not currently recruiting new team members.
              </p>
            ) : (
              <div className="space-y-4">
                {project.openRoles.map((role, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-card border-2 border-[var(--color-ink)] bg-[var(--color-warm-white)] space-y-3 shadow-sticker-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="font-heading font-black text-base sm:text-lg text-[var(--color-ink)]">
                        {role.role}
                      </h3>
                      <button
                        onClick={() => openApplicationForRole(role.role)}
                        className="self-start sm:self-auto px-3.5 py-1.5 rounded-lg bg-[var(--color-purple)] hover:bg-purple-900 text-white font-heading font-black text-xs uppercase border border-[var(--color-ink)] shadow-sticker-sm transition"
                      >
                        Apply for this Role ⚡
                      </button>
                    </div>

                    <p className="font-body text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {role.description}
                    </p>

                    <div>
                      <span className="text-[10px] font-meta font-black uppercase text-slate-500 tracking-wider block mb-1">
                        Required Skills:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {role.skills.map((s, i) => (
                          <span
                            key={i}
                            className="text-xs font-meta font-bold px-2 py-0.5 rounded bg-white border border-[var(--color-ink)] text-slate-800"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right Column (1 col) */}
        <div className="space-y-6">
          {/* How to Join / Project Participation Card */}
          <section className="bg-[var(--color-yellow)] rounded-card p-6 border-2 border-[var(--color-ink)] shadow-sticker space-y-4">
            <h2 className="text-xl font-display uppercase tracking-tight text-[var(--color-ink)]">
              Project Participation
            </h2>
            <p className="font-body text-xs sm:text-sm text-slate-800 leading-relaxed">
              {project.howToJoin}
            </p>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => openApplicationForRole(project.openRoles[0]?.role || "Collaborator")}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-ui bg-[var(--color-purple)] hover:bg-purple-900 text-white font-heading font-black text-xs uppercase tracking-wider border-2 border-[var(--color-ink)] shadow-sticker-sm transition"
              >
                <Sparkles className="w-4 h-4 text-[var(--color-yellow)]" />
                <span>Express Interest (Demo)</span>
              </button>

              <a
                href={project.githubUrl || "https://github.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-ui bg-white hover:bg-slate-50 text-[var(--color-ink)] font-heading font-extrabold text-xs uppercase border border-[var(--color-ink)] transition"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Visit GitHub Repository</span>
              </a>
            </div>
          </section>

          {/* Student Creators */}
          <section className="bg-white rounded-card p-6 border-2 border-[var(--color-ink)] shadow-sticker space-y-4">
            <h2 className="text-xl font-display uppercase tracking-tight text-[var(--color-ink)]">
              Project Creators
            </h2>
            <div className="space-y-3">
              {project.creators.map((creator, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-purple)] text-white border-2 border-[var(--color-ink)] flex items-center justify-center font-display text-sm">
                    {creator.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-heading font-black text-sm text-[var(--color-ink)]">
                      {creator.name}
                    </p>
                    <p className="text-[11px] font-meta text-slate-500">
                      {creator.role} • {creator.department}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section className="bg-white rounded-card p-6 border-2 border-[var(--color-ink)] shadow-sticker space-y-3">
            <h2 className="text-xl font-display uppercase tracking-tight text-[var(--color-ink)]">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs font-meta font-extrabold px-3 py-1 rounded-lg bg-[var(--color-warm-white)] text-[var(--color-ink)] border border-[var(--color-ink)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* PROJECT PARTICIPATION MODAL (DEMO INTERACTION) */}
      {isApplyModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="apply-modal-title"
          onClick={() => setIsApplyModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-ink)]/70 backdrop-blur-sm animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[var(--color-warm-white)] rounded-panel border-4 border-[var(--color-ink)] shadow-sticker-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b-2 border-[var(--color-ink)] pb-3">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--color-yellow)] text-[var(--color-ink)] text-[10px] font-meta font-extrabold uppercase border border-[var(--color-ink)]">
                  <span>⚡ SIMULATED DEMO INTERACTION</span>
                </div>
                <h2 id="apply-modal-title" className="text-2xl font-display uppercase tracking-tight text-[var(--color-ink)]">
                  Express Interest in Project
                </h2>
                <p className="text-xs font-body text-slate-600">
                  Target: <strong>{project.title}</strong>
                </p>
              </div>

              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="p-1.5 rounded-lg border-2 border-[var(--color-ink)] bg-white text-[var(--color-ink)] shadow-sticker-sm hover:bg-[var(--color-lavender)]"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* If successfully submitted simulated application */}
            {submittedApplication ? (
              <div className="space-y-4 py-2">
                <div className="p-4 rounded-card bg-[var(--color-soft-green)] border-2 border-[var(--color-green)] shadow-sticker-sm space-y-3">
                  <div className="flex items-center gap-2 text-[var(--color-success)] font-heading font-black text-base uppercase">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Application Sent Successfully!</span>
                  </div>
                  <p className="font-body text-xs text-slate-800 leading-relaxed">
                    Your interest in <strong>{project.title}</strong> as <strong>{submittedApplication.role}</strong> has been simulated.
                  </p>
                  <div className="p-3 rounded-lg bg-white border border-[var(--color-ink)]/15 font-meta text-xs space-y-1">
                    <p><strong>Reference ID:</strong> {submittedApplication.referenceId}</p>
                    <p><strong>Applicant:</strong> {submittedApplication.applicantName} ({submittedApplication.department})</p>
                    <p><strong>Status:</strong> <span className="text-[var(--color-purple)] font-bold">Simulated Pending Review</span></p>
                  </div>
                </div>

                <div className="p-3 rounded-ui bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                  <Info className="w-4 h-4 shrink-0 text-amber-700" />
                  <span>
                    <strong>Notice:</strong> This is a front-end simulation. No personal data is stored on a database.
                  </span>
                </div>

                <button
                  onClick={() => setIsApplyModalOpen(false)}
                  className="w-full py-3 rounded-ui bg-[var(--color-purple)] text-white font-heading font-black text-xs uppercase border-2 border-[var(--color-ink)] shadow-sticker"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                {/* Role Selector */}
                <div>
                  <label className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                    Select Desired Role *
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-ui border-2 border-[var(--color-ink)] bg-white text-xs font-heading font-bold uppercase focus:outline-none shadow-sticker-sm"
                  >
                    {project.openRoles.length > 0 ? (
                      project.openRoles.map((r, i) => (
                        <option key={i} value={r.role}>
                          {r.role}
                        </option>
                      ))
                    ) : (
                      <option value="General Collaborator">General Collaborator</option>
                    )}
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                    Your Student Name (Demo) *
                  </label>
                  <input
                    type="text"
                    value={applicantName}
                    onChange={(e) => {
                      setApplicantName(e.target.value);
                      if (formErrors.applicantName) setFormErrors((p) => ({ ...p, applicantName: "" }));
                    }}
                    placeholder="e.g. Tunde Balogun"
                    className={`w-full px-3.5 py-2.5 rounded-ui border-2 text-sm font-body bg-white focus:outline-none shadow-sticker-sm ${
                      formErrors.applicantName ? "border-red-600 bg-red-50" : "border-[var(--color-ink)]"
                    }`}
                  />
                  {formErrors.applicantName && (
                    <p className="text-[11px] font-bold text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {formErrors.applicantName}
                    </p>
                  )}
                </div>

                {/* Dept & Level */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                      Department *
                    </label>
                    <input
                      type="text"
                      value={applicantDept}
                      onChange={(e) => {
                        setApplicantDept(e.target.value);
                        if (formErrors.applicantDept) setFormErrors((p) => ({ ...p, applicantDept: "" }));
                      }}
                      placeholder="e.g. Computer Science"
                      className={`w-full px-3 py-2.5 rounded-ui border-2 text-xs font-body bg-white focus:outline-none shadow-sticker-sm ${
                        formErrors.applicantDept ? "border-red-600 bg-red-50" : "border-[var(--color-ink)]"
                      }`}
                    />
                    {formErrors.applicantDept && (
                      <p className="text-[10px] font-bold text-red-600 mt-1">
                        {formErrors.applicantDept}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                      Level:
                    </label>
                    <select
                      value={applicantLevel}
                      onChange={(e) => setApplicantLevel(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-ui border-2 border-[var(--color-ink)] bg-white text-xs font-heading font-bold uppercase focus:outline-none shadow-sticker-sm"
                    >
                      <option>100L</option>
                      <option>200L</option>
                      <option>300L</option>
                      <option>400L</option>
                      <option>500L</option>
                    </select>
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <label className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                    Contact Handle (WhatsApp / GitHub / Email) *
                  </label>
                  <input
                    type="text"
                    value={applicantContact}
                    onChange={(e) => {
                      setApplicantContact(e.target.value);
                      if (formErrors.applicantContact) setFormErrors((p) => ({ ...p, applicantContact: "" }));
                    }}
                    placeholder="e.g. 08012345678 or github.com/username"
                    className={`w-full px-3.5 py-2.5 rounded-ui border-2 text-sm font-body bg-white focus:outline-none shadow-sticker-sm ${
                      formErrors.applicantContact ? "border-red-600 bg-red-50" : "border-[var(--color-ink)]"
                    }`}
                  />
                  {formErrors.applicantContact && (
                    <p className="text-[11px] font-bold text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {formErrors.applicantContact}
                    </p>
                  )}
                </div>

                {/* Pitch / Short note */}
                <div>
                  <label className="block text-xs font-meta font-extrabold uppercase text-[var(--color-ink)] mb-1">
                    Why do you want to collaborate? (Short Pitch) *
                  </label>
                  <textarea
                    rows={3}
                    value={applicantNote}
                    onChange={(e) => {
                      setApplicantNote(e.target.value);
                      if (formErrors.applicantNote) setFormErrors((p) => ({ ...p, applicantNote: "" }));
                    }}
                    placeholder="Tell the team about your skills and availability..."
                    className={`w-full px-3.5 py-2.5 rounded-ui border-2 text-sm font-body bg-white focus:outline-none shadow-sticker-sm ${
                      formErrors.applicantNote ? "border-red-600 bg-red-50" : "border-[var(--color-ink)]"
                    }`}
                  />
                  {formErrors.applicantNote && (
                    <p className="text-[11px] font-bold text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {formErrors.applicantNote}
                    </p>
                  )}
                </div>

                <div className="p-3 rounded-ui bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                  <span>
                    🔒 <strong>Privacy Note:</strong> This is a prototype demo interaction. No real personal records are stored.
                  </span>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2 border-t-2 border-[var(--color-ink)]/10">
                  <button
                    type="button"
                    onClick={() => setIsApplyModalOpen(false)}
                    className="px-4 py-2.5 rounded-ui border-2 border-[var(--color-ink)] bg-white font-heading font-bold text-xs uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-ui bg-[var(--color-green)] text-white font-heading font-black text-xs uppercase tracking-wider border-2 border-[var(--color-ink)] shadow-sticker hover:shadow-sticker-lg transition"
                  >
                    SUBMIT DEMO APPLICATION ⚡
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
