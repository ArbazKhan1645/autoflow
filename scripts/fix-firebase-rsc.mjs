import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
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
