import type { SiteCopy } from "@/types/site";

export const SITE_COPY: SiteCopy = {
  nav: {
    home: "Home",
    about: "About Me",
    projects: "Projects",
    contact: "Contact",
  },
  home: {
    roles: [
      "I am a Design Engineer",
      "I am a UX Engineer",
      "I am a Frontend Engineer",
    ],
    profileImages: [
      "/images/profile1.webp",
      "/images/profile2.webp",
      "/images/profile3.webp",
    ],
    name: "YongMin Kim",
    imageAlt: "Portrait image",
  },
  about: {
    title: "About Me",
    subtitle: "YongMin Kim, based in Seoul, South Korea.",
    techStack: [
      { label: "React", category: "frontend", proficiency: "strong" },
      { label: "Next.js", category: "frontend", proficiency: "strong" },
      { label: "TypeScript", category: "frontend", proficiency: "strong" },
      { label: "JavaScript", category: "frontend", proficiency: "strong" },
      { label: "MUI", category: "frontend", proficiency: "strong" },
      { label: "React Native", category: "frontend", proficiency: "soft" },
      { label: "WebGL", category: "frontend", proficiency: "soft" },
      { label: "Figma", category: "design", proficiency: "strong" },
      { label: "v0", category: "design", proficiency: "strong" },
      { label: "Design Systems", category: "design", proficiency: "soft" },
      { label: "Stitch", category: "design", proficiency: "soft" },
      { label: "Accessibility", category: "design", proficiency: "soft" },
      { label: "Claude Code", category: "ai", proficiency: "strong" },
      { label: "Codex", category: "ai", proficiency: "strong" },
      { label: "Gemini", category: "ai", proficiency: "strong" },
    ],
    paragraphs: [
      "I’m a developer interested in UX and HCI, and I care about building products that are both useful and intuitive.",
      "Recently, I’ve become especially interested in design engineering — the space between design and frontend development where interaction, visual detail, and implementation come together.",
      "I enjoy creating interfaces that are clear, usable, and creative.",
    ],
  },
  projects: {
    title: "Projects",
    subtitle:
      "Selected work and side projects with direct links to live products.",
    workToggle: "Work Projects",
    sideToggle: "Side Projects",
    visitLabel: "Visit project",
  },
  contact: {
    title: "Contact",
    subtitle: "Feel free to reach out through any channel below.",
    email: "Email",
    linkedin: "LinkedIn",
    github: "GitHub",
    x: "X",
  },
  footer: {
    rights: "All rights reserved.",
  },
};
