import { Dices, HelpCircle, SlidersHorizontal, Wallet } from "lucide-react";
import Link from "next/link";

import { Glass } from "@/components/ui/Glass";

const teasers = [
  {
    icon: HelpCircle,
    title: "What should I eat?",
    copy: "60-second mood quiz, one perfect plate.",
  },
  {
    icon: Dices,
    title: "Spin the Momo",
    copy: "Let the wheel gamble your dinner.",
  },
  {
    icon: SlidersHorizontal,
    title: "Craving matcher",
    copy: "Cheesy? Crunchy? Slide and be matched.",
  },
  {
    icon: Wallet,
    title: "Budget Bite Finder",
    copy: "Tell us what's in your pocket. We'll feed you.",
  },
];

export function FoodieZoneTeaser() {
  return (
    <section aria-labelledby="foodie-heading" className="mx-auto max-w-6xl px-4 py-16 md:px-8">
      <div className="mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-soft">
          Can&apos;t decide? Good.
        </p>
        <h2 id="foodie-heading" className="mt-2 font-display text-3xl font-semibold md:text-4xl">
          The Foodie Zone
        </h2>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {teasers.map(({ icon: Icon, title, copy }) => (
          <li key={title}>
            <Glass as={Link} href="/foodie-zone" className="group flex h-full flex-col gap-3 p-5 transition-colors hover:border-momo-gold/40">
              <Icon size={22} aria-hidden className="text-momo-gold" />
              <h3 className="font-display text-lg font-semibold group-hover:text-momo-gold">
                {title}
              </h3>
              <p className="text-sm text-soft">{copy}</p>
            </Glass>
          </li>
        ))}
      </ul>
    </section>
  );
}
