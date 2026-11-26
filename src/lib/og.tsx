import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/data/site";

/*
 * Shared Open Graph card renderer. Fonts are read once at module scope from
 * @fontsource (Satori needs woff/ttf, not the woff2 that next/font serves).
 */

const fontDir = (pkg: string) => join(process.cwd(), "node_modules", "@fontsource", pkg, "files");

const fonts = Promise.all([
  readFile(join(fontDir("space-grotesk"), "space-grotesk-latin-700-normal.woff")),
  readFile(join(fontDir("space-grotesk"), "space-grotesk-latin-500-normal.woff")),
  readFile(join(fontDir("jetbrains-mono"), "jetbrains-mono-latin-400-normal.woff")),
]);

export const ogSize = { width: 1200, height: 630 };

const c = {
  bg: "#101114",
  surface: "#191A1F",
  line: "#35363B",
  fg: "#F3F1EA",
  muted: "#A1A1AA",
  accent: "#A3E635",
};

export const renderOgCard = async ({
  eyebrow,
  title,
  subtitle,
  tags = [],
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  tags?: string[];
}) => {
  const [bold, medium, mono] = await fonts;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: c.bg,
          backgroundImage: `linear-gradient(to right, ${c.line}55 1px, transparent 1px), linear-gradient(to bottom, ${c.line}55 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          color: c.fg,
          fontFamily: "Space Grotesk",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700 }}>
            JG<span style={{ color: c.accent }}>.</span>
          </div>
          <div style={{ display: "flex", fontFamily: "JetBrains Mono", fontSize: 20, color: c.muted, letterSpacing: 2 }}>
            <span style={{ color: c.accent }}>{"//"}&nbsp;</span>
            {eyebrow.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 24 ? 76 : 96,
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: -3,
              textTransform: "uppercase",
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 500, color: c.muted, maxWidth: 980, lineHeight: 1.3 }}>
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${c.line}`,
            paddingTop: 24,
            fontFamily: "JetBrains Mono",
            fontSize: 20,
            color: c.muted,
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {tags.slice(0, 4).map((t) => (
              <div
                key={t}
                style={{ display: "flex", border: `1px solid ${c.line}`, padding: "6px 12px", background: c.surface }}
              >
                {t}
              </div>
            ))}
          </div>
          <div style={{ display: "flex" }}>
            {site.name}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Space Grotesk", data: bold, weight: 700, style: "normal" },
        { name: "Space Grotesk", data: medium, weight: 500, style: "normal" },
        { name: "JetBrains Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
};

/** "JG." monogram tile for favicons and the Apple touch icon. */
export const renderMonogram = async (px: number) => {
  const [bold] = await fonts;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: c.bg,
          color: c.fg,
          fontFamily: "Space Grotesk",
          fontWeight: 700,
          fontSize: Math.round(px * 0.5),
          letterSpacing: -Math.max(1, px * 0.02),
        }}
      >
        JG<span style={{ color: c.accent }}>.</span>
      </div>
    ),
    {
      width: px,
      height: px,
      fonts: [{ name: "Space Grotesk", data: bold, weight: 700, style: "normal" }],
    },
  );
};
