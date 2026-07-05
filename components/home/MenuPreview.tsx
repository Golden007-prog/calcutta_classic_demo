import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { DishImage } from "@/components/ui/DishImage";
import { Glass } from "@/components/ui/Glass";
import { SpiceLevel } from "@/components/ui/SpiceLevel";
import { VegDot } from "@/components/ui/VegDot";
import { bestsellers } from "@/data/menu";
import { formatINR } from "@/lib/utils";

export function MenuPreview() {
  return (
    <section aria-labelledby="bestsellers-heading" className="mx-auto max-w-6xl px-4 py-16 md:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-soft">
            The regulars&apos; shortlist
          </p>
          <h2 id="bestsellers-heading" className="mt-2 font-display text-3xl font-semibold md:text-4xl">
            Bestsellers
          </h2>
        </div>
        <Link
          href="/menu"
          className="hidden shrink-0 items-center gap-1 text-sm font-medium text-momo-gold hover:underline sm:inline-flex"
        >
          Full menu <ArrowRight size={14} aria-hidden />
        </Link>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {bestsellers.map((item, i) => (
          <li key={item.slug}>
            <Glass as="article" className="group flex h-full flex-col overflow-hidden">
              <div className="relative">
                <DishImage
                  src={item.image}
                  alt={`${item.name} — ${item.description}`}
                  label={item.name}
                  className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 380px"
                  priority={i === 0}
                />
                <span className="absolute left-3 top-3 rounded-full bg-momo-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-charcoal">
                  Bestseller
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <VegDot veg={item.veg} />
                    <h3 className="font-display text-lg font-semibold">{item.name}</h3>
                  </div>
                  <SpiceLevel level={item.spice} />
                </div>
                <p className="flex-1 text-sm text-soft">{item.description}</p>
                <p className="font-display text-xl font-semibold text-momo-gold">
                  {item.price !== null ? formatINR(item.price) : "Ask in store"}
                  {item.priceNote && item.price !== null && (
                    <span className="ml-2 text-xs font-normal text-soft">{item.priceNote}</span>
                  )}
                </p>
              </div>
            </Glass>
          </li>
        ))}
      </ul>

      <Link
        href="/menu"
        className="tap-target mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-momo-gold px-6 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-momo-gold/90 sm:hidden"
      >
        See the full menu <ArrowRight size={16} aria-hidden />
      </Link>
    </section>
  );
}
