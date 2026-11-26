import { site } from "@/data/site";
import { ogSize, renderOgCard } from "@/lib/og";

export const alt = `${site.name} — ${site.title}. I build systems, not just interfaces.`;
export const size = ogSize;
export const contentType = "image/png";

const Image = () => {
  return renderOgCard({
    eyebrow: site.title,
    title: "I build systems. Not just interfaces.",
    subtitle: "React · Next.js · TypeScript · Frontend architecture",
    tags: [`${site.yearsExperience} years`, "React", "Next.js", "TypeScript"],
  });
};

export default Image;
