"use client";

import {
  DEFAULT_INTERVAL_MS,
  DEFAULT_TRANSITION_MS,
  RotatingRole,
} from "@/components/rotating-role";
import type { HomeCopy } from "@/types/site";
import { domAnimation, LazyMotion, m, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { startTransition, useEffect, useEffectEvent, useRef, useState } from "react";
import styles from "./hero-split.module.css";

interface HeroSplitProps {
  copy: HomeCopy;
}

export function HeroSplit({ copy }: HeroSplitProps) {
  const [rotationState, setRotationState] = useState({
    activeIndex: 0,
    previousIndex: null as number | null,
  });
  const autoRotateTimeoutRef = useRef<number | null>(null);
  const cleanupTimeoutRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
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
  const transitionDurationMs = prefersReducedMotion ? 0 : DEFAULT_TRANSITION_MS;
  const imageTransition =
    transitionDurationMs === 0
      ? { duration: 0.01 }
      : {
          duration: transitionDurationMs / 1000,
          ease: [0.4, 0, 0.2, 1] as const,
        };
  const incomingImageInitial =
    transitionDurationMs === 0 ? false : { opacity: 0 };
  const incomingImageAnimate = { opacity: 1 };
  const outgoingImageInitial =
    transitionDurationMs === 0 ? { opacity: 1 } : { opacity: 1 };
  const outgoingImageAnimate = { opacity: 0 };
  const clearAutoRotateTimeout = useEffectEvent(() => {
    if (autoRotateTimeoutRef.current !== null) {
      window.clearTimeout(autoRotateTimeoutRef.current);
      autoRotateTimeoutRef.current = null;
    }
  });
  const clearCleanupTimeout = useEffectEvent(() => {
    if (cleanupTimeoutRef.current !== null) {
      window.clearTimeout(cleanupTimeoutRef.current);
      cleanupTimeoutRef.current = null;
    }
  });
  const scheduleCleanup = useEffectEvent(() => {
    clearCleanupTimeout();

    cleanupTimeoutRef.current = window.setTimeout(() => {
      setRotationState((previousState) => ({
        ...previousState,
        previousIndex: null,
      }));
      cleanupTimeoutRef.current = null;
    }, transitionDurationMs);
  });
  const rotate = useEffectEvent((direction: 1 | -1) => {
    if (copy.roles.length < 2) {
      return;
    }

    startTransition(() => {
      setRotationState((previousState) => ({
        activeIndex:
          (previousState.activeIndex + direction + copy.roles.length) %
          copy.roles.length,
        previousIndex: previousState.activeIndex,
      }));
    });

    scheduleCleanup();
  });
  const scheduleNextAutoRotation = useEffectEvent(function scheduleNextAutoRotation() {
    if (copy.roles.length < 2) {
      clearAutoRotateTimeout();
      return;
    }

    clearAutoRotateTimeout();
    autoRotateTimeoutRef.current = window.setTimeout(() => {
      rotate(1);
      scheduleNextAutoRotation();
    }, DEFAULT_INTERVAL_MS);
  });

  useEffect(() => {
    if (copy.roles.length < 2) {
      return;
    }

    scheduleNextAutoRotation();

    return () => {
      clearAutoRotateTimeout();
      clearCleanupTimeout();
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
        <LazyMotion features={domAnimation}>
          {previousImageSrc ? (
            <m.div
              key={previousImageSrc}
              className={styles.imageLayer}
              initial={outgoingImageInitial}
              animate={outgoingImageAnimate}
              transition={imageTransition}
            >
              <Image
                src={previousImageSrc}
                alt=""
                aria-hidden="true"
                fill
                className={styles.image}
                priority
                sizes="(max-width: 767px) 90vw, 38vw"
              />
            </m.div>
          ) : null}
          {activeImageSrc ? (
            <m.div
              key={activeImageSrc}
              className={styles.imageLayer}
              data-testid="hero-image-layer"
              initial={incomingImageInitial}
              animate={incomingImageAnimate}
              transition={imageTransition}
            >
              <Image
                src={activeImageSrc}
                alt={copy.imageAlt}
                fill
                className={styles.image}
                priority
                sizes="(max-width: 767px) 90vw, 38vw"
              />
            </m.div>
          ) : null}
        </LazyMotion>
      </div>
    </section>
  );
}
