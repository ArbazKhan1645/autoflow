"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, CheckCircle2, KeyRound, Mail, ShieldCheck, UserPlus } from "lucide-react";
import { PublicPageShell } from "@/components/public/public-page-shell";
import { Button, buttonClassName } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCustomerAuthStore } from "@/store/customer-auth-store";
import { useNotificationStore } from "@/store/notification-store";
import { useClient } from "@/components/providers/client-config-provider";

export function AuthScreen() {
  const router = useRouter();
  const { href } = useClient();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [fullName, setFullName] = useState("Customer");
  const [email, setEmail] = useState("customer@example.com");
  const [password, setPassword] = useState("demo-password");
  const signIn = useCustomerAuthStore((state) => state.signIn);
  const signUp = useCustomerAuthStore((state) => state.signUp);
  const verify = useCustomerAuthStore((state) => state.verify);
  const verificationEmail = useCustomerAuthStore((state) => state.verificationEmail);
  const pushToast = useNotificationStore((state) => state.pushToast);

  const handleSignIn = () => {
    signIn(email);
    pushToast({
      title: "Signed in",
      message: "Welcome back. Your account cart is ready.",
      severity: "success",
    });
    router.push(href("/account"));
  };

  const handleSignUp = () => {
    signUp(fullName, email);
    pushToast({
      title: "Verification sent",
      message: "Demo verification is ready below.",
      severity: "info",
    });
  };

  const handleVerify = () => {
    verify();
    pushToast({
      title: "Account verified",
      message: "You can now checkout from My Account.",
      severity: "success",
    });
    router.push(href("/account"));
  };

  return (
    <PublicPageShell>
      <section className="grid min-h-[calc(100svh-320px)] bg-background lg:grid-cols-[1fr_520px]">
        <div className="relative hidden overflow-hidden bg-slate-950 text-white lg:block">
          <Image
            alt="Premium car interior"
            className="object-cover opacity-55"
            fill
            priority
            sizes="60vw"
            src="https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1800&q=85"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/82 to-slate-950/40" />
          <div className="relative flex h-full flex-col justify-center p-12">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">
              Customer account
            </p>
            <h1 className="mt-4 max-w-xl text-5xl font-black tracking-normal">
              Sign in, save your cart and complete checkout with confidence.
            </h1>
            <div className="mt-8 space-y-4">
              {[
                "Cart stays connected to account checkout.",
                "Fitment notes can be attached before payment.",
                "Verification step is ready for production auth.",
              ].map((item) => (
                <div className="flex items-center gap-3 font-bold text-blue-50" key={item}>
                  <CheckCircle2 className="h-5 w-5 text-cyan-200" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <main className="flex items-center justify-center px-4 py-12">
          <GlassCard className="w-full max-w-md p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white">
                {mode === "signin" ? <KeyRound className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-950">
                  {mode === "signin" ? "Sign in" : "Create account"}
                </h2>
                <p className="text-sm font-semibold text-slate-500">
                  Customer storefront access
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1">
              <button
                className={`rounded-md px-3 py-2 text-sm font-black transition ${
                  mode === "signin" ? "bg-white text-primary shadow-sm" : "text-slate-500"
                }`}
                type="button"
                onClick={() => setMode("signin")}
              >
                Sign in
              </button>
              <button
                className={`rounded-md px-3 py-2 text-sm font-black transition ${
                  mode === "signup" ? "bg-white text-primary shadow-sm" : "text-slate-500"
                }`}
                type="button"
                onClick={() => setMode("signup")}
              >
                Sign up
              </button>
            </div>

            <div className="mt-6 grid gap-4">
              {mode === "signup" ? (
                <Input
                  placeholder="Full name"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                />
              ) : null}
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              {mode === "signin" ? (
                <Button size="lg" onClick={handleSignIn}>
                  Sign in
                  <ArrowRight className="h-5 w-5" />
                </Button>
              ) : (
                <Button size="lg" onClick={handleSignUp}>
                  Send verification
                  <Mail className="h-5 w-5" />
                </Button>
              )}
            </div>

            {verificationEmail ? (
              <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
                <div className="flex items-center gap-2 font-black text-slate-950">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Verify your email
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Demo verification sent to {verificationEmail}. Click below to
                  activate account access.
                </p>
                <Button className="mt-4 w-full" variant="secondary" onClick={handleVerify}>
                  Verify and continue
                </Button>
              </div>
            ) : null}

            <Link
              className={buttonClassName({
                variant: "ghost",
                className: "mt-4 w-full",
              })}
              href={href("/products")}
            >
              Continue shopping
            </Link>
          </GlassCard>
        </main>
      </section>
    </PublicPageShell>
  );
}
