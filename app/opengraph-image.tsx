import { ImageResponse } from "next/og";

import { site } from "@/data/site";

export const dynamic = "force-static";

export const alt = "The Calcutta Classics — street food in Shyambazar, Kolkata";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f0f10 0%, #241505 100%)",
          border: "14px solid #E8A13A",
          color: "#F6F1E7",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 120, display: "flex" }}>🥟</div>
        <div style={{ fontSize: 64, fontWeight: 700, marginTop: 12, display: "flex" }}>
          The <span style={{ color: "#E8A13A", margin: "0 14px" }}>Calcutta</span> Classics
        </div>
        <div style={{ fontSize: 30, color: "#b5aea0", marginTop: 14, display: "flex" }}>
          {site.tagline} · Opposite Deshbandhu Park, Shyambazar
        </div>
        <div style={{ fontSize: 26, color: "#E8A13A", marginTop: 22, display: "flex" }}>
          Steam Momos · Bhetki Fish Fry · the ₹20 Belgian Coffee
        </div>
      </div>
    ),
    size,
  );
}
