import { AboutPageContent } from "@/components/about-page-content";
import { PageReveal } from "@/components/page-reveal";

export default function AnimatedAboutPage() {
  return (
    <PageReveal variant="animated">
      <AboutPageContent />
    </PageReveal>
  );
}
