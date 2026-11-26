"use client";

import { useEffect, useState } from "react";
import { cn, pad } from "@/lib/utils";

type Item = { id: string; title: string; children?: { id: string; title: string }[] };

/** Sticky "on this page" index; highlights the current section and sub-section. */
export const CaseStudyToc = ({ items }: { items: Item[] }) => {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const ids = items.flatMap((i) => [i.id, ...(i.children?.map((c) => c.id) ?? [])]);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Case study sections">
      <p className="label-mono mb-4 text-[0.625rem] text-muted">On this page</p>
      <ol className="border-l border-line">
        {items.map((item, i) => {
          const childActive = item.children?.some((c) => c.id === active) ?? false;
          const isActive = active === item.id || childActive;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "location" : undefined}
                className={cn(
                  "-ml-px flex gap-3 border-l py-1.5 pl-4 text-sm transition-colors",
                  isActive ? "border-accent text-fg" : "border-transparent text-muted hover:text-fg",
                )}
              >
                <span className={cn("font-mono text-xs", isActive ? "text-accent" : "text-muted/70")}>
                  {pad(i + 1)}
                </span>
                {item.title}
              </a>
              {item.children?.length ? (
                <ol className="mb-1 ml-[2.4rem]">
                  {item.children.map((child) => (
                    <li key={child.id}>
                      <a
                        href={`#${child.id}`}
                        aria-current={active === child.id ? "location" : undefined}
                        className={cn(
                          "block py-1 text-[0.8125rem] transition-colors",
                          active === child.id ? "text-accent" : "text-muted hover:text-fg",
                        )}
                      >
                        {child.title}
                      </a>
                    </li>
                  ))}
                </ol>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
