
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, className = '', style, ...props }) => {
  return (
    <div 
      className={`group relative overflow-hidden rounded-2xl bg-white shadow-xl h-[420px] flex flex-col shrink-0 snap-center transition-all duration-500 hover:shadow-2xl ${className}`}
      style={style}
      {...props}
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img 
          src={service.image} 
          alt={service.title}
          loading='lazy' 
          className="h-full w-full object-cover transition-transform duration-700 will-change-transform "
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10 transition-opacity duration-300 group-hover:opacity-95"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 mt-auto h-full flex flex-col justify-end">
        {/* Icon Badge */}
        <div className="absolute top-8 left-8 p-3 rounded-xl bg-black/40 border border-white/20 text-[#ccb78a] transition-all duration-500  group-hover:bg-[#ccb78a] group-hover:text-white ">
          {service.icon}
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-white tracking-tight">
            {service.title}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 group-hover:text-white transition-colors duration-300">
            {service.description}
          </p>
          
          <div className="pt-4 flex items-center gap-2 text-[#ccb78a] font-bold text-xs uppercase tracking-widest group/btn cursor-pointer">
            <span className="relative overflow-hidden h-5 flex items-center">
              <a
                href='/#contact'
                className="inline-block duration-300 ">
                Learn More
              </a>
            </span>
            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </div>
        </div>
      </div>
      
      {/* Decorative Border Bottom */}
      <div className="absolute bottom-0 left-0 h-1.5 bg-[#ccb78a] transition-all duration-500 w-0 group-hover:w-full"></div>
    </div>
  );
};

export default ServiceCard;
