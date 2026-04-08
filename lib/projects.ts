import type { AboutTechStackItem, ProjectType } from "@/types/site";

export interface ProjectDetailContent {
  summary: string;
  whatThisProjectIs: string;
  whatIFocusedOn: string;
  considerations: string;
  meta: string[];
}

interface ProjectImageMedia {
  type: "image";
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

interface ProjectVideoMedia {
  type: "video";
  src: string;
  label: string;
  caption: string;
  width?: number;
  height?: number;
}

export type ProjectMediaItem = ProjectImageMedia | ProjectVideoMedia;

export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  description: string;
  type: ProjectType;
  url: string;
  stack: AboutTechStackItem[];
  media?: ProjectMediaItem[];
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
    media: [
      {
        type: "image",
        src: "/images/projects/sellpath_main.png",
        alt: "Sellpath sales dashboard screenshot",
        caption: "Sales dashboard",
        width: 1641,
        height: 865,
      },
      {
        type: "image",
        src: "/images/projects/sellpath_detail1.png",
        alt: "Sellpath Activity Modal customer analytics screenshot",
        caption: "Activity Modal analytics",
        width: 1161,
        height: 846,
      },
      {
        type: "image",
        src: "/images/projects/sellpath_detail2.png",
        alt: "Sellpath Activity Modal chat UI screenshot",
        caption: "Chat UI",
        width: 495,
        height: 846,
      },
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
    media: [
      {
        type: "video",
        src: "/videos/projects/mimesis_page_curl.webm",
        label: "Mimesis iOS Page Curl Effect preview",
        caption: "iOS Page Curl Effect",
        width: 354,
        height: 264,
      },
      {
        type: "video",
        src: "/videos/projects/mimesis_wiper_typography.webm",
        label: "Mimesis Wiper Typography preview",
        caption: "Wiper Typography",
        width: 548,
        height: 410,
      },
      {
        type: "video",
        src: "/videos/projects/mimesis_black_white_circle.webm",
        label: "Mimesis Black & White Circle preview",
        caption: "Black & White Circle",
        width: 548,
        height: 410,
      },
      {
        type: "video",
        src: "/videos/projects/mimesis_staggered_text.webm",
        label: "Mimesis Staggered Text preview",
        caption: "Staggered Text",
        width: 548,
        height: 410,
      },
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
    media: [
      {
        type: "image",
        src: "/images/projects/dsskills_main.png",
        alt: "DSSkills project overview screenshot",
        caption: "Generation playground",
        width: 1097,
        height: 811,
      },
      {
        type: "image",
        src: "/images/projects/dsskills_detail1.png",
        alt: "DSSkills agent skill selection screenshot",
        caption: "Agent skill selection",
        width: 646,
        height: 505,
      },
      {
        type: "image",
        src: "/images/projects/dsskills_detail2.png",
        alt: "DSSkills component preview and code output screenshot",
        caption: "Preview and code output",
        width: 971,
        height: 651,
      },
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
