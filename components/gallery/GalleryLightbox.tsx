"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { DishImage } from "@/components/ui/DishImage";

export interface GalleryPhoto {
  src: string;
  alt: string;
}

/** Masonry gallery with a keyboard-friendly <dialog> lightbox (spec §6). */
export function GalleryLightbox({ photos }: { photos: GalleryPhoto[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = useCallback(() => {
    dialogRef.current?.close();
    setIndex(null);
  }, []);
  const step = useCallback(
    (delta: number) => {
      setIndex((current) =>
        current === null ? null : (current + delta + photos.length) % photos.length,
      );
    },
    [photos.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (index === null) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  return (
    <>
      {/* CSS-columns masonry */}
      <ul className="columns-2 gap-3 md:columns-3 [&>li]:mb-3">
        {photos.map((photo, i) => (
          <li key={photo.src} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => open(i)}
              className="group block w-full overflow-hidden rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-momo-gold"
              aria-label={`Open photo: ${photo.alt}`}
            >
              <DishImage
                src={photo.src}
                alt={photo.alt}
                label=""
                className={`w-full transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none ${i % 3 === 1 ? "aspect-square" : "aspect-[4/5]"}`}
                sizes="(max-width: 768px) 45vw, 30vw"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={close}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        className="m-auto w-[min(94vw,56rem)] rounded-3xl border border-line bg-charcoal p-0 backdrop:bg-charcoal/85 backdrop:backdrop-blur-sm"
        aria-label="Photo viewer"
      >
        {index !== null && (
          <div className="relative">
            <DishImage
              src={photos[index].src}
              alt={photos[index].alt}
              label=""
              className="max-h-[82vh] w-full"
              sizes="94vw"
            />
            <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/90 to-transparent px-5 pb-4 pt-10 text-sm text-cream">
              {photos[index].alt}
            </p>
            <button
              type="button"
              onClick={close}
              aria-label="Close viewer"
              className="tap-target absolute right-3 top-3 rounded-full bg-charcoal/60 p-2 text-cream backdrop-blur-sm hover:text-chili"
            >
              <X size={18} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className="tap-target absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-charcoal/60 p-2 text-cream backdrop-blur-sm hover:text-momo-gold"
            >
              <ChevronLeft size={20} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="tap-target absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-charcoal/60 p-2 text-cream backdrop-blur-sm hover:text-momo-gold"
            >
              <ChevronRight size={20} aria-hidden />
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
