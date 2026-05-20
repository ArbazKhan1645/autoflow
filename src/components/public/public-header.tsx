"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/brand/logo-mark";
import { megaMenu, storefrontProducts } from "@/data/storefront";
import { cn, currency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useCustomerAuthStore } from "@/store/customer-auth-store";
import { Button } from "../ui/button";

const navItems = [
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact Us", href: "/contact" },
];

export function PublicHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useCustomerAuthStore((state) => state.user);
  const cartCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  const submitSearch = () => {
    const query = search.trim();
    router.push(query ? `/products?search=${encodeURIComponent(query)}` : "/products");
    setMobileOpen(false);
  };

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Link className="flex shrink-0 items-center gap-3" href="/">
            <LogoMark className="h-11 w-11" priority />
            <span>
              <span className="block text-lg font-black tracking-normal text-slate-950">
                AutoFlow Parts
              </span>
              <span className="hidden text-xs font-bold uppercase tracking-[0.14em] text-primary sm:block">
                Premium auto store
              </span>
            </span>
          </Link>

          <div className="hidden min-w-0 flex-1 lg:block">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 pl-11 pr-28 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
                placeholder="Search mats, headlamps, anti theft locks, MG HS floor mats..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") submitSearch();
                }}
              />
              <button
                className="absolute right-1.5 top-1.5 h-9 rounded-md bg-primary px-4 text-sm font-bold text-white transition hover:bg-blue-700"
                type="button"
                onClick={submitSearch}
              >
                Search
              </button>
            </label>
          </div>

          <nav className="hidden items-center gap-1 xl:flex">
            {navItems.map((item) => (
              <Link
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-blue-50 hover:text-primary",
                  pathname === item.href && "bg-blue-50 text-primary",
                )}
                href={item.href}
                key={item.href}
                prefetch={false}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            className="relative hidden h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:border-primary/30 hover:text-primary sm:inline-flex"
            href="/account"
            prefetch={false}
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            ) : null}
          </Link>

          <Link
            className="hidden h-11 items-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-primary md:inline-flex"
            href={user ? "/account" : "/auth"}
            prefetch={false}
          >
            <UserRound className="h-4 w-4" />
            {user ? "My Account" : "Sign In"}
          </Link>

          <button
            aria-label="Open menu"
            className="ml-auto inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-white !text-slate-950 shadow-sm transition hover:border-primary/40 hover:bg-blue-50 hover:!text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 xl:hidden"
            style={{ color: "#0f172a" }}
            type="button"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" color="currentColor" strokeWidth={2.4} />
          </button>
        </div>

        <div className="hidden border-t border-slate-100 bg-white xl:block">
          <div className="mx-auto flex max-w-7xl items-center gap-1 px-4 sm:px-6 lg:px-8">
            {megaMenu.map((category) => (
              <div className="group relative" key={category.label}>
                <Link
                  className="flex h-12 items-center gap-1 rounded-lg px-4 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-primary"
                  href={category.href}
                  prefetch={false}
                >
                  {category.label}
                  <ChevronDown className="h-4 w-4" />
                </Link>
                <div className="invisible absolute left-0 top-full w-[880px] translate-y-2 rounded-lg border border-slate-200 bg-white p-5 opacity-0 shadow-2xl shadow-blue-900/12 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="grid grid-cols-[1fr_1fr_1.2fr] gap-5">
                    <div className="space-y-3">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">
                        {category.label}
                      </p>
                      {category.children.map((group) => (
                        <Link
                          className="block rounded-lg border border-slate-100 bg-slate-50 p-4 transition hover:border-primary/30 hover:bg-blue-50"
                          href={group.href}
                          key={group.label}
                          prefetch={false}
                        >
                          <p className="font-black text-slate-950">{group.label}</p>
                          <p className="mt-1 text-sm text-slate-500">
                            {group.products.length} product groups
                          </p>
                        </Link>
                      ))}
                    </div>
                    <div className="space-y-3">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                        Subcategories
                      </p>
                      {category.children.flatMap((group) =>
                        group.products.map((product) => (
                          <Link
                            className="block rounded-md px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-primary"
                            href={product.href}
                            key={`${group.label}-${product.label}`}
                            prefetch={false}
                          >
                            {group.label} / {product.label}
                          </Link>
                        )),
                      )}
                    </div>
                    <div className="rounded-lg bg-slate-950 p-4 text-white">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                        Featured products
                      </p>
                      <div className="mt-4 space-y-3">
                        {storefrontProducts
                          .filter((product) => product.category === category.label || product.hot)
                          .slice(0, 3)
                          .map((product) => (
                            <Link
                              className="block rounded-lg bg-white/8 p-3 transition hover:bg-white/14"
                              href={`/products/${product.slug}`}
                              key={product.id}
                              prefetch={false}
                            >
                              <p className="line-clamp-1 text-sm font-bold">{product.name}</p>
                              <p className="mt-1 text-xs text-slate-300">
                                {currency.format(product.price)} / {product.fitment}
                              </p>
                            </Link>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] xl:hidden"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <button
              aria-label="Close menu overlay"
              className="absolute inset-0 h-full w-full bg-slate-950/55 backdrop-blur-sm"
              type="button"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              animate={{ x: 0 }}
              className="absolute right-0 top-0 flex h-full w-[min(92vw,420px)] flex-col overflow-hidden border-l border-slate-200 bg-white text-slate-950 shadow-2xl shadow-slate-950/30"
              exit={{ x: "100%" }}
              initial={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
            >
              <div className="border-b border-slate-200 bg-white px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <Link
                    className="flex min-w-0 items-center gap-3"
                    href="/"
                    prefetch={false}
                    onClick={() => setMobileOpen(false)}
                  >
                    <LogoMark className="h-10 w-10" />
                    <span className="min-w-0">
                      <span className="block truncate text-base font-black text-slate-950">
                        AutoFlow Parts
                      </span>
                      <span className="block truncate text-xs font-bold uppercase tracking-[0.14em] text-primary">
                        Mobile menu
                      </span>
                    </span>
                  </Link>
                  <Button
                    aria-label="Close menu"
                    className="border-slate-200 bg-slate-50 text-slate-950 hover:bg-slate-100"
                    size="icon"
                    variant="outline"
                    onClick={() => setMobileOpen(false)}
                  >
                    <X className="h-5 w-5 text-current" />
                  </Button>
                </div>

                <label className="relative mt-4 block">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    className="h-12 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-primary focus:ring-4 focus:ring-blue-100"
                    placeholder="Search products..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") submitSearch();
                    }}
                  />
                </label>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-5">
                <div className="grid grid-cols-2 gap-2">
                  {navItems.map((item) => (
                    <Link
                      className={cn(
                        "rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-black text-slate-800 transition hover:border-primary/30 hover:bg-blue-50 hover:text-primary",
                        pathname === item.href && "border-primary/30 bg-blue-50 text-primary",
                      )}
                      href={item.href}
                      key={item.href}
                      prefetch={false}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    className="relative rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-black text-slate-800 transition hover:border-primary/30 hover:bg-blue-50 hover:text-primary"
                    href="/account"
                    prefetch={false}
                    onClick={() => setMobileOpen(false)}
                  >
                    Cart
                    {cartCount > 0 ? (
                      <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-white">
                        {cartCount}
                      </span>
                    ) : null}
                  </Link>
                  <Link
                    className="rounded-lg bg-slate-950 px-3 py-3 text-sm font-black text-white shadow-lg shadow-slate-950/15"
                    href={user ? "/account" : "/auth"}
                    prefetch={false}
                    onClick={() => setMobileOpen(false)}
                  >
                    {user ? "My Account" : "Sign In"}
                  </Link>
                </div>

                <div className="mt-6">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">
                    Categories
                  </p>
                  <div className="mt-3 space-y-3">
                    {megaMenu.map((category) => (
                      <div
                        className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm"
                        key={category.label}
                      >
                        <Link
                          className="flex items-center justify-between gap-3 font-black text-slate-950"
                          href={category.href}
                          prefetch={false}
                          onClick={() => setMobileOpen(false)}
                        >
                          {category.label}
                          <ChevronDown className="h-4 w-4 rotate-[-90deg] text-slate-400" />
                        </Link>
                        <div className="mt-3 space-y-3">
                          {category.children.map((group) => (
                            <div key={group.label}>
                              <Link
                                className="text-sm font-bold text-slate-700 hover:text-primary"
                                href={group.href}
                                prefetch={false}
                                onClick={() => setMobileOpen(false)}
                              >
                                {group.label}
                              </Link>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {group.products.map((item) => (
                                  <Link
                                    className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-primary transition hover:bg-primary hover:text-white"
                                    href={item.href}
                                    key={`${category.label}-${group.label}-${item.label}`}
                                    prefetch={false}
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    {item.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
