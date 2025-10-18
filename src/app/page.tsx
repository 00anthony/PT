import React from 'react';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import AboutUs from '@/components/AboutUs';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Services />
      <Projects />
      <Testimonials />
      <AboutUs />
      <Contact />
    </div>
  );
}