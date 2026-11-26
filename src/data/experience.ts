import type { ExperienceEntry } from "./types";

/**
 * Experience timeline, most recent first. Source: career-ops/cv.md.
 * Summaries stay generic on purpose — client names and NDA-covered domains are omitted.
 */
export const experience: ExperienceEntry[] = [
  {
    role: "Fullstack Developer",
    company: "BrightPeers",
    period: "Jan 2024 — Nov 2026",
    summary:
      "Led frontend architecture and a 4-person frontend team across an enterprise platform ecosystem: shared component library, config-driven UI and a Next.js platform.",
  },
  {
    role: "Fullstack Developer",
    company: "IntraEdge Technologies",
    period: "Jul 2023 — Jan 2024",
    summary:
      "Frontend services, API integrations and Okta SSO for an internal enterprise mortgage-management system.",
  },
  {
    role: "Senior Software Developer",
    company: "Propelius Technologies",
    period: "Feb 2022 — Jul 2023",
    summary:
      "Led a human-in-the-loop review application and frontend architecture across server-driven apps.",
  },
  {
    role: "Senior Frontend Developer",
    company: "Cookytech Technology",
    period: "Aug 2021 — Dec 2021",
    summary: "Set frontend architecture, API integration patterns and state strategy for new client apps.",
  },
  {
    role: "Frontend Developer",
    company: "Cookytech Technology",
    period: "Jan 2019 — Jul 2021",
    summary: "Built client web apps with SSR, SSG and ISR rendering strategies.",
  },
];

export const interests = {
  professional: [
    "Frontend architecture",
    "Product engineering",
    "Performance",
    "Developer experience",
    "AI-powered productivity tools",
  ],
  personal: ["Books", "Travel", "Gaming", "Fitness"],
};
