"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Intercepted-route modal shell (feature 2 / 79): native <dialog> gives
 * focus trap + Esc for free; closing navigates back to /menu.
 */
export function DishModal({ children }: { children: ReactNode }) {
  const router = useRouter();
  const ref = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <dialog
      ref={ref}
      onClose={() => router.back()}
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close(); // backdrop click
      }}
      className="m-auto w-[min(92vw,44rem)] rounded-3xl border border-line bg-background p-0 text-foreground shadow-2xl backdrop:bg-charcoal/70 backdrop:backdrop-blur-sm"
      aria-label="Dish details"
    >
      <div className="relative max-h-[85vh] overflow-y-auto p-5 md:p-7">
        <button
          type="button"
          onClick={() => ref.current?.close()}
          aria-label="Close dish details"
          className="tap-target absolute right-3 top-3 z-10 inline-flex items-center justify-center rounded-full bg-surface text-foreground/80 ring-1 ring-line transition-colors hover:text-chili"
        >
          <X size={18} aria-hidden />
        </button>
        {children}
      </div>
    </dialog>
  );
}
