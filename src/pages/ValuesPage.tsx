import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const ValuesPage = () => {
  const heroAnimation = useScrollAnimation();
  const valuesAnimation = useScrollAnimation();
  const resourcesAnimation = useScrollAnimation();

  const values = [
    'Accountability', 'Achievement', 'Adaptability', 'Adventurousness', 'Altruism',
    'Ambition', 'Appreciation', 'Assertiveness', 'Authenticity', 'Balance',
    'Beauty', 'Belonging', 'Bravery', 'Calmness', 'Caring',
    'Charity', 'Citizenship', 'Collaboration', 'Commitment', 'Community',
    'Compassion', 'Competence', 'Confidence', 'Connection', 'Consistency',
    'Contentment', 'Contribution', 'Cooperation', 'Courage', 'Courtesy',
    'Creativity', 'Curiosity', 'Decisiveness', 'Dependability', 'Determination',
    'Dignity', 'Discipline', 'Diversity', 'Empathy', 'Empowerment',
    'Encouragement', 'Endurance', 'Enthusiasm', 'Equality', 'Equity',
    'Excellence', 'Fairness', 'Faith', 'Family', 'Flexibility',
    'Forgiveness', 'Freedom', 'Friendship', 'Fun', 'Generosity',
    'Giving', 'Grace', 'Gratitude', 'Growth', 'Happiness',
    'Harmony', 'Health', 'Helpfulness', 'Honesty', 'Honor',
    'Hope', 'Humility', 'Humor', 'Inclusion', 'Independence',
    'Individuality', 'Ingenuity', 'Innovation', 'Inquisitiveness', 'Insightfulness',
    'Integrity', 'Intelligence', 'Intuition', 'Joy', 'Justice',
    'Kindness', 'Knowledge', 'Leadership', 'Learning', 'Love',
    'Loyalty', 'Making a Difference', 'Mindfulness', 'Motivation', 'Nonjudgment',
    'Openness', 'Open-mindedness', 'Optimism', 'Order', 'Passion',
    'Patience', 'Peace', 'Perceptiveness', 'Perseverance', 'Personal Development',
    'Playfulness', 'Positivity', 'Practicality', 'Precision', 'Presence',
    'Privacy', 'Proactivity', 'Professionalism', 'Progress', 'Punctuality',
    'Purpose', 'Quality', 'Reliability', 'Resilience', 'Resourcefulness',
    'Respect', 'Responsibility', 'Responsiveness', 'Risk-taking', 'Sacrifice',
    'Safety', 'Self-Acceptance', 'Self-Awareness', 'Self-Care', 'Self-Control',
    'Self-Discipline', 'Self-Expression', 'Self-Respect', 'Service', 'Simplicity',
    'Sincerity', 'Solidarity', 'Spirituality', 'Stability', 'Strength',
    'Success', 'Teamwork', 'Thankfulness', 'Thoughtfulness', 'Tolerance',
    'Tradition', 'Trust', 'Trustworthiness', 'Understanding', 'Unity',
    'Vision', 'Vitality', 'Wealth', 'Well-being', 'Wisdom',
    'Wonder'
  ];

  return (
    <div className="min-h-screen bg-[#F7F4EF] relative pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header Section - Two Column Layout like Brené */}
        <div
          ref={heroAnimation.ref}
          className={`mb-16 transition-all duration-700 ${
            heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* LEFT SIDE - Book Cover & Logo like Brené's "dare to lead" badge */}
            <div className="bg-white rounded-lg p-12 shadow-sm border border-[#E5E5E5] flex flex-col items-center justify-start">
              {/* Logo Badge */}
              <div className="mb-8">
                <img src="/balance1.png" alt="Lead With Balance" className="h-20 w-auto object-contain" />
              </div>

              {/* "List of VALUES" heading */}
              <div className="text-center mb-8">
                <p className="text-sm italic text-[#888] mb-2">List of</p>
                <h2 className="font-heading text-4xl font-bold text-[#2C2C2C] uppercase tracking-tight">
                  VALUES
                </h2>
              </div>

              {/* Book Cover Image */}
              <div>
                <img
                  src="/cover-softcover.png"
                  alt="Dancing With Wolves Cover"
                  className="w-64 h-auto object-contain rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* RIGHT SIDE - Title and Description like Brené */}
            <div>
              <h1 className="font-heading text-5xl md:text-6xl font-normal text-[#2C2C2C] mb-8 leading-tight">
                Dancing With Wolves<br />List of Values
              </h1>

              {/* Download Button */}
              <div className="mb-8">
                <button className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#2C2C2C] rounded-full text-[#2C2C2C] font-medium text-base hover:bg-[#2C2C2C] hover:text-white transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download
                </button>
              </div>

              {/* Description Text */}
              <div className="text-base text-[#2C2C2C] leading-relaxed space-y-4">
                <p>
                  Living into our values means that we do more than profess our values, we practice them. We walk our talk—we are clear about what we believe and hold important, and we take care that our intentions, words, thoughts, and behaviors align with those beliefs.
                </p>
                <p>
                  This is the list of values that we use in our work. There is also an opportunity for you to write in values that we may not have included. The task is to pick the two that you hold most important. I know this is tough, because almost everyone we've done this work with (including me) wants to pick somewhere between ten and fifteen. I can soften the blow by suggesting that you start by circling those fifteen. But you can't stop until you're down to two core values.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Values List Below (like Brené's bottom section) */}
        <div
          ref={valuesAnimation.ref}
          className={`mb-16 transition-all duration-700 delay-200 ${
            valuesAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="grid grid-cols-3 gap-x-16 gap-y-1 text-base">
            {values.map((value, index) => (
              <div key={index} className="text-[#2C2C2C]">
                {value}
              </div>
            ))}
          </div>
        </div>

        {/* Resources Section - "Most Popular" style */}
        <div
          ref={resourcesAnimation.ref}
          className={`transition-all duration-700 delay-400 ${
            resourcesAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="border-t-2 border-[#2C2C2C] pt-12">
            <h2 className="font-heading text-4xl font-normal text-[#2C2C2C] mb-8">
              Resources
            </h2>

            <div className="grid md:grid-cols-4 gap-8">
              {/* Resource 1 */}
              <div className="border-r border-[#E5E5E5] pr-8">
                <div className="text-xs uppercase tracking-wider text-[#888] mb-3">
                  RESOURCE
                </div>
                <a href="/values" className="group">
                  <h3 className="font-heading text-xl text-[#2C2C2C] mb-3 group-hover:text-primary-500 transition-colors">
                    Revisit Your Core Values Exercise
                  </h3>
                </a>
                <button className="inline-flex items-center gap-2 text-[#2C2C2C] text-sm hover:text-primary-500 transition-colors mt-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
                  </svg>
                  Download
                </button>
              </div>

              {/* Resource 2 */}
              <div className="border-r border-[#E5E5E5] pr-8">
                <div className="text-xs uppercase tracking-wider text-[#888] mb-3">
                  FRAMEWORK
                </div>
                <a href="/balance-framework" className="group">
                  <h3 className="font-heading text-xl text-[#2C2C2C] mb-3 group-hover:text-primary-500 transition-colors">
                    Journey to Authentic Leadership
                  </h3>
                </a>
                <button className="inline-flex items-center gap-2 text-[#2C2C2C] text-sm hover:text-primary-500 transition-colors mt-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
                  </svg>
                  Download
                </button>
              </div>

              {/* Resource 3 */}
              <div className="border-r border-[#E5E5E5] pr-8">
                <div className="text-xs uppercase tracking-wider text-[#888] mb-3">
                  BOOK
                </div>
                <a href="/book" className="group">
                  <h3 className="font-heading text-xl text-[#2C2C2C] mb-3 group-hover:text-primary-500 transition-colors">
                    Dancing With Wolves
                  </h3>
                </a>
              </div>

              {/* Resource 4 */}
              <div>
                <div className="text-xs uppercase tracking-wider text-[#888] mb-3">
                  SHOP
                </div>
                <a href="/guidedjournal" className="group">
                  <h3 className="font-heading text-xl text-[#2C2C2C] mb-3 group-hover:text-primary-500 transition-colors">
                    Shop Guided Journal
                  </h3>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
