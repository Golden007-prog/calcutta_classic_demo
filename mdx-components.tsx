import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/** Blog typography — keeps MDX posts on the design system. */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1 className="mt-2 font-display text-4xl font-semibold leading-tight md:text-5xl" {...props} />
    ),
    h2: (props) => (
      <h2 className="mt-10 font-display text-2xl font-semibold md:text-3xl" {...props} />
    ),
    h3: (props) => <h3 className="mt-8 font-display text-xl font-semibold" {...props} />,
    p: (props) => <p className="mt-4 leading-relaxed text-foreground/85" {...props} />,
    ul: (props) => <ul className="mt-4 list-disc space-y-1.5 pl-6 text-foreground/85" {...props} />,
    ol: (props) => <ol className="mt-4 list-decimal space-y-1.5 pl-6 text-foreground/85" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="mt-6 border-l-2 border-momo-gold pl-4 font-display text-lg italic text-foreground/90"
        {...props}
      />
    ),
    strong: (props) => <strong className="font-semibold text-momo-gold" {...props} />,
    a: ({ href = "", ...props }) =>
      href.startsWith("/") ? (
        <Link href={href} className="text-momo-gold underline underline-offset-4" {...props} />
      ) : (
        <a href={href} className="text-momo-gold underline underline-offset-4" target="_blank" rel="noopener noreferrer" {...props} />
      ),
    hr: () => <hr className="my-8 border-line" />,
    ...components,
  };
}
