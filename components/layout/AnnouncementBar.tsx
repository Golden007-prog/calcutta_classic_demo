import Link from "next/link";

import { AnnouncementDismiss } from "@/components/layout/AnnouncementDismiss";
import { festivals } from "@/data/foodie";

/**
 * Features 44 + 48 — festival banner + dismissible announcements.
 * Server-rendered (zero CLS); an inline script hides it pre-paint for
 * users who already dismissed this message id.
 */

const STANDING_ANNOUNCEMENT = {
  id: "pizza-2026",
  text: "NEW: Crispy Chicken Pizza has landed — hot, crispy & oh-so good. Price at the counter!",
  href: "/menu/crispy-chicken-pizza",
};

function activeBanner(date = new Date()) {
  const ist = new Date(date.getTime() + 330 * 60000);
  const value = (ist.getUTCMonth() + 1) * 100 + ist.getUTCDate();
  const festival = festivals.find((f) => {
    const start = f.start[0] * 100 + f.start[1];
    const end = f.end[0] * 100 + f.end[1];
    return start <= end ? value >= start && value <= end : value >= start || value <= end;
  });
  return festival
    ? {
        id: `festival-${festival.name.toLowerCase().replace(/\s+/g, "-")}`,
        text: `${festival.name}${festival.bengali ? ` · ${festival.bengali}` : ""} — ${festival.line}`,
        href: `/menu/${festival.slug}`,
      }
    : STANDING_ANNOUNCEMENT;
}

export function AnnouncementBar() {
  const banner = activeBanner();

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(localStorage.getItem('cc-announce-${banner.id}')==='dismissed'){document.documentElement.setAttribute('data-announce-hidden','1')}}catch(e){}`,
        }}
      />
      <div
        id="cc-announce"
        className="relative z-40 border-b border-momo-gold/30 bg-momo-gold/10 text-sm backdrop-blur-sm"
      >
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2 md:px-8">
          <Link href={banner.href} className="min-w-0 flex-1 truncate hover:text-momo-gold">
            <span aria-hidden className="mr-2">📣</span>
            {banner.text}
          </Link>
          <AnnouncementDismiss id={banner.id} />
        </div>
      </div>
    </>
  );
}
