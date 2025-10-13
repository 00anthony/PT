"use client"
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import SpinningLogo from '@/components/SpinningLogo'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'projects', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 100; // offset for navbar height

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#projects', label: 'Projects' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' },
  ];

  const getLinkClasses = (section: string, isMobile = false) => {
    const isActive = activeSection === section;
    const baseClasses = isMobile 
      ? "block px-3 py-2 rounded transition"
      : "transition";
    
    const activeClasses = isActive 
      ? "text-[#ccb78a] font-semibold" 
      : "text-black hover:text-[#ccb78a]";
    
    return `${baseClasses} ${activeClasses}`;
  };

  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="mt-[-12px]">
              <SpinningLogo />
            </div>
            <span className="w-52 ml-4 leading-6 text-2xl text-black">
              PT ROOFING & RENOVATIONS
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map(({ href, label }) => (
              <a 
                key={href}
                href={href} 
                className={getLinkClasses(href.substring(1))}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a href="#contact" className="bg-[#ccb78a] text-white px-8 py-3 rounded-lg hover:bg-[#b3a078] transition">
              Get Quote
            </a>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(({ href, label }) => (
              <a 
                key={href}
                href={href} 
                className={getLinkClasses(href.substring(1), true)}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}