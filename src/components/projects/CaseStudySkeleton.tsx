/** Loading shell for a case study, mirroring CaseStudyLayout's header so nothing jumps when content arrives. */
const Bar = ({ className }: { className: string }) => (
  <div className={`rounded-sm bg-elevated motion-safe:animate-pulse ${className}`} />
);

export const CaseStudySkeleton = () => {
  return (
    <div className="pt-28 pb-24 sm:pt-32" aria-busy="true" aria-label="Loading case study">
      <div className="container-page">
        <Bar className="h-3 w-24" />
        <Bar className="mt-10 h-3 w-48" />
        <Bar className="mt-6 h-[clamp(2.25rem,1.3rem+4.2vw,5rem)] w-3/4" />
        <Bar className="mt-3 h-[clamp(2.25rem,1.3rem+4.2vw,5rem)] w-1/2" />

        <div className="mt-10 grid gap-10 border-t border-line pt-10 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-3 lg:col-span-7">
            <Bar className="h-4 w-full" />
            <Bar className="h-4 w-11/12" />
            <Bar className="h-4 w-4/5" />
          </div>
          <div className="grid grid-cols-2 gap-px lg:col-span-5">
            {[0, 1, 2, 3].map((i) => (
              <Bar key={i} className="h-20" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
