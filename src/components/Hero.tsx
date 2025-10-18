import React from 'react';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className='relative w-full h-screen overflow-hidden' id="hero">
      {/* Static Background Image with overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Image
          src='/images/wood-interior.webp'
          alt="Background"
          fill
          quality={75} // adjust for file size
          priority // optional: keeps LCP fast if this is above the fold
          className='object-cover object-center transition-opacity duration-1000'
        />
      </div>

      <section
        id="home"
        className="relative flex items-center justify-start pt-22 text-white h-screen z-20"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold my-20">
            Your Home, Our Craft.
          </h1>
          <p className="md:text-xl pt-12 mb-8 text-[#fcecca]">
            Local experts in roofing and renovations — delivering reliable service and lasting results you can trust.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#contact"
              className="bg-white text-[#ccb78a] px-8 py-3 rounded-lg font-semibold hover:bg-[#fcf9f2] transition text-center"
            >
              Free Estimate
            </a>
            <a
              href="tel:512-999-4366"
              className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#ccb78a] transition text-center"
            >
              Call Now
            </a>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>24/7 Emergency Service</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}