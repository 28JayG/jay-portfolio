import { Fragment } from "react";

/** Highlights each phrase from `phrases` found in `text`, keeping copy in data files. */
export const Emphasize = ({
  text,
  phrases,
  className = "text-fg",
}: {
  text: string;
  phrases: string[];
  className?: string;
}) => {
  if (phrases.length === 0) return <>{text}</>;
  const escaped = phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "g"));
  return (
    <>
      {parts.map((part, i) =>
        phrases.includes(part) ? (
          <span key={i} className={className}>
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
};
