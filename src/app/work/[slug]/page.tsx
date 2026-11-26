import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/layout/JsonLd";
import { CaseStudyLayout } from "@/components/projects/CaseStudyLayout";
import { site } from "@/data/site";
import { getCaseStudy } from "@/data/case-studies";
import { projects } from "@/data/projects";

export const generateStaticParams = () => {
  return projects.map((p) => ({ slug: p.slug }));
};

const resolve = (slug: string) => {
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  const study = getCaseStudy(slug);
  if (!project || !study) return null;
  const next = projects[(index + 1) % projects.length]!;
  return { project, study, index, next };
};

export const generateMetadata = async ({ params }: PageProps<"/work/[slug]">): Promise<Metadata> => {
  const { slug } = await params;
  const data = resolve(slug);
  if (!data) return {};
  return {
    title: `${data.project.title} — Case study`,
    description: data.project.summary,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      type: "article",
      title: data.project.title,
      description: data.project.summary,
      url: `/work/${slug}`,
    },
  };
};

const CaseStudyPage = async ({ params }: PageProps<"/work/[slug]">) => {
  const { slug } = await params;
  const data = resolve(slug);
  if (!data) notFound();

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${data.project.title} — case study`,
    description: data.project.summary,
    url: `${site.url}/work/${slug}`,
    author: { "@type": "Person", name: site.name, url: site.url },
    keywords: data.project.tech.join(", "),
  };

  return (
    <>
      <JsonLd data={article} />
      <CaseStudyLayout {...data} />
    </>
  );
};

export default CaseStudyPage;
