"use client";

import Link from "next/link";
import { MapPin, UserRound } from "lucide-react";
import { PublicPageShell } from "@/components/public/public-page-shell";
import { buttonClassName } from "@/components/ui/button";
import { Panel } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import { calculateCartTotals, useCartStore } from "@/store/cart-store";
import { useCustomerAuthStore } from "@/store/customer-auth-store";
import { preciseCurrency } from "@/lib/utils";

export function CheckoutDetailsScreen() {
  const user = useCustomerAuthStore((state) => state.user);
  const items = useCartStore((state) => state.items);
  const totals = calculateCartTotals(items);

  return (
    <PublicPageShell>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">Checkout</p>
          <h1 className="mt-3 text-4xl font-black tracking-normal text-slate-950">Delivery and fitment details</h1>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <Panel className="p-6">
            <div className="flex items-center gap-2">
              <UserRound className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-black text-slate-950">Customer details</h2>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Input defaultValue={user?.fullName ?? ""} placeholder="Full name" />
              <Input defaultValue={user?.email ?? ""} placeholder="Email" />
              <Input placeholder="Phone or WhatsApp" />
              <Input placeholder="Vehicle make/model/year" />
              <Input className="md:col-span-2" placeholder="Shipping address" />
              <Select defaultValue="Fitment check before dispatch">
                <option>Fitment check before dispatch</option>
                <option>Dispatch immediately</option>
                <option>Call me before packing</option>
              </Select>
              <Input placeholder="Order notes" />
            </div>
            <Link className={buttonClassName({ variant: "primary", size: "lg", className: "mt-6" })} href="/account/payment">
              Continue to payment
            </Link>
          </Panel>

          <Panel className="h-fit p-5">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-black text-slate-950">Summary</h2>
            </div>
            <p className="mt-4 text-sm text-slate-500">{items.length} product lines</p>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span className="font-bold">{preciseCurrency.format(totals.subtotal)}</span></div>
              <div className="flex justify-between"><span>Tax</span><span className="font-bold">{preciseCurrency.format(totals.tax)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span className="font-bold">{preciseCurrency.format(totals.shipping)}</span></div>
              <div className="border-t border-slate-200 pt-3 text-lg font-black">
                <div className="flex justify-between"><span>Total</span><span>{preciseCurrency.format(totals.total)}</span></div>
              </div>
            </div>
          </Panel>
        </div>
      </section>
    </PublicPageShell>
  );
}
