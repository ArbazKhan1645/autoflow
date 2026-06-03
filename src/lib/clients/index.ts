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

export const CLIENTS = {
  autoflowparts,
  arbazautostore,
} as const;

export type ClientSlug = keyof typeof CLIENTS;

const REGISTRY: Record<string, ClientConfig> = CLIENTS;

export function getClientSlugs(): string[] {
  return Object.keys(REGISTRY);
}

export function getClientConfig(slug: string | undefined | null): ClientConfig | null {
  if (!slug) return null;
  return REGISTRY[slug] ?? null;
}

export type { ClientConfig } from "./types";
export { baseCatalog, resolveCatalog } from "./_base-catalog";
export type { ClientCatalog } from "./types";
