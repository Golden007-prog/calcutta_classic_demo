import { DishImage } from "@/components/ui/DishImage";
import { InstagramIcon } from "@/components/ui/icons";
import { instagramPosts } from "@/data/instagram";
import { site } from "@/data/site";

/** Feature 51 — curated IG wall, every tile links out. No API keys. */
export function InstagramWall() {
  return (
    <section aria-labelledby="ig-heading" className="border-y border-line bg-surface/60 py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-soft">
              Fresh from the feed
            </p>
            <h2 id="ig-heading" className="mt-2 font-display text-3xl font-semibold md:text-4xl">
              {site.instagram.handle}
            </h2>
          </div>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-target inline-flex items-center gap-2 rounded-full bg-momo-gold px-5 py-2.5 text-sm font-semibold text-charcoal transition-colors hover:bg-momo-gold/90"
          >
            <InstagramIcon size={16} />
            Follow the steam
          </a>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {instagramPosts.map((post) => (
            <li key={post.id}>
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-xl"
                aria-label={`Instagram: ${post.caption}`}
              >
                <DishImage
                  src={post.image}
                  alt={post.caption}
                  label="@"
                  className="aspect-square w-full transition-transform duration-500 group-hover:scale-[1.05] motion-reduce:transition-none"
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 180px"
                />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-soft">
          Curated highlights — tap any tile for the live feed, and tag{" "}
          <span className="font-semibold text-momo-gold">{site.hashtag}</span>{" "}
          when you visit.
        </p>
      </div>
    </section>
  );
}
