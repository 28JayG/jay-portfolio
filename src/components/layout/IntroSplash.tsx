"use client";

import { animate } from "framer-motion";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { finishIntro, isIntroPlaying, subscribeToIntro } from "@/lib/intro";

const EASE = [0.16, 1, 0.3, 1] as const;
/** If JS arrives later than this, the CSS failsafe has already cleared the splash. */
const LATE_HYDRATION_MS = 4200;

const rectOf = (el: Element) => el.getBoundingClientRect();

/**
 * Intro: "J" and "G." slide out from an invisible vertical line at the centre of the
 * screen (pure CSS, so it starts before hydration), then the mark flies into the
 * navbar logo while the backdrop fades and reveals the page.
 *
 * Server-rendered on every page but hidden by CSS unless <html data-intro="playing">.
 */
export const IntroSplash = () => {
  // Server snapshot renders the overlay (CSS hides it unless the intro is playing);
  // after hydration it unmounts as soon as the intro is skipped or finished.
  const playing = useSyncExternalStore(subscribeToIntro, isIntroPlaying, () => true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const jRef = useRef<HTMLSpanElement>(null);
  const gRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!playing) return;

    let cancelled = false;
    const done = () => {
      if (cancelled) return;
      cancelled = true;
      finishIntro(); // flips the store → this component unmounts
    };

    // Any click or key press skips straight to the site.
    const skip = () => done();
    window.addEventListener("keydown", skip, { once: true });

    const run = async () => {
      const overlay = overlayRef.current;
      const row = rowRef.current;
      const j = jRef.current;
      const g = gRef.current;
      const target = document.querySelector("[data-brand-mark]");
      if (!overlay || !row || !j || !g || !target || performance.now() > LATE_HYDRATION_MS) {
        done();
        return;
      }

      // Wait for the CSS slide-out and the dot to finish, then hold for a beat.
      // (Excludes the overlay's own 5s CSS failsafe animation.)
      const entrance = overlay
        .getAnimations({ subtree: true })
        .filter((a) => !(a instanceof CSSAnimation) || a.animationName !== "intro-failsafe");
      await Promise.all(entrance.map((a) => a.finished.catch(() => {})));
      await new Promise((r) => setTimeout(r, 220));
      if (cancelled) return;

      // Measure the visible mark ("J" … "G.") and the navbar logo, then fly centre-to-centre.
      const jr = rectOf(j);
      const gr = rectOf(g);
      const src = { left: jr.left, top: Math.min(jr.top, gr.top), right: gr.right, bottom: Math.max(jr.bottom, gr.bottom) };
      const srcW = src.right - src.left;
      const srcCx = src.left + srcW / 2;
      const srcCy = (src.top + src.bottom) / 2;
      const t = rectOf(target);
      const scale = t.width / srcW;
      const rowRect = rectOf(row);

      row.style.transformOrigin = `${srcCx - rowRect.left}px ${srcCy - rowRect.top}px`;

      await Promise.all([
        animate(
          row,
          { x: t.left + t.width / 2 - srcCx, y: t.top + t.height / 2 - srcCy, scale },
          { duration: 0.8, ease: EASE },
        ).finished,
        backdropRef.current
          ? animate(backdropRef.current, { opacity: 0 }, { duration: 0.55, delay: 0.2, ease: "easeOut" }).finished
          : Promise.resolve(),
      ]);
      done();
    };

    void run();
    return () => {
      cancelled = true;
      window.removeEventListener("keydown", skip);
    };
  }, [playing]);

  if (!playing) return null;

  return (
    <div
      ref={overlayRef}
      data-intro-overlay=""
      aria-hidden
      onClick={finishIntro}
      className="fixed inset-0 z-[70] cursor-pointer"
    >
      <div ref={backdropRef} className="absolute inset-0 bg-bg" />
      <div className="absolute inset-0 flex items-center">
        {/* Two halves meeting at the exact centre line; each letter is clipped by its half. */}
        <div
          ref={rowRef}
          className="flex w-full font-display text-[clamp(5rem,24vw,15rem)] leading-none font-bold tracking-tight text-fg"
        >
          <span className="flex flex-1 justify-end overflow-hidden py-[0.12em]">
            <span ref={jRef} className="intro-from-center-left inline-block">
              J
            </span>
          </span>
          <span className="flex flex-1 overflow-hidden py-[0.12em]">
            <span ref={gRef} className="intro-from-center-right inline-block">
              G<span className="intro-dot inline-block text-accent">.</span>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
