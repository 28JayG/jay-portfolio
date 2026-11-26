import { FileCode2, Lock, PenLine } from "lucide-react";
import { Terminal } from "@/components/ui/Terminal";
import type { Block } from "@/data/types";
import { cn, pad } from "@/lib/utils";
import { Diagram } from "./Diagrams";

const Callout = ({ tone, title, text }: Extract<Block, { type: "callout" }>) => {
  const Icon = tone === "nda" ? Lock : tone === "placeholder" ? PenLine : FileCode2;
  const defaultTitle = tone === "nda" ? "Under NDA" : tone === "placeholder" ? "Content needed" : "Note";
  return (
    <aside
      className={cn(
        "flex gap-3 rounded-md border p-4 sm:p-5",
        tone === "nda" && "border-line bg-surface",
        tone === "note" && "border-accent/40 bg-accent/[0.04]",
        tone === "placeholder" && "border-dashed border-muted/50",
      )}
    >
      <Icon size={16} strokeWidth={1.75} aria-hidden className="mt-0.5 shrink-0 text-accent" />
      <div>
        <p className="label-mono text-[0.6875rem] text-fg">{title ?? defaultTitle}</p>
        <p className={cn("mt-1.5 text-sm leading-relaxed", tone === "placeholder" ? "font-mono text-muted" : "text-muted")}>
          {text}
        </p>
      </div>
    </aside>
  );
};

const BlockView = ({ block, headingLevel }: { block: Block; headingLevel: 3 | 4 }) => {
  const CardHeading = headingLevel === 3 ? "h3" : "h4";
  switch (block.type) {
    case "p":
      return <p className="max-w-[68ch] text-base leading-relaxed text-muted sm:text-[1.0625rem]">{block.text}</p>;

    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List className="max-w-[68ch] space-y-2.5">
          {block.items.map((item, i) => (
            <li key={item} className="flex gap-3 leading-relaxed text-fg/90">
              <span aria-hidden className="shrink-0 font-mono text-sm text-accent">
                {block.ordered ? pad(i + 1) : "→"}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </List>
      );
    }

    case "callout":
      return <Callout {...block} />;

    case "code":
      return (
        <div>
          <Terminal title={block.file} meta="Illustrative">
            <pre className="overflow-x-auto text-fg/90">
              <code>{block.code}</code>
            </pre>
          </Terminal>
          {block.caption ? <p className="mt-2 font-mono text-xs text-muted">{block.caption}</p> : null}
        </div>
      );

    case "diagram":
      return <Diagram id={block.id} caption={block.caption} />;

    case "cards":
      return (
        <ul className="grid gap-3 sm:grid-cols-2">
          {block.items.map((card, i) => (
            <li key={card.title} className="rounded-md border border-line bg-surface p-5">
              <p className="font-mono text-xs text-accent">{pad(i + 1)}</p>
              <CardHeading className="mt-2 text-lg font-semibold tracking-tight text-fg">{card.title}</CardHeading>
              <p className="mt-2 text-sm leading-relaxed text-muted">{card.text}</p>
            </li>
          ))}
        </ul>
      );

    case "decisions":
      return (
        <div className="overflow-hidden rounded-md border border-line">
          {block.items.map((d, i) => (
            <div
              key={d.decision}
              className={cn("grid gap-4 p-5 sm:p-6 lg:grid-cols-[1.1fr_1fr_1fr] lg:gap-6", i > 0 && "border-t border-line")}
            >
              <div>
                <p className="label-mono text-[0.625rem] text-accent">Decision {pad(i + 1)}</p>
                <p className="mt-2 font-display text-lg font-medium leading-snug text-fg">{d.decision}</p>
              </div>
              <div>
                <p className="label-mono text-[0.625rem] text-muted">Why</p>
                <p className="mt-2 text-sm leading-relaxed text-fg/90">{d.why}</p>
              </div>
              <div>
                <p className="label-mono text-[0.625rem] text-muted">Trade-off</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d.tradeoff}</p>
              </div>
            </div>
          ))}
        </div>
      );
  }
};

/** `headingLevel` is the level for card titles, one below the enclosing section heading. */
export const Blocks = ({ blocks, headingLevel = 3 }: { blocks: Block[]; headingLevel?: 3 | 4 }) => {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} headingLevel={headingLevel} />
      ))}
    </div>
  );
};
