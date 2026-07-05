"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Feature 90 — 2px momo-gold micro loader for soft navigations.
 * Starts when a same-origin link to a different route is clicked,
 * completes when the pathname actually changes.
 */
export function TopBarLoader() {
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement).closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/")) return;

      const [nextPath] = href.split(/[?#]/);
      if (nextPath === window.location.pathname) return;

      setState("loading");
      // Safety: never let the bar hang around on aborted navigations.
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setState("idle"), 8000);
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      window.clearTimeout(timeoutRef.current);
    };
  }, []);

  // Route changed → finish the bar.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- synchronizing with the router (external system): the bar must flip to "done" the moment pathname changes
    setState((s) => (s === "loading" ? "done" : s));
    const t = window.setTimeout(() => setState("idle"), 350);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return (
    <div
      aria-hidden
      className={cn(
        "fixed inset-x-0 top-0 z-[90] h-0.5 origin-left bg-momo-gold transition-[transform,opacity] ease-out",
        state === "idle" && "opacity-0 duration-200 [transform:scaleX(0)]",
        state === "loading" && "opacity-100 duration-[4000ms] [transform:scaleX(0.85)]",
        state === "done" && "opacity-0 duration-300 [transform:scaleX(1)]",
      )}
    />
  );
}
