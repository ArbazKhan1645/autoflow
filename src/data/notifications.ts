import type { NotificationItem } from "@/models";

export const notifications: NotificationItem[] = [
  {
    id: "not-1",
    title: "Critical stock alert",
    message: "LumaX LED Headlamp Assembly dropped below minimum stock in Dallas.",
    type: "inventory",
    severity: "danger",
    read: false,
    createdAt: "2026-05-20T06:20:00.000Z",
  },
  {
    id: "not-2",
    title: "AI call scheduled",
    message: "Coastal Collision follow-up call is queued for today.",
    type: "ai",
    severity: "info",
    read: false,
    createdAt: "2026-05-20T04:22:00.000Z",
  },
  {
    id: "not-3",
    title: "Order ready to ship",
    message: "ORD-24016 is packed and ready for export document review.",
    type: "order",
    severity: "success",
    read: true,
    createdAt: "2026-05-18T07:48:00.000Z",
  },
  {
    id: "not-4",
    title: "VIP inquiry created",
    message: "DesertLine Auto Exports requested a mixed container quote.",
    type: "crm",
    severity: "warning",
    read: false,
    createdAt: "2026-05-20T05:12:00.000Z",
  },
];
