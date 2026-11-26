import { ArrowUpRight, Lock } from "lucide-react";
import Link from "next/link";
import { TagList } from "@/components/ui/Tag";
import type { Project } from "@/data/types";
import { cn, pad } from "@/lib/utils";
import { BuildStatus, EmsSchematic, SuiteGlyph } from "./ProjectVisuals";

/** Only work-in-progress is badged — no unverified "live"/"shipped" claims. */
const StatusBadge = ({ status }: { status: Project["status"] }) => {
  if (status !== "in-development") return null;
  return (
    <span className="label-mono inline-flex items-center gap-2 rounded-sm border border-dashed border-accent/60 px-2 py-1 text-[0.625rem] text-accent">
      <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-accent motion-reduce:animate-none" />
      Work in progress
    </span>
  );
};

const CardMeta = ({ project, index }: { project: Project; index: number }) => {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <span className="font-mono text-sm text-accent">{pad(index + 1)}</span>
      <span className="label-mono text-muted">{project.category}</span>
      <StatusBadge status={project.status} />
    </div>
  );
};

const CardTitle = ({ project, size }: { project: Project; size: "lg" | "md" }) => {
  return (
    <h3
      className={cn(
        "font-display font-semibold tracking-tight text-fg transition-colors group-hover:text-accent",
        size === "lg" ? "text-title" : "text-2xl sm:text-3xl",
      )}
    >
      {/* Stretched link: the whole card is clickable, but only one tab stop. */}
      <Link
        href={`/work/${project.slug}`}
        className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
      >
        {project.title}
      </Link>
    </h3>
  );
};

const Cta = ({ label }: { label: string }) => {
  return (
    <span aria-hidden className="label-mono inline-flex items-center gap-2 text-fg">
      <span className="border-b border-line pb-1 transition-colors group-hover:border-accent">{label}</span>
      <ArrowUpRight
        size={16}
        strokeWidth={1.5}
        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </span>
  );
};

const Confidential = ({ note }: { note: string }) => {
  return (
    <p className="flex items-start gap-2 font-mono text-[0.6875rem] leading-relaxed text-muted">
      <Lock size={12} strokeWidth={1.75} aria-hidden className="mt-0.5 shrink-0 text-accent" />
      <span>{note}</span>
    </p>
  );
};

const cardShell =
  "group relative flex h-full flex-col rounded-md border border-line bg-surface transition-colors duration-300 hover:border-muted/60 has-[a:focus-visible]:border-accent";

/** Flagship, full-width card. */
export const FeaturedProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <article className={cn(cardShell, "lg:grid lg:grid-cols-12")}>
      <div className="flex flex-col gap-6 p-6 sm:p-8 lg:col-span-7 lg:p-10">
        <CardMeta project={project} index={index} />
        <CardTitle project={project} size="lg" />
        <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{project.summary}</p>

        <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-sm text-fg/90">
              <span aria-hidden className="font-mono text-accent">→</span>
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-5 pt-2">
          <TagList items={project.tech} />
          {project.confidentiality ? <Confidential note={project.confidentiality} /> : null}
          <Cta label={project.cta} />
        </div>
      </div>

      <div className="border-t border-line p-4 sm:p-6 lg:col-span-5 lg:border-t-0 lg:border-l lg:p-8">
        <EmsSchematic />
      </div>
    </article>
  );
};

/** Secondary card. `visual` decides the illustration so each card reads differently. */
export const ProjectCard = ({
  project,
  index,
  visual,
}: {
  project: Project;
  index: number;
  visual: "status" | "suite";
}) => {
  return (
    <article
      className={cn(
        cardShell,
        "gap-6 p-6 sm:p-8",
        project.status === "in-development" && "border-dashed",
      )}
    >
      <CardMeta project={project} index={index} />
      <CardTitle project={project} size="md" />
      <p className="leading-relaxed text-muted">{project.summary}</p>

      {visual === "status" ? <BuildStatus items={project.highlights} /> : <SuiteGlyph />}

      {visual === "suite" ? (
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2 text-sm text-fg/90">
              <span aria-hidden className="font-mono text-accent">→</span>
              {h}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-auto flex flex-col gap-5 pt-2">
        <TagList items={project.tech} />
        {project.confidentiality ? <Confidential note={project.confidentiality} /> : null}
        <Cta label={project.cta} />
      </div>
    </article>
  );
};
