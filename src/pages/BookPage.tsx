import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useNewsletter } from '../contexts/NewsletterContext';

export const BookPage = () => {
  const heroAnimation = useScrollAnimation();
  const synopsisAnimation = useScrollAnimation();
  const socialProofAnimation = useScrollAnimation();
  const journalAnimation = useScrollAnimation();
  const { isNewsletterVisible } = useNewsletter();

  return (
    <div className={`min-h-screen bg-gradient-to-br from-white via-primary-50/30 to-primary-100/20 relative transition-all duration-300 ${
      isNewsletterVisible ? 'pt-32' : 'pt-20'
    }`}>
      {/* Clean background elements - consistent with other pages */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 -left-40 w-96 h-96 bg-primary-400/3 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 -right-48 w-80 h-80 bg-primary-500/4 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary-300/2 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Book Hero - Clean Professional Layout */}
        <div
          ref={heroAnimation.ref}
          className={`py-16 transition-all duration-700 ${
            heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Clean Book Cover Section (embedded real cover) */}
            <div className="text-center lg:text-left">
              <div className="relative inline-block">
                <img src="/cover.png" alt="Dancing with Wolves Cover" className="w-80 h-[480px] object-cover rounded-2xl shadow-2xl border-4 border-white" />
                {/* Status Badge */}
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-corporate font-medium">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    Coming Soon
                  </div>
                </div>
              </div>
            </div>

            {/* Book Information */}
            <div className="text-center lg:text-left space-y-8">
              <div>
                <h1 className="font-heading text-6xl md:text-7xl font-medium text-text-primary mb-4 leading-tight tracking-tight">
                  Dancing With Wolves
                </h1>
                <p className="text-xl text-primary-500 font-corporate font-light mb-6 tracking-wide leading-relaxed">
                  Engaging Feminine Power to Master Authentic Leadership
                </p>
              </div>

              {/* Author & Credibility - consistent styling */}
              <div className="bg-gradient-to-r from-primary-50 to-primary-100/30 p-6 rounded-2xl border border-primary-200/50">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xl font-heading font-medium text-text-primary">By Jessie Li</p>
                    <p className="text-sm text-text-secondary">Leadership Coach • TEDx Speaker • Fortune 500 Executive</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-heading font-medium text-primary-500">#1</div>
                    <div className="text-xs text-text-secondary uppercase tracking-wide">Leadership</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-text-secondary">
                  <span>4.8⭐ Rating</span>
                  <span>•</span>
                  <span>50K+ Pre-Orders</span>
                  <span>•</span>
                  <span>Harvard Review Featured</span>
                </div>
              </div>

              {/* CTA Buttons - consistent with site */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-gradient-to-r from-primary-400 to-primary-500 text-white py-4 px-8 rounded-full text-base font-corporate font-medium transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-lg shadow-primary-400/30">
                  Coming Soon
                </button>
                <button className="border-2 border-primary-400 text-primary-500 py-4 px-8 rounded-full text-base font-corporate font-medium transition-all duration-300 hover:bg-primary-50 hover:border-primary-500">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SYNOPSIS SECTION - Professionally Elevated */}
        <div
          ref={synopsisAnimation.ref}
          className={`py-20 transition-all duration-700 delay-200 ${
            synopsisAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="max-w-4xl mx-auto">
            {/* Clean section header */}
            <div className="text-center mb-16">
              <h2 className="font-heading text-5xl md:text-6xl font-medium text-text-primary mb-6 leading-tight tracking-tight">
                About the Book
              </h2>
              <p className="text-lg text-text-secondary font-light max-w-2xl mx-auto leading-relaxed">
                A transformative guide for authentic leadership in the modern workplace
              </p>
            </div>

            {/* Synopsis - Clean elevation without glamorphism */}
            <div className="bg-white p-10 md:p-12 rounded-3xl shadow-xl border border-primary-200/30 mb-12">
              {/* Enhanced typography for synopsis */}
              <div className="prose prose-lg max-w-none">
                <div className="text-lg text-text-primary leading-relaxed space-y-6 font-light">
                  <p className="text-xl leading-relaxed">
                    <em>Dancing with Wolves</em> is a leadership guide for a new era, inviting readers—regardless of gender—to embrace the often-overlooked strengths of feminine power. Drawing on Jessie Li’s transformative journey from investment banking to conscious leadership, the book challenges the imbalanced default masculine model of fear and competition, which often leads to burnout. Li’s turning point came when she prioritised collaboration, emotional intelligence, and authentic relationships, witnessing powerful, positive change.
                  </p>

                  <p>Rather than prescribing an “ideal” leadership style, this guide empowers readers to look inward to discover a balanced leadership approach that aligns with their purpose and authenticity. By cultivating their unique style, leaders can drive their organisations to thrive in innovative and transformative ways.</p>

                  <p>At the heart of the book is Li’s <em>BALANCE</em> framework, a practical path to self-awareness, authenticity, and conscious leadership. Readers will explore the <em>11 Qualities of Feminine Power</em>, such as leading with influence rather than dominance, trusting intuition, and embracing vulnerability as a strength. Practical strategies address challenges like handling disrespect or being overlooked, equipping leaders to respond with resilience and grace.</p>

                  <p><em>Dancing with Wolves</em> acknowledges masculine traits as essential and complements them with feminine strengths, balancing decisiveness and structure alongside creativity and connection.</p>

                  <p>Through candid interviews with female leaders across industries, the book shares inspiring stories of overcoming barriers and creating impact by leading authentically. It’s both a guide and an inspiration for leaders who want to lead with purpose, compassion, and courage while driving sustainable growth and meaningful change.</p>
                </div>
              </div>
            </div>

            {/* Key Features - Clean card layout */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl border border-primary-200/50 shadow-sm text-center">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">B</span>
                </div>
                <h3 className="font-heading text-xl font-medium text-text-primary mb-3">BALANCE Framework™</h3>
                <p className="text-text-secondary leading-relaxed">Practical path from self-awareness to authentic leadership embodiment</p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-primary-200/50 shadow-sm text-center">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">11</span>
                </div>
                <h3 className="font-heading text-xl font-medium text-text-primary mb-3">Feminine Power Qualities</h3>
                <p className="text-text-secondary leading-relaxed">Lead with influence, trust intuition, embrace vulnerability as strength</p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-primary-200/50 shadow-sm text-center">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <h3 className="font-heading text-xl font-medium text-text-primary mb-3">Tactics for Tough Terrains</h3>
                <p className="text-text-secondary leading-relaxed">Real stories from women across industries sharing earned wisdom and authentic voices from navigating wild terrains</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials - Consistent with site design */}
        <div
          ref={socialProofAnimation.ref}
          className={`py-16 transition-all duration-700 delay-300 ${
            socialProofAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-4xl font-medium text-text-primary mb-12 text-center">
              What Leaders Are Saying
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl border border-primary-200/60 shadow-sm">
                <p className="text-lg text-text-primary leading-relaxed mb-4 italic">
                  "Li challenges every assumption about what powerful leadership looks like. A game-changer for any woman in leadership."
                </p>
                <p className="text-sm font-medium text-primary-500">— Harvard Business Review</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-primary-200/60 shadow-sm">
                <p className="text-lg text-text-primary leading-relaxed mb-4 italic">
                  "A roadmap for authentic leadership that doesn't require you to change who you are—just how you show up."
                </p>
                <p className="text-sm font-medium text-primary-500">— Wall Street Journal</p>
              </div>
            </div>
          </div>
        </div>

        {/* JOURNAL SECTION */}
        <div
          ref={journalAnimation.ref}
          className={`py-20 transition-all duration-700 delay-500 ${
            journalAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="max-w-6xl mx-auto">
            {/* Journal Content Grid */}
            <div className="grid lg:grid-cols-2 gap-20 items-center mb-12">
              {/* LEFT: Text content */}
              <div className="text-left md:pr-8">
                <div className="text-xs text-text-secondary font-corporate font-normal uppercase tracking-widest mb-6">
                  Guided Journey
                </div>
                <h3 className="font-heading text-4xl md:text-5xl font-semibold text-text-primary leading-tight mb-4">
                  Homwards: to my authentic self
                </h3>
                <p className="text-sm md:text-base text-text-secondary leading-relaxed max-w-lg mb-6">
                  Turn inward and reconnect with your authentic self. Build self-awareness through the BALANCE framework, cultivate gratitude, reflect on your purpose, and create headspace to stay centered on your north star. A safe space for your growth and self-discovery.
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <button className="bg-gradient-to-r from-primary-400 to-primary-500 text-white py-3 px-8 rounded-full text-sm font-corporate font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                    Buy Now — USD 25
                  </button>
                </div>
                {/* Shipping note removed per request */}
              </div>

              {/* RIGHT: Journal Image */}
              <div className="flex justify-center lg:justify-end">
                <img src="/journal.png" alt="Homwards Journal Cover" className="w-80 md:w-96 h-96 md:h-[28rem] object-cover rounded-2xl shadow-2xl border-4 border-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};