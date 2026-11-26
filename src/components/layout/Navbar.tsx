"use client";

import { AnimatePresence, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems, site, type SectionId } from "@/data/site";
import { cn, pad } from "@/lib/utils";
import { Availability } from "./Availability";

const useActiveSection = (enabled: boolean): SectionId | null => {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      // A thin band across the middle of the viewport decides the active section.
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
};

export const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const observed = useActiveSection(isHome);
  const active: SectionId | null = isHome ? observed : pathname.startsWith("/work") ? "work" : null;

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape, and lock page scroll while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled || open ? "border-line bg-bg/95" : "border-transparent bg-transparent",
      )}
    >
      <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between">
        <Link
          href="/#top"
          onClick={() => setOpen(false)}
          className="font-display text-xl font-bold tracking-tight text-fg transition-colors hover:text-accent"
        >
          {site.monogram.replace(".", "")}
          <span className="text-accent">.</span>
          <span className="sr-only"> {site.name}, home</span>
        </Link>

        <div className="hidden items-center gap-4 md:flex lg:gap-8">
          <ul className="flex items-center gap-1">
            {navItems.map((item, i) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "label-mono relative flex items-center gap-1.5 px-3 py-2 transition-colors",
                      isActive ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    <span className={cn("text-[0.625rem]", isActive ? "text-accent" : "text-muted/60")}>
                      {pad(i)}
                    </span>
                    {item.label}
                    {isActive ? (
                      <m.span
                        layoutId="nav-active"
                        aria-hidden
                        className="absolute inset-x-3 -bottom-px h-px bg-accent"
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="hidden lg:block">
            <Availability />
          </div>
        </div>

        <button
          type="button"
          className="-mr-2 flex size-11 items-center justify-center text-fg md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <m.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto border-t border-line bg-bg md:hidden"
          >
            <ul className="container-page flex flex-col py-6">
              {navItems.map((item, i) => (
                <li key={item.id} className="border-b border-line">
                  <Link
                    href={`/#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? "location" : undefined}
                    className="flex items-baseline gap-4 py-5 font-display text-4xl font-medium tracking-tight text-fg transition-colors hover:text-accent"
                  >
                    <span className="font-mono text-xs text-accent">{pad(i)}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="container-page pb-10">
              <Availability />
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
};
