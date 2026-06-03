"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, UserRound } from "lucide-react";
import { PublicPageShell } from "@/components/public/public-page-shell";
import { Button, buttonClassName } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/card";
import { calculateCartTotals, useCartStore } from "@/store/cart-store";
import { useCustomerAuthStore } from "@/store/customer-auth-store";
import {
  useClient,
  useClientCurrency,
} from "@/components/providers/client-config-provider";

export function AccountScreen() {
  const { href } = useClient();
  const { currency, preciseCurrency } = useClientCurrency();
  const user = useCustomerAuthStore((state) => state.user);
  const signOut = useCustomerAuthStore((state) => state.signOut);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const totals = calculateCartTotals(items);

  if (!user) {
    return (
      <PublicPageShell>
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <EmptyState
            icon={UserRound}
            title="Sign in to access My Account"
            description="Your account keeps cart, checkout and order details together."
            action={<Link className={buttonClassName({ variant: "primary" })} href={href("/auth")}>Sign in</Link>}
          />
        </div>
      </PublicPageShell>
    );
  }

  return (
    <PublicPageShell>
      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">
            My account
          </p>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-5xl font-black tracking-normal">{user.fullName}</h1>
              <p className="mt-3 text-slate-300">{user.email}</p>
            </div>
            <Button variant="secondary" onClick={signOut}>Sign out</Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_390px] lg:px-8">
          <Panel className="overflow-hidden">
            <div className="border-b border-slate-200 p-5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-black text-slate-950">Cart items</h2>
              </div>
            </div>
            {items.length === 0 ? (
              <div className="p-6">
                <EmptyState
                  title="Your cart is empty"
                  description="Add products from the storefront and come back here to checkout."
                  action={<Link className={buttonClassName({ variant: "primary" })} href={href("/products")}>Browse products</Link>}
                />
              </div>
            ) : (
              <div className="divide-y divide-slate-200">
                {items.map((item) => (
                  <div className="grid gap-4 p-5 md:grid-cols-[90px_1fr_auto]" key={item.productId}>
                    <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-slate-100">
                      <Image alt={item.productName} className="object-cover" fill sizes="80px" src={item.thumbnail} />
                    </div>
                    <div>
                      <p className="font-black text-slate-950">{item.productName}</p>
                      <p className="mt-1 text-sm font-semibold text-slate-500">{item.sku} / {item.warehouseId}</p>
                      <div className="mt-4 inline-flex items-center rounded-lg border border-slate-200">
                        <Button aria-label="Decrease quantity" size="icon" variant="ghost" onClick={() => updateQuantity(item.productId, item.quantity - 1)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-10 text-center text-sm font-black">{item.quantity}</span>
                        <Button aria-label="Increase quantity" size="icon" variant="ghost" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-start justify-between gap-4 md:flex-col md:items-end">
                      <div className="text-right">
                        <p className="font-black text-slate-950">{currency.format(item.unitPrice * item.quantity)}</p>
                        <p className="text-xs font-bold text-slate-500">{currency.format(item.unitPrice)} each</p>
                      </div>
                      <Button aria-label="Remove item" size="icon" variant="ghost" onClick={() => removeItem(item.productId)}>
                        <Trash2 className="h-4 w-4 text-danger" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Panel>

          <Panel className="h-fit p-5">
            <h2 className="text-xl font-black text-slate-950">Order summary</h2>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Subtotal</span><span className="font-bold">{preciseCurrency.format(totals.subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Tax</span><span className="font-bold">{preciseCurrency.format(totals.tax)}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Shipping</span><span className="font-bold">{preciseCurrency.format(totals.shipping)}</span></div>
              <div className="border-t border-slate-200 pt-3 text-lg">
                <div className="flex justify-between"><span className="font-black">Total</span><span className="font-black">{preciseCurrency.format(totals.total)}</span></div>
              </div>
            </div>
            <Link
              className={buttonClassName({ variant: "primary", size: "lg", className: "mt-5 w-full" })}
              href={href(items.length ? "/account/checkout" : "/products")}
            >
              {items.length ? "Proceed to checkout" : "Browse products"}
            </Link>
          </Panel>
        </div>
      </section>
    </PublicPageShell>
  );
}
