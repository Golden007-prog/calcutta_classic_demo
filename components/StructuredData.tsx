import { combos, menuItems } from "@/data/menu";
import { site } from "@/data/site";
import { CATEGORY_LABELS, type Category } from "@/data/types";
import { SITE_URL } from "@/lib/site-url";
import { SHOP } from "@/components/visit/VisitSections";

/**
 * Feature 102 — Restaurant (⊂ LocalBusiness) + Menu/MenuItem JSON-LD with
 * geo, hours and ₹ price range.
 */
export function StructuredData() {
  const categories: Category[] = ["momos", "chaat-snacks", "fried-loaded", "beverages"];

  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE_URL}#restaurant`,
    name: site.name,
    url: SITE_URL,
    image: `${SITE_URL}/images/hero/momo-basket.jpg`,
    servesCuisine: ["Street Food", "Momos", "Bengali", "Fast Food"],
    priceRange: "₹",
    currenciesAccepted: "INR",
    slogan: site.tagline,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.location.addressLine,
      addressLocality: site.location.city,
      addressRegion: site.location.state,
      addressCountry: site.location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SHOP.lat,
      longitude: SHOP.lon,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "12:00",
        closes: "22:00",
      },
    ],
    sameAs: [site.instagram.url],
    hasMenu: {
      "@type": "Menu",
      "@id": `${SITE_URL}/menu#menu`,
      name: "The Calcutta Classics Menu",
      hasMenuSection: [
        ...categories.map((category) => ({
          "@type": "MenuSection",
          name: CATEGORY_LABELS[category],
          hasMenuItem: menuItems
            .filter((item) => item.category === category)
            .map((item) => ({
              "@type": "MenuItem",
              name: item.name,
              description: item.description,
              url: `${SITE_URL}/menu/${item.slug}`,
              image: `${SITE_URL}${item.image}`,
              ...(item.price !== null && {
                offers: {
                  "@type": "Offer",
                  price: item.price,
                  priceCurrency: "INR",
                },
              }),
              suitableForDiet: item.veg
                ? "https://schema.org/VegetarianDiet"
                : undefined,
            })),
        })),
        {
          "@type": "MenuSection",
          name: "Signature Combos",
          hasMenuItem: combos.map((combo) => ({
            "@type": "MenuItem",
            name: combo.name,
            description: combo.description,
            offers: { "@type": "Offer", price: combo.price, priceCurrency: "INR" },
          })),
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
