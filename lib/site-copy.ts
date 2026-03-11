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
    name: "YongMin Kim",
    imageAlt: "Portrait image",
  },
  about: {
    title: "About Me",
    subtitle: "A product-minded engineer focused on quality, speed, and long-term clarity.",
    paragraphs: [
      "I design and build web products with a strong focus on user value and maintainable code.",
      "I care about clear communication, practical problem solving, and delivering features that actually improve outcomes.",
      "Across product and engineering collaboration, I aim to keep systems simple, robust, and scalable.",
    ],
  },
  projects: {
    title: "Projects",
    subtitle: "Selected work and side projects with direct links to live products.",
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
