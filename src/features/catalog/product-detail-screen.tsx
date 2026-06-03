"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, PackageCheck, ShoppingCart, Truck, Warehouse } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonClassName } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SectionHeader } from "@/components/ui/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusPill } from "@/components/ui/status-pill";
import { useProduct, useProducts } from "@/hooks/use-products";
import { formatDate, percentage } from "@/lib/utils";
import {
  useClient,
  useClientCurrency,
} from "@/components/providers/client-config-provider";
import { useCartStore } from "@/store/cart-store";
import { useNotificationStore } from "@/store/notification-store";

export function ProductDetailScreen({ slug }: { slug: string }) {
  const { href } = useClient();
  const { currency } = useClientCurrency();
  const productQuery = useProduct(slug);
  const product = productQuery.data;
  const recommendations = useProducts({
    category: product?.category ?? "All",
    featured: true,
  });
  const addItem = useCartStore((state) => state.addItem);
  const pushToast = useNotificationStore((state) => state.pushToast);

  if (productQuery.isLoading) {
    return (
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_420px]">
        <Skeleton className="h-[560px]" />
        <Skeleton className="h-[560px]" />
      </div>
    );
  }

  if (!product) {
    return (
      <EmptyState
        title="Product not found"
        description="This SKU may be archived or missing from the current catalog."
        action={
          <Link className={buttonClassName({ variant: "primary" })} href={href("/catalog")}>
            Back to catalog
          </Link>
        }
      />
    );
  }

  const salePrice = product.discountPrice ?? product.sellingPrice;
  const margin = ((salePrice - product.buyingPrice) / salePrice) * 100;

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <Link
        className="inline-flex items-center gap-2 text-sm font-bold text-primary"
        href={href("/catalog")}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to catalog
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Panel className="overflow-hidden">
          <div className="relative h-[360px] bg-slate-100 md:h-[520px]">
            <Image
              alt={product.productName}
              className="object-cover"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              src={product.images[0] ?? product.thumbnail}
            />
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              <Badge tone="blue">{product.category}</Badge>
              <StatusPill status={product.status} />
            </div>
          </div>
        </Panel>

        <Panel className="p-6">
          <SectionHeader
            eyebrow={`${product.brand} / ${product.sku}`}
            title={product.productName}
            description={product.fullDescription}
          />
          <div className="mt-6 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <Badge key={tag} tone="slate">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-blue-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                Sale price
              </p>
              <p className="mt-2 text-2xl font-black text-slate-950">
                {currency.format(salePrice)}
              </p>
            </div>
            <div className="rounded-lg bg-emerald-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-success">
                Margin
              </p>
              <p className="mt-2 text-2xl font-black text-slate-950">
                {percentage(margin)}
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                Rating
              </p>
              <p className="mt-2 text-2xl font-black text-slate-950">
                {product.rating}/5
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button
              className="flex-1"
              size="lg"
              onClick={() => {
                addItem(product, 1);
                pushToast({
                  title: "Product added",
                  message: `${product.productName} is in the cart.`,
                });
              }}
            >
              <ShoppingCart className="h-5 w-5" />
              Add to cart
            </Button>
            <Link
              className={buttonClassName({
                variant: "outline",
                size: "lg",
                className: "flex-1",
              })}
              href={href("/crm")}
            >
              Create inquiry
            </Link>
          </div>

          <div className="mt-7 grid gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-3">
              <PackageCheck className="h-5 w-5 text-primary" />
              Barcode {product.barcode}
            </div>
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-primary" />
              {product.shippingWeight} kg / {product.dimensions.length}x
              {product.dimensions.width}x{product.dimensions.height}{" "}
              {product.dimensions.unit}
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Updated {formatDate(product.updatedAt)}
            </div>
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Panel className="p-5">
          <h2 className="text-lg font-bold text-slate-950 dark:text-white">
            Warehouse stock
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {product.warehouseStock.map((warehouse) => (
              <div
                className="rounded-lg border border-border-soft bg-white p-4 dark:bg-white/5"
                key={warehouse.warehouseId}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-slate-950 dark:text-white">
                      {warehouse.warehouseName}
                    </p>
                    <p className="text-sm text-slate-500">{warehouse.region}</p>
                  </div>
                  <Warehouse className="h-5 w-5 text-primary" />
                </div>
                <p className="mt-4 text-2xl font-black">{warehouse.quantity}</p>
                <p className="text-xs font-semibold text-slate-500">
                  Aisle {warehouse.aisle} / Bin {warehouse.bin}
                </p>
                <Progress className="mt-3" value={(warehouse.quantity / product.stockQuantity) * 100} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="p-5">
          <h2 className="text-lg font-bold text-slate-950 dark:text-white">
            Vehicle compatibility
          </h2>
          <div className="mt-4 space-y-3">
            {product.vehicleCompatibility.map((vehicle) => (
              <div
                className="rounded-lg border border-border-soft bg-slate-50 p-4 dark:bg-white/5"
                key={`${vehicle.make}-${vehicle.model}-${vehicle.years}`}
              >
                <p className="font-bold text-slate-950 dark:text-white">
                  {vehicle.make} {vehicle.model}
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {vehicle.years} / {vehicle.engine}
                  {vehicle.trim ? ` / ${vehicle.trim}` : ""}
                </p>
                {vehicle.notes ? (
                  <p className="mt-2 text-sm text-slate-500">{vehicle.notes}</p>
                ) : null}
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel className="p-5">
        <h2 className="text-lg font-bold text-slate-950 dark:text-white">
          Recommended parts
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {recommendations.data
            ?.filter((item) => item.id !== product.id)
            .slice(0, 3)
            .map((item) => (
              <Link
                className="rounded-lg border border-border-soft bg-white p-4 transition hover:border-primary/40 hover:bg-blue-50 dark:bg-white/5"
                href={href(`/catalog/${item.slug}`)}
                key={item.id}
              >
                <p className="text-sm font-black text-slate-950 dark:text-white">
                  {item.productName}
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  {item.sku} / {currency.format(item.discountPrice ?? item.sellingPrice)}
                </p>
              </Link>
            ))}
        </div>
      </Panel>
    </div>
  );
}
