"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { ChatContainer } from "@/components/chat/chat-container";
import { LoadingScreen } from "@/components/loading-screen";
import { ArrowRight, Zap, Heart, Lightbulb } from "lucide-react";

// Modern startup-style landing section
const HeroSection = ({ onStartChat }: { onStartChat: () => void }) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        <div className="mb-6 inline-flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">AI-Powered Support</span>
          </div>
        </div>
        
        <h1 className="text-5xl sm:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Your Personal
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Support Assistant
          </span>
        </h1>
        
        <p className="text-lg text-slate-400 mb-8 leading-relaxed">
          Get instant support and guidance whenever you need it. Our AI assistant is here to listen, understand, and help you feel better.
        </p>
        
        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:border-blue-500/30 transition-colors">
            <Heart className="w-5 h-5 text-red-400 mx-auto mb-2" />
            <p className="text-sm text-slate-300">Empathetic</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:border-purple-500/30 transition-colors">
            <Zap className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
            <p className="text-sm text-slate-300">Instant</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:border-pink-500/30 transition-colors">
            <Lightbulb className="w-5 h-5 text-blue-400 mx-auto mb-2" />
            <p className="text-sm text-slate-300">Insightful</p>
          </div>
        </div>
        
        <button
          onClick={onStartChat}
          className="group inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold transition-all hover:shadow-lg hover:shadow-blue-500/50 active:scale-95"
        >
          Start Chatting
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time so the splash screen completes before showing the app
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-slate-950">
      <LoadingScreen isLoading={isLoading} />

      {!isLoading && (
        <>
          <Header />

          {!showChat ? (
            <HeroSection onStartChat={() => setShowChat(true)} />
          ) : (
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="w-full h-[calc(100vh-4rem)] max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                <ChatContainer onBack={() => setShowChat(false)} />
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}
