import React from 'react';
import { PODCAST_ARTWORK, PODCAST_TITLE } from '../../data/podcast';

/**
 * Square show artwork for the home page section. Falls back to a titled
 * placeholder tile while no real image has been supplied, so the layout can
 * be reviewed before the artwork exists.
 */
export const PodcastArtwork = () => {
  const frame =
    'aspect-square w-full overflow-hidden rounded-2xl shadow-xl shadow-primary-400/20';

  if (!PODCAST_ARTWORK.src) {
    return (
      <div
        className={`${frame} bg-gradient-to-br from-primary-300 to-primary-400 flex flex-col items-center justify-center text-center px-6`}
      >
        <span className="font-heading text-2xl sm:text-3xl font-medium text-white leading-tight">
          {PODCAST_TITLE}
        </span>
        <span className="font-corporate text-[0.7rem] uppercase tracking-widest text-white/80 mt-3">
          Cover art coming soon
        </span>
      </div>
    );
  }

  return (
    <div className={frame}>
      <picture>
        {PODCAST_ARTWORK.webp && (
          <source srcSet={PODCAST_ARTWORK.webp} type="image/webp" />
        )}
        {/*
          Eager: this sits directly below the hero, so a lazy image would
          visibly pop in as the section scrolls into view.
        */}
        <img
          src={PODCAST_ARTWORK.src}
          alt={PODCAST_ARTWORK.alt}
          width={800}
          height={800}
          className="w-full h-full object-cover"
        />
      </picture>
    </div>
  );
};
