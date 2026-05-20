"use client";

import { Bell, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { StatusPill } from "@/components/ui/status-pill";
import { formatDate } from "@/lib/utils";
import { useNotificationStore } from "@/store/notification-store";

export function NotificationsScreen() {
  const notifications = useNotificationStore((state) => state.notifications);
  const markRead = useNotificationStore((state) => state.markRead);
  const markAllRead = useNotificationStore((state) => state.markAllRead);
  const unread = notifications.filter((item) => !item.read).length;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <SectionHeader
        eyebrow="Notifications"
        title="Operational alerts"
        description="Inventory, order, CRM, AI and system events shown through a centralized notification store."
        action={<Button variant="outline" onClick={markAllRead}><CheckCheck className="h-4 w-4" /> Mark all read</Button>}
      />

      <Panel className="p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-primary">
            <Bell className="h-5 w-5" />
          </div>
          <div>
            <p className="text-2xl font-black">{unread}</p>
            <p className="text-sm font-semibold text-slate-500">Unread alerts</p>
          </div>
        </div>
      </Panel>

      <div className="space-y-3">
        {notifications.map((item) => (
          <button
            className={`w-full rounded-lg border p-5 text-left transition ${
              item.read
                ? "border-border-soft bg-white/70 dark:bg-white/5"
                : "border-blue-200 bg-blue-50 shadow-sm"
            }`}
            key={item.id}
            type="button"
            onClick={() => markRead(item.id)}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-black text-slate-950 dark:text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {item.message}
                </p>
              </div>
              <div className="flex gap-2">
                <StatusPill status={item.type} />
                <StatusPill status={item.severity} />
              </div>
            </div>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              {formatDate(item.createdAt)}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
