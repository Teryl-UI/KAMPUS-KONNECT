# Contributing to Kampus Konnect 🎓🚀

Welcome to the **Kampus Konnect** open-source repository! We are participating in **Hacktoberfest** to build and expand an open-source student community platform for the **Federal University Oye-Ekiti (FUOYE)**.

Whether you are a seasoned engineer, a student who just learned Git, or a UI/UX designer making your first open-source contribution, **you are warmly welcomed here!**

---

## 🎃 Hacktoberfest Participation Rules

1. **Quality over Quantity**: Contributions must provide meaningful value (new features, bug fixes, UI improvements, accessibility enhancements, or documentation updates). Spam PRs or trivial whitespace edits will be marked as `invalid`/`spam`.
2. **Claim Before You Build**: Check the [Issues](../../issues) tab and comment on an open issue before you start working on it. This avoids duplicate work. If you have an idea that isn't listed, please open a feature request issue first.
3. **Hacktoberfest Recognition**: Merged, quality pull requests will receive the `hacktoberfest-accepted` label and count toward your Hacktoberfest badge!

---

## 👥 How to Contribute by Role

* **🎨 UI/UX Designers**: Design student community components, mobile screens, badge graphics, empty-state artwork, and provide accessibility audits.
* **💻 Frontend Developers**: Build responsive React components with Next.js 14, TypeScript, and Tailwind CSS; improve keyboard accessibility; add responsive layouts.
* **🛠️ Backend & AI Developers**: Expand Gemma AI matchmaking logic, database schemas (PostgreSQL / Supabase), and mock APIs into production endpoints.
* **📝 Technical Writers**: Enhance setup guides, write tutorials, document component APIs, and improve inline code documentation.

---

## 🚀 Step-by-Step Contribution Workflow

### 1. Fork the Repository
Click the **Fork** button in the top right corner of the GitHub repository page to create a copy of the codebase in your GitHub account.

### 2. Clone Your Fork
Clone your fork to your local computer:
```bash
git clone https://github.com/<your-github-username>/kampus-konnect.git
cd kampus-konnect
```

Add the original repository as an `upstream` remote to keep your fork updated:
```bash
git remote add upstream https://github.com/fuoye-community/kampus-konnect.git
```

### 3. Install Dependencies
Make sure you have **Node.js v18.17+** installed. Then install the project dependencies:
```bash
npm install
```

### 4. Set Up Environment Variables
Copy the safe template `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
*(On Windows PowerShell, use: `Copy-Item .env.example .env.local`)*

> [!CAUTION]
> **Never commit `.env.local` or any API keys to Git!** `.env.local` is already excluded in `.gitignore`.

### 5. Create a Feature Branch
Always create a new branch from `master` for your work. Use a descriptive prefix:
```bash
# For a new feature:
git checkout -b feature/event-calendar-view

# For a bug fix:
git checkout -b fix/mobile-menu-overflow

# For documentation:
git checkout -b docs/update-api-guide
```

### 6. Make Your Changes & Test Locally
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to verify your changes.

Before committing, run the production build to ensure there are no TypeScript or compilation errors:
```bash
npm run build
```

### 7. Commit Your Changes
We follow the **Conventional Commits** standard. Write clear, imperative messages:
```bash
git add .
git commit -m "feat(events): add date range filter for upcoming semester events"
```

Common prefixes:
* `feat:` A new feature or user interaction
* `fix:` A bug fix
* `docs:` Documentation updates
* `style:` Formatting, typography, or styling adjustments without logic change
* `refactor:` Code reorganization that neither fixes a bug nor adds a feature
* `test:` Adding or updating tests
* `chore:` Maintenance tasks, dependency updates

### 8. Push to Your Fork
```bash
git push origin feature/your-feature-name
```

### 9. Open a Pull Request (PR)
1. Navigate to the original repository on GitHub.
2. You will see a banner: **"Compare & pull request"**. Click it.
3. Fill out the PR template:
   * **Title**: Use a concise summary matching your commit.
   * **Description**: Explain what changes were made and why.
   * **Screenshots / GIFs**: Mandatory for any visual or UI changes!
   * **Linked Issue**: Reference the issue you worked on (e.g., `Closes #42`).
4. Submit the pull request. A maintainer will review your work and provide feedback.

---

## 🎨 Code Quality & Conventions

* **TypeScript**: Use strict types where possible. Avoid `any`.
* **Component Architecture**:
  * Pages go in `src/app/` using Next.js 14 App Router conventions.
  * Reusable UI components go in `src/components/`.
  * Brand tokens and neo-brutalist elements go in `src/components/brand/`.
* **Styling**:
  * Use Tailwind CSS utility classes and global CSS variables (`var(--color-purple)`, `var(--color-yellow)`, `var(--color-red)`, `var(--color-green)`, `var(--color-ink)`).
  * Adhere to the established student-community design language (sticker shadows, barcode trims, corner brackets).
* **Accessibility (a11y)**:
  * Maintain readable contrast (dark text on light/yellow backgrounds, white text on deep purple/green).
  * Include `aria-label` on icon-only buttons.
  * Modals must include `role="dialog"`, `aria-modal="true"`, and respond to the `Escape` key.
* **Demo Simulation Transparency**:
  * Clearly tag client-side mock actions with `[DEMO SIMULATION]`.
  * Do not collect or expose real student personal data (matriculation numbers, personal phone numbers, or private emails).

---

## 🐛 Reporting Bugs

If you find a bug:
1. Search existing [Issues](../../issues) to see if it has already been reported.
2. If not, open a new issue using our **Bug Report** template.
3. Include:
   * A clear title
   * Steps to reproduce the bug
   * Expected vs. actual behavior
   * Device, OS, and browser version
   * Screenshots or console error logs if available

---

## 💡 Suggesting Features

Have an awesome idea to make campus life better for FUOYE students?
1. Open a new issue using our **Feature Request** template.
2. Explain the problem students face and how your proposal solves it.
3. Provide mockups, sketches, or user stories where possible.

---

## 📜 Code of Conduct

All contributors are expected to uphold our [Code of Conduct](./CODE_OF_CONDUCT.md). Please be kind, supportive, and inclusive to your fellow students and open-source contributors!
