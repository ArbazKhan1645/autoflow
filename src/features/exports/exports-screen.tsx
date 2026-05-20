"use client";

import { Boxes, Building2, Download, Globe2, MapPin, Ship, Store, Truck } from "lucide-react";
import { BUSINESS_CHANNELS } from "@/constants/app";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SectionHeader } from "@/components/ui/section-header";

const exportLanes = [
  {
    market: "Dubai",
    value: "$94.3k",
    docs: "Commercial invoice, packing list, HS codes",
    progress: 86,
  },
  {
    market: "Lagos",
    value: "$38.8k",
    docs: "CIF quote, freight insurance, carton labels",
    progress: 64,
  },
  {
    market: "Kingston",
    value: "$21.4k",
    docs: "FOB quote, export declaration, pallet plan",
    progress: 52,
  },
];

const localSegments = [
  { label: "Repair shops", accounts: 84, icon: Store },
  { label: "Collision centers", accounts: 31, icon: Building2 },
  { label: "Fleet operators", accounts: 26, icon: Truck },
  { label: "Export buyers", accounts: 12, icon: Ship },
];

export function ExportsScreen() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <SectionHeader
        eyebrow="Export and local business"
        title="Wholesale, fleet and cross-border operations"
        description="Commercial workflows for local business channels, export quote readiness, freight context and document structure."
        action={<Button><Download className="h-4 w-4" /> Export report</Button>}
      />

      <div className="grid gap-4 md:grid-cols-4">
        {localSegments.map((segment) => (
          <Panel className="p-5" key={segment.label}>
            <segment.icon className="h-6 w-6 text-primary" />
            <p className="mt-4 text-2xl font-black text-slate-950 dark:text-white">
              {segment.accounts}
            </p>
            <p className="text-sm font-semibold text-slate-500">{segment.label}</p>
          </Panel>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.75fr]">
        <Panel className="p-5">
          <div className="flex items-center gap-2">
            <Globe2 className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">
              Export lanes
            </h2>
          </div>
          <div className="mt-5 space-y-4">
            {exportLanes.map((lane) => (
              <div className="rounded-lg border border-border-soft bg-white p-4 dark:bg-white/5" key={lane.market}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xl font-black text-slate-950 dark:text-white">
                      {lane.market}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">{lane.docs}</p>
                  </div>
                  <Badge tone="green">{lane.value}</Badge>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    <span>Readiness</span>
                    <span>{lane.progress}%</span>
                  </div>
                  <Progress className="mt-2" value={lane.progress} />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="p-5">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">
              Local channels
            </h2>
          </div>
          <div className="mt-5 grid gap-3">
            {BUSINESS_CHANNELS.map((channel, index) => (
              <div
                className="flex items-center justify-between rounded-lg bg-slate-50 p-4 dark:bg-white/5"
                key={channel}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-primary shadow-sm dark:bg-white/10">
                    <Boxes className="h-4 w-4" />
                  </div>
                  <span className="font-bold">{channel}</span>
                </div>
                <Badge tone={index < 3 ? "blue" : "slate"}>
                  {index < 3 ? "Active" : "Pilot"}
                </Badge>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel className="overflow-hidden">
        <div className="border-b border-border-soft p-5">
          <h2 className="text-lg font-bold text-slate-950 dark:text-white">
            Export document structure
          </h2>
        </div>
        <div className="grid gap-0 divide-y divide-border-soft md:grid-cols-4 md:divide-x md:divide-y-0">
          {[
            "Commercial invoice",
            "Packing list",
            "HS code map",
            "Freight quotation",
          ].map((item) => (
            <div className="p-5" key={item}>
              <p className="font-black text-slate-950 dark:text-white">{item}</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Service-ready placeholder for future generated documents.
              </p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
