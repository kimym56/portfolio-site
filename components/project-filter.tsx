"use client";

import { motion, useReducedMotion } from "framer-motion";
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
const TOGGLE_PILL_TRANSITION = {
  type: "spring",
  stiffness: 420,
  damping: 34,
  mass: 0.7,
} as const;

export function ProjectFilter({ projects, labels }: ProjectFilterProps) {
  const shouldReduceMotion = useReducedMotion();
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
  const togglePillTransition = shouldReduceMotion
    ? { duration: 0 }
    : TOGGLE_PILL_TRANSITION;

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
              {selected === "work" ? (
                <motion.span
                  aria-hidden="true"
                  className={styles.activePill}
                  data-active-tab="work"
                  data-testid="projects-toggle-indicator"
                  layoutId="projects-toggle-indicator"
                  transition={togglePillTransition}
                />
              ) : null}
              <span className={styles.toggleLabel}>{labels.work}</span>
            </button>
            <button
              className={styles.toggle}
              type="button"
              data-active={selected === "side"}
              aria-pressed={selected === "side"}
              onClick={() => handleCategoryChange("side")}
            >
              {selected === "side" ? (
                <motion.span
                  aria-hidden="true"
                  className={styles.activePill}
                  data-active-tab="side"
                  data-testid="projects-toggle-indicator"
                  layoutId="projects-toggle-indicator"
                  transition={togglePillTransition}
                />
              ) : null}
              <span className={styles.toggleLabel}>{labels.side}</span>
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
