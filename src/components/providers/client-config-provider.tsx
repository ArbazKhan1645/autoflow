"use client";

import { createContext, useContext, useMemo } from "react";
import { usePathname } from "next/navigation";
import type { ClientCatalog, ClientConfig } from "@/lib/clients";
import { resolveCatalog } from "@/lib/clients";

interface ClientContextValue {
  config: ClientConfig;
  slug: string;
  catalog: ClientCatalog;
}

const ClientConfigContext = createContext<ClientContextValue | null>(null);

export function ClientConfigProvider({
  config,
  children,
}: {
  config: ClientConfig;
  children: React.ReactNode;
}) {
  const value = useMemo<ClientContextValue>(
    () => ({
      config,
      slug: config.slug,
      catalog: resolveCatalog(config.catalog),
    }),
    [config],
  );

  return (
    <ClientConfigContext.Provider value={value}>
      {children}
    </ClientConfigContext.Provider>
  );
}

function useClientContext(): ClientContextValue {
  const ctx = useContext(ClientConfigContext);
  if (!ctx) {
    throw new Error("useClientConfig must be used within <ClientConfigProvider>");
  }
  return ctx;
}

/** Full resolved client config for the active tenant. */
export function useClientConfig(): ClientConfig {
  return useClientContext().config;
}

/** Resolved catalog (client override merged over the base catalog). */
export function useCatalog(): ClientCatalog {
  return useClientContext().catalog;
}

/**
 * Navigation helpers that keep every link/route under the active
 * client's URL prefix (e.g. href("/products") -> "/<slug>/products").
 */
export function useClient() {
  const { config, slug } = useClientContext();
  const pathname = usePathname();

  return useMemo(() => {
    const base = `/${slug}`;

    const href = (path: string) => {
      if (!path || path === "/") return base;
      // Leave absolute URLs, hashes and query-only links untouched.
      if (/^(https?:|mailto:|tel:|#|\?)/.test(path)) return path;
      const clean = path.startsWith("/") ? path : `/${path}`;
      return `${base}${clean}`;
    };

    // Compare a client-relative path against the current pathname.
    const isActive = (path: string, { exact = true } = {}) => {
      const target = href(path);
      return exact ? pathname === target : pathname.startsWith(target);
    };

    // Strip the client prefix off the current pathname ("/" at root).
    const relativePath =
      pathname === base ? "/" : pathname.replace(`${base}`, "") || "/";

    return { slug, config, href, isActive, relativePath };
  }, [config, slug, pathname]);
}

/**
 * Currency/number formatters built from the active client's locale.
 * Replaces the hardcoded singletons that used to live in lib/utils.
 */
export function useClientCurrency() {
  const { config } = useClientContext();
  return useMemo(() => {
    const { code, locale, symbol } = config.currency;
    // Names mirror the old lib/utils singletons so components migrate 1:1.
    const currency = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: code,
      maximumFractionDigits: 0,
    });
    const preciseCurrency = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: code,
      maximumFractionDigits: 2,
    });
    const compactNumber = new Intl.NumberFormat(locale, {
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return { currency, preciseCurrency, compactNumber, symbol, code, locale };
  }, [config]);
}
