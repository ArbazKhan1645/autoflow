"use client";

import { create } from "zustand";
import { notifications as seedNotifications } from "@/data/notifications";
import type { NotificationItem } from "@/models";

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  severity?: NotificationItem["severity"];
}

interface NotificationState {
  notifications: NotificationItem[];
  toasts: ToastMessage[];
  markRead: (id: string) => void;
  markAllRead: () => void;
  pushToast: (toast: Omit<ToastMessage, "id">) => void;
  dismissToast: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: seedNotifications,
  toasts: [],
  markRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((item) =>
        item.id === id ? { ...item, read: true } : item,
      ),
    })),
  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((item) => ({ ...item, read: true })),
    })),
  pushToast: (toast) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        {
          id: `toast-${Date.now()}-${Math.random().toString(16).slice(2)}`,
          severity: "success",
          ...toast,
        },
      ],
    })),
  dismissToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));
