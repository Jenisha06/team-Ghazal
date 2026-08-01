"use client";

import { useState } from "react";
import {
  Bot,
  MessageCircle,
  Send,
  X,
  Sparkles,
} from "lucide-react";

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const messages = [
    {
      sender: "bot",
      text: "Hello! I'm OpsMemory AI.",
    },
    {
      sender: "bot",
      text: "Ask me about previous ATM incidents, repair recommendations, or ticket history.",
    },
    {
      sender: "user",
      text: "Show similar UPS Controller failures.",
    },
    {
      sender: "bot",
      text: "I found 18 similar incidents. The highest success rate repair was UPS Controller Replacement.",
    },
  ];

  return (
    <>
      {/* Floating Button */}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-8 right-8 z-50 h-16 w-16 rounded-full bg-[#3D2B1F] text-white shadow-2xl flex items-center justify-center transition hover:scale-105"
      >
        {open ? (
          <X className="w-7 h-7" />
        ) : (
          <MessageCircle className="w-7 h-7" />
        )}
      </button>

      {/* Chat Window */}

      {open && (
        <div className="fixed bottom-28 right-8 z-50 flex h-[600px] w-[390px] flex-col overflow-hidden rounded-2xl border border-[#E9E2D4] bg-white shadow-2xl">

          {/* Header */}

          <div className="flex items-center gap-4 border-b border-[#E9E2D4] bg-[#FBF7F1] px-5 py-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3D2B1F] text-white">
              <Bot className="w-6 h-6" />
            </div>

            <div className="flex-1">
              <h2 className="font-semibold text-[#2B2118]">
                OpsMemory AI
              </h2>

              <p className="mt-1 flex items-center gap-1 text-xs text-[#8A8172]">
                <Sparkles className="w-3 h-3" />
                AI Assistant • Online
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="rounded-md p-2 hover:bg-[#F0EAE0]"
            >
              <X className="w-5 h-5 text-[#8A8172]" />
            </button>
          </div>

          {/* Messages */}

          <div className="flex-1 space-y-5 overflow-y-auto bg-[#FCFAF6] px-5 py-6">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    msg.sender === "user"
                      ? "bg-[#3D2B1F] text-white"
                      : "border border-[#E9E2D4] bg-white text-[#2B2118]"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

          </div>

          {/* Input */}

          <div className="border-t border-[#E9E2D4] bg-white p-4">

            <div className="flex items-center gap-3">

              <input
                type="text"
                placeholder="Ask OpsMemory AI..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 rounded-xl border border-[#E9E2D4] px-4 py-3 text-sm outline-none focus:border-[#3D2B1F]"
              />

              <button
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#3D2B1F] text-white transition hover:bg-[#2B1D14]"
              >
                <Send className="w-5 h-5" />
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}