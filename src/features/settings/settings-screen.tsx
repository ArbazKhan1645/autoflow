"use client";

import { Bell, Database, KeyRound, Moon, ShieldCheck, SlidersHorizontal, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import type { UserRole } from "@/models";
import { useAuthStore } from "@/store/auth-store";
import { useUiStore } from "@/store/ui-store";

const roles: UserRole[] = ["owner", "admin", "sales", "inventory", "support"];

export function SettingsScreen() {
  const user = useAuthStore((state) => state.user);
  const setRole = useAuthStore((state) => state.setRole);
  const theme = useUiStore((state) => state.theme);
  const toggleTheme = useUiStore((state) => state.toggleTheme);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <SectionHeader
        eyebrow="Settings"
        title="Workspace, roles and integration settings"
        description="Dark/light ready structure, role-based UI, environment placeholders and notification preferences."
      />

      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <Panel className="p-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">
              Role-based access
            </h2>
          </div>
          <div className="mt-5 grid gap-4">
            <Input value={user.fullName} readOnly />
            <Input value={user.email} readOnly />
            <Select value={user.role} onChange={(event) => setRole(event.target.value as UserRole)}>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </Select>
          </div>
        </Panel>

        <Panel className="p-5">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">
              Environment and API layer
            </h2>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Input value="NEXT_PUBLIC_SUPABASE_URL" readOnly />
            <Input value="NEXT_PUBLIC_SUPABASE_ANON_KEY" readOnly />
            <Input value="OPENAI_API_KEY" readOnly />
            <Input value="AI_CALLING_WEBHOOK_URL" readOnly />
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-500">
            Frontend reads mock services today; replacing service files can connect Supabase without changing screens.
          </p>
        </Panel>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Panel className="p-5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">
              Theme
            </h2>
          </div>
          <Button className="mt-5 w-full" variant="outline" onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </Button>
        </Panel>
        <Panel className="p-5">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">
              Notifications
            </h2>
          </div>
          <div className="mt-5 space-y-3">
            {["Low stock alerts", "AI call summaries", "Order status changes"].map((item) => (
              <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-white/5" key={item}>
                <span className="text-sm font-semibold">{item}</span>
                <span className="relative h-6 w-11 rounded-full bg-primary">
                  <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white" />
                </span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel className="p-5">
          <div className="flex items-center gap-2">
            <KeyRound className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">
              Security
            </h2>
          </div>
          <div className="mt-5 space-y-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <p>Session expiry: 8 hours</p>
            <p>Audit logging: Enabled</p>
            <p>2FA: Required for admins</p>
          </div>
        </Panel>
      </div>
    </div>
  );
}
