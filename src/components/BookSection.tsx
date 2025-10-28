import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const BookSection = () => {
  const bookImageAnimation = useScrollAnimation();
  const bookContentAnimation = useScrollAnimation();

  return (
    <section className="py-32 bg-gradient-to-br from-primary-200 to-primary-300" id="book">
      <div className="container mx-auto px-5 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div
            ref={bookImageAnimation.ref}
            className={`order-2 md:order-1 transition-all duration-700 ${
              bookImageAnimation.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="bg-gradient-to-br from-primary-400 to-primary-500 h-96 md:h-[400px] rounded-2xl flex items-center justify-center font-corporate text-xl md:text-2xl text-white text-center shadow-xl shadow-primary-400/30">
              Dancing With Wolves<br />
              <small className="text-sm md:text-base opacity-80">Book Cover</small>
            </div>
          </div>
          <div
            ref={bookContentAnimation.ref}
            className={`order-1 md:order-2 transition-all duration-700 delay-300 ${
              bookContentAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <h2 className="font-heading text-6xl md:text-8xl font-medium text-text-primary mb-8 leading-tight">
              Dancing With Wolves: Reclaiming Feminine Power in Leadership
            </h2>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-10 font-light">
              Dancing With Wolves is a personal and powerful guide for women leaders walking into boardrooms, battlegrounds, and breakthroughs—without losing themselves. It weaves stories, strategies, and soulful insights into a call to reclaim our feminine essence in the spaces where it's often least welcome.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
              <a
                href="https://amazon.com/dp/dancing-with-wolves-jessie-li"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-primary-400 to-primary-500 text-white py-3 px-8 rounded-full text-xs md:text-sm font-corporate font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-400/40 shadow-lg shadow-primary-400/30"
              >
                Buy the Book
              </a>
              <a
                href="/contact"
                className="glass backdrop-blur-md text-text-primary py-3 px-8 border border-primary-400/30 rounded-full text-xs md:text-sm font-corporate font-medium transition-all duration-300 hover:bg-primary-400/10 hover:-translate-y-1"
              >
                Download Free Chapter
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};