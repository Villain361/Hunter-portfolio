
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  github?: string;
  live?: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce solution with product management, shopping cart, and secure checkout functionality.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    github: '#',
    live: '#',
  },
  {
    id: '2',
    title: 'Portfolio Website',
    description: 'A responsive personal portfolio website showcasing projects and skills with modern design.',
    tags: ['HTML', 'CSS', 'JavaScript', 'React'],
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    github: '#',
    live: '#',
  },
  {
    id: '3',
    title: 'Task Management App',
    description: 'A productivity application for managing tasks with drag-and-drop functionality and collaborative features.',
    tags: ['React', 'Firebase', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    github: '#',
    live: '#',
  },
  {
    id: '4',
    title: 'Weather Dashboard',
    description: 'Real-time weather information app featuring forecasts, location-based data, and interactive maps.',
    tags: ['JavaScript', 'API Integration', 'CSS'],
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    github: '#',
    live: '#',
  },
];

const ProjectCard = ({ project }: { project: Project }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="group relative rounded-2xl overflow-hidden bg-secondary/20 transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            isHovered ? "scale-110 blur-sm" : "scale-100"
          )}
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-display font-semibold mb-2">{project.title}</h3>
        
        <p className="text-foreground/70 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span 
              key={tag} 
              className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex gap-4">
          {project.github && (
            <a 
              href={project.github} 
              className="flex items-center gap-1 text-sm text-foreground/70 hover:text-primary transition-colors"
              aria-label={`GitHub repository for ${project.title}`}
            >
              <Github size={16} />
              <span>Code</span>
            </a>
          )}
          
          {project.live && (
            <a 
              href={project.live} 
              className="flex items-center gap-1 text-sm text-foreground/70 hover:text-primary transition-colors"
              aria-label={`Live demo for ${project.title}`}
            >
              <ExternalLink size={16} />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
      
      <div 
        className={cn(
          "absolute inset-0 bg-black/80 flex items-center justify-center p-6 transition-all duration-300",
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="text-center">
          <h3 className="text-white text-xl font-display font-semibold mb-2">{project.title}</h3>
          <p className="text-white/80 mb-6">{project.description}</p>
          
          <div className="flex justify-center gap-4">
            {project.github && (
              <a 
                href={project.github} 
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label={`GitHub repository for ${project.title}`}
              >
                <Github size={16} />
                <span>Code</span>
              </a>
            )}
            
            {project.live && (
              <a 
                href={project.live} 
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
                aria-label={`Live demo for ${project.title}`}
              >
                <ExternalLink size={16} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = sectionRef.current?.querySelectorAll('.reveal') || [];
    elements.forEach((el) => observer.observe(el));
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section-padding px-6 md:px-12 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium reveal opacity-0" style={{ transitionDelay: '0.2s' }}>
            My Work
          </span>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 reveal opacity-0" style={{ transitionDelay: '0.3s' }}>
            Featured Projects
          </h2>
          
          <p className="max-w-2xl mx-auto text-foreground/80 reveal opacity-0" style={{ transitionDelay: '0.4s' }}>
            Explore a selection of my recent work, highlighting my skills in development and design. Each project represents a unique challenge and solution.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal opacity-0" style={{ transitionDelay: '0.5s' }}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
