import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import type { ProjectItem } from "@/lib/projects";
import styles from "./project-detail.module.css";

interface ProjectDetailProps {
  animateOnFirstOpen?: boolean;
  project: ProjectItem;
  backLabel: string;
  visitLabel: string;
  onBack: () => void;
}

interface DetailSectionViewModel {
  id: string;
  title: string;
  body?: ReactNode;
  reference?: string;
  implementation?: string;
}

export function ProjectDetail({
  animateOnFirstOpen = false,
  project,
  backLabel,
  visitLabel,
  onBack,
}: ProjectDetailProps) {
  const defaultDetailSections = [
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
  const detailSections: DetailSectionViewModel[] =
    project.detailSections ?? defaultDetailSections;

  function getMediaOrientation(item: NonNullable<ProjectItem["media"]>[number]) {
    return item.width && item.height && item.height > item.width
      ? "portrait"
      : "landscape";
  }

  function renderSectionBody(section: DetailSectionViewModel) {
    if (section.reference || section.implementation) {
      return (
        <div className={styles.sectionBlocks}>
          {section.reference ? (
            <div className={styles.sectionBlock}>
              <p className={styles.sectionLabel}>Original reference</p>
              <p className={styles.sectionBody}>{section.reference}</p>
            </div>
          ) : null}
          {section.implementation ? (
            <div className={styles.sectionBlock}>
              <p className={styles.sectionLabel}>My Mimesis implementation</p>
              <p className={styles.sectionBody}>{section.implementation}</p>
            </div>
          ) : null}
        </div>
      );
    }

    if (typeof section.body === "string") {
      return <p className={styles.sectionBody}>{section.body}</p>;
    }

    return section.body;
  }

  function renderMedia(item: NonNullable<ProjectItem["media"]>[number]) {
    const mediaOrientation = getMediaOrientation(item);
    const mediaAspectRatio =
      item.width && item.height ? `${item.width} / ${item.height}` : undefined;

    return (
      <figure
        className={styles.mediaCard}
        data-media-comparison={
          item.type === "video" && item.referenceMedia ? "true" : undefined
        }
        data-media-orientation={mediaOrientation}
      >
        {item.type === "image" ? (
          <Image
            className={styles.mediaImage}
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            sizes={
              mediaOrientation === "portrait"
                ? "(max-width: 720px) 100vw, 24rem"
                : "(max-width: 720px) 100vw, 50vw"
            }
          />
        ) : item.referenceMedia ? (
          <div
            className={styles.mediaComparisonFrame}
            style={mediaAspectRatio ? { aspectRatio: mediaAspectRatio } : undefined}
          >
            <div
              className={styles.mediaComparisonPane}
              tabIndex={0}
              aria-label={item.referenceMedia.label}
            >
              <Image
                className={styles.mediaComparisonImage}
                src={item.referenceMedia.src}
                alt={item.referenceMedia.alt}
                fill
                sizes="(max-width: 720px) 50vw, 25vw"
              />
              <span className={styles.mediaComparisonLabel}>
                {item.referenceMedia.label}
              </span>
            </div>
            <div
              className={styles.mediaComparisonPane}
              tabIndex={0}
              aria-label="My Mimesis"
            >
              <video
                className={styles.mediaComparisonVideo}
                src={item.src}
                aria-label={item.label}
                width={item.width}
                height={item.height}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
              <span className={styles.mediaComparisonLabel}>My Mimesis</span>
            </div>
          </div>
        ) : (
          <video
            className={styles.mediaVideo}
            src={item.src}
            aria-label={item.label}
            width={item.width}
            height={item.height}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
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
            const firstMediaSide = project.mediaStartSide ?? "right";
            const mediaSide =
              index % 2 === 0
                ? firstMediaSide
                : firstMediaSide === "right"
                  ? "left"
                  : "right";

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
                  {renderSectionBody(section)}
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
                {renderSectionBody(section)}
              </div>
            </section>
          ))}
        </div>
      )}
    </article>
  );
}
