"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { generatedImages } from "@/data/images.generated";

const POSTER = "/images/hero/video-poster.jpg";

/**
 * Features 68 + 99 — hero video background, poster-first.
 * - The poster is the LCP image (next/image, priority).
 * - The <video> mounts only after window load + idle, and never for
 *   prefers-reduced-motion or Save-Data users.
 * - preload="none", muted loop playsinline; paused when off-screen or the
 *   tab is hidden. MP4 716KB / WebM 399KB — under the 2MB budget.
 */
export function HeroVideo() {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    type NetworkInfo = { saveData?: boolean };
    const saveData =
      (navigator as Navigator & { connection?: NetworkInfo }).connection
        ?.saveData === true;
    if (reduced || saveData) return;

    let idleId: number;
    const mount = () => {
      idleId = (window.requestIdleCallback ?? window.setTimeout)(() =>
        setShowVideo(true),
      ) as unknown as number;
    };

    if (document.readyState === "complete") mount();
    else window.addEventListener("load", mount, { once: true });

    return () => {
      window.removeEventListener("load", mount);
      (window.cancelIdleCallback ?? window.clearTimeout)(idleId);
    };
  }, []);

  // Pause off-screen and on tab switch.
  useEffect(() => {
    if (!showVideo) return;
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(section);

    const onVisibility = () => {
      if (document.hidden) video.pause();
      else if (io.takeRecords().length === 0) video.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [showVideo]);

  const poster = generatedImages[POSTER];

  return (
    <div ref={sectionRef} aria-hidden className="absolute inset-0 overflow-hidden">
      {poster && (
        <Image
          src={POSTER}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          placeholder="blur"
          blurDataURL={poster.blurDataURL}
          className="object-cover"
        />
      )}
      {showVideo && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={POSTER}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video/hero-steam.webm" type="video/webm" />
          <source src="/video/hero-steam.mp4" type="video/mp4" />
        </video>
      )}
      {/* Contrast scrim for the glass panel + text */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/40 to-charcoal" />
    </div>
  );
}
