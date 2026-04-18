"use client";

import * as React from "react";

export function TypingIndicator() {
  return (
    <div className="flex items-end gap-3 py-2">
      <div className="flex items-center space-x-2 px-4 py-3 rounded-2xl rounded-bl-none bg-slate-100 dark:bg-slate-800 shadow-sm">
        <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
} 