import { HeroSplit } from "@/components/hero-split";
import { SITE_COPY } from "@/lib/site-copy";

export default function HomePage() {
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
      <HeroSplit copy={SITE_COPY.home} />
    </main>
  );
}
