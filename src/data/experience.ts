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
      "Owned frontend architecture and delivery across an enterprise platform ecosystem and led a 4-person team. Also the sole engineer on a three-product healthcare client suite.",
  },
  {
    role: "Fullstack Developer",
    company: "IntraEdge Technologies",
    period: "Jul 2023 — Jan 2024",
    summary:
      "Owned Okta SSO for an internal mortgage-management system end to end, from frontend architecture through deployment.",
  },
  {
    role: "Senior Software Developer",
    company: "Propelius Technologies",
    period: "Feb 2022 — Jul 2023",
    summary:
      "Led delivery of a human-in-the-loop review app, and turned a struggling engagement into a clean release in three weeks.",
  },
  {
    role: "Senior Frontend Developer",
    company: "Cookytech Technology",
    period: "Aug 2021 — Dec 2021",
    summary: "Set architecture for new client products and validated them with real-time and order-management proofs of concept.",
  },
  {
    role: "Frontend Developer",
    company: "Cookytech Technology",
    period: "Jan 2019 — Jul 2021",
    summary: "Led development of an e-learning platform that supported a startup fundraising event; shipped SSR/SSG/ISR client sites.",
  },
];

export const interests = {
  professional: [
    "Product engineering",
    "Frontend architecture",
    "Performance",
    "Developer experience",
    "AI-powered productivity tools",
  ],
  personal: ["Books", "Travel", "Gaming", "Fitness"],
};
