
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, Coffee, Code, Gamepad, Bot, Music, Zap, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingIcon = ({ 
  children, 
  className, 
  delay = 0, 
  duration = 3, 
  distance = 15 
}: { 
  children: React.ReactNode, 
  className?: string, 
  delay?: number, 
  duration?: number,
  distance?: number
}) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      style={{ filter: 'drop-shadow(0 0 8px rgba(0, 123, 255, 0.5))' }}
    >
      <motion.div
        animate={{ 
          y: [-distance/2, distance/2, -distance/2],
          rotate: [-3, 3, -3]
        }}
        transition={{ 
          duration: duration, 
          repeat: Infinity, 
          ease: "easeInOut",
          times: [0, 0.5, 1]
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const statusOptions = [
  { status: 'Coding', icon: <Code size={14} className="mr-1" /> },
  { status: 'Gaming', icon: <Gamepad size={14} className="mr-1" /> },
  { status: 'Making Coffee', icon: <Coffee size={14} className="mr-1" /> },
  { status: 'Building Bots', icon: <Bot size={14} className="mr-1" /> },
  { status: 'Listening to Music', icon: <Music size={14} className="mr-1" /> },
  { status: 'Working on Discord', icon: <MessageSquare size={14} className="mr-1" /> },
];

const Hero = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentStatus, setCurrentStatus] = useState(statusOptions[0]);
  const [time, setTime] = useState(new Date());
  const [showPixieDust, setShowPixieDust] = useState(false);
  const [pixieDustPosition, setPixieDustPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    if (!backgroundRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const moveX = (clientX / innerWidth) - 0.5;
      const moveY = (clientY / innerHeight) - 0.5;
      
      // Smoother parallax effect
      backgroundRef.current.style.transform = `translate(${moveX * 30}px, ${moveY * 30}px)`;
      setMousePosition({ x: moveX, y: moveY });
      
      // Create pixie dust effect occasionally
      if (Math.random() < 0.05) {
        setShowPixieDust(true);
        setPixieDustPosition({ x: clientX, y: clientY });
        
        setTimeout(() => {
          setShowPixieDust(false);
        }, 1000);
      }
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

  // Generate pixie dust particles
  const createPixieDust = () => {
    const particles = [];
    for (let i = 0; i < 12; i++) {
      const size = Math.random() * 6 + 2;
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 60 + 10;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      const duration = Math.random() * 0.5 + 0.5;
      
      particles.push(
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary"
          style={{ 
            width: size, 
            height: size, 
            x: pixieDustPosition.x, 
            y: pixieDustPosition.y,
            // Fix: CSS custom properties need to be defined properly for TypeScript
            // Use CSS transform to handle the final position instead
          }}
          animate={{
            x: pixieDustPosition.x + x,
            y: pixieDustPosition.y + y,
            opacity: [1, 0],
            scale: [1, 0.2],
          }}
          transition={{
            duration,
            ease: "easeOut"
          }}
        />
      );
    }
    return particles;
  };

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center pt-20 pb-16 px-6 md:px-12 overflow-hidden relative fun-cursor">
      {/* Pixie dust effect */}
      <AnimatePresence>
        {showPixieDust && createPixieDust()}
      </AnimatePresence>
      
      {/* Enhanced Floating Icons with Better Animations */}
      <FloatingIcon className="top-[15%] left-[10%] text-primary" delay={0.2} duration={3.5} distance={20}>
        <Code size={24} className="neon-text" />
      </FloatingIcon>
      <FloatingIcon className="top-[25%] right-[15%] text-secondary" delay={0.5} duration={4} distance={25}>
        <Sparkles size={20} className="text-secondary" />
      </FloatingIcon>
      <FloatingIcon className="bottom-[30%] left-[20%] text-accent" delay={0.8} duration={4.5} distance={15}>
        <Coffee size={18} />
      </FloatingIcon>
      <FloatingIcon className="bottom-[20%] right-[25%] text-primary" delay={1.1} duration={3.8} distance={22}>
        <Gamepad size={22} />
      </FloatingIcon>
      <FloatingIcon className="top-[40%] left-[30%] text-secondary" delay={0.7} duration={3.2} distance={18}>
        <Bot size={20} />
      </FloatingIcon>
      <FloatingIcon className="top-[60%] right-[10%] text-purple-500" delay={1.3} duration={4.2} distance={30}>
        <MessageSquare size={18} />
      </FloatingIcon>
      <FloatingIcon className="bottom-[40%] left-[8%] text-yellow-500" delay={1.6} duration={3.7} distance={24}>
        <Zap size={20} />
      </FloatingIcon>
      <FloatingIcon className="top-[20%] right-[30%] text-blue-400" delay={0.9} duration={4.8} distance={28}>
        <Music size={19} />
      </FloatingIcon>
      
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
            <motion.a 
              href="#projects" 
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:scale-105 active:scale-95 neon-glow"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px 5px rgba(0, 123, 255, 0.5)" }}
              whileTap={{ scale: 0.98 }}
            >
              Explore My World
              <ArrowRight size={16} />
            </motion.a>
            
            <motion.a 
              href="https://discord.gg/83ftcHz8sh" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#5865F2] text-white font-medium transition-all hover:scale-105 active:scale-95 shadow-md hover:shadow-[#5865F2]/50"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px 5px rgba(88, 101, 242, 0.5)" }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageSquare size={16} />
              Join Discord
            </motion.a>
            
            <motion.a 
              href="#contact" 
              className="px-6 py-3 rounded-lg border border-border bg-transparent text-foreground font-medium transition-all hover:bg-secondary hover:text-white hover:border-transparent hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Say Hi!
            </motion.a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="w-full md:w-5/12 mt-16 md:mt-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="relative">
            {/* Enhanced animated elements */}
            <motion.div 
              className="absolute inset-0 -left-12 -top-12 bg-primary/20 rounded-3xl" 
              animate={{ 
                rotate: 360,
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                rotate: { duration: 20, ease: "linear", repeat: Infinity },
                scale: { duration: 8, ease: "easeInOut", repeat: Infinity }
              }}
              style={{ opacity: 0.3 }}
            />
            
            <motion.div 
              className="absolute inset-0 -right-12 -bottom-12 bg-secondary/20 rounded-3xl" 
              animate={{ 
                rotate: -360,
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                rotate: { duration: 25, ease: "linear", repeat: Infinity, repeatType: "reverse" },
                scale: { duration: 9, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }
              }}
              style={{ opacity: 0.3 }}
            />
            
            <div className="relative z-10 aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm flex items-center justify-center neon-border">
              {/* Animated light rays */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute bg-gradient-to-t from-transparent via-primary/30 to-transparent"
                    style={{
                      width: '20px',
                      height: '100%',
                      left: `${20 + i * 15}%`,
                      opacity: 0.3,
                      rotate: '15deg',
                      transformOrigin: 'center',
                    }}
                    animate={{
                      x: [-100, 250],
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
              
              <img 
                src="/lovable-uploads/a0bccd48-79a2-4b65-8423-9b7191000966.png" 
                alt="Hunter's Profile"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
              
              {/* Interactive hover effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0"
                whileHover={{ opacity: 0.6 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      </div>
      
      <div 
        ref={backgroundRef}
        className="absolute inset-0 pointer-events-none z-0 transition-transform duration-200 ease-out"
        style={{ 
          backgroundImage: `
            radial-gradient(circle at 30% 30%, rgba(124, 58, 237, 0.1) 0%, rgba(124, 58, 237, 0) 70%), 
            radial-gradient(circle at 70% 70%, rgba(3, 105, 255, 0.1) 0%, rgba(3, 105, 255, 0) 70%),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0) 100%)
          `,
          backgroundSize: '120% 120%',
        }}
      >
        {/* Dynamic grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 123, 255, 0.5) 1px, transparent 1px), linear-gradient(to right, rgba(0, 123, 255, 0.5) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
      </div>
    </section>
  );
};

export default Hero;
