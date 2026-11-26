import { ArrowUpRight, Download } from "lucide-react";
import { CopyButton } from "@/components/ui/CopyButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

type Row = {
  key: string;
  label: string;
  value: string;
  href: string | null;
  external?: boolean;
  download?: boolean;
  copy?: string;
};

const buildRows = (): Row[] => {
  return [
    site.email
      ? { key: "email", label: "Email", value: site.email, href: `mailto:${site.email}`, copy: site.email }
      : { key: "email", label: "Email", value: "Address coming soon", href: null },
    {
      key: "linkedin",
      label: site.socials.linkedin.label,
      value: site.socials.linkedin.handle ?? site.socials.linkedin.href,
      href: site.socials.linkedin.href,
      external: true,
    },
    {
      key: "github",
      label: site.socials.github.label,
      value: site.socials.github.handle ?? site.socials.github.href,
      href: site.socials.github.href,
      external: true,
    },
    site.resumePath
      ? { key: "resume", label: "Resume", value: "Download PDF", href: site.resumePath, download: true }
      : { key: "resume", label: "Resume", value: "Available on request", href: null },
  ];
};

const ContactRow = ({ row }: { row: Row }) => {
  const Icon = row.download ? Download : ArrowUpRight;
  return (
    <li className="group relative grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 border-b border-line py-5 transition-colors sm:grid-cols-[9rem_1fr_auto] sm:py-7">
      <span className="label-mono col-span-2 text-muted sm:col-span-1">{row.label}</span>

      {row.href ? (
        <a
          href={row.href}
          {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...(row.download ? { download: true } : {})}
          className={cn(
            "min-w-0 font-display font-medium text-fg [overflow-wrap:anywhere] transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-accent focus-visible:outline-none sm:text-2xl",
            row.copy ? "text-[1.0625rem]" : "text-xl",
          )}
        >
          {row.value}
          {row.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
        </a>
      ) : (
        <span className="min-w-0 font-display text-xl text-muted sm:text-2xl">{row.value}</span>
      )}

      <span className="flex items-center gap-3">
        {row.copy ? <CopyButton value={row.copy} label="Copy" /> : null}
        {row.href ? (
          <Icon
            aria-hidden
            size={22}
            strokeWidth={1.5}
            className="text-muted transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
          />
        ) : null}
      </span>
    </li>
  );
};

export const Contact = () => {
  const rows = buildRows();

  return (
    <section id="contact" aria-labelledby="contact-heading" className="pt-24 pb-32 sm:pt-32 sm:pb-40">
      <div className="container-page">
        <SectionLabel index="04">Contact</SectionLabel>

        <div className="mt-10 grid gap-12 xl:grid-cols-12 xl:gap-8">
          <div className="xl:col-span-5">
            <h2 id="contact-heading" className="text-display font-bold uppercase">
              Have an interesting problem<span className="text-accent">?</span>
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">
              I&apos;m always interested in connecting with people building thoughtful products and
              solving meaningful engineering problems.
            </p>
          </div>

          <Reveal className="xl:col-span-7">
            <ul className="border-t border-line">
              {rows.map((row) => (
                <ContactRow key={row.key} row={row} />
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
