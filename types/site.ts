export type ProjectType = "work" | "side";

export interface NavCopy {
  home: string;
  about: string;
  projects: string;
  contact: string;
}

export interface HomeCopy {
  roles: string[];
  name: string;
  imageAlt: string;
}

export interface AboutCopy {
  title: string;
  subtitle: string;
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
