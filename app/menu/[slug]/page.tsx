import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DishDetail } from "@/components/menu/DishDetail";
import { getItem, menuItems } from "@/data/menu";
import { formatINR } from "@/lib/utils";

export function generateStaticParams() {
  return menuItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item) return {};
  return {
    title: `${item.name}${item.price !== null ? ` · ${formatINR(item.price)}` : ""}`,
    description: item.description,
  };
}

/** Direct load / shared link → full dish page (feature 2). */
export default async function DishPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item) notFound();

  return <DishDetail item={item} />;
}
