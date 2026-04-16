"use client";

import { Grid3x3 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  GRID_OVERLAY_STORAGE_KEY,
  normalizeGridOverlayState,
  type GridOverlayState,
} from "@/lib/grid-overlay";
import styles from "./grid-overlay-toggle.module.css";

function applyGridOverlayState(state: GridOverlayState) {
  document.documentElement.dataset.gridOverlay = state;
  window.localStorage.setItem(GRID_OVERLAY_STORAGE_KEY, state);
}

function getCurrentGridOverlayState(): GridOverlayState {
  return normalizeGridOverlayState(document.documentElement.dataset.gridOverlay);
}

export function GridOverlayToggle() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(getCurrentGridOverlayState() === "visible");
  }, []);

  const handleToggle = () => {
    const nextState: GridOverlayState =
      getCurrentGridOverlayState() === "visible" ? "hidden" : "visible";

    applyGridOverlayState(nextState);
    setIsVisible(nextState === "visible");
  };

  return (
    <button
      aria-label="Toggle grid overlay"
      aria-pressed={isVisible}
      className={styles.button}
      title="Toggle grid overlay"
      type="button"
      onClick={handleToggle}
    >
      <Grid3x3
        aria-hidden="true"
        className={styles.icon}
        focusable="false"
        size={18}
      />
    </button>
  );
}
