import { Clock, MapPin } from "lucide-react";
import Link from "next/link";

import { CallButton } from "@/components/layout/CallButton";
import { NewsletterForm } from "@/components/NewsletterForm";
import { OpenBadge } from "@/components/OpenBadge";
import { SoundToggle } from "@/components/SoundToggle";
import { InstagramIcon } from "@/components/ui/icons";
import { VegDot } from "@/components/ui/VegDot";
import { WeatherWidget } from "@/components/WeatherBanner";
import { site } from "@/data/site";

const exploreLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/combos", label: "Combos" },
  { href: "/our-story", label: "Our Story" },
  { href: "/foodie-zone", label: "Foodie Zone" },
  { href: "/gallery", label: "Gallery" },
  { href: "/visit", label: "Visit" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 md:grid-cols-4 md:px-8">
        <div className="space-y-3">
          <p className="font-display text-xl font-semibold">
            The <span className="text-momo-gold">Calcutta</span> Classics
          </p>
          <p className="text-sm text-soft">{site.tagline}</p>
          <p className="max-w-xs text-sm text-soft">
            Street-corner classics, steamed and fried with love in Shyambazar.
          </p>
        </div>

        <nav aria-label="Explore" className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wider text-soft">
            Explore
          </p>
          <ul className="space-y-2 text-sm">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-foreground/80 transition-colors hover:text-momo-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wider text-soft">
            Visit us
          </p>
          <p className="flex items-start gap-2 text-sm text-foreground/80">
            <MapPin size={16} aria-hidden className="mt-0.5 shrink-0 text-momo-gold" />
            {site.location.addressLine}, {site.location.city}
          </p>
          <p className="flex items-start gap-2 text-sm text-foreground/80">
            <Clock size={16} aria-hidden className="mt-0.5 shrink-0 text-momo-gold" />
            {site.hours.label}
          </p>
          <OpenBadge />
          <CallButton />
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-momo-gold"
          >
            <InstagramIcon size={16} className="text-momo-gold" />
            {site.instagram.handle}
          </a>
          <WeatherWidget />
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wider text-soft">
            Good to know
          </p>
          <p className="flex items-center gap-2 text-sm text-foreground/80">
            <VegDot veg /> Vegetarian
          </p>
          <p className="flex items-center gap-2 text-sm text-foreground/80">
            <VegDot veg={false} /> Non-vegetarian
          </p>
          <p className="text-sm text-soft">
            No delivery apps — walk in, call, or WhatsApp. That&apos;s the
            Shyambazar way.
          </p>
          <NewsletterForm />
          <SoundToggle />
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-soft sm:flex-row md:px-8">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.location.area},{" "}
            {site.location.city}
          </p>
          <p className="font-display italic">“Bite into happiness”</p>
        </div>
      </div>
    </footer>
  );
}
