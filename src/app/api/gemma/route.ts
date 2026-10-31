import { NextResponse } from "next/server";
import { generateGemmaResponse } from "@/lib/gemma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prompt = body?.prompt || "";
    const systemInstruction = body?.systemInstruction;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Please provide a valid prompt." }, { status: 400 });
    }

    const response = await generateGemmaResponse(prompt, systemInstruction);

    return NextResponse.json({
      success: true,
      response,
      model: process.env.GEMMA_MODEL || "gemma-ai",
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("API /api/gemma error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gemma processing encountered an issue.",
        fallback: "Hello from Gemma! How can I assist with your FUOYE campus collaboration today?",
      },
      { status: 500 }
    );
  }
}
