"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { useState } from "react";
import { useClientConfig } from "@/components/providers/client-config-provider";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const seedMessages = [
  {
    role: "assistant",
    text: "Hi, I can help find mats, accessories, fitment and order information.",
  },
  {
    role: "assistant",
    text: "Try asking: Do you have MG HS 9D floor mats?",
  },
];

export function AiChatWidget() {
  const config = useClientConfig();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(seedMessages);

  const send = () => {
    if (!input.trim()) return;
    setMessages((current) => [
      ...current,
      { role: "user", text: input.trim() },
      {
        role: "assistant",
        text: "I found matching products and can guide you to the product page, cart, or checkout flow.",
      },
    ]);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {open ? (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mb-4 w-[min(calc(100vw-2rem),390px)] overflow-hidden rounded-lg border border-blue-100 bg-white shadow-2xl shadow-blue-900/20"
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22 }}
          >
            <div className="flex items-center justify-between bg-slate-950 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/12">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-black">{config.storeName} AI</p>
                  <p className="text-xs text-blue-100">Product support assistant</p>
                </div>
              </div>
              <Button aria-label="Close chat" size="icon" variant="ghost" onClick={() => setOpen(false)}>
                <X className="h-5 w-5 text-white" />
              </Button>
            </div>
            <div className="max-h-80 space-y-3 overflow-y-auto bg-slate-50 p-4">
              {messages.map((message, index) => (
                <div
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  key={`${message.role}-${index}`}
                >
                  <div
                    className={`max-w-[82%] rounded-lg px-4 py-3 text-sm leading-6 ${
                      message.role === "user"
                        ? "bg-primary text-white"
                        : "bg-white text-slate-700 shadow-sm"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 border-t border-slate-100 p-3">
              <Input
                placeholder="Ask about products..."
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") send();
                }}
              />
              <Button aria-label="Send chat" size="icon" onClick={send}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <button
        aria-label="Open AI chat"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-2xl shadow-blue-600/30 transition hover:scale-105 hover:bg-blue-700"
        type="button"
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
