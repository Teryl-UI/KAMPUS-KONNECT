import { NextResponse } from "next/server";
import {
  executeGemmaPrompt,
  answerCampusQuery,
  matchCollaborators,
  incubateProject,
  summarizeOpportunity,
  learningCompanion,
  improveWriting,
} from "@/lib/gemma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const action = body?.action || "chat";
    const prompt = body?.prompt || "";

    switch (action) {
      case "match_teammates": {
        const skills = Array.isArray(body?.skills) ? body.skills : [body?.skills || "Frontend"];
        const query = body?.query || prompt || "Hackathon team";
        const result = await matchCollaborators(skills, query);
        return NextResponse.json({ success: true, action, data: result });
      }

      case "incubate_project": {
        const idea = body?.idea || prompt || "Campus collaboration app";
        const type = body?.type || "Hackathon";
        const result = await incubateProject(idea, type);
        return NextResponse.json({ success: true, action, data: result });
      }

      case "summarize_opportunity": {
        const id = body?.opportunityId || prompt;
        const result = await summarizeOpportunity(id);
        return NextResponse.json({ success: true, action, data: { summary: result } });
      }

      case "learning_companion": {
        const topic = body?.topic || prompt || "Data structures";
        const mode = body?.mode || "explain";
        const result = await learningCompanion(topic, mode);
        return NextResponse.json({ success: true, action, data: { output: result } });
      }

      case "improve_writing": {
        const text = body?.text || prompt;
        const context = body?.context || "project_announcement";
        const result = await improveWriting(text, context);
        return NextResponse.json({ success: true, action, data: result });
      }

      case "chat":
      default: {
        if (!prompt || typeof prompt !== "string") {
          return NextResponse.json({ error: "Please provide a prompt." }, { status: 400 });
        }
        const response = await answerCampusQuery(prompt);
        return NextResponse.json({
          success: true,
          action: "chat",
          response,
          model: process.env.GEMMA_MODEL || "gemma-4-26b-a4b-it",
          timestamp: new Date().toISOString(),
        });
      }
    }
  } catch (error: any) {
    console.error("Gemma API Route Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gemma processing encountered an issue.",
        fallback: "Gemma is active on Kampus Konnect. Explore /events, /projects, or /teammates!",
      },
      { status: 500 }
    );
  }
}
