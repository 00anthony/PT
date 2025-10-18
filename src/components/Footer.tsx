import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 pb-8">
          <div className="min-w-0">
            <div className="flex items-center mb-4">
              <Image
                src='/logo/logo.webp'
                alt="footer-logo"
                width={48}
                height={48}
                quality={75}
                className='flex-shrink-0'
              />
              <span className="ml-2 text-xl font-bold leading-tight">PT ROOFING AND RENOVATIONS</span>
            </div>
            <p className="text-gray-400">Your trusted partner for roofing and renovation excellence.</p>
          </div>
          <div className="min-w-0">
            <h3 className="font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#services" className="hover:text-white">Roofing</a></li>
              <li><a href="#services" className="hover:text-white">Siding</a></li>
              <li><a href="#services" className="hover:text-white">more...</a></li>
            </ul>
          </div>
          <div className="min-w-0">
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#home" className="hover:text-white">About Us</a></li>
              <li><a href="#projects" className="hover:text-white">Projects</a></li>
              <li><a href="#testimonials" className="hover:text-white">Testimonials</a></li>
            </ul>
          </div>
          <div className="min-w-0">
            <h3 className="font-bold mb-2">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="tel:512-999-4366"
                  className="text-gray-400 hover:text-[#ccb78a] transition"
                >
                  (512) 999-4366
                </a>
              </li>
              <li className="break-all">
                <a
                  href='mailto:ptroofingandrenovations.info@gmail.com'
                  className='text-gray-400 hover:text-[#ccb78a] transition'
                >
                  ptroofingandrenovations.info@gmail.com
                </a>
              </li>
              <li>Austin - San Marcos Area</li>
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