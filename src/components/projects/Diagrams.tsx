import type { ReactNode } from "react";
import type { DiagramId } from "@/data/types";
import { cn } from "@/lib/utils";

/*
 * Architecture diagrams built from HTML boxes (not images) so they stay sharp,
 * reflow on small screens and remain readable by assistive tech.
 * Every diagram is a generalised view — no client names, screens or data.
 */

type Tone = "default" | "accent" | "muted" | "dashed";

const Box = ({
  title,
  sub,
  tone = "default",
  className,
  children,
}: {
  title: string;
  sub?: string;
  tone?: Tone;
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-sm border px-3 py-2.5",
        tone === "accent" && "border-accent/60 bg-accent/[0.06]",
        tone === "default" && "border-line bg-bg",
        tone === "muted" && "border-line bg-elevated",
        tone === "dashed" && "border-dashed border-line bg-transparent",
        className,
      )}
    >
      <p className={cn("font-mono text-xs", tone === "accent" ? "text-accent" : "text-fg")}>{title}</p>
      {sub ? <p className="mt-1 font-mono text-[0.6875rem] leading-snug text-muted">{sub}</p> : null}
      {children}
    </div>
  );
};

const Down = ({ label }: { label?: string }) => {
  return (
    <div aria-hidden className="flex items-center gap-2 py-1.5 pl-5">
      <span className="font-mono text-xs text-muted">↓</span>
      {label ? <span className="font-mono text-[0.625rem] uppercase tracking-wider text-muted">{label}</span> : null}
    </div>
  );
};

const Frame = ({ label, children, className }: { label: string; children: ReactNode; className?: string }) => {
  return (
    <div className={cn("rounded-sm border border-line p-3 pt-2", className)}>
      <p className="label-mono mb-2 text-[0.625rem] text-muted">{label}</p>
      {children}
    </div>
  );
};

/** Horizontal pipeline on wide screens, vertical stack on small ones. */
const Pipeline = ({ steps }: { steps: { title: string; sub?: string; tone?: Tone }[] }) => {
  return (
    <ol className="grid gap-2 xl:auto-cols-fr xl:grid-flow-col">
      {steps.map((s, i) => (
        <li key={s.title} className="relative flex xl:block">
          <Box title={s.title} sub={s.sub} tone={s.tone} className="h-full w-full">
            <span className="mt-2 block font-mono text-[0.625rem] text-accent">{String(i + 1).padStart(2, "0")}</span>
          </Box>
          {i < steps.length - 1 ? (
            <span
              aria-hidden
              className="absolute top-1/2 -right-2 z-10 hidden -translate-y-1/2 font-mono text-xs text-muted xl:block"
            >
              →
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
};

const EmsSystem = () => {
  return (
    <div className="grid gap-0">
      <Box title="Identity provider" sub="Keycloak · users, roles, sessions" tone="accent" />
      <Down label="session tokens · permissions API" />
      <Frame label="Frontend applications">
        <div className="grid gap-2 md:grid-cols-3">
          <Box title="Feature modules" sub="admin workflows · records · results" />
          <Box title="State layer" sub="URL · React Query · Zustand" />
          <Box title="Shared UI library" sub="versioned, private registry" tone="muted" />
        </div>
      </Frame>
      <Down label="config · data · jobs" />
      <div className="grid gap-2 md:grid-cols-3">
        <Box title="Headless CMS" sub="navigation, table & filter config" />
        <Box title="Backend APIs" sub="PostgreSQL-backed services" />
        <Box title="Print / scan devices" sub="hardware integrations" tone="dashed" />
      </div>
    </div>
  );
};

const EmsAuth = () => {
  return (
    <div className="grid gap-3">
      <Pipeline
        steps={[
          { title: "Feature code", sub: "api.get(...) — no auth logic" },
          { title: "Request interceptor", sub: "refresh if expiring · Bearer token · tenant context", tone: "accent" },
          { title: "Backend API", sub: "validates token and context", tone: "muted" },
          { title: "Response interceptor", sub: "401 → logout · 403 → notify + redirect", tone: "accent" },
          { title: "Feature code", sub: "gets data or a handled error" },
        ]}
      />
      <Box title="Keycloak session" sub="login · token refresh on demand · logout — no background timers" tone="dashed" />
    </div>
  );
};

const EmsPermissions = () => {
  return (
    <Pipeline
      steps={[
        { title: "Permissions API", sub: "role → modules → sub-modules", tone: "muted" },
        { title: "Flatten once", sub: "child granted only if parent is · flags inherited", tone: "accent" },
        { title: "Zustand store", sub: "one flat lookup table" },
        { title: "hasAccess(path)", sub: "routes · menus · buttons · config fields", tone: "accent" },
      ]}
    />
  );
};

const EmsState = () => {
  const cols = [
    { title: "URL state", sub: "filters · page · sort · selected record", note: "shareable, survives refresh" },
    { title: "Server state", sub: "React Query", note: "cached, keyed by URL state", accent: true },
    { title: "Client state", sub: "Zustand", note: "derived data, cross-screen UI" },
    { title: "Local state", sub: "useState / forms", note: "inputs, toggles, drafts" },
  ];
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {cols.map((c) => (
        <Box key={c.title} title={c.title} sub={c.sub} tone={c.accent ? "accent" : "default"}>
          <p className="mt-3 border-t border-line pt-2 text-xs text-muted">{c.note}</p>
        </Box>
      ))}
    </div>
  );
};

const EmsTable = () => {
  return (
    <div className="grid gap-3">
      <Pipeline
        steps={[
          { title: "URL params", sub: "page, sort, filters" },
          { title: "Query key", sub: "['records', params]" },
          { title: "API request", sub: "server paginates, sorts, filters", tone: "muted" },
          { title: "Table (manual mode)", sub: "TanStack Table renders the page", tone: "accent" },
          { title: "Virtualised rows", sub: "only visible rows mount" },
        ]}
      />
      <Box title="Column & filter config" sub="defined as data — from the CMS where supported" tone="dashed" />
    </div>
  );
};

const EmsComponents = () => {
  return (
    <div className="grid gap-0">
      <Box title="Shared UI library" sub="primitives · tables · forms · layout — built on Material UI" tone="accent" />
      <Down label="versioned releases · private package registry" />
      <div className="grid gap-2 md:grid-cols-3">
        <Box title="Admin application" sub="workflows & records" />
        <Box title="Candidate-facing portal" sub="paginated, public-facing" />
        <Box title="Results views" sub="data-dense dashboards" />
      </div>
      <Down label="configured at runtime by" />
      <Box title="Headless CMS" sub="navigation, tables and filters change without a frontend release" tone="muted" />
    </div>
  );
};

const EmsConfig = () => {
  return (
    <div className="grid gap-0">
      <div className="grid gap-2 md:grid-cols-2">
        <Box title="Sections" sub="ordered fields · path prefix · hidden per intake channel" tone="accent" />
        <Box title="Field metadata" sub="type · label · permission · visibleIf · warnIfChanged" tone="accent" />
      </div>
      <Down label="one typed definition, read by" />
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <Box title="Add / edit form" sub="inputs by field type" />
        <Box title="Review screen" sub="before → after diff" />
        <Box title="Duplicate compare" sub="side-by-side rows" />
        <Box title="Search & reports" sub="their own configs" tone="muted" />
      </div>
      <Down label="enforced in every view" />
      <Box title="Rules travel with the field" sub="PII hidden without permission · conditional fields · warnings on sensitive changes" tone="dashed" />
    </div>
  );
};

const EmsDevices = () => {
  return (
    <div className="grid gap-4">
      <Frame label="Print">
        <Pipeline
          steps={[
            { title: "Print action", sub: "single or batch" },
            { title: "Preflight", sub: "local access · service ping · license", tone: "accent" },
            { title: "Local print service", sub: "ScriptX.Services", tone: "muted" },
            { title: "Printer", sub: "assigned printer · tray · paper · copies" },
          ]}
        />
      </Frame>
      <Frame label="Scan">
        <Pipeline
          steps={[
            { title: "Scanner", sub: "TWAIN · feeder · duplex", tone: "muted" },
            { title: "Scanning library", sub: "Dynamsoft Web TWAIN · capabilities", tone: "accent" },
            { title: "Batch buffer", sub: "IndexedDB · survives reload" },
            { title: "Barcode indexing", sub: "matched → record · rest → unindexed", tone: "accent" },
          ]}
        />
      </Frame>
    </div>
  );
};

const CopilotFlow = () => {
  return (
    <div className="grid gap-3">
      <Pipeline
        steps={[
          { title: "Track time", sub: "against tasks & projects" },
          { title: "Activity log", sub: "raw, unstructured entries" },
          { title: "AI drafting", sub: "FastAPI service + model", tone: "accent" },
          { title: "Structured entries", sub: "timesheet-shaped output" },
          { title: "Office workflows", sub: "integration — planned", tone: "dashed" },
        ]}
      />
      <p className="font-mono text-[0.6875rem] text-muted">
        Dashed = planned, not built. The whole pipeline is under active development.
      </p>
    </div>
  );
};

const R3Landscape = () => {
  return (
    <div className="grid gap-0">
      <div className="grid gap-2 md:grid-cols-3">
        <Box title="Counselor app" sub="Next.js 16 · web, Electron desktop, Capacitor mobile" tone="accent" />
        <Box title="Client app" sub="Next.js 15 · assessments, plans, homework, map" />
        <Box title="Rewards demo" sub="React 19 · Vite · Zustand" />
      </div>
      <Down label="depends on" />
      <div className="grid gap-2 md:grid-cols-3">
        <Frame label="Counselor app uses">
          <div className="grid gap-2">
            <Box title="AI provider layer" sub="one gateway for every model call" tone="muted" />
            <Box title="MySQL" sub="clinical data" />
            <Box title="Rewards API proxy" sub="award / redeem screens + reports" tone="dashed" />
          </div>
        </Frame>
        <Frame label="Client app uses">
          <div className="grid gap-2">
            <Box title="MySQL" sub="client records" />
            <Box title="Twilio" sub="OTP + scheduled SMS reminders" tone="muted" />
          </div>
        </Frame>
        <Frame label="Rewards platform">
          <div className="grid gap-2">
            <Box title="NestJS 11 API" sub="versioned /v1, OpenAPI spec" tone="muted" />
            <Box title="MySQL + Drizzle" sub="ledger of point transactions" />
          </div>
        </Frame>
      </div>
    </div>
  );
};

const R3Ledger = () => {
  return (
    <Pipeline
      steps={[
        { title: "Clinic onboarding", sub: "organisation + API key" },
        { title: "Client enrolment", sub: "client sets a PIN via a one-time link" },
        { title: "Earn", sub: "task completed → ledger credit", tone: "accent" },
        { title: "Redeem", sub: "PIN-authorised → ledger debit", tone: "muted" },
      ]}
    />
  );
};

const registry: Record<DiagramId, () => ReactNode> = {
  "ems-system": EmsSystem,
  "ems-auth": EmsAuth,
  "ems-permissions": EmsPermissions,
  "ems-state": EmsState,
  "ems-table": EmsTable,
  "ems-components": EmsComponents,
  "ems-devices": EmsDevices,
  "ems-config": EmsConfig,
  "copilot-flow": CopilotFlow,
  "r3-landscape": R3Landscape,
  "r3-ledger": R3Ledger,
};

export const Diagram = ({ id, caption }: { id: DiagramId; caption: string }) => {
  const Render = registry[id];
  return (
    <figure className="rounded-md border border-line bg-surface p-4 sm:p-6">
      <div className="label-mono mb-4 flex items-center justify-between gap-4 text-[0.625rem] text-muted">
        <span>
          <span className="text-accent">fig.</span> {id}
        </span>
        <span>Generalised</span>
      </div>
      <Render />
      <figcaption className="mt-4 border-t border-line pt-3 text-sm text-muted">{caption}</figcaption>
    </figure>
  );
};
