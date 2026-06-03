"use client";

import Image from "next/image";
import { Award, CheckCircle2, Globe2, PackageCheck, ShieldCheck, Users } from "lucide-react";
import { PublicPageShell } from "@/components/public/public-page-shell";
import { useClientConfig } from "@/components/providers/client-config-provider";
import { Panel } from "@/components/ui/card";

const milestones = [
  ["2019", "Started as a specialist auto accessories supplier."],
  ["2021", "Expanded into lighting, service kits and fleet ordering."],
  ["2024", "Added export-ready fulfillment and structured product data."],
  ["2026", "Built a connected storefront with AI support and account checkout."],
];

const buyerGroups = [
  {
    title: "Retail customers",
    text: "Upgrade cabins and exterior style with confidence.",
    icon: Users,
  },
  {
    title: "Garages",
    text: "Fast-moving service and accessory supply.",
    icon: PackageCheck,
  },
  {
    title: "Fleet buyers",
    text: "Repeat ordering and bulk support.",
    icon: ShieldCheck,
  },
  {
    title: "Export partners",
    text: "Packing and commercial details for global buyers.",
    icon: Globe2,
  },
];

export function AboutScreen() {
  const config = useClientConfig();
  return (
    <PublicPageShell>
      <section className="relative overflow-hidden bg-slate-950 py-20 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1800&q=85')] bg-cover bg-center opacity-36" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/88 to-blue-950/55" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">
            About us
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black tracking-normal">
            We are building the auto parts store customers can trust before they buy.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            {config.storeName} focuses on premium accessories, correct fitment, clean
            ordering and reliable fulfillment for everyday drivers, garages, fleets and export buyers.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">
              Our promise
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-normal text-slate-950">
              Premium look, practical operation.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              We do not want customers guessing between random products. Every
              product should feel easy to understand, easy to compare and easy to order.
            </p>
            <div className="mt-6 space-y-3">
              {[
                "Clear product categories and fitment notes.",
                "Real support for accessories, service parts and export inquiries.",
                "Account checkout that keeps cart and order context together.",
              ].map((item) => (
                <div className="flex items-center gap-3 font-bold text-slate-700" key={item}>
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {buyerGroups.map((group) => (
              <Panel className="p-6" key={group.title}>
                <group.icon className="h-7 w-7 text-primary" />
                <h3 className="mt-5 text-xl font-black text-slate-950">{group.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{group.text}</p>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="relative min-h-[430px] overflow-hidden rounded-lg">
            <Image
              alt="Auto parts team"
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              src="https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1400&q=80"
            />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">
              Company journey
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-normal text-slate-950">
              Built step by step from counter sales to connected commerce.
            </h2>
            <div className="mt-6 space-y-4">
              {milestones.map(([year, text]) => (
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-5" key={year}>
                  <p className="text-2xl font-black text-primary">{year}</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8">
            <Award className="h-8 w-8 text-primary" />
            <h2 className="mt-5 text-4xl font-black tracking-normal text-slate-950">
              Our standard is simple: make the customer feel sure.
            </h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600">
              Sure about fitment, sure about price, sure about dispatch and sure
              that support will understand the product. That is the reason behind
              every screen in this customer website.
            </p>
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}
