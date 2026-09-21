import React from 'react';
import { activeChannels } from '../../data/podcast';

/**
 * Outlined pills linking the show on each listening platform.
 * Wraps to as many rows as the viewport needs.
 */
export const ChannelLinks = () => (
  <ul className="flex flex-wrap justify-center gap-3 sm:gap-4 list-none">
    {activeChannels().map((channel) => (
      <li key={channel.label}>
        <a
          href={channel.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center min-h-[44px] px-5 sm:px-7 py-3 border border-text-primary/60 rounded-full font-corporate text-xs sm:text-sm font-medium uppercase tracking-wider text-text-primary transition-all duration-300 hover:border-primary-500 hover:text-primary-500 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2"
        >
          <span aria-hidden="true">{channel.label}</span>
          <span className="sr-only">{`Listen on ${channel.label} (opens in a new tab)`}</span>
        </a>
      </li>
    ))}
  </ul>
);
