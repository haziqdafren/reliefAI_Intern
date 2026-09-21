import React from 'react';
import {
  HeroSection,
  AboutSection,
  PodcastSection,
  JournalSection,
  BalanceSection,
  CoachingSection,
  TestimonialsSection,
} from '../components';

export const HomePage = () => {
  return (
    <>
      <HeroSection />
      <PodcastSection />
      <AboutSection />
      <JournalSection />
      <BalanceSection />
      <CoachingSection />
      <TestimonialsSection />
    </>
  );
};