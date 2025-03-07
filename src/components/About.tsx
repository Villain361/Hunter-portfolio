
import React, { useEffect, useRef, useState } from 'react';
import { FileText, Coffee, Code, Gamepad, Bot, Music, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import Clock from './Clock';
import Weather from './Weather';
import Quote from './Quote';

const StatItem = ({ label, value }: { label: string, value: string }) => {
  return (
    <div className="text-center">
      <h4 className="text-2xl font-bold text-primary">{value}</h4>
      <p className="text-xs text-foreground/70">{label}</p>
    </div>
  );
};

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentMood, setCurrentMood] = useState('😊');
  const moods = ['😊', '🤔', '🔥', '🚀', '☕', '🎮', '🐍', '🤖'];
  
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

  const handleMoodClick = () => {
    const randomIndex = Math.floor(Math.random() * moods.length);
    setCurrentMood(moods[randomIndex]);
  };

  return (
    <section id="about" ref={sectionRef} className="section-padding px-6 md:px-12 relative">
      {/* Enhanced Dynamic Background with Circuit Patterns */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 via-primary/5 to-secondary/5 opacity-70"></div>
        
        {/* Circuit Board Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, #007BFF 1px, transparent 1px),
              radial-gradient(circle at 80% 40%, #9C27B0 1px, transparent 1px),
              radial-gradient(circle at 40% 60%, #FFC107 1px, transparent 1px),
              radial-gradient(circle at 70% 80%, #FF4081 1px, transparent 1px),
              linear-gradient(#007BFF 1px, transparent 1px),
              linear-gradient(to right, #007BFF 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px, 70px 70px, 60px 60px, 50px 50px, 40px 40px, 40px 40px',
          }}
        ></div>
        
        {/* Animated Background Elements */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.2 + Math.random() * 0.3,
            }}
            animate={{
              x: [0, Math.random() * 40 - 20],
              y: [0, Math.random() * 40 - 20],
              rotate: [0, Math.random() * 20 - 10],
              scale: [1, 1 + Math.random() * 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="w-full md:w-5/12">
            <div className="relative reveal opacity-0" style={{ transitionDelay: '0.2s' }}>
              <div className="absolute -left-4 -top-4 w-full h-full border-2 border-primary/20 rounded-2xl"></div>
              <motion.div 
                className="relative z-10 aspect-[4/5] overflow-hidden rounded-2xl flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {/* Enhanced image with colorful prism effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 mix-blend-overlay"></div>
                <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-50 blur-xl z-0"></div>
                
                <div className="absolute inset-0 overflow-hidden z-0">
                  {/* Animated prism light effects */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute bg-gradient-to-r from-primary/30 via-secondary/30 to-transparent"
                      style={{
                        height: '150%',
                        width: '30px',
                        top: '-25%',
                        left: `${(i * 15) - 10}%`,
                        transform: 'rotate(30deg)',
                        opacity: 0.3,
                        filter: 'blur(8px)',
                      }}
                      animate={{
                        left: [`${(i * 15) - 10}%`, `${(i * 15) + 10}%`, `${(i * 15) - 10}%`],
                      }}
                      transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
                
                <img 
                  src="/lovable-uploads/a0bccd48-79a2-4b65-8423-9b7191000966.png" 
                  alt="Hunter's Profile"
                  className="w-full h-full object-cover relative z-10 filter contrast-110 hover:filter-none transition-all duration-500"
                  style={{
                    boxShadow: '0 0 30px rgba(0,123,255,0.2) inset',
                  }}
                />
                
                {/* Interactive overlay effect on hover */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 z-20"
                  whileHover={{ opacity: 0.5 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </div>
            
            {/* Quick Stats Panel */}
            <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-sm reveal opacity-0" style={{ transitionDelay: '0.3s' }}>
              <h3 className="text-center text-lg font-medium mb-4">Quick Stats</h3>
              <div className="grid grid-cols-3 gap-4">
                <StatItem label="Favorite Lang" value="Python" />
                <StatItem label="Discord Bots" value="5+" />
                <StatItem label="Coffee/Day" value="∞" />
              </div>
              
              {/* Mood Meter */}
              <div className="mt-6 text-center">
                <p className="text-sm text-foreground/70 mb-2">Current Mood</p>
                <button 
                  onClick={handleMoodClick}
                  className="text-4xl bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full w-16 h-16 flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label="Change mood"
                >
                  {currentMood}
                </button>
              </div>
            </div>
            
            {/* Live Data Widgets */}
            <div className="mt-8 space-y-4 reveal opacity-0" style={{ transitionDelay: '0.4s' }}>
              <Weather />
              <Quote />
            </div>
          </div>
          
          <div className="w-full md:w-7/12">
            <span className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium reveal opacity-0" style={{ transitionDelay: '0.3s' }}>
              About Me
            </span>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 reveal opacity-0" style={{ transitionDelay: '0.4s' }}>
              A passionate <span className="text-gradient">Coder</span> & <span className="text-gradient">Creator</span>
            </h2>
            
            <div className="text-foreground/80 space-y-4 mb-8">
              <p className="reveal opacity-0" style={{ transitionDelay: '0.5s' }}>
                Hi, I'm Hunter! A passionate programmer and gamer with a love for creating unique solutions through Python. 
                I'm always exploring new ways to improve my skills, whether it's through coding, building Discord bots, or experimenting with gaming tools.
              </p>
              <p className="reveal opacity-0" style={{ transitionDelay: '0.6s' }}>
                When I'm not writing code or developing bots, you'll find me gaming, listening to music, or coming up with new project ideas. 
                I believe in creating tools that solve real problems while having fun in the process.
              </p>
            </div>
            
            <motion.a 
              href="#" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:scale-105 active:scale-95 neon-glow reveal opacity-0"
              style={{ transitionDelay: '0.8s' }}
              whileHover={{ 
                boxShadow: "0 0 15px 5px rgba(0, 123, 255, 0.5)", 
                transition: { duration: 0.2 } 
              }}
            >
              <FileText size={16} />
              <span>Download Resume</span>
            </motion.a>
            
            {/* Enhanced Clock Component */}
            <div className="mt-12 reveal opacity-0" style={{ transitionDelay: '0.9s' }}>
              <h3 className="text-xl font-display font-semibold mb-4">Digital Time Capsule</h3>
              <Clock />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
