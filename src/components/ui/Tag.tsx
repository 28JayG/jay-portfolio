import { cn } from "@/lib/utils";

export const Tag = ({
  children,
  tone = "default",
  className,
}: {
  children: React.ReactNode;
  tone?: "default" | "accent";
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-2 py-1 font-mono text-[0.6875rem] leading-none tracking-[0.04em]",
        tone === "accent"
          ? "border-accent/40 text-accent"
          : "border-line text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
};

export const TagList = ({ items, className }: { items: string[]; className?: string }) => {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Technologies">
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );
};
