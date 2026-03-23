import { ContactPageContent } from "@/components/contact-page-content";
import { PageReveal } from "@/components/page-reveal";

export default function AnimatedContactPage() {
  return (
    <PageReveal variant="animated">
      <ContactPageContent />
    </PageReveal>
  );
}
