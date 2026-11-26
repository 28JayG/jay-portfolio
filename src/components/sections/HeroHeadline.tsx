"use client";

import { m } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The headline is the LCP element, so each phrase slides up inside a clipped
 * mask without ever being fully transparent. Screen readers get one clean string.
 */
export const HeroHeadline = () => {
  return (
    <h1 className="font-display text-hero font-bold uppercase">
      <span className="sr-only">I build systems. Not just interfaces.</span>
      <span aria-hidden className="block">
        <span className="block overflow-hidden pb-[0.04em]">
          <m.span
            className="block text-fg"
            initial={{ y: "60%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease }}
          >
            I build systems<span className="text-accent">.</span>
          </m.span>
        </span>
        <span className="block overflow-hidden pb-[0.04em]">
          <m.span
            className="block text-transparent [-webkit-text-stroke:1.5px_var(--color-muted)]"
            initial={{ y: "60%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
          >
            Not just interfaces.
          </m.span>
        </span>
      </span>
    </h1>
  );
};
