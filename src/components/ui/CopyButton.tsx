"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

export const CopyButton = ({ value, label }: { value: string; label: string }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard unavailable (insecure context / denied) — the mailto link still works.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="label-mono relative z-10 inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-sm border border-line px-3 text-[0.6875rem] text-muted transition-colors hover:border-fg hover:text-fg"
    >
      {copied ? <Check size={14} strokeWidth={1.75} className="text-accent" /> : <Copy size={14} strokeWidth={1.75} />}
      <span className="sr-only sm:not-sr-only">{copied ? "Copied" : label}</span>
      <span className="sr-only"> email address</span>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </button>
  );
};
