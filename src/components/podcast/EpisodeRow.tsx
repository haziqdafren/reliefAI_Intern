import React, { useId, useState } from 'react';
import { PodcastEpisode } from '../../data/podcast';
import { EpisodeThumbnail } from './EpisodeThumbnail';

interface EpisodeRowProps {
  episode: PodcastEpisode;
}

const formatDate = (iso: string) => {
  const parsed = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return iso;
  return parsed.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const youtubeWatchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;

/**
 * One episode in the list: thumbnail, title, expandable description and
 * resource downloads, plus a watch action.
 *
 * Stacks vertically on phones and becomes a three-column row from `md` up.
 */
export const EpisodeRow: React.FC<EpisodeRowProps> = ({ episode }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const panelId = useId();
  const titleId = useId();

  return (
    <article aria-labelledby={titleId} className="py-8 sm:py-10 border-b border-primary-300">
      <div className="flex flex-col md:flex-row md:items-start gap-5 sm:gap-6 md:gap-8">
        {/* Thumbnail — fixed share of the row on wider screens */}
        <div className="w-full md:w-64 lg:w-72 md:flex-shrink-0">
          <EpisodeThumbnail youtubeId={episode.youtubeId} title={episode.title} />
        </div>

        {/* Episode number — its own column on large screens only */}
        <div className="hidden lg:block lg:flex-shrink-0 lg:pt-1">
          <span className="font-corporate text-xs uppercase tracking-widest text-text-secondary">
            EP {String(episode.number).padStart(2, '0')}
          </span>
        </div>

        {/* Title, meta and expandable detail */}
        <div className="flex-1 min-w-0">
          <p className="lg:hidden font-corporate text-xs uppercase tracking-widest text-text-secondary mb-2">
            EP {String(episode.number).padStart(2, '0')}
          </p>

          <h3 id={titleId} className="font-heading text-xl sm:text-2xl lg:text-3xl font-medium text-text-primary leading-snug mb-3">
            {episode.title}
          </h3>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <button
              type="button"
              onClick={() => setIsExpanded((open) => !open)}
              aria-expanded={isExpanded}
              aria-controls={panelId}
              className="inline-flex items-center gap-1.5 min-h-[44px] -my-2 font-corporate text-sm text-text-primary transition-colors duration-300 hover:text-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 rounded-sm"
            >
              <span className="border-b border-text-primary/70 pb-0.5">{isExpanded ? 'Read less' : 'Read more'}</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <time
              dateTime={episode.date}
              className="font-corporate text-sm text-text-secondary"
            >
              {formatDate(episode.date)}
            </time>
          </div>

          {/* Expanded detail */}
          {/* `hidden` keeps the panel out of the a11y tree when collapsed.
              Opacity is state-driven so the fade runs on every toggle, not
              just the first mount. */}
          <div
            id={panelId}
            hidden={!isExpanded}
            className={`mt-5 max-w-2xl transition-opacity duration-300 ${
              isExpanded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="font-corporate text-base text-text-secondary leading-relaxed">
              {episode.description}
            </p>

            {episode.resources && episode.resources.length > 0 && (
              <div className="mt-6">
                <p className="font-corporate text-xs uppercase tracking-widest text-text-secondary mb-3">
                  Episode resources
                </p>
                <ul className="space-y-1 list-none">
                  {episode.resources.map((resource) => (
                    <li key={resource.label}>
                      <a
                        href={resource.url}
                        {...(resource.url && resource.url !== '#' ? { download: true } : {})}
                        className="inline-flex items-center gap-2 min-h-[44px] font-corporate text-sm text-text-primary transition-colors duration-300 hover:text-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 rounded-sm"
                      >
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="underline decoration-text-primary/60 underline-offset-4">
                          {resource.label}
                        </span>
                        <span className="text-text-secondary text-xs">
                          ({resource.meta ?? 'download'})
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Watch action — right-aligned on desktop, inline on mobile */}
        {episode.youtubeId && (
          <div className="md:flex-shrink-0 md:pt-1">
            <a
              href={youtubeWatchUrl(episode.youtubeId)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-[44px] font-corporate text-sm font-medium uppercase tracking-wider text-text-primary transition-colors duration-300 hover:text-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 rounded-sm"
            >
              <span aria-hidden="true">Watch</span>
              <span className="sr-only">{`Watch "${episode.title}" on YouTube (opens in a new tab)`}</span>
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </article>
  );
};
