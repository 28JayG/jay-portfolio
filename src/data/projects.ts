import type { Project } from "./types";

/**
 * Selected work. Order here is display order on the homepage.
 * Detailed case-study content is added per project in phase 2.
 */
export const projects: Project[] = [
  {
    slug: "election-management-system",
    title: "Election Management System",
    shortTitle: "EMS",
    category: "Enterprise Application",
    status: "active",
    confidentiality:
      "Internal product under NDA. Client, domain specifics and screens are generalised.",
    summary:
      "An internal platform that administrators, records staff and operations teams use to run elections end to end: multi-step workflows, voter and records management, granular permissions, and printing and scanning hardware.",
    tech: ["React", "TypeScript", "Keycloak", "React Query", "TanStack Table", "Material UI"],
    highlights: [
      "Role-based access control across routes, actions and data",
      "Large server-driven tables with paging, sorting and filtering",
      "Config-driven forms, reviews and comparisons",
      "Shared, reusable component foundations",
      "Printer and scanner device integrations",
      "Keycloak authentication and authorization",
    ],
    cta: "Explore case study",
    featured: true,
  },
  {
    slug: "ai-timesheet-copilot",
    title: "AI Timesheet Copilot",
    shortTitle: "Copilot",
    category: "AI / Productivity",
    status: "in-development",
    summary:
      "An AI-assisted tool that takes the manual work out of time reporting — tracking time against projects and turning it into structured timesheet entries.",
    tech: ["Vue.js", "Python", "FastAPI", "AI integrations"],
    highlights: [
      "Task and project time tracking",
      "AI-assisted timesheet generation",
      "Structured timesheet output",
      "Office productivity workflow integration",
    ],
    cta: "Explore project",
  },
  {
    slug: "r3-recovery-platform",
    title: "R3 Recovery Platform",
    shortTitle: "R3",
    category: "Healthcare · Product suite",
    status: "active",
    confidentiality:
      "Client work. Brand, people, data and screens are omitted; the suite is described generically.",
    summary:
      "Three connected products for addiction-recovery care: a counselor app for AI-assisted clinical documentation, a client app for assessments and treatment plans, and a rewards platform where clinics award points for recovery milestones.",
    tech: ["Next.js", "TypeScript", "NestJS", "MySQL", "Electron", "Twilio", "Chart.js"],
    highlights: [
      "Counselor app — web, desktop and mobile",
      "Client app — assessments, plans, reminders",
      "Rewards API — ledger-based points",
      "AI notes behind one provider layer",
    ],
    cta: "Explore project",
  },
];

export const getProject = (slug: string): Project | undefined => {
  return projects.find((p) => p.slug === slug);
};
