import { getClientConfig, resolveCatalog } from "@/lib/clients";
import { ProductDetailScreen } from "@/features/catalog/product-detail-screen";

// One CRM catalog detail page per client × that client's products.
export function generateStaticParams({
  params,
}: {
  params: { client: string };
}) {
  const catalog = resolveCatalog(getClientConfig(params.client)?.catalog);
  return catalog.products.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ client: string; slug: string }>;
}) {
  const { slug } = await params;

  return <ProductDetailScreen slug={slug} />;
}
