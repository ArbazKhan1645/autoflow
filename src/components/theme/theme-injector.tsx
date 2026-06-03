import type { ClientConfig } from "@/lib/clients/types";

// ─────────────────────────────────────────────────────────────
// Injects the active client's theme as CSS variable overrides.
// It remaps the SAME :root variables defined in app/globals.css
// (which Tailwind reads via the `@theme inline` block), so brand
// colors change with zero component edits. Rendered server-side
// in the [client] layout, before any content paints.
// ─────────────────────────────────────────────────────────────
export function ThemeInjector({ config }: { config: ClientConfig }) {
  const t = config.theme;
  const css = `:root{`
    + `--background:${t.background};`
    + `--foreground:${t.foreground};`
    + `--surface:${t.surface};`
    + `--surface-muted:${t.surfaceMuted};`
    + `--border-soft:${t.border};`
    + `--primary:${t.primary};`
    + `--primary-foreground:${t.primaryForeground};`
    + `--accent:${t.accent};`
    + `--accent-foreground:${t.accentForeground};`
    + `--radius:${t.radius};`
    + `}`;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
