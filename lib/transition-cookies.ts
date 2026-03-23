export const COOKIE_PENDING_TRANSITION = "ymkim_pending_transition";
export const COOKIE_SEEN_TRANSITIONS = "ymkim_seen_transitions";

function normalizeSeenTransitionKeys(value: string | undefined): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

export function readCookieValue(
  cookieHeader: string | undefined,
  cookieName: string,
): string | undefined {
  if (!cookieHeader) {
    return undefined;
  }

  const prefix = `${cookieName}=`;
  let cookieValue: string | undefined;

  for (const cookiePart of cookieHeader.split(";")) {
    const trimmed = cookiePart.trim();

    if (trimmed.startsWith(prefix)) {
      cookieValue = decodeURIComponent(trimmed.slice(prefix.length));
    }
  }

  return cookieValue;
}

export function hasSeenTransition(
  transitionKey: string,
  cookieValue: string | undefined,
): boolean {
  return normalizeSeenTransitionKeys(cookieValue).includes(transitionKey);
}

export function markTransitionSeen(
  transitionKey: string,
  cookieValue: string | undefined,
): string {
  const transitionKeys = normalizeSeenTransitionKeys(cookieValue);

  if (transitionKeys.includes(transitionKey)) {
    return transitionKeys.join(",");
  }

  return [...transitionKeys, transitionKey].join(",");
}

export function buildCookieAssignment(
  cookieName: string,
  value: string,
  maxAge: number,
): string {
  return `${cookieName}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}
