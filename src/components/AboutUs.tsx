import React from 'react';
import { Award, Users, Clock, Shield, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import AnimatedSection from './AnimatedSection';
import StaggeredAnimation from './StaggeredAnimation';

export default function AboutUs() {
  const stats = [
    { number: '20+', label: 'Years Experience' },
    { number: '500+', label: 'Projects Completed' },
    { number: '100%', label: 'Client Satisfaction' },
    { number: '24/7', label: 'Emergency Service' }
  ];

  const values = [
    {
      icon: <Award className="w-16 h-16" />,
      title: 'Excellence in Craft',
      description: 'We take pride in delivering superior workmanship on every project, ensuring lasting quality that stands the test of time.'
    },
    {
      icon: <Shield className="w-16 h-16" />,
      title: 'Licensed & Insured',
      description: 'Fully licensed, bonded, and insured for your protection and peace of mind. Your property is in safe hands.'
    },
    {
      icon: <Users className="w-16 h-16" />,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We listen, communicate clearly, and deliver on our promises every single time.'
    },
    {
      icon: <Clock className="w-16 h-16" />,
      title: 'Timely Completion',
      description: 'We respect your time and budget. Our projects are completed on schedule without compromising on quality.'
    }
  ];

  const certifications = [
    { name: 'GAF Master Elite Contractor', logo: '/certifications/gaf-master-elite.webp' },
    { name: 'CertainTeed SELECT ShingleMaster', logo: '/certifications/certainteed-select-shingle-master.webp' },
    { name: 'Owens Corning Preferred Contractor', logo: '/certifications/owens-corning.png' },
    { name: 'OSHA Safety Certified', logo: '/certifications/osha-logo.webp' }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedSection className='' animation='fade-up'>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About PT Roofing & Renovations
            </h2>
            <div className="w-48 h-1 bg-[#ccb78a] mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Building trust, one project at a time. We&apos;re not just contractors—we&apos;re your partners in protecting and enhancing your most valuable asset.
            </p>
          </AnimatedSection>
          
        </div>

        {/* Stats Section */}
        <StaggeredAnimation className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20" staggerDelay={150} animation='fade-up'>
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl md:text-5xl font-bold text-[#ccb78a] mb-2">{stat.number}</div>
              <div className="text-gray-600 font-semibold">{stat.label}</div>
            </div>
          ))}
        </StaggeredAnimation>
        

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                As a proud family-owned business, we bring expertise and values to every job we undertake.
                Our legacy is built on trust, integrity, and a genuine desire to serve the community, ensuring that each project receives the personalized care and attention it deserves. 
                
              </p>
              <p>
                With over a decade of experience in the industry, our seasoned team brings a wealth of knowledge and skill to every project, 
                ensuring durable results and stunning finishes. 
              </p>
              <p>
                Our journey has been built on a simple philosophy: treat every home as if it were our own. This approach has earned us the trust of hundreds of satisfied customers and countless referrals from those who&apos;ve experienced our dedication firsthand.
              </p>
              <p>
                Today, we&apos;re proud to offer comprehensive roofing and renovation services backed by industry-leading warranties, cutting-edge techniques, and a team of skilled professionals who share our vision of excellence.
              </p>
            </div>
            
            {/* Certifications */}
            <div className="mt-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Certifications & Affiliations</h4>
              <StaggeredAnimation className="grid grid-cols-2 sm:grid-cols-4 gap-6" staggerDelay={150} animation='fade-up'>
                {certifications.map((cert, index) => (
                  <div key={index} className="flex flex-col justify-end items-center gap-2 p-4 rounded-lg">
                    <Image 
                      src={cert.logo} 
                      alt={cert.name}
                      height={96}
                      width={96}
                      className="w-auto object-contain transition-all"
                    />
                    <span className="text-xs text-center text-gray-700">{cert.name}</span>
                  </div>
                ))}
              </StaggeredAnimation>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
              <Image 
                src="/images/bathroom.webp" 
                alt="bathroom"
                fill
                className="w-full h-full object-cover"
              />
            </div>
            {/* Accent decoration */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#ccb78a] opacity-20 rounded-lg -z-10"></div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">What Sets Us Apart</h3>
          <StaggeredAnimation className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={150} animation='fade-up'>
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="p-0 inline-flex items-center justify-center w-28 h-28 bg-opacity-10 mb-4 text-[#ccb78a]">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </StaggeredAnimation>
        </div>

        {/* Mission Statement */}
        <AnimatedSection className="bg-gradient-to-br from-[#ccb78a] to-[#aa9564] rounded-2xl p-8 md:p-12 text-white text-center" animation='fade-up'>
          <TrendingUp className="w-12 h-12 mx-auto mb-6 opacity-90" />
          <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
          <p className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto opacity-95">
            To provide exceptional roofing and renovation services that exceed expectations, protect homes, and enhance lives. We&apos;re committed to building lasting relationships through honest communication, superior craftsmanship, and unwavering integrity.
          </p>
        </AnimatedSection>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Experience the Difference?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied homeowners who&apos;ve trusted us with their most important investment.
          </p>
          <AnimatedSection>
            <a 
              href="#contact" 
              className="inline-block bg-[#ccb78a] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#b3a078] transition-colors shadow-lg hover:shadow-xl"
            >
              Get Your Free Consultation
            </a>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}