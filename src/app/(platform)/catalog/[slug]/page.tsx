import { ProductDetailScreen } from "@/features/catalog/product-detail-screen";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <ProductDetailScreen slug={slug} />;
}
