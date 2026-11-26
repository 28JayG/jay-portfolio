import { cacheLife } from "next/cache";
import { site } from "@/data/site";

/** Cached so the static shell can include it; refreshed at most daily. */
const CopyrightYear = async () => {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
};

export const Footer = () => {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-3 pt-8 pb-20 font-mono sm:pb-8 sm:!pr-24 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © <CopyrightYear /> {site.name} <span className="text-line">/</span> {site.title}
        </p>
        <p>Built with Next.js · TypeScript · Tailwind CSS</p>
      </div>
    </footer>
  );
};
