"use client";

import Link from "next/link";
import { CheckCircle2, Home, PackageCheck } from "lucide-react";
import { PublicPageShell } from "@/components/public/public-page-shell";
import { Button, buttonClassName } from "@/components/ui/button";
import { Panel } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { useNotificationStore } from "@/store/notification-store";

export function CompleteOrderScreen() {
  const clear = useCartStore((state) => state.clear);
  const pushToast = useNotificationStore((state) => state.pushToast);

  const finish = () => {
    clear();
    pushToast({
      title: "Order completed",
      message: "Cart cleared and demo order submitted.",
      severity: "success",
    });
  };

  return (
    <PublicPageShell>
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <Panel className="p-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-success">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <p className="mt-6 text-sm font-black uppercase tracking-[0.18em] text-primary">
            Complete order
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-normal text-slate-950">
            Your order has been placed.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            A fitment and dispatch review will be attached to the order. This is
            the final demo confirmation screen before returning to the storefront.
          </p>
          <div className="mx-auto mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              className={buttonClassName({
                variant: "primary",
                size: "lg",
                className: "w-full sm:w-56",
              })}
              href="/"
              onClick={finish}
            >
              <Home className="h-5 w-5" />
              Return home
            </Link>
            <Button
              className="w-full border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-900/15 hover:bg-primary sm:w-56"
              size="lg"
              variant="primary"
              onClick={finish}
            >
              <PackageCheck className="h-5 w-5" />
              Mark as saved
            </Button>
          </div>
        </Panel>
      </section>
    </PublicPageShell>
  );
}
