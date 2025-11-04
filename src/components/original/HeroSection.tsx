import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useNewsletter } from '../../contexts/NewsletterContext';

export const HeroSection = () => {
  const photoAnimation = useScrollAnimation();
  const titleAnimation = useScrollAnimation();
  const { isNewsletterVisible } = useNewsletter();

  return (
    <section
      className={`relative bg-gradient-to-br from-white via-primary-50/30 to-primary-100/20 pb-16 overflow-hidden transition-all duration-300 ${
        isNewsletterVisible ? 'pt-32' : 'pt-20'
      }`}
    >
      {/* Simple background consistent with other pages */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-primary-400/3 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 -right-48 w-80 h-80 bg-primary-500/4 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary-300/2 rounded-full animate-pulse delay-500"></div>
      </div>

      {/* True edge-to-edge layout - No gaps, no containers */}
      <div className="w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-0 items-center min-h-[50vh]">

          {/* Left - Photo section extending to edge */}
          <div className="relative">
            <div
              ref={photoAnimation.ref}
              className={`relative h-full min-h-[50vh] transition-all duration-700 ${
                photoAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              {/* Photo with optimized, smaller sizing */}
              <div className="h-full w-full relative flex items-center justify-center px-6 lg:px-8">
                <div className="mx-auto lg:mx-0 w-56 sm:w-64 md:w-80 lg:w-full max-w-sm">
                  <div className="aspect-[3/4] max-h-[70vh] sm:max-h-[75vh] md:max-h-[80vh] rounded-3xl overflow-hidden relative shadow-2xl hover:shadow-3xl transition-all duration-700">
                    <img
                      src="/3.JPG"
                      alt="Jessie Li Professional Headshot"
                      className="w-full h-full object-cover object-center md:object-top sm:scale-100 md:scale-105 hover:scale-100 transition-transform duration-700"
                      style={{
                        filter: 'contrast(1.05) brightness(1.02) saturate(1.08)',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Text section extending to edge with optimized spacing */}
          <div className="relative bg-primary-50/30">
            <div
              ref={titleAnimation.ref}
              className={`h-full min-h-[50vh] flex flex-col justify-center px-6 lg:px-8 xl:px-12 py-12 lg:py-16 transition-all duration-700 delay-200 ${
                titleAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              {/* Main title - Clean and impactful with better vertical spacing */}
              <h1 className="text-6xl md:text-8xl font-heading font-medium text-text-primary leading-[0.85] mb-8 tracking-tight">
                DANCING WITH<br />
                <span className="text-primary-500">WOLVES</span>
              </h1>

              {/* Subtitle - Minimalist with generous spacing */}
              <p className="text-lg md:text-xl lg:text-2xl text-text-secondary font-corporate font-medium max-w-2xl leading-relaxed mb-12">
                Engaging Feminine Power to Master Authentic Leadership
              </p>

              {/* Clean CTA with proper spacing */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/book"
                  className="bg-gradient-to-r from-primary-400 to-primary-500 text-white py-4 px-12 rounded-full text-lg md:text-xl font-corporate font-bold transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-400/50 shadow-xl shadow-primary-400/40 uppercase tracking-wider text-center"
                >
                  Coming Soon
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};