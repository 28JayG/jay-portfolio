import { getProject, projects } from "@/data/projects";
import { ogSize, renderOgCard } from "@/lib/og";

export const alt = "Case study by Jay Gandhi";
export const size = ogSize;
export const contentType = "image/png";

export const generateStaticParams = () => {
  return projects.map((p) => ({ slug: p.slug }));
};

const Image = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const project = getProject(slug);
  return renderOgCard({
    eyebrow: project ? `Case study · ${project.category}` : "Case study",
    title: project?.title ?? "Case study",
    subtitle: project ? project.highlights.slice(0, 2).join(" · ") : "",
    tags: project?.tech ?? [],
  });
};

export default Image;
