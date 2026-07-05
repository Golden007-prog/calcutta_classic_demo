import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

import { DishMarquee, SteamDivider } from "@/components/fx/Dividers";
import { Magnetic } from "@/components/fx/Magnetic";
import { ParallaxBand } from "@/components/fx/ParallaxBand";
import { CombosPinned } from "@/components/home/CombosPinned";
import { FoodieZoneTeaser } from "@/components/home/FoodieZoneTeaser";
import { HeroMomo } from "@/components/home/HeroMomo";
import { HeroVideo } from "@/components/home/HeroVideo";
import { InstagramWall } from "@/components/home/InstagramWall";
import { KineticHeadline } from "@/components/home/KineticHeadline";
import { MenuPreview } from "@/components/home/MenuPreview";
import { MomoMeter } from "@/components/home/MomoMeter";
import { VisitBlock } from "@/components/home/VisitBlock";
import { Glass } from "@/components/ui/Glass";
import { combos } from "@/data/menu";
import { site } from "@/data/site";

// Date-driven sections (daily special, festivals) compute client-side, so
// the page stays fully static — export-compatible for GitHub Pages.
export default function HomePage() {
  return (
    <>
      {/* Hero — video bg + glass panel + 3D momo + steam (features 66-68) */}
      <section className="grain relative -mt-16 flex min-h-[100svh] items-center overflow-hidden pt-16">
        <HeroVideo />

        {/* R3F momo hovers above the steamer basket — md+ only (A5.4):
            on phones it fought the hero photo and cost a WebGL context. */}
        <HeroMomo className="pointer-events-none absolute right-[3vw] top-[10vh] z-[5] hidden h-[54vh] w-[30vw] md:block" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-28 pt-16 md:px-8">
          <Glass variant="panel" className="max-w-2xl space-y-6 px-6 py-10 md:px-10">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-cream/70">
              <MapPin size={12} aria-hidden className="text-momo-gold" />
              Opposite Deshbandhu Park · Shyambazar
            </p>

            <KineticHeadline />

            <p className="max-w-xl text-pretty text-base text-cream/75 md:text-lg">
              Steam momos, crackling bhetki fish fry and the legendary{" "}
              <span className="font-semibold text-cream">₹20 Belgian Coffee</span>{" "}
              — {site.tagline.toLowerCase()}, since the first steamer hissed in
              Shyambazar.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Magnetic>
                <Link
                  href="/menu"
                  className="tap-target inline-flex items-center gap-2 rounded-full bg-momo-gold px-6 py-3 text-sm font-semibold text-on-gold transition-colors hover:bg-momo-gold/90"
                >
                  Explore the menu
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/visit"
                  className="tap-target inline-flex items-center gap-2 rounded-full border border-cream/25 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-momo-gold hover:text-momo-gold"
                >
                  Find the shop
                </Link>
              </Magnetic>
            </div>

            <p className="text-[11px] uppercase tracking-[0.3em] text-cream/65">
              {site.brandLines.join("  ·  ")}
            </p>
          </Glass>
        </div>
      </section>

      {/* Momo-Meter strip (feature 21) */}
      <section aria-label="Momo meter" className="border-b border-line py-14">
        <MomoMeter />
      </section>

      <CombosPinned combos={[...combos]} />
      <DishMarquee />
      <MenuPreview />
      <ParallaxBand />
      <FoodieZoneTeaser />
      <SteamDivider />
      <InstagramWall />
      <VisitBlock />
    </>
  );
}
