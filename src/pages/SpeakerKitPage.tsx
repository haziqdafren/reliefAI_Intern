import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const SpeakerKitPage = () => {
  const headerAnimation = useScrollAnimation();
  const contentAnimation = useScrollAnimation();
  const formAnimation = useScrollAnimation();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    organization: '',
    eventType: 'corporate'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to Airtable for speaker kit download
    console.log('Speaker kit download requested:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="pt-16 min-h-screen bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Professional Header */}
        <div
          ref={headerAnimation.ref}
          className={`py-20 transition-all duration-700 ${
            headerAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="max-w-4xl mx-auto text-center">
            {/* Professional badge */}
            <div className="relative inline-block mb-8">
              <div className="bg-primary-400/10 text-primary-400 py-3 px-8 rounded-xl text-sm font-corporate font-medium uppercase tracking-wider border border-primary-400/20">
                Speaker Resources
              </div>
            </div>

            <h1 className="font-heading text-6xl md:text-8xl font-medium text-text-primary mb-8 leading-tight">
              Speaker Kit
            </h1>

            {/* Professional connector */}
            <div className="flex items-center justify-center my-8">
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent"></div>
              <div className="mx-4">
                <div className="w-3 h-3 bg-primary-400 rounded-full"></div>
              </div>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent"></div>
            </div>

            <p className="text-sm md:text-base text-text-secondary leading-relaxed max-w-3xl mx-auto font-light">
              Everything you need to book Jessie Li for your next event. Download professional photos, speaker bio, topic outlines, and testimonials.
            </p>
          </div>
        </div>

        {/* Speaker Kit Content */}
        <div
          ref={contentAnimation.ref}
          className={`pb-12 transition-all duration-700 delay-300 ${
            contentAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {/* What's Included */}
              <div>
                <h2 className="font-heading text-2xl font-medium text-text-primary mb-6">
                  What's Included
                </h2>
                <div className="space-y-4">
                  {[
                    'High-resolution professional photos',
                    'Comprehensive speaker bio (multiple lengths)',
                    'Keynote topic outlines and descriptions',
                    'Video reels and speaking samples',
                    'Client testimonials and case studies',
                    'Technical requirements and AV needs',
                    'Fee structure and booking information'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-primary-50/30 rounded-xl border border-primary-200/30">
                      <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-text-secondary leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Speaking Topics */}
              <div>
                <h2 className="font-heading text-2xl font-medium text-text-primary mb-6">
                  Featured Topics
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Authentic Leadership in Action',
                      description: 'Leading from wholeness in corporate environments'
                    },
                    {
                      title: 'The BALANCE Framework',
                      description: 'Six pillars of feminine leadership mastery'
                    },
                    {
                      title: 'Breaking the Glass Ceiling',
                      description: 'Strategies for women rising in male-dominated industries'
                    },
                    {
                      title: 'Embodied Leadership',
                      description: 'Integrating intuition and strategy for better decisions'
                    }
                  ].map((topic, index) => (
                    <div key={index} className="p-4 bg-white rounded-xl border border-primary-200/50 shadow-sm">
                      <h3 className="font-corporate font-medium text-text-primary mb-2">{topic.title}</h3>
                      <p className="text-sm text-text-secondary">{topic.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Proof Section */}
            <div className="bg-gradient-to-r from-primary-400 to-primary-500 rounded-2xl p-8 text-center text-white mb-16">
              <h3 className="font-heading text-2xl font-medium mb-4">Trusted by Industry Leaders</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-corporate font-medium">500+</div>
                  <div className="text-sm opacity-90">Leaders Coached</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-corporate font-medium">150+</div>
                  <div className="text-sm opacity-90">Speaking Events</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-corporate font-medium">25+</div>
                  <div className="text-sm opacity-90">Countries Reached</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-corporate font-medium">98%</div>
                  <div className="text-sm opacity-90">Satisfaction Rate</div>
                </div>
              </div>
              <p className="text-sm opacity-90 max-w-2xl mx-auto">
                "Jessie's keynote transformed our leadership team's approach to authenticity and performance."
              </p>
              <p className="text-xs opacity-75 mt-2">— Fortune 500 Chief People Officer</p>
            </div>
          </div>
        </div>

        {/* Download Form */}
        <div
          ref={formAnimation.ref}
          className={`pb-16 transition-all duration-700 delay-600 ${
            formAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="font-heading text-2xl font-medium text-text-primary mb-4">
                Download Speaker Kit
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Complete the form below to receive the full speaker kit via email within minutes.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-primary-200/50 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-text-primary font-heading font-medium mb-2 text-sm">
                    Event Type
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-primary-200 rounded-xl font-corporate focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all duration-300 bg-white"
                  >
                    <option value="corporate">Corporate Keynote</option>
                    <option value="conference">Industry Conference</option>
                    <option value="workshop">Leadership Workshop</option>
                    <option value="panel">Panel Discussion</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-text-primary font-heading font-medium mb-2 text-sm">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-primary-200 rounded-xl font-corporate focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all duration-300 bg-white"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-text-primary font-heading font-medium mb-2 text-sm">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-primary-200 rounded-xl font-corporate focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all duration-300 bg-white"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-text-primary font-heading font-medium mb-2 text-sm">
                    Organization
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-primary-200 rounded-xl font-corporate focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all duration-300 bg-white"
                    placeholder="Company or organization name"
                    required
                  />
                </div>

                <div className="text-center pt-4">
                  <button
                    type="submit"
                    className="bg-primary-500 text-white py-3 px-8 rounded-full font-corporate font-medium text-sm transition-all duration-300 hover:bg-primary-600 hover:-translate-y-1 hover:shadow-lg shadow-md"
                  >
                    Download Speaker Kit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Professional Quote */}
        <div className="text-center py-8">
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-text-primary font-medium leading-relaxed mb-4">
              "Ready to bring authentic leadership to your next event?"
            </p>
            <p className="text-sm text-primary-400 font-corporate">
              — Jessie Li
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};