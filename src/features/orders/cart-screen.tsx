"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ReceiptText, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button, buttonClassName } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Panel } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { useCreateOrderDraft } from "@/hooks/use-orders";
import {
  useClient,
  useClientCurrency,
} from "@/components/providers/client-config-provider";
import { calculateCartTotals, useCartStore } from "@/store/cart-store";
import { useNotificationStore } from "@/store/notification-store";

export function CartScreen() {
  const { href } = useClient();
  const { currency, preciseCurrency } = useClientCurrency();
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);
  const pushToast = useNotificationStore((state) => state.pushToast);
  const createDraft = useCreateOrderDraft();
  const totals = calculateCartTotals(items);
  const [customer, setCustomer] = useState({
    fullName: "Mason Rivera",
    phone: "+1 214 555 0190",
    email: "mason@riverafleet.example",
    company: "Rivera Fleet Services",
    shippingAddress: "418 Commerce Lane, Dallas, TX",
  });

  const submitOrder = async () => {
    if (items.length === 0) return;
    const draft = await createDraft.mutateAsync({
      customerInfo: {
        customerId: "cus-demo",
        ...customer,
      },
      products: items,
      notes: "Draft created from MVP cart workflow.",
    });
    clear();
    pushToast({
      title: "Draft order created",
      message: `${draft.orderId} is ready for review in Orders.`,
      severity: "success",
    });
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-5xl">
        <EmptyState
          title="Cart is ready for parts"
          description="Add products from the catalog to build a quote, draft order or invoice."
          action={
            <Link className={buttonClassName({ variant: "primary" })} href={href("/catalog")}>
              Search catalog
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <SectionHeader
        eyebrow="Ordering"
        title="Cart and checkout workflow"
        description="Turn selected parts into a service-backed draft order with customer and fulfillment context."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
        <Panel className="overflow-hidden">
          <div className="border-b border-border-soft p-5">
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">
              Order lines
            </h2>
          </div>
          <div className="divide-y divide-border-soft">
            {items.map((item) => (
              <div className="grid gap-4 p-5 md:grid-cols-[88px_1fr_auto]" key={item.productId}>
                <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-slate-100">
                  <Image
                    alt={item.productName}
                    className="object-cover"
                    fill
                    sizes="80px"
                    src={item.thumbnail}
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-950 dark:text-white">
                    {item.productName}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    {item.sku} / warehouse {item.warehouseId}
                  </p>
                  <div className="mt-4 inline-flex items-center rounded-lg border border-slate-200 bg-white dark:border-white/10 dark:bg-white/5">
                    <Button
                      aria-label="Decrease quantity"
                      size="icon"
                      variant="ghost"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-10 text-center text-sm font-black">{item.quantity}</span>
                    <Button
                      aria-label="Increase quantity"
                      size="icon"
                      variant="ghost"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-start justify-between gap-4 md:flex-col md:items-end">
                  <div className="text-right">
                    <p className="font-black text-slate-950 dark:text-white">
                      {currency.format(item.unitPrice * item.quantity)}
                    </p>
                    <p className="text-xs font-semibold text-slate-500">
                      {currency.format(item.unitPrice)} each
                    </p>
                  </div>
                  <Button
                    aria-label="Remove item"
                    size="icon"
                    variant="ghost"
                    onClick={() => removeItem(item.productId)}
                  >
                    <Trash2 className="h-4 w-4 text-danger" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel className="p-5">
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">
              Customer info
            </h2>
            <div className="mt-4 grid gap-3">
              {Object.entries(customer).map(([key, value]) => (
                <Input
                  key={key}
                  value={value}
                  onChange={(event) =>
                    setCustomer((current) => ({
                      ...current,
                      [key]: event.target.value,
                    }))
                  }
                />
              ))}
            </div>
          </Panel>

          <Panel className="p-5">
            <div className="flex items-center gap-2">
              <ReceiptText className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                Order summary
              </h2>
            </div>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-bold">{preciseCurrency.format(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tax</span>
                <span className="font-bold">{preciseCurrency.format(totals.tax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Shipping</span>
                <span className="font-bold">{preciseCurrency.format(totals.shipping)}</span>
              </div>
              <div className="border-t border-border-soft pt-3 text-lg">
                <div className="flex justify-between">
                  <span className="font-black">Total</span>
                  <span className="font-black">{preciseCurrency.format(totals.total)}</span>
                </div>
              </div>
            </div>
            <Button
              className="mt-5 w-full"
              disabled={createDraft.isPending}
              size="lg"
              onClick={submitOrder}
            >
              {createDraft.isPending ? "Creating draft..." : "Create draft order"}
            </Button>
            <Link
              className={buttonClassName({
                variant: "ghost",
                className: "mt-2 w-full",
              })}
              href={href("/orders")}
            >
              View orders
            </Link>
          </Panel>
        </div>
      </div>
    </div>
  );
}
