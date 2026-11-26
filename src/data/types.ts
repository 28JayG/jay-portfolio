export type ExternalLink = {
  label: string;
  href: string;
  handle?: string;
};

export type SiteConfig = {
  name: string;
  monogram: string;
  title: string;
  url: string;
  location: string;
  yearsExperience: string;
  positioning: string;
  statement: string;
  /** Set `open: false` to hide the availability indicator entirely. */
  availability: { open: boolean; label: string };
  /** Leave as `null` until a real address is supplied — no mailto is rendered. */
  email: string | null;
  /** Public path under /public (e.g. "/resume/jay-gandhi.pdf"). `null` disables download. */
  resumePath: string | null;
  socials: { linkedin: ExternalLink; github: ExternalLink };
};

export type ProjectStatus = "active" | "in-development";

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  status: ProjectStatus;
  /** Visible note about confidentiality / what has been generalised. */
  confidentiality?: string;
  summary: string;
  tech: string[];
  highlights: string[];
  cta: string;
  featured?: boolean;
};

export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  summary?: string;
  /** Renders the entry as a clearly marked placeholder until real data is supplied. */
  placeholder?: boolean;
};

export type Capability = {
  id: string;
  title: string;
  explanation: string;
  tech: string[];
  problem: string;
  approach: string[];
  /** Optional illustrative snippet — generic pattern code, not lifted from client work. */
  snippet?: { file: string; code: string };
};

/* ------------------------------------------------------------------
   Case studies
   ------------------------------------------------------------------ */

export type DiagramId =
  | "ems-system"
  | "ems-auth"
  | "ems-state"
  | "ems-table"
  | "ems-components"
  | "ems-devices"
  | "copilot-flow"
  | "r3-landscape"
  | "r3-ledger";

export type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  /** `placeholder` renders a dashed "content needed" slot; `nda` explains what was generalised. */
  | { type: "callout"; tone: "note" | "nda" | "placeholder"; title?: string; text: string }
  | { type: "code"; file: string; code: string; caption?: string }
  | { type: "diagram"; id: DiagramId; caption: string }
  | { type: "cards"; items: { title: string; text: string }[] }
  | {
      type: "decisions";
      items: { decision: string; why: string; tradeoff: string }[];
    };

export type CaseSection = {
  id: string;
  title: string;
  blocks: Block[];
  subsections?: { id: string; title: string; blocks: Block[] }[];
};

export type CaseStudy = {
  slug: string;
  lede: string;
  facts: { label: string; value: string }[];
  sections: CaseSection[];
  techGroups: { group: string; items: string[] }[];
};
