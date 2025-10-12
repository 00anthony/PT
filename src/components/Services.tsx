import React from 'react';
import { Shield, Home, Wrench, ChevronRight } from 'lucide-react';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function Services() {
  const services: Service[] = [
    {
      icon: <Home className="w-12 h-12" />,
      title: "Roof Installation",
      description: "Expert installation of residential and commercial roofing systems with premium materials."
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Roof Repair",
      description: "Fast and reliable repairs to fix leaks, damaged shingles, and structural issues."
    },
    {
      icon: <Wrench className="w-12 h-12" />,
      title: "Home Renovations",
      description: "Complete renovation services from kitchens to bathrooms and full home remodels."
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600">Comprehensive solutions for your home</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <div className="text-[#ccb78a] mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <a href="#contact" className="text-[#ccb78a] font-semibold flex items-center hover:gap-2 transition-all">
                Learn More <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}