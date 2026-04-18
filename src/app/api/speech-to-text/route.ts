import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get("audio") as File;

    if (!audioFile) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      return NextResponse.json(
        { error: "Groq API key not configured" },
        { status: 500 }
      );
    }

    console.log(`✓ Sending audio to Groq Whisper (${audioFile.size} bytes)`);

    // Create FormData for Groq API (OpenAI-compatible)
    const groqFormData = new FormData();
    groqFormData.append("file", audioFile);
    groqFormData.append("model", "whisper-large-v3");

    // Call Groq Whisper API
    const response = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${groqApiKey}`,
      },
      body: groqFormData,
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Groq API Error:", error);
      return NextResponse.json(
        { error: `Failed to transcribe audio: ${error.error?.message || "Unknown error"}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log(`✓ Groq Whisper transcription received: "${data.text}"`);

    return NextResponse.json({
      text: data.text,
    });
  } catch (error) {
    console.error("Speech-to-text error:", error);
    return NextResponse.json(
      { error: "Failed to process audio" },
      { status: 500 }
    );
  }
}
