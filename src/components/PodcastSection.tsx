import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { EpisodeThumbnail } from './podcast/EpisodeThumbnail';
import {
  PODCAST_EPISODES,
  PODCAST_TITLE,
  PODCAST_TAGLINE,
} from '../data/podcast';

const FEATURED_COUNT = 3;

/**
 * Home page teaser: the three most recent episodes plus a link to the
 * full podcast page.
 */
export const PodcastSection = () => {
  const headerAnimation = useScrollAnimation();
  const gridAnimation = useScrollAnimation();

  const featured = PODCAST_EPISODES.slice(0, FEATURED_COUNT);

  return (
    <section className="py-20 sm:py-24 bg-[#F7F4EF]" id="podcast">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div
          ref={headerAnimation.ref}
          className={`text-center mb-12 transition-all duration-700 ${
            headerAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="font-corporate text-xs uppercase tracking-widest text-text-secondary mb-4">
            The Podcast
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-medium text-text-primary mb-4 leading-tight">
            {PODCAST_TITLE}
          </h2>
          <p className="font-corporate text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            {PODCAST_TAGLINE}
          </p>
        </div>

        <div
          ref={gridAnimation.ref}
          className={`transition-all duration-700 delay-150 ${
            gridAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 lg:gap-8">
            {featured.map((episode) => (
              <article key={episode.number}>
                <EpisodeThumbnail youtubeId={episode.youtubeId} title={episode.title} />
                <p className="font-corporate text-xs uppercase tracking-widest text-text-secondary mt-4 mb-2">
                  EP {String(episode.number).padStart(2, '0')}
                </p>
                <h3 className="font-heading text-lg sm:text-xl font-medium text-text-primary leading-snug">
                  {episode.title}
                </h3>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/podcast"
              className="inline-block bg-gradient-to-r from-primary-400 to-primary-500 text-white py-3 px-8 rounded-full text-xs md:text-sm font-corporate font-medium uppercase tracking-wider transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-400/40 shadow-lg shadow-primary-400/30"
            >
              See all episodes
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
