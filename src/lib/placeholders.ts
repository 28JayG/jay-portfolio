import type { Block, CaseSection, CaseStudy, ExperienceEntry } from "@/data/types";

/**
 * "Content needed" slots are a writing aid, not something visitors should see.
 * They show in `next dev` and are stripped from production builds.
 * Set SHOW_CONTENT_PLACEHOLDERS=true to keep them in a production build (e.g. a review deploy).
 */
export const showPlaceholders =
  process.env.NODE_ENV !== "production" || process.env.SHOW_CONTENT_PLACEHOLDERS === "true";

const isPlaceholder = (block: Block) => block.type === "callout" && block.tone === "placeholder";

const withoutPlaceholders = (blocks: Block[]) => blocks.filter((block) => !isPlaceholder(block));

/**
 * Removes placeholder blocks, then any sub-section or section left with nothing to show,
 * so headings, numbering and the "On this page" index never point at an empty section.
 */
export const prepareCaseStudy = (study: CaseStudy): CaseStudy => {
  if (showPlaceholders) return study;

  const sections = study.sections
    .map((section): CaseSection => {
      const subsections = section.subsections
        ?.map((sub) => ({ ...sub, blocks: withoutPlaceholders(sub.blocks) }))
        .filter((sub) => sub.blocks.length > 0);
      return { ...section, blocks: withoutPlaceholders(section.blocks), subsections };
    })
    .filter((section) => section.blocks.length > 0 || (section.subsections?.length ?? 0) > 0);

  return { ...study, sections };
};

/** Timeline entries flagged as placeholders are dropped from production builds. */
export const visibleExperience = (entries: ExperienceEntry[]) =>
  showPlaceholders ? entries : entries.filter((entry) => !entry.placeholder);
