import Image from "next/image";
import type { HomeCopy } from "@/types/site";
import styles from "./hero-split.module.css";

interface HeroSplitProps {
  copy: HomeCopy;
}

export function HeroSplit({ copy }: HeroSplitProps) {
  return (
    <section className={`${styles.hero} card`}>
      <div className={styles.copy}>
        <p className={styles.label}>Portfolio</p>
        <h1 className={styles.title}>{copy.intro}</h1>
      </div>

      <div className={styles.media}>
        <Image
          src="/images/profile-placeholder.svg"
          alt={copy.imageAlt}
          fill
          className={styles.image}
          priority
          sizes="(max-width: 767px) 90vw, 38vw"
        />
      </div>
    </section>
  );
}
