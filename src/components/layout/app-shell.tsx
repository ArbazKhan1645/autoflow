"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  Bot,
  FilePenLine,
  Globe2,
  Layers3,
  LayoutDashboard,
  Menu,
  Moon,
  PackageSearch,
  PhoneCall,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Sun,
  UserCog,
  Users,
  Warehouse,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect } from "react";
import { LogoMark } from "@/components/brand/logo-mark";
import { NAVIGATION_ITEMS } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/models";
import { useAuthStore } from "@/store/auth-store";
import { useCartStore } from "@/store/cart-store";
import { useNotificationStore } from "@/store/notification-store";
import { useUiStore } from "@/store/ui-store";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  PackageSearch,
  Layers3,
  FilePenLine,
  ShoppingCart,
  Users,
  UserCog,
  Warehouse,
  Bot,
  PhoneCall,
  ChartSpline: BarChart3,
  Globe2,
  Bell,
  Settings,
};

const roles: UserRole[] = ["owner", "admin", "sales", "inventory", "support"];

function SidebarContent() {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const activeUser = user ?? {
    id: "guest",
    fullName: "Admin Guest",
    email: "guest@autoflow.example",
    role: "owner" as UserRole,
  };
  const unread = useNotificationStore(
    (state) => state.notifications.filter((item) => !item.read).length,
  );

  const allowedItems = NAVIGATION_ITEMS.filter((item) =>
    item.roles.includes(activeUser.role),
  );

  return (
    <div className="flex h-full flex-col">
      <Link className="flex items-center gap-3 px-5 py-5" href="/crm/dashboard" prefetch={false}>
        <LogoMark className="h-11 w-11" />
        <div>
          <p className="text-base font-black tracking-normal text-slate-950">
            AutoFlow
          </p>
          <p className="text-xs font-semibold text-slate-500">
            CRM Admin OS
          </p>
        </div>
      </Link>

      <nav className="flex-1 space-y-1 px-3 py-3">
        {allowedItems.map((item) => {
          const Icon = iconMap[item.icon] ?? LayoutDashboard;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const badge =
            item.href === "/crm/notifications" && unread > 0
              ? unread
              : item.badge;

          return (
            <Link
              className={cn(
                "group flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-primary",
                active &&
                  "bg-primary text-white shadow-lg shadow-blue-500/20 hover:bg-primary hover:text-white",
              )}
              href={item.href}
              key={item.href}
              prefetch={false}
            >
              <Icon className="h-4.5 w-4.5 shrink-0" />
              <span className="min-w-0 flex-1 truncate">{item.label}</span>
              {badge ? (
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-bold",
                    active ? "bg-white/20 text-white" : "bg-blue-100 text-primary",
                  )}
                >
                  {badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="m-3 rounded-lg border border-blue-100 bg-blue-50/80 p-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <p className="text-sm font-bold text-slate-950">
            Role based UI
          </p>
        </div>
        <p className="mt-2 text-xs leading-5 text-slate-600">
          Current workspace role is {activeUser.role}. Navigation adapts live.
        </p>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  const setSidebarOpen = useUiStore((state) => state.setSidebarOpen);
  const toggleTheme = useUiStore((state) => state.toggleTheme);
  const theme = useUiStore((state) => state.theme);
  const cartCount = useCartStore((state) =>
    state.items.reduce((sum, line) => sum + line.quantity, 0),
  );
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);
  const setRole = useAuthStore((state) => state.setRole);
  const activeUser = user ?? {
    id: "guest",
    fullName: "Admin Guest",
    email: "guest@autoflow.example",
    role: "owner" as UserRole,
  };
  const unread = useNotificationStore(
    (state) => state.notifications.filter((item) => !item.read).length,
  );

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname, setSidebarOpen]);

  return (
    <div className="crm-admin-theme min-h-screen bg-[#f6faff] text-slate-950 premium-grid">
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-72 border-r border-slate-200 bg-white/92 backdrop-blur-xl lg:block">
        <SidebarContent />
      </aside>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-sm transition lg:hidden",
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div
          className={cn(
            "h-full w-[min(86vw,320px)] border-r border-slate-200 bg-white shadow-2xl transition-transform",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="absolute right-3 top-3">
            <Button
              aria-label="Close menu"
              size="icon"
              variant="ghost"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <SidebarContent />
        </div>
      </div>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/88 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <Button
              aria-label="Open menu"
              className="lg:hidden"
              size="icon"
              variant="ghost"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="relative hidden flex-1 md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                className="h-10 w-full max-w-xl rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-sm font-medium text-slate-950 shadow-sm outline-none transition placeholder:text-slate-500 focus:border-primary focus:ring-4 focus:ring-blue-100"
                placeholder="Search products, customers, orders..."
                type="search"
              />
            </div>
            <Link
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:border-primary/30 hover:text-primary"
              href="/crm/orders"
              prefetch={false}
            >
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 ? (
                <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              ) : null}
            </Link>
            <Link
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:border-primary/30 hover:text-primary"
              href="/crm/notifications"
              prefetch={false}
            >
              <Bell className="h-4 w-4" />
              {unread > 0 ? (
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger" />
              ) : null}
            </Link>
            <Button aria-label="Toggle theme" size="icon" variant="outline" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <select
              aria-label="Switch role"
              className="hidden h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold capitalize text-slate-700 shadow-sm outline-none sm:block"
              value={activeUser.role}
              onChange={(event) => setRole(event.target.value as UserRole)}
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <Badge className="hidden md:inline-flex" tone="blue">
              {activeUser.fullName}
            </Badge>
            {user ? (
              <Button size="sm" variant="ghost" onClick={signOut}>
                Sign out
              </Button>
            ) : (
              <Link
                className="rounded-lg bg-slate-950 px-3 py-2 text-sm font-bold text-white transition hover:bg-primary"
                href="/crm/auth"
                prefetch={false}
              >
                Sign in
              </Link>
            )}
          </div>
        </header>
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
