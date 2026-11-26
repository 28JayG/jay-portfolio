import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CaseStudySkeleton } from "@/components/projects/CaseStudySkeleton";
import { JsonLd } from "@/components/layout/JsonLd";
import { CaseStudyLayout } from "@/components/projects/CaseStudyLayout";
import { site } from "@/data/site";
import { getCaseStudy } from "@/data/case-studies";
import { projects } from "@/data/projects";
import { prepareCaseStudy } from "@/lib/placeholders";

export const generateStaticParams = () => {
  return projects.map((p) => ({ slug: p.slug }));
};

const resolve = (slug: string) => {
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  const study = getCaseStudy(slug);
  if (!project || !study) return null;
  const next = projects[(index + 1) % projects.length]!;
  return { project, study: prepareCaseStudy(study), index, next };
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

/**
 * Reads `params` inside a Suspense boundary so the route's shared App Shell stays
 * URL-independent (required by Partial Prefetching). Every slug is still fully
 * prerendered via generateStaticParams, so direct loads ship the complete HTML.
 */
const CaseStudyPage = ({ params }: PageProps<"/work/[slug]">) => {
  return (
    <Suspense fallback={<CaseStudySkeleton />}>
      <CaseStudyContent params={params} />
    </Suspense>
  );
};

const CaseStudyContent = async ({ params }: Pick<PageProps<"/work/[slug]">, "params">) => {
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
