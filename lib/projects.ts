import type { AboutTechStackItem, ProjectType } from "@/types/site";

export interface ProjectDetailContent {
  summary: string;
  whatThisProjectIs: string;
  whatIFocusedOn: string;
  considerations: string;
  meta: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  description: string;
  type: ProjectType;
  url: string;
  stack: AboutTechStackItem[];
  details: ProjectDetailContent;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "sellpath",
    title: "Sellpath",
    role: "Frontend Engineer",
    description:
      "Worked on production frontend flows with attention to clarity, conversion, and implementation quality.",
    type: "work",
    url: "https://example.com/sellpath",
    stack: [
      { label: "React", category: "frontend", proficiency: "strong" },
      { label: "Next.js", category: "frontend", proficiency: "strong" },
      { label: "TypeScript", category: "frontend", proficiency: "strong" },
    ],
    details: {
      summary:
        "Add a concise summary of your frontend work at Sellpath here.",
      whatThisProjectIs:
        "Describe what Sellpath is, who it serves, and the product context you worked within.",
      whatIFocusedOn:
        "Explain the main frontend responsibilities, interaction problems, or product goals you focused on.",
      considerations:
        "Document the UI, UX, HCI, and frontend considerations you want to highlight for this work project.",
      meta: [
        "Type: Work Project",
        "Role: Frontend Engineer",
        "Stack: React, Next.js, TypeScript",
      ],
    },
  },
  {
    id: "mimesis",
    title: "Mimesis",
    role: "Side Project",
    description:
      "An interface-focused side project exploring interaction patterns and visual structure.",
    type: "side",
    url: "https://example.com/mimesis",
    stack: [
      { label: "React", category: "frontend", proficiency: "strong" },
      { label: "TypeScript", category: "frontend", proficiency: "strong" },
      { label: "CSS", category: "design", proficiency: "soft" },
    ],
    details: {
      summary: "Add a short summary of what Mimesis is and why you made it.",
      whatThisProjectIs:
        "Describe the project concept, audience, and the core problem or idea behind Mimesis.",
      whatIFocusedOn:
        "Explain the specific interaction, interface, or implementation areas you focused on.",
      considerations:
        "Capture the UI, UX, HCI, and frontend tradeoffs or decisions that matter in this project.",
      meta: [
        "Type: Side Project",
        "Role: Side Project",
        "Stack: React, TypeScript, CSS",
      ],
    },
  },
  {
    id: "website",
    title: "Website",
    role: "Side Project",
    description:
      "A personal website project centered on information hierarchy, visual tone, and frontend craft.",
    type: "side",
    url: "https://example.com/website",
    stack: [
      { label: "Next.js", category: "frontend", proficiency: "strong" },
      { label: "TypeScript", category: "frontend", proficiency: "strong" },
      { label: "CSS Modules", category: "design", proficiency: "soft" },
    ],
    details: {
      summary:
        "Add a brief summary of the website project and what you wanted it to communicate.",
      whatThisProjectIs:
        "Describe the purpose of the website, its audience, and how it fits into your portfolio or practice.",
      whatIFocusedOn:
        "Explain the core priorities for layout, typography, motion, or implementation.",
      considerations:
        "Document the UI, UX, HCI, and frontend decisions that shaped the final website experience.",
      meta: [
        "Type: Side Project",
        "Role: Side Project",
        "Stack: Next.js, TypeScript, CSS Modules",
      ],
    },
  },
  {
    id: "design-system-project",
    title: "Design System Project",
    role: "Side Project",
    description:
      "A component and token system project focused on consistency, reuse, and interface scale.",
    type: "side",
    url: "https://example.com/design-system",
    stack: [
      { label: "TypeScript", category: "frontend", proficiency: "strong" },
      { label: "Storybook", category: "design", proficiency: "strong" },
      { label: "Design Tokens", category: "design", proficiency: "strong" },
    ],
    details: {
      summary:
        "Add a summary of the design system project and the need it was created to address.",
      whatThisProjectIs:
        "Describe the system scope, intended consumers, and the components or patterns it organizes.",
      whatIFocusedOn:
        "Explain what you focused on most, such as component APIs, visual consistency, or documentation.",
      considerations:
        "Document the UI, UX, HCI, and frontend considerations behind the system decisions.",
      meta: [
        "Type: Side Project",
        "Role: Side Project",
        "Stack: TypeScript, Storybook, Design Tokens",
      ],
    },
  },
];
