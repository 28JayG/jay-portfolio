"use client";

import { AnimatePresence, m } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 1.2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    // Return focus to the top of the document for keyboard users.
    document.getElementById("top")?.focus({ preventScroll: true });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <m.button
          key="back-to-top"
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
          className="fixed right-4 bottom-4 z-40 flex size-11 items-center justify-center rounded-sm border border-line bg-surface text-fg transition-colors hover:border-accent hover:text-accent sm:right-6 sm:bottom-6"
        >
          <ArrowUp size={18} strokeWidth={1.5} />
        </m.button>
      ) : null}
    </AnimatePresence>
  );
};
