"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, KeyRound, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/brand/logo-mark";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { demoUser } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth-store";
import { useNotificationStore } from "@/store/notification-store";
import {
  useClient,
  useClientConfig,
} from "@/components/providers/client-config-provider";

const adminFeatures = [
  "Role-based CRM access",
  "Products, categories and content management",
  "Inventory, orders, analytics and AI operations",
];

export function AdminAuthScreen() {
  const router = useRouter();
  const { href } = useClient();
  const config = useClientConfig();
  const signIn = useAuthStore((state) => state.signIn);
  const user = useAuthStore((state) => state.user);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const pushToast = useNotificationStore((state) => state.pushToast);
  const [email, setEmail] = useState(demoUser.email);
  const [password, setPassword] = useState("admin-demo-access");

  const submit = () => {
    signIn(email);
    pushToast({
      title: "Admin signed in",
      message: `Welcome to ${config.storeName} CRM dashboard.`,
      severity: "success",
    });
    router.push(href("/crm/dashboard"));
  };

  useEffect(() => {
    if (hasHydrated && user) router.replace(href("/crm/dashboard"));
  }, [hasHydrated, href, router, user]);

  return (
    <main className="min-h-screen bg-[#f6faff] text-slate-950 premium-grid">
      <div className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative hidden overflow-hidden bg-slate-950 text-white lg:block">
          <Image
            alt="Admin automotive workspace"
            className="object-cover opacity-55"
            fill
            priority
            sizes="60vw"
            src="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1800&q=85"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/82 to-slate-950/40" />
          <div className="relative flex h-full flex-col justify-between p-12">
            <Link className="flex items-center gap-3" href={href("/crm")}>
              <LogoMark className="h-11 w-11" priority />
              <span className="text-xl font-black">{config.storeName} CRM</span>
            </Link>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/10 px-3 py-1.5 text-sm font-bold text-blue-50 backdrop-blur">
                <Sparkles className="h-4 w-4 text-cyan-200" />
                Admin operations portal
              </div>
              <h1 className="mt-6 max-w-3xl text-6xl font-black tracking-normal">
                Manage the full auto parts business from one command center.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                Secure access for owners, admins, sales, inventory and support teams.
              </p>
              <div className="mt-8 grid gap-3">
                {adminFeatures.map((feature) => (
                  <div className="flex items-center gap-3 font-bold text-blue-50" key={feature}>
                    <ShieldCheck className="h-5 w-5 text-cyan-200" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm text-slate-400">CRM access is separate from the customer storefront.</p>
          </div>
        </section>

        <section className="flex items-center justify-center px-4 py-10">
          <GlassCard className="w-full max-w-md p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white shadow-lg shadow-blue-500/25">
                <KeyRound className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">
                  Admin sign in
                </p>
                <h2 className="mt-1 text-2xl font-black tracking-normal text-slate-950">
                  Welcome back
                </h2>
              </div>
            </div>

            <div className="mt-7 grid gap-4">
              <Input
                placeholder="Admin email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") submit();
                }}
              />
              <Button className="w-full" size="lg" onClick={submit}>
                Sign in to dashboard
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
              <div className="flex items-center gap-2 font-black text-slate-950">
                <LockKeyhole className="h-4 w-4 text-primary" />
                Demo credentials
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Email is prefilled. Any password will sign in for this MVP.
              </p>
            </div>
          </GlassCard>
        </section>
      </div>
    </main>
  );
}
