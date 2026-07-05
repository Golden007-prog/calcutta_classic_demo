import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Glass } from "@/components/ui/Glass";
import { AUTH_ENABLED } from "@/lib/flags";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

/**
 * Feature 110 — auth scaffold. Invisible (404 + proxy redirect) while
 * NEXT_PUBLIC_ENABLE_AUTH=false. The 15-minute enable path lives in
 * AUTH_TODO.md; Supabase wiring goes through lib/supabase.ts.
 */
export default function AuthPage() {
  if (!AUTH_ENABLED) notFound();

  return (
    <section className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <Glass variant="panel" className="w-full space-y-4 px-6 py-12">
        <h1 className="font-display text-3xl font-semibold">Sign in</h1>
        <p className="text-sm text-soft">
          Accounts are warming up. Supabase auth UI mounts here once the
          flag flips — see AUTH_TODO.md.
        </p>
      </Glass>
    </section>
  );
}
