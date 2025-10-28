import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const CoachingPage = () => {
  const heroAnimation = useScrollAnimation();
  const processAnimation = useScrollAnimation();
  const storiesAnimation = useScrollAnimation();
  
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-white via-primary-50/20 to-white">
      {/* Clean, minimal background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-40 right-20 w-2 h-32 bg-primary-400/20 rounded-full transform rotate-12"></div>
        <div className="absolute bottom-40 left-16 w-1 h-24 bg-primary-500/15 rounded-full transform -rotate-12"></div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        {/* Conversational Hero - completely different approach */}
        <div
          ref={heroAnimation.ref}
          className={`py-16 transition-all duration-700 ${
            heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Personal introduction - like a conversation */}
          <div className="max-w-3xl mx-auto">
            <div className="mb-12">
              <h1 className="font-heading text-6xl md:text-8xl font-medium text-text-primary mb-6 leading-tight">
                "I used to believe I had to choose between being{" "}
                <span className="text-primary-500 italic">powerful</span> and being{" "}
                <span className="text-primary-500 italic">myself</span>."
              </h1>
              <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-8 font-light">
                That was before I discovered something that changed everything: the most influential leaders aren't trying to be someone else. They've learned to lead as themselves—completely, authentically, powerfully.
              </p>
              <div className="text-right">
                <span className="text-primary-400 font-corporate italic">— Jessie</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* How I Work - Process-focused instead of generic */}
        <div
          ref={processAnimation.ref}
          className={`pb-16 transition-all duration-700 delay-300 ${
            processAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="font-heading text-4xl md:text-5xl text-text-primary mb-8 text-center font-medium">
                How We'll Work Together
              </h2>
            </div>

            {/* Process Steps - horizontal timeline */}
            <div className="space-y-12">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-400 text-white rounded-full flex items-center justify-center font-corporate font-medium">
                    1
                  </div>
                </div>
                <div className="pt-2">
                  <h3 className="font-heading text-2xl md:text-3xl font-medium text-text-primary mb-3">
                    We start with where you are right now
                  </h3>
                  <p className="text-text-secondary leading-relaxed text-xs md:text-sm font-light">
                    No generic assessments. We'll explore your specific leadership challenges, the rooms where you feel most and least yourself, and what success truly means to you.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-corporate font-medium">
                    2
                  </div>
                </div>
                <div className="pt-2">
                  <h3 className="font-heading text-2xl md:text-3xl font-medium text-text-primary mb-3">
                    We uncover your authentic leadership style
                  </h3>
                  <p className="text-text-secondary leading-relaxed text-xs md:text-sm font-light">
                    Through real scenarios and honest conversation, we'll identify the leadership qualities that come naturally to you and the ones you've been taught to suppress.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-400 text-white rounded-full flex items-center justify-center font-corporate font-medium">
                    3
                  </div>
                </div>
                <div className="pt-2">
                  <h3 className="font-heading text-2xl md:text-3xl font-medium text-text-primary mb-3">
                    We practice leading as yourself
                  </h3>
                  <p className="text-text-secondary leading-relaxed text-xs md:text-sm font-light">
                    Real situations, real practice. You'll apply your authentic leadership style to actual challenges you're facing, with support and feedback every step of the way.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
          
        {/* Client Stories - Woven throughout instead of segregated */}
        <div
          ref={storiesAnimation.ref}
          className={`pb-16 transition-all duration-700 delay-600 ${
            storiesAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Client Story 1 */}
              <div className="space-y-6">
                <div className="p-6 bg-primary-50/50 rounded-2xl border-l-4 border-primary-400">
                  <p className="text-text-primary italic leading-relaxed mb-4">
                    "I walked into our first session exhausted from trying to be everyone else's version of a good leader. Six months later, I got the promotion I'd been chasing for years—by finally being myself."
                  </p>
                  <div className="text-sm text-text-secondary">
                    <div className="font-medium text-text-primary">Sarah K.</div>
                    <div>VP of Engineering, Tech Startup</div>
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-sm text-primary-400 font-corporate">2019 → Senior Director</span>
                  <div className="text-xs text-text-secondary">Now leads a 50-person engineering team</div>
                </div>
              </div>

              {/* Client Story 2 */}
              <div className="space-y-6">
                <div className="p-6 bg-primary-50/50 rounded-2xl border-l-4 border-primary-500">
                  <p className="text-text-primary italic leading-relaxed mb-4">
                    "Jessie helped me see that my 'too much' wasn't actually too much—it was exactly what my company needed. I stopped apologizing for my ideas and started owning them."
                  </p>
                  <div className="text-sm text-text-secondary">
                    <div className="font-medium text-text-primary">Maria L.</div>
                    <div>Director of Operations, Manufacturing</div>
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-sm text-primary-500 font-corporate">2020 → VP Operations</span>
                  <div className="text-xs text-text-secondary">Launched 3 new product lines</div>
                </div>
              </div>
            </div>
          </div>
        </div>
          
        {/* Simple, Clear CTA - No overwhelming design */}
        <div className="text-center py-12 border-t border-primary-200">
          <div className="max-w-2xl mx-auto">
            <h3 className="font-corporate text-2xl font-medium text-text-primary mb-4">
              Ready to lead as yourself?
            </h3>
            <p className="text-text-secondary mb-8 leading-relaxed">
              Let's have a real conversation about where you are and where you want to be. No sales pitch, just 45 minutes to see if we're a good fit.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary-500 text-white py-3 px-8 rounded-full font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                Book Your Free Call
              </button>
              <button className="border border-primary-400 text-primary-500 py-3 px-8 rounded-full font-medium transition-all duration-300 hover:bg-primary-50">
                Learn About Coaching
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};