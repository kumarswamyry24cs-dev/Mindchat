import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ API key is not configured" },
        { status: 500 }
      );
    }

    // Initialize GROQ client
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    // Call GROQ API with chat completions
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a compassionate and empathetic mental health support chatbot. You are not a licensed therapist but provide supportive conversations.

Guidelines:
- Be warm, empathetic, and non-judgmental
- Listen actively and validate feelings
- Provide thoughtful responses to help users feel understood
- If someone mentions crisis/self-harm, encourage them to seek professional help immediately
- Keep responses concise (2-3 sentences typically)
- Ask follow-up questions to encourage sharing
- Remind users that you're not a replacement for professional mental health care
- Focus on being supportive and helpful`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama-3.3-70b-versatile",
      max_tokens: 1024,
      temperature: 0.7,
    });

    // Extract the response text
    const responseText = completion.choices[0].message.content;

    if (!responseText) {
      return NextResponse.json(
        { error: "Failed to get response from GROQ API" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: responseText });
  } catch (error: unknown) {
    console.error("Error processing chat:", error);
    const err = error as { status?: number; message?: string };

    // Handle specific GROQ API errors
    if (err.status === 401 || err.message?.includes("401")) {
      return NextResponse.json(
        { error: "Invalid GROQ API key" },
        { status: 401 }
      );
    }

    if (err.status === 429 || err.message?.includes("429")) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    console.error("Full error:", err);

    return NextResponse.json(
      { error: "Failed to process your message. Please try again." },
      { status: 500 }
    );
  }
} 