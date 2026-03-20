import type { ProjectItem } from "@/lib/projects";
import styles from "./project-grid.module.css";

interface ProjectGridProps {
  projects: ProjectItem[];
  onSelect: (project: ProjectItem) => void;
}

export function ProjectGrid({ projects, onSelect }: ProjectGridProps) {
  return (
    <div className={styles.grid}>
      {projects.map((project) => (
        <article key={project.id} data-testid="project-card">
          <button
            className={`${styles.cardButton} card`}
            type="button"
            onClick={() => onSelect(project)}
          >
            <span className={styles.content}>
              <span className={styles.role}>{project.role}</span>
              <span className={styles.title}>{project.title}</span>
              <span className={styles.description}>{project.description}</span>
            </span>

            <span className={styles.footer}>
              <span className={styles.stack}>{project.stack.join(" · ")}</span>
              <span className={styles.action} aria-hidden="true">
                Open
              </span>
            </span>
          </button>
        </article>
      ))}
    </div>
  );
}
