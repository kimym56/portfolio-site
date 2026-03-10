import { cookies } from "next/headers";
import { ProjectFilter } from "@/components/project-filter";
import { getCopy } from "@/lib/i18n/get-copy";
import { normalizeLocale } from "@/lib/i18n/get-locale";
import { PROJECTS } from "@/lib/projects";

export default async function ProjectsPage() {
  const cookieStore = await cookies();
  const locale = normalizeLocale(cookieStore.get("site_lang")?.value);
  const copy = getCopy(locale);

  return (
    <main className="page container">
      <section className="card projects-card">
        <h1 className="page-title">{copy.projects.title}</h1>
        <p className="page-subtitle">{copy.projects.subtitle}</p>

        <ProjectFilter
          projects={PROJECTS}
          labels={{
            work: copy.projects.workToggle,
            side: copy.projects.sideToggle,
            visit: copy.projects.visitLabel,
          }}
        />
      </section>
    </main>
  );
}
