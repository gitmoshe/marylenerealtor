/**
 * Retry a data load a few times when the network drops (e.g. "Failed to fetch"
 * while the preview reloads), so a momentary blip doesn't blank the page.
 */
export async function withRetry<T>(fn: () => Promise<T>, attempts = 3, delayMs = 600): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      const transient = err instanceof TypeError || /failed to fetch|network|aborted/i.test(String(err));
      if (!transient || i === attempts - 1) break;
      await new Promise((r) => setTimeout(r, delayMs * (i + 1)));
    }
  }
  throw lastError;
}
