"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star, Warehouse } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";
import { currency } from "@/lib/utils";
import type { Product } from "@/models";

export function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (product: Product) => void;
}) {
  const salePrice = product.discountPrice ?? product.sellingPrice;
  const isLowStock = product.stockQuantity <= product.minimumStock;

  return (
    <Panel className="group overflow-hidden">
      <Link className="block" href={`/catalog/${product.slug}`}>
        <div className="relative h-48 overflow-hidden bg-slate-100">
          <Image
            alt={product.productName}
            className="object-cover transition duration-500 group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            src={product.thumbnail}
          />
          <div className="absolute left-3 top-3 flex gap-2">
            {product.featured ? <Badge tone="blue">Featured</Badge> : null}
            {isLowStock ? <Badge tone="amber">Low stock</Badge> : null}
          </div>
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
              {product.category} / {product.subCategory}
            </p>
            <Link href={`/catalog/${product.slug}`}>
              <h2 className="mt-2 line-clamp-2 min-h-12 text-lg font-black text-slate-950 transition hover:text-primary dark:text-white">
                {product.productName}
              </h2>
            </Link>
          </div>
          <StatusPill status={product.status} />
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {product.shortDescription}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
          <span className="rounded-full bg-slate-100 px-2.5 py-1 dark:bg-white/10">
            {product.sku}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 dark:bg-white/10">
            <Warehouse className="h-3.5 w-3.5" />
            {product.stockQuantity} stock
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 dark:bg-white/10">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {product.rating}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-2xl font-black text-slate-950 dark:text-white">
              {currency.format(salePrice)}
            </p>
            {product.discountPrice ? (
              <p className="text-sm font-semibold text-slate-400 line-through">
                {currency.format(product.sellingPrice)}
              </p>
            ) : null}
          </div>
          <Button size="sm" onClick={() => onAdd(product)}>
            <ShoppingCart className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </Panel>
  );
}
