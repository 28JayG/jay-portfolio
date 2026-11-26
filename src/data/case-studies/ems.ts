import type { CaseStudy } from "../types";

/**
 * EMS — flagship case study.
 * Facts come from the project brief and career-ops/cv.md. Everything is
 * generalised for NDA: no client, region, screens or proprietary code.
 * Code samples are illustrative patterns, explicitly labelled as such.
 */
export const ems: CaseStudy = {
  slug: "election-management-system",
  lede:
    "An internal platform for administering elections end to end — structure and setup, voter and candidate records, printed materials and results. Not one app, but an ecosystem of frontends sharing identity, components and data, where a wrong permission or a slow table has real operational cost.",
  facts: [
    { label: "Type", value: "Internal enterprise platform" },
    { label: "My role", value: "Frontend lead & architecture" },
    { label: "Team", value: "Led 4 frontend engineers" },
    { label: "Scope", value: "Multiple related frontends" },
  ],
  sections: [
    {
      id: "overview",
      title: "Project introduction",
      blocks: [
        {
          type: "p",
          text: "The platform supports the people who run elections: administrators who configure the process, staff who manage records, and the teams who print materials and publish results. Each group works in the same ecosystem with very different permissions, data and workflows.",
        },
        {
          type: "p",
          text: "I directed frontend architecture and delivery across that ecosystem — the identity model, the data and state architecture, the shared component library and the patterns other engineers built features on.",
        },
        {
          type: "callout",
          tone: "nda",
          text: "This is an internal product under NDA. Client, region, screens and proprietary code are omitted; diagrams are generalised and code samples are illustrative patterns, not production source.",
        },
      ],
    },
    {
      id: "context",
      title: "Business context",
      blocks: [
        {
          type: "p",
          text: "Election operations are deadline-driven and unforgiving. Work happens in phases, many roles touch the same records, and the output is not only data on a screen but physical documents and published results.",
        },
        {
          type: "list",
          items: [
            "Many roles share one system, each allowed to see and change different things.",
            "Datasets are large — records, candidates and results — and must stay correct under heavy use.",
            "Workflows cross into the physical world through printers and scanners.",
            "Screen configuration (navigation, columns, filters) changes more often than core logic.",
            "Services are deployed into a restricted cloud environment with tight operational constraints.",
          ],
        },
      ],
    },
    {
      id: "problem",
      title: "The problem",
      blocks: [
        {
          type: "p",
          text: "The challenge was less about any single screen and more about keeping a growing, multi-app frontend correct, fast and changeable at the same time.",
        },
        {
          type: "cards",
          items: [
            {
              title: "Access is granular",
              text: "Permissions gate routes, actions and individual fields. Scattered role checks would become unmaintainable and unsafe.",
            },
            {
              title: "Data is heavy",
              text: "Large tables need server-side paging, sorting and filtering, and some views render hundreds of tables at once.",
            },
            {
              title: "Workflows are long",
              text: "Multi-step, API-driven administrative flows where state must survive navigation and errors must be recoverable.",
            },
            {
              title: "Hardware is involved",
              text: "Printing and scanning steps live inside browser workflows and must report status and failures clearly.",
            },
            {
              title: "Many apps, one standard",
              text: "Several frontends need to look and behave consistently without copy-pasted components drifting apart.",
            },
            {
              title: "Change without releases",
              text: "Frequent configuration changes should not require a frontend deploy every time.",
            },
          ],
        },
      ],
    },
    {
      id: "role",
      title: "My role and responsibilities",
      blocks: [
        {
          type: "list",
          items: [
            "Directed frontend architecture and delivery across the platform's frontends.",
            "Led and mentored a 4-person frontend team; worked with product, design, backend and DevOps.",
            "Architected a headless-CMS-driven configuration layer for navigation, tables and filters.",
            "Spearheaded a shared React component library, distributed through a private registry with versioned releases.",
            "Restructured derived data in Zustand and introduced virtualisation for results views with hundreds of tables.",
            "Engineered a paginated candidate-facing portal supporting 2,000+ candidates.",
            "Built authentication and authorization on Keycloak with role-based access control.",
            "Deployed containerised frontend services to a restricted cloud environment.",
          ],
        },
      ],
    },
    {
      id: "architecture",
      title: "Technical architecture",
      blocks: [
        {
          type: "p",
          text: "Identity sits at the top: Keycloak issues the session and role claims every frontend relies on. Each application is organised into feature modules over a shared state layer and a shared UI library. Below that, a headless CMS supplies screen configuration, backend APIs own the data, and device integrations handle print and scan.",
        },
        {
          type: "diagram",
          id: "ems-system",
          caption: "Platform overview. Identity, shared UI and configuration are cross-cutting; features are built on top of them.",
        },
      ],
      subsections: [
        {
          id: "auth",
          title: "Authentication and authorization",
          blocks: [
            {
              type: "p",
              text: "Authentication is delegated to Keycloak. The frontend's job is to turn the identity provider's role claims into a single, typed permission model and make that model the only way the UI asks “can this user do this?”.",
            },
            {
              type: "diagram",
              id: "ems-auth",
              caption: "Generalised OIDC-style flow: the UI uses permissions to shape the experience; the API remains the enforcement point.",
            },
            {
              type: "list",
              items: [
                "One mapping from identity-provider roles to application permissions — never raw role strings in components.",
                "Guards at three levels: routes, actions (buttons, menu items) and individual fields.",
                "The UI hides what a user cannot do; the server still rejects it. The frontend is never the security boundary.",
              ],
            },
            {
              type: "code",
              file: "permissions.tsx",
              caption: "Illustrative pattern — simplified, not production code.",
              code: `type Permission = "records.view" | "records.edit" | "results.publish";

export const useCan = () => {
  const { permissions } = useSession(); // derived from Keycloak role claims
  return (p: Permission) => permissions.has(p);
};

export const Can = ({ I, children }: { I: Permission; children: React.ReactNode }) => {
  return useCan()(I) ? <>{children}</> : null;
};

// <Can I="results.publish"><PublishButton /></Can>`,
            },
            {
              type: "callout",
              tone: "placeholder",
              text: "[Add: how sessions/tokens were refreshed and stored, and the rough size of the role → permission model.]",
            },
          ],
        },
        {
          id: "data-architecture",
          title: "Frontend data architecture",
          blocks: [
            {
              type: "p",
              text: "State is split by who owns it. Anything that defines “what am I looking at” lives in the URL. Anything that comes from the server is React Query's job. Zustand holds client-side state that is shared across screens or derived from server data. Everything else stays local.",
            },
            {
              type: "diagram",
              id: "ems-state",
              caption: "Four homes for state, each with one responsibility.",
            },
            {
              type: "p",
              text: "On the results views, the expensive part was not fetching but deriving: the same data reshaped for many tables at once. Restructuring that derived data in Zustand — computing it once, subscribing narrowly — was one half of making those screens fast. Virtualisation was the other.",
            },
            {
              type: "code",
              file: "use-records.ts",
              caption: "Illustrative pattern — URL state drives the server-state cache.",
              code: `export const useRecords = () => {
  const params = useTableParams(); // page, sort, filters from the URL

  return useQuery({
    queryKey: ["records", params],
    queryFn: () => api.records.list(params),
    placeholderData: keepPreviousData, // no layout jump between pages
  });
};`,
            },
          ],
        },
        {
          id: "tables",
          title: "Complex data tables",
          blocks: [
            {
              type: "p",
              text: "Tables are the main working surface of the platform. They run in TanStack Table's manual mode: the server does paging, sorting and filtering, and the table renders exactly the page it is given. Column and filter definitions are data, which is what allowed some of them to move into CMS configuration.",
            },
            {
              type: "diagram",
              id: "ems-table",
              caption: "From URL to rendered rows. Every step is cacheable and every view is linkable.",
            },
            {
              type: "list",
              items: [
                "Server-side operations — the client never holds the full dataset.",
                "Previous page stays visible while the next one loads, so the layout never jumps.",
                "Virtualised rendering where a view has more rows or tables than can mount at once.",
                "Column definitions as configuration instead of hand-written JSX per screen.",
              ],
            },
            {
              type: "code",
              file: "columns.ts",
              caption: "Illustrative pattern — columns described as data, rendered by shared cells.",
              code: `type ColumnConfig = {
  key: string;
  label: string;
  cell: "text" | "status" | "date" | "actions";
  sortable?: boolean;
  permission?: Permission;
};

export const toColumns = (config: ColumnConfig[], can: (p: Permission) => boolean) =>
  config
    .filter((c) => !c.permission || can(c.permission))
    .map((c) => columnHelper.accessor(c.key, {
      header: c.label,
      cell: cells[c.cell],
      enableSorting: !!c.sortable,
    }));`,
            },
          ],
        },
        {
          id: "devices",
          title: "Device and printing integrations",
          blocks: [
            {
              type: "p",
              text: "Some workflows end with paper: documents are printed, and forms are scanned back into the system. From the frontend's perspective these are long-running, failure-prone steps inside an otherwise ordinary workflow, so the UI treats them as explicit states — pending, succeeded, failed, retryable — rather than fire-and-forget calls.",
            },
            {
              type: "diagram",
              id: "ems-devices",
              caption: "The device step is modelled as part of the workflow, with visible status and recovery.",
            },
            {
              type: "callout",
              tone: "placeholder",
              text: "[Add: how the browser reached printers and scanners (local agent, vendor SDK, server-side job, etc.), and the hardest failure mode you handled — described at a level the NDA allows.]",
            },
          ],
        },
        {
          id: "components",
          title: "Component reuse and maintainability",
          blocks: [
            {
              type: "p",
              text: "With several frontends in one ecosystem, consistency could not depend on discipline alone. I spearheaded a shared component library — tables, forms, layout and primitives on top of Material UI — and built it out with the team. It is published to a private package registry with versioned releases, so each app upgrades deliberately.",
            },
            {
              type: "diagram",
              id: "ems-components",
              caption: "One library, many consumers. Configuration from the CMS changes screens without a code release.",
            },
            {
              type: "p",
              text: "The second lever was configuration. Navigation, table columns and filters for supported screens are driven by a headless CMS, so a class of UI changes no longer needs a frontend release at all.",
            },
          ],
        },
      ],
    },
    {
      id: "challenges",
      title: "Engineering challenges",
      blocks: [
        {
          type: "cards",
          items: [
            {
              title: "Hundreds of tables on one screen",
              text: "Results views were slow because of repeated derivation and too many mounted rows. The fix was structural: compute derived data once, subscribe narrowly, and virtualise.",
            },
            {
              title: "Permissions without spaghetti",
              text: "Keeping route, action and field-level checks consistent across apps meant one permission model and one way to ask the question.",
            },
            {
              title: "Configurable, but still typed",
              text: "Moving UI into CMS configuration turns that configuration into an API. It needs a schema, validation and safe fallbacks when something is missing.",
            },
            {
              title: "Shipping into a restricted environment",
              text: "Containerised frontend services had to be deployable into a locked-down cloud with limited access and strict change control.",
            },
          ],
        },
      ],
    },
    {
      id: "decisions",
      title: "Key decisions and trade-offs",
      blocks: [
        {
          type: "decisions",
          items: [
            {
              decision: "Drive navigation, tables and filters from a headless CMS",
              why: "Configuration changed far more often than logic. Making it data removed a whole class of frontend releases.",
              tradeoff: "The config schema becomes a contract that needs validation, versioning and defaults — and is harder to test than code.",
            },
            {
              decision: "Ship shared UI as a versioned package, not a copied folder",
              why: "Several apps needed the same components; versioned releases let each upgrade on its own schedule.",
              tradeoff: "Release overhead, and apps can drift across versions if upgrades are not kept up.",
            },
            {
              decision: "Push paging, sorting and filtering to the server",
              why: "Datasets are too large for the client, and the server stays the single source of truth.",
              tradeoff: "Every interaction is a request; caching and placeholder data are needed to keep it feeling instant.",
            },
            {
              decision: "Give each kind of state one home",
              why: "URL, server, shared client and local state each have different lifetimes. Mixing them is where bugs come from.",
              tradeoff: "More concepts for new engineers, so the conventions need to be written down and reviewed.",
            },
            {
              decision: "Map identity roles into one typed permission model",
              why: "Components ask about capabilities, not roles — role changes stay in one file.",
              tradeoff: "The mapping must be kept in sync with role changes in the identity provider.",
            },
          ],
        },
      ],
    },
    {
      id: "implementation",
      title: "Implementation approach",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Foundations before features: identity, permission model, layout and the shared library are what every screen depends on.",
            "Conventions the team can follow: where state lives, how a table is wired, how a feature module is structured — enforced in review.",
            "Configuration where change is frequent: move navigation, columns and filters to the CMS once the patterns are stable.",
            "Profile, then optimise: performance work on results views started from measurement, not guesses.",
            "Containerised delivery: frontend services packaged for a restricted deployment target.",
          ],
        },
        {
          type: "p",
          text: "As lead, a large part of the work was making these decisions repeatable: reviewing, pairing and mentoring so that four engineers built features the same way.",
        },
      ],
    },
    {
      id: "outcome",
      title: "Outcome and learnings",
      blocks: [
        {
          type: "cards",
          items: [
            {
              title: "Fewer releases for UI changes",
              text: "CMS-driven configuration removed frontend releases for supported changes and contributed to a ~40% improvement in development speed.",
            },
            {
              title: "One component standard",
              text: "A shared, versioned UI library distributed across the ecosystem's frontends.",
            },
            {
              title: "Responsive results views",
              text: "Restructured derived state and virtualisation made screens with hundreds of tables usable.",
            },
            {
              title: "Portal at scale",
              text: "A paginated candidate-facing portal supporting 2,000+ candidates.",
            },
          ],
        },
        {
          type: "p",
          text: "The biggest lesson: in a system like this, architecture is mostly about where decisions live. Permissions in one model, state in one home per kind, configuration in one schema. When each decision has a single place, a small team can move quickly without breaking things it cannot see.",
        },
        {
          type: "callout",
          tone: "placeholder",
          text: "[Optional: any further outcome you can share — adoption of the library, performance before/after, or feedback from operators.]",
        },
      ],
    },
  ],
  techGroups: [
    { group: "Core", items: ["React", "TypeScript"] },
    { group: "Identity", items: ["Keycloak", "RBAC"] },
    { group: "Data & state", items: ["React Query", "Zustand", "TanStack Table", "Virtualisation"] },
    { group: "UI", items: ["Material UI", "Shared component library", "Private package registry"] },
    { group: "Platform", items: ["Headless CMS (Strapi)", "PostgreSQL", "Docker"] },
    { group: "Integrations", items: ["Printers", "Scanners"] },
  ],
};
