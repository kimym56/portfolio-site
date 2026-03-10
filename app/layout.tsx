import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { cookies } from "next/headers";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCopy } from "@/lib/i18n/get-copy";
import { normalizeLocale } from "@/lib/i18n/get-locale";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Yongmin Kim | Portfolio",
    template: "%s | Yongmin Kim",
  },
  description: "Portfolio of Yongmin Kim featuring selected work and side projects.",
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
  const cookieStore = await cookies();
  const locale = normalizeLocale(cookieStore.get("site_lang")?.value);
  const copy = getCopy(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${manrope.variable} ${cormorant.variable}`}>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <div className="site-shell">
          <SiteHeader locale={locale} navCopy={copy.nav} />
          {children}
          <SiteFooter rightsLabel={copy.footer.rights} />
        </div>
      </body>
    </html>
  );
}
