"use client";

import { useState } from "react";
import { FileText, HelpCircle, ImagePlus, Plus, UploadCloud, Video } from "lucide-react";
import { AdminSheet } from "@/components/admin/admin-sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import { useCatalog } from "@/components/providers/client-config-provider";

type SheetMode = "video" | "faq" | "about" | "banner" | null;

const aboutBlocks = [
  "Premium accessories with fitment support.",
  "Fleet, garage and export-ready fulfillment.",
  "Account checkout with order context and support notes.",
];

export function ContentManagementScreen() {
  const { faqs, storefrontVideos } = useCatalog();
  const [sheet, setSheet] = useState<SheetMode>(null);

  const contentMetrics = [
    { label: "Videos", value: storefrontVideos.length, icon: Video },
    { label: "FAQs", value: faqs.length, icon: HelpCircle },
    { label: "About blocks", value: aboutBlocks.length, icon: FileText },
    { label: "Home banners", value: 4, icon: ImagePlus },
  ];

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <SectionHeader
        eyebrow="CRM Content"
        title="Website content management"
        description="Manage public website videos, FAQs, about us blocks, project banners and home page promotional content."
        action={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => setSheet("faq")}><HelpCircle className="h-4 w-4" /> Add FAQ</Button>
            <Button variant="outline" onClick={() => setSheet("about")}><FileText className="h-4 w-4" /> Edit about</Button>
            <Button onClick={() => setSheet("video")}><Video className="h-4 w-4" /> Upload video</Button>
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-4">
        {contentMetrics.map((metric) => (
          <Panel className="p-5" key={metric.label}>
            <metric.icon className="h-6 w-6 text-primary" />
            <p className="mt-4 text-3xl font-black text-slate-950">{metric.value}</p>
            <p className="text-sm font-bold text-slate-500">{metric.label}</p>
          </Panel>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Panel className="p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-black text-slate-950">Videos section</h2>
            <Button size="sm" onClick={() => setSheet("video")}><Plus className="h-4 w-4" /> Add</Button>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {storefrontVideos.map((video) => (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4" key={video.title}>
                <div className="flex items-center justify-between">
                  <Badge tone="blue">{video.duration}</Badge>
                  <Video className="h-4 w-4 text-primary" />
                </div>
                <p className="mt-4 font-black text-slate-950">{video.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{video.description}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-black text-slate-950">About us details</h2>
            <Button size="sm" variant="outline" onClick={() => setSheet("about")}>Manage</Button>
          </div>
          <div className="mt-5 space-y-3">
            {aboutBlocks.map((block, index) => (
              <div className="rounded-lg border border-slate-200 bg-white p-4" key={block}>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-primary">Block {index + 1}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{block}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <div>
            <h2 className="text-xl font-black text-slate-950">FAQ manager</h2>
            <p className="mt-1 text-sm text-slate-500">Questions displayed on the public FAQ page.</p>
          </div>
          <Button onClick={() => setSheet("faq")}><Plus className="h-4 w-4" /> Add FAQ</Button>
        </div>
        <div className="divide-y divide-slate-200">
          {faqs.map((faq) => (
            <div className="grid gap-4 p-5 lg:grid-cols-[0.7fr_1.3fr_120px]" key={faq.question}>
              <p className="font-black text-slate-950">{faq.question}</p>
              <p className="text-sm leading-6 text-slate-600">{faq.answer}</p>
              <Badge tone="green">Published</Badge>
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-950">Home banners and projects</h2>
            <p className="mt-1 text-sm text-slate-500">Manage hero, company projects, branding offers and promotional banners.</p>
          </div>
          <Button variant="outline" onClick={() => setSheet("banner")}><ImagePlus className="h-4 w-4" /> Add banner</Button>
        </div>
      </Panel>

      <AdminSheet
        open={sheet !== null}
        title={
          sheet === "video"
            ? "Upload video"
            : sheet === "faq"
              ? "Add FAQ"
              : sheet === "about"
                ? "Manage about us detail"
                : "Add home banner"
        }
        description="Content is stored in mock data today; later this form can write into Supabase tables."
        onClose={() => setSheet(null)}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setSheet(null)}>Cancel</Button>
            <Button onClick={() => setSheet(null)}>Save content</Button>
          </div>
        }
        size={sheet === "about" ? "lg" : "md"}
      >
        {sheet === "video" ? (
          <div className="grid gap-4">
            <div className="flex min-h-40 flex-col items-center justify-center rounded-lg border-2 border-dashed border-blue-200 bg-blue-50 p-6 text-center">
              <UploadCloud className="h-8 w-8 text-primary" />
              <p className="mt-3 font-black text-slate-950">Drop video file here</p>
              <p className="mt-1 text-sm text-slate-500">MP4, WebM or hosted embed URL.</p>
            </div>
            <Input placeholder="Video title" />
            <Input placeholder="Duration" />
            <Input placeholder="Thumbnail URL" />
            <textarea className="min-h-28 rounded-lg border border-slate-300 p-3 text-sm" placeholder="Video description" />
          </div>
        ) : sheet === "faq" ? (
          <div className="grid gap-4">
            <Input placeholder="Question" />
            <textarea className="min-h-36 rounded-lg border border-slate-300 p-3 text-sm" placeholder="Answer" />
            <Select defaultValue="Published">
              <option>Published</option>
              <option>Draft</option>
            </Select>
          </div>
        ) : sheet === "about" ? (
          <div className="grid gap-4">
            <Input placeholder="Section headline" />
            <textarea className="min-h-40 rounded-lg border border-slate-300 p-3 text-sm" placeholder="Company about detail" />
            <Input placeholder="Milestone year" />
            <Input placeholder="Milestone text" />
          </div>
        ) : (
          <div className="grid gap-4">
            <Input placeholder="Banner title" />
            <Input placeholder="Image URL" />
            <Input placeholder="CTA link" />
            <textarea className="min-h-28 rounded-lg border border-slate-300 p-3 text-sm" placeholder="Banner copy" />
          </div>
        )}
      </AdminSheet>
    </div>
  );
}
