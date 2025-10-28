import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useNewsletter } from '../contexts/NewsletterContext';

export const CoursePage = () => {
  const pathwayAnimation = useScrollAnimation();
  const coursesAnimation = useScrollAnimation();
  const communityAnimation = useScrollAnimation();
  const { isNewsletterVisible } = useNewsletter();

  return (
    <div className={`min-h-screen bg-gradient-to-br from-white via-primary-50/30 to-primary-100/20 relative overflow-hidden transition-all duration-300 ${
      isNewsletterVisible ? 'pt-32' : 'pt-20'
    }`}>
      {/* Professional background elements matching other pages */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-primary-400/3 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 -right-48 w-80 h-80 bg-primary-500/4 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary-300/2 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-40 right-20 w-2 h-32 bg-primary-400/20 rounded-full transform rotate-12 opacity-40"></div>
        <div className="absolute bottom-40 left-16 w-1 h-24 bg-primary-500/15 rounded-full transform -rotate-12 opacity-40"></div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        {/* Leadership Development Hero */}
        <div
          ref={pathwayAnimation.ref}
          className={`py-16 transition-all duration-700 ${
            pathwayAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-6xl md:text-8xl font-medium text-text-primary mb-8 leading-tight">
              Leadership Development Programs
            </h1>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-12 font-light">
              Comprehensive learning journeys designed to develop authentic, powerful leadership at every stage of your career.
            </p>

            {/* Learning Path Overview */}
            <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-3xl mx-auto">
              <div className="p-6 bg-primary-50/50 rounded-2xl border border-primary-200 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-primary-400 text-white rounded-full flex items-center justify-center text-lg font-corporate font-medium mx-auto mb-4">
                  1
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-medium text-text-primary mb-2">Foundation</h3>
                <p className="text-sm text-text-secondary font-light">Essential leadership principles</p>
              </div>
              <div className="p-6 bg-primary-50/50 rounded-2xl border border-primary-200 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center text-lg font-corporate font-medium mx-auto mb-4">
                  2
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-medium text-text-primary mb-2">Development</h3>
                <p className="text-sm text-text-secondary font-light">Advanced leadership skills</p>
              </div>
              <div className="p-6 bg-primary-100/30 rounded-2xl border-2 border-primary-400 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-primary-500 text-white rounded-full flex items-center justify-center text-lg font-corporate font-medium mx-auto mb-4">
                    3
                  </div>
                  <div className="absolute -top-2 -right-2 bg-primary-400 text-white rounded-lg px-2 py-1 text-xs font-corporate font-medium">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-medium text-text-primary mb-2">Mastery</h3>
                <p className="text-sm text-text-secondary font-light">Executive transformation</p>
              </div>
            </div>

            {/* Enrollment Notice */}
            <div className="inline-flex items-center gap-3 text-sm bg-primary-50/50 px-6 py-3 rounded-full border border-primary-200">
              <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
              <span className="text-text-primary font-corporate text-sm font-light">2024 Programs Available</span>
            </div>
          </div>
        </div>

        {/* Course Programs */}
        <div
          ref={coursesAnimation.ref}
          className={`pb-16 transition-all duration-700 delay-300 ${
            coursesAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="space-y-12">
            {/* Featured Program: BALANCE Framework */}
            <div className="bg-white rounded-2xl p-8 border-l-4 border-primary-400 shadow-lg">
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary-400 text-white rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <span className="text-primary-400 text-sm font-corporate font-medium uppercase tracking-wider">
                      Featured Program
                    </span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-heading font-medium mb-4 text-text-primary">
                    The BALANCE Framework™
                  </h3>
                  <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-6 font-light">
                    A comprehensive 12-week leadership transformation program designed for women ready to lead authentically at the highest levels.
                  </p>

                  {/* Key Results */}
                  <div className="grid grid-cols-3 gap-4 text-center mb-6">
                    <div className="bg-primary-50/50 rounded-xl p-4 border border-primary-200">
                      <div className="text-2xl font-corporate font-medium text-primary-500">95%</div>
                      <div className="text-xs text-text-secondary">Success Rate</div>
                    </div>
                    <div className="bg-primary-50/50 rounded-xl p-4 border border-primary-200">
                      <div className="text-2xl font-corporate font-medium text-primary-500">12</div>
                      <div className="text-xs text-text-secondary">Weeks</div>
                    </div>
                    <div className="bg-primary-50/50 rounded-xl p-4 border border-primary-200">
                      <div className="text-2xl font-corporate font-medium text-primary-500">500+</div>
                      <div className="text-xs text-text-secondary">Graduates</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-gradient-to-r from-primary-400 to-primary-500 text-white py-3 px-6 rounded-full font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                      Learn More
                    </button>
                    <button className="border border-primary-400 text-primary-500 py-3 px-6 rounded-full font-medium transition-all duration-300 hover:bg-primary-50">
                      View Curriculum
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-primary-200 to-primary-300 rounded-2xl p-8 text-center">
                    <div className="font-corporate text-xl text-text-primary mb-2">Program Investment</div>
                    <div className="text-3xl font-corporate font-medium text-primary-500 mb-4">$4,997</div>
                    <div className="text-sm text-text-secondary">3 payment plans available</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Foundation Program */}
            <div className="bg-white rounded-2xl p-8 border border-primary-200 shadow-sm">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary-400 text-white rounded-full flex items-center justify-center text-sm font-corporate font-medium">
                      1
                    </div>
                    <span className="text-primary-400 text-sm font-corporate font-medium">Foundation Level</span>
                  </div>
                  <h3 className="text-xl font-corporate font-medium mb-3 text-text-primary">
                    Leadership Foundations
                  </h3>
                  <p className="text-text-secondary leading-relaxed mb-4">
                    Essential skills and frameworks for new and emerging leaders building their leadership foundation.
                  </p>
                  <ul className="text-sm text-text-secondary space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <span className="text-primary-400">✓</span>
                      Self-awareness and leadership style assessment
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary-400">✓</span>
                      Communication and influence fundamentals
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary-400">✓</span>
                      Building confidence and presence
                    </li>
                  </ul>
                  <div className="flex gap-3">
                    <button className="bg-primary-400 text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-primary-500 transition-colors">
                      Enroll Now
                    </button>
                    <button className="text-primary-400 text-sm font-medium hover:text-primary-500">
                      Learn More →
                    </button>
                  </div>
                </div>
                <div className="bg-primary-50/30 rounded-xl p-6 text-center">
                  <div className="text-lg font-corporate text-text-primary mb-2">6-Week Program</div>
                  <div className="text-2xl font-corporate font-medium text-primary-500 mb-3">$1,497</div>
                  <div className="text-sm text-text-secondary">Perfect for new leaders</div>
                </div>
              </div>
            </div>

            {/* Development Program */}
            <div className="bg-white rounded-2xl p-8 border border-primary-200 shadow-sm">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-corporate font-medium">
                      2
                    </div>
                    <span className="text-primary-500 text-sm font-corporate font-medium">Development Level</span>
                  </div>
                  <h3 className="text-xl font-corporate font-medium mb-3 text-text-primary">
                    Advanced Leadership Skills
                  </h3>
                  <p className="text-text-secondary leading-relaxed mb-4">
                    Intermediate leadership development for managers ready to expand their influence and impact.
                  </p>
                  <ul className="text-sm text-text-secondary space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <span className="text-primary-500">✓</span>
                      Strategic thinking and decision making
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary-500">✓</span>
                      Team development and motivation
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary-500">✓</span>
                      Managing up and across organizations
                    </li>
                  </ul>
                  <div className="flex gap-3">
                    <button className="bg-primary-500 text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-primary-600 transition-colors">
                      Enroll Now
                    </button>
                    <button className="text-primary-500 text-sm font-medium hover:text-primary-600">
                      Learn More →
                    </button>
                  </div>
                </div>
                <div className="bg-primary-50/30 rounded-xl p-6 text-center">
                  <div className="text-lg font-corporate text-text-primary mb-2">8-Week Program</div>
                  <div className="text-2xl font-corporate font-medium text-primary-500 mb-3">$2,497</div>
                  <div className="text-sm text-text-secondary">For growing leaders</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Community */}
        <div
          ref={communityAnimation.ref}
          className={`pb-16 transition-all duration-700 delay-600 ${
            communityAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="bg-primary-50/30 rounded-2xl p-8 text-center border border-primary-200">
            <h3 className="font-corporate text-2xl font-medium text-text-primary mb-4">
              Join Our Leadership Community
            </h3>
            <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
              Connect with like-minded women leaders, access exclusive resources, and continue your growth journey with ongoing support and networking opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-primary-400 to-primary-500 text-white py-3 px-8 rounded-full font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                Schedule Discovery Call
              </button>
              <button className="border border-primary-400 text-primary-500 py-3 px-8 rounded-full font-medium transition-all duration-300 hover:bg-primary-50">
                Download Program Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};