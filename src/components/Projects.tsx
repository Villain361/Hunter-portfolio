import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, Bot, Code, Gamepad } from 'lucide-react';
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
  icon?: React.ReactNode;
}

// Sample projects data
const projects: Project[] = [
  {
    id: '1',
    title: 'Discord Gaming Bot',
    description: 'A custom Discord bot for gaming communities with role management, game stats tracking, and automated events.',
    tags: ['Python', 'Discord.py', 'API Integration'],
    image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff',
    github: '#',
    live: '#',
    featured: true,
    icon: <Bot className="text-primary" />,
  },
  {
    id: '2',
    title: 'Game Inventory Tracker',
    description: 'Python application to track gaming inventories, item values, and trading opportunities.',
    tags: ['Python', 'Tkinter', 'SQLite'],
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e',
    github: '#',
    live: '#',
    icon: <Gamepad className="text-secondary" />,
  },
  {
    id: '3',
    title: 'Web Scraper for Game Data',
    description: 'Automated tool to collect and analyze game statistics and player data from various gaming websites.',
    tags: ['Python', 'BeautifulSoup', 'Data Analysis'],
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3',
    github: '#',
    icon: <Code className="text-accent" />,
  },
  {
    id: '4',
    title: 'Automation Scripts Collection',
    description: 'A collection of Python scripts to automate repetitive tasks for gamers and content creators.',
    tags: ['Python', 'Automation', 'Utility'],
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb',
    github: '#',
    icon: <Code className="text-primary" />,
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
        <div className="flex items-center gap-2 mb-2">
          {project.icon}
          <h3 className="text-xl font-display font-semibold group-hover:text-primary transition-colors">{project.title}</h3>
        </div>
        
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
