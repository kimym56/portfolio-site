import { PageReveal } from "@/components/page-reveal";
import { ProjectsPageContent } from "@/components/projects-page-content";

export default function AnimatedProjectsPage() {
  return (
    <PageReveal variant="animated">
      <ProjectsPageContent />
    </PageReveal>
  );
}
