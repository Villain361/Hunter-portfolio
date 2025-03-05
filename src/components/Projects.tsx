
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Construction, Lightbulb, Stars, Palette, Rocket, Code } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConceptProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  color: string;
  icon: React.ReactNode;
}

// Concept projects - ideas rather than actual implementations
const conceptProjects: ConceptProject[] = [
  {
    id: '1',
    title: 'Discord Community Bot',
    description: 'A concept for an AI-powered Discord bot that could help manage gaming communities with custom commands and automated event organizing.',
    tags: ['Concept', 'Discord', 'Community'],
    color: 'from-purple-500/20 to-indigo-500/20',
    icon: <Code className="text-purple-500" />,
  },
  {
    id: '2',
    title: 'Game Inventory Manager',
    description: 'A concept app that could help gamers track their in-game items, calculate values, and find trading opportunities across multiple platforms.',
    tags: ['Concept', 'Gaming', 'Utility'],
    color: 'from-blue-500/20 to-cyan-500/20',
    icon: <Stars className="text-blue-500" />,
  },
  {
    id: '3',
    title: 'Pixel Art Generator',
    description: 'A creative tool concept that could generate pixel art from text descriptions using AI, perfect for indie game developers and digital artists.',
    tags: ['Concept', 'Creative', 'Art'],
    color: 'from-emerald-500/20 to-green-500/20',
    icon: <Palette className="text-emerald-500" />,
  },
  {
    id: '4',
    title: 'Retro Game Launcher',
    description: 'A conceptual retro-styled game launcher that could organize your classic game collection with a nostalgic interface.',
    tags: ['Concept', 'UI/UX', 'Gaming'],
    color: 'from-amber-500/20 to-yellow-500/20',
    icon: <Lightbulb className="text-amber-500" />,
  },
  {
    id: '5',
    title: 'Streamer Dashboard',
    description: 'A concept for a customizable streaming dashboard that could integrate with popular platforms to help content creators manage their streams.',
    tags: ['Concept', 'Streaming', 'Tool'],
    color: 'from-red-500/20 to-rose-500/20',
    icon: <Rocket className="text-red-500" />,
  },
];

const ConceptProjectCard = ({ project, index }: { project: ConceptProject; index: number }) => {
  return (
    <motion.div 
      className="group relative rounded-2xl overflow-hidden bg-gradient-to-br backdrop-blur-sm transition-all duration-300"
      style={{ backgroundImage: `linear-gradient(to bottom right, ${project.color.split(' ')[0]}, ${project.color.split(' ')[1]})` }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ y: -10 }}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center mb-4">
          <div className="mr-3 p-2 bg-white/10 rounded-lg">
            {project.icon}
          </div>
          <h3 className="text-xl font-display font-semibold group-hover:text-primary transition-colors">{project.title}</h3>
        </div>
        
        <p className="text-foreground/70 mb-6 flex-grow">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span 
              key={tag} 
              className="text-xs font-medium px-2 py-1 rounded-full bg-white/10 text-foreground/90"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <motion.div 
          className="w-full py-2 px-4 rounded-lg bg-white/10 text-center text-sm font-medium"
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
          whileTap={{ scale: 0.95 }}
        >
          <Construction className="inline-block mr-2 h-4 w-4" />
          <span>Coming Soon</span>
        </motion.div>
      </div>
      
      {/* Glowing particle effects */}
      <div className="absolute top-0 right-0 p-3">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            rotate: { duration: 10, ease: "linear", repeat: Infinity },
            scale: { duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }
          }}
        >
          <Sparkles className="text-white/40" size={16} />
        </motion.div>
      </div>
    </motion.div>
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
    <section id="projects" ref={sectionRef} className="section-padding px-6 md:px-12 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium reveal opacity-0" style={{ transitionDelay: '0.2s' }}>
            Future Ideas
          </span>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 reveal opacity-0" style={{ transitionDelay: '0.3s' }}>
            Concept Projects
          </h2>
          
          <p className="max-w-2xl mx-auto text-foreground/80 reveal opacity-0" style={{ transitionDelay: '0.4s' }}>
            While I'm currently focusing on developing my skills, here are some project concepts I'm excited to explore in the future!
          </p>
        </div>
        
        {/* Project concepts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal opacity-0" style={{ transitionDelay: '0.5s' }}>
          {conceptProjects.map((project, index) => (
            <ConceptProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        
        {/* Call to action */}
        <div className="mt-16 text-center reveal opacity-0" style={{ transitionDelay: '0.6s' }}>
          <motion.div 
            className="inline-block p-6 rounded-xl bg-primary/10 backdrop-blur-sm max-w-2xl mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-display font-semibold mb-3">Have a project idea?</h3>
            <p className="text-foreground/70 mb-4">
              I'm always open to collaboration and new ideas. If you have a project concept you'd like to discuss, feel free to reach out!
            </p>
            <motion.a 
              href="#contact" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px 5px rgba(0, 123, 255, 0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              Let's Connect
              <Sparkles size={16} />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
