import { products } from "@/data/products";
import { ProductDetailScreen } from "@/features/catalog/product-detail-screen";

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <ProductDetailScreen slug={slug} />;
}
