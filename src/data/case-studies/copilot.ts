import type { CaseStudy } from "../types";

/**
 * AI Timesheet Copilot — work in progress.
 * Only the brief's scope is stated as fact; everything not yet built is
 * labelled planned, and unknowns are explicit placeholders.
 */
export const copilot: CaseStudy = {
  slug: "ai-timesheet-copilot",
  lede:
    "A productivity tool that tracks time against projects and uses AI to turn that activity into structured timesheet entries — so reporting time stops being a weekly chore. It is a solo side project under active development; this page describes the direction, not a finished product.",
  facts: [
    { label: "Status", value: "In development" },
    { label: "Type", value: "Solo side project" },
    { label: "Frontend", value: "Vue.js" },
    { label: "Backend", value: "Python · FastAPI" },
  ],
  sections: [
    {
      id: "overview",
      title: "Project introduction",
      blocks: [
        {
          type: "p",
          text: "Most timesheets are reconstructed from memory at the end of the week. The Copilot's idea is to capture time as work happens, then let an AI model draft the structured entries a timesheet actually needs.",
        },
        {
          type: "callout",
          tone: "note",
          title: "Work in progress",
          text: "Features below are described as scope. Integrations with office productivity tools are planned and not implemented yet.",
        },
      ],
    },
    {
      id: "context",
      title: "Business context",
      blocks: [
        {
          type: "p",
          text: "Time reporting matters for billing, planning and capacity, but it is low-value work for the people doing it. Manual entry is slow, inconsistent and often inaccurate — which defeats the reason for collecting it.",
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
            { title: "Memory is unreliable", text: "Reconstructing a week after the fact loses detail and accuracy." },
            { title: "Format is rigid", text: "Timesheets need structured fields; real work is messy and unstructured." },
            { title: "Context switching", text: "Logging time interrupts the work it is supposed to describe." },
            { title: "Tools are separate", text: "Time lives in one place, the reporting workflow in another." },
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
          text: "A Vue.js frontend for tracking and review, and a Python FastAPI service that owns the AI integration and produces structured output. Python keeps the AI side close to its ecosystem; the frontend stays a focused review-and-correct interface.",
        },
        {
          type: "diagram",
          id: "copilot-flow",
          caption: "Intended pipeline. Dashed stages are planned and not built.",
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
              title: "Structured output from a model",
              text: "AI drafts must land in a predictable schema the timesheet can accept — and fail visibly when they don't.",
            },
            {
              title: "Human in the loop",
              text: "Generated entries are suggestions. The UI has to make reviewing and correcting them faster than writing them.",
            },
            {
              title: "Trust",
              text: "People need to see why an entry was suggested before they will submit it.",
            },
          ],
        },
        {
          type: "callout",
          tone: "placeholder",
          text: "[Add: the hardest problem you have actually hit so far.]",
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
              decision: "Separate Python service for AI work",
              why: "Keeps model integration in the Python ecosystem and behind one API the frontend can rely on.",
              tradeoff: "Two languages and two deployables to maintain for a small project.",
            },
            {
              decision: "Structured output as the contract",
              why: "A defined entry schema makes AI output testable and the review UI simple.",
              tradeoff: "Less flexible than free text; the schema has to evolve with real usage.",
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
          type: "callout",
          tone: "placeholder",
          text: "[Add: what is built today versus planned — e.g. tracking works, AI drafting prototyped, integrations not started.]",
        },
      ],
    },
    {
      id: "outcome",
      title: "Outcome and learnings",
      blocks: [
        {
          type: "p",
          text: "No outcome yet — the project is still being built. This section will be updated as the pieces ship.",
        },
      ],
    },
  ],
  techGroups: [
    { group: "Frontend", items: ["Vue.js"] },
    { group: "Backend", items: ["Python", "FastAPI"] },
    { group: "AI", items: ["AI integrations"] },
  ],
};
