/**
 * Minimal in-memory rate limiter — good enough to stop naive form-spam
 * bots on a single long-lived server process.
 *
 * Limitation: this state lives in process memory, so it resets on
 * redeploys/cold-starts and is NOT shared across multiple serverless
 * instances. If you deploy to a platform that scales the API route
 * horizontally (e.g. Vercel with multiple concurrent lambdas), swap
 * this for a shared store — Upstash Redis (`@upstash/ratelimit`) is
 * the standard drop-in replacement and works well on the edge.
 */

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

// Periodically clear stale buckets so this Map doesn't grow forever
// on a long-lived process.
const CLEANUP_INTERVAL_MS = 10 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup(now: number) {
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt < now) buckets.delete(key);
  }
}

export type RateLimitResult = {
  success: boolean;
  remaining: number;
  resetAt: number;
};

/**
 * @param key        Unique identifier for the caller (usually IP address).
 * @param limit      Max requests allowed within the window.
 * @param windowMs   Window size in milliseconds.
 */
export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 10 * 60 * 1000
): RateLimitResult {
  const now = Date.now();
  cleanup(now);

  const existing = buckets.get(key);

  if (!existing || existing.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (existing.count >= limit) {
    return { success: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return {
    success: true,
    remaining: limit - existing.count,
    resetAt: existing.resetAt,
  };
}

/** Best-effort extraction of the caller's IP from standard proxy headers. */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}