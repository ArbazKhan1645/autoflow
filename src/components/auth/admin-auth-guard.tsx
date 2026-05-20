"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { LogoMark } from "@/components/brand/logo-mark";
import { useAuthStore } from "@/store/auth-store";

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const isCrmRoute = pathname.startsWith("/crm");

  useEffect(() => {
    if (!isCrmRoute || !hasHydrated) return;
    if (!user) router.replace("/crm/auth");
  }, [hasHydrated, isCrmRoute, router, user]);

  if (!isCrmRoute) return <>{children}</>;

  if (!hasHydrated || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6faff] text-slate-950 premium-grid">
        <div className="flex flex-col items-center gap-4 rounded-lg border border-slate-200 bg-white/90 p-6 text-center shadow-2xl shadow-blue-900/10 backdrop-blur-xl">
          <LogoMark className="h-14 w-14" priority />
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">
              Admin access
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-600">
              Checking secure CRM session...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
