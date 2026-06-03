// Build a dedicated SINGLE-CLIENT bundle served at the domain root.
//
//   npm run build:client -- <clientSlug>
//   e.g. npm run build:client -- arbazautostore
//
// This sets NEXT_PUBLIC_CLIENT and runs the normal build. The registry then
// builds only that client (src/lib/clients/index.ts -> getClientSlugs), links
// render without the /<slug>/ prefix, and the post-build step flattens the
// client's pages to the root of out/ (see scripts/fix-firebase-rsc.mjs).
//
// If the slug is omitted the build is rejected. If the slug does not match a
// registered client, the resulting site contains only the 404 page.
import { spawnSync } from "node:child_process";

const slug = (process.argv[2] || process.env.CLIENT || "").trim();

if (!slug) {
  console.error("Usage: npm run build:client -- <clientSlug>");
  console.error("Example: npm run build:client -- arbazautostore");
  process.exit(1);
}

console.log(`\n▶ Building single-client bundle for "${slug}" (served at root)\n`);

const result = spawnSync("npm", ["run", "build"], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, NEXT_PUBLIC_CLIENT: slug },
});

process.exit(result.status ?? 1);
