import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, sep } from "node:path";

const outDir = join(process.cwd(), "out");

function walkDirs(dir, dirs = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    const child = join(dir, entry.name);
    dirs.push(child);
    walkDirs(child, dirs);
  }

  return dirs;
}

function walkTxtFiles(dir, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const child = join(dir, entry.name);

    if (entry.isDirectory()) {
      walkTxtFiles(child, files);
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".txt")) {
      files.push(child);
    }
  }

  return files;
}

function flattenedName(sourceRoot, sourceFile) {
  const parts = relative(sourceRoot, sourceFile).split(sep);
  const last = parts.pop()?.replace(/\.txt$/, "") ?? "";

  return [...parts, last].filter(Boolean).join(".") + ".txt";
}

if (!existsSync(outDir)) {
  throw new Error("Missing out directory. Run next build before fixing Firebase RSC files.");
}

let copied = 0;

for (const dir of walkDirs(outDir)) {
  const name = dir.split(sep).pop();

  if (!name?.startsWith("__next")) continue;

  const parent = dirname(dir);

  for (const file of walkTxtFiles(dir)) {
    const target = join(parent, `${name}.${flattenedName(dir, file)}`);

    if (file === target) continue;

    mkdirSync(dirname(target), { recursive: true });
    copyFileSync(file, target);
    copied += 1;
  }
}

console.log(`Firebase RSC compatibility files copied: ${copied}`);

// ─────────────────────────────────────────────────────────────
// SINGLE-CLIENT MODE: lift the one client's pages to the site root.
// Only runs when NEXT_PUBLIC_CLIENT is set (see scripts/build-client.mjs).
// ─────────────────────────────────────────────────────────────
const singleSlug = process.env.NEXT_PUBLIC_CLIENT?.trim();

function listFiles(dir, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const child = join(dir, entry.name);
    if (entry.isDirectory()) listFiles(child, files);
    else if (entry.isFile()) files.push(child);
  }
  return files;
}

if (singleSlug) {
  const clientDir = join(outDir, singleSlug);

  if (!existsSync(clientDir) || !statSync(clientDir).isDirectory()) {
    console.warn(
      `Single-client build: "${singleSlug}" did not generate any pages — ` +
        `the deploy will only contain the 404 page. Check the slug exists in ` +
        `src/lib/clients/index.ts.`,
    );
  } else {
    // 1. Move the client's pages up to the root (overwriting the brand-free
    //    root index that the multi-tenant build produced).
    cpSync(clientDir, outDir, { recursive: true, force: true });
    rmSync(clientDir, { recursive: true, force: true });

    // 2. Rewrite any remaining "/<slug>/..." references (RSC payloads, router
    //    data, absolute links) to be root-relative.
    const prefix = `/${singleSlug}`;
    const rewriteExt = new Set([".html", ".txt", ".js", ".json", ".css"]);
    let rewritten = 0;

    for (const file of listFiles(outDir)) {
      const dot = file.lastIndexOf(".");
      const ext = dot === -1 ? "" : file.slice(dot);
      if (!rewriteExt.has(ext)) continue;

      const original = readFileSync(file, "utf8");
      if (!original.includes(prefix)) continue;

      const updated = original
        .split(`${prefix}/`).join("/")
        .split(`${prefix}"`).join('/"')
        .split(`${prefix}\\"`).join('/\\"');

      if (updated !== original) {
        writeFileSync(file, updated);
        rewritten += 1;
      }
    }

    console.log(
      `Single-client build: "${singleSlug}" flattened to root (${rewritten} files rewritten).`,
    );
  }
}
