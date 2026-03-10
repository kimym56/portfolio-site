import Link from "next/link";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Locale } from "@/lib/i18n/locales";
import type { NavCopy } from "@/types/site";
import styles from "./site-header.module.css";

interface SiteHeaderProps {
  locale: Locale;
  navCopy: NavCopy;
}

export function SiteHeader({ locale, navCopy }: SiteHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={`${styles.inner} container`}>
        <Link href="/" className={styles.logo}>
          YMK
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <Link className={styles.navLink} href="/">
            {navCopy.home}
          </Link>
          <Link className={styles.navLink} href="/about">
            {navCopy.about}
          </Link>
          <Link className={styles.navLink} href="/projects">
            {navCopy.projects}
          </Link>
          <Link className={styles.navLink} href="/contact">
            {navCopy.contact}
          </Link>
        </nav>

        <div className={styles.controls}>
          <LanguageToggle locale={locale} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
