import { Glass } from "@/components/ui/Glass";
import { cn } from "@/lib/utils";

/** Feature 88 — branded glass skeletons. Never spinners. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "shimmer rounded-xl bg-foreground/[0.07]",
        className,
      )}
    />
  );
}

/** Generic route skeleton: heading + card grid inside glass. */
export function PageSkeleton({ cards = 6 }: { cards?: number }) {
  return (
    <section
      aria-label="Loading"
      role="status"
      className="mx-auto max-w-6xl px-4 py-16 md:px-8"
    >
      <Skeleton className="h-4 w-36" />
      <Skeleton className="mt-4 h-10 w-64" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: cards }).map((_, i) => (
          <Glass key={i} className="space-y-3 p-5">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/3" />
          </Glass>
        ))}
      </div>
      <span className="sr-only">Loading page…</span>
    </section>
  );
}
