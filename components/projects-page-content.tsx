import { ProjectFilter } from "@/components/project-filter";
import { PROJECTS } from "@/lib/projects";
import { SITE_COPY } from "@/lib/site-copy";

export function ProjectsPageContent() {
  return (
    <main className="page">
      <section className="projects-card layout-frame">
        <h1 className="page-title page-stagger page-stagger-0">
          {SITE_COPY.projects.title}
        </h1>
        <p className="page-subtitle page-stagger page-stagger-1">
          {SITE_COPY.projects.subtitle}
        </p>

        <div className="page-reveal-body page-stagger page-stagger-2">
          <ProjectFilter
            projects={PROJECTS}
            labels={{
              work: SITE_COPY.projects.workToggle,
              side: SITE_COPY.projects.sideToggle,
              visit: SITE_COPY.projects.visitLabel,
            }}
          />
        </div>
      </section>
    </main>
  );
}
