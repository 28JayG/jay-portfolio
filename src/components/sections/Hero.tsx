import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { Button, DisabledButton } from "@/components/ui/Button";
import { Emphasize } from "@/components/ui/Emphasize";
import { site } from "@/data/site";
import { HeroHeadline } from "./HeroHeadline";

const spec = [
  { key: "Experience", value: `${site.yearsExperience} years building` },
  { key: "Stack", value: "React / Next.js" },
  { key: "Focus", value: "Frontend architecture" },
  { key: "Location", value: `Based in ${site.location}` },
];

export const Hero = () => {
  return (
    <section
      id="top"
      tabIndex={-1}
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden pt-28 pb-16 outline-none sm:pt-36 lg:pb-24"
    >
      {/* Blueprint grid, faded toward the edges */}
      <div
        aria-hidden
        className="bg-blueprint absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_70%_at_30%_40%,black,transparent)]"
      />

      <div className="container-page">
        <div className="label-mono mb-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-muted sm:mb-12">
          <p>
            <span className="text-fg">{site.name}</span> <span className="text-accent">/</span>{" "}
            {site.title}
          </p>
          <p className="hidden sm:block">Portfolio — Index</p>
        </div>

        <div id="hero-heading">
          <HeroHeadline />
        </div>

        <div className="mt-12 grid gap-12 border-t border-line pt-10 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <p className="max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              <Emphasize
                text={site.statement}
                phrases={[
                  "frontend engineer",
                  "scalable applications",
                  "complex UI problems",
                  "thoughtful architectural decisions",
                ]}
              />
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap [&>*]:w-full sm:[&>*]:w-auto">
              <Button href="/#work" icon={<ArrowDown size={16} strokeWidth={1.75} />}>
                Explore my work
              </Button>
              <Button href="/#contact" variant="secondary" icon={<ArrowUpRight size={16} strokeWidth={1.75} />}>
                Get in touch
              </Button>
              {site.resumePath ? (
                <Button href={site.resumePath} download variant="secondary" icon={<Download size={16} strokeWidth={1.75} />}>
                  Download resume
                </Button>
              ) : (
                <DisabledButton note="Resume link not configured yet" icon={<Download size={16} strokeWidth={1.75} />}>
                  Download resume
                </DisabledButton>
              )}
            </div>
          </div>

          <dl className="grid grid-cols-2 self-end border-t border-l border-line lg:col-span-5 lg:col-start-8">
            {spec.map((row) => (
              <div key={row.key} className="border-r border-b border-line p-4 sm:p-5">
                <dt className="label-mono text-[0.625rem] text-muted">{row.key}</dt>
                <dd className="mt-2 font-display text-base font-medium text-fg sm:text-lg">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};
