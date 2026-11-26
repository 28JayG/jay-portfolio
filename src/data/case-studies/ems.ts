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
            "Datasets are large — (2M+) records, candidates and results — and must stay correct under heavy use.",
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
            "Directed frontend architecture and delivery across the platform's frontends, from scoping with product to production releases.",
            "Led and mentored a 4-person frontend team; worked with product, design, backend and DevOps.",
            "Architected a headless-CMS-driven configuration layer for navigation, tables and filters.",
            "Designed typed form configuration that drives create, edit, review and comparison screens from one definition.",
            "Spearheaded a shared React component library, distributed through a private registry with versioned releases.",
            "Restructured derived data in Zustand and introduced virtualisation for results views with hundreds of tables.",
            "Engineered a paginated candidate-facing portal supporting 2,000+ candidates.",
            "Integrated silent printing through a local print service, and built a reusable scanning library with batch scanning and barcode indexing.",
            "Built Keycloak authentication with just-in-time token refresh in the API layer, and a server-driven, module-based permission model.",
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
          text: "Identity sits at the top: Keycloak issues the session every frontend relies on, and a permissions service decides what each user can do. Each application is organised into feature modules over a shared state layer and a shared UI library. Below that, a headless CMS supplies screen configuration, backend APIs own the data, and device integrations handle print and scan.",
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
              text: "Identity and authorization are deliberately separate. Keycloak owns who the user is and keeps the session alive; the platform's permissions service decides what they can do. The frontend's job is to keep both invisible to feature code: no component touches a token, and no component reads a raw role.",
            },
            {
              type: "p",
              text: "Token management lives in one place: an Axios interceptor on the shared API client. Before every request it asks Keycloak to refresh the access token if it is about to expire, then attaches it together with the user's working context: the jurisdiction and user type they are acting as, kept per browser tab. There are no background refresh timers. A token is renewed exactly when a request needs it.",
            },
            {
              type: "diagram",
              id: "ems-auth",
              caption: "Every API call passes through the same two interceptors. Feature code just calls the API.",
            },
            {
              type: "list",
              items: [
                "401: a clear “session expired” message and a clean logout, rather than a screen of failed requests.",
                "403: the server's reason is shown and the user is returned to the dashboard instead of a broken page.",
                "A failed refresh logs the user out, so the app is never half-authenticated.",
                "Before the app loads, unverified emails and pending required actions (like a forced password change) are routed to their own screens.",
              ],
            },
            {
              type: "code",
              file: "use-axios-interceptor.ts",
              caption: "Illustrative pattern — simplified from the real interceptor; names generalised.",
              code: `api.interceptors.request.use(async (config) => {
  if (keycloak.authenticated) {
    try {
      await keycloak.updateToken(5); // refresh only if it expires within 5s
      config.headers.set("Authorization", \`Bearer \${keycloak.token}\`);
      config.headers.set("X-Tenant-Context", encodeContext(getTabContext()));
    } catch {
      await keycloak.logout(); // never send a request with a dead session
    }
  }
  return config;
});

api.interceptors.response.use(undefined, async (error) => {
  if (error.response?.status === 401) return sessionExpired(error);
  if (error.response?.status === 403) return accessDenied(error); // toast + redirect
  return Promise.reject(error);
});`,
            },
            {
              type: "p",
              text: "Authorization starts once the session exists. The app loads the user's permissions as a tree of modules and sub-modules, each with its own permission flags. A small transform flattens that tree once: a child module is granted only if its parent is, and inherits its parent's permissions. The result lives in a Zustand store. From then on every route, menu item, button and config-driven field asks the same question through one helper, called in hundreds of places across the app.",
            },
            {
              type: "diagram",
              id: "ems-permissions",
              caption: "Server-defined module tree → flattened once → one lookup everywhere.",
            },
            {
              type: "code",
              file: "permissions.ts",
              caption: "Illustrative pattern — the flatten step and the single access check.",
              code: `const flatten = (tree: ModuleTree, parentGranted = true, inherited: Flags = {}) =>
  Object.entries(tree).reduce<Record<string, Flags>>((acc, [key, mod]) => {
    const granted = parentGranted && mod.assigned;
    if (!granted) return acc; // a revoked parent hides its whole subtree
    const flags = { ...inherited, ...mod.permissions };
    return { ...acc, [key]: flags, ...flatten(mod.modules ?? {}, granted, flags) };
  }, {});

export const hasAccess = (path: string) =>
  get(usePermissionsStore.getState().modules, path, false);

// hasAccess("Records.Edit") — routes, actions and fields all use this`,
            },
            {
              type: "list",
              items: [
                "Admins manage roles and modules on the server, so access changes need no frontend release.",
                "Confidential records add a second check on top of the role.",
                "The UI hides what a user cannot do; the API still rejects it. The frontend is never the security boundary.",
              ],
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
          id: "config-ui",
          title: "Config-driven forms and screens",
          blocks: [
            {
              type: "p",
              text: "The core records are long: dozens of fields across identity, addresses, districts, history and status. The same record appears in many places — a create form, an edit form, a review screen that shows what changed, a side-by-side view for resolving duplicates. Hand-writing each of those would mean the same field rules re-implemented four times and drifting apart.",
            },
            {
              type: "p",
              text: "Instead, each record type is described once as typed configuration: sections with an ordered list of fields, and metadata per field — its type, label, the permission needed to see it, when it should be visible, and whether a change needs a warning. Shared renderers read that definition for every view. The same approach drives search screens, comparison tools and reports, each with its own config.",
            },
            {
              type: "diagram",
              id: "ems-config",
              caption: "One definition, many views. Business rules live with the field, not in each screen.",
            },
            {
              type: "list",
              items: [
                "Sensitive fields carry a permission and disappear for roles without it, in every view at once.",
                "Conditional fields and sections hidden per intake channel are declared, not coded.",
                "Changes to sensitive fields can warn the operator and trigger a notification — set by one flag.",
                "A new field or a reordered section is a config edit, reviewed like code and fully typed.",
              ],
            },
            {
              type: "code",
              file: "record-form.config.ts",
              caption: "Illustrative pattern — field names generalised; mirrors the shape of the real config.",
              code: `const formConfig: FormConfig = {
  sections: {
    identity: { label: "Identity", fields: ["lastName", "firstName", "birthDate", "taxId"] },
    residence: { label: "Residence", prefix: "residence", fields: ["street1", "city", "zip5"] },
    renewal: { label: "Renewal", hideFor: ["external-intake"], fields: ["renewalDate"] },
  },
  fieldsMetadata: {
    taxId: { label: "Tax ID (last 4)", type: "number", permission: Permissions.ViewPII },
    isConfidential: {
      label: "Confidential record",
      type: "boolean",
      options: { warnIfChanged: true, notifyIfChanged: true },
    },
    renewalDate: {
      label: "Renewal date",
      type: "date",
      options: { visibleIf: [{ field: "isActive", value: true }] },
    },
  },
};`,
            },
          ],
        },
        {
          id: "devices",
          title: "Device and printing integrations",
          blocks: [
            {
              type: "p",
              text: "Some workflows end on paper. Letters, documents and labels are printed, often in batches of hundreds, and returned forms are scanned back in. A browser can do neither well on its own: the print dialog can't target a specific printer and tray, and it can't talk to a TWAIN scanner at all. Both go through software installed on the operator's machine, which the web app talks to over the local network.",
            },
            {
              type: "diagram",
              id: "ems-devices",
              caption: "Two local integrations behind one rule: check everything before the user commits, and say exactly what to fix when something is missing.",
            },
            {
              type: "p",
              text: "Printing uses ScriptX.Services, a print service running locally. A single hook wraps every print in the same preflight: confirm the browser allows local-network access (newer Chrome and Edge ask for permission), ping the service and open an install prompt if it is missing, make sure the license is applied, then print. Jobs go silently to a chosen printer, tray, paper size and number of copies, and admins map printers to users and locations so operators don't pick from a raw device list.",
            },
            {
              type: "code",
              file: "use-print.ts",
              caption: "Illustrative pattern — simplified from the real print hook.",
              code: `const printDocument = async (print: () => Promise<Result>, successMessage?: string) => {
  if (!(await checkLocalNetworkAccess()).granted) return promptLocalAccess();
  if (!(await pingPrintService()).success) return promptInstall(); // guided download
  if (!(await getLicense()).data?.guid) await applyLicense();

  const res = await print(); // PDF/HTML → printer, tray, paper size, copies
  res.success ? notify(successMessage ?? "Print success") : onError?.();
};`,
            },
            {
              type: "p",
              text: "Scanning lives in its own package: a versioned, reusable library built on Dynamsoft Web TWAIN. It discovers each scanner's capabilities (sources, resolution, colour mode, feeder and duplex) and turns them into plain settings the UI can show. Batch scans are buffered in IndexedDB, so a long scanning session survives a page reload. Barcodes on generated documents and labels are read from the scanned pages, so pages are filed against the right record automatically; anything unreadable lands in an unindexed list for manual matching.",
            },
            {
              type: "list",
              items: [
                "Print and scan failures are explicit states with a next step, never a silent no-op.",
                "Device setup is a guided prompt in the app, not a support ticket.",
                "The scanning library exposes a provider, hooks and storage utilities, so host apps never touch the TWAIN SDK directly.",
                "Output is converted to the format each workflow needs (PDF, PNG or TIFF; blob or base64) inside the library.",
              ],
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
              title: "Same record, many screens",
              text: "A long record appears in create, edit, review and duplicate-comparison views. Without one definition, every field rule would be rewritten per screen and drift.",
            },
            {
              title: "Devices the browser can't reach",
              text: "Silent printing to a specific tray and TWAIN scanning both need local software, plus permission prompts that newer browsers now require.",
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
              decision: "Refresh tokens just in time, inside the API client",
              why: "One place handles auth for every request, with no refresh timers drifting in background tabs.",
              tradeoff: "The first request after a long idle waits for a refresh, and all traffic must go through the shared client.",
            },
            {
              decision: "Load permissions from the server and flatten them once",
              why: "Admins change access without a frontend release; inheritance is resolved once, so every check is a cheap lookup.",
              tradeoff: "Protected screens wait for permissions to load, and the store must refresh when an admin changes a role.",
            },
            {
              decision: "Describe record screens as typed configuration",
              why: "Create, edit, review and compare views stay consistent, and field-level rules such as permissions and visibility are defined once.",
              tradeoff: "The renderer has to support every edge case through config options. Truly one-off layouts still need an escape hatch.",
            },
            {
              decision: "Drive navigation, tables and filters from a headless CMS",
              why: "Configuration changed far more often than logic. Making it data removed a whole class of frontend releases.",
              tradeoff: "The config schema becomes a contract that needs validation, versioning and defaults — and is harder to test than code.",
            },
            {
              decision: "Give each kind of state one home",
              why: "URL, server, shared client and local state each have different lifetimes. Mixing them is where bugs come from.",
              tradeoff: "More concepts for new engineers, so the conventions need to be written down and reviewed.",
            },
            {
              decision: "Push paging, sorting and filtering to the server",
              why: "Datasets are too large for the client, and the server stays the single source of truth.",
              tradeoff: "Every interaction is a request; caching and placeholder data are needed to keep it feeling instant.",
            },
            {
              decision: "Ship shared UI as a versioned package, not a copied folder",
              why: "Several apps needed the same components; versioned releases let each upgrade on its own schedule.",
              tradeoff: "Release overhead, and apps can drift across versions if upgrades are not kept up.",
            },
            {
              decision: "Print through a local print service, not the browser dialog",
              why: "Operators print batches to specific printers and trays; a dialog per document would make that impossible.",
              tradeoff: "Every workstation needs the service installed and licensed, and browsers now gate local-network access, so the app must detect and guide both.",
            },
            {
              decision: "Package scanning as its own library",
              why: "The TWAIN SDK, capability handling and batch storage are complex and reused; isolating them keeps host apps simple.",
              tradeoff: "Changes need a library release and a version bump in each consumer.",
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
            {
              title: "One definition per record",
              text: "Typed form configuration drives create, edit, review and comparison screens, with permissions and visibility rules declared once.",
            },
            {
              title: "Paper workflows in the browser",
              text: "Silent batch printing to assigned printers, and a reusable scanning library with barcode indexing and guided device setup.",
            },
          ],
        },
        {
          type: "p",
          text: "The biggest lesson: in a system like this, architecture is mostly about where decisions live. Tokens in one interceptor, permissions in one store, field rules in one config, device checks in one hook, state in one home per kind. When each decision has a single place, a small team can move quickly without breaking things it cannot see.",
        },
      ],
    },
  ],
  techGroups: [
    { group: "Core", items: ["React", "TypeScript", "Axios"] },
    { group: "Identity & access", items: ["Keycloak", "JIT token refresh", "Module-based permissions"] },
    { group: "Data & state", items: ["React Query", "Zustand", "TanStack Table", "Virtualisation"] },
    { group: "UI", items: ["Material UI", "Shared component library", "Typed form configuration", "Private package registry"] },
    { group: "Platform", items: ["Headless CMS (Strapi)", "PostgreSQL", "Docker"] },
    { group: "Integrations", items: ["ScriptX.Services", "Dynamsoft Web TWAIN", "ZXing", "IndexedDB"] },
  ],
};
