
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  github?: string;
  live?: string;
  featured?: boolean;
}

// Sample projects data
const projects: Project[] = [
  {
    id: '1',
    title: 'Awesome Chat App',
    description: 'A real-time messaging platform with emoji reactions and file sharing capabilities.',
    tags: ['React', 'Firebase', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    github: '#',
    live: '#',
    featured: true,
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
    title: 'Task Tracker',
    description: 'A productivity application for managing tasks with drag-and-drop functionality and collaboration.',
    tags: ['React', 'Context API', 'CSS Modules'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    github: '#',
    live: '#',
  },
  {
    id: '4',
    title: 'Weather Dashboard',
    description: 'Real-time weather data visualization with location-based forecasts and interactive maps.',
    tags: ['JavaScript', 'API Integration', 'Chart.js'],
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    github: '#',
    live: '#',
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className={cn(
        "group relative rounded-2xl overflow-hidden transition-all duration-300",
        project.featured ? "col-span-1 md:col-span-2" : "col-span-1"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            isHovered ? "scale-110 blur-sm" : "scale-100"
          )}
        />
        
        {project.featured && (
          <div className="absolute top-4 right-4 bg-primary/90 text-white px-3 py-1 rounded-full flex items-center text-xs">
            <Star size={12} className="mr-1" />
            Featured
          </div>
        )}
      </div>
      
      <div className="p-6 bg-gradient-to-br from-background/95 to-background/95 backdrop-blur-sm relative z-10">
        <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
        
        <p className="text-foreground/70 mb-4 line-clamp-2">{project.description}</p>
        
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
          "absolute inset-0 bg-gradient-to-br from-primary/80 to-secondary/80 flex items-center justify-center p-6 transition-all duration-300",
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="text-center">
          <h3 className="text-white text-xl font-display font-semibold mb-2">{project.title}</h3>
          <p className="text-white/80 mb-6">{project.description}</p>
          
          <div className="flex justify-center gap-4">
            {project.github && (
              <motion.a 
                href={project.github} 
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label={`GitHub repository for ${project.title}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={16} />
                <span>Code</span>
              </motion.a>
            )}
            
            {project.live && (
              <motion.a 
                href={project.live} 
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-primary hover:bg-white/90 transition-colors"
                aria-label={`Live demo for ${project.title}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={16} />
                <span>Live Demo</span>
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<string>('all');
  
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

  // Get unique tags from all projects
  const allTags = Array.from(new Set(projects.flatMap(project => project.tags)));
  
  // Filter projects based on selected filter
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.tags.includes(filter));

  return (
    <section id="projects" ref={sectionRef} className="section-padding px-6 md:px-12 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium reveal opacity-0" style={{ transitionDelay: '0.2s' }}>
            My Portfolio
          </span>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 reveal opacity-0" style={{ transitionDelay: '0.3s' }}>
            Cool Stuff I Built
          </h2>
          
          <p className="max-w-2xl mx-auto text-foreground/80 reveal opacity-0" style={{ transitionDelay: '0.4s' }}>
            Check out some of my recent projects! Each one represents a unique challenge and learning opportunity.
          </p>
        </div>
        
        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 reveal opacity-0" style={{ transitionDelay: '0.5s' }}>
          <motion.button
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              filter === 'all' 
                ? "bg-primary text-white" 
                : "bg-primary/10 text-foreground hover:bg-primary/20"
            )}
            onClick={() => setFilter('all')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All Projects
          </motion.button>
          
          {allTags.map(tag => (
            <motion.button
              key={tag}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                filter === tag 
                  ? "bg-primary text-white" 
                  : "bg-primary/10 text-foreground hover:bg-primary/20"
              )}
              onClick={() => setFilter(tag)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tag}
            </motion.button>
          ))}
        </div>
        
        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 reveal opacity-0" style={{ transitionDelay: '0.5s' }}>
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
