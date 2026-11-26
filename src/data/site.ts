import type { SiteConfig } from "./types";

/**
 * Personal information. Everything rendered about Jay that is not a project
 * or a timeline entry lives here — update this file, not the components.
 */
export const site: SiteConfig = {
  name: "Jay Gandhi",
  monogram: "JG.",
  title: "Product Engineer",
  focus: "Frontend-leaning",
  // Set NEXT_PUBLIC_SITE_URL at deploy time once the domain is bought.
  // Drives canonical URLs, the sitemap, robots.txt and absolute Open Graph image URLs.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  location: "India",
  yearsExperience: "05+",
  positioning: "I build systems, not just interfaces.",
  statement:
    "I'm a product engineer. I own features from the problem to production: shaping scope with product and design, building the interface and the APIs behind it, and making the architectural calls that keep a product easy to change.",
  availability: {
    open: true,
    label: "Open to new roles",
  },
  email: "jaygandhi.32@outlook.com",
  resumePath: "/resume/Jay_Gandhi_Resume.pdf",
  socials: {
    linkedin: {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/28jayg/",
      handle: "in/28jayg",
    },
    github: {
      label: "GitHub",
      href: "https://github.com/28JayG",
      handle: "@28JayG",
    },
  },
};

export const navItems = [
  { id: "top", label: "Home" },
  { id: "work", label: "Work" },
  { id: "engineering", label: "Engineering" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof navItems)[number]["id"];
