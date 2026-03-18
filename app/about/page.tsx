import { SITE_COPY } from "@/lib/site-copy";

export default function AboutPage() {
  return (
    <main className="page container">
      <section className="about-card">
        <h1 className="page-title">{SITE_COPY.about.title}</h1>
        <p className="page-subtitle">{SITE_COPY.about.subtitle}</p>

        <div className="about-paragraphs">
          {SITE_COPY.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    </main>
  );
}
