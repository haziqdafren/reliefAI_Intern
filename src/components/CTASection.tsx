import React from 'react';

export const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary-400 to-primary-500 text-center text-white">
      <div className="container mx-auto px-5 max-w-4xl">
        <div className="cta-content">
          <h2 className="font-heading text-6xl md:text-8xl font-medium mb-5">
            Work With Me
          </h2>
          <p className="text-sm md:text-base mb-10 opacity-90 font-light max-w-3xl mx-auto leading-relaxed">
            I empower women across all generations to lead authentically and age gracefully through science‑based wellbeing. I combine real‑world leadership experience, cultural storytelling, and research‑backed longevity to help individuals to reconnect to their true selves, lead with clarity, and thrive in body and mind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/connect"
              className="bg-white text-primary-400 py-3 px-8 rounded-full text-xs md:text-sm font-corporate font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10"
            >
              1:1 Coaching
            </a>
            <a
              href="/connect"
              className="bg-white text-primary-400 py-3 px-8 rounded-full text-xs md:text-sm font-corporate font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10"
            >
              Speaker or Guest Appearance
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};