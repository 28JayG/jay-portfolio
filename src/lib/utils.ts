import { clsx, type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]): string => {
  return clsx(inputs);
};

/** Zero-pads an index for editorial numbering: 1 -> "01". */
export const pad = (n: number, width = 2): string => {
  return String(n).padStart(width, "0");
};

export const isExternal = (href: string): boolean => {
  return /^https?:\/\//.test(href) || href.startsWith("mailto:");
};
