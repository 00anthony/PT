"use client"
import React, { useState } from 'react';
import { Menu, X, } from 'lucide-react';
import SpinningLogo from '@/components/SpinningLogo';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center ">
            <div className='mt-[-12]'>
              <SpinningLogo />
            </div>
            <span className='w-52 ml-4 leading-6 text-2xl text-black '>
              PT ROOFING & RENOVATIONS
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="text-black hover:text-[#ccb78a] transition">Home</a>
            <a href="#services" className="text-black hover:text-[#ccb78a] transition">Services</a>
            <a href="#projects" className="text-black hover:text-[#ccb78a] transition">Projects</a>
            <a href="#testimonials" className="text-black hover:text-[#ccb78a] transition">Testimonials</a>
            <a href="#contact" className="text-black hover:text-[#ccb78a] transition">Contact</a>
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
            <a href="#home" className="block px-3 py-2 text-black hover:text-[#ccb78a] rounded">Home</a>
            <a href="#services" className="block px-3 py-2 text-black hover:text-[#ccb78a] rounded">Services</a>
            <a href="#projects" className="block px-3 py-2 text-black hover:text-[#ccb78a] rounded">Projects</a>
            <a href="#testimonials" className="block px-3 py-2 text-black hover:text-[#ccb78a] rounded">Testimonials</a>
            <a href="#contact" className="block px-3 py-2 text-black hover:text-[#ccb78a] rounded">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
}