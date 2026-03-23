"use client";

import { useEffect, useState } from "react";
import { ProjectDetail } from "@/components/project-detail";
import { ProjectGrid } from "@/components/project-grid";
import {
  buildCookieAssignment,
  COOKIE_SEEN_TRANSITIONS,
  hasSeenTransition,
  markTransitionSeen,
  readCookieValue,
} from "@/lib/transition-cookies";
import type { ProjectItem } from "@/lib/projects";
import type { ProjectType } from "@/types/site";
import styles from "./project-filter.module.css";

interface ProjectFilterProps {
  projects: ProjectItem[];
  labels: {
    work: string;
    side: string;
    visit: string;
  };
}

const SEEN_TRANSITIONS_MAX_AGE = 60 * 60 * 24 * 365;

export function ProjectFilter({ projects, labels }: ProjectFilterProps) {
  const [selected, setSelected] = useState<ProjectType>("work");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [tabRevealState, setTabRevealState] = useState<"animated" | "static">(
    "static",
  );
  const [detailRevealState, setDetailRevealState] = useState<"animated" | "static">(
    "static",
  );

  const filteredProjects = projects.filter((project) => project.type === selected);
  const selectedProject =
    filteredProjects.find((project) => project.id === selectedProjectId) ?? null;
  const backLabel = `Back to ${
    (selected === "work" ? labels.work : labels.side).toLowerCase()
  }`;

  function markSeenTransition(transitionKey: string) {
    const seenTransitionCookie = readCookieValue(
      document.cookie,
      COOKIE_SEEN_TRANSITIONS,
    );

    document.cookie = buildCookieAssignment(
      COOKIE_SEEN_TRANSITIONS,
      markTransitionSeen(transitionKey, seenTransitionCookie),
      SEEN_TRANSITIONS_MAX_AGE,
    );
  }

  function consumeOnceReveal(transitionKey: string) {
    const seenTransitionCookie = readCookieValue(
      document.cookie,
      COOKIE_SEEN_TRANSITIONS,
    );

    if (hasSeenTransition(transitionKey, seenTransitionCookie)) {
      return false;
    }

    markSeenTransition(transitionKey);
    return true;
  }

  useEffect(() => {
    markSeenTransition("projects:tab:work");
  }, []);

  function handleCategoryChange(next: ProjectType) {
    setSelected(next);
    setSelectedProjectId(null);
    setDetailRevealState("static");
    setTabRevealState(
      consumeOnceReveal(`projects:tab:${next}`) ? "animated" : "static",
    );
  }

  function handleProjectSelect(project: ProjectItem) {
    setSelectedProjectId(project.id);
    setDetailRevealState(
      consumeOnceReveal(`projects:detail:${project.id}`) ? "animated" : "static",
    );
  }

  return (
    <section className={styles.section}>
      {selectedProject ? (
        <ProjectDetail
          animateOnFirstOpen={detailRevealState === "animated"}
          project={selectedProject}
          backLabel={backLabel}
          visitLabel={labels.visit}
          onBack={() => {
            setSelectedProjectId(null);
            setDetailRevealState("static");
          }}
        />
      ) : (
        <>
          <div className={styles.toggles} role="group" aria-label="Project types">
            <button
              className={styles.toggle}
              type="button"
              data-active={selected === "work"}
              aria-pressed={selected === "work"}
              onClick={() => handleCategoryChange("work")}
            >
              {labels.work}
            </button>
            <button
              className={styles.toggle}
              type="button"
              data-active={selected === "side"}
              aria-pressed={selected === "side"}
              onClick={() => handleCategoryChange("side")}
            >
              {labels.side}
            </button>
          </div>

          <div
            className={`${styles.panel} ${
              tabRevealState === "animated" ? styles.panelReveal : ""
            }`}
            data-once-reveal={tabRevealState}
            data-testid="projects-tab-panel"
          >
            <ProjectGrid projects={filteredProjects} onSelect={handleProjectSelect} />
          </div>
        </>
      )}
    </section>
  );
}
