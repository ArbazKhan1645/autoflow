import { storefrontProducts } from "@/data/storefront";
import { StorefrontProductDetail } from "@/features/storefront/storefront-product-detail";

export async function generateStaticParams() {
  return storefrontProducts.map((product) => ({ slug: product.slug }));
}

export default async function StorefrontProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <StorefrontProductDetail slug={slug} />;
}
