import type { MetadataRoute } from "next";
import { site } from "@/data/site";

const manifest = (): MetadataRoute.Manifest => {
  return {
    name: `${site.name} — ${site.title}`,
    short_name: site.name,
    description: site.positioning,
    start_url: "/",
    display: "browser",
    background_color: "#101114",
    theme_color: "#101114",
    icons: [{ src: "/apple-icon", sizes: "180x180", type: "image/png" }],
  };
};

export default manifest;
