import { cookies } from "next/headers";
import { getCopy } from "@/lib/i18n/get-copy";
import { normalizeLocale } from "@/lib/i18n/get-locale";

export default async function ContactPage() {
  const cookieStore = await cookies();
  const locale = normalizeLocale(cookieStore.get("site_lang")?.value);
  const copy = getCopy(locale);

  const contacts = [
    {
      label: copy.contact.email,
      href: "mailto:yongmin.kim@example.com",
      value: "yongmin.kim@example.com",
    },
    {
      label: copy.contact.linkedin,
      href: "https://www.linkedin.com/in/yongminkim",
      value: "linkedin.com/in/yongminkim",
    },
    {
      label: copy.contact.github,
      href: "https://github.com/yongminkim",
      value: "github.com/yongminkim",
    },
    {
      label: copy.contact.x,
      href: "https://x.com/yongminkim",
      value: "x.com/yongminkim",
    },
  ];

  return (
    <main className="page container">
      <section className="card contact-card">
        <h1 className="page-title">{copy.contact.title}</h1>
        <p className="page-subtitle">{copy.contact.subtitle}</p>

        <ul className="contact-list">
          {contacts.map((contact) => (
            <li key={contact.label} className="contact-item">
              <a href={contact.href} target="_blank" rel="noopener noreferrer" className="contact-link">
                <span>{contact.label}</span>
                <span>{contact.value}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
