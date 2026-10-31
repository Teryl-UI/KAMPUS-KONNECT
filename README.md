# ⚡ KAMPUS KONNECT
### Connect. Collaborate. Thrive.
**An Open-Source Community Platform for Students at the Federal University Oye-Ekiti (FUOYE), Nigeria.**

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black.svg?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache--2.0-blue.svg?style=flat)](./LICENSE)
[![Hacktoberfest 2026](https://img.shields.io/badge/Hacktoberfest-2026-orange.svg?style=flat&logo=hacktoberfest)](https://hacktoberfest.com/)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FTeryl-UI%2FKAMPUS-KONNECT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](./CONTRIBUTING.md)

---

## 📖 Table of Contents
- [About the Project](#-about-the-project)
- [The Problem We Solve](#-the-problem-we-solve)
- [Target Users](#-target-users)
- [Key Features](#-key-features)
- [Screenshots & Visual Design](#-screenshots--visual-design)
- [Technology Stack](#-technology-stack)
- [Project Folder Structure](#-project-folder-structure)
- [Prerequisites](#-prerequisites)
- [Local Setup & Installation](#-local-setup--installation)
- [Environment Variables](#-environment-variables)
- [Running, Building & Testing](#-running-building--testing)
- [Contributing](#-contributing)
- [Project Roadmap](#-project-roadmap)
- [Acknowledgements](#-acknowledgements)
- [License](#-license)

---

## 🌟 About the Project

**Kampus Konnect** is an expressive, open-source digital community platform created specifically for students of the **Federal University Oye-Ekiti (FUOYE)**.

Unlike rigid university institutional portals, Kampus Konnect is a high-energy student-culture brand built with bold neo-brutalist aesthetics, vibrant college palettes, sticker badges, and live interactions. It gives students an open playground to discover events, form hackathon squads, share projects, drop campus gists, and find multidisciplinary collaborators.

---

## 💡 The Problem We Solve

FUOYE is geographically bifurcated across two distant campuses in Ekiti State, Nigeria:
1. **Oye Main Campus**: Home to the Faculties of Science, Arts, Social Sciences, Management, Education, and Basic Medical Sciences.
2. **Ikole Campus**: Home to the Faculty of Engineering and the Faculty of Agriculture.

Because of the physical distance between Oye and Ikole, student activities remain heavily siloed:
* **Fragmented Discovery**: Tech meetups, workshops, and student society events are broadcasted through dozens of disconnected WhatsApp groups and status updates.
* **Collaboration Barriers**: Engineering students in Ikole rarely meet designers, data analysts, or frontend developers based in Oye to build hackathon solutions.
* **Hidden Innovations**: Brilliant final-year projects and open-source packages often disappear after grading with no public showcase.
* **Isolated Discussions**: Campus announcements, hostel gists, and departmental updates lack a unified, accessible student feed.

**Kampus Konnect bridges this gap** by providing a centralized hub where students from both campuses can link up, collaborate on projects, and thrive together.

---

## 🎯 Target Users

* **FUOYE Students**: Across all departments, faculties, and academic levels (100L – 500L+).
* **Student Developers & Hackers**: Looking for teammates with complimentary skills for national and global hackathons.
* **UI/UX Designers & Creatives**: Seeking real campus software projects to design and showcase in their portfolios.
* **Campus Organizations & Tech Communities**: GDSC FUOYE, NACOS, IEEE, and faculty associations organizing student workshops and conferences.
* **Final-Year Project Builders**: Looking for peer reviewers, testers, and hardware/software co-builders.

---

## 🚀 Key Features

### 1. High-Energy Neo-Brutalist Design System
* Custom color palette anchored in **Deep Purple** (`#57248C`), **Electric Yellow** (`#FFC928`), **Signal Red** (`#F32B35`), **Community Green** (`#08B957`), and **Warm White** (`#FFF9EF`).
* Distinctive typography blending `Bowlby One SC` display titles, `Bricolage Grotesque` section headings, `DM Sans` body text, and `Space Grotesk` metadata.
* Neo-brutalist sticker badges, barcode edge trims, and auto-scrolling ticker ribbons.

### 2. Campus Gists Feed (`/gists`)
* Live student community feed featuring unfiltered campus stories, hostel scoops, exam tips, and tech news.
* Anonymous and handle-based posting with campus attribution (*Oye*, *Ikole*, or *Cross-Campus*).
* Interactive reaction counters with animated emojis: 🔥 **Fire**, 🤯 **Mindblown**, and 😂 **Laugh**.
* Category filter tabs: *All, Campus Gists, Entertainment News, Hostel Chronicles, Tech Buzz, Academic Scoop*.
* "Drop a Gist" modal with client-side form validation and demo simulation receipts.

### 3. Campus Events Directory (`/events`)
* Comprehensive university events calendar spanning tech hackathons, career workshops, and social rallies.
* Multi-dimensional filtering by campus (*Oye Main*, *Ikole*, *Virtual*) and category (*Tech*, *Academic*, *Career*, *Social*, *Sports*).
* Real-time search query matching titles, organizers, tags, and venues.
* Interactive RSVP toggle buttons with instant attendance counter feedback.
* Detailed event modal popup with organizer notes, schedule, and 1-click event link copying.
* Dedicated empty state with filter reset action.

### 4. Student Projects Showcase (`/projects` & `/projects/[id]`)
* Portfolio gallery of student-led software, hardware, and research initiatives.
* Contribution status filters: *All Projects*, *Actively Seeking Teammates*, *In Progress*, and *Completed*.
* Multi-tag skill filters (e.g. *React, Python, Tailwind, Figma, IoT, Arduino*).
* Interactive upvoting counters.
* **Deep-Dive Project Page (`/projects/[id]`)**: Comprehensive breakdown detailing the problem statement, solution architecture, milestones, GitHub repository links, live preview URLs, and team roster.
* **"Express Interest" Application Modal**: A simulated role application flow where students submit their level, department, and pitch to join an open project role.

### 5. Find Teammates / Link-Ups Directory (`/teammates`)
* Directory of students actively seeking teammates for hackathons, final-year research, startups, or open-source builds.
* Filter by project type (*Hackathon, Final Year Project, Open Source, Startup*) and required skills.
* 1-click contact buttons to reach students directly via WhatsApp, GitHub, or Email.
* "Post a Link-Up Request" modal with field validation and immediate card rendering.

### 6. Accessibility & Inclusivity
* Fully responsive navigation drawer with keyboard focus indicators.
* Landmark "Skip to main content" link for screen-reader and keyboard users.
* WCAG 2.1 contrast-compliant dark typography on light/yellow backgrounds.
* Accessible modal dialogs with `role="dialog"`, `aria-modal="true"`, and keyboard `Escape` dismissal.

---

## 📸 Screenshots & Visual Design

The visual direction draws inspiration from bold, youth-centric collage posters, sticker graphics, and festival art:

| Section | Preview / Description |
| :--- | :--- |
| **Hero & Ticker** | Bold typography headline with rotating sticker badges, floating marquee ticker, and dual-campus call to action. |
| **Campus Gists (`/gists`)** | Card-based feed with live reaction toggles (🔥, 🤯, 😂) and category pills. |
| **Events Hub (`/events`)** | Date badge cards, interactive RSVP spot toggle, and modal deep-dive dialog. |
| **Projects Showcase (`/projects`)** | Skill tag chips, contribution badges, upvote counters, and role listings. |
| **Teammates Directory (`/teammates`)** | Student profile cards with direct 1-click WhatsApp/GitHub contact link-ups. |

*(For pull requests modifying visual layouts, please include before/after screenshots in your PR description).*

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) | Static site generation (SSG) & server components |
| **Language** | [TypeScript 5.6](https://www.typescriptlang.org/) | Strict static typing and code reliability |
| **Library** | [React 18](https://react.dev/) | Client-side reactive UI state and hooks |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) | Utility-first responsive styling and CSS variables |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, accessible SVG vector icons |
| **AI Integration** | [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai) | Gemma 2 / Gemini API client SDK |
| **Typography** | Google Fonts | `Bowlby One SC`, `Bricolage Grotesque`, `DM Sans`, `Space Grotesk` |

---

## 📁 Project Folder Structure

```text
kampus-konnect/
├── .github/                         # GitHub community templates
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md            # Bug report template
│   │   ├── feature_request.md       # Feature request template
│   │   └── hacktoberfest_task.md    # Hacktoberfest task claim template
│   └── PULL_REQUEST_TEMPLATE.md     # Pull request checklist template
├── src/
│   ├── app/                         # Next.js 14 App Router routes
│   │   ├── error.tsx                # Global runtime error boundary
│   │   ├── globals.css              # Custom tokens, fonts, sticker shadows
│   │   ├── layout.tsx               # Root layout, navigation, footer, skip link
│   │   ├── loading.tsx              # Global loading suspense indicator
│   │   ├── not-found.tsx            # Custom branded 404 page
│   │   ├── page.tsx                 # Homepage hub
│   │   ├── events/
│   │   │   └── page.tsx             # Campus events directory & detail modal
│   │   ├── gists/
│   │   │   └── page.tsx             # Campus gists feed & drop-a-gist modal
│   │   ├── projects/
│   │   │   ├── page.tsx             # Student projects showcase & skill filter
│   │   │   └── [id]/
│   │   │       └── page.tsx         # Project detail & simulated application modal
│   │   └── teammates/
│   │       └── page.tsx             # Find teammates directory & link-up modal
│   ├── components/
│   │   ├── brand/
│   │   │   ├── BarcodeTrim.tsx      # Neo-brutalist barcode edge ribbons
│   │   │   ├── Logo.tsx             # Responsive wordmark logo with badge
│   │   │   ├── MarqueeTicker.tsx    # Animated dual-campus announcement ticker
│   │   │   └── Sticker.tsx          # Reusable angled badge with emoji
│   │   └── layout/
│   │       ├── DemoDisclaimer.tsx   # Front-end prototype demo banner
│   │       ├── Footer.tsx           # Campus hubs directory & footer links
│   │       └── Navbar.tsx           # Sticky nav, active route indicators, mobile drawer
│   └── data/
│       └── mockData.ts              # Structured TypeScript sample datasets for FUOYE
├── .env.example                     # Safe environment variable template
├── .gitignore                       # Ignored build, secret, and OS files
├── CODE_OF_CONDUCT.md               # Contributor Covenant v2.1
├── CONTRIBUTING.md                  # Beginner-friendly contribution guidelines
├── LICENSE                          # Apache License 2.0
├── next.config.js                   # Next.js compiler configuration
├── NOTICE                           # Apache-2.0 attribution notice
├── package.json                     # Project manifest and scripts
├── tailwind.config.ts               # Custom color tokens, radii, shadows
└── tsconfig.json                    # TypeScript compiler options
```

---

## 📋 Prerequisites

Before setting up the project locally, make sure you have:
* **Node.js**: `v18.17.0` or higher ([Download Node.js](https://nodejs.org/))
* **npm**: `v9.0.0` or higher (comes bundled with Node.js)
* **Git**: Installed and configured on your machine ([Download Git](https://git-scm.com/))

---

## 💻 Local Setup & Installation

Follow these steps to run Kampus Konnect on your local machine:

### 1. Clone the Repository
```bash
git clone https://github.com/Teryl-UI/KAMPUS-KONNECT.git
cd KAMPUS-KONNECT
```

### 2. Install Project Dependencies
```bash
npm install
```

---

## 🔑 Environment Variables

The project includes a safe `.env.example` file. Copy it to create your local `.env.local`:

```bash
# On Linux / macOS / Git Bash:
cp .env.example .env.local

# On Windows PowerShell:
Copy-Item .env.example .env.local
```

### Environment Variables Overview:
```ini
# Google AI Studio / Gemma API Key (Optional for prototype UI testing)
# Get a free key at: https://aistudio.google.com/
GEMMA_API_KEY=your_gemma_api_key_here

# Gemma Model Variant
GEMMA_MODEL=gemma-2-9b-it
```

> [!CAUTION]
> **Never commit your `.env.local` or real API keys to GitHub!** All `.env` files (except `.env.example`) are strictly ignored in `.gitignore`.

---

## 🏃 Running, Building & Testing

### Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to view the application with Hot-Module-Replacement (HMR).

### Build for Production
To verify that all TypeScript types, routes, and server components compile cleanly:
```bash
npm run build
```

### Run Production Server
To preview the generated production build locally:
```bash
npm run start
```

### Run Linting Checks
```bash
npm run lint
```

---

## 👥 Contributing

We actively welcome contributions for **Hacktoberfest** and beyond!

1. Read our **[CONTRIBUTING.md](./CONTRIBUTING.md)** for a step-by-step guide on creating branches, coding standards, and opening pull requests.
2. Review our **[CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)** to understand community standards.
3. Check the [Issues](../../issues) tab for issues labeled `good first issue` or `hacktoberfest`.

---

## 🗺️ Project Roadmap

- [x] **Phase 1: Brand & Visual Identity**
  - [x] Neo-brutalist expressive design system with custom palette and typography.
  - [x] High-energy stickers, barcodes, and marquee tickers.
- [x] **Phase 2: Core User Journeys (Frontend Prototype)**
  - [x] Campus Gists feed with live emoji reactions and filtering.
  - [x] Events directory with search, campus/category filters, and RSVP counter.
  - [x] Projects showcase with skill filters, upvotes, and detailed view.
  - [x] Find Teammates board with direct WhatsApp/Email/GitHub channels.
  - [x] Keyboard accessibility, custom 404, loading states, and error boundary.
- [ ] **Phase 3: Database & Production Backend (Hacktoberfest Tasks)**
  - [ ] Connect Supabase / PostgreSQL database for persistent gists and events.
  - [ ] Student email verification (`@fuoye.edu.ng`) and authentication.
  - [ ] Push notifications for upcoming campus events and link-up replies.
- [ ] **Phase 4: Gemma AI Integration**
  - [ ] Gemma-powered teammate matchmaking based on project requirements and student skills.
  - [ ] Automated content safety moderation for anonymous campus gists.
  - [ ] Natural language conversational search for campus activities.

---

## 🙏 Acknowledgements

* **Federal University Oye-Ekiti (FUOYE)** student community for feedback, project ideas, and cultural inspiration.
* **[Hacktoberfest](https://hacktoberfest.com/)** for fostering open-source collaboration worldwide.
* **[Google DeepMind & Google AI Studio](https://aistudio.google.com/)** for the Gemma open models.
* **[Lucide](https://lucide.dev/)** for open-source vector iconography.

---

## 📜 License

This project is licensed under the **Apache License 2.0** ([SPDX: Apache-2.0](https://spdx.org/licenses/Apache-2.0.html)).  
See the **[LICENSE](./LICENSE)** file for full terms and conditions.

```text
Copyright 2026 [Copyright Holder - To Be Confirmed]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0
```
