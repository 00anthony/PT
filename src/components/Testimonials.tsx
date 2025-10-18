import React from 'react';
import AnimatedSection from './AnimatedSection';
import StaggeredAnimation from './StaggeredAnimation';

interface Testimonial {
  name: string;
  text: string;
  rating: number;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      text: "Outstanding work! They replaced our entire roof in just two days and the quality is exceptional.",
      rating: 5
    },
    {
      name: "Michael Chen",
      text: "Professional team, fair pricing, and beautiful results on our kitchen renovation. Highly recommend!",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      text: "Fast response for our emergency roof repair. They saved us from major water damage.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedSection as="h2" className='' animation='fade-up'>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Don&apos;t just take our word for it</p>
          </AnimatedSection>
        </div>
        <StaggeredAnimation className='grid md:grid-cols-3 gap-8' staggerDelay={150} animation='fade-up'>
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">&quot;{testimonial.text}&quot;</p>
              <p className="font-bold text-gray-900">{testimonial.name}</p>
            </div>
          ))}
        </StaggeredAnimation>
      </div>
    </section>
  );
}