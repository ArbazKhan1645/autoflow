"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function AdminSheet({
  open,
  title,
  description,
  children,
  footer,
  onClose,
  size = "md",
}: {
  open: boolean;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClose: () => void;
  size?: "md" | "lg";
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90]">
      <button
        aria-label="Close sheet overlay"
        className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm"
        type="button"
        onClick={onClose}
      />
      <aside
        className={cn(
          "absolute right-0 top-0 flex h-full w-[min(94vw,560px)] flex-col border-l border-slate-200 bg-white shadow-2xl",
          size === "lg" && "w-[min(94vw,720px)]",
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">
              Create / Manage
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-normal text-slate-950">
              {title}
            </h2>
            {description ? (
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            ) : null}
          </div>
          <Button aria-label="Close sheet" size="icon" variant="ghost" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
        {footer ? (
          <div className="border-t border-slate-200 bg-slate-50 p-4">{footer}</div>
        ) : null}
      </aside>
    </div>
  );
}
