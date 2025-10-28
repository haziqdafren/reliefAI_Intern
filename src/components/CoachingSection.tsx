import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface CoachingCardProps {
  title: string;
  subtitle?: string;
  features: string[];
  buttonText: string;
  buttonHref: string;
}

const CoachingCard: React.FC<CoachingCardProps> = ({ title, subtitle, features, buttonText, buttonHref }) => {
  return (
    <div className="p-8 md:p-12 text-center transition-all duration-300 glass-card rounded-3xl border hover:-translate-y-2 flex flex-col justify-between h-full min-h-[500px]">
      <div className="flex-grow">
        <h3 className="font-heading text-2xl md:text-3xl font-medium text-text-primary mb-6">{title}</h3>
        {subtitle && (
          <p className="mb-5 text-sm md:text-base text-text-secondary font-light">{subtitle}</p>
        )}
        <ul className="list-none text-left my-8 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="py-2 text-sm md:text-base text-text-secondary relative pl-6 font-light">
              <span className="absolute left-0 text-primary-400 font-medium">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center pt-6">
        <a
          href={buttonHref}
          className="bg-gradient-to-r from-primary-400 to-primary-500 text-white py-3 px-8 rounded-full text-xs md:text-sm font-corporate font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-400/40 shadow-lg shadow-primary-400/30"
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
};

export const CoachingSection = () => {
  const headerAnimation = useScrollAnimation();
  const cardsAnimation = useScrollAnimation();

  const coachingOptions = [
    {
      title: "1:1 Coaching",
      features: [
        "Customized 12-week coaching journey using the BALANCE framework",
        "Leadership credo design",
        "Pattern deprogramming & energy balancing",
        "Embodiment practices",
        "Courage sprints & visibility strategy",
        "Voxer/email support between sessions"
      ],
      buttonText: "Book Discovery Call",
      buttonHref: "/connect"
    },
    {
      title: "Speaker or Guest Appearance",
      subtitle: "Transform Your Culture—From the Inside Out",
      features: [
        "Keynotes on feminine leadership & authenticity",
        "BALANCE framework workshops",
        "Leadership coaching pods",
        "Executive coaching for C-level leaders",
        "Custom DEI-aligned programming"
      ],
      buttonText: "Inquire About Speaking",
      buttonHref: "/connect"
    }
  ];

  return (
    <section className="py-32 bg-white" id="coaching">
      <div className="container mx-auto px-5 max-w-6xl">
        <div
          ref={headerAnimation.ref}
          className={`text-center mb-16 transition-all duration-700 ${
            headerAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="font-heading text-6xl md:text-8xl font-medium text-text-primary mb-8 leading-tight">
            Work With Me
          </h2>
          <p className="text-base md:text-lg text-text-secondary font-normal max-w-3xl mx-auto leading-relaxed">
            I empower women across all generations to lead authentically and age gracefully through science‑based wellbeing. I combine real‑world leadership experience, cultural storytelling, and research‑backed longevity to help individuals to reconnect to their true selves, lead with clarity, and thrive in body and mind.
          </p>
        </div>

        <div
          ref={cardsAnimation.ref}
          className={`grid md:grid-cols-2 gap-8 lg:gap-10 transition-all duration-700 delay-300 ${
            cardsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {coachingOptions.map((option, index) => (
            <CoachingCard key={index} {...option} />
          ))}
        </div>
      </div>
    </section>
  );
};