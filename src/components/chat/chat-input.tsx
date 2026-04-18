"use client";

import * as React from "react";
import { Send, Mic, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [input, setInput] = React.useState("");
  const [isListening, setIsListening] = React.useState(false);
  const [interimTranscript, setInterimTranscript] = React.useState("");
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const audioChunksRef = React.useRef<Blob[]>([]);
  const streamRef = React.useRef<MediaStream | null>(null);
  const [isReady, setIsReady] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  // Initialize audio recording capability
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const checkAudioSupport = async () => {
      try {
        const constraints = { audio: true };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        // Success - clean up and mark as ready
        stream.getTracks().forEach((track) => track.stop());
        setIsReady(true);
        console.log("✓ Audio recording support available");
      } catch (error) {
        console.warn("Audio recording not supported:", error);
        setIsReady(false);
      }
    };

    // Check on mount
    const timeoutId = setTimeout(checkAudioSupport, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  const startVoiceInput = async () => {
    try {
      console.log("✓ Requesting microphone access...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstart = () => {
        console.log("✓ Voice recording started");
        setIsListening(true);
        setInterimTranscript("");
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Unable to access microphone. Please check permissions.");
      setIsListening(false);
    }
  };

  const stopVoiceInput = async () => {
    if (!mediaRecorderRef.current) return;

    try {
      mediaRecorderRef.current.onstop = async () => {
        console.log("✓ Voice recording ended, processing with Groq Whisper...");
        setIsProcessing(true);

        // Create blob from chunks
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });

        // Send to Groq Whisper API via our backend
        const formData = new FormData();
        formData.append("audio", audioBlob, "recording.webm");

        try {
          const response = await fetch("/api/speech-to-text", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error("Failed to transcribe audio");
          }

          const data = await response.json();
          console.log("✓ Groq Whisper transcription received:", data.text);
          setInput((prev) => (prev + data.text).trim());
          setInterimTranscript("");
        } catch (error) {
          console.error("Transcription error:", error);
          alert("Failed to transcribe audio. Please try again.");
        } finally {
          setIsProcessing(false);
        }
      };

      mediaRecorderRef.current.stop();

      // Stop all tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      setIsListening(false);
    } catch (error) {
      console.error("Error stopping voice:", error);
      setIsListening(false);
      setIsProcessing(false);
    }
  };

  const handleMicClick = () => {
    if (!isReady) {
      alert(
        "Voice input is not supported. Please use a modern browser like Chrome, Edge, or Safari."
      );
      return;
    }

    if (isListening) {
      stopVoiceInput();
    } else {
      startVoiceInput();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalMessage = (input + interimTranscript).trim();

    if (finalMessage) {
      onSend(finalMessage);
      setInput("");
      setInterimTranscript("");

      // Stop listening if active
      if (isListening) {
        stopVoiceInput();
      }
    }
  };

  const isDisabled = disabled || isProcessing;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 border-t border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-800 backdrop-blur-sm"
    >
      {/* Voice feedback display */}
      {(isListening || isProcessing || interimTranscript) && (
        <div className="px-4 py-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
          <div className="flex items-center gap-2 mb-2">
            <div
              className={cn(
                "w-2 h-2 rounded-full",
                isListening
                  ? "bg-red-500 animate-pulse"
                  : isProcessing
                  ? "bg-yellow-500 animate-pulse"
                  : "bg-blue-500"
              )}
            ></div>
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
              {isListening
                ? "🎤 Listening..."
                : isProcessing
                ? "⏳ Processing with Groq Whisper..."
                : "📝 Transcribed"}
            </span>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            {input || interimTranscript || "Waiting for speech..."}
          </p>
        </div>
      )}

      {/* Input field */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or click the mic to speak..."
          className={cn(
            "flex-1 px-4 py-3 rounded-lg border focus:outline-none transition-all",
            "bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100",
            "border-slate-200 dark:border-slate-700",
            "focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
            "placeholder:text-slate-400 dark:placeholder:text-slate-500"
          )}
          disabled={isDisabled}
        />
        <Button
          type="button"
          size="icon"
          onClick={handleMicClick}
          disabled={isDisabled || !isReady}
          className={cn(
            "rounded-lg transition-all hover:shadow-lg flex-shrink-0",
            isListening
              ? "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/50"
              : isProcessing
              ? "bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg shadow-yellow-500/50"
              : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          )}
          title={
            !isReady
              ? "Voice input not supported"
              : isProcessing
              ? "Processing audio..."
              : isListening
              ? "Stop recording (click again)"
              : "Click to start voice input"
          }
        >
          {isListening || isProcessing ? (
            <Square className="h-5 w-5 animate-pulse" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </Button>
        <Button
          type="submit"
          size="icon"
          disabled={isDisabled || !((input + interimTranscript).trim())}
          className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-blue-500/30 flex-shrink-0"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
} 