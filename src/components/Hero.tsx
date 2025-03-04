
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!backgroundRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const moveX = (clientX / innerWidth) - 0.5;
      const moveY = (clientY / innerHeight) - 0.5;
      
      backgroundRef.current.style.transform = `translate(${moveX * 10}px, ${moveY * 10}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center pt-20 pb-16 px-6 md:px-12 overflow-hidden relative">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center">
        <div className="w-full md:w-7/12 pt-12 md:pt-0 z-10">
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Welcome to my portfolio
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            I <span className="text-gradient">design</span> and <span className="text-gradient">develop</span> exceptional digital experiences
          </h1>
          
          <p className="text-lg text-foreground/80 max-w-lg mb-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            A passionate web developer and designer focused on creating beautiful, functional, and user-centered digital experiences.
          </p>
          
          <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <a 
              href="#projects" 
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:scale-105 active:scale-95"
            >
              View Projects
              <ArrowRight size={16} />
            </a>
            
            <a 
              href="#contact" 
              className="px-6 py-3 rounded-lg border border-border bg-transparent text-foreground font-medium transition-all hover:bg-secondary"
            >
              Contact Me
            </a>
          </div>
        </div>
        
        <div className="w-full md:w-5/12 mt-16 md:mt-0 animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="relative">
            <div className="absolute inset-0 -left-12 -top-12 bg-secondary rounded-3xl animate-spin-slow opacity-30"></div>
            <div className="absolute inset-0 -right-12 -bottom-12 bg-primary/20 rounded-3xl animate-spin-slow opacity-30" style={{ animationDirection: 'reverse' }}></div>
            <div className="relative z-10 aspect-square rounded-3xl overflow-hidden bg-muted flex items-center justify-center">
              <div className="text-4xl">👋</div>
            </div>
          </div>
        </div>
      </div>
      
      <div 
        ref={backgroundRef}
        className="absolute inset-0 pointer-events-none z-0 transition-transform duration-200 ease-out"
        style={{ backgroundImage: 'radial-gradient(circle at 30% 80%, rgba(64, 64, 64, 0.04) 0%, rgba(64, 64, 64, 0.04) 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%)' }}
      ></div>
    </section>
  );
};

export default Hero;
