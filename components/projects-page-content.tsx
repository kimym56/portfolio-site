import { ProjectFilter } from "@/components/project-filter";
import { PROJECTS } from "@/lib/projects";
import { SITE_COPY } from "@/lib/site-copy";

export function ProjectsPageContent() {
  return (
    <main className="page container">
      <section className="projects-card">
        <h1 className="page-title">{SITE_COPY.projects.title}</h1>
        <p className="page-subtitle">{SITE_COPY.projects.subtitle}</p>

        <div className="page-reveal-body">
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
