"use client";

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type {
  ProjectItem,
  ProjectMediaItem,
  ProjectReferenceMedia,
} from "@/lib/projects";
import styles from "./project-detail.module.css";

interface ProjectDetailProps {
  animateOnFirstOpen?: boolean;
  project: ProjectItem;
  backLabel: string;
  shouldReduceMotion?: boolean;
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

type ProjectComparisonMedia = ProjectMediaItem | ProjectReferenceMedia;
type ProjectVideoComparisonMedia = Extract<ProjectMediaItem, { type: "video" }> & {
  referenceMedia: Extract<ProjectReferenceMedia, { type: "video" }>;
};

export function ProjectDetail({
  animateOnFirstOpen = false,
  project,
  backLabel,
  shouldReduceMotion = false,
  visitLabel,
  onBack,
}: ProjectDetailProps) {
  const panelRef = useRef<HTMLElement | null>(null);
  const comparisonVisibilityRef = useRef<Record<number, number>>({});
  const [activeComparisonIndex, setActiveComparisonIndex] = useState<number | null>(
    null,
  );
  const resolvedActiveComparisonIndex = shouldReduceMotion
    ? null
    : activeComparisonIndex;
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

  function isVideoComparisonMedia(
    item: ProjectMediaItem,
  ): item is ProjectVideoComparisonMedia {
    return item.type === "video" && item.referenceMedia?.type === "video";
  }

  useEffect(() => {
    if (shouldReduceMotion || typeof IntersectionObserver === "undefined") {
      comparisonVisibilityRef.current = {};
      return;
    }

    const comparisonFigures = Array.from(
      panelRef.current?.querySelectorAll<HTMLElement>("figure[data-comparison-index]") ??
        [],
    )
      .map((figure) => {
        const comparisonIndex = figure.getAttribute("data-comparison-index");

        return comparisonIndex ? { figure, index: Number(comparisonIndex) } : null;
      })
      .filter((entry): entry is { figure: HTMLElement; index: number } => entry !== null);

    if (comparisonFigures.length === 0) {
      comparisonVisibilityRef.current = {};
      return;
    }

    comparisonVisibilityRef.current = Object.fromEntries(
      comparisonFigures.map(({ index }) => [index, 0]),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const comparisonIndex = entry.target.getAttribute("data-comparison-index");

          if (comparisonIndex) {
            comparisonVisibilityRef.current[Number(comparisonIndex)] = entry.isIntersecting
              ? entry.intersectionRatio
              : 0;
          }
        }

        let nextActiveIndex: number | null = null;
        let highestRatio = 0;

        for (const [comparisonIndex, ratio] of Object.entries(
          comparisonVisibilityRef.current,
        )) {
          if (ratio > highestRatio) {
            highestRatio = ratio;
            nextActiveIndex = Number(comparisonIndex);
          }
        }

        setActiveComparisonIndex(highestRatio >= 0.45 ? nextActiveIndex : null);
      },
      {
        rootMargin: "-10% 0px -10% 0px",
        threshold: [0, 0.25, 0.45, 0.6, 0.75, 1],
      },
    );

    for (const { figure } of comparisonFigures) {
      observer.observe(figure);
    }

    return () => {
      observer.disconnect();
    };
  }, [project.media, shouldReduceMotion]);

  useEffect(() => {
    const comparisonFigures = Array.from(
      panelRef.current?.querySelectorAll<HTMLElement>("figure[data-comparison-index]") ??
        [],
    );

    for (const figure of comparisonFigures) {
      const comparisonIndex = figure.getAttribute("data-comparison-index");
      const index = comparisonIndex ? Number(comparisonIndex) : -1;
      const videos = Array.from(figure.querySelectorAll<HTMLVideoElement>("video"));

      for (const video of videos) {
        if (!video) {
          continue;
        }

        if (resolvedActiveComparisonIndex !== index) {
          video.pause();
          continue;
        }

        const playPromise = video.play();

        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => {});
        }
      }
    }
  }, [resolvedActiveComparisonIndex]);

  function getMediaOrientation(item: ProjectMediaItem) {
    return item.width && item.height && item.height > item.width
      ? "portrait"
      : "landscape";
  }

  function getMediaAccessibilityLabel(
    item: ProjectComparisonMedia,
    fallback: string,
  ) {
    if (item.type === "image") {
      return item.label ?? item.alt ?? fallback;
    }

    return "ariaLabel" in item ? item.ariaLabel : item.label;
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

  function renderComparisonMedia(
    item: ProjectComparisonMedia,
    options?: {
      preload?: "auto" | "metadata";
    },
  ) {
    if (item.type === "image") {
      return (
        <Image
          className={styles.mediaComparisonImage}
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 720px) 50vw, 25vw"
          unoptimized
        />
      );
    }

    return (
      <video
        className={styles.mediaComparisonVideo}
        src={item.src}
        aria-label={getMediaAccessibilityLabel(item, "Project comparison preview")}
        width={item.width}
        height={item.height}
        loop
        muted
        playsInline
        preload={options?.preload ?? "metadata"}
      />
    );
  }

  function renderMedia(item: NonNullable<ProjectItem["media"]>[number], index: number) {
    const mediaOrientation = getMediaOrientation(item);
    const mediaAspectRatio =
      item.width && item.height ? `${item.width} / ${item.height}` : undefined;
    const isActiveComparison = resolvedActiveComparisonIndex === index;
    const isVideoComparison = isVideoComparisonMedia(item);

    return (
      <figure
        className={styles.mediaCard}
        data-comparison-index={isVideoComparison ? index : undefined}
        data-media-comparison={item.referenceMedia ? "true" : undefined}
        data-media-orientation={mediaOrientation}
        data-playback-state={
          isVideoComparison ? (isActiveComparison ? "active" : "idle") : undefined
        }
        onFocusCapture={
          isVideoComparison && !shouldReduceMotion
            ? () => setActiveComparisonIndex(index)
            : undefined
        }
        onMouseEnter={
          isVideoComparison && !shouldReduceMotion
            ? () => setActiveComparisonIndex(index)
            : undefined
        }
      >
        {item.referenceMedia ? (
          <div
            className={styles.mediaComparisonFrame}
            style={mediaAspectRatio ? { aspectRatio: mediaAspectRatio } : undefined}
          >
            <div
              className={styles.mediaComparisonPane}
              data-media-role="original"
              tabIndex={0}
              aria-label={getMediaAccessibilityLabel(
                item.referenceMedia,
                "Original preview",
              )}
            >
              {renderComparisonMedia(item.referenceMedia, {
                preload: isActiveComparison ? "auto" : "metadata",
              })}
              <span className={styles.mediaComparisonLabel}>
                {item.referenceMedia.label}
              </span>
            </div>
            <div
              className={styles.mediaComparisonPane}
              data-media-role="mimesis"
              tabIndex={0}
              aria-label="My Mimesis"
            >
              {renderComparisonMedia(item, {
                preload: isActiveComparison ? "auto" : "metadata",
              })}
              <span className={styles.mediaComparisonLabel}>My Mimesis</span>
            </div>
          </div>
        ) : item.type === "image" ? (
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
      ref={panelRef}
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
                {mediaItem ? renderMedia(mediaItem, index) : null}
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
