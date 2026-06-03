"use client";

import { createJSONStorage } from "zustand/middleware";
import type { StateStorage } from "zustand/middleware";

// ─────────────────────────────────────────────────────────────
// Per-client persisted storage.
//
// localStorage is shared across an entire origin (domain), NOT per URL path.
// On the shared multi-tenant deployment every client lives on the same domain
// (…/arbazautostore/, …/ctautoparts/, …), so without scoping they would share
// the same sign-in / cart / cache. We namespace every persisted key with the
// active client slug so each client behaves like its own isolated app.
// ─────────────────────────────────────────────────────────────

// Inlined at build time. Set for production single-client builds.
const SINGLE_CLIENT_SLUG = process.env.NEXT_PUBLIC_CLIENT?.trim() || null;

function currentClientPrefix(): string {
  // Single-client build: one stable prefix for the whole site (it is also its
  // own origin, so this is just for consistent keys).
  if (SINGLE_CLIENT_SLUG) return SINGLE_CLIENT_SLUG;
  // Multi-tenant: the first path segment is the active client slug. It never
  // changes within a single client's pages (links are never cross-client).
  if (typeof window !== "undefined") {
    const seg = window.location.pathname.split("/").filter(Boolean)[0];
    if (seg) return decodeURIComponent(seg);
  }
  return "_root";
}

const scopedBacking: StateStorage = {
  getItem: (name) => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(`${currentClientPrefix()}::${name}`);
  },
  setItem: (name, value) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(`${currentClientPrefix()}::${name}`, value);
  },
  removeItem: (name) => {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(`${currentClientPrefix()}::${name}`);
  },
};

// Drop-in replacement for the default persist storage, scoped per client.
export const clientScopedStorage = createJSONStorage(() => scopedBacking);
