import React from 'react';

interface TestimonialProps {
  quote: string;
  author: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ quote, author }) => {
  return (
    <div className="text-center py-12 px-8 bg-primary-50/30 rounded-lg border border-primary-200 hover:bg-primary-50/50 hover:border-primary-300 transition-all duration-300 h-96 flex flex-col justify-center">
      <p className="font-corporate text-base md:text-lg italic text-text-primary mb-6 leading-relaxed font-light">
        "{quote}"
      </p>
      <div className="text-sm text-primary-400 font-medium uppercase tracking-wide">
        {author}
      </div>
    </div>
  );
};

export const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "This coaching changed the way I lead—and the way I live.",
      author: "EXECUTIVE CLIENT"
    },
    {
      quote: "I stopped performing and started owning my power.",
      author: "FOUNDER CLIENT"
    },
    {
      quote: "Our women leaders walked away more confident, connected, and clear.",
      author: "CORPORATE PARTNER"
    },
    {
      quote: "Finally learned to lead without losing myself in the process.",
      author: "VP OF OPERATIONS"
    }
  ];

  return (
    <section className="pt-8 pb-4 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Client Love header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-6xl md:text-8xl font-medium text-text-primary">
            Client Love
          </h2>
        </div>

        {/* Seamless testimonial layout */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};