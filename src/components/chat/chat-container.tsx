"use client";

import * as React from "react";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { TypingIndicator } from "./typing-indicator";
import { ArrowLeft, Volume2, VolumeX } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
}

export function ChatContainer({ onBack }: { onBack?: () => void }) {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm here to listen and support you. What's on your mind today?",
      role: "assistant",
    },
  ]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [voiceMode, setVoiceMode] = React.useState(true);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const [playingId, setPlayingId] = React.useState<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const playMessageAudio = (messageId: string, text: string) => {
    if (playingId === messageId) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setPlayingId(messageId);
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setPlayingId(null);
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setPlayingId(null);
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Call the API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: content }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to get response");
      }
      
      const data = await response.json();
      
      // Add assistant message after a short delay to simulate typing
      setTimeout(() => {
        const newMessage = {
          id: Date.now().toString(),
          content: data.message,
          role: "assistant" as const,
        };
        setMessages((prev) => [...prev, newMessage]);
        setIsLoading(false);
        
        // Auto-play the response if voice mode is enabled
        if (voiceMode) {
          playMessageAudio(newMessage.id, data.message);
        }
      }, 800);
    } catch (error) {
      console.error("Error:", error);
      
      // Add error message
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            content: "I'm having trouble connecting right now. Please try again later.",
            role: "assistant",
          },
        ]);
        setIsLoading(false);
      }, 800);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-800/50">
        <div className="flex items-center gap-3 flex-1">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </button>
          )}
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {onBack ? "Chat" : "Support Chat"}
            </h2>
            {isSpeaking && (
              <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"></span>
                AI is speaking...
              </p>
            )}
          </div>
        </div>
        <button
          onClick={() => setVoiceMode(!voiceMode)}
          className={`p-2 rounded-lg transition-colors ${
            voiceMode
              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
              : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
          }`}
          title={voiceMode ? "Voice mode on" : "Voice mode off"}
        >
          {voiceMode ? (
            <Volume2 className="h-5 w-5" />
          ) : (
            <VolumeX className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <ChatMessage 
            key={message.id}
            content={message.content}
            role={message.role}
            onPlayAudio={message.role === "assistant" ? () => playMessageAudio(message.id, message.content) : undefined}
            isPlaying={playingId === message.id}
          />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <ChatInput onSend={handleSendMessage} disabled={isLoading} />
    </div>
  );
}
