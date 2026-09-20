// Podcast content.
//
// PLACEHOLDER CONTENT — every value below is provisional and awaiting review.
// Replace the copy, dates, YouTube IDs and channel URLs with the real ones.
//
// When this moves to Airtable, keep these types as the component contract:
// the page only depends on the shapes below, not on where the data comes from.

export interface PodcastResource {
  label: string;
  /** Public URL of the downloadable file. */
  url: string;
  /** Shown next to the label, e.g. "PDF · 240 KB". Optional. */
  meta?: string;
}

export interface PodcastEpisode {
  /** Stable key. Also used as the episode number shown beside the thumbnail. */
  number: number;
  title: string;
  /** ISO date (YYYY-MM-DD) — formatted for display by the page. */
  date: string;
  /** Full description revealed by "Read more". */
  description: string;
  /** YouTube video ID. Drives both the thumbnail and the watch link. */
  youtubeId: string;
  /** Supplementary documents offered under "Read more". */
  resources?: PodcastResource[];
}

export interface PodcastChannel {
  label: string;
  url: string;
  /** Selects the platform glyph. Channels without one render label-only. */
  icon?: 'spotify' | 'youtube' | 'apple' | 'amazon';
  /** Shown in the home page's compact button row. */
  isPrimary?: boolean;
}

/** Where the show can be followed. Order is preserved in the UI. */
export const PODCAST_CHANNELS: PodcastChannel[] = [
  { label: 'Spotify', url: '#', icon: 'spotify', isPrimary: true },
  { label: 'YouTube', url: '#', icon: 'youtube', isPrimary: true },
  { label: 'Apple Podcast', url: '#', icon: 'apple', isPrimary: true },
  { label: 'Amazon Music', url: '#', icon: 'amazon' },
];

export const PODCAST_TITLE = 'Lead With Balance';
export const PODCAST_TAGLINE =
  'Conversations with women who lead without losing themselves.';
export const PODCAST_CADENCE = 'New episodes every other Tuesday';

/**
 * Show artwork for the home page section. Drop the real image into `public/`
 * and set `src` to its path (e.g. '/podcast-artwork.jpg'). While `src` is
 * empty the section falls back to a titled placeholder tile.
 */
export const PODCAST_ARTWORK: { src: string; alt: string } = {
  src: '',
  alt: `Cover art for the ${PODCAST_TITLE} podcast`,
};

/** Newest first. The page renders them in this order. */
export const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    number: 4,
    title: 'Placeholder: The Cost of Performing at Work',
    date: '2026-09-09',
    description:
      'Placeholder description. This is where the full episode summary will go — two or three paragraphs introducing the guest, the central question of the conversation, and what a listener will take away from it. The text expands in place when someone selects "Read more", so it can run long without crowding the list.',
    youtubeId: '',
    resources: [
      { label: 'Episode reflection worksheet', url: '#', meta: 'PDF' },
      { label: 'Further reading list', url: '#', meta: 'PDF' },
    ],
  },
  {
    number: 3,
    title: 'Placeholder: Leaning Into the Weaker Side',
    date: '2026-08-26',
    description:
      'Placeholder description. A second sample episode, included so the spacing, dividers and expand behaviour can be reviewed across several rows at once. Replace with the real summary.',
    youtubeId: '',
    resources: [{ label: 'Practice guide', url: '#', meta: 'PDF' }],
  },
  {
    number: 2,
    title: 'Placeholder: What Authentic Leadership Actually Costs',
    date: '2026-08-12',
    description:
      'Placeholder description. This episode has no attached documents, so the "Read more" panel shows the description alone — useful for checking that the layout holds without a resources list.',
    youtubeId: '',
  },
  {
    number: 1,
    title: 'Placeholder: Why I Started This Show',
    date: '2026-07-29',
    description:
      'Placeholder description. The opening episode. Replace this text with the real introduction to the show and what listeners can expect from it.',
    youtubeId: '',
    resources: [{ label: 'Show introduction', url: '#', meta: 'PDF' }],
  },
];
