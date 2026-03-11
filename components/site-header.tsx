import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import type { NavCopy } from "@/types/site";
import styles from "./site-header.module.css";

interface SiteHeaderProps {
  navCopy: NavCopy;
}

export function SiteHeader({ navCopy }: SiteHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          YMKim
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
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
