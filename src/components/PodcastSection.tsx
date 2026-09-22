import React, { useId } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { PodcastArtwork } from './podcast/PodcastArtwork';
import { ChannelIcon } from './podcast/ChannelIcon';
import {
  activeChannels,
  PODCAST_TITLE,
  PODCAST_TAGLINE,
} from '../data/podcast';

/**
 * Home page podcast section: show artwork beside the show name, tagline and
 * the platforms it can be followed on.
 */
export const PodcastSection = () => {
  const headingId = useId();
  const artworkAnimation = useScrollAnimation();
  const contentAnimation = useScrollAnimation();

  const primaryChannels = activeChannels().filter((channel) => channel.isPrimary);

  return (
    <section
      aria-labelledby={headingId}
      className="py-24 sm:py-32 bg-[#F7F4EF]"
      id="podcast"
    >
      <div className="container mx-auto px-5 sm:px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Artwork — links through to the full podcast page */}
          <div
            ref={artworkAnimation.ref}
            className={`transition-all duration-700 ${
              artworkAnimation.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <Link
              to="/podcast"
              aria-label={`${PODCAST_TITLE} — see all episodes`}
              className="block rounded-2xl transition-transform duration-500 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-4"
            >
              <PodcastArtwork />
            </Link>
          </div>

          {/* Name, tagline and channels */}
          <div
            ref={contentAnimation.ref}
            className={`text-center md:text-left transition-all duration-700 delay-200 ${
              contentAnimation.isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-8'
            }`}
          >
            <p className="font-corporate text-xs uppercase tracking-[0.2em] text-text-secondary mb-5">
              The Podcast
            </p>

            {/* Sized to hold the title on one line down to narrow phones,
                where the wider tracking would otherwise force a wrap. */}
            <h2
              id={headingId}
              className="mb-6 leading-tight"
            >
              <Link
                to="/podcast"
                className="font-heading text-2xl sm:text-3xl md:text-[1.75rem] lg:text-[2.25rem] xl:text-[2.75rem] font-medium uppercase tracking-tight whitespace-nowrap text-text-primary transition-colors duration-300 hover:text-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-4 rounded-sm"
              >
                {PODCAST_TITLE}
              </Link>
            </h2>

            <p className="font-corporate text-base sm:text-lg text-text-secondary leading-relaxed mb-10 font-light">
              {PODCAST_TAGLINE}
            </p>

            {primaryChannels.length > 0 && (
              <ul className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4 list-none mb-10">
                {primaryChannels.map((channel) => (
                  <li key={channel.label}>
                    <a
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 min-h-[44px] px-5 sm:px-6 py-3 border border-text-primary/50 rounded-full font-corporate text-xs sm:text-sm font-medium text-text-primary transition-all duration-300 hover:border-primary-500 hover:text-primary-500 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2"
                    >
                      {channel.icon && (
                        <ChannelIcon name={channel.icon} className="w-4 h-4 shrink-0" />
                      )}
                      <span aria-hidden="true">{channel.label}</span>
                      <span className="sr-only">
                        {`Listen to ${PODCAST_TITLE} on ${channel.label} (opens in a new tab)`}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}

            <Link
              to="/podcast"
              className="inline-flex items-center justify-center min-h-[44px] bg-gradient-to-r from-primary-400 to-primary-500 text-white py-3 px-8 rounded-full text-xs md:text-sm font-corporate font-medium uppercase tracking-wider transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-400/40 shadow-lg shadow-primary-400/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2"
            >
              See all episodes
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
