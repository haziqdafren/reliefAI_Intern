import React from 'react';
import { useCounterAnimation } from '../hooks/useCounterAnimation';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface StatCardProps {
  target: number;
  suffix: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ target, suffix, label }) => {
  const { count, ref } = useCounterAnimation({ target });

  return (
    <div className="text-center p-8 md:p-10 glass-card rounded-2xl relative transition-transform duration-300 hover:-translate-y-3 hover:shadow-xl hover:shadow-primary-400/15 border">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-primary-400 rounded-full"></div>
      <div className="font-heading text-7xl md:text-8xl font-medium text-text-primary my-5 relative inline-block">
        <span ref={ref}>{count}</span>
        <span className="text-2xl text-primary-400 absolute -top-3 ml-1">{suffix}</span>
      </div>
      <div className="text-xs text-text-secondary font-light uppercase tracking-wider">{label}</div>
    </div>
  );
};

export const StatsSection = () => {
  const headerAnimation = useScrollAnimation();
  const gridAnimation = useScrollAnimation();

  return (
    <section className="py-24 bg-gradient-to-br from-primary-100 to-primary-200">
      <div className="container mx-auto px-5 max-w-6xl">
        <div
          ref={headerAnimation.ref}
          className={`text-center mb-20 transition-all duration-700 ${
            headerAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="text-sm uppercase tracking-wider text-primary-400 mb-4 font-medium">
            Impact
          </h2>
          <p className="font-heading text-4xl md:text-5xl text-text-primary font-medium max-w-lg mx-auto">
            Transforming leadership, one woman at a time
          </p>
        </div>

        <div
          ref={gridAnimation.ref}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 transition-all duration-700 delay-300 ${
            gridAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <StatCard target={98} suffix="%" label="Success Rate" />
          <StatCard target={500} suffix="+" label="Leaders Mentored" />
          <StatCard target={150} suffix="+" label="Speaking Events" />
          <StatCard target={25} suffix="+" label="Countries Reached" />
        </div>
      </div>
    </section>
  );
};