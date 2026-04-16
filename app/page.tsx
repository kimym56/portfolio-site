import { HeroSplit } from "@/components/hero-split";
import { SITE_COPY } from "@/lib/site-copy";

export default function HomePage() {
  return (
    <main className="home-page page">
      <style>{`
        @media (min-width: 48rem) {
          body {
            overflow-y: hidden;
          }
        }
        @media (max-width: 47.999rem) {
          body {
            overflow-y: auto;
          }
        }
      `}</style>
      <HeroSplit copy={SITE_COPY.home} />
    </main>
  );
}
