// Firebase predeploy hook (see firebase.json).
//
// Builds the RIGHT bundle depending on NEXT_PUBLIC_CLIENT:
//   - unset  → multi-tenant build (all clients under /<slug>/)
//   - set    → single-client build for that slug, flattened to the site root
//
// All clients (default):
//   firebase deploy --only hosting
//
// One client at the root (e.g. their own domain / a dedicated site):
//   PowerShell:  $env:NEXT_PUBLIC_CLIENT="ctautoparts"; firebase deploy --only hosting
//   bash:        NEXT_PUBLIC_CLIENT=ctautoparts firebase deploy --only hosting
import { spawnSync } from "node:child_process";

const slug = process.env.NEXT_PUBLIC_CLIENT?.trim();
const args = slug ? ["run", "build:client", "--", slug] : ["run", "build"];

console.log(
  slug
    ? `▶ Predeploy: single-client build for "${slug}" (served at root)`
    : "▶ Predeploy: multi-tenant build (all clients under /<slug>/)",
);

const result = spawnSync("npm", args, { stdio: "inherit", shell: true });
process.exit(result.status ?? 1);
