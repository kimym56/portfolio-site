import type { ProjectItem } from "@/lib/projects";
import styles from "./project-grid.module.css";

interface ProjectGridProps {
  projects: ProjectItem[];
  visitLabel: string;
}

export function ProjectGrid({ projects, visitLabel }: ProjectGridProps) {
  return (
    <div className={styles.grid}>
      {projects.map((project) => (
        <article key={project.id} className={`${styles.card} card`} data-testid="project-card">
          <div>
            <h3 className={styles.title}>{project.title}</h3>
            <p className={styles.description}>{project.description}</p>
            <p className={styles.stack}>{project.stack.join(" · ")}</p>
          </div>

          <a
            href={project.url}
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {visitLabel}
          </a>
        </article>
      ))}
    </div>
  );
}
