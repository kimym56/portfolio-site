import { ArrowRight } from "lucide-react";
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
              <span className={styles.header}>
                <span className={styles.heading}>
                  <span className={styles.title}>{project.title}</span>
                  <span className={styles.role}>{project.role}</span>
                </span>

                <span className={styles.action} aria-hidden="true">
                  <ArrowRight size={18} strokeWidth={2} />
                </span>
              </span>

              <span className={styles.description}>{project.description}</span>
              <span className={styles.stack}>
                {project.stack.map((item) => (
                  <span
                    key={item.label}
                    className={[
                      "about-chip",
                      `about-chip-${item.category}`,
                      `about-chip-${item.proficiency}`,
                    ].join(" ")}
                  >
                    {item.label}
                  </span>
                ))}
              </span>
            </span>
          </button>
        </article>
      ))}
    </div>
  );
}
