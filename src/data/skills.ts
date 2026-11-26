import type { Capability } from "./types";

export const coreExpertise = [
  "React",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "Frontend Architecture",
  "State Management",
  "React Query",
  "Zustand",
  "Material UI",
  "Tailwind CSS",
  "Keycloak",
  "AuthN / AuthZ",
  "Performance",
  "Data-heavy UIs",
];

/**
 * "How I think about engineering". The `problem`/`approach` pairs describe how
 * Jay reasons about a class of problem — they are not claims about specific
 * projects or outcomes.
 */
export const capabilities: Capability[] = [
  {
    id: "architecture",
    title: "Frontend Architecture",
    explanation:
      "Building maintainable component systems, defining clear boundaries and keeping application complexity from leaking across features.",
    tech: ["React", "Next.js", "TypeScript", "Design systems"],
    problem:
      "A feature grows across several developers and starts pushing API shapes and business rules into shared components.",
    approach: [
      "Feature-based modules with an explicit public surface",
      "A thin, typed API layer between the server and the UI",
      "Presentational components that know nothing about fetching",
    ],
  },
  {
    id: "state",
    title: "State Management",
    explanation:
      "Choosing the right home for each piece of state — server state, client state and URL state — instead of putting everything in one global store.",
    tech: ["React Query", "Zustand", "URL search params"],
    problem:
      "A filter panel, a results table and a detail drawer all need the same filters, and the view must survive refresh and be shareable.",
    approach: [
      "Filters live in the URL — shareable and back-button safe",
      "Server data is cached by React Query, keyed by those filters",
      "Ephemeral UI (selection, open panels) stays local or in Zustand",
    ],
    snippet: {
      file: "use-records.ts",
      code: `const filters = useFilters(); // parsed from the URL

return useQuery({
  queryKey: ["records", filters],
  queryFn: () => api.records.list(filters),
  placeholderData: keepPreviousData,
});`,
    },
  },
  {
    id: "performance",
    title: "Performance Engineering",
    explanation:
      "Understanding why React renders, profiling before optimising, and fixing the interaction that actually feels slow.",
    tech: ["React Profiler", "Chrome DevTools", "Web Vitals", "Virtualization"],
    problem:
      "Typing into a search box over a large table stutters because every keystroke re-renders hundreds of rows.",
    approach: [
      "Profile first to confirm what is re-rendering and why",
      "Isolate input state and defer the expensive derived work",
      "Stabilise row props, then virtualise when row count demands it",
    ],
  },
  {
    id: "auth",
    title: "Authentication & Security",
    explanation:
      "Implementing authentication flows, authorization models and identity-provider integrations without scattering role checks through the UI.",
    tech: ["Keycloak", "OIDC / OAuth 2.0", "RBAC", "Protected routes"],
    problem:
      "Permissions must gate routes, actions and individual fields — and the rules change more often than the screens.",
    approach: [
      "Map identity-provider claims into one typed permission model",
      "Expose a single `can()` check and a declarative guard component",
      "Treat the UI as a hint; the API remains the source of truth",
    ],
  },
  {
    id: "data",
    title: "Data-heavy Interfaces",
    explanation:
      "Building complex tables, search, filtering workflows and dashboards that stay fast and understandable as the data grows.",
    tech: ["TanStack Table", "React Query", "Chart.js", "Material UI"],
    problem:
      "A table over a large dataset needs server-side paging, sorting and filtering without layout jumps or lost context.",
    approach: [
      "Table runs in manual mode, driven entirely by URL state",
      "Previous page stays on screen while the next one loads",
      "Column definitions are configuration, not copy-pasted JSX",
    ],
  },
];
