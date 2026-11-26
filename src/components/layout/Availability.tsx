import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/** Compact status pill. Renders nothing when availability is switched off in data/site.ts. */
export const Availability = ({ className }: { className?: string }) => {
  if (!site.availability.open) return null;
  return (
    <p
      className={cn(
        "label-mono inline-flex items-center gap-2 whitespace-nowrap rounded-sm border border-line px-2.5 py-1.5 text-[0.6875rem] text-muted",
        className,
      )}
    >
      <span aria-hidden className="relative flex size-1.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
        <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
      </span>
      {site.availability.label}
    </p>
  );
};
