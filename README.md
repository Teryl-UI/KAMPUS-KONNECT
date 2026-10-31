# 🎓 Campus Connect (FUOYE) 🚀
### Open-Source Student Collaboration Platform for Federal University Oye-Ekiti
*Built for Hacktoberfest 2026 • Powered by Google Gemma AI*

[![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-2026-ff7a59.svg)](https://hacktoberfest.com)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Google Gemma AI](https://img.shields.io/badge/Google_Gemma-AI_Copilot-4285F4.svg)](https://ai.google.dev/gemma)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🌟 Overview

**Campus Connect** is an open-source student platform built to bridge the gap between students across **Federal University Oye-Ekiti (FUOYE)**, uniting the **Oye Main Campus** and **Ikole Engineering/Agriculture Campus**.

Students often miss out on hackathons, struggle to find skilled teammates across faculties, or lack a centralized showcase for their semester and final-year tech projects. Campus Connect solves this with an intuitive, mobile-first hub supercharged by **Google Gemma AI**.

---

## ✨ Core Features

### 1. 📅 Campus Events & Workshops
* Real-time directory of hackathons, department symposiums, tech meetups (GDG FUOYE, NACOS, NUESA, IEEE), and sports fixtures.
* Filter by Campus (**Oye**, **Ikole**, **Virtual**) and Category (**Tech**, **Academic**, **Career**, **Sports**).
* One-click RSVP and attendance counter.
* Add events directly with AI-assisted description formatting.

### 2. 🤝 Teammate & Project Matcher
* Post collaboration requests for **Hackathons**, **Final Year Projects**, **Startups**, and **Open Source** ventures.
* Specify exact roles needed (*UI/UX Designer, Backend Dev, Embedded/IoT Engineer, Technical Writer*).
* Direct 1-click **WhatsApp / GitHub** contact links for instant communication.

### 3. 🚀 Student Project Showcase
* Showcase live websites, mobile apps, hardware prototypes, and research built by FUOYE students.
* Upvote student innovations.
* Direct links to GitHub repositories and live demos.

### 4. 🤖 Google Gemma AI Campus Copilot
* **Post Polisher**: Transforms rough event or collaboration blurbs into structured, engaging markdown announcements with relevant hashtags.
* **Smart Matchmaker**: Takes student skills (e.g. `React, Figma, Python`) and matches them with active project posts, providing actionable collaboration advice.
* **Campus Q&A Copilot**: Answers student questions about tech clubs, open-source best practices, and campus collaboration.

---

## 🛠️ Tech Stack

* **Frontend**: [Next.js 14](https://nextjs.org/) (App Router, TypeScript, React 18)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Mobile-first, custom FUOYE green & gold palette)
* **Icons**: [Lucide React](https://lucide.dev/)
* **AI Engine**: [Google Gemma AI](https://ai.google.dev/gemma) via `@google/generative-ai`
* **Backend Database Ready**: Designed for seamless integration with [Supabase](https://supabase.com/) (PostgreSQL & Storage)

---

## 🚀 Quickstart (Local Development)

### Prerequisites
* [Node.js](https://nodejs.org/) v18 or newer
* Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/campus-connect-fuoye.git
cd campus-connect-fuoye
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Copy the example environment file:
```bash
cp .env.example .env.local
```
Add your Gemma API key (from [Google AI Studio](https://aistudio.google.com/)):
```env
GEMMA_API_KEY=your_api_key_here
GEMMA_MODEL=gemma-2-9b-it
```

### Step 4: Run Development Server
```bash
npm run dev
```
Visit **[http://localhost:3000](http://localhost:3000)** in your browser!

---

## 🎃 Contributing for Hacktoberfest

We warmly welcome contributions from **all students and open-source enthusiasts**, regardless of experience!

* 🎨 **UI/UX Designers**: Contribute Figma screens, responsive layouts, illustrations, and design tokens.
* 💻 **Frontend Developers**: Build reusable components, optimize animations, and enhance mobile responsiveness.
* 🛠️ **Backend / AI Developers**: Improve Gemma prompt engineering, add Supabase database models, and build API endpoints.
* 📝 **Technical Writers**: Enhance documentation, write tutorials for students, and polish README guides.

👉 **Read our [CONTRIBUTING.md](./CONTRIBUTING.md) guide to get started with your first Pull Request!**

---

## 📜 Project Roadmap

- [x] Initial Architecture & Mobile-First Component Library
- [x] Campus Events Board (Oye & Ikole Campuses)
- [x] Teammate Collaboration Board with WhatsApp Direct Contact
- [x] Student Project Showcase with Upvotes
- [x] Google Gemma AI Integration (Post Polisher, Teammate Matcher, Campus Q&A)
- [ ] Supabase PostgreSQL Database & Real-Time Auth
- [ ] FUOYE Matric Number / Student Email Verification Badge
- [ ] Push Notifications for Upcoming Campus Events

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE) — free and open for student collaboration.

