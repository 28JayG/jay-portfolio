import type { Metadata } from "next";
import { JsonLd } from "@/components/layout/JsonLd";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Engineering } from "@/components/sections/Engineering";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { coreExpertise } from "@/data/skills";
import { site } from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  description: site.statement,
  url: site.url,
  ...(site.email ? { email: `mailto:${site.email}` } : {}),
  address: { "@type": "PostalAddress", addressCountry: "IN" },
  sameAs: [site.socials.linkedin.href, site.socials.github.href],
  knowsAbout: coreExpertise,
};

const HomePage = () => {
  return (
    <>
      <JsonLd data={person} />
      <Hero />
      <SelectedWork />
      <Engineering />
      <About />
      <Contact />
    </>
  );
};

export default HomePage;
