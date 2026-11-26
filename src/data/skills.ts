import type { Capability } from "./types";

export const coreExpertise = [
  "Product Engineering",
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
  "Config-driven UI",
  "Node.js / NestJS",
  "PostgreSQL / MySQL",
];

/**
 * "How I think about engineering". The `problem`/`approach` pairs describe how
 * Jay reasons about a class of problem — they are not claims about specific
 * projects or outcomes.
 */
export const capabilities: Capability[] = [
  {
    id: "ownership",
    title: "Product Ownership",
    explanation:
      "Turning a loose request into scoped, shippable work — and staying with it until it is in users' hands and doing its job.",
    tech: ["Requirements docs", "Scoping & estimates", "Technical design", "Stakeholder updates"],
    problem:
      "A stakeholder asks for “a dashboard”, with no agreement on who uses it, which decision it supports or what done looks like.",
    approach: [
      "Write down the need, what is out of scope and the open questions before any code",
      "Agree it with product and the client, then turn it into a technical plan with mutually decided dates",
      "Ship the smallest useful version, then iterate on real feedback",
    ],
  },
  {
    id: "architecture",
    title: "Frontend Architecture",
    explanation:
      "Clear boundaries and maintainable component systems, so a team can keep shipping features without each one getting slower to build than the last.",
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
    id: "config-driven",
    title: "Config-driven UI",
    explanation:
      "Describing screens as typed configuration instead of hand-written JSX, so the same rules power many views and a requirement change is a config change, not a rewrite.",
    tech: ["TypeScript", "Schema-driven forms", "Headless CMS", "React"],
    problem:
      "Create, edit, review, compare and search screens all show the same records with slightly different fields, rules and permissions, and they drift apart with every requirement change.",
    approach: [
      "Define sections, fields, types and rules once, as typed configuration",
      "One set of renderers turns it into forms, review diffs and comparison tables",
      "Permissions, conditional visibility and change warnings live in config, not JSX",
    ],
    snippet: {
      file: "record-form.config.ts",
      code: `export const recordFormConfig: FormConfig = {
  sections: {
    contact: { label: "Contact", fields: ["email", "phone", "taxId"] },
    address: { label: "Address", prefix: "address", fields: ["street", "city", "zip"] },
    renewal: { label: "Renewal", hideFor: ["self-service"], fields: ["renewalDate"] },
  },
  fields: {
    taxId: { label: "Tax ID", type: "string", permission: "pii.view" },
    renewalDate: {
      label: "Renewal date",
      type: "date",
      options: { visibleIf: [{ field: "status", value: "active" }], warnIfChanged: true },
    },
  },
};`,
    },
  },
  {
    id: "state",
    title: "State Management",
    explanation:
      "Choosing the right home for server, client and URL state, so views can be shared, survive a refresh and never show users stale data.",
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
      "Starting from what users feel. Profile before optimising, understand why React renders, and fix the interaction that actually feels slow.",
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
      "Auth flows, authorization models and identity-provider integrations that give each role exactly the product it should see, without scattering role checks through the UI.",
    tech: ["Keycloak", "OIDC / OAuth 2.0", "RBAC", "Protected routes"],
    problem:
      "Permissions must gate routes, actions and individual fields — and the rules change more often than the screens.",
    approach: [
      "Keep tokens in one place: refresh just in time and attach them in the API client",
      "Load permissions from the server once, flatten them, and expose a single access check",
      "Treat the UI as a hint; the API remains the source of truth",
    ],
  },
  {
    id: "data",
    title: "Data-heavy Interfaces",
    explanation:
      "Tables, search, filters and dashboards that help people find, compare and act on data, and stay fast as it grows.",
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
