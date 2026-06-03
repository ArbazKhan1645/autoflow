// ─────────────────────────────────────────────────────────────
// CLIENT REGISTRY — single source of truth for every white-label
// client served from this deployment.
//
// To onboard a new client (see CLIENT_SETUP.md):
//   1. Add /src/lib/clients/<slug>.ts (copy an existing one)
//   2. Import + register it in CLIENTS below
//   3. Drop assets in /public/brand/<slug>/
//   4. npm run build && firebase deploy
//
// There is intentionally NO default/fallback client: the bare "/"
// and any unknown slug resolve to the 404 page so clients cannot
// discover or browse one another.
// ─────────────────────────────────────────────────────────────
import type { ClientConfig } from "./types";
import { autoflowparts } from "./autoflowparts";
import { arbazautostore } from "./arbazautostore";
// Prospect / onboarding clients (see Google Maps lead list).
import { ctautoparts } from "./ctautoparts";
import { kingsford } from "./kingsford";
import { jami } from "./jami";
import { firstautoparts } from "./firstautoparts";
import { aceautoparts } from "./aceautoparts";
import { airplex } from "./airplex";
import { ara } from "./ara";
import { actionaccessories } from "./actionaccessories";

export const CLIENTS = {
  autoflowparts,
  arbazautostore,
  ctautoparts,
  kingsford,
  jami,
  firstautoparts,
  aceautoparts,
  airplex,
  ara,
  actionaccessories,
} as const;

export type ClientSlug = keyof typeof CLIENTS;

const REGISTRY: Record<string, ClientConfig> = CLIENTS;

// Build-mode flags live in ./mode so client components can read them without
// importing this registry (which would bundle every client's config).
export { SINGLE_CLIENT_SLUG, isSingleClientBuild } from "./mode";
import { SINGLE_CLIENT_SLUG } from "./mode";

export function getClientSlugs(): string[] {
  // Production single-client export: emit ONLY the targeted client, so the
  // build contains just that one site (flattened to root afterwards). If the
  // slug is unregistered, the [client] layout's notFound() guard turns every
  // page into the not-found page → the deploy simply shows "not found".
  if (SINGLE_CLIENT_SLUG !== null && process.env.NODE_ENV === "production") {
    return [SINGLE_CLIENT_SLUG];
  }
  // Otherwise list every client. In single-client `next dev` this keeps all
  // slugs "known" (avoiding an output:export missing-param 500) while the
  // layout guard still 404s every client except the active one.
  return Object.keys(REGISTRY);
}

export function getClientConfig(slug: string | undefined | null): ClientConfig | null {
  if (!slug) return null;
  return REGISTRY[slug] ?? null;
}

export type { ClientConfig } from "./types";
export { baseCatalog, resolveCatalog } from "./_base-catalog";
export type { ClientCatalog } from "./types";
