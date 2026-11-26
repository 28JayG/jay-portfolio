/**
 * Abstract, data-free visuals for project cards. Nothing here depicts real
 * screens or client data — they are schematic illustrations only.
 */

const Node = ({
  label,
  sub,
  accent = false,
}: {
  label: string;
  sub?: string;
  accent?: boolean;
}) => {
  return (
    <div
      className={
        accent
          ? "rounded-sm border border-accent/60 bg-accent/[0.06] px-3 py-2"
          : "rounded-sm border border-line bg-bg px-3 py-2"
      }
    >
      <p className={accent ? "font-mono text-[0.6875rem] text-accent" : "font-mono text-[0.6875rem] text-fg"}>
        {label}
      </p>
      {sub ? <p className="mt-0.5 font-mono text-[0.625rem] text-muted">{sub}</p> : null}
    </div>
  );
};

const Wire = ({ label }: { label?: string }) => {
  return (
    <div aria-hidden className="flex items-center gap-2 py-1 pl-4">
      <span className="h-4 w-px bg-line" />
      {label ? <span className="font-mono text-[0.5625rem] uppercase tracking-wider text-muted">{label}</span> : null}
    </div>
  );
};

/** Layered overview of the EMS frontend, generalised for NDA. */
export const EmsSchematic = () => {
  return (
    <figure className="h-full rounded-md border border-line bg-surface/60 p-4 sm:p-5">
      <figcaption className="label-mono mb-4 flex items-center justify-between text-[0.625rem] text-muted">
        <span>System overview</span>
        <span>Simplified</span>
      </figcaption>

      <div className="grid gap-0">
        <Node label="Identity provider" sub="Keycloak · OIDC" accent />
        <Wire label="claims → permissions" />
        <div className="grid grid-cols-3 gap-2">
          <Node label="Routes" />
          <Node label="Actions" />
          <Node label="Data" />
        </div>
        <Wire label="guarded UI" />
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <Node label="Admin workflows" sub="multi-step" />
          <span aria-hidden className="font-mono text-xs text-muted">↔</span>
          <Node label="Server-state cache" sub="React Query" />
        </div>
        <Wire />
        <div className="grid grid-cols-2 gap-2">
          <Node label="Data tables" sub="server-side ops" />
          <Node label="Print / scan" sub="device integrations" />
        </div>
      </div>
    </figure>
  );
};

/** Work-in-progress "build log" for the Copilot card. */
export const BuildStatus = ({ items }: { items: string[] }) => {
  return (
    <figure className="rounded-md border border-dashed border-line bg-bg p-4 font-mono text-[0.75rem] leading-relaxed">
      <figcaption className="mb-3 text-muted">
        <span className="text-accent">$</span> copilot --scope
      </figcaption>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-muted">
            <span aria-hidden className="text-accent/70">◌</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[0.6875rem] text-muted">
        <span aria-hidden>▍</span>Planned scope — work in progress, not all shipped.
      </p>
    </figure>
  );
};

/** Three products over shared services — the R3 suite at a glance. */
export const SuiteGlyph = () => {
  const apps = [
    { name: "Counselor app", sub: "web · desktop · mobile" },
    { name: "Client app", sub: "assessments · plans" },
    { name: "Rewards", sub: "API + demo" },
  ];
  return (
    <figure className="rounded-md border border-line bg-bg p-4">
      <figcaption className="label-mono mb-3 flex items-center justify-between text-[0.625rem] text-muted">
        <span>Product suite</span>
        <span>3 products · 4 repos</span>
      </figcaption>
      <div className="grid grid-cols-3 gap-2">
        {apps.map((a, i) => (
          <div
            key={a.name}
            className={
              i === 0
                ? "rounded-sm border border-accent/60 bg-accent/[0.06] px-2.5 py-2"
                : "rounded-sm border border-line px-2.5 py-2"
            }
          >
            <p className={i === 0 ? "font-mono text-[0.6875rem] text-accent" : "font-mono text-[0.6875rem] text-fg"}>
              {a.name}
            </p>
            <p className="mt-0.5 font-mono text-[0.5625rem] leading-snug text-muted">{a.sub}</p>
          </div>
        ))}
      </div>
      <p aria-hidden className="py-1.5 text-center font-mono text-xs text-muted">↓</p>
      <div className="grid grid-cols-3 gap-2 font-mono text-[0.5625rem] text-muted">
        <span className="rounded-sm border border-dashed border-line px-2 py-1.5 text-center">AI providers</span>
        <span className="rounded-sm border border-dashed border-line px-2 py-1.5 text-center">MySQL</span>
        <span className="rounded-sm border border-dashed border-line px-2 py-1.5 text-center">SMS</span>
      </div>
    </figure>
  );
};
