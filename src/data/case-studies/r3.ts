import type { CaseStudy } from "../types";

/**
 * R3 Recovery Platform. Facts from the R3 KT handover doc and career-ops/cv.md.
 * Generalised for client confidentiality: no brand, domains, people, data,
 * screens or internal security details. Code samples are illustrative.
 */
export const r3: CaseStudy = {
  slug: "r3-recovery-platform",
  lede:
    "A suite of three connected products for addiction-recovery care: a counselor app that turns sessions into AI-assisted clinical notes, a client app that keeps people engaged between sessions, and a rewards API that organisations integrate so their clinics can award points for recovery milestones. I was the only developer on our side for about eighteen months.",
  facts: [
    { label: "Period", value: "Mar 2025 — Sep 2026" },
    { label: "My role", value: "Sole developer (our side)" },
    { label: "Scope", value: "3 products" },
    { label: "Surfaces", value: "Web · desktop · mobile" },
  ],
  sections: [
    {
      id: "overview",
      title: "Project introduction",
      blocks: [
        {
          type: "p",
          text: "R3 is not one app. The counselor app is the centre of the suite and the only product that talks to the others; the client app stands on its own apart from SMS; the rewards platform is a backend only: a versioned set of endpoints any organisation can integrate to run a rewards programme for its clinics, with the counselor app as one such integration.",
        },
        {
          type: "diagram",
          id: "r3-landscape",
          caption: "The suite: what people use on top, what each product depends on below.",
        },
        {
          type: "callout",
          tone: "nda",
          title: "Client confidentiality",
          text: "Brand names, domains, people, data and screens are omitted. Architecture is described at the level of products and patterns.",
        },
      ],
    },
    {
      id: "context",
      title: "Business context",
      blocks: [
        {
          type: "p",
          text: "Recovery care has three audiences with very different needs. Counselors lose hours to documentation. Clients need structure and encouragement between sessions. Clinics want to reward progress in a way that is fair and auditable.",
        },
        {
          type: "list",
          items: [
            "Clinical data is sensitive — AI providers and data handling had to meet healthcare compliance expectations.",
            "Counselors work on desktops in sessions, so system audio capture mattered, not just a browser tab.",
            "Clients are reached on their phones: verification, consent and reminders run over SMS.",
            "Rewards behave like a currency, so every point needs a history, not just a balance.",
          ],
        },
      ],
    },
    {
      id: "problem",
      title: "The problem",
      blocks: [
        {
          type: "cards",
          items: [
            {
              title: "Documentation burden",
              text: "Turn a counseling session into structured notes (SOAP / DAP) without the counselor writing them from scratch.",
            },
            {
              title: "One product, three surfaces",
              text: "Web, desktop and mobile from a single codebase — without maintaining a second app.",
            },
            {
              title: "Engagement between sessions",
              text: "Self-assessments, treatment plans, homework and reminders that actually reach the client.",
            },
            {
              title: "Rewarding progress safely",
              text: "Points that clinics award and clients redeem, with clear authorisation and a full audit trail.",
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
            "Only developer on our side across all three products, working with the client's developer and our project manager.",
            "Initial setup and code review for the repos; estimation and scoping for the client app.",
            "Architected the Next.js App Router frontends and designed the rewards platform's API contracts (OpenAPI 3.0).",
            "Built auth, role-based access, assessments, AI note flows and SEO in the counselor app.",
            "Grew the desktop app from a transcription-only MVP into a shell for the whole product, with Windows and Mac builds.",
            "Built sign-up with phone verification, SMS reminders, treatment plans and the dashboard in the client app.",
            "Implemented accessibility and internationalisation in production features.",
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
          text: "Each product owns its data in MySQL. The counselor app integrates with the rewards platform through a server-side proxy rather than calling it from the browser, and routes every AI call through a single provider layer.",
        },
      ],
      subsections: [
        {
          id: "counselor-app",
          title: "Counselor app — clinical documentation",
          blocks: [
            {
              type: "p",
              text: "A Next.js 16 App Router application for transcription, AI-generated clinical notes, assessments and a recovery index. Authentication uses a signed session cookie checked in middleware, with protection at both route and component level, automatic logout when the session ends and a redirect back to where the user was.",
            },
            {
              type: "list",
              items: [
                "Default-deny routing: anything not on an explicit public-route allowlist requires a session.",
                "Role-based user management driven by an entitlements map, plus protected API endpoints.",
                "A form-generation engine (categories, sub-categories, scoring) behind self-assessments, counselor questionnaires and assessments.",
                "Every server-side model call goes through one AI layer with a usage label — which made moving to compliance-ready providers a configuration change, not a rewrite.",
              ],
            },
            {
              type: "code",
              file: "llm.ts",
              caption: "Illustrative pattern — one gateway for every model call, simplified.",
              code: `type Usage = "soap-note" | "dap-note" | "assessment-feedback";

export const generate = async ({ usage, messages }: { usage: Usage; messages: Message[] }) => {
  const provider = providerFor(usage);      // swap providers in one place
  const result = await provider.complete(messages);
  await recordUsage(usage, result.tokens);  // cost and audit per feature
  return result.text;
};`,
            },
          ],
        },
        {
          id: "desktop",
          title: "Desktop and mobile from one codebase",
          blocks: [
            {
              type: "p",
              text: "The desktop app started as a transcription-only MVP. It became an Electron shell that loads the live web app, with exactly one native bridge: capturing system audio during sessions. Mobile ships through Capacitor. So almost every “desktop change” is really a web change, and an installer is rebuilt only when the shell itself changes.",
            },
            {
              type: "list",
              items: [
                "Installers built with Electron Forge for Windows and Mac (signed on Mac).",
                "A manually triggered GitHub Actions release workflow, so publishing a new download is always a deliberate act.",
                "The shell only accepts an HTTPS app URL outside local development.",
              ],
            },
          ],
        },
        {
          id: "client-app",
          title: "Client app — engagement between sessions",
          blocks: [
            {
              type: "p",
              text: "A Next.js app clients use for self-assessments, AI-generated treatment plans, homework and finding a treatment facility on a map. Routes are split into authenticated and dashboard groups, with a small set of explicitly public endpoints.",
            },
            {
              type: "list",
              items: [
                "Phone number on sign-up and login, verified with a one-time code over Twilio, plus an explicit SMS opt-in.",
                "A scheduled daily job that texts clients to finish their report.",
                "A dashboard of charts and tiles, past assessments and a mobile facility map styled to the theme.",
              ],
            },
          ],
        },
        {
          id: "rewards",
          title: "Rewards platform — points as a ledger",
          blocks: [
            {
              type: "p",
              text: "A B2B2C rewards backend with no UI of its own: a versioned set of endpoints that an organisation integrates into its own tools to run a rewards programme for its clinics. Clinics award points to clients for completed recovery tasks, and clients redeem them with a PIN. It is a NestJS API on MySQL with Drizzle ORM, documented with an OpenAPI spec so integrators build against the contract, not the implementation.",
            },
            {
              type: "diagram",
              id: "r3-ledger",
              caption: "The user journey in four phases. Earning and redeeming are ledger entries, never edits to a balance.",
            },
            {
              type: "list",
              items: [
                "Clinic-side calls authenticate with an organisation API key; redemption is authorised by the client's own PIN.",
                "PIN setup happens through a one-time link rather than a password sent around.",
                "The counselor app reaches the API through a server-side proxy, so keys never reach the browser.",
              ],
            },
            {
              type: "code",
              file: "points.service.ts",
              caption: "Illustrative pattern — balance derived from the ledger.",
              code: `async redeem(clientId: string, points: number) {
  return this.db.transaction(async (tx) => {
    const balance = await this.balanceOf(clientId, tx); // SUM(credits) - SUM(debits)
    if (balance < points) throw new InsufficientPointsError();
    await tx.insert(transaction).values({ clientId, type: "debit", points });
  });
}`,
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
              title: "A desktop app without a second codebase",
              text: "Getting system audio into a web app meant a native bridge — kept to a single capability so the web stays the product.",
            },
            {
              title: "AI under compliance constraints",
              text: "Provider requirements changed mid-project. A single AI layer made the switch tractable instead of a hunt through the codebase.",
            },
            {
              title: "Public routes in an auth-first app",
              text: "Opt-in pages, verification and scheduled jobs must be reachable without a session — without weakening everything else.",
            },
            {
              title: "Sole developer, many stakeholders",
              text: "Owning delivery across three products meant written requirements, explicit scope and timelines I set and kept.",
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
              decision: "Wrap the live web app in Electron, with one native bridge",
              why: "One codebase for web and desktop; desktop users get web releases immediately.",
              tradeoff: "The desktop app depends on the site being reachable, and shell changes still need a new installer.",
            },
            {
              decision: "Route every model call through one AI layer",
              why: "Provider changes, cost tracking and compliance live in one place.",
              tradeoff: "An extra abstraction every feature must use — including when calling a provider directly would be quicker.",
            },
            {
              decision: "Model points as a ledger of credits and debits",
              why: "Every balance is explainable and auditable; nothing is ever silently overwritten.",
              tradeoff: "Balances are computed rather than read, and redemption needs a transaction to stay consistent.",
            },
            {
              decision: "Default-deny middleware with a public-route allowlist",
              why: "Forgetting to protect a route is the failure mode that matters most with clinical data.",
              tradeoff: "Every new public route must be registered, or it silently redirects to login.",
            },
            {
              decision: "Rewards as a separate, versioned API",
              why: "Any organisation can plug rewards into its own tools, and a contract-first API keeps it independent of any single frontend.",
              tradeoff: "Another service to deploy and secure, with key management between services.",
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
          type: "p",
          text: "Working as the only developer on our side, process was part of the architecture. Every feature followed the same path:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Write a requirements doc: what is needed, what is out of scope, and open questions.",
            "Review it internally, then agree it with the client.",
            "Write a technical design with timelines, and own those dates.",
            "Build on short-lived branches from the development branch; every change through a pull request.",
            "Raise risks early so timelines could be managed with the client, not explained afterwards.",
          ],
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
              title: "Search visibility",
              text: "SEO audit and implementation — metadata, canonical tags, semantic HTML, sitemap and a structured-data blog — raised the product's ranking from 9th to 2nd.",
            },
            {
              title: "Desktop, grown up",
              text: "From a transcription-only MVP to the full product on Windows and Mac, with a repeatable build pipeline.",
            },
            {
              title: "Rewards API, contract-first",
              text: "A versioned set of endpoints with an OpenAPI spec that organisations integrate into their own tools; the counselor app is one integration.",
            },
            {
              title: "A clean handover",
              text: "A written knowledge-transfer guide covering every product, how to run it, its gotchas and open items.",
            },
          ],
        },
        {
          type: "p",
          text: "The lesson I keep from R3: when you are the only engineer, the most valuable architecture is the kind that limits where things can go wrong — one AI layer, one auth gate, one ledger, one codebase for every surface.",
        },
      ],
    },
  ],
  techGroups: [
    { group: "Frontend", items: ["Next.js (App Router)", "React", "TypeScript", "Chart.js", "Leaflet"] },
    { group: "Backend", items: ["NestJS", "Drizzle ORM", "MySQL", "OpenAPI 3.0", "Next.js route handlers"] },
    { group: "Platforms", items: ["Electron", "Electron Forge", "Capacitor"] },
    { group: "Integrations", items: ["AI providers (via one layer)", "Twilio SMS / OTP", "Scheduled jobs"] },
    { group: "Delivery", items: ["GitHub Actions", "Docker", "PM2", "Vercel"] },
    { group: "Quality", items: ["Accessibility", "Internationalisation", "SEO"] },
  ],
};
