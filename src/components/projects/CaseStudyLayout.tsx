import { ArrowLeft, ArrowUpRight, Lock } from "lucide-react";
import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import type { CaseStudy, Project } from "@/data/types";
import { pad } from "@/lib/utils";
import { Blocks } from "./Blocks";
import { CaseStudyToc } from "./CaseStudyToc";

const TECH_ID = "technologies";

export const CaseStudyLayout = ({
  project,
  study,
  index,
  next,
}: {
  project: Project;
  study: CaseStudy;
  index: number;
  next: Project;
}) => {
  const toc = [
    ...study.sections.map((s) => ({
      id: s.id,
      title: s.title,
      children: s.subsections?.map((sub) => ({ id: sub.id, title: sub.title })),
    })),
    { id: TECH_ID, title: "Technologies used" },
  ];

  return (
    <article className="pt-28 pb-24 sm:pt-32">
      {/* Header */}
      <header className="container-page">
        <Link
          href="/#work"
          className="label-mono inline-flex items-center gap-2 text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft size={14} strokeWidth={1.75} aria-hidden />
          All work
        </Link>

        <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="font-mono text-sm text-accent">{pad(index + 1)}</span>
          <span className="label-mono text-muted">{project.category}</span>
          {project.status === "in-development" ? (
            <span className="label-mono rounded-sm border border-dashed border-accent/60 px-2 py-1 text-[0.625rem] text-accent">
              Work in progress
            </span>
          ) : null}
        </div>

        <h1 className="mt-6 max-w-5xl text-display font-bold uppercase">{project.title}</h1>

        <div className="mt-10 grid gap-10 border-t border-line pt-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="max-w-2xl text-lg leading-relaxed text-fg/90 sm:text-xl">{study.lede}</p>
            {project.confidentiality ? (
              <p className="mt-6 flex max-w-2xl items-start gap-2 font-mono text-xs leading-relaxed text-muted">
                <Lock size={13} strokeWidth={1.75} aria-hidden className="mt-0.5 shrink-0 text-accent" />
                {project.confidentiality}
              </p>
            ) : null}
          </div>

          <dl className="grid grid-cols-2 self-start border-t border-l border-line lg:col-span-5">
            {study.facts.map((f) => (
              <div key={f.label} className="border-r border-b border-line p-4">
                <dt className="label-mono text-[0.625rem] text-muted">{f.label}</dt>
                <dd className="mt-2 font-display text-base font-medium text-fg">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* Body */}
      <div className="container-page mt-20 grid gap-12 lg:grid-cols-12 lg:gap-8">
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-24">
            <CaseStudyToc items={toc} />
          </div>
        </aside>

        <div className="min-w-0 lg:col-span-9">
          {study.sections.map((section, i) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-title`}
              className="border-t border-line py-12 first:border-t-0 first:pt-0 sm:py-16"
            >
              <p className="font-mono text-sm text-accent">{pad(i + 1)}</p>
              <h2 id={`${section.id}-title`} className="mt-3 text-title font-semibold">
                {section.title}
              </h2>
              <div className="mt-8">
                <Blocks blocks={section.blocks} />
              </div>

              {section.subsections?.map((sub, j) => (
                <section
                  key={sub.id}
                  id={sub.id}
                  aria-labelledby={`${sub.id}-title`}
                  className="mt-14 border-l border-line pl-5 sm:pl-8"
                >
                  <p className="label-mono text-[0.625rem] text-muted">
                    {pad(i + 1)}.{j + 1}
                  </p>
                  <h3 id={`${sub.id}-title`} className="mt-2 text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                    {sub.title}
                  </h3>
                  <div className="mt-6">
                    <Blocks blocks={sub.blocks} headingLevel={4} />
                  </div>
                </section>
              ))}
            </section>
          ))}

          <section id={TECH_ID} aria-labelledby={`${TECH_ID}-title`} className="border-t border-line py-12 sm:py-16">
            <p className="font-mono text-sm text-accent">{pad(study.sections.length + 1)}</p>
            <h2 id={`${TECH_ID}-title`} className="mt-3 text-title font-semibold">
              Technologies used
            </h2>
            <dl className="mt-8 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
              {study.techGroups.map((g) => (
                <div key={g.group} className="bg-bg p-5">
                  <dt className="label-mono text-[0.625rem] text-muted">{g.group}</dt>
                  <dd className="mt-3 flex flex-wrap gap-1.5">
                    {g.items.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Next project */}
          <nav aria-label="Next project" className="border-t border-line pt-12">
            <Link
              href={`/work/${next.slug}`}
              className="group flex flex-col gap-3 rounded-md border border-line p-6 transition-colors hover:border-muted/60 sm:flex-row sm:items-end sm:justify-between sm:p-8"
            >
              <span>
                <span className="label-mono text-muted">Next project</span>
                <span className="mt-3 block font-display text-2xl font-semibold tracking-tight text-fg transition-colors group-hover:text-accent sm:text-4xl">
                  {next.title}
                </span>
              </span>
              <ArrowUpRight
                size={28}
                strokeWidth={1.5}
                aria-hidden
                className="text-muted transition-[color,transform] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
              />
            </Link>
          </nav>
        </div>
      </div>
    </article>
  );
};
