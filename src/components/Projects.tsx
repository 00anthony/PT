import React from 'react';
import AnimatedSection from './AnimatedSection';
import StaggeredAnimation from './StaggeredAnimation';

interface Project {
  img: string;
  title: string;
}

export default function Projects() {
  const projects: Project[] = [
    { img: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=800&h=600&fit=crop", title: "Modern Roof Installation" },
    { img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop", title: "Kitchen Renovation" },
    { img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=600&fit=crop", title: "Bathroom Remodel" },
    { img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop", title: "Complete Home Exterior" }
  ];

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedSection as="h2" className='text-4xl font-bold text-gray-900 mb-4' animation='fade-up'>
            Recent Projects
          </AnimatedSection>
          <p className="text-xl text-gray-600">See our quality work in action</p>
        </div>
        <StaggeredAnimation className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={150} animation='fade-up'>
          {projects.map((project, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
              <img 
                src={project.img} 
                alt={project.title}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-lg">{project.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </StaggeredAnimation>
      </div>
    </section>
  );
}