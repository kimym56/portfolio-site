"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { DEFAULT_INTERVAL_MS, RotatingRole } from "@/components/rotating-role";
import type { HomeCopy } from "@/types/site";
import styles from "./hero-split.module.css";

interface HeroSplitProps {
  copy: HomeCopy;
}

export function HeroSplit({ copy }: HeroSplitProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImageSrc =
    copy.profileImages.length > 0
      ? copy.profileImages[activeIndex % copy.profileImages.length]
      : null;
  const previousImageRef = useRef(activeImageSrc);
  const [fadingImageSrc, setFadingImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (copy.roles.length < 2) {
      return;
    }

    let timeoutId: number | null = null;
    let expectedTickTime = performance.now() + DEFAULT_INTERVAL_MS;

    const tick = () => {
      setActiveIndex((previousIndex) => (previousIndex + 1) % copy.roles.length);
      expectedTickTime += DEFAULT_INTERVAL_MS;
      const delayUntilNextTick = Math.max(
        0,
        expectedTickTime - performance.now(),
      );
      timeoutId = window.setTimeout(tick, delayUntilNextTick);
    };

    timeoutId = window.setTimeout(tick, DEFAULT_INTERVAL_MS);

    return () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [copy.roles.length]);

  useEffect(() => {
    if (!activeImageSrc || previousImageRef.current === activeImageSrc) {
      return;
    }

    setFadingImageSrc(previousImageRef.current);
    previousImageRef.current = activeImageSrc;

    const timeoutId = window.setTimeout(() => {
      setFadingImageSrc(null);
    }, 450);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [activeImageSrc]);

  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <p className={styles.greeting}>Hi :)</p>
        <h1 className={styles.title}>
          <RotatingRole roles={copy.roles} activeIndex={activeIndex} />
        </h1>
        <p className={styles.name}>{copy.name}</p>
      </div>

      <div className={styles.media}>
        {fadingImageSrc ? (
          <Image
            src={fadingImageSrc}
            alt=""
            aria-hidden="true"
            fill
            className={styles.image}
            priority
            sizes="(max-width: 767px) 90vw, 38vw"
          />
        ) : null}
        {activeImageSrc ? (
          <Image
            key={activeImageSrc}
            src={activeImageSrc}
            alt={copy.imageAlt}
            fill
            className={`${styles.image} ${styles.imageFadeIn}`}
            priority
            sizes="(max-width: 767px) 90vw, 38vw"
          />
        ) : null}
      </div>
    </section>
  );
}
