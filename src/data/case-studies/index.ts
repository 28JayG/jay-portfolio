import type { CaseStudy } from "../types";
import { copilot } from "./copilot";
import { ems } from "./ems";
import { r3 } from "./r3";

const studies: Record<string, CaseStudy> = {
  [ems.slug]: ems,
  [copilot.slug]: copilot,
  [r3.slug]: r3,
};

export const getCaseStudy = (slug: string): CaseStudy | undefined => {
  return studies[slug];
};
