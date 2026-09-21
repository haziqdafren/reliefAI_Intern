import { useEffect, useState } from 'react';
import { PODCAST_EPISODES, PodcastEpisode } from '../data/podcast';

/**
 * Episodes for the podcast page.
 *
 * Renders the bundled list immediately, then replaces it with the live feed
 * from /api/episodes once that arrives, so a newly published video appears
 * without a redeploy. The bundled copy stays on screen if the request fails —
 * a stale list is better than an empty one.
 */
export const useEpisodes = (): PodcastEpisode[] => {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>(PODCAST_EPISODES);

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/episodes', { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (Array.isArray(data?.episodes) && data.episodes.length > 0) {
          setEpisodes(data.episodes);
        }
      })
      .catch(() => {
        // Offline, aborted, or the feed is down: keep the bundled list.
      });

    return () => controller.abort();
  }, []);

  return episodes;
};
