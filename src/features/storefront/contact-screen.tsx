"use client";

import { Mail, MapPin, MessageSquareText, Phone, Send, Truck } from "lucide-react";
import { useState } from "react";
import { PublicPageShell } from "@/components/public/public-page-shell";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import { useNotificationStore } from "@/store/notification-store";

const contactCards = [
  { label: "Phone", value: "+1 214 555 0100", icon: Phone },
  { label: "WhatsApp", value: "+1 214 555 0100", icon: MessageSquareText },
  { label: "Email", value: "support@autoflow.example", icon: Mail },
  {
    label: "Warehouse",
    value: "1800 Logistics Parkway, Dallas, TX",
    icon: MapPin,
  },
  {
    label: "Dispatch",
    value: "Retail, fleet and export shipping",
    icon: Truck,
  },
];

export function ContactScreen() {
  const pushToast = useNotificationStore((state) => state.pushToast);
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "Fitment support",
    message: "",
  });

  return (
    <PublicPageShell>
      <section className="relative overflow-hidden bg-slate-950 py-20 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1800&q=85')] bg-cover bg-center opacity-32" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/86 to-blue-950/60" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">
            Contact us
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-black tracking-normal">
            Tell us your vehicle, and we will help you choose the right part.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Use the form for product fitment, bulk pricing, export orders,
            warranty support or checkout questions.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div className="space-y-4">
            {contactCards.map((card) => (
              <Panel className="p-5" key={card.label}>
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-primary">
                    <card.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.14em] text-slate-500">
                      {card.label}
                    </p>
                    <p className="mt-1 font-black text-slate-950">{card.value}</p>
                  </div>
                </div>
              </Panel>
            ))}
          </div>

          <Panel className="p-6">
            <h2 className="text-3xl font-black tracking-normal text-slate-950">
              Send a message
            </h2>
            <div className="mt-6 grid gap-4">
              <Input
                placeholder="Your name"
                value={form.name}
                onChange={(event) => setForm((state) => ({ ...state, name: event.target.value }))}
              />
              <Input
                placeholder="Email or WhatsApp"
                value={form.email}
                onChange={(event) => setForm((state) => ({ ...state, email: event.target.value }))}
              />
              <Select
                value={form.topic}
                onChange={(event) => setForm((state) => ({ ...state, topic: event.target.value }))}
              >
                <option>Fitment support</option>
                <option>Bulk pricing</option>
                <option>Export order</option>
                <option>Checkout help</option>
                <option>Warranty or return</option>
              </Select>
              <textarea
                className="min-h-40 rounded-lg border border-slate-300 bg-white p-3 text-sm font-medium text-slate-950 shadow-sm outline-none ring-1 ring-slate-200/80 placeholder:font-medium placeholder:text-slate-500 focus:border-primary focus:ring-4 focus:ring-blue-100"
                placeholder="Vehicle make/model/year and the product you need..."
                value={form.message}
                onChange={(event) => setForm((state) => ({ ...state, message: event.target.value }))}
              />
              <Button
                size="lg"
                onClick={() =>
                  pushToast({
                    title: "Message received",
                    message: "Demo contact request saved locally.",
                    severity: "success",
                  })
                }
              >
                <Send className="h-5 w-5" />
                Send message
              </Button>
            </div>
          </Panel>
        </div>
      </section>
    </PublicPageShell>
  );
}
