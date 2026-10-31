import { NextRequest, NextResponse } from "next/server";
import { enhanceDescription, matchTeammates, askCampusCopilot, codeWithAgent } from "@/lib/gemma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, payload } = body;

    if (!action) {
      return NextResponse.json({ error: "Missing action parameter" }, { status: 400 });
    }

    if (action === "enhance") {
      const { text, type } = payload || {};
      if (!text) {
        return NextResponse.json({ error: "Text is required to enhance" }, { status: 400 });
      }
      const result = await enhanceDescription(text, type || "event");
      return NextResponse.json({ success: true, data: result });
    }

    if (action === "match") {
      const { skills, lookingFor, posts } = payload || {};
      const result = await matchTeammates(skills || [], lookingFor || "", posts || []);
      return NextResponse.json({ success: true, data: result });
    }

    if (action === "ask") {
      const { question, context } = payload || {};
      if (!question) {
        return NextResponse.json({ error: "Question is required" }, { status: 400 });
      }
      const result = await askCampusCopilot(question, context || "FUOYE Oye and Ikole Campuses");
      return NextResponse.json({ success: true, data: result });
    }

    if (action === "code") {
      const { mode, prompt, language } = payload || {};
      if (!prompt) {
        return NextResponse.json({ error: "Prompt/code is required" }, { status: 400 });
      }
      const result = await codeWithAgent(mode || "scaffold", prompt, language || "TypeScript");
      return NextResponse.json({ success: true, data: result });
    }

    return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
  } catch (error: any) {
    console.error("API /api/gemma error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error connecting to Gemma" },
      { status: 500 }
    );
  }
}
