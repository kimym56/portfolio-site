import { SITE_COPY } from "@/lib/site-copy";
import { Github, Linkedin, Mail, Twitter, type LucideIcon } from "lucide-react";

type ContactItem = {
  id: string;
  label: string;
  href: string;
  value: string;
  icon: LucideIcon;
};

export function ContactPageContent() {
  const contacts: ContactItem[] = [
    {
      id: "email",
      label: SITE_COPY.contact.email,
      href: "mailto:kimym.svb@gmail.com",
      value: "kimym.svb@gmail.com",
      icon: Mail,
    },
    {
      id: "linkedin",
      label: SITE_COPY.contact.linkedin,
      href: "https://www.linkedin.com/in/kimym56",
      value: "linkedin.com/in/kimym56",
      icon: Linkedin,
    },
    {
      id: "github",
      label: SITE_COPY.contact.github,
      href: "https://github.com/kimym56",
      value: "github.com/kimym56",
      icon: Github,
    },
    {
      id: "x",
      label: SITE_COPY.contact.x,
      href: "",
      value: "",
      icon: Twitter,
    },
  ];

  const visibleContacts = contacts.filter(
    (contact) => contact.href && contact.value,
  );

  return (
    <main className="page">
      <section className="contact-card layout-frame">
        <h1 className="page-title page-stagger page-stagger-0">
          {SITE_COPY.contact.title}
        </h1>
        <p className="page-subtitle page-stagger page-stagger-1">
          {SITE_COPY.contact.subtitle}
        </p>

        <div className="page-reveal-body">
          <ul className="contact-list page-stagger page-stagger-2">
            {visibleContacts.map((contact) => {
              const Icon = contact.icon;

              return (
                <li key={contact.id} className="contact-item">
                  <a
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    <span className="contact-icon" aria-hidden="true">
                      <Icon size="1rem" strokeWidth={1.9} />
                    </span>
                    <span className="visually-hidden">{contact.label}</span>
                    <span>{contact.value}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}
