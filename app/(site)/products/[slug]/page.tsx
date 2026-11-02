import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage } from "@/components/product/product-page";
import { products, type ProductSlug } from "@/lib/content/products";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return { title: product.name, description: product.summary };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!products.some((p) => p.slug === slug)) notFound();
  return <ProductPage slug={slug as ProductSlug} />;
}
