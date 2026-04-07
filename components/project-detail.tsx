import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { ProjectItem } from "@/lib/projects";
import styles from "./project-detail.module.css";

interface ProjectDetailProps {
  animateOnFirstOpen?: boolean;
  project: ProjectItem;
  backLabel: string;
  visitLabel: string;
  onBack: () => void;
}

export function ProjectDetail({
  animateOnFirstOpen = false,
  project,
  backLabel,
  visitLabel,
  onBack,
}: ProjectDetailProps) {
  const detailSections = [
    {
      id: "what-this-project-is",
      title: "What This Project Is",
      body: <p className={styles.sectionBody}>{project.details.whatThisProjectIs}</p>,
    },
    {
      id: "what-i-focused-on",
      title: "What I Focused On",
      body: <p className={styles.sectionBody}>{project.details.whatIFocusedOn}</p>,
    },
    {
      id: "considerations",
      title: "UI/UX/HCI/Frontend Considerations",
      body: <p className={styles.sectionBody}>{project.details.considerations}</p>,
    },
    {
      id: "project-meta",
      title: "Project Meta",
      body: (
        <ul className={styles.metaList}>
          {project.details.meta.map((item) => (
            <li key={item} className={styles.metaItem}>
              {item}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  function renderMedia(item: NonNullable<ProjectItem["media"]>[number]) {
    return (
      <figure className={styles.mediaCard}>
        {item.type === "image" ? (
          <Image
            className={styles.mediaImage}
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            sizes="(max-width: 720px) 100vw, 50vw"
          />
        ) : (
          <video
            className={styles.mediaVideo}
            src={item.src}
            aria-label={item.label}
            controls
            loop
            muted
            playsInline
            preload="metadata"
          />
        )}
        <figcaption className={styles.mediaCaption}>{item.caption}</figcaption>
      </figure>
    );
  }

  return (
    <article
      className={`${styles.panel} ${animateOnFirstOpen ? styles.panelReveal : ""} card`}
      data-once-reveal={animateOnFirstOpen ? "animated" : "static"}
      data-testid="project-detail-panel"
    >
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

      {project.media && project.media.length > 0 ? (
        <section
          className={styles.detailRows}
          aria-label={`${project.title} project details`}
        >
          {detailSections.map((section, index) => {
            const mediaItem = project.media?.[index];
            const mediaSide = index % 2 === 0 ? "right" : "left";

            return (
              <section
                key={section.id}
                className={`${styles.detailRow} ${
                  mediaItem ? styles.detailRowWithMedia : styles.detailRowTextOnly
                }`}
                data-media-side={mediaItem ? mediaSide : undefined}
                data-testid="project-detail-row"
              >
                <div className={styles.detailCopy}>
                  <h3 className={styles.sectionTitle}>{section.title}</h3>
                  {section.body}
                </div>
                {mediaItem ? renderMedia(mediaItem) : null}
              </section>
            );
          })}
        </section>
      ) : (
        <div className={styles.detailRows}>
          {detailSections.map((section) => (
            <section
              key={section.id}
              className={`${styles.detailRow} ${styles.detailRowTextOnly}`}
              data-testid="project-detail-row"
            >
              <div className={styles.detailCopy}>
                <h3 className={styles.sectionTitle}>{section.title}</h3>
                {section.body}
              </div>
            </section>
          ))}
        </div>
      )}
    </article>
  );
}
