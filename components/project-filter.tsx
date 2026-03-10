"use client";

import { useMemo, useState } from "react";
import { ProjectGrid } from "@/components/project-grid";
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

export function ProjectFilter({ projects, labels }: ProjectFilterProps) {
  const [selected, setSelected] = useState<ProjectType>("work");

  const filteredProjects = useMemo(
    () => projects.filter((project) => project.type === selected),
    [projects, selected],
  );

  return (
    <section className={styles.section}>
      <div className={styles.toggles} role="group" aria-label="Project types">
        <button
          className={styles.toggle}
          type="button"
          data-active={selected === "work"}
          aria-pressed={selected === "work"}
          onClick={() => setSelected("work")}
        >
          {labels.work}
        </button>
        <button
          className={styles.toggle}
          type="button"
          data-active={selected === "side"}
          aria-pressed={selected === "side"}
          onClick={() => setSelected("side")}
        >
          {labels.side}
        </button>
      </div>

      <ProjectGrid projects={filteredProjects} visitLabel={labels.visit} />
    </section>
  );
}
