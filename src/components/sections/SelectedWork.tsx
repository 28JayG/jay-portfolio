import { FeaturedProjectCard, ProjectCard } from "@/components/projects/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { projects } from "@/data/projects";

export const SelectedWork = () => {
  const [featured, ...rest] = projects;

  return (
    <section id="work" aria-labelledby="work-heading" className="py-24 sm:py-32">
      <div className="container-page">
        <SectionLabel index="01">Selected work</SectionLabel>

        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="work-heading" className="text-display font-bold uppercase lg:col-span-7">
            Selected work
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
            Some problems I&apos;ve worked on and systems I&apos;ve helped build.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:gap-6">
          {featured ? (
            <Reveal className="h-full">
              <FeaturedProjectCard project={featured} index={0} />
            </Reveal>
          ) : null}

          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
            {rest.map((project, i) => (
              <Reveal key={project.slug} delay={0.08 * i} className="h-full">
                <ProjectCard
                  project={project}
                  index={i + 1}
                  visual={project.status === "in-development" ? "status" : "suite"}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
