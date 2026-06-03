"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, ShieldCheck, Truck } from "lucide-react";
import { LogoMark } from "@/components/brand/logo-mark";
import {
  useCatalog,
  useClient,
  useClientConfig,
} from "@/components/providers/client-config-provider";

export function PublicFooter() {
  const { href } = useClient();
  const config = useClientConfig();
  const { megaMenu } = useCatalog();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:px-8">
        <div>
          <Link className="flex items-center gap-3" href={href("/")} prefetch={false}>
            <LogoMark className="h-11 w-11" />
            <span className="text-xl font-black">{config.storeName}</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
            {config.storeDescription}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {config.trustBadges.map((item) => (
              <span
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-blue-50"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-black">Shop</h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            {megaMenu.map((item) => (
              <Link className="transition hover:text-white" href={href(item.href)} key={item.label} prefetch={false}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-black">Company</h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            {[
              ["Services", "/services"],
              ["About Us", "/about"],
              ["FAQs", "/faqs"],
              ["Contact Us", "/contact"],
              ["My Account", "/account"],
            ].map(([label, path]) => (
              <Link className="transition hover:text-white" href={href(path)} key={path} prefetch={false}>
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-black">Contact</h3>
          <div className="mt-4 space-y-4 text-sm text-slate-300">
            <p className="flex gap-3">
              <MapPin className="h-5 w-5 shrink-0 text-cyan-300" />
              {config.contact.address}
            </p>
            <p className="flex gap-3">
              <Phone className="h-5 w-5 shrink-0 text-cyan-300" />
              {config.contact.phone}
            </p>
            <p className="flex gap-3">
              <Mail className="h-5 w-5 shrink-0 text-cyan-300" />
              {config.contact.email}
            </p>
            <p className="flex gap-3">
              <Truck className="h-5 w-5 shrink-0 text-cyan-300" />
              {config.contact.supportLabel}
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>Copyright {year} {config.storeName}. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-cyan-300" />
            Secure checkout and fitment support
          </span>
        </div>
      </div>
    </footer>
  );
}
