"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Boxes, CheckCircle2, Globe2, ShieldCheck, ShoppingBag, Truck, Wrench } from "lucide-react";
import { PublicPageShell } from "@/components/public/public-page-shell";
import { useClient } from "@/components/providers/client-config-provider";
import { buttonClassName } from "@/components/ui/button";
import { Panel } from "@/components/ui/card";

const services = [
  {
    title: "Product sourcing and fitment",
    description:
      "We help customers select correct mats, lighting, accessories and service parts by vehicle model, year and use case.",
    icon: ShoppingBag,
  },
  {
    title: "Interior upgrade packages",
    description:
      "Build complete cabin packages with floor mats, dash mats, console storage, organizers and anti-theft accessories.",
    icon: Wrench,
  },
  {
    title: "Fleet and garage supply",
    description:
      "Repeat buyers can request bulk pricing, recurring service kits and consolidated invoice support.",
    icon: Boxes,
  },
  {
    title: "Export order support",
    description:
      "For overseas buyers we prepare item dimensions, packing notes, invoice structure and shipment readiness.",
    icon: Globe2,
  },
];

const serviceSignals = [
  {
    title: "Fitment assurance",
    text: "Vehicle details are checked before order confirmation.",
    icon: ShieldCheck,
  },
  {
    title: "Fast fulfillment",
    text: "Popular accessories and service parts are staged for dispatch.",
    icon: Truck,
  },
  {
    title: "Export friendly",
    text: "Commercial and packing information can be prepared for overseas buyers.",
    icon: Globe2,
  },
];

export function ServicesScreen() {
  const { href } = useClient();
  return (
    <PublicPageShell>
      <section className="relative overflow-hidden bg-slate-950 py-20 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1800&q=85')] bg-cover bg-center opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-blue-950/78 to-slate-950/55" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">
            Services
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-black tracking-normal">
            Auto parts service built around correct fitment and smooth ordering.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            We combine storefront shopping with real parts-counter support:
            sourcing, fitment checks, premium packages, fleet supply and export handling.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8 xl:grid-cols-4">
          {services.map((service) => (
            <Panel className="p-6" key={service.title}>
              <service.icon className="h-7 w-7 text-primary" />
              <h2 className="mt-5 text-xl font-black text-slate-950">{service.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p>
            </Panel>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div className="relative min-h-[420px] overflow-hidden rounded-lg">
            <Image
              alt="Auto parts service bay"
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              src="https://images.unsplash.com/photo-1599256630445-67b5772b1204?auto=format&fit=crop&w=1400&q=80"
            />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">
              How we work
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-normal text-slate-950">
              A polished order experience from inquiry to dispatch.
            </h2>
            <div className="mt-6 space-y-4">
              {[
                "Search or ask for a product by vehicle, model, year or accessory type.",
                "Our team confirms compatibility, stock and the best available package.",
                "You add to cart, complete account checkout and receive order confirmation.",
                "Dispatch and support details remain attached to your order context.",
              ].map((item) => (
                <div className="flex gap-3 rounded-lg bg-slate-50 p-4" key={item}>
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-success" />
                  <p className="text-sm font-semibold leading-6 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {serviceSignals.map((signal) => (
              <Panel className="p-6" key={signal.title}>
                <signal.icon className="h-7 w-7 text-primary" />
                <h3 className="mt-5 text-2xl font-black text-slate-950">{signal.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{signal.text}</p>
              </Panel>
            ))}
          </div>
          <div className="mt-10 rounded-lg bg-slate-950 p-8 text-white">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-black tracking-normal">Need help choosing?</h2>
                <p className="mt-2 text-slate-300">Send vehicle details and our support team will recommend products.</p>
              </div>
              <Link className={buttonClassName({ variant: "primary", size: "lg", className: "bg-white text-slate-950 hover:bg-blue-50" })} href={href("/contact")}>
                Contact support
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}
