import { cn } from "@/lib/utils";

/**
 * Restrained "window" frame for code, command output or specs.
 * Server component — purely presentational.
 */
export const Terminal = ({
  title,
  meta,
  children,
  className,
}: {
  title: string;
  meta?: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-md border border-line bg-surface",
        className,
      )}
    >
      <figcaption className="flex items-center justify-between gap-4 border-b border-line px-4 py-2.5">
        <span className="flex items-center gap-3">
          <span aria-hidden className="flex gap-1.5">
            <span className="size-2 rounded-full bg-line" />
            <span className="size-2 rounded-full bg-line" />
            <span className="size-2 rounded-full bg-accent/70" />
          </span>
          <span className="font-mono text-xs text-muted">{title}</span>
        </span>
        {meta ? <span className="label-mono text-[0.625rem] text-muted">{meta}</span> : null}
      </figcaption>
      <div className="p-4 font-mono text-[0.8125rem] leading-relaxed sm:p-5">{children}</div>
    </figure>
  );
};
