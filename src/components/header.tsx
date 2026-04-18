"use client";

import * as React from "react";
import { ThemeToggle } from "./ui/theme-toggle";
import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-slate-950/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 h-16">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            MindChat
          </h1>
          <p className="text-xs text-slate-400">AI Support</p>
        </div>
      </div>
      <ThemeToggle />
    </header>
  );
} 