import { ImageResponse } from "next/og";

import { getItem, menuItems } from "@/data/menu";

/** Feature 103 — dynamic OG image per dish (name + price + veg dot). */
export const alt = "Dish from The Calcutta Classics";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return menuItems.map((item) => ({ slug: item.slug }));
}

export default async function DishOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getItem(slug);

  const name = item?.name ?? "The Calcutta Classics";
  const price = item?.price !== null && item ? `₹${item.price}` : "Ask in store";
  const veg = item?.veg ?? false;
  const description = item?.description.split(".")[0] ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "70px 80px",
          background: "linear-gradient(135deg, #0f0f10 0%, #241505 100%)",
          borderLeft: "22px solid #E8A13A",
          color: "#F6F1E7",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* Indian-standard veg/non-veg marker */}
          <div
            style={{
              width: 54,
              height: 54,
              border: `6px solid ${veg ? "#4F7A4F" : "#D64533"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 999,
                background: veg ? "#4F7A4F" : "#D64533",
                display: "flex",
              }}
            />
          </div>
          <div style={{ fontSize: 34, color: "#b5aea0", display: "flex" }}>
            The Calcutta Classics · Shyambazar
          </div>
        </div>

        <div style={{ fontSize: 82, fontWeight: 700, marginTop: 30, display: "flex" }}>{name}</div>
        <div style={{ fontSize: 34, color: "#b5aea0", marginTop: 16, display: "flex" }}>
          {description}.
        </div>
        <div style={{ fontSize: 60, color: "#E8A13A", fontWeight: 700, marginTop: 34, display: "flex" }}>
          {price}
        </div>
      </div>
    ),
    size,
  );
}
