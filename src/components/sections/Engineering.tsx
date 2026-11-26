import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TagList } from "@/components/ui/Tag";
import { Terminal } from "@/components/ui/Terminal";
import { capabilities } from "@/data/skills";
import type { Capability } from "@/data/types";
import { pad } from "@/lib/utils";

const CapabilityRow = ({ capability, index }: { capability: Capability; index: number }) => {
  return (
    <article
      aria-labelledby={`cap-${capability.id}`}
      className="group grid gap-8 border-t border-line py-10 sm:py-14 lg:grid-cols-12 lg:gap-8"
    >
      <header className="lg:col-span-4">
        <p className="font-mono text-sm text-accent">{pad(index + 1)}</p>
        <h3
          id={`cap-${capability.id}`}
          className="mt-3 text-2xl font-semibold tracking-tight text-fg sm:text-3xl"
        >
          {capability.title}
        </h3>
        <p className="mt-4 max-w-sm leading-relaxed text-muted">{capability.explanation}</p>
        <TagList items={capability.tech} className="mt-5" />
      </header>

      <div className="grid gap-4 lg:col-span-8 lg:grid-cols-2 lg:gap-6">
        <div className="rounded-md border border-line bg-surface p-5 sm:p-6">
          <p className="label-mono text-[0.625rem] text-muted">The problem</p>
          <p className="mt-3 font-display text-lg leading-snug text-fg">{capability.problem}</p>
        </div>

        <div className="rounded-md border border-line p-5 sm:p-6">
          <p className="label-mono text-[0.625rem] text-muted">How I approach it</p>
          <ol className="mt-3 space-y-3">
            {capability.approach.map((step, i) => (
              <li key={step} className="flex gap-3 text-sm leading-relaxed text-fg/90">
                <span className="font-mono text-xs leading-relaxed text-accent">{pad(i + 1)}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {capability.snippet ? (
          <Terminal title={capability.snippet.file} meta="Pattern" className="lg:col-span-2">
            <pre className="overflow-x-auto text-fg/90">
              <code>{capability.snippet.code}</code>
            </pre>
          </Terminal>
        ) : null}
      </div>
    </article>
  );
};

export const Engineering = () => {
  return (
    <section id="engineering" aria-labelledby="engineering-heading" className="py-24 sm:py-32">
      <div className="container-page">
        <SectionLabel index="02">Engineering</SectionLabel>

        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="engineering-heading" className="text-display font-bold uppercase lg:col-span-8">
            How I think about engineering
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-muted lg:col-span-4">
            Tools change. The questions don&apos;t: where state lives, what owns a decision, and what
            it costs to change later.
          </p>
        </div>

        <div className="mt-14 border-b border-line">
          {capabilities.map((capability, i) => (
            <Reveal key={capability.id}>
              <CapabilityRow capability={capability} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
