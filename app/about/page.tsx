import { cookies } from "next/headers";
import { getCopy } from "@/lib/i18n/get-copy";
import { normalizeLocale } from "@/lib/i18n/get-locale";

export default async function AboutPage() {
  const cookieStore = await cookies();
  const locale = normalizeLocale(cookieStore.get("site_lang")?.value);
  const copy = getCopy(locale);

  return (
    <main className="page container">
      <section className="card about-card">
        <h1 className="page-title">{copy.about.title}</h1>
        <p className="page-subtitle">{copy.about.subtitle}</p>

        <div className="about-paragraphs">
          {copy.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    </main>
  );
}
