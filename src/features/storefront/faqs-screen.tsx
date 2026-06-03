"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle, Search } from "lucide-react";
import { PublicPageShell } from "@/components/public/public-page-shell";
import { Panel } from "@/components/ui/card";
import { useCatalog } from "@/components/providers/client-config-provider";
import { cn } from "@/lib/utils";

export function FaqsScreen() {
  const { faqs } = useCatalog();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(0);
  const filtered = faqs.filter((faq) =>
    `${faq.question} ${faq.answer}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <PublicPageShell>
      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">
            FAQs
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-black tracking-normal">
            Answers before you place the order.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Find quick answers about fitment, checkout, bulk orders, exports,
            dispatch and returns.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[330px_1fr] lg:px-8">
          <aside className="space-y-5">
            <Panel className="p-5">
              <div className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                <h2 className="font-black text-slate-950">Search FAQs</h2>
              </div>
              <input
                className="mt-4 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-950 shadow-sm outline-none ring-1 ring-slate-200/80 placeholder:text-slate-500 focus:border-primary focus:ring-4 focus:ring-blue-100"
                placeholder="Search fitment, export, returns..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </Panel>
            <Panel className="p-5">
              <MessageCircle className="h-6 w-6 text-primary" />
              <h3 className="mt-4 text-xl font-black text-slate-950">Still stuck?</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Open the AI chat or send us your vehicle details through the contact page.
              </p>
            </Panel>
          </aside>

          <div className="space-y-3">
            {filtered.map((faq, index) => (
              <button
                className="w-full rounded-lg border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-primary/30"
                key={faq.question}
                type="button"
                onClick={() => setOpen(open === index ? -1 : index)}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 shrink-0 text-primary" />
                    <p className="font-black text-slate-950">{faq.question}</p>
                  </div>
                  <ChevronDown className={cn("h-5 w-5 text-slate-400 transition", open === index && "rotate-180")} />
                </div>
                {open === index ? (
                  <p className="mt-4 pl-8 text-sm leading-7 text-slate-600">{faq.answer}</p>
                ) : null}
              </button>
            ))}
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}
