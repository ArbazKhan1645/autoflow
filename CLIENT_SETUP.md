# How to deploy this storefront for a new client

This project is **multi-tenant**. One Firebase site serves every client from a
URL prefix that matches the client's config slug:

```
https://autoflow-fe8a5.web.app/<clientSlug>/             → storefront home
https://autoflow-fe8a5.web.app/<clientSlug>/products/    → storefront products
https://autoflow-fe8a5.web.app/<clientSlug>/crm/         → that client's CRM/admin
```

The bare root (`/`) and any **unknown** slug return a neutral 404 page, so no
client can discover or browse another client. Only send each client their own
URL — `…/<theirSlug>/`.

Each client gets one config file. The whole app reads from it: branding, theme
colors, contact details, currency, SEO, marketing copy, and (optionally) its own
catalog.

---

## 1. Add a client config

Copy an existing client file as a starting point:

```bash
cp src/lib/clients/arbazautostore.ts src/lib/clients/<slug>.ts
```

Pick a **slug** that is URL-safe (lowercase, no spaces) — this is what appears
in the URL, e.g. `arbazautostore`. Edit the new file:

- `slug` — must equal the filename and the URL segment
- `storeName`, `storeTagline`, `storeDescription`, `storeSlogan`
- `contact` — address, phone, email, supportLabel
- `social` — facebook / instagram / whatsapp / twitter (leave `""` to hide)
- `theme` — primary / accent / background / foreground / surface / border / radius
- `currency` — symbol, ISO `code` (e.g. `USD`, `PKR`), and `locale`
- `seo` — title, description, keywords, ogImage
- `trustBadges`, `stats`, `features` — homepage marketing content
- `logoMarkPath`, `logoFullPath`, `faviconPath`, `seo.ogImage` — point at
  `/brand/<slug>/...` (see step 3)

### Optional: a custom catalog for this client

By default every client shows the shared catalog. To give a client its own
products/menu, add a `catalog` override — anything you omit falls back to the
shared base catalog (`src/lib/clients/_base-catalog.ts`):

```ts
catalog: {
  storefrontProducts: [ /* ... */ ],
  megaMenu: [ /* ... */ ],
  // products, catalogCategories, faqs, storefrontVideos, companyProjects,
  // clientFeedback are also overridable
},
```

## 2. Register the client

In `src/lib/clients/index.ts`, import and add it to `CLIENTS`:

```ts
import { myclient } from "./myclient";

export const CLIENTS = {
  autoflowparts,
  arbazautostore,
  myclient, // ← add here
} as const;
```

That is the only registration step — `generateStaticParams`, routing and the
404 behavior all read from this list automatically.

## 3. Add brand assets

Drop the client's files in `public/brand/<slug>/`:

- `mark.png` — small logo mark (shown in header/footer/sidebar)
- `logo.png` — full logo (optional)
- `favicon.ico` — browser tab icon
- `og-image.png` — social share image (1200×630px)

Keep the filenames matching whatever you set in the config paths.

## 4. Build and deploy

```bash
npm run build      # statically generates /<slug>/... for every registered client
firebase deploy --only hosting
```

A rebuild + redeploy is required to onboard a client, because each client's
pages are pre-generated as static files.

## 5. Hand off

Send the client only their URL: `https://autoflow-fe8a5.web.app/<slug>/`.
They never see the root, the client list, or any other client.

---

## How it works (for maintainers)

- `src/lib/clients/` — the registry. `getClientSlugs()` drives
  `generateStaticParams`; `getClientConfig(slug)` resolves a config or `null`.
- `src/app/[client]/layout.tsx` — resolves the config from the URL, calls
  `notFound()` for unknown slugs, injects the theme (`ThemeInjector`) and
  provides config + catalog via `ClientConfigProvider`.
- Components read the active client through hooks in
  `src/components/providers/client-config-provider.tsx`:
  - `useClientConfig()` — identity, contact, theme, SEO, marketing copy
  - `useClient()` — `href("/path")` keeps links under `/<slug>`, plus `isActive`
  - `useClientCurrency()` — currency/number formatters for the client's locale
  - `useCatalog()` — the resolved catalog (override merged over base)
- `src/app/not-found.tsx` is exported as `404.html`; Firebase serves it for the
  bare root and any unknown path.
