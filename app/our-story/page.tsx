import type { Metadata } from "next";

import { HistoryTimeline, PressWall, Reveal } from "@/components/community/StorySections";
import { DishImage } from "@/components/ui/DishImage";
import { Glass } from "@/components/ui/Glass";

export const metadata: Metadata = {
  title: "Our Story — Shyambazar, the first steamer & the ₹20 legend",
  description:
    "How a small stall opposite Deshbandhu Park joined a century of North Kolkata street food — one steamer, one spice shaker and a ₹20 Belgian Coffee at a time.",
};

const BEATS = [
  {
    image: "/images/mood/storefront-dusk.jpg",
    kicker: "Chapter one",
    title: "A corner opposite the park",
    copy: "Shyambazar doesn't hand out attention for free. The five-point crossing has seen a hundred years of telebhaja, rolls and phuchka wars — a new stall gets one chance at a first impression. Ours was a bamboo basket, a borrowed table, and steam you could see from the park gate.",
  },
  {
    image: "/images/hero/momo-basket.jpg",
    kicker: "Chapter two",
    title: "The first steamer",
    copy: "The lid came off at noon and the first plate of steam momos went to a rickshaw-wala who paid, tasted, and stood there silently for a full minute. He came back the next day with four friends. That was our entire marketing department.",
  },
  {
    image: "/images/mood/coffee-pour.jpg",
    kicker: "Chapter three",
    title: "The ₹20 decision",
    copy: "Everyone said price the Belgian Coffee at forty. Fifty, even — it's thick, chocolatey, absurd. We priced it at twenty so a student could order it twice. It has been our loudest advertisement ever since, and no, it isn't changing.",
  },
  {
    image: "/images/dishes/crispy-chicken-pizza.jpg",
    kicker: "Chapter four",
    title: "Made with love & spices",
    copy: "The menu grew the way para menus do — one dare at a time. A momo in a burger. Peri peri where it had no business being. A pizza, baked to perfection, because someone's kid asked. Comfort food at its best; bite into happiness.",
  },
];

export default function OurStoryPage() {
  return (
    <>
      <header className="grain relative mx-auto max-w-6xl px-4 pb-6 pt-12 md:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-soft">আমাদের গল্প</p>
        <h1 className="mt-2 max-w-2xl font-display text-4xl font-semibold leading-tight md:text-6xl">
          Steam, spice & a stubborn ₹20 coffee
        </h1>
      </header>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-10 md:px-8">
        {/* Scrollytelling beats */}
        <section aria-label="The story" className="space-y-16">
          {BEATS.map((beat, i) => (
            <Reveal key={beat.title}>
              <div className={`grid items-center gap-6 md:grid-cols-2 md:gap-12 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <DishImage
                  src={beat.image}
                  alt={beat.title}
                  label={beat.title}
                  className="aspect-[4/3] w-full rounded-3xl"
                  sizes="(max-width: 768px) 92vw, 520px"
                />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-momo-gold">{beat.kicker}</p>
                  <h2 className="mt-2 font-display text-2xl font-semibold md:text-3xl">{beat.title}</h2>
                  <p className="mt-3 text-sm text-soft md:text-base">{beat.copy}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </section>

        <HistoryTimeline />
        <PressWall />

        <Reveal>
          <Glass variant="panel" className="grain relative overflow-hidden px-6 py-12 text-center md:px-12">
            <p className="font-display text-2xl font-semibold md:text-3xl">
              “Steam first. Questions later.”
            </p>
            <p className="mt-2 text-sm text-soft">
              — the closest thing we have to a business plan
            </p>
          </Glass>
        </Reveal>
      </div>
    </>
  );
}
