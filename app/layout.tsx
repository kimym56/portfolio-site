import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
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

const themeInitScript = `
  (() => {
    try {
      const stored = window.localStorage.getItem("site_theme");
      document.documentElement.dataset.theme = stored === "dark" ? "dark" : "light";
    } catch {
      document.documentElement.dataset.theme = "light";
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
      <body className={`${manrope.variable} ${cormorant.variable}`}>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <div className="site-shell">
          <SiteHeader navCopy={SITE_COPY.nav} />
          {children}
          <SiteFooter rightsLabel={SITE_COPY.footer.rights} />
        </div>
      </body>
    </html>
  );
}
