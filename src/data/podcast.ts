// Podcast content.
//
// Episode titles, dates, descriptions and YouTube IDs are taken from the
// channel feed (youtube.com/@LeadWithBalance). Descriptions are verbatim up to
// the chapter list and social-link block, which the page omits.
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

/**
 * Where the show can be followed. Order is preserved in the UI.
 *
 * A channel with a '#' url has no real link yet and is hidden rather than
 * rendered as a button that goes nowhere — fill the url in to reveal it.
 */
export const PODCAST_CHANNELS: PodcastChannel[] = [
  { label: 'Spotify', url: 'https://open.spotify.com/show/5mr3M8S0NGuLCtvZAvWhL3', icon: 'spotify', isPrimary: true },
  { label: 'YouTube', url: 'https://www.youtube.com/@LeadWithBalance', icon: 'youtube', isPrimary: true },
  { label: 'Apple Podcast', url: 'https://podcasts.apple.com/us/podcast/lead-with-balance-with-jessie-li/id6802936159', icon: 'apple', isPrimary: true },
  { label: 'Amazon Music', url: '#', icon: 'amazon' },
];

/** Channels that have a real link yet. */
export const activeChannels = (channels: PodcastChannel[] = PODCAST_CHANNELS) =>
  channels.filter((channel) => channel.url && channel.url !== '#');

export const PODCAST_TITLE = 'Lead With Balance';
export const PODCAST_TAGLINE =
  'Conversations with women who lead without losing themselves.';
export const PODCAST_CADENCE = 'New episodes every other Tuesday';

/**
 * Show artwork for the home page section. `webp` is served to browsers that
 * support it, with `src` as the fallback. While `src` is empty the section
 * falls back to a titled placeholder tile.
 */
export const PODCAST_ARTWORK: { src: string; webp?: string; alt: string } = {
  src: '/podcast-cover.jpg',
  webp: '/podcast-cover.webp',
  alt: `Cover art for the ${PODCAST_TITLE} podcast: Jessie Li in a navy pinstripe blazer`,
};

/** Newest first. The page renders them in this order. */
export const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    number: 4,
    title: 'Liz Bradford: When Working Harder Stops Working',
    date: '2026-09-17',
    description: 'High-achieving women are rewarded for sprinting from day one—saying yes to everything, working twice as hard, and putting everyone else first. Until the system that got you here starts working against you.\n\nIn this episode of Lead with Balance, host Jessie Li sits down with Liz Bradford, former MD and COO in global banking (HSBC, Bank of America), performance coach, qualified trainer, and co-founder of Maia. After 21 years at the top, Liz burned out twice—once in London, then again after moving to Australia thinking a “relaxed” new life would fix it. Changing countries, jobs, and industries didn’t work. The problem wasn’t the environment. It was the playbook.\n\nLiz shares the advice she wishes someone had given her in her 20s: your career is a marathon, not a sprint. She breaks down:\nWhy taking time off isn’t enough—and what actually rebuilds you from burnout\nThe four pillars of wellbeing (and the one she added herself)\nHow to draw boundaries when you’re time-poor, in a male-dominated industry, and everyone’s urgent problem becomes yours\nFinding purpose without quitting your job (values + strengths + passion)\nThe physical protocols that actually work for high-performing women—especially after 35: protein targets, strength training over cardio, morning fuel to flatten cortisol, why calorie counting and long-term intermittent fasting often backfire, and simple supplements that support energy, muscle, and hormones\nPractical, evidence-based tools you can implement even when you’re exhausted, overcommitted, and still expected to outperform.\n\nIf you’ve done everything right on paper and still feel like something fundamental isn’t working, this conversation is for you.\n\nListen if you’re a high-achieving woman (corporate leader, entrepreneur, or rising talent) navigating high-stress environments, the sandwich generation, perimenopause, or the quiet question: Why am I still this tired?',
    youtubeId: 'mzf-nNNhX90',
  },
  {
    number: 3,
    title: 'Turn Burnout Into Growth: How to Rewire Your Mind for Success',
    date: '2026-09-11',
    description: 'Success in the corporate world often demands our complete dedication, but what happens when life throws everything at you all at once? In this episode of Lead with Balance, I sit down with Sanam Thakur, cognitive neuroscience expert and the founder of the "Rethink Lab", to unpack the reality of chronic stress and the neuroscience of resilience.\n\nAs high-achieving professionals, we are conditioned to keep climbing the ladder, even when facing profound personal losses or internal struggles. We push through burnout, ignore our foundational needs, and continue to perform. But what happens when that relentless drive collides with major life shifts?\n\nIn this episode, we dive deep into the convergence of major life events she experienced about 10 years ago: getting married, receiving a massive corporate promotion, and losing her mother. She reveals how these simultaneous events led to chronic stress, ultimately forcing her to step away from her career to rebuild her foundational self-awareness.\n\nIf you\'ve ever struggled to balance personal grief with professional expectations, or simply want to understand the science behind regaining control of your mind—this story will inspire you to rebuild your life.\n\nIn this episode, you will learn:\nThe Neuroscience of Flow: Understanding the critical differences between flow states and stress states in our daily lives.\nRedefining Resilience: Why Sanam shifted her core driver from achievement to resilience after the passing of her mother.\nMental Scaffolding: How to identify your intrinsic values to build a sustainable psychological framework to overcome chronic stress.\nNavigating Non-Linear Paths: Lessons learned from dropping out, returning to graduate, and learning that resilience means maintaining a sense of balance while constantly moving forward.',
    youtubeId: 'FUu1wLMKkGs',
    resources: [
      { label: 'Identify Your Core Intrinsic Values exercise', url: 'https://therethin.kit.com/67f53a9b69', meta: 'Free download' },
    ],
  },
  {
    number: 2,
    title: 'The Cost of Perfectionism: How to Achieve More by Stressing Less',
    date: '2026-09-03',
    description: 'Perfectionism is often worn like a badge of honor in the corporate world, but at what cost? In this episode of Lead with Balance, I sit down with Dr. Claire Christopher to unpack the hidden dangers of chronic overachievement.\n\nAs high-achieving women, we are conditioned to wear masks. We put on our armor to survive in hyper-competitive, male-dominated industries, we strive for perfection to out-perform expectations, and we constantly put everyone else—our bosses, our partners, our children—before ourselves. But what happens when that relentless drive leads to burnout?\n\nClaire Christopher is a clinical psychologist, relationship counsellor, and clinical hypnotherapist with over 16 years of experience, currently serving as a Counsellor at Psynamo Group Limited and the President of the Psychotherapy Society of Hong Kong. Before dedicating her practice to helping high-performing professionals break the cycle of toxic perfectionism, she spent 20 years navigating the intense, fast-paced finance industries of the UK and Hong Kong. She shares her unfiltered clinical expertise and personal journey to help us redefine our relationship with success. We dive deep into the impossible "rules" we unconsciously set for ourselves, how childhood protective mechanisms trap us in a cycle of overworking, and the courageous steps it takes to rebuild your life around your true values. She also provides a quick 20-question assessment to help you determine if perfectionism is becoming a problem for you.\n\nIf you\'ve ever felt the pressure to over-perform, struggled with the crushing weight of societal expectations, or simply forgot how to recharge yourself—this story will inspire you to reclaim your identity.\n\nIn this episode, you will learn:\n- The "Tipping Line": How to recognize when healthy ambition crosses into toxic perfectionism, triggering lack of sleep, anxiety, and relationship breakdowns.\n- The Three Perfectionist Rules: A deep dive into Identity, Fear of Evaluation, and Relational Responsibility—and how these mechanisms trap high-achieving women.\n- The "4,000 Weeks" Mindset: A powerful perspective shift to stop postponing joy and start prioritizing what truly matters in our short lives.\n- Sustainable Ambition: Practical, easy-to-implement protocols to start saying "not now" and make room for true restorative rest.',
    youtubeId: 'sUf9V88CnsI',
    resources: [
      { label: 'Are You a Perfectionist — self-check quiz', url: 'https://bit.ly/4h7DOSj', meta: 'PDF' },
    ],
  },
  {
    number: 1,
    title: 'Jessie Li: Escaping Corporate Burnout & The Intimate Truth I’ve Never Shared',
    date: '2026-08-27',
    description: 'For the first time ever, the microphone is turned on me.\n\nIn this very special, completely unscripted second episode of Lead with Balance, I handed the interviewer\'s chair over to a close friend and agreed to answer whatever they asked me. No pre-screened questions. No preparation. Just the raw, unfiltered truth.\n\nAs high-achieving women, we are conditioned to wear masks. We put on our armor to survive in hyper-competitive, male-dominated industries, we strive for perfection to out-perform expectations, and we constantly put everyone else—our bosses, our partners, our children—before ourselves. But what happens when the mask becomes too heavy?\n\nFrom navigating the hyper-intense world of investment banking to experiencing severe corporate burnout, I share my unfiltered journey of leaving a traditional career behind. We dive deep into the heavy reality of mom guilt, navigating a failing marriage while trying to keep it all together, and the courageous steps it takes to rebuild your life around your true passions.\n\nIf you\'ve ever felt the pressure to over-perform, struggled with the crushing weight of societal expectations, or simply forgot how to recharge yourself—this story will inspire you to reclaim your identity.\n\nIn this episode, you will learn:\n- The "Tabletop Strategy": A practical, easy-to-implement framework to catch and prevent corporate burnout before it breaks you.\n- Somatic Release: How high-stress environments trap trauma in your body, and the exact physical protocols to release it.\n- The "North Star Method": A powerful tool to cut through the noise of people-pleasing and reconnect with your authentic self.\n- How to navigate the impossible double standards placed on working mothers without losing your mind.',
    youtubeId: 'Ab2vChBU0uA',
  },
];
