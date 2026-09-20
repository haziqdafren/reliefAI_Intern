import React, { useState } from 'react';

interface EpisodeThumbnailProps {
  youtubeId: string;
  title: string;
  /** Extra classes for the aspect-ratio wrapper. */
  className?: string;
}

/**
 * Privacy-friendly host: no cookie is set until the video actually plays.
 */
const embedUrl = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;

/**
 * 16:9 episode thumbnail.
 *
 * Clicking it swaps the still image for an embedded player, so the episode
 * plays in place rather than sending the viewer to another tab. The iframe is
 * only mounted after that click — twelve thumbnails would otherwise each load
 * a player on page load.
 *
 * Renders a neutral placeholder when no video ID exists yet, so the layout can
 * be reviewed before real IDs are available.
 */
export const EpisodeThumbnail: React.FC<EpisodeThumbnailProps> = ({
  youtubeId,
  title,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

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

  if (isPlaying) {
    return (
      <div className={wrapper}>
        <iframe
          src={embedUrl(youtubeId)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsPlaying(true)}
      className={`${wrapper} group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2`}
      aria-label={`Play "${title}"`}
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
          <svg className="w-5 h-5 text-primary-500 ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
};
