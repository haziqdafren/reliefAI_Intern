import React from 'react';
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation';

export const AboutPage = () => {
  const headerAnimation = useScrollAnimation();
  const storyAnimation = useScrollAnimation();
  const credentialsAnimation = useStaggeredAnimation(200);
  
  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 relative overflow-hidden">
      {/* Professional background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-primary-400/3 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 -right-48 w-80 h-80 bg-primary-500/4 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary-300/2 rounded-full animate-pulse delay-500"></div>
      </div>
      

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Professional header - fully responsive */}
        <div
          ref={headerAnimation.ref}
          className={`text-center py-12 sm:py-16 md:py-20 relative transition-all duration-1000 ${
            headerAnimation.isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative max-w-5xl mx-auto px-4">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-text-primary mb-6 sm:mb-8 leading-tight">
              I used to think I had to choose between
              <br className="hidden sm:block" />
              <span className="block sm:inline text-primary-500">being powerful and being myself</span>
            </h1>
            
            {/* Professional connector - responsive sizing */}
            <div className="flex items-center justify-center my-6 sm:my-8">
              <div className="w-12 sm:w-16 md:w-20 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent"></div>
              <div className="mx-3 sm:mx-4">
                <div className="w-2 sm:w-3 h-2 sm:h-3 bg-primary-400 rounded-full"></div>
              </div>
              <div className="w-12 sm:w-16 md:w-20 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent"></div>
            </div>
            
            <p className="text-sm sm:text-base md:text-lg text-text-secondary font-light max-w-4xl mx-auto leading-relaxed">
              Then I discovered that our greatest leadership strength comes from{" "}
              <span className="font-medium text-primary-500">integration, not separation</span>. 
              Here's my story.
            </p>
          </div>
        </div>
        
        {/* Mission statement - responsive padding and text */}
        <div className="max-w-5xl mx-auto mb-12 sm:mb-16 px-4">
          <div className="bg-gradient-to-r from-primary-50 to-primary-100/50 border border-primary-200/60 rounded-2xl p-4 sm:p-6 md:p-8 text-center">
            <p className="font-heading text-lg sm:text-xl md:text-2xl text-text-primary leading-relaxed">
              "My mission is to empower women of all ages to reconnect with their authentic selves, live purposefully, and thrive."
            </p>
          </div>
        </div>
        
        {/* Professional story layout */}
        <div 
          ref={storyAnimation.ref}
          className={`pb-16 transition-all duration-1000 delay-300 ${
            storyAnimation.isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
        >
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Professional photo section placeholder */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] md:aspect-[3/4] lg:h-[520px] max-h-[70vh] sm:max-h-[75vh] md:max-h-[80vh]">
              <div className="w-full h-full rounded-3xl overflow-hidden relative transition-transform duration-700 hover:-translate-y-2 shadow-2xl shadow-primary-400/20">
                <img
                  src="/1.JPG"
                  alt="Jessie Li Professional Headshot"
                  className="w-full h-full object-cover object-center md:object-top sm:scale-100 md:scale-105 hover:scale-100 transition-transform duration-700"
                  style={{
                    filter: 'contrast(1.05) brightness(1.02) saturate(1.08)',
                  }}
                />
              </div>
            </div>

          </div>
          
          {/* Story content */}
          <div className="lg:col-span-7 relative">
            <div className="mb-6">
              <h2 className="text-lg sm:text-xl md:text-2xl font-corporate font-medium text-text-primary">
                My Story
              </h2>
            </div>

            <div className="glass-card backdrop-blur-md p-8 rounded-2xl border border-primary-400/20 mb-8">
              <blockquote className="text-text-primary font-corporate text-sm sm:text-base md:text-lg italic leading-relaxed">
                "I spent years trying to be the 'right kind' of leader in rooms where I was often
                the only woman. I dimmed parts of myself, adopted masculine communication styles,
                and wondered why success felt so hollow."
              </blockquote>
            </div>

            <div className="space-y-6">
              <p className="text-sm sm:text-base md:text-lg text-text-secondary font-corporate leading-relaxed">
                The breakthrough came during a particularly brutal board meeting where I watched 
                myself shrink to fit. That night, I made a decision: I would find a way to lead 
                that honored all of who I am.
              </p>
              
              <p className="text-sm sm:text-base md:text-lg text-text-secondary font-corporate leading-relaxed">
                Over the past decade, I've developed the BALANCE framework—not from theory,
                but from the trenches of corporate leadership, startup chaos, and the quiet moments
                of breakthrough. I've coached over 500 women leaders across tech, finance, energy,
                and manufacturing who refused to choose between power and authenticity.
              </p>
              
              <p className="text-sm sm:text-base md:text-lg text-text-secondary font-corporate leading-relaxed">
                Today, I help women step into boardrooms, pitch meetings, and leadership roles
                as their whole selves—fierce, intuitive, strategic, and unapologetically authentic.
              </p>
            </div>
          </div>
        </div>
        </div>
        
        {/* Community impact and donations section (replaces numbers/credentials) */}
        <div 
          ref={credentialsAnimation.ref}
          className={`py-20 relative transition-all duration-1000 delay-600 ${
            credentialsAnimation.isVisible ? 'animate-scale-in' : 'opacity-0 scale-95'
          }`}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <p className="font-corporate text-3xl md:text-4xl text-text-primary font-normal">Empowering the Next Generation</p>
          </div>

          {/* Combined charity and support section - fully responsive */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0">
            <div className="glass-card backdrop-blur-md p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl border border-primary-400/20">
              <h3 className="text-lg sm:text-xl md:text-2xl font-corporate font-medium text-text-primary mb-4 sm:mb-6">Inspiring Girls Australia</h3>
              <p className="text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed mb-4 sm:mb-6">
                Inspiring Girls Australia connects girls with real women role models across industries—expanding what they believe is possible and strengthening their confidence. I partner with the organization through mentoring and speaking to help build a pipeline of authentic, purpose-driven leaders.
              </p>
              <div className="bg-primary-50 border-l-4 border-primary-400 p-4 sm:p-6 rounded-r-lg mb-6 sm:mb-8">
                <p className="text-sm sm:text-base md:text-lg text-primary-700 font-medium leading-relaxed">
                  Fifty percent of the net profit from book royalties will be donated to Inspiring Girls Australia, supporting programs that connect young women with inspiring female role models and help them dream bigger.
                </p>
              </div>
              <ul className="text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed list-disc pl-4 sm:pl-6 space-y-1 sm:space-y-2 mb-6 sm:mb-8">
                <li>School talks and workshops on authentic leadership</li>
                <li>Mentorship and career visibility programs</li>
                <li>Exposure to diverse paths in business, STEM, and the arts</li>
              </ul>
              <p className="text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed mb-4 sm:mb-6">
                Every contribution helps fund programs that bring relatable female role models into classrooms and communities. If you've benefited from this work—or want to pay it forward—consider supporting the mission today.
              </p>
              <p className="text-xs sm:text-sm text-text-secondary">Learn more at <a href="https://www.inspiring-girls.com.au/" target="_blank" rel="noopener noreferrer" className="text-primary-500 underline underline-offset-2 hover:text-primary-600">inspiring-girls.com.au</a></p>
            </div>
          </div>

          {/* Ways to get involved - 4 equal buttons */}
          <div className="max-w-6xl mx-auto mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <a href="https://www.inspiring-girls.com.au/volunteer" target="_blank" rel="noopener noreferrer" className="px-4 sm:px-6 py-3 rounded-full border-2 border-primary-400 text-text-primary hover:bg-primary-50 hover:border-primary-500 text-sm sm:text-base md:text-lg font-corporate font-bold transition-all duration-300 text-center">
                Volunteer
              </a>
              <a href="/connect" className="px-4 sm:px-6 py-3 rounded-full border-2 border-primary-400 text-text-primary hover:bg-primary-50 hover:border-primary-500 text-sm sm:text-base md:text-lg font-corporate font-bold transition-all duration-300 text-center">
                Invite Jessie to Speak
              </a>
              <a href="https://www.inspiring-girls.com.au/" target="_blank" rel="noopener noreferrer" className="px-4 sm:px-6 py-3 rounded-full border-2 border-primary-400 text-text-primary hover:bg-primary-50 hover:border-primary-500 text-sm sm:text-base md:text-lg font-corporate font-bold transition-all duration-300 text-center">
                Share the Mission
              </a>
              <a href="https://www.inspiring-girls.com.au/" target="_blank" rel="noopener noreferrer" className="px-4 sm:px-6 py-3 rounded-full border-2 border-primary-400 text-text-primary hover:bg-primary-50 hover:border-primary-500 text-sm sm:text-base md:text-lg font-corporate font-bold transition-all duration-300 text-center">
                Donate
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Single footer donate CTA removed to reduce button count */}
    </div>
  );
};