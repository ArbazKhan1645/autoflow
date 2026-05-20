"use client";

import { useState } from "react";
import { Bot, BrainCircuit, Send, Sparkles, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusPill } from "@/components/ui/status-pill";
import { useAiConsole } from "@/hooks/use-ai";
import { formatDate } from "@/lib/utils";
import type { AiChatMessage } from "@/models";
import { useNotificationStore } from "@/store/notification-store";

export function AiConsoleScreen() {
  const ai = useAiConsole();
  const [messages, setMessages] = useState<AiChatMessage[]>([]);
  const [input, setInput] = useState("");
  const pushToast = useNotificationStore((state) => state.pushToast);
  const visibleMessages = messages.length > 0 ? messages : ai.data?.messages ?? [];

  const sendMessage = () => {
    if (!input.trim()) return;
    const now = new Date().toISOString();
    setMessages((current) => [
      ...(current.length > 0 ? current : ai.data?.messages ?? []),
      {
        id: `local-${Date.now()}`,
        role: "user",
        content: input.trim(),
        createdAt: now,
      },
      {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content:
          "I checked catalog, CRM and inventory context. Best next action: quote compatible in-stock items, attach delivery ETA, and create a follow-up in CRM.",
        createdAt: now,
      },
    ]);
    setInput("");
    pushToast({
      title: "AI response generated",
      message: "Mock assistant used service-ready context from the app layer.",
      severity: "info",
    });
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <SectionHeader
        eyebrow="AI Console"
        title="Support assistant and recommendation engine"
        description="AI chat, product recommendation UI and inquiry assistant built as frontend-ready modules for future AI/backend integration."
        action={<Button><Sparkles className="h-4 w-4" /> Run recommendation</Button>}
      />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Panel className="flex min-h-[640px] flex-col overflow-hidden">
          <div className="border-b border-border-soft p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-primary">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                  AI support chat
                </h2>
                <p className="text-sm text-slate-500">Catalog, CRM and order aware</p>
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {ai.isLoading ? <Skeleton className="h-96" /> : null}
            {visibleMessages.map((message) => (
              <div
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                key={message.id}
              >
                {message.role !== "user" ? (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary">
                    <Bot className="h-4 w-4" />
                  </div>
                ) : null}
                <div
                  className={`max-w-[78%] rounded-lg px-4 py-3 text-sm leading-6 ${
                    message.role === "user"
                      ? "bg-primary text-white"
                      : "bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200"
                  }`}
                >
                  {message.content}
                  <p className="mt-2 text-[11px] font-semibold opacity-60">
                    {formatDate(message.createdAt)}
                  </p>
                </div>
                {message.role === "user" ? (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                    <User className="h-4 w-4" />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <div className="border-t border-border-soft p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Ask about compatibility, stock, margin or follow-up..."
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") sendMessage();
                }}
              />
              <Button aria-label="Send message" size="icon" onClick={sendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel className="p-5">
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">
              Product recommendations
            </h2>
            <div className="mt-4 space-y-3">
              {ai.data?.recommendations.map((recommendation) => (
                <div
                  className="rounded-lg border border-border-soft bg-white p-4 dark:bg-white/5"
                  key={recommendation.id}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-black text-slate-950 dark:text-white">
                        {recommendation.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        {recommendation.reason}
                      </p>
                    </div>
                    <Badge tone="green">{recommendation.confidence}%</Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge tone="blue">{recommendation.customerSegment}</Badge>
                    {recommendation.productIds.map((id) => (
                      <Badge key={id} tone="slate">{id}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="p-5">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                Inquiry assistant
              </h2>
            </div>
            <div className="mt-4 space-y-3">
              {ai.data?.insights.map((insight) => (
                <div className="rounded-lg bg-slate-50 p-4 dark:bg-white/5" key={insight.id}>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-bold text-slate-950 dark:text-white">
                      {insight.inquiry}
                    </p>
                    <StatusPill status={insight.urgency} />
                  </div>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    {insight.detectedVehicle}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-primary">
                    {insight.recommendedAction}
                  </p>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
