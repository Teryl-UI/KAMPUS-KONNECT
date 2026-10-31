# 🎓 Campus Connect (FUOYE)
### An Open-Source Student Collaboration Platform for Federal University Oye-Ekiti
*Connecting students across Oye Main Campus and Ikole Campus*

[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

---

## 🌟 About the Project

**Campus Connect** is an open-source platform designed to address the unique collaboration needs of students at the **Federal University Oye-Ekiti (FUOYE)**, Nigeria.

Geographically divided between the **Oye Main Campus** (Sciences, Arts, Social Sciences, Management, Education, Pharmacy) and the **Ikole Campus** (Engineering and Agriculture), students often face hurdles discovering technical events, forming multidisciplinary hackathon teams, and sharing their software and hardware projects.

Campus Connect provides a clean, responsive, and mobile-friendly community hub.

---

## 🚀 Key MVP Features

1. **Homepage (`/`)**:
   - Clear value proposition highlighting multi-campus collaboration.
   - Quick navigation pillars for Events, Teammates, and Projects.
   - Live preview of featured upcoming events and open projects.
2. **Campus Events Directory (`/events`)**:
   - Filter by campus (**Oye Main Campus**, **Ikole Campus**, **Virtual**).
   - Filter by category (**Tech**, **Academic**, **Career**, **Social**, **Sports**).
   - Real-time instant search bar.
   - Interactive RSVP attendance toggle with live attendee counters.
   - Clean empty state with a reset filter button when no matches are found.
3. **Student Projects Showcase (`/projects`)**:
   - Comprehensive project gallery with taglines, descriptions, and technology stack badges.
   - Status filters: view all projects or filter specifically for projects **"Seeking Teammates"**.
   - Direct upvote counter with interactive toggle state.
4. **Project Detail View (`/projects/[id]`)**:
   - Detailed project overview and key goals.
   - Complete technology stack overview.
   - Active open team roles with required skills and responsibilities.
   - "How to Get Involved" guidance and direct contact links.
5. **Find Teammates Board (`/teammates`)**:
   - Student collaboration listings for Hackathons, Final Year Projects, Open Source, and Startups.
   - Filter by role needed (e.g. *UI/UX Designer, Python Backend, Hardware/IoT, Technical Writer*).
   - Direct 1-click contact actions via WhatsApp, Email, or GitHub.
6. **Accessible Navigation & Layout**:
   - Responsive navbar with active link indicator and accessible mobile navigation drawer.
   - Transparent demonstration notice banner indicating mock data.
   - Polished university footer with physical campus details and open-source credits.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, TypeScript, React 18)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Mobile-first responsive layouts, custom FUOYE emerald palette)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Model**: Structured TypeScript sample datasets (`src/data/mockData.ts`)

---

## 💻 Local Development Setup

### 1. Prerequisites
- [Node.js](https://nodejs.org/) v18.17 or higher
- Git

### 2. Clone the Repository
```bash
git clone https://github.com/your-username/campus-connect.git
cd campus-connect
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser to test the platform.

### 5. Build for Production
```bash
npm run build
npm start
```

---

## 👥 Contributing

We welcome contributions from students of all departments and skill levels! Please see our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on opening issues, working on features, and submitting pull requests.

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).
