import { SITE_COPY } from "@/lib/site-copy";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm0 2.2V17h16V8.2l-8 5-8-5Zm.9-1.2L12 11.3 19.1 7H4.9Z" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M5.2 4.5a1.35 1.35 0 1 1 0 2.7 1.35 1.35 0 0 1 0-2.7ZM4 8.6h2.4V20H4V8.6Zm6.2 0h2.3v1.6h.1c.4-.8 1.3-1.8 2.8-1.8 3 0 3.6 2 3.6 4.5V20h-2.4v-5.8c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3V20h-2.4V8.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M12 2C6.5 2 2 6.6 2 12.2c0 4.4 2.8 8.2 6.7 9.5.5.1.7-.2.7-.5v-1.8c-2.7.6-3.3-1.2-3.3-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.4 1.2 3 .9.1-.7.3-1.2.6-1.5-2.1-.2-4.3-1.1-4.3-4.8 0-1 .3-1.8.9-2.5-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.6 1 .8-.2 1.6-.3 2.4-.3.8 0 1.7.1 2.4.3 1.8-1.3 2.6-1 2.6-1 .5 1.3.2 2.3.1 2.5.6.7.9 1.6.9 2.5 0 3.7-2.2 4.5-4.3 4.8.3.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 3.9-1.3 6.7-5.1 6.7-9.5C22 6.6 17.5 2 12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M18.9 3h2.9l-6.4 7.3L23 21h-6l-4.7-6.1L6.8 21H3.9l6.9-7.9L1 3h6.1l4.3 5.7L18.9 3Zm-1 16.3h1.6L6.2 4.6H4.5l13.4 14.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function ContactPage() {
  const contacts = [
    {
      id: "email",
      label: SITE_COPY.contact.email,
      href: "mailto:yongmin.kim@example.com",
      value: "yongmin.kim@example.com",
      icon: <MailIcon />,
    },
    {
      id: "linkedin",
      label: SITE_COPY.contact.linkedin,
      href: "https://www.linkedin.com/in/yongminkim",
      value: "linkedin.com/in/yongminkim",
      icon: <LinkedInIcon />,
    },
    {
      id: "github",
      label: SITE_COPY.contact.github,
      href: "https://github.com/yongminkim",
      value: "github.com/yongminkim",
      icon: <GitHubIcon />,
    },
    {
      id: "x",
      label: SITE_COPY.contact.x,
      href: "https://x.com/yongminkim",
      value: "x.com/yongminkim",
      icon: <XIcon />,
    },
  ];

  return (
    <main className="page container">
      <section className="contact-card">
        <h1 className="page-title">{SITE_COPY.contact.title}</h1>
        <p className="page-subtitle">{SITE_COPY.contact.subtitle}</p>

        <ul className="contact-list">
          {contacts.map((contact) => (
            <li key={contact.id} className="contact-item">
              <a href={contact.href} target="_blank" rel="noopener noreferrer" className="contact-link">
                <span className="contact-icon" aria-hidden="true">
                  {contact.icon}
                </span>
                <span className="visually-hidden">{contact.label}</span>
                <span>{contact.value}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
