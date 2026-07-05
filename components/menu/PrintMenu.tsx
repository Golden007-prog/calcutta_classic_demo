import { combos, menuItems } from "@/data/menu";
import { site } from "@/data/site";
import { CATEGORY_LABELS, type Category } from "@/data/types";
import { formatINR, pluralize } from "@/lib/utils";

const ORDER: Category[] = ["momos", "chaat-snacks", "fried-loaded", "beverages"];

/**
 * Feature 15 — print-optimized menu. Hidden on screen; the "Download menu"
 * button triggers window.print() and print CSS hides the interactive app.
 */
export function PrintMenu() {
  return (
    <section aria-hidden className="hidden print:block">
      <h1 style={{ fontSize: "22pt", marginBottom: "2pt" }}>{site.name}</h1>
      <p style={{ fontSize: "10pt", marginBottom: "14pt" }}>
        {site.location.addressLine}, {site.location.city} · {site.hours.label} ·{" "}
        {site.instagram.handle}
      </p>

      {ORDER.map((category) => (
        <div key={category} style={{ marginBottom: "12pt" }}>
          <h2 style={{ fontSize: "14pt", borderBottom: "1pt solid #999", marginBottom: "6pt" }}>
            {CATEGORY_LABELS[category]}
          </h2>
          <table style={{ width: "100%", fontSize: "11pt" }}>
            <tbody>
              {menuItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <tr key={item.slug}>
                    <td style={{ padding: "2pt 0" }}>
                      {item.veg ? "🟢" : "🔴"} {item.name}
                    </td>
                    <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                      {item.price !== null
                        ? `${formatINR(item.price)}${item.priceNote && item.variants ? ` (${item.priceNote})` : ""}`
                        : "Ask in store"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}

      <div>
        <h2 style={{ fontSize: "14pt", borderBottom: "1pt solid #999", marginBottom: "6pt" }}>
          Signature Combos
        </h2>
        <table style={{ width: "100%", fontSize: "11pt" }}>
          <tbody>
            {combos.map((combo) => (
              <tr key={combo.slug}>
                <td style={{ padding: "2pt 0" }}>
                  <strong>{combo.name}</strong>
                  <br />
                  <span style={{ fontSize: "9pt" }}>
                    {combo.contents.map((c) => `${c.qty}${c.unit ? ` ${pluralize(c.qty, c.unit)}` : ""} ${c.label}`).join(", ")}
                  </span>
                </td>
                <td style={{ textAlign: "right", verticalAlign: "top", whiteSpace: "nowrap" }}>
                  {formatINR(combo.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: "9pt", marginTop: "14pt" }}>
        {site.brandLines.join(" · ")} — no delivery apps, walk in hungry.
      </p>
    </section>
  );
}
