export type ProjectType = "work" | "side";

export interface NavCopy {
  home: string;
  about: string;
  projects: string;
  contact: string;
}

export interface HomeCopy {
  roles: string[];
  profileImages: string[];
  name: string;
  imageAlt: string;
}

export type AboutTechStackCategory = "frontend" | "design" | "ai";
export type AboutTechStackProficiency = "strong" | "soft";

export interface AboutTechStackItem {
  label: string;
  category: AboutTechStackCategory;
  proficiency: AboutTechStackProficiency;
}

export interface AboutCopy {
  title: string;
  subtitle: string;
  techStack: AboutTechStackItem[];
  paragraphs: string[];
}

export interface ProjectsCopy {
  title: string;
  subtitle: string;
  workToggle: string;
  sideToggle: string;
  visitLabel: string;
}

export interface ContactCopy {
  title: string;
  subtitle: string;
  email: string;
  linkedin: string;
  github: string;
  x: string;
}

export interface FooterCopy {
  rights: string;
}

export interface SiteCopy {
  nav: NavCopy;
  home: HomeCopy;
  about: AboutCopy;
  projects: ProjectsCopy;
  contact: ContactCopy;
  footer: FooterCopy;
}
