"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, ShoppingBag, Star, Truck } from "lucide-react";
import { PublicPageShell } from "@/components/public/public-page-shell";
import { Badge } from "@/components/ui/badge";
import { Button, buttonClassName } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/card";
import { storefrontProducts } from "@/data/storefront";
import { currency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useNotificationStore } from "@/store/notification-store";

export function StorefrontProductDetail({ slug }: { slug: string }) {
  const product = storefrontProducts.find((item) => item.slug === slug);
  const addStorefrontItem = useCartStore((state) => state.addStorefrontItem);
  const pushToast = useNotificationStore((state) => state.pushToast);

  if (!product) {
    return (
      <PublicPageShell>
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <EmptyState
            title="Product not found"
            description="This item may be unavailable. Browse the product page for current stock."
            action={
              <Link className={buttonClassName({ variant: "primary" })} href="/products">
                Back to products
              </Link>
            }
          />
        </div>
      </PublicPageShell>
    );
  }

  const related = storefrontProducts
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 3);

  return (
    <PublicPageShell>
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link className="inline-flex items-center gap-2 text-sm font-black text-primary" href="/products">
            <ArrowLeft className="h-4 w-4" />
            Back to products
          </Link>
        </div>
      </section>
      <section className="pb-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <Panel className="overflow-hidden">
            <div className="relative h-[360px] bg-slate-100 md:h-[560px]">
              <Image
                alt={product.name}
                className="object-cover"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                src={product.image}
              />
              <div className="absolute left-4 top-4 flex gap-2">
                <Badge tone="blue">{product.category}</Badge>
                {product.hot ? <Badge tone="amber">Hot seller</Badge> : null}
              </div>
            </div>
          </Panel>

          <Panel className="p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">
              {product.subCategory} / {product.childCategory}
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-normal text-slate-950">
              {product.name}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1 text-sm font-bold text-slate-600">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                {product.rating} ({product.reviews} reviews)
              </span>
              <Badge tone="green">{product.stock} in stock</Badge>
              <Badge tone="slate">{product.fitment}</Badge>
            </div>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              {product.description}
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-blue-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-primary">
                  Price
                </p>
                <p className="mt-2 text-2xl font-black text-slate-950">
                  {currency.format(product.price)}
                </p>
              </div>
              <div className="rounded-lg bg-emerald-50 p-4">
                <ShieldCheck className="h-5 w-5 text-success" />
                <p className="mt-2 text-sm font-black text-slate-950">
                  Fitment verified
                </p>
              </div>
              <div className="rounded-lg bg-slate-50 p-4">
                <Truck className="h-5 w-5 text-primary" />
                <p className="mt-2 text-sm font-black text-slate-950">
                  Fast dispatch
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button
                className="flex-1"
                size="lg"
                onClick={() => {
                  addStorefrontItem(product);
                  pushToast({
                    title: "Added to cart",
                    message: "Continue through My Account checkout.",
                  });
                }}
              >
                <ShoppingBag className="h-5 w-5" />
                Add to cart
              </Button>
              <Link
                className={buttonClassName({
                  variant: "outline",
                  size: "lg",
                  className: "flex-1",
                })}
                href="/contact"
              >
                Ask before buying
              </Link>
            </div>

            <div className="mt-7 space-y-3">
              {product.specs.map((spec) => (
                <div className="flex items-center gap-3 text-sm font-bold text-slate-600" key={spec}>
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  {spec}
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-5 text-3xl font-black tracking-normal text-slate-950">
            Related products
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <Link
                className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                href={`/products/${item.slug}`}
                key={item.id}
              >
                <div className="relative h-44">
                  <Image alt={item.name} className="object-cover" fill sizes="33vw" src={item.image} />
                </div>
                <div className="p-4">
                  <p className="line-clamp-2 font-black text-slate-950">{item.name}</p>
                  <p className="mt-2 text-sm font-bold text-primary">{currency.format(item.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}
