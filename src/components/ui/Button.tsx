import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn, isExternal } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-2.5 h-12 px-5 rounded-sm border font-mono text-[0.8125rem] uppercase tracking-[0.06em] whitespace-nowrap transition-[background-color,color,border-color,transform] duration-200 ease-out active:translate-y-px";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-ink border-accent hover:bg-fg hover:border-fg",
  secondary:
    "bg-transparent text-fg border-line hover:border-fg hover:bg-elevated",
  ghost:
    "bg-transparent text-fg border-transparent px-0 h-auto hover:text-accent underline-offset-[6px] hover:underline",
};

type ButtonProps = {
  href: string;
  variant?: Variant;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  download?: boolean;
} & Omit<ComponentProps<"a">, "href" | "children">;

/** Link-styled-as-button. All CTAs on this site navigate, so it always renders an anchor. */
export const Button = ({
  href,
  variant = "primary",
  icon,
  children,
  className,
  download,
  ...rest
}: ButtonProps) => {
  const classes = cn(base, variants[variant], className);
  const content = (
    <>
      <span>{children}</span>
      {icon ? (
        <span
          aria-hidden
          className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          {icon}
        </span>
      ) : null}
    </>
  );

  if (download || isExternal(href)) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        download={download || undefined}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
};

/** Non-interactive twin used when a CTA's target is not configured yet. */
export const DisabledButton = ({
  children,
  icon,
  note,
  className,
}: {
  children: ReactNode;
  icon?: ReactNode;
  note: string;
  className?: string;
}) => {
  return (
    <span
      role="link"
      aria-disabled="true"
      title={note}
      className={cn(
        base,
        "cursor-not-allowed border-dashed border-line text-muted",
        className,
      )}
    >
      <span>{children}</span>
      {icon ? <span aria-hidden>{icon}</span> : null}
      <span className="sr-only">({note})</span>
    </span>
  );
};
