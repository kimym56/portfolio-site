import { cookies } from "next/headers";
import { HeroSplit } from "@/components/hero-split";
import { getCopy } from "@/lib/i18n/get-copy";
import { normalizeLocale } from "@/lib/i18n/get-locale";

export default async function HomePage() {
  const cookieStore = await cookies();
  const locale = normalizeLocale(cookieStore.get("site_lang")?.value);
  const copy = getCopy(locale);

  return (
    <main className="home-page page container">
      <style>{`
        @media (min-width: 768px) {
          body {
            overflow-y: hidden;
          }
        }
        @media (max-width: 767px) {
          body {
            overflow-y: auto;
          }
        }
      `}</style>
      <HeroSplit copy={copy.home} />
    </main>
  );
}
