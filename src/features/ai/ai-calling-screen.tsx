"use client";

import { Mic2, PhoneCall, PhoneIncoming, SlidersHorizontal, Volume2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusPill } from "@/components/ui/status-pill";
import { useAiCalling } from "@/hooks/use-ai";
import { formatDate } from "@/lib/utils";

function duration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${minutes}m ${remaining}s`;
}

export function AiCallingScreen() {
  const calling = useAiCalling();
  const statCards = [
    {
      label: "Calls today",
      value: calling.data?.callLogs.length ?? 0,
      icon: PhoneIncoming,
    },
    {
      label: "Quoted calls",
      value:
        calling.data?.callLogs.filter((call) => call.outcome === "quoted").length ??
        0,
      icon: PhoneCall,
    },
    {
      label: "Positive sentiment",
      value:
        calling.data?.callLogs.filter((call) => call.sentiment === "positive")
          .length ?? 0,
      icon: Volume2,
    },
    {
      label: "Auto follow-up",
      value: calling.data?.settings.autoFollowUpEnabled ? "On" : "Off",
      icon: Mic2,
    },
  ];

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <SectionHeader
        eyebrow="AI Calling"
        title="Voice agent operations"
        description="Call logs, follow-up outcomes, sentiment, transcript summaries and voice assistant settings."
        action={<Button><PhoneCall className="h-4 w-4" /> Queue call</Button>}
      />

      <div className="grid gap-4 md:grid-cols-4">
        {statCards.map(({ label, value, icon: Icon }) => (
          <Panel className="p-5" key={label}>
            <Icon className="h-6 w-6 text-primary" />
            <p className="mt-4 text-2xl font-black text-slate-950 dark:text-white">{value}</p>
            <p className="text-sm font-semibold text-slate-500">{label}</p>
          </Panel>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <Panel className="overflow-hidden">
          <div className="border-b border-border-soft p-5">
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">
              Call logs
            </h2>
          </div>
          {calling.isLoading ? (
            <div className="p-5"><Skeleton className="h-96" /></div>
          ) : (
            <div className="divide-y divide-border-soft">
              {calling.data?.callLogs.map((call) => (
                <div className="grid gap-4 p-5 lg:grid-cols-[1fr_170px_150px]" key={call.id}>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-black text-slate-950 dark:text-white">
                        {call.customerName}
                      </p>
                      <Badge tone="slate">{call.phone}</Badge>
                      <StatusPill status={call.outcome} />
                    </div>
                    <p className="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                      {call.intent}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {call.transcriptSummary}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                      Sentiment
                    </p>
                    <StatusPill status={call.sentiment} />
                    <p className="mt-3 text-xs font-semibold text-slate-500">
                      {formatDate(call.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                      Duration
                    </p>
                    <p className="mt-2 text-xl font-black">{duration(call.durationSeconds)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Panel>

        <Panel className="p-5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">
              Voice settings
            </h2>
          </div>
          {calling.data ? (
            <div className="mt-5 grid gap-4">
              <Input value={calling.data.settings.agentName} readOnly />
              <Select defaultValue={calling.data.settings.language}>
                <option>English</option>
                <option>Spanish</option>
                <option>Arabic</option>
              </Select>
              <Input value={calling.data.settings.timezone} readOnly />
              <textarea
                className="min-h-28 rounded-lg border border-slate-200 bg-white p-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-blue-100 dark:border-white/10 dark:bg-white/5"
                defaultValue={calling.data.settings.greeting}
              />
              <Input value={calling.data.settings.escalationPhone} readOnly />
              <div className="flex items-center justify-between rounded-lg bg-blue-50 p-4">
                <div>
                  <p className="font-bold text-slate-950">Auto follow-up</p>
                  <p className="text-sm text-slate-500">Create CRM tasks after calls</p>
                </div>
                <span className="relative h-6 w-11 rounded-full bg-primary">
                  <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white" />
                </span>
              </div>
            </div>
          ) : (
            <Skeleton className="mt-5 h-96" />
          )}
        </Panel>
      </div>
    </div>
  );
}
