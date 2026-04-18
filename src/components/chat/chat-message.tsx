"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Pause, Volume2 } from "lucide-react";

export interface ChatMessageProps {
  content: string;
  role: "user" | "assistant";
  isLoading?: boolean;
  onPlayAudio?: () => void;
  isPlaying?: boolean;
}

export function ChatMessage({ 
  content, 
  role, 
  isLoading = false,
  onPlayAudio,
  isPlaying = false
}: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex w-full items-end gap-3 py-2 animate-fade-in",
        role === "user" ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "px-4 py-3 rounded-2xl max-w-[80%] sm:max-w-[65%] shadow-sm transition-all",
          role === "user"
            ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-br-none"
            : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-none",
          isLoading && "opacity-70"
        )}
      >
        <p className="text-sm leading-relaxed">{content}</p>
        {role === "assistant" && onPlayAudio && (
          <button
            onClick={onPlayAudio}
            className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-xs font-medium text-slate-700 dark:text-slate-300"
            title="Play audio"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                Playing...
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                Listen
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
} 