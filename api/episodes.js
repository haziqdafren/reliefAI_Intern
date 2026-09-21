/**
 * Episode list for the podcast page.
 *
 * Reads the channel's public RSS feed — no API key and no quota, unlike the
 * YouTube Data API — and reshapes it into the same objects the page already
 * expects from src/data/podcast.ts.
 *
 * Per-episode resources (worksheets, quizzes) are not in the feed in any
 * machine-readable form, so they stay curated in EPISODE_RESOURCES below,
 * keyed by video ID.
 */

const CHANNEL_ID = process.env.PODCAST_YOUTUBE_CHANNEL_ID || 'UClg8e8IZ9OnHOaao-zOPrXA';
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

/** How long a response stays fresh at the CDN edge. */
const CACHE_SECONDS = 3600;
/** Give up rather than hold a serverless invocation open. */
const FETCH_TIMEOUT_MS = 5000;

/**
 * Curated downloads, keyed by YouTube video ID. The feed cannot supply these:
 * they appear as prose inside the description, so a new episode's resources
 * need an entry here.
 */
const EPISODE_RESOURCES = {
  sUf9V88CnsI: [
    {
      label: 'Are You a Perfectionist — self-check quiz',
      url: 'https://bit.ly/4h7DOSj',
      meta: 'PDF',
    },
  ],
  FUu1wLMKkGs: [
    {
      label: 'Identify Your Core Intrinsic Values exercise',
      url: 'https://therethin.kit.com/67f53a9b69',
      meta: 'Free download',
    },
  ],
};

const XML_ENTITIES = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&apos;': "'",
  '&#39;': "'",
};

const decodeEntities = (text) =>
  text
    .replace(/&(?:amp|lt|gt|quot|apos|#39);/g, (match) => XML_ENTITIES[match])
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)));

const firstMatch = (source, pattern) => {
  const found = source.match(pattern);
  return found ? decodeEntities(found[1]) : '';
};

/**
 * Drop the trailing chapter list and social-link block. The page shows the
 * story and takeaways only: YouTube renders chapters in its own player and the
 * site footer already carries the social links.
 */
const TRAILING_BLOCK = /^\s*(chapters?\s*:?\s*$|follow\s+[^\n]*:\s*$|get to know us\s*:?\s*$|lead with balance\s*:\s*$|take .{0,80}quiz here\s*:|take dr\.? .{0,60}quiz\s*:?\s*$)/i;
const TIMESTAMP_LINE = /^\s*\d{1,2}:\d{2}/;

const trimDescription = (description) => {
  const kept = [];
  for (const line of description.split('\n')) {
    if (TRAILING_BLOCK.test(line) || TIMESTAMP_LINE.test(line)) break;
    kept.push(line.trimEnd());
  }
  return kept.join('\n').replace(/\n{3,}/g, '\n\n').trim();
};

const parseFeed = (xml) => {
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) || [];

  return entries
    .map((entry) => {
      const youtubeId = firstMatch(entry, /<yt:videoId>(.*?)<\/yt:videoId>/);
      const title = firstMatch(entry, /<title>([\s\S]*?)<\/title>/);
      const published = firstMatch(entry, /<published>(.*?)<\/published>/);
      const description = firstMatch(
        entry,
        /<media:description>([\s\S]*?)<\/media:description>/
      );

      if (!youtubeId || !title) return null;

      return {
        youtubeId,
        title,
        date: published.slice(0, 10),
        description: trimDescription(description),
        resources: EPISODE_RESOURCES[youtubeId],
      };
    })
    .filter(Boolean)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((episode, index, all) => ({
      ...episode,
      // Newest keeps the highest number, so EP 01 stays EP 01 as the show grows.
      number: all.length - index,
    }));
};

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(FEED_URL, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Feed responded ${response.status}`);
    }

    const episodes = parseFeed(await response.text());
    if (episodes.length === 0) {
      throw new Error('Feed contained no usable entries');
    }

    // Serve the cached copy instantly and refresh in the background, so a slow
    // or failing feed never blocks a visitor.
    res.setHeader(
      'Cache-Control',
      `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=86400`
    );
    return res.status(200).json({ episodes });
  } catch (error) {
    // The page falls back to its bundled copy, so log and fail quietly.
    console.error('Episode feed unavailable:', error);
    return res.status(503).json({ error: 'Episode list is unavailable right now.' });
  } finally {
    clearTimeout(timeout);
  }
};
