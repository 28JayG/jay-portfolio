import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { BackToTop } from "@/components/layout/BackToTop";
import { InlineScript } from "@/components/layout/InlineScript";
import { IntroSplash } from "@/components/layout/IntroSplash";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { Navbar } from "@/components/layout/Navbar";
import { site } from "@/data/site";
import { INTRO_SCRIPT } from "@/lib/intro";
import "./globals.css";

// Fonts are self-hosted variable fonts (latin subset, OFL — see src/fonts/LICENSE-*),
// so dev and build never depend on reaching Google Fonts.
const spaceGrotesk = localFont({
  src: "../fonts/space-grotesk-latin-wght-normal.woff2",
  variable: "--font-space-grotesk",
  weight: "300 700",
  display: "swap",
});

const inter = localFont({
  src: "../fonts/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

// Mono is only used for small labels, so it isn't preloaded: that keeps
// bandwidth for the display and body fonts that affect LCP.
const jetbrainsMono = localFont({
  src: "../fonts/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-jetbrains-mono",
  weight: "100 800",
  display: "swap",
  preload: false,
});

const description = `${site.name} is a ${site.title.toLowerCase()} who leans frontend — React, Next.js and TypeScript — and owns features from the problem to production. ${site.positioning}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.title}`,
    template: `%s — ${site.name}`,
  },
  description,
  authors: [{ name: site.name, url: site.socials.github.href }],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.title}`,
    description,
    url: "/",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.title}`,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#101114",
  colorScheme: "dark",
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <html
      lang="en"
      // The intro script sets data-intro on <html> before hydration.
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <InlineScript html={INTRO_SCRIPT} />
        <IntroSplash />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="label-mono fixed top-3 left-3 z-[60] -translate-y-20 bg-accent px-3 py-2 text-accent-ink transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </MotionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
