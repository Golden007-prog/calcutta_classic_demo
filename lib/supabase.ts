import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Lazy Supabase browser client. Nothing in the UI calls this while
 * NEXT_PUBLIC_ENABLE_AUTH=false — it exists so auth (and later the
 * newsletter queue) can be switched on without new wiring.
 */
let client: SupabaseClient | undefined;

export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase env vars missing: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (see .env.example).",
    );
  }

  client = createClient(url, key);
  return client;
}
