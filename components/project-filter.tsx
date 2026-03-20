"use client";

import { useState } from "react";
import { ProjectDetail } from "@/components/project-detail";
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
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const filteredProjects = projects.filter((project) => project.type === selected);
  const selectedProject =
    filteredProjects.find((project) => project.id === selectedProjectId) ?? null;
  const backLabel = `Back to ${
    (selected === "work" ? labels.work : labels.side).toLowerCase()
  }`;

  function handleCategoryChange(next: ProjectType) {
    setSelected(next);
    setSelectedProjectId(null);
  }

  return (
    <section className={styles.section}>
      {selectedProject ? (
        <ProjectDetail
          project={selectedProject}
          backLabel={backLabel}
          visitLabel={labels.visit}
          onBack={() => setSelectedProjectId(null)}
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

          <ProjectGrid
            projects={filteredProjects}
            onSelect={(project) => setSelectedProjectId(project.id)}
          />
        </>
      )}
    </section>
  );
}
