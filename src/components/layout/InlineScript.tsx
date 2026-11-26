/**
 * Runs `html` synchronously while the browser parses the page, before first paint.
 * Typed text/plain on the client so React doesn't warn about rendering <script> tags
 * (pattern from Next's "preventing flash before hydration" guide).
 */
export const InlineScript = ({ html }: { html: string }) => {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
