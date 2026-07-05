import type { ReactNode } from "react";

/** Parallel modal slot for intercepted dish routes (feature 2/79). */
export default function MenuLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
