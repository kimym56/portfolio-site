import { SITE_COPY } from "@/lib/site-copy";

export default function ContactPage() {
  const contacts = [
    {
      label: SITE_COPY.contact.email,
      href: "mailto:yongmin.kim@example.com",
      value: "yongmin.kim@example.com",
    },
    {
      label: SITE_COPY.contact.linkedin,
      href: "https://www.linkedin.com/in/yongminkim",
      value: "linkedin.com/in/yongminkim",
    },
    {
      label: SITE_COPY.contact.github,
      href: "https://github.com/yongminkim",
      value: "github.com/yongminkim",
    },
    {
      label: SITE_COPY.contact.x,
      href: "https://x.com/yongminkim",
      value: "x.com/yongminkim",
    },
  ];

  return (
    <main className="page container">
      <section className="contact-card">
        <h1 className="page-title">{SITE_COPY.contact.title}</h1>
        <p className="page-subtitle">{SITE_COPY.contact.subtitle}</p>

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
