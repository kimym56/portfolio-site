import GridOverlay from "@/components/grid-overlay";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { GRID_OVERLAY_STORAGE_KEY } from "@/lib/grid-overlay";
import { SITE_COPY } from "@/lib/site-copy";
import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-regular",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-bold",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "YongMin Kim | Portfolio",
    template: "%s | YongMin Kim",
  },
  description:
    "Portfolio of YongMin Kim featuring selected work and side projects.",
  openGraph: {
    title: "YongMin Kim | Portfolio",
    description:
      "Portfolio of YongMin Kim featuring selected work and side projects.",
    url: siteUrl,
    siteName: "YongMin Kim Portfolio",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const rootUiInitScript = `
  (() => {
    try {
      const stored = window.localStorage.getItem("site_theme");
      document.documentElement.dataset.theme = stored === "dark" ? "dark" : "light";
    } catch {
      document.documentElement.dataset.theme = "light";
    }

    try {
      const stored = window.localStorage.getItem("${GRID_OVERLAY_STORAGE_KEY}");
      document.documentElement.dataset.gridOverlay = stored === "visible" ? "visible" : "hidden";
    } catch {
      document.documentElement.dataset.gridOverlay = "hidden";
    }
  })();
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${cormorant.variable}`}
        suppressHydrationWarning
      >
        <script dangerouslySetInnerHTML={{ __html: rootUiInitScript }} />
        <GridOverlay />
        <div className="site-shell">
          <SiteHeader navCopy={SITE_COPY.nav} />
          {children}
          <SiteFooter rightsLabel={SITE_COPY.footer.rights} />
        </div>
      </body>
    </html>
  );
}
