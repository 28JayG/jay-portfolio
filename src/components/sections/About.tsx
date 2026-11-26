import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Tag } from "@/components/ui/Tag";
import { experience, interests } from "@/data/experience";
import { cn } from "@/lib/utils";

const Timeline = () => {
  return (
    <ol className="relative">
      {experience.map((entry, i) => (
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
                I&apos;m Jay — a <span className="text-fg">frontend engineer</span> with over five
                years of building web applications. I enjoy the problems where the interface is the hard
                part: permission-heavy enterprise tools, data-dense screens and workflows with a lot of
                states to get right.
              </p>
              <p>
                I like understanding the <span className="text-fg">system behind a screen</span> — the
                API contract, the auth model, the shape of the data — because that is usually where the
                real UI decisions get made. I care about code that the next engineer can change with
                confidence.
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
