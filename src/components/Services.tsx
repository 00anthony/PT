"use client"
import { HousePlus, BrickWallShield, Paintbrush, Grid2X2, Sofa, TreePalm, ChevronRight } from "lucide-react";
import AnimatedSection from './AnimatedSection';
import StaggeredAnimation from './StaggeredAnimation';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function Services() {
  const services: Service[] = [
    {
      icon: <HousePlus className="w-12 h-12" />,
      title: "Roofing",
      description: "Expert installation of residential and commercial roofing systems with premium materials."
    },
    {
      icon: <BrickWallShield className="w-12 h-12" />,
      title: "Siding",
      description: "Full siding replacements using premium James Hardie® fiber cement. We remove old or damaged wood, vinyl, and warped panels, restoring your home's look and protection."
    },
    {
      icon: <Paintbrush className="w-12 h-12" />,
      title: "Painting",
      description: "Professional interior and exterior painting services with attention to detail."
    },
    {
      icon: <Grid2X2 className="w-12 h-12" />,
      title: "Windows",
      description: "High-quality window installation and repair to improve energy efficiency and aesthetics."
    },
    {
      icon: <Sofa className="w-12 h-12" />,
      title: "Interior",
      description: "Comprehensive interior renovation services including kitchens, bathrooms, and living spaces."
    },
    {
      icon: <TreePalm className="w-12 h-12" />,
      title: "Patio",
      description: "Custom patio construction and renovation to create inviting outdoor living areas."
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className='text-center mb-16' animation='fade-up'>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600">Comprehensive solutions for your home</p>
        </AnimatedSection>

        <StaggeredAnimation 
          className="grid md:grid-cols-3 gap-8" 
          staggerDelay={150}
          animation="fade-up"
        >
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-[#ccb78a] mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <a href="#contact" className="text-[#ccb78a] font-semibold flex items-center hover:gap-2 transition-all">
                Learn More <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </StaggeredAnimation>
      </div>
    </section>
  );
}