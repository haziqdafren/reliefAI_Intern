import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const BalanceFrameworkPage = () => {
  const heroAnimation = useScrollAnimation();

  const balanceLetters = [
    {
      letter: "B",
      word: "Build Self-Awareness",
      description: "Facilitate deep self-reflection to help leaders identify their unique blend of feminine and masculine energies. Use self-assessments to explore core strengths, values, and areas for growth.",
      deepDive: "This foundational step invites you to pause and turn inward, examining the energies that drive your leadership. Through reflective practices, journaling, and assessments, you'll uncover patterns in how you lead, communicate, and make decisions—recognizing where your feminine qualities (intuition, empathy, collaboration) and masculine qualities (decisiveness, assertiveness, action) naturally show up."
    },
    {
      letter: "A",
      word: "Affirm & Celebrate Strengths",
      description: "Affirm and celebrate both divine feminine (empathy, intuition, nurturing) and masculine (drive, decisiveness, assertiveness) qualities present. Recognize and honor the authentic self beyond stereotypical gender roles.",
      deepDive: "Too often, leaders minimize or dismiss certain aspects of themselves to fit workplace norms. This step encourages you to honor all parts of your leadership identity—celebrating your empathy as much as your strategic thinking, your nurturing nature alongside your drive for results. By affirming these strengths, you build confidence in your unique leadership signature."
    },
    {
      letter: "L",
      word: "Lean Into Your Weaker Side",
      description: "Identify the less-developed aspect of your energy (often the feminine side in male-dominated fields). Intentionally cultivate and integrate these qualities—such as receptivity, vulnerability, creativity, or collaboration—into daily leadership practice.",
      deepDive: "Growth happens at the edge of comfort. This step challenges you to identify which energies you've underutilized or suppressed—perhaps vulnerability, receptivity, or patience—and to practice leaning into them. By strengthening your 'weaker side,' you become a more versatile, resilient, and complete leader."
    },
    {
      letter: "A",
      word: "Align With Purpose",
      description: "Clarify your personal and professional purpose, connecting deeply with your 'why.' Set goals and make decisions that are congruent with your authentic self and values.",
      deepDive: "Authentic leadership flows from clarity of purpose. This step guides you to articulate what truly matters to you—your values, vision, and the impact you want to create. When your actions align with your purpose, you lead with conviction, integrity, and a sense of fulfillment that inspires others."
    },
    {
      letter: "N",
      word: "Notice Old Patterns",
      description: "Observe habitual thoughts, behaviors, and responses—especially those shaped by past conditioning or industry norms. Reflect on which patterns serve you and which may be holding you back from authentic expression.",
      deepDive: "Awareness is the gateway to transformation. Here, you'll examine the unconscious patterns that drive your behavior—the 'shoulds,' the people-pleasing, the perfectionism, or the fear of judgment. By noticing these patterns with curiosity rather than judgment, you create space to choose new, more authentic responses."
    },
    {
      letter: "C",
      word: "Cultivate New Traits",
      description: "Intentionally develop new traits and behaviors that align with your purpose and authentic leadership style. Practice these traits consistently, seeking feedback and celebrating progress.",
      deepDive: "Change requires intentional practice. This step invites you to identify specific traits or behaviors you want to develop—perhaps speaking up more, setting boundaries, or leading with vulnerability—and to practice them consistently. Through repetition, feedback, and self-compassion, these new ways of being become integrated into who you are."
    },
    {
      letter: "E",
      word: "Embody Authentic Leadership",
      description: "Integrate your unique blend of feminine and masculine energies to lead authentically. Show up as your whole self, modeling authenticity and inspiring others to do the same.",
      deepDive: "This is the culmination of your journey: showing up fully as yourself, bringing all your energies and strengths to your leadership. When you embody authentic leadership, you create environments where others feel safe to do the same. Your authenticity becomes your greatest strength, inspiring trust, connection, and collective excellence."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50/30 via-white to-primary-100/20 relative pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Hero Section */}
        <div
          ref={heroAnimation.ref}
          className={`mb-20 text-center transition-all duration-700 ${
            heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="mb-8 flex justify-center">
            <img src="/balance1.png" alt="Lead With Balance" className="h-24 w-auto object-contain" />
          </div>
          <h1 className="font-heading text-5xl md:text-7xl font-medium text-text-primary mb-6">
            The BALANCE Framework™
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary font-light max-w-4xl mx-auto mb-8 leading-relaxed">
            A transformative journey that guides leaders to integrate their unique blend of feminine and masculine energies
          </p>
          <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-primary-200/50 shadow-lg">
            <p className="text-lg md:text-xl font-corporate italic text-text-primary">
              "When you master the BALANCE Framework™, you stop choosing between power and authenticity."
            </p>
          </div>
        </div>

        {/* Timeline - Zigzag Layout */}
        <div className="relative max-w-6xl mx-auto">
          {/* Center Line - Gradient flowing down */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 via-primary-400 to-primary-500 transform -translate-x-1/2 hidden md:block"></div>

          {/* Timeline Items */}
          <div className="space-y-16">
            {balanceLetters.map((item, index) => {
              const isLeft = index % 2 === 0;
              const TimelineItem = () => {
                const animation = useScrollAnimation();

                return (
                  <div
                    ref={animation.ref}
                    className={`flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col transition-all duration-700 ${
                      animation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    {/* Content Box */}
                    <div className={`md:w-5/12 ${isLeft ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} mb-6 md:mb-0`}>
                      <div className="bg-white p-8 rounded-3xl shadow-xl border border-primary-200/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
                        <div className={`flex items-center gap-3 mb-4 ${isLeft ? 'md:justify-end' : 'md:justify-start'} justify-center`}>
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center">
                            <span className="text-xl font-heading font-bold text-white">
                              {item.letter}
                            </span>
                          </div>
                          <h3 className="font-heading text-2xl md:text-3xl font-semibold text-text-primary">
                            {item.word}
                          </h3>
                        </div>
                        <p className="text-base text-text-primary leading-relaxed mb-4">
                          {item.description}
                        </p>
                        <div className="bg-gradient-to-br from-primary-50/50 to-primary-100/30 p-4 rounded-xl border-l-4 border-primary-400">
                          <p className="text-sm text-text-secondary leading-relaxed italic">
                            {item.deepDive}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Center Circle with Letter - Larger and more prominent */}
                    <div className="md:w-2/12 flex justify-center z-10 mb-6 md:mb-0">
                      <div className="relative">
                        {/* Outer glow ring */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-400 to-primary-500 blur-xl opacity-30 animate-pulse"></div>
                        {/* Main circle */}
                        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center shadow-2xl border-4 border-white transform hover:scale-110 transition-all duration-300">
                          <span className="text-4xl font-heading font-bold text-white">
                            {item.letter}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Empty Space (for zigzag effect) */}
                    <div className="md:w-5/12 hidden md:block"></div>
                  </div>
                );
              };

              return <TimelineItem key={index} />;
            })}
          </div>

          {/* End of journey marker */}
          <div className="flex justify-center mt-16">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-400 to-primary-500 blur-xl opacity-40"></div>
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center shadow-2xl border-4 border-white">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="bg-white p-10 md:p-12 rounded-3xl border border-primary-200 shadow-xl max-w-4xl mx-auto hover:shadow-2xl transition-all duration-300">
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-text-primary mb-6">
              Ready to Transform Your Leadership?
            </h2>
            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              Discover how the BALANCE Framework™ can help you lead authentically while driving results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/connect"
                className="bg-gradient-to-r from-primary-400 to-primary-500 text-white py-4 px-8 rounded-full text-base font-corporate font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-lg inline-flex items-center justify-center gap-2"
              >
                Get Started
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="/book"
                className="border-2 border-primary-400 text-primary-500 py-4 px-8 rounded-full text-base font-corporate font-medium transition-all duration-300 hover:bg-primary-50 inline-flex items-center justify-center gap-2"
              >
                Read the Book
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
