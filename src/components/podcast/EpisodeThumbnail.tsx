import React from 'react';

interface EpisodeThumbnailProps {
  youtubeId: string;
  title: string;
  /** Extra classes for the aspect-ratio wrapper. */
  className?: string;
}

const youtubeWatchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;

/**
 * 16:9 episode thumbnail. Links out to YouTube in a new tab when an ID is
 * present; renders a neutral placeholder when it is not, so the layout can be
 * reviewed before real video IDs exist.
 */
export const EpisodeThumbnail: React.FC<EpisodeThumbnailProps> = ({
  youtubeId,
  title,
  className = '',
}) => {
  const wrapper = `relative block aspect-video w-full overflow-hidden rounded-2xl bg-primary-200 ${className}`;

  if (!youtubeId) {
    return (
      <div className={wrapper}>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-200 to-primary-300 px-4">
          <span className="font-corporate text-xs uppercase tracking-widest text-text-secondary text-center">
            Video coming soon
          </span>
        </div>
      </div>
    );
  }

  return (
    <a
      href={youtubeWatchUrl(youtubeId)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${wrapper} group focus:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2`}
      aria-label={`Watch "${title}" on YouTube (opens in a new tab)`}
    >
      <img
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Darkening veil keeps the play glyph legible over bright frames */}
      <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/25" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white/90 shadow-lg transition-transform duration-300 group-hover:scale-110">
          <svg className="w-5 h-5 text-primary-500 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </a>
  );
};
