import Image from "next/image";
import { RotatingRole } from "@/components/rotating-role";
import type { HomeCopy } from "@/types/site";
import styles from "./hero-split.module.css";

interface HeroSplitProps {
  copy: HomeCopy;
}

export function HeroSplit({ copy }: HeroSplitProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <p className={styles.greeting}>Hi :)</p>
        <h1 className={styles.title}>
          <RotatingRole roles={copy.roles} />
        </h1>
        <p className={styles.name}>{copy.name}</p>
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
