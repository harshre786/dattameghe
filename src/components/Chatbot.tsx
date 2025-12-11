"use client";

import React, { useEffect, useRef, useState } from "react";

type Msg = {
  text: string;
  sender: "user" | "bot";
  ts: string;
};

const suggestions = [
  "When is the next ISS pass?",
  "Show upcoming meteor showers",
  "Explain Kp-index",
  "How do satellites help Earth?",
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // clear chat
  const handleClear = () => setMessages([]);

  // export chat
  const handleExport = () => {
    const lines = messages.map(
      (m) =>
        `[${new Date(m.ts).toLocaleString()}] ${m.sender.toUpperCase()}: ${
          m.text
        }`
    );
    const blob = new Blob([lines.join("\n\n")], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `astrobot_chat_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSendMessage = async (text?: string) => {
    const msgText = (text ?? inputValue).trim();
    if (!msgText) return;

    const userMsg: Msg = {
      text: msgText,
      sender: "user",
      ts: new Date().toISOString(),
    };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputValue("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msgText }),
      });

      const data = await res.json();
      const botMsg: Msg = {
        text: data.response || "Sorry, I couldn't respond.",
        sender: "bot",
        ts: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          text: "Something went wrong.",
          sender: "bot",
          ts: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-sky-500 hover:bg-sky-400 text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center"
      >
        🤖
      </button>

      {isOpen && (
        <div className="mt-3 w-80 md:w-96 h-[520px] flex flex-col rounded-2xl bg-slate-900/70 border border-slate-800 shadow-2xl backdrop-blur-lg overflow-hidden">
          {/* ============================
              HEADER (buttons moved here)
          ============================== */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/60 bg-slate-900/60">
            {/* left section: avatar + title */}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center text-white font-bold shadow-inner">
                A
              </div>
              <div>
                <div className="text-sm font-semibold">AstroBot</div>
                <div className="text-xs text-slate-400">
                  Your space assistant
                </div>
              </div>
            </div>

            {/* right section: export, clear, close */}
            <div className="flex items-center gap-2">
              {/* Export */}
              <button
                onClick={handleExport}
                className="text-xs bg-slate-800/60 px-2 py-1 rounded text-slate-200 hover:bg-slate-800/80"
              >
                Export
              </button>

              {/* Delete/Clear */}
              <button
                onClick={handleClear}
                className="text-xs bg-red-600/80 px-2 py-1 rounded text-white hover:bg-red-600"
              >
                Clear
              </button>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-300 hover:bg-slate-700 rounded"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Suggestions */}
          <div className="px-3 py-2 border-b border-slate-800/50">
            <div className="flex gap-2 overflow-x-auto py-1">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSendMessage(s)}
                  className="flex-shrink-0 rounded-full bg-slate-800/50 px-3 py-1 text-xs text-slate-200 hover:bg-slate-700/70"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {/* Avatar */}
                {m.sender === "bot" && (
                  <div className="mr-2">
                    <div className="h-7 w-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                      A
                    </div>
                  </div>
                )}

                {/* Bubble */}
                <div
                  className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm
                  ${
                    m.sender === "user"
                      ? "bg-sky-500 text-slate-900"
                      : "bg-slate-800/70 text-white"
                  }`}
                >
                  {m.text}
                </div>

                {m.sender === "user" && (
                  <div className="ml-2">
                    <div className="h-7 w-7 rounded-full bg-sky-400 flex items-center justify-center text-white text-xs font-bold">
                      U
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                  A
                </div>
                <div className="flex gap-1">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-slate-800/60 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
              placeholder="Ask AstroBot..."
              className="flex-1 rounded-lg bg-slate-900/60 border border-slate-800/60 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <button
              disabled={!inputValue.trim()}
              onClick={() => handleSendMessage()}
              className="rounded-lg bg-sky-500 px-4 py-2 text-slate-900 text-sm hover:bg-sky-400 disabled:opacity-40"
            >
              Send
            </button>
          </div>

          <style jsx>{`
            .dot {
              width: 6px;
              height: 6px;
              border-radius: 999px;
              background-color: white;
              animation: bounce 1.2s infinite ease-in-out;
            }
            .dot:nth-child(2) {
              animation-delay: 0.2s;
            }
            .dot:nth-child(3) {
              animation-delay: 0.4s;
            }

            @keyframes bounce {
              0% {
                transform: translateY(0);
                opacity: 0.5;
              }
              50% {
                transform: translateY(-5px);
                opacity: 1;
              }
              100% {
                transform: translateY(0);
                opacity: 0.5;
              }
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
