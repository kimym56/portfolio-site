export const GRID_OVERLAY_STORAGE_KEY = "site_grid_overlay";

export type GridOverlayState = "hidden" | "visible";

export function normalizeGridOverlayState(
  value: string | null | undefined,
): GridOverlayState {
  return value === "visible" ? "visible" : "hidden";
}
