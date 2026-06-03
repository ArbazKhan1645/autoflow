import { getClientConfig, resolveCatalog } from "@/lib/clients";
import { StorefrontProductDetail } from "@/features/storefront/storefront-product-detail";

// One product page per client × that client's storefront products.
export function generateStaticParams({
  params,
}: {
  params: { client: string };
}) {
  const catalog = resolveCatalog(getClientConfig(params.client)?.catalog);
  return catalog.storefrontProducts.map((product) => ({ slug: product.slug }));
}

export default async function StorefrontProductPage({
  params,
}: {
  params: Promise<{ client: string; slug: string }>;
}) {
  const { slug } = await params;

  return <StorefrontProductDetail slug={slug} />;
}
