import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { ProjectItem } from "@/lib/projects";
import styles from "./project-detail.module.css";

interface ProjectDetailProps {
  project: ProjectItem;
  backLabel: string;
  visitLabel: string;
  onBack: () => void;
}

export function ProjectDetail({
  project,
  backLabel,
  visitLabel,
  onBack,
}: ProjectDetailProps) {
  return (
    <article className={`${styles.panel} card`}>
      <button className={styles.backButton} type="button" onClick={onBack}>
        <ArrowLeft aria-hidden="true" size={18} strokeWidth={2} />
        <span className="visually-hidden">{backLabel}</span>
      </button>

      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div>
            <p className={styles.role}>{project.role}</p>
            <h2 className={styles.title}>{project.title}</h2>
          </div>

          <a
            href={project.url}
            className={styles.visitLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {visitLabel}
            <ArrowUpRight aria-hidden="true" size={16} strokeWidth={2} />
          </a>
        </div>

        <section className={styles.summaryBlock} aria-labelledby={`${project.id}-summary`}>
          <p className={styles.kicker}>Summary</p>
          <p id={`${project.id}-summary`} className={styles.summary}>
            {project.details.summary}
          </p>
        </section>
      </header>

      <div className={styles.sections}>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>What This Project Is</h3>
          <p className={styles.sectionBody}>{project.details.whatThisProjectIs}</p>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>What I Focused On</h3>
          <p className={styles.sectionBody}>{project.details.whatIFocusedOn}</p>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>UI/UX/HCI/Frontend Considerations</h3>
          <p className={styles.sectionBody}>{project.details.considerations}</p>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Project Meta</h3>
          <ul className={styles.metaList}>
            {project.details.meta.map((item) => (
              <li key={item} className={styles.metaItem}>
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
