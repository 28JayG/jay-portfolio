import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Terminal } from "@/components/ui/Terminal";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

const NotFound = () => {
  return (
    <section className="container-page grid min-h-[80dvh] content-center gap-10 pt-28 pb-20 lg:grid-cols-12 lg:items-center lg:gap-8">
      <div className="lg:col-span-6">
        <p className="label-mono text-muted">
          <span className="text-accent">{"//"} 404</span> Not found
        </p>
        <h1 className="mt-6 text-display font-bold uppercase">
          This route
          <br />
          doesn&apos;t exist<span className="text-accent">.</span>
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
          The page may have moved, or the link was mistyped. The work is still where it was.
        </p>
        <div className="mt-8">
          <Button href="/#work" variant="secondary" icon={<ArrowLeft size={16} strokeWidth={1.75} />}>
            Back to work
          </Button>
        </div>
      </div>
      <Terminal title="router.log" meta="Status 404" className="lg:col-span-5 lg:col-start-8">
        <p className="text-muted">
          <span className="text-accent">$</span> resolve <span className="text-fg">current-path</span>
        </p>
        <p className="mt-2 text-muted">→ no matching route segment</p>
        <p className="text-muted">→ falling back to not-found boundary</p>
        <p className="mt-2 text-fg">
          suggestion: <span className="text-accent">/#work</span>
        </p>
      </Terminal>
    </section>
  );
};

export default NotFound;
