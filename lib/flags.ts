/**
 * Feature flags. Auth is scaffold-only and stays invisible until
 * NEXT_PUBLIC_ENABLE_AUTH=true (see AUTH_TODO.md for the enable path).
 */
export const AUTH_ENABLED = process.env.NEXT_PUBLIC_ENABLE_AUTH === "true";
