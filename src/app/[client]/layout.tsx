import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppProviders } from "@/components/providers/app-providers";
import { ClientConfigProvider } from "@/components/providers/client-config-provider";
import { ThemeInjector } from "@/components/theme/theme-injector";
import {
  SINGLE_CLIENT_SLUG,
  getClientConfig,
  getClientSlugs,
} from "@/lib/clients";

// Pre-generate one fully static copy of the app per registered client.
export function generateStaticParams() {
  return getClientSlugs().map((client) => ({ client }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ client: string }>;
}): Promise<Metadata> {
  const { client } = await params;
  const config = getClientConfig(client);
  if (!config || (SINGLE_CLIENT_SLUG && client !== SINGLE_CLIENT_SLUG)) {
    return { title: "Not found", robots: { index: false, follow: false } };
  }

  // Absolute base for OG/Twitter image URLs. Override per deployment (e.g. a
  // client's own domain) with NEXT_PUBLIC_SITE_URL.
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://autoflow-fe8a5.web.app";

  return {
    metadataBase: new URL(siteUrl),
    applicationName: config.storeName,
    title: {
      default: config.seo.title,
      template: `%s | ${config.storeName}`,
    },
    description: config.seo.description,
    keywords: config.seo.keywords.split(",").map((k) => k.trim()),
    icons: { icon: config.faviconPath },
    openGraph: {
      title: config.seo.title,
      description: config.seo.description,
      images: [{ url: config.seo.ogImage }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.seo.title,
      description: config.seo.description,
      images: [config.seo.ogImage],
    },
  };
}

export default async function ClientLayout({
  params,
  children,
}: {
  params: Promise<{ client: string }>;
  children: React.ReactNode;
}) {
  const { client } = await params;
  const config = getClientConfig(client);

  // Unknown slug → 404. Static export simply never emits this route, so
  // Firebase serves /404.html for it; this guard covers dev + safety.
  // In single-client mode, every other client is also off-limits (matters in
  // `next dev`, where routes aren't restricted to generateStaticParams).
  if (!config || (SINGLE_CLIENT_SLUG && client !== SINGLE_CLIENT_SLUG)) {
    notFound();
  }

  return (
    <>
      <ThemeInjector config={config} />
      <ClientConfigProvider config={config}>
        <AppProviders>{children}</AppProviders>
      </ClientConfigProvider>
    </>
  );
}
