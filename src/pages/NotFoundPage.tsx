import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useNewsletter } from '../contexts/NewsletterContext';

export const NotFoundPage = () => {
  const { isNewsletterVisible } = useNewsletter();
  const heroAnimation = useScrollAnimation();
  const linksAnimation = useScrollAnimation();

  return (
    <div className={`min-h-screen bg-gradient-to-br from-white via-primary-50/30 to-primary-100/20 relative overflow-hidden transition-all duration-300 ${
      isNewsletterVisible ? 'pt-32' : 'pt-20'
    }`}>
      {/* Background elements - consistent with other pages */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-primary-400/3 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 -right-48 w-80 h-80 bg-primary-500/4 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary-300/2 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        {/* Hero Section */}
        <div
          ref={heroAnimation.ref}
          className={`py-20 text-center transition-all duration-700 ${
            heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="font-heading text-9xl md:text-[12rem] font-medium text-primary-400/20 leading-none">
              404
            </h1>
          </div>

          <div className="bg-primary-400/10 text-primary-400 py-2 px-6 rounded-full text-sm font-medium uppercase tracking-wider inline-block mb-6 border border-primary-400/20">
            Page Not Found
          </div>

          <h2 className="font-heading text-4xl md:text-6xl font-medium text-text-primary mb-6 leading-tight">
            Oops! This Page Doesn't Exist
          </h2>

          <p className="text-lg md:text-xl text-text-secondary mb-8 font-light max-w-2xl mx-auto leading-relaxed">
            The page you're looking for might have been moved, deleted, or never existed. Let's get you back on track.
          </p>

          {/* Divider */}
          <div className="flex items-center justify-center my-8">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent"></div>
            <div className="mx-4">
              <div className="w-3 h-3 bg-primary-400 rounded-full"></div>
            </div>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent"></div>
          </div>
        </div>

        {/* Navigation Links */}
        <div
          ref={linksAnimation.ref}
          className={`pb-20 transition-all duration-700 delay-300 ${
            linksAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-primary-200 shadow-lg">
            <h3 className="font-heading text-2xl md:text-3xl font-medium text-text-primary mb-6 text-center">
              Where Would You Like to Go?
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Home */}
              <Link
                to="/"
                className="group p-6 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl border border-primary-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-corporate font-bold text-lg text-text-primary mb-2">
                      Home
                    </h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      Return to the homepage and explore authentic leadership resources
                    </p>
                  </div>
                </div>
              </Link>

              {/* About */}
              <Link
                to="/about"
                className="group p-6 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl border border-primary-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-corporate font-bold text-lg text-text-primary mb-2">
                      About Jessie
                    </h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      Learn about the BALANCE framework and authentic leadership
                    </p>
                  </div>
                </div>
              </Link>

              {/* Journal */}
              <Link
                to="/journal"
                className="group p-6 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl border border-primary-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-corporate font-bold text-lg text-text-primary mb-2">
                      Journal
                    </h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      Discover the guided journal for self-discovery
                    </p>
                  </div>
                </div>
              </Link>

              {/* Connect */}
              <Link
                to="/connect"
                className="group p-6 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl border border-primary-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-corporate font-bold text-lg text-text-primary mb-2">
                      Connect
                    </h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      Get in touch for coaching, speaking, or inquiries
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Back to Home CTA */}
            <div className="mt-8 text-center">
              <Link
                to="/"
                className="inline-block bg-gradient-to-r from-primary-400 to-primary-500 text-white py-4 px-10 rounded-full font-corporate font-medium text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-400/40 shadow-lg shadow-primary-400/30 uppercase tracking-wider"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
