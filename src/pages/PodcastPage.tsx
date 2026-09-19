import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ChannelLinks } from '../components/podcast/ChannelLinks';
import { EpisodeRow } from '../components/podcast/EpisodeRow';
import { SuggestGuestForm } from '../components/podcast/SuggestGuestForm';
import {
  PODCAST_EPISODES,
  PODCAST_TITLE,
  PODCAST_TAGLINE,
  PODCAST_CADENCE,
} from '../data/podcast';

export const PodcastPage = () => {
  const heroAnimation = useScrollAnimation();
  const episodesAnimation = useScrollAnimation();
  const suggestAnimation = useScrollAnimation();

  return (
    <div className="min-h-screen bg-[#F7F4EF] pt-36 sm:pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Hero */}
        <header
          ref={heroAnimation.ref}
          className={`text-center mb-14 sm:mb-16 transition-all duration-700 ${
            heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="font-corporate text-xs uppercase tracking-widest text-text-secondary mb-4">
            {PODCAST_CADENCE}
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-text-primary mb-5 leading-tight">
            {PODCAST_TITLE}
          </h1>
          <p className="font-corporate text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-10">
            {PODCAST_TAGLINE}
          </p>

          <ChannelLinks />

          <div className="mt-10">
            <a
              href="#suggest-a-guest"
              className="inline-flex items-center gap-2 min-h-[44px] font-corporate text-sm text-text-primary transition-colors duration-300 hover:text-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 rounded-sm"
            >
              <span className="border-b border-text-primary/70 pb-0.5">Suggest a future guest</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </header>

        {/* Episodes */}
        <section
          ref={episodesAnimation.ref}
          aria-labelledby="episodes-heading"
          className={`transition-all duration-700 delay-100 ${
            episodesAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2
            id="episodes-heading"
            className="font-heading text-2xl sm:text-3xl font-medium text-text-primary pb-6 border-b-2 border-text-primary"
          >
            Episodes
          </h2>

          {PODCAST_EPISODES.length > 0 ? (
            <div>
              {PODCAST_EPISODES.map((episode) => (
                <EpisodeRow key={episode.number} episode={episode} />
              ))}
            </div>
          ) : (
            <p className="py-12 font-corporate text-text-secondary">
              Episodes are on their way. Follow the show on your platform of choice to hear the first one.
            </p>
          )}
        </section>

        {/* Suggest a guest */}
        <section
          id="suggest-a-guest"
          ref={suggestAnimation.ref}
          aria-labelledby="suggest-heading"
          className={`mt-20 sm:mt-24 scroll-mt-28 transition-all duration-700 ${
            suggestAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="border-t-2 border-text-primary pt-12">
            <h2
              id="suggest-heading"
              className="font-heading text-3xl sm:text-4xl font-medium text-text-primary mb-4"
            >
              Suggest a future guest
            </h2>
            <p className="font-corporate text-base text-text-secondary leading-relaxed max-w-2xl mb-10">
              I value suggestions for future guests. Complete the form below and I&rsquo;ll take a look.
              Please note that while every suggestion is read, I&rsquo;m not always able to reply
              personally or share a status update.
            </p>

            <SuggestGuestForm />
          </div>
        </section>
      </div>
    </div>
  );
};
