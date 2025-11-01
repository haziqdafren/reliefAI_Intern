import React, { useState } from 'react';

export const BalanceSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const balanceLetters = [
    {
      letter: "B",
      word: "Build Self-Awareness",
      description: "Facilitate deep self-reflection to help leaders identify their unique blend of feminine and masculine energies. Use self-assessments to explore core strengths, values, and areas for growth."
    },
    {
      letter: "A",
      word: "Affirm & Celebrate Strengths",
      description: "Affirm and celebrate both divine feminine (empathy, intuition, nurturing) and masculine (drive, decisiveness, assertiveness) qualities present. Recognize and honor the authentic self beyond stereotypical gender roles."
    },
    {
      letter: "L",
      word: "Lean Into Your Weaker Side",
      description: "Identify the less-developed aspect of your energy (often the feminine side in male-dominated fields). Intentionally cultivate and integrate these qualities—such as receptivity, vulnerability, creativity, or collaboration—into daily leadership practice."
    },
    {
      letter: "A",
      word: "Align With Purpose",
      description: "Clarify your personal and professional purpose, connecting deeply with your 'why.' Set goals and make decisions that are congruent with your authentic self and values."
    },
    {
      letter: "N",
      word: "Notice Old Patterns",
      description: "Observe habitual thoughts, behaviors, and responses—especially those shaped by past conditioning or industry norms. Reflect on which patterns serve you and which may be holding you back from authentic expression."
    },
    {
      letter: "C",
      word: "Cultivate New Traits",
      description: "Intentionally develop new traits and behaviors that align with your purpose and authentic leadership style. Practice these traits consistently, seeking feedback and celebrating progress."
    },
    {
      letter: "E",
      word: "Embody Authentic Leadership",
      description: "Integrate your unique blend of feminine and masculine energies to lead authentically. Show up as your whole self, modeling authenticity and inspiring others to do the same."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50/30 via-white to-primary-100/20" id="balance">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* BALANCE Letters Pure Typography Layout */}
        <div className="mb-16">
          {/* Letters Row - Pure Typography */}
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-1 sm:gap-3 lg:gap-6 mb-8">
            {balanceLetters.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center group cursor-pointer"
                onMouseEnter={() => setSelectedIndex(index)}
                onClick={() => setSelectedIndex(index)}
              >
                {/* Letter - Pure Typography */}
                <div className="mb-3 sm:mb-4">
                  <span className={`text-5xl sm:text-6xl md:text-8xl font-heading font-medium transition-all duration-300 ${
                    selectedIndex === index
                      ? 'text-primary-500 scale-110 drop-shadow-lg'
                      : 'text-text-primary group-hover:text-primary-400 group-hover:scale-105'
                  }`}>
                    {item.letter}
                  </span>
                </div>

                {/* Short Description */}
                <div className="text-center min-w-0">
                  <p className={`text-[10px] xs:text-xs md:text-sm font-corporate font-medium transition-colors duration-300 leading-tight break-words ${
                    selectedIndex === index ? 'text-primary-600' : 'text-text-secondary'
                  }`}>
                    {item.word}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Description Display */}
          <div className="bg-white p-6 lg:p-8 rounded-3xl border border-primary-200 shadow-lg transition-all duration-500 hover:shadow-xl min-h-[200px] flex items-center">
            <div className="w-full">
              <h3 className="text-2xl md:text-3xl font-heading font-medium text-text-primary mb-4 flex items-center gap-3">
                <span className="text-primary-500">{balanceLetters[selectedIndex].word}</span>
                <div className="flex-1 h-px bg-gradient-to-r from-primary-400/30 to-transparent"></div>
              </h3>
              <p className="text-base md:text-lg text-text-secondary leading-relaxed font-light">
                {balanceLetters[selectedIndex].description}
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action with Framework Context */}
        <div className="text-center">
          <div className="mb-6">
            <p className="text-lg text-text-secondary font-corporate italic">
              "When you master the BALANCE Framework™, you stop choosing between power and authenticity."
            </p>
          </div>
          {/* <a
            href="/connect"
            // href="/coaching" // Hidden - uncomment to link to coaching page instead
            className="bg-gradient-to-r from-primary-400 to-primary-500 text-white py-3 px-8 rounded-full text-xs md:text-sm font-corporate font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            Experience BALANCE in Coaching
          </a> */} {/* Hidden - uncomment to show "Experience BALANCE in Coaching" button */}
        </div>
      </div>
    </section>
  );
};