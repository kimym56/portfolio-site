"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  DEFAULT_INTERVAL_MS,
  DEFAULT_TRANSITION_MS,
  RotatingRole,
} from "@/components/rotating-role";
import type { HomeCopy } from "@/types/site";
import styles from "./hero-split.module.css";

interface HeroSplitProps {
  copy: HomeCopy;
}

export function HeroSplit({ copy }: HeroSplitProps) {
  const [rotationState, setRotationState] = useState({
    activeIndex: 0,
    previousIndex: null as number | null,
  });
  const cleanupTimeoutRef = useRef<number | null>(null);
  const activeIndex = rotationState.activeIndex;
  const previousIndex = rotationState.previousIndex;
  const activeImageSrc =
    copy.profileImages.length > 0
      ? copy.profileImages[activeIndex % copy.profileImages.length]
      : null;
  const previousImageSrc =
    previousIndex !== null && copy.profileImages.length > 0
      ? copy.profileImages[previousIndex % copy.profileImages.length]
      : null;

  useEffect(() => {
    if (copy.roles.length < 2) {
      return;
    }

    let timeoutId: number | null = null;
    let expectedTickTime = performance.now() + DEFAULT_INTERVAL_MS;

    const tick = () => {
      startTransition(() => {
        setRotationState((previousState) => ({
          activeIndex: (previousState.activeIndex + 1) % copy.roles.length,
          previousIndex: previousState.activeIndex,
        }));
      });

      if (cleanupTimeoutRef.current !== null) {
        window.clearTimeout(cleanupTimeoutRef.current);
      }

      cleanupTimeoutRef.current = window.setTimeout(() => {
        setRotationState((previousState) => ({
          ...previousState,
          previousIndex: null,
        }));
        cleanupTimeoutRef.current = null;
      }, DEFAULT_TRANSITION_MS);

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
      if (cleanupTimeoutRef.current !== null) {
        window.clearTimeout(cleanupTimeoutRef.current);
        cleanupTimeoutRef.current = null;
      }
    };
  }, [copy.roles.length]);

  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <p className={styles.greeting}>Hi :)</p>
        <h1 className={styles.title}>
          <RotatingRole
            roles={copy.roles}
            activeIndex={activeIndex}
            previousIndex={previousIndex}
            isTransitioning={previousIndex !== null}
          />
        </h1>
        <p className={styles.name}>{copy.name}</p>
      </div>

      <div className={styles.media}>
        {previousImageSrc ? (
          <Image
            src={previousImageSrc}
            alt=""
            aria-hidden="true"
            fill
            className={`${styles.image} ${styles.imageExit}`}
            priority
            sizes="(max-width: 767px) 90vw, 38vw"
          />
        ) : null}
        {activeImageSrc ? (
          <Image
            src={activeImageSrc}
            alt={copy.imageAlt}
            fill
            className={`${styles.image} ${
              previousIndex !== null ? styles.imageEnter : styles.imageStatic
            }`}
            priority
            sizes="(max-width: 767px) 90vw, 38vw"
          />
        ) : null}
      </div>
    </section>
  );
}
