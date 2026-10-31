/**
 * Gemma AI Engine for Kampus Konnect (FUOYE)
 * Uses Google Generative AI with built-in resilient fallback for offline/preview environments.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMMA_API_KEY || process.env.GOOGLE_AI_API_KEY || "";
const PREFERRED_MODEL = process.env.GEMMA_MODEL || "gemini-flash-latest";

let genAI: GoogleGenerativeAI | null = null;
if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
}

/**
 * Robust caller with multiple model fallbacks and graceful offline responses
 */
export async function generateGemmaResponse(prompt: string, systemInstruction?: string): Promise<string> {
  if (API_KEY && genAI) {
    const candidateModels = [
      PREFERRED_MODEL,
      "gemini-flash-latest",
      "gemini-3.8-flash",
      "gemma-4-31b-it",
      "gemma-4-26b-a4b-it",
      "gemini-2.5-flash-lite",
    ];

    for (const modelName of candidateModels) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction:
            systemInstruction ||
            "You are Gemma, the student community AI assistant and Hacktoberfest mentor for Kampus Konnect at Federal University Oye-Ekiti (FUOYE). You give friendly, bold, encouraging, and accurate advice for students across Oye Main Campus and Ikole Campus.",
        });

        // Set 8-second timeout so requests never hang
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 8000)
        );

        const responsePromise = model.generateContent(prompt).then((res) => res.response.text());
        const text = await Promise.race([responsePromise, timeoutPromise]);

        if (text && text.trim().length > 0) {
          return text.trim();
        }
      } catch (err: any) {
        console.warn(`[Gemma Engine] Model ${modelName} call bypassed or timed out:`, err?.message || err);
      }
    }
  }

  // Graceful, intelligent contextual fallback
  return getSimulatedGemmaResponse(prompt);
}

/**
 * Intelligent contextual fallback response generator for FUOYE students
 */
function getSimulatedGemmaResponse(prompt: string): string {
  const p = prompt.toLowerCase();

  if (p.includes("match") || p.includes("teammate") || p.includes("skill") || p.includes("role")) {
    return `⚡ **Gemma Matchmaking Analysis**:
Based on your profile, here are high-impact collaboration paths at FUOYE:
* **Recommended Team**: "FUOYE Smart Campus Companion" (Seeking UI/UX & Frontend)
* **Ikole Engineering Synergy**: Connect with 400L Mechatronics students working on IoT Agriculture telemetry.
* **Pro-Tip**: Join the Hacktoberfest squad on the **/teammates** board to submit your link-up request!`;
  }

  if (p.includes("event") || p.includes("hackathon") || p.includes("workshop") || p.includes("venue")) {
    return `⚡ **Gemma Campus Calendar Scout**:
* **Top Upcoming Event**: *FUOYE Hacktoberfest Sprint '26* at Science Lecture Theatre B (Oye Campus).
* **Engineering Workshop**: *Embedded Systems & IoT Lab* taking place at the Engineering Complex (Ikole Campus).
* **Next Step**: Head over to **/events** to RSVP your spot and add it to your calendar!`;
  }

  if (p.includes("gist") || p.includes("news") || p.includes("trending")) {
    return `🔥 **Gemma Scoop**:
Trending right now across Oye & Ikole:
* Students are teaming up across faculties for national hackathons.
* The shuttle link-ups between campuses are seeing record coordination.
* Check out **/gists** to read what your fellow students are talking about!`;
  }

  return `⚡ **Greetings from Gemma on Kampus Konnect!**
I'm your AI guide for Federal University Oye-Ekiti students. I can help you:
1. **Find Hackathon Teammates**: Match your skills with open project roles.
2. **Discover Campus Events**: Explore workshops and meetups in Oye & Ikole.
3. **Refine Project Pitches**: Turn your final-year project into a winning open-source repo.

What are you building or exploring today?`;
}
