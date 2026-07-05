import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

/**
 * `false` during SSR/hydration, `true` after — without the
 * setState-in-effect re-render pass. Use to gate client-only UI
 * (persisted stores, media queries) against hydration mismatches.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(emptySubscribe, clientSnapshot, serverSnapshot);
}
