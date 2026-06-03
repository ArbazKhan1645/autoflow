import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppProviders } from "@/components/providers/app-providers";
import { ClientConfigProvider } from "@/components/providers/client-config-provider";
import { ThemeInjector } from "@/components/theme/theme-injector";
import { getClientConfig, getClientSlugs } from "@/lib/clients";

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
  if (!config) {
    return { title: "Not found", robots: { index: false, follow: false } };
  }

  return {
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
  if (!config) notFound();

  return (
    <>
      <ThemeInjector config={config} />
      <ClientConfigProvider config={config}>
        <AppProviders>{children}</AppProviders>
      </ClientConfigProvider>
    </>
  );
}
