import styles from "./site-footer.module.css";

interface SiteFooterProps {
  rightsLabel: string;
}

export function SiteFooter({ rightsLabel }: SiteFooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <p>{`© ${new Date().getFullYear()} YongMin Kim. ${rightsLabel}`}</p>
      </div>
    </footer>
  );
}
