import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Tag } from "@/components/ui/Tag";
import { experience, interests } from "@/data/experience";
import { visibleExperience } from "@/lib/placeholders";
import { cn } from "@/lib/utils";

const Timeline = () => {
  return (
    <ol className="relative">
      {visibleExperience(experience).map((entry, i) => (
        <li
          key={`${entry.company}-${i}`}
          className={cn(
            "relative border-l py-5 pl-6",
            entry.placeholder ? "border-dashed border-line" : "border-line",
          )}
        >
          <span
            aria-hidden
            className={cn(
              "absolute top-6 -left-[5px] size-[9px] rounded-full border",
              i === 0 ? "border-accent bg-accent" : "border-line bg-bg",
            )}
          />
          <p className="font-mono text-xs text-muted">{entry.period}</p>
          <p className="mt-1.5 font-display text-lg font-medium text-fg">
            {entry.role} <span className="text-muted">·</span>{" "}
            <span className={entry.placeholder ? "text-muted" : undefined}>{entry.company}</span>
          </p>
          {entry.summary ? <p className="mt-1 text-sm text-muted">{entry.summary}</p> : null}
          {entry.placeholder ? (
            <Tag className="mt-3 border-dashed">Placeholder — update data/experience.ts</Tag>
          ) : null}
        </li>
      ))}
    </ol>
  );
};

export const About = () => {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-24 sm:py-32">
      <div className="container-page">
        <SectionLabel index="03">About</SectionLabel>

        <div className="mt-10 grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h2 id="about-heading" className="text-display font-bold uppercase">
              Engineering is more than writing code.
            </h2>

            <Reveal className="mt-10 max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
              <p>
                I&apos;m Jay — a <span className="text-fg">product engineer</span> with over five years
                of building web products, most of it on the frontend. I like owning a feature{" "}
                <span className="text-fg">end to end</span>: understanding why it matters, shaping the
                scope with product and design, building the UI and the APIs it needs, and seeing it
                through to production.
              </p>
              <p>
                Most of my work has been where the interface is the hard part: permission-heavy
                enterprise tools, data-dense screens and healthcare workflows. I&apos;ve led a small
                frontend team and been the only engineer on a client product. Both taught me that the
                most useful thing an engineer brings is{" "}
                <span className="text-fg">judgment about what to build</span>, not just how.
              </p>
            </Reveal>

            <Reveal className="mt-12">
              <p className="label-mono text-muted">Currently interested in</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {interests.professional.map((item) => (
                  <li
                    key={item}
                    className="rounded-sm border border-line bg-surface px-3 py-2 font-display text-base text-fg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="flex flex-col gap-12 lg:col-span-4 lg:col-start-9">
            <Reveal>
              <p className="label-mono mb-2 text-muted">Experience</p>
              <Timeline />
            </Reveal>

            <Reveal className="rounded-md border border-line bg-surface p-5">
              <p className="label-mono text-muted">Off the keyboard</p>
              <ul className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line">
                {interests.personal.map((item) => (
                  <li key={item} className="bg-surface px-3 py-3 font-mono text-sm text-fg">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
