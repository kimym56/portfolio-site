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
    <main className="page container">
      <section className="about-card">
        <h1 className="page-title">{SITE_COPY.about.title}</h1>
        <p className="page-subtitle">{SITE_COPY.about.subtitle}</p>

        <div className="page-reveal-body">
          <div className="about-paragraphs">
            {SITE_COPY.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div aria-label="Tech stack" className="about-tech-stack" role="group">
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
