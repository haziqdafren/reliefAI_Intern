/**
 * Reduce a YouTube description to the part the podcast page shows.
 *
 * The page shows the story and takeaways only: YouTube renders chapters in its
 * own player and the site footer already carries the social links. The
 * leading underscore keeps Vercel from exposing this file as a route.
 *
 * Rules, in order of how much they are trusted:
 *  1. The first timestamp line ends the story. Whatever is above it is kept,
 *     minus the heading that introduces the list ("Chapters:", "Episode
 *     Timestamps:", "Timeline:" …), recognised by its trailing colon so a new
 *     wording needs no code change.
 *  2. Named blocks that can appear without timestamps (social links, the quiz
 *     call-to-action, a bare "Chapters" label) also end the story.
 */

const TRAILING_BLOCK = /^\s*((?:episode\s+)?(?:chapters?|timestamps?)\s*:?\s*$|follow\s+[^\n]*:\s*$|get to know us\s*:?\s*$|lead with balance\s*:\s*$|take .{0,80}quiz here\s*:|take dr\.? .{0,60}quiz\s*:?\s*$)/i;
// 0:00 · 00:00:00 · [00:00] · (00:00) · "- 00:00"
const TIMESTAMP_LINE = /^\s*(?:[-–—•]\s*)?[[(]?\d{1,2}:\d{2}/;
const HEADING_LINE = /:\s*$/;

const withoutTrailingBlanks = (lines) => {
  const end = lines.findLastIndex((line) => line.trim() !== '');
  return lines.slice(0, end + 1);
};

const trimDescription = (description) => {
  const kept = [];
  let endedAtTimestamps = false;

  for (const line of description.split('\n')) {
    if (TIMESTAMP_LINE.test(line)) {
      endedAtTimestamps = true;
      break;
    }
    if (TRAILING_BLOCK.test(line)) break;
    kept.push(line.trimEnd());
  }

  const body = withoutTrailingBlanks(kept);
  const last = body[body.length - 1];
  const story = endedAtTimestamps && last !== undefined && HEADING_LINE.test(last)
    ? withoutTrailingBlanks(body.slice(0, -1))
    : body;

  return story.join('\n').replace(/\n{3,}/g, '\n\n').trim();
};

module.exports = { trimDescription };
