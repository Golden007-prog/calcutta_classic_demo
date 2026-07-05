import { Clock, MapPin } from "lucide-react";

import { DishImage } from "@/components/ui/DishImage";
import { Glass } from "@/components/ui/Glass";
import { InstagramIcon } from "@/components/ui/icons";
import { site } from "@/data/site";

export function VisitBlock() {
  return (
    <section aria-labelledby="visit-heading" className="mx-auto max-w-6xl px-4 py-16 md:px-8">
      <Glass variant="panel" className="overflow-hidden">
        <div className="grid md:grid-cols-2">
          <DishImage
            src="/images/mood/storefront-dusk.jpg"
            alt="The Calcutta Classics stall glowing at dusk in Shyambazar"
            label="Visit"
            className="aspect-[4/3] w-full md:aspect-auto md:h-full"
            sizes="(max-width: 768px) 100vw, 560px"
          />
          <div className="grain relative flex flex-col justify-center gap-4 px-6 py-10 md:px-10">
            <h2 id="visit-heading" className="font-display text-3xl font-semibold md:text-4xl">
              Steam first. Questions later.
            </h2>
            <p className="flex items-start gap-2 text-sm text-soft md:text-base">
              <MapPin size={16} aria-hidden className="mt-1 shrink-0 text-momo-gold" />
              {site.location.addressLine}, {site.location.city} — a two-minute
              walk from {site.location.nearestMetro}.
            </p>
            <p className="flex items-start gap-2 text-sm text-soft md:text-base">
              <Clock size={16} aria-hidden className="mt-1 shrink-0 text-momo-gold" />
              {site.hours.label}
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <a
                href={site.location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target inline-flex items-center gap-2 rounded-full bg-momo-gold px-6 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-momo-gold/90"
              >
                <MapPin size={16} aria-hidden />
                Get directions
              </a>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-foreground/80 transition-colors hover:text-momo-gold"
              >
                <InstagramIcon size={16} />
                {site.instagram.handle}
              </a>
            </div>
          </div>
        </div>
      </Glass>
    </section>
  );
}
