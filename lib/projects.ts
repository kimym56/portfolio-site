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
      "Contributed frontend work for an AI agent-based CRM and sales platform serving the U.S. market.",
    type: "work",
    url: "https://www.sellpath.ai",
    stack: [
      { label: "Next.js", category: "frontend", proficiency: "strong" },
      { label: "React", category: "frontend", proficiency: "strong" },
      { label: "TypeScript", category: "frontend", proficiency: "strong" },
      { label: "OpenAI API", category: "ai", proficiency: "strong" },
      { label: "WebSocket", category: "frontend", proficiency: "soft" },
      { label: "WebRTC", category: "frontend", proficiency: "soft" },
    ],
    details: {
      summary:
        "Built production-facing frontend surfaces for a sales platform that brings CRM context, real-time communication, and AI-assisted workflows into one working environment.",
      whatThisProjectIs:
        "Sellpath is an AI agent-based CRM and sales platform for U.S. sales teams. The product combines sales dashboards, CRM-integrated tables, and an Activity Modal that helps teams understand customer context while they communicate.",
      whatIFocusedOn:
        "Focused on the Activity Modal and related sales workflow surfaces, including customer context summaries, engagement and sentiment visualization, chat UI, real-time calls, transcription, and AI agent-powered reply suggestions.",
      considerations:
        "The core frontend challenge was making dense sales context readable during live communication. I worked around responsive modal structure, real-time state updates, WebSocket and WebRTC behavior, and OpenAI API-based speech-to-text flows while keeping the experience fast enough for active sales work.",
      meta: [
        "Type: Work Project",
        "Role: Frontend Engineer",
        "Stack: Next.js, React, TypeScript, OpenAI API, WebSocket, WebRTC",
      ],
    },
  },
  {
    id: "mimesis",
    title: "Mimesis",
    role: "Side Project",
    description:
      "A creative coding project that recreates interactive UIs and extends them through web technologies.",
    type: "side",
    url: "https://ymkim-mimesis.vercel.app",
    stack: [
      { label: "Next.js", category: "frontend", proficiency: "strong" },
      { label: "React", category: "frontend", proficiency: "strong" },
      { label: "TypeScript", category: "frontend", proficiency: "strong" },
      { label: "Vite", category: "frontend", proficiency: "soft" },
      { label: "R3F", category: "frontend", proficiency: "strong" },
      { label: "Three.js", category: "frontend", proficiency: "strong" },
      { label: "Framer Motion", category: "design", proficiency: "strong" },
      { label: "Realtime BPM", category: "frontend", proficiency: "soft" },
    ],
    details: {
      summary:
        "A study of interaction fidelity, 3D rendering, audio-driven motion, and expressive text animation on the web.",
      whatThisProjectIs:
        "Mimesis is a side project focused on recreating interactive UI and creative digital works, then extending them through React, R3F, Three.js, Framer Motion, and browser APIs.",
      whatIFocusedOn:
        "Focused on four interaction studies: an iOS-style Page Curl effect rebuilt in R3F, Wiper Typography with a Tesla 3D model, Black & White Circle with browser audio analysis, and Staggered Text with click-driven Framer Motion previews.",
      considerations:
        "Each recreation needed a balance between the reference interaction and what the browser can reliably support. The work involved drag behavior, 3D scene composition, real-time audio analysis without direct YouTube extraction, motion timing, and keeping demos responsive enough to feel immediate.",
      meta: [
        "Type: Side Project",
        "Role: Side Project",
        "Stack: Next.js, React, TypeScript, Vite, R3F, Three.js, Framer Motion",
      ],
    },
  },
  {
    id: "dsskills",
    title: "DSSkills",
    role: "Side Project",
    description:
      "A playground for applying trending agent skills to design system components and previewing the generated output.",
    type: "side",
    url: "https://ymkim-dsskills.vercel.app",
    stack: [
      { label: "Next.js", category: "frontend", proficiency: "strong" },
      { label: "React", category: "frontend", proficiency: "strong" },
      { label: "TypeScript", category: "frontend", proficiency: "strong" },
      { label: "OpenAI API", category: "ai", proficiency: "strong" },
      { label: "PostgreSQL", category: "frontend", proficiency: "soft" },
      { label: "Prisma", category: "frontend", proficiency: "soft" },
      { label: "Tailwind CSS", category: "design", proficiency: "strong" },
    ],
    details: {
      summary:
        "A design-system generation sandbox where users choose a component, apply UI-focused agent skills, preview the result, and copy the generated code.",
      whatThisProjectIs:
        "DSSkills explores how agent skills can support design system work. It fetches skill descriptions and GitHub star counts, then lets users choose both the target component and the skills to apply before generation.",
      whatIFocusedOn:
        "Focused on the component-generation flow: skill selection, OpenAI API-powered output generation, instant preview, history review, and code output that can be reused directly.",
      considerations:
        "The product needed to make AI generation inspectable rather than opaque. I emphasized skill context before selection, instant preview after generation, persistent history for comparison, and code visibility so users can evaluate and apply results without leaving the workflow.",
      meta: [
        "Type: Side Project",
        "Role: Side Project",
        "Stack: Next.js, React, TypeScript, OpenAI API, PostgreSQL, Prisma, Tailwind CSS",
      ],
    },
  },
  {
    id: "website",
    title: "Website",
    role: "Side Project",
    description:
      "A personal portfolio site focused on clear hierarchy, restrained motion, and project storytelling.",
    type: "side",
    url: "https://ymkim-portfolio.vercel.app",
    stack: [
      { label: "Next.js", category: "frontend", proficiency: "strong" },
      { label: "TypeScript", category: "frontend", proficiency: "strong" },
      { label: "React", category: "frontend", proficiency: "strong" },
      { label: "Framer Motion", category: "design", proficiency: "strong" },
      { label: "CSS Modules", category: "design", proficiency: "soft" },
    ],
    details: {
      summary:
        "A focused portfolio site for presenting experience, technical range, and selected projects through direct navigation and polished transitions.",
      whatThisProjectIs:
        "Website is the portfolio product itself. It organizes a concise home introduction, about copy, project filtering, editorial project detail views, and contact information into a small English-only site.",
      whatIFocusedOn:
        "Focused on information hierarchy, page transitions, scroll-driven home hero rotation, card density, project filtering, and reusable content structures that make future portfolio updates straightforward.",
      considerations:
        "The site prioritizes fast scanning and low-friction navigation. I tuned motion to support orientation rather than decoration, kept project cards compact, and separated project copy from UI components so content changes can happen without touching interaction logic.",
      meta: [
        "Type: Side Project",
        "Role: Side Project",
        "Stack: Next.js, TypeScript, React, Framer Motion, CSS Modules",
      ],
    },
  },
];
