import type { ProjectType } from "@/types/site";

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  type: ProjectType;
  url: string;
  stack: string[];
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "work-commerce-platform",
    title: "Global Commerce Platform",
    description: "Built checkout and experimentation flows that improved conversion across multiple locales.",
    type: "work",
    url: "https://example.com/work-commerce",
    stack: ["Next.js", "TypeScript", "A/B Testing"],
  },
  {
    id: "work-analytics-dashboard",
    title: "Analytics Operations Dashboard",
    description: "Designed a high-clarity internal dashboard for product and growth teams.",
    type: "work",
    url: "https://example.com/work-analytics",
    stack: ["React", "Node.js", "PostgreSQL"],
  },
  {
    id: "side-motion-studio",
    title: "Motion UI Studio",
    description: "A side project exploring expressive transitions and structured design systems.",
    type: "side",
    url: "https://example.com/side-motion",
    stack: ["Next.js", "Framer Motion", "CSS"],
  },
  {
    id: "side-dev-journal",
    title: "Dev Journal",
    description: "A writing-first personal publishing project focused on engineering notes and learnings.",
    type: "side",
    url: "https://example.com/side-journal",
    stack: ["MDX", "TypeScript", "Vercel"],
  },
];
