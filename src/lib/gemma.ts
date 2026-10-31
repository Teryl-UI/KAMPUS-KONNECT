import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMMA_API_KEY || process.env.GOOGLE_AI_API_KEY || "";
const MODEL_NAME = process.env.GEMMA_MODEL || "gemma-2-9b-it";

// Initialize Google Generative AI client
let genAI: GoogleGenerativeAI | null = null;
if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
}

/**
 * Robust caller with model fallback (tries Gemma-2-9b-it, Gemma-2-2b-it, then Gemini-1.5-flash)
 */
async function callGemmaWithFallback(prompt: string, systemInstruction?: string): Promise<string> {
  if (!API_KEY || !genAI) {
    throw new Error("Gemma API Key is not configured. Please check your .env.local file.");
  }

  const candidateModels = [
    MODEL_NAME,
    "gemma-2-9b-it",
    "gemma-2-2b-it",
    "gemini-1.5-flash"
  ];

  let lastError: any = null;

  for (const modelId of candidateModels) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelId,
        systemInstruction: systemInstruction || "You are Gemma, an AI mentor and software engineering agent for FUOYE Campus Connect (Federal University Oye-Ekiti). You help students build features, write code, debug errors, and collaborate on Hacktoberfest open-source projects."
      });

      const response = await model.generateContent(prompt);
      const text = response.response.text();
      if (text && text.trim().length > 0) {
        return text;
      }
    } catch (err: any) {
      console.warn(`[Gemma API] Model ${modelId} failed:`, err?.message || err);
      lastError = err;
      // Try next model in fallback list
    }
  }

  throw lastError || new Error("Failed to generate content from Gemma.");
}

/**
 * 1. AI Feature: Polish Event or Project Description
 */
export async function enhanceDescription(rawText: string, type: "event" | "project" | "collab"): Promise<{
  enhanced: string;
  suggestedTags: string[];
}> {
  const prompt = `
Task: Rewrite and professionally enhance the following ${type} description for FUOYE (Federal University Oye-Ekiti) students.
Make it engaging, well-formatted with markdown bullet points, clear, and inspiring.
Also provide 4 to 6 relevant tags.

Raw Draft:
"""
${rawText}
"""

Format your response exactly as:
ENHANCED_DESCRIPTION:
<your markdown enhanced version here>

TAGS:
<tag1>, <tag2>, <tag3>, <tag4>
`;

  try {
    const rawOutput = await callGemmaWithFallback(prompt);

    const descMatch = rawOutput.match(/ENHANCED_DESCRIPTION:\s*([\s\S]*?)(?=TAGS:|$)/i);
    const tagsMatch = rawOutput.match(/TAGS:\s*(.*)/i);

    const enhanced = descMatch ? descMatch[1].trim() : rawOutput.trim();
    const suggestedTags = tagsMatch
      ? tagsMatch[1].split(",").map((t) => t.trim().replace(/^#/, "")).filter(Boolean)
      : ["FUOYE", "Collaboration", "OpenSource"];

    return { enhanced, suggestedTags };
  } catch (error: any) {
    console.error("Gemma enhanceDescription error:", error);
    return {
      enhanced: `### 🚀 ${type.toUpperCase()}: Enhanced Overview\n\n${rawText}\n\n* **Campus**: Federal University Oye-Ekiti (FUOYE)\n* **Collaboration**: Open to passionate students across faculties (Science, Engineering, Arts & more).\n* **Goal**: Deliver a high-impact open-source milestone.`,
      suggestedTags: ["FUOYE", "Hacktoberfest", "Tech", "Collaboration"]
    };
  }
}

/**
 * 2. AI Feature: Match Teammates based on required skills & student profile
 */
export async function matchTeammates(
  studentSkills: string[],
  lookingFor: string,
  availablePosts: Array<{ id: string; title: string; skillsRequired: string[]; campus: string }>
): Promise<string> {
  const prompt = `
A FUOYE student with the following skills:
Skills: ${studentSkills.join(", ")}
Looking for: "${lookingFor}"

Here are active collaboration posts on FUOYE Campus Connect:
${JSON.stringify(availablePosts, null, 2)}

Task:
1. Identify the top 2 best-matching collaboration opportunities for this student.
2. Explain briefly why their skillset is a great match.
3. Suggest 1 additional complementary skill they could learn to increase their impact.
Keep your response supportive, concise, and focused on FUOYE campus collaboration.
`;

  try {
    return await callGemmaWithFallback(prompt);
  } catch (error: any) {
    console.error("Gemma matchTeammates error:", error);
    return `Based on your skills (${studentSkills.join(", ")}), you are a strong match for collaborative projects in your department. Check out posts looking for ${studentSkills[0] || "Frontend"} developers in the Collaboration board!`;
  }
}

/**
 * 3. AI Feature: Campus Copilot Q&A
 */
export async function askCampusCopilot(question: string, contextSummary: string): Promise<string> {
  const prompt = `
You are the FUOYE Campus Connect AI Copilot powered by Google Gemma.
Answer this student's inquiry warmly, accurately, and concisely.

Campus Context:
${contextSummary}

Student Question:
"${question}"
`;

  try {
    return await callGemmaWithFallback(prompt);
  } catch (error: any) {
    console.error("Gemma askCampusCopilot error:", error);
    return `Hi fellow FUOYE student! Campus Connect is here to help you find events in Oye and Ikole, connect with teammates for hackathons, and showcase your projects. (Note: Running in offline/preview mode).`;
  }
}

/**
 * 4. AI Feature: Code with Agent (Software Engineering Agent)
 */
export async function codeWithAgent(
  mode: "scaffold" | "debug" | "supabase" | "git_pr",
  userInput: string,
  language?: string
): Promise<string> {
  let promptHeader = "";

  switch (mode) {
    case "scaffold":
      promptHeader = `You are a Senior Full-Stack Engineer and Mentor for FUOYE students.
The student wants to scaffold a production-ready feature or component in ${language || "TypeScript/React/Tailwind"}.
Provide clean, accessible, modern code with brief explanatory comments and setup instructions.`;
      break;

    case "debug":
      promptHeader = `You are an expert Debugging Agent.
The student has encountered an error or buggy code.
1. Diagnose the root cause in simple, beginner-friendly terms.
2. Provide the corrected, copy-paste ready code.
3. Share a practical tip on how to avoid this bug in the future.`;
      break;

    case "supabase":
      promptHeader = `You are a Database Architect for Campus Connect.
Write production-grade PostgreSQL / Supabase SQL commands.
Include table definitions, primary keys, foreign keys, timestamps, and Row-Level Security (RLS) policies so students can only modify their own data.`;
      break;

    case "git_pr":
      promptHeader = `You are a Hacktoberfest Open-Source Mentor for FUOYE students.
Help the student prepare a clean Git workflow and Pull Request.
Provide:
1. Exact terminal Git commands (branch, add, commit, push).
2. A ready-to-use Markdown PR description formatted with summary, changes made, and test steps.`;
      break;
  }

  const prompt = `
${promptHeader}

Student Request:
"""
${userInput}
"""
`;

  try {
    return await callGemmaWithFallback(prompt);
  } catch (error: any) {
    console.error("Gemma codeWithAgent error:", error);
    // Offline / fallback template generator
    if (mode === "scaffold") {
      return `\`\`\`tsx
// Sample Next.js / Tailwind Component Scaffold
import React, { useState } from "react";

export default function CampusFeature() {
  const [active, setActive] = useState(false);

  return (
    <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
      <h3 className="font-bold text-slate-900">Campus Feature</h3>
      <p className="text-sm text-slate-600">Built for FUOYE students.</p>
      <button 
        onClick={() => setActive(!active)}
        className="mt-3 px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium text-xs hover:bg-emerald-700 transition"
      >
        {active ? "Active" : "Activate"}
      </button>
    </div>
  );
}
\`\`\``;
    } else if (mode === "supabase") {
      return `\`\`\`sql
-- Supabase Schema for Campus Connect
create table public.student_profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null,
  faculty text not null,
  department text not null,
  campus text check (campus in ('Oye', 'Ikole')),
  whatsapp_number text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.student_profiles enable row level security;

-- Policies: Anyone can view, only owner can edit
create policy "Public profiles are viewable by everyone" on public.student_profiles for select using (true);
create policy "Users can update their own profile" on public.student_profiles for update using (auth.uid() = id);
\`\`\``;
    } else if (mode === "git_pr") {
      return `### 🌿 Git Commands:
\`\`\`bash
# 1. Create a new branch
git checkout -b feature/my-hacktoberfest-task

# 2. Stage and commit
git add .
git commit -m "feat: implement student feature"

# 3. Push to your fork
git push origin feature/my-hacktoberfest-task
\`\`\`

### 📝 Ready-to-Paste PR Description:
\`\`\`markdown
## Summary
Implemented the requested feature for FUOYE Campus Connect.

## Changes Made
- Added new responsive UI component
- Connected Gemma AI helper endpoint

## Hacktoberfest Checklist
- [x] Tested locally
- [x] Followed CONTRIBUTING.md guidelines
\`\`\``;
    }

    return "Debug Tip: Check that your dependencies are properly imported and that your environment variables are configured in `.env.local`.";
  }
}
