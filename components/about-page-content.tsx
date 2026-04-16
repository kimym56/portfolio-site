import type { AboutTechStackCategory } from "@/types/site";
import { SITE_COPY } from "@/lib/site-copy";

const TECH_STACK_CATEGORY_ORDER: AboutTechStackCategory[] = [
  "frontend",
  "design",
  "ai",
];

const TECH_STACK_CATEGORY_LABELS: Record<AboutTechStackCategory, string> = {
  frontend: "Frontend tech stack",
  design: "Design tech stack",
  ai: "AI tech stack",
};

const groupedTechStack = TECH_STACK_CATEGORY_ORDER.map((category) => ({
  category,
  ariaLabel: TECH_STACK_CATEGORY_LABELS[category],
  items: SITE_COPY.about.techStack.filter((item) => item.category === category),
}));

export function AboutPageContent() {
  return (
    <main className="page">
      <section className="about-card layout-frame">
        <h1 className="page-title page-stagger page-stagger-0">
          {SITE_COPY.about.title}
        </h1>
        <p className="page-subtitle page-stagger page-stagger-1">
          {SITE_COPY.about.subtitle}
        </p>

        <div className="page-reveal-body">
          <div className="about-paragraphs page-stagger page-stagger-2">
            {SITE_COPY.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div
            aria-label="Tech stack"
            className="about-tech-stack page-stagger page-stagger-3"
            role="group"
          >
            {groupedTechStack.map(({ category, ariaLabel, items }) => (
              <ul
                key={category}
                aria-label={ariaLabel}
                className="about-tech-stack-row"
              >
                {items.map((item) => (
                  <li
                    key={item.label}
                    className={[
                      "about-chip",
                      `about-chip-${item.category}`,
                      `about-chip-${item.proficiency}`,
                    ].join(" ")}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
