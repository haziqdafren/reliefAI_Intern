/**
 * Fetch a URL, retrying until it answers 2xx or the budget runs out.
 *
 * YouTube's RSS endpoint is unofficial and, for some channels, answers 404 or
 * 500 for most requests and 200 for the rest — the feed itself is fine, it just
 * isn't reliably available. Failures return in well under a second, so a few
 * seconds of retrying turns a mostly-failing source into a mostly-working one.
 *
 * The leading underscore keeps Vercel from exposing this file as a route.
 */

const DEFAULT_MAX_ATTEMPTS = 40;
/** Stay under the function's maxDuration (10s in vercel.json). */
const DEFAULT_DEADLINE_MS = 8000;
const DEFAULT_ATTEMPT_TIMEOUT_MS = 3000;
const DEFAULT_RETRY_DELAY_MS = 100;

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchFeedWithRetry = async (
  url,
  {
    fetchImpl = fetch,
    maxAttempts = DEFAULT_MAX_ATTEMPTS,
    deadlineMs = DEFAULT_DEADLINE_MS,
    attemptTimeoutMs = DEFAULT_ATTEMPT_TIMEOUT_MS,
    retryDelayMs = DEFAULT_RETRY_DELAY_MS,
    now = Date.now,
    sleep = pause,
  } = {}
) => {
  const startedAt = now();
  let attempts = 0;
  let lastFailure = 'no attempt made';

  while (attempts < maxAttempts) {
    const remainingMs = deadlineMs - (now() - startedAt);
    if (remainingMs <= 0) break;

    attempts += 1;
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      Math.min(attemptTimeoutMs, remainingMs)
    );

    try {
      const response = await fetchImpl(url, { signal: controller.signal });
      if (response.ok) {
        return await response.text();
      }
      lastFailure = `status ${response.status}`;
    } catch (error) {
      lastFailure = error.message;
    } finally {
      clearTimeout(timeout);
    }

    if (attempts < maxAttempts) await sleep(retryDelayMs);
  }

  throw new Error(`Feed unavailable after ${attempts} attempts (last: ${lastFailure})`);
};

module.exports = { fetchFeedWithRetry };
