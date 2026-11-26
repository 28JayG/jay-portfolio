"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Subtle entrance for a block as it scrolls into view.
 * Server-rendered children pass straight through; only the wrapper is client-side.
 * Reduced-motion users and no-JS visitors get the content immediately via the
 * `[data-reveal]` overrides in globals.css / layout.tsx.
 */
export const Reveal = ({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article";
}) => {
  const Component = m[as];

  return (
    <Component
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
};
