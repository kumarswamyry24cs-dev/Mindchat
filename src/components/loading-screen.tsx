"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, Zap, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  isLoading: boolean;
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  const [dotCount, setDotCount] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const dotInterval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(100, prev + 6));
    }, 130);

    return () => {
      clearInterval(dotInterval);
      clearInterval(progressInterval);
    };
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
    }
  }, [isLoading]);

  const dots = ".".repeat(dotCount);
  const progressWidth = `${Math.max(18, progress)}%`;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 transition-opacity duration-500",
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Animated brain icon */}
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-blue-400/20 opacity-75" style={{animationDuration: "2s"}}></div>
          <div className="relative flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-400/30 backdrop-blur-sm">
            <Sparkles className="h-16 w-16 text-blue-400 animate-bounce" />
          </div>
          <Zap className="h-8 w-8 text-yellow-400 absolute -top-3 -right-3 animate-bounce" style={{animationDelay: "0.1s"}} />
          <Lightbulb className="h-8 w-8 text-cyan-400 absolute -bottom-2 -left-2 animate-bounce" style={{animationDelay: "0.2s"}} />
        </div>

        {/* Text content */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            MindChat
          </h1>
          <p className="text-lg text-blue-300/80 font-medium">
            Initializing your personal support buddy{dots}
          </p>
          
          {/* Loading bar */}
          <div className="w-64 h-2 bg-slate-800/50 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-150"
              style={{ width: progressWidth }}
            />
          </div>

          <p className="text-sm text-blue-300/60">
            Preparing voice and text modes...
          </p>
        </div>

        {/* Feature badges */}
        <div className="flex gap-4 justify-center">
          <div className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 backdrop-blur-sm">
            <span className="text-xs text-blue-300 font-semibold">🎤 Voice Input</span>
          </div>
          <div className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 backdrop-blur-sm">
            <span className="text-xs text-purple-300 font-semibold">🔊 Voice Output</span>
          </div>
          <div className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-sm">
            <span className="text-xs text-cyan-300 font-semibold">💬 AI Powered</span>
          </div>
        </div>
      </div>
    </div>
  );
} 