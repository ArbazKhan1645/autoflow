// Run the dev server focused on ONE client.
//
//   npm run dev:client -- <clientSlug>
//   e.g. npm run dev:client -- arbazautostore
//
// Only that client is reachable; every other slug returns the 404 page, and
// "/" redirects to the client. Links keep the /<slug>/ prefix in dev (nothing
// is flattened until the production build:client export). Omit the slug to run
// the normal multi-tenant dev server (`npm run dev`).
import { spawnSync } from "node:child_process";

const slug = (process.argv[2] || process.env.CLIENT || "").trim();

if (!slug) {
  console.error("Usage: npm run dev:client -- <clientSlug>");
  console.error("Example: npm run dev:client -- arbazautostore");
  console.error("(For all clients, use: npm run dev)");
  process.exit(1);
}

console.log(
  `\n▶ Dev server for single client "${slug}" — open http://localhost:3000/ ` +
    `(redirects to /${slug})\n`,
);

const result = spawnSync("npm", ["run", "dev"], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, NEXT_PUBLIC_CLIENT: slug },
});

process.exit(result.status ?? 1);
