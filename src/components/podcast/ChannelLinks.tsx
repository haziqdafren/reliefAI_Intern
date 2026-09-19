import React from 'react';
import { PODCAST_CHANNELS } from '../../data/podcast';

/**
 * Outlined pills linking the show on each listening platform.
 * Wraps to as many rows as the viewport needs.
 */
export const ChannelLinks = () => (
  <ul className="flex flex-wrap justify-center gap-3 sm:gap-4 list-none">
    {PODCAST_CHANNELS.map((channel) => (
      <li key={channel.label}>
        <a
          href={channel.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-5 sm:px-7 py-3 border border-text-primary/25 rounded-full font-corporate text-xs sm:text-sm font-medium uppercase tracking-wider text-text-primary transition-all duration-300 hover:border-primary-400 hover:text-primary-500 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
        >
          {channel.label}
        </a>
      </li>
    ))}
  </ul>
);
