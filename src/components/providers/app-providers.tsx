"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CheckCircle2, Info, TriangleAlert, X, XCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { useNotificationStore, type ToastMessage } from "@/store/notification-store";

function ToastCard({ toast }: { toast: ToastMessage }) {
  const dismissToast = useNotificationStore((state) => state.dismissToast);

  useEffect(() => {
    const timer = window.setTimeout(() => dismissToast(toast.id), 3600);
    return () => window.clearTimeout(timer);
  }, [dismissToast, toast.id]);

  const Icon =
    toast.severity === "danger"
      ? XCircle
      : toast.severity === "warning"
        ? TriangleAlert
        : toast.severity === "info"
          ? Info
          : CheckCircle2;

  return (
    <div className="glass-panel flex w-[min(92vw,390px)] gap-3 rounded-lg p-4 shadow-xl">
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
          toast.severity === "danger" && "bg-red-100 text-danger",
          toast.severity === "warning" && "bg-amber-100 text-warning",
          toast.severity === "info" && "bg-blue-100 text-primary",
          toast.severity === "success" && "bg-emerald-100 text-success",
        )}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">{toast.title}</p>
        {toast.message ? (
          <p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-300">
            {toast.message}
          </p>
        ) : null}
      </div>
      <button
        aria-label="Dismiss notification"
        className="rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
        type="button"
        onClick={() => dismissToast(toast.id)}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function ToastViewport() {
  const toasts = useNotificationStore((state) => state.toasts);

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[80] flex flex-col gap-3">
      {toasts.map((toast) => (
        <div className="pointer-events-auto" key={toast.id}>
          <ToastCard toast={toast} />
        </div>
      ))}
    </div>
  );
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  const content = useMemo(() => children, [children]);

  return (
    <QueryClientProvider client={queryClient}>
      {content}
      <ToastViewport />
    </QueryClientProvider>
  );
}
