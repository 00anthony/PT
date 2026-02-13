
import React from 'react';
import { 
  HousePlus, 
  BrickWallShield, 
  Paintbrush, 
  Grid2X2, 
  Sofa, 
  TreePalm, 
  Wind, 
  Droplets 
} from "lucide-react";
import AnimatedSection from './AnimatedSection';
import StaggeredAnimation from './StaggeredAnimation';
import ServiceCard from './ServiceCard';
import { Service } from '../types';

export default function Services() {
  const services: Service[] = [
    {
      icon: <HousePlus className="w-8 h-8" />,
      title: "Roofing",
      description: "Expert installation of residential and commercial roofing systems. We use premium architectural shingles and metal roofing to ensure your home stays dry and secure for decades.",
      image: "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&q=80&w=800"
    },
    {
      icon: <BrickWallShield className="w-8 h-8" />,
      title: "Siding",
      description: "Transform your home's curb appeal with James Hardie® fiber cement siding. Our precision installation protects against pests, fire, and extreme weather while mimicking natural wood.",
      image: "/images/siding.jpg"
    },
    {
      icon: <Wind className="w-8 h-8" />,
      title: "HVAC",
      description: "Smart climate control solutions for your home. From high-efficiency AC units to modern heating systems, we ensure perfect temperatures and air quality regardless of the season.",
      image: "/images/repair.jpg"
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Water Heating",
      description: "Never run out of hot water again. We specialize in tankless water heaters and energy-efficient traditional tanks that lower your utility bills and provide instant comfort.",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800"
    },
    {
      icon: <Paintbrush className="w-8 h-8" />,
      title: "Painting",
      description: "Master-level interior and exterior finishes. Our meticulous preparation and premium paints create long-lasting, beautiful results that breathe new life into your living spaces.",
      image: "/images/painting.jpg"
    },
    {
      icon: <Grid2X2 className="w-8 h-8" />,
      title: "Windows",
      description: "Advanced energy-efficient window systems. Reduce noise and heat loss with our wide selection of double and triple-pane windows custom-fitted to your home's unique style.",
      image: "/images/windows.jpg"
    },
    {
      icon: <Sofa className="w-8 h-8" />,
      title: "Interior",
      description: "Bespoke kitchen and bathroom remodeling. From structural changes to finishing touches, we handle every aspect of your interior renovation with expert craftsmanship.",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800"
    },
    {
      icon: <TreePalm className="w-8 h-8" />,
      title: "Patio",
      description: "Exquisite outdoor living environments. We design and build custom decks, stone patios, and pergolas that turn your backyard into a luxury private retreat.",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"
    },
  ];

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-5 z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#ccb78a] rounded-full blur-3xl"></div>
        <div className="absolute bottom-48 -left-24 w-64 h-64 bg-gray-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className='text-center mb-20' animation='fade-up'>
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-[#ccb78a]/10 border border-[#ccb78a]/20">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ccb78a]">Our Expertise</span>
          </div>
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Premium Home <span className="text-[#ccb78a]">Solutions</span>
          </h2>
          <div className="w-24 h-1.5 bg-[#ccb78a] mx-auto rounded-full mb-8"></div>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
            From foundation to roof, we provide the highest quality craftsmanship and premium materials for every corner of your home.
          </p>
        </AnimatedSection>

        <StaggeredAnimation 
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" 
          staggerDelay={100}
          animation="fade-up"
        >
          {services.map((service, idx) => (
            <ServiceCard key={idx} service={service} />
          ))}
        </StaggeredAnimation>

        <AnimatedSection className="mt-20 text-center" animation="fade-up" delay={500}>
          <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 shadow-inner">
            <h4 className="text-2xl font-bold text-gray-900 mb-2">Don&apos;t see what you&apos;re looking for?</h4>
            <p className="text-gray-600 mb-6">Our expertise extends beyond the services listed. We tackle custom projects of all sizes.</p>
            <a 
              href="#contact"
              className="bg-gray-900 text-white px-6 py-4 rounded-xl font-bold hover:bg-black cursor-pointer transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 whitespace-normal text-center inline-block">
              Contact for custom project
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
