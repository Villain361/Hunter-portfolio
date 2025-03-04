
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, Coffee, Code, Gamepad, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingElement = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      style={{ 
        animation: `floating ${3 + Math.random() * 2}s ease-in-out infinite`, 
        animationDelay: `${delay}s` 
      }}
    >
      {children}
    </motion.div>
  );
};

const statusOptions = [
  { status: 'Coding', icon: <Code size={14} className="mr-1" /> },
  { status: 'Gaming', icon: <Gamepad size={14} className="mr-1" /> },
  { status: 'Making Coffee', icon: <Coffee size={14} className="mr-1" /> },
  { status: 'Building Bots', icon: <Bot size={14} className="mr-1" /> },
];

const Hero = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentStatus, setCurrentStatus] = useState(statusOptions[0]);
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    if (!backgroundRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const moveX = (clientX / innerWidth) - 0.5;
      const moveY = (clientY / innerHeight) - 0.5;
      
      backgroundRef.current.style.transform = `translate(${moveX * 20}px, ${moveY * 20}px)`;
      setMousePosition({ x: moveX, y: moveY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    // Update status randomly every 10 seconds
    const statusInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * statusOptions.length);
      setCurrentStatus(statusOptions[randomIndex]);
    }, 10000);

    // Update time every minute
    const timeInterval = setInterval(() => {
      setTime(new Date());
    }, 60000);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(statusInterval);
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center pt-20 pb-16 px-6 md:px-12 overflow-hidden relative fun-cursor">
      {/* Floating elements */}
      <FloatingElement className="top-[15%] left-[10%] text-primary" delay={0.2}>
        <Code size={24} className="neon-text" />
      </FloatingElement>
      <FloatingElement className="top-[25%] right-[15%] text-secondary" delay={0.5}>
        <Sparkles size={20} className="text-secondary" />
      </FloatingElement>
      <FloatingElement className="bottom-[30%] left-[20%] text-accent" delay={0.8}>
        <Coffee size={18} />
      </FloatingElement>
      <FloatingElement className="bottom-[20%] right-[25%] text-primary" delay={1.1}>
        <Gamepad size={22} />
      </FloatingElement>
      <FloatingElement className="top-[40%] left-[30%] text-secondary" delay={0.7}>
        <Bot size={20} />
      </FloatingElement>
      
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center relative z-10">
        <motion.div 
          className="w-full md:w-7/12 pt-12 md:pt-0 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div 
            className="absolute top-4 right-4 md:top-0 md:right-0 bg-primary/10 backdrop-blur-md px-3 py-1 rounded-full text-xs flex items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <span className="mr-2">{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            <span className="w-2 h-2 rounded-full bg-green-400 mr-1 animate-pulse"></span>
            <span className="flex items-center">
              {currentStatus.icon} {currentStatus.status}
            </span>
          </motion.div>
          
          <motion.span 
            className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Hello there! 👋
          </motion.span>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            I'm <span className="text-gradient">Hunter</span>, a <br className="hidden md:block" />
            <span className="text-gradient">Coder</span> & <span className="text-gradient">Gamer</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg text-foreground/80 max-w-lg mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            A passionate programmer with a focus on Python and Discord bot development. 
            Welcome to my digital playground where coding meets creativity!
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <a 
              href="#projects" 
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:scale-105 active:scale-95 neon-glow"
            >
              Explore My World
              <ArrowRight size={16} />
            </a>
            
            <a 
              href="#contact" 
              className="px-6 py-3 rounded-lg border border-border bg-transparent text-foreground font-medium transition-all hover:bg-secondary hover:text-white hover:border-transparent hover:scale-105"
            >
              Say Hi!
            </a>
            
            <a 
              href="https://discord.gg/83ftcHz8sh" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-[#5865F2] text-white font-medium transition-all hover:bg-[#7289da] hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36" fill="currentColor">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
              </svg>
              Join Discord
            </a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="w-full md:w-5/12 mt-16 md:mt-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="relative">
            <div className="absolute inset-0 -left-12 -top-12 bg-primary/20 rounded-3xl animate-spin-slow opacity-30"></div>
            <div className="absolute inset-0 -right-12 -bottom-12 bg-secondary/20 rounded-3xl animate-spin-slow opacity-30" style={{ animationDirection: 'reverse' }}></div>
            <div className="relative z-10 aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm flex items-center justify-center neon-border">
              <img 
                src="/lovable-uploads/a0bccd48-79a2-4b65-8423-9b7191000966.png" 
                alt="Hunter's Profile"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </motion.div>
      </div>
      
      <div 
        ref={backgroundRef}
        className="absolute inset-0 pointer-events-none z-0 transition-transform duration-200 ease-out"
        style={{ 
          backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(124, 58, 237, 0.07) 0%, rgba(124, 58, 237, 0) 70%), radial-gradient(circle at 70% 70%, rgba(3, 105, 255, 0.07) 0%, rgba(3, 105, 255, 0) 70%)' 
        }}
      ></div>
    </section>
  );
};

export default Hero;
