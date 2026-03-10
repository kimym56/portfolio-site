import type { Locale } from "@/lib/i18n/locales";
import type { SiteCopy } from "@/types/site";

const ENGLISH_COPY: SiteCopy = {
  nav: {
    home: "Home",
    about: "About Me",
    projects: "Projects",
    contact: "Contact",
  },
  home: {
    intro: "I build thoughtful digital products that are clear, fast, and genuinely useful.",
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

const KOREAN_COPY: SiteCopy = {
  nav: {
    home: "홈",
    about: "소개",
    projects: "프로젝트",
    contact: "연락처",
  },
  home: {
    intro: "명확하고 빠르며 실제로 도움이 되는 디지털 제품을 만듭니다.",
    imageAlt: "프로필 이미지",
  },
  about: {
    title: "소개",
    subtitle: "품질, 속도, 그리고 장기적인 명확성을 중시하는 프로덕트 지향 엔지니어입니다.",
    paragraphs: [
      "사용자 가치와 유지보수 가능한 코드를 중심으로 웹 제품을 설계하고 개발합니다.",
      "명확한 커뮤니케이션과 실용적인 문제 해결을 통해 실제 성과로 이어지는 기능 전달에 집중합니다.",
      "제품과 엔지니어링 협업 전반에서 시스템을 단순하고 견고하며 확장 가능하게 유지하는 것을 목표로 합니다.",
    ],
  },
  projects: {
    title: "프로젝트",
    subtitle: "직접 방문 가능한 업무 프로젝트와 사이드 프로젝트를 정리했습니다.",
    workToggle: "업무 프로젝트",
    sideToggle: "사이드 프로젝트",
    visitLabel: "프로젝트 보기",
  },
  contact: {
    title: "연락처",
    subtitle: "아래 채널로 편하게 연락해 주세요.",
    email: "이메일",
    linkedin: "링크드인",
    github: "깃허브",
    x: "엑스",
  },
  footer: {
    rights: "All rights reserved.",
  },
};

export const MESSAGES: Record<Locale, SiteCopy> = {
  en: ENGLISH_COPY,
  ko: KOREAN_COPY,
};
