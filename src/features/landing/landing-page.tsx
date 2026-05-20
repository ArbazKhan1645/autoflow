"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  CirclePlay,
  Crown,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  Wrench,
} from "lucide-react";
import { PublicPageShell } from "@/components/public/public-page-shell";
import { Badge } from "@/components/ui/badge";
import { Button, buttonClassName } from "@/components/ui/button";
import { Panel } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import {
  clientFeedback,
  companyProjects,
  megaMenu,
  storefrontProducts,
  storefrontVideos,
} from "@/data/storefront";
import { currency } from "@/lib/utils";
import type { StorefrontProduct } from "@/data/storefront";
import { useCartStore } from "@/store/cart-store";
import { useNotificationStore } from "@/store/notification-store";

const heroStats = [
  ["12k+", "parts delivered"],
  ["4.9/5", "customer rating"],
  ["24h", "fast dispatch"],
  ["35+", "export lanes"],
];

const whyChoose = [
  {
    title: "Fitment-first support",
    description:
      "We verify vehicle year, model, trim and usage before your order moves forward.",
    icon: ShieldCheck,
  },
  {
    title: "Premium stock curation",
    description:
      "Hot sellers, imported accessories and service parts are selected for real demand.",
    icon: Crown,
  },
  {
    title: "Fast dispatch workflow",
    description:
      "Stock, packing and shipping are handled through a structured operational flow.",
    icon: Truck,
  },
  {
    title: "Garage and fleet ready",
    description:
      "Bulk buyers get quote-ready items, repeat ordering and clean documentation.",
    icon: Wrench,
  },
];

const brandOffers = [
  "Luxury 7D and 9D mats",
  "Interior accessories",
  "Lighting upgrades",
  "Performance kits",
  "Fleet service packs",
  "Export-ready orders",
  "Detailing products",
  "Fitment support",
];

function HotProductCard({ product }: { product: StorefrontProduct }) {
  const addStorefrontItem = useCartStore((state) => state.addStorefrontItem);
  const pushToast = useNotificationStore((state) => state.pushToast);

  return (
    <Panel className="group overflow-hidden">
      <Link href={`/products/${product.slug}`}>
        <div className="relative h-56 overflow-hidden bg-slate-100">
          <Image
            alt={product.name}
            className="object-cover transition duration-500 group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            src={product.image}
          />
          <div className="absolute left-3 top-3 flex gap-2">
            <Badge tone="blue">{product.badge}</Badge>
            {product.hot ? <Badge tone="amber">Hot</Badge> : null}
          </div>
        </div>
      </Link>
      <div className="p-5">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-primary">
          {product.subCategory} / {product.childCategory}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-2 line-clamp-2 min-h-12 text-lg font-black text-slate-950 transition hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
          {product.description}
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm font-bold text-slate-600">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          {product.rating} ({product.reviews} reviews)
        </div>
        <div className="mt-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-2xl font-black text-slate-950">
              {currency.format(product.price)}
            </p>
            {product.compareAt ? (
              <p className="text-sm font-bold text-slate-400 line-through">
                {currency.format(product.compareAt)}
              </p>
            ) : null}
          </div>
          <Button
            size="sm"
            onClick={() => {
              addStorefrontItem(product);
              pushToast({
                title: "Added to cart",
                message: `${product.name} is in your account cart.`,
              });
            }}
          >
            <ShoppingBag className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </Panel>
  );
}

export function LandingPage() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 120]);
  const hotProducts = storefrontProducts.filter((product) => product.hot).slice(0, 6);

  return (
    <PublicPageShell>
      <section className="relative min-h-[84svh] overflow-hidden bg-slate-950 text-white">
        <motion.div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=85')] bg-cover bg-center"
          style={{ y: heroY }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/82 to-slate-950/35" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
        <div className="relative mx-auto grid min-h-[84svh] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-3 py-1.5 text-sm font-bold text-blue-50 backdrop-blur">
                <Sparkles className="h-4 w-4 text-cyan-200" />
                Premium auto parts, accessories and fitment support
              </div>
              <h1 className="mt-6 text-balance text-5xl font-black tracking-normal sm:text-6xl lg:text-7xl">
                Upgrade every drive with parts that actually fit.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-50/86">
                Shop luxury floor mats, interior accessories, lighting,
                performance parts, service kits and export-ready auto products
                through a clean customer storefront.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  className={buttonClassName({
                    variant: "primary",
                    size: "lg",
                    className:
                      "bg-white text-slate-950 shadow-white/20 hover:bg-blue-50",
                  })}
                  href="/products"
                >
                  Shop products
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  className={buttonClassName({
                    variant: "outline",
                    size: "lg",
                    className:
                      "border-white/25 bg-white/10 text-white hover:bg-white/18",
                  })}
                  href="/contact"
                >
                  Ask fitment expert
                </Link>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {heroStats.map(([value, label]) => (
                  <div
                    className="rounded-lg border border-white/14 bg-white/10 p-4 backdrop-blur"
                    key={label}
                  >
                    <p className="text-2xl font-black">{value}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-blue-100/72">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="grid gap-4">
              <div className="rounded-lg border border-white/16 bg-white/12 p-4 backdrop-blur-xl">
                <div className="grid gap-3 sm:grid-cols-2">
                  {hotProducts.slice(0, 4).map((product) => (
                    <Link
                      className="rounded-lg bg-white p-3 text-slate-950 shadow-xl transition hover:-translate-y-1"
                      href={`/products/${product.slug}`}
                      key={product.id}
                    >
                      <div className="relative h-28 overflow-hidden rounded-md">
                        <Image
                          alt={product.name}
                          className="object-cover"
                          fill
                          sizes="180px"
                          src={product.image}
                        />
                      </div>
                      <p className="mt-3 line-clamp-2 text-sm font-black">
                        {product.name}
                      </p>
                      <p className="mt-1 text-sm font-bold text-primary">
                        {currency.format(product.price)}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">
                  Shop by category
                </p>
                <h2 className="mt-3 text-4xl font-black tracking-normal text-slate-950">
                  Categories built for real car owners
                </h2>
              </div>
              <Link className="font-black text-primary" href="/products">
                View all products
              </Link>
            </div>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {megaMenu.map((category, index) => (
              <Reveal delay={index * 0.04} key={category.label}>
                <Panel className="h-full p-5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-primary">
                    <PackageCheck className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-black text-slate-950">
                    {category.label}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {category.children.flatMap((group) =>
                      group.products.slice(0, 2).map((item) => (
                        <Link
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 transition hover:bg-blue-50 hover:text-primary"
                          href={item.href}
                          key={`${category.label}-${item.label}`}
                        >
                          {item.label}
                        </Link>
                      )),
                    )}
                  </div>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">
                  Company projects and car pictures
                </p>
                <h2 className="mt-3 text-4xl font-black tracking-normal text-slate-950">
                  Before, after and behind the counter.
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  From floor mat fitment to lighting upgrades and export packing,
                  the storefront connects real visual product work with ordering.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {companyProjects.map((project) => (
                  <Panel className="overflow-hidden" key={project.title}>
                    <div className="relative h-56">
                      <Image
                        alt={project.title}
                        className="object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        src={project.image}
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-primary">
                        {project.location}
                      </p>
                      <h3 className="mt-2 font-black text-slate-950">
                        {project.title}
                      </h3>
                    </div>
                  </Panel>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">
                  Hot sellers
                </p>
                <h2 className="mt-3 text-4xl font-black tracking-normal text-slate-950">
                  Fast-moving accessories customers keep buying
                </h2>
              </div>
              <Link className="font-black text-primary" href="/products?hot=true">
                Browse hot sellers
              </Link>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {hotProducts.map((product, index) => (
              <Reveal delay={index * 0.04} key={product.id}>
                <HotProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-8">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">
                Videos
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-normal">
                Product stories, fitting and warehouse proof
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {storefrontVideos.map((video, index) => (
              <Reveal delay={index * 0.05} key={video.title}>
                <div className="group overflow-hidden rounded-lg border border-white/10 bg-white/8">
                  <div className="relative h-56">
                    <Image
                      alt={video.title}
                      className="object-cover opacity-82 transition group-hover:scale-105 group-hover:opacity-100"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      src={video.image}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/18 backdrop-blur">
                        <CirclePlay className="h-9 w-9" />
                      </span>
                    </div>
                    <span className="absolute bottom-3 right-3 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-bold">
                      {video.duration}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-black">{video.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {video.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <Reveal>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">
                Why choose us
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-normal text-slate-950">
                A parts store with an operations backbone.
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                The website feels premium because the workflow behind it is
                structured: product data, stock, fitment, checkout and support.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {whyChoose.map((item, index) => (
              <Reveal delay={index * 0.04} key={item.title}>
                <Panel className="h-full p-5">
                  <item.icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-5 text-xl font-black text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-lg bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 md:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">
                    Branding we offer
                  </p>
                  <h2 className="mt-3 text-4xl font-black tracking-normal text-slate-950">
                    Products positioned for retail, garages and fleets.
                  </h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {brandOffers.map((offer) => (
                    <div
                      className="flex min-h-20 items-center gap-3 rounded-lg bg-white p-4 text-sm font-black text-slate-800 shadow-sm"
                      key={offer}
                    >
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                      {offer}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-8">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">
                Client feedback
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-normal text-slate-950">
                Trusted by garages, fleets and export buyers
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {clientFeedback.map((feedback, index) => (
              <Reveal delay={index * 0.05} key={feedback.name}>
                <Panel className="h-full p-6">
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <Star className="h-4 w-4 fill-current" key={star} />
                    ))}
                  </div>
                  <p className="mt-5 text-lg leading-8 text-slate-700">
                    &ldquo;{feedback.quote}&rdquo;
                  </p>
                  <p className="mt-6 font-black text-slate-950">{feedback.name}</p>
                  <p className="text-sm font-semibold text-primary">
                    {feedback.company}
                  </p>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-slate-950 p-6 text-white md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-4xl font-black tracking-normal">
                  Ready to find the right part?
                </h2>
                <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-300">
                  Search products, open AI chat, or send fitment details to our
                  support desk before checkout.
                </p>
              </div>
              <Link
                className={buttonClassName({
                  variant: "primary",
                  size: "lg",
                  className: "bg-white text-slate-950 hover:bg-blue-50",
                })}
                href="/products"
              >
                Start shopping
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}
