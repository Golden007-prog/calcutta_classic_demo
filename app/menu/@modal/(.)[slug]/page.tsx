import { notFound } from "next/navigation";

import { DishDetail } from "@/components/menu/DishDetail";
import { DishModal } from "@/components/menu/DishModal";
import { getItem, menuItems } from "@/data/menu";

export function generateStaticParams() {
  return menuItems.map((item) => ({ slug: item.slug }));
}

/** Soft navigation from a dish card → modal over the menu (feature 2). */
export default async function InterceptedDishPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item) notFound();

  return (
    <DishModal>
      <DishDetail item={item} inModal />
    </DishModal>
  );
}
