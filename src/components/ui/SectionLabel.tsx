import { cn } from "@/lib/utils";

/** Editorial section marker: "// 02 — Selected work ———". */
export const SectionLabel = ({
  index,
  children,
  className,
}: {
  index: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p className={cn("label-mono flex items-center gap-3 text-muted", className)}>
      <span className="text-accent">{"//"} {index}</span>
      <span>{children}</span>
      <span aria-hidden className="h-px flex-1 bg-line" />
    </p>
  );
};
