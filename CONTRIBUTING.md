# Contributing to Campus Connect (FUOYE) 🎓🚀

Welcome to the **Campus Connect** open-source repository! We are participating in **Hacktoberfest** and building this platform to empower students across the Federal University Oye-Ekiti (FUOYE) community.

Whether you are a seasoned coder, a beginner who just learned Git, or a UI/UX designer, **there is a place for you here.**

---

## 🎃 Hacktoberfest Participation Rules
1. PRs must add meaningful value (new features, UI improvements, bug fixes, or documentation updates). Spam PRs or trivial typo changes will be marked as `invalid`.
2. Please claim or comment on an issue before starting work to avoid duplicate effort.
3. Once your PR is reviewed and merged, it will count towards your Hacktoberfest contributions!

---

## 👥 How to Contribute by Role

### 🎨 For UI/UX Designers
- **Design System**: Help build and refine our Figma component library (buttons, inputs, cards, dialogs).
- **Mobile First**: Help design intuitive mobile screens for students accessing the platform on smartphones.
- **Illustration & Assets**: Design empty state graphics, icons, and FUOYE campus badges.
- **UX Audits**: Test the live platform and submit issues with Figma screenshots suggesting usability improvements.

### 💻 For Frontend Developers
- Build reusable React / Tailwind CSS components in `src/components/`.
- Enhance accessibility (ARIA labels, keyboard navigation, color contrast).
- Add interactive micro-animations (e.g., event bookmarking, filter animations).
- Optimize bundle size and image loading for students on limited data plans.

### 🛠️ For Backend & AI Developers
- Enhance the Gemma AI prompt engineering in `src/lib/gemma.ts`.
- Expand capabilities: skill extraction, matchmaking logic, natural language event query parsing.
- Connect PostgreSQL / Supabase storage and authentication.

---

## 🛠️ Getting Started (Local Development)

### 1. Fork and Clone
```bash
# Clone your fork
git clone https://github.com/<your-username>/campus-connect.git
cd campus-connect
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
```bash
cp .env.example .env.local
```
Add your Gemma API key (from [Google AI Studio](https://aistudio.google.com/)).

### 4. Run the Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌿 Git & Pull Request Guidelines

1. **Create a branch**:
   ```bash
   git checkout -b feature/event-filters
   # or
   git checkout -b fix/mobile-nav-toggle
   ```
2. **Commit your changes**:
   Write clear, descriptive commit messages:
   ```bash
   git commit -m "feat: add campus filter for Oye and Ikole campuses"
   ```
3. **Push to GitHub**:
   ```bash
   git push origin feature/event-filters
   ```
4. **Open a Pull Request**:
   - Provide a clear title and description.
   - Attach screenshots or GIFs for any UI changes.
   - Reference any relevant issues (e.g. `Closes #12`).

---

## 📜 Code of Conduct
Be respectful, welcoming, and supportive. We are all students and peers learning together!

