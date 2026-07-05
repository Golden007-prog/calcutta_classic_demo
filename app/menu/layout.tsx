import type { ReactNode } from "react";

/**
 * Parallel modal slot for intercepted dish routes (feature 2/79).
 * `modal` is optional: the static GitHub Pages export strips the @modal
 * slot (intercepting routes need a server) and dish links go full-page.
 */
export default function MenuLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal?: ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
