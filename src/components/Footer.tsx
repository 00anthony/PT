import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 pb-8">
          <div>
            <div className="flex items-center mb-4">
              <Image
                src='/logo/logo.webp'
                alt="footer-logo"
                width={48}
                height={48}
                quality={75} // adjust for file size
                className=''
              />
              <span className="ml-2 text-xl font-bold">PT ROOFING AND RENOVATIONS</span>
            </div>
            <p className="text-gray-400">Your trusted partner for roofing and renovation excellence.</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#services" className="hover:text-white">Roof Installation</a></li>
              <li><a href="#services" className="hover:text-white">Roof Repair</a></li>
              <li><a href="#services" className="hover:text-white">Renovations</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#home" className="hover:text-white">About Us</a></li>
              <li><a href="#projects" className="hover:text-white">Projects</a></li>
              <li><a href="#testimonials" className="hover:text-white">Testimonials</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>(555) 123-4567</li>
              <li>info@roofmasterpro.com</li>
              <li>123 Main Street</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 py-2 text-center text-gray-400 text-sm">
          <p>&copy; 2025 PT ROOFING AND RENOVATIONS LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}