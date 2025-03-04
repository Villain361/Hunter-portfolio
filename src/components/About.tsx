
import React, { useEffect, useRef, useState } from 'react';
import { FileText, Coffee, Code, Music, Book, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const FunFact = ({ icon, fact }: { icon: React.ReactNode, fact: string }) => {
  return (
    <div className="flex items-start p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
      <div className="mr-3 text-primary">{icon}</div>
      <p className="text-sm">{fact}</p>
    </div>
  );
};

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
  const moods = ['😊', '🤔', '🔥', '🚀', '☕', '🌈', '🎮', '🎧'];
  
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
    <section id="about" ref={sectionRef} className="section-padding px-6 md:px-12 bg-secondary/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="w-full md:w-5/12">
            <div className="relative reveal opacity-0" style={{ transitionDelay: '0.2s' }}>
              <div className="absolute -left-4 -top-4 w-full h-full border-2 border-primary/20 rounded-2xl"></div>
              <motion.div 
                className="relative z-10 aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="text-9xl p-8">👨‍🎓</div>
              </motion.div>
            </div>
            
            {/* Quick Stats Panel */}
            <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-sm reveal opacity-0" style={{ transitionDelay: '0.3s' }}>
              <h3 className="text-center text-lg font-medium mb-4">Quick Stats</h3>
              <div className="grid grid-cols-3 gap-4">
                <StatItem label="Age" value="20" />
                <StatItem label="Projects" value="15+" />
                <StatItem label="Fav Lang" value="JS" />
              </div>
              
              {/* Mood Meter */}
              <div className="mt-6 text-center">
                <p className="text-sm text-foreground/70 mb-2">Daily Mood</p>
                <button 
                  onClick={handleMoodClick}
                  className="text-4xl bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full w-16 h-16 flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label="Change mood"
                >
                  {currentMood}
                </button>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-7/12">
            <span className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium reveal opacity-0" style={{ transitionDelay: '0.3s' }}>
              About Me
            </span>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 reveal opacity-0" style={{ transitionDelay: '0.4s' }}>
              A passionate Student & <span className="text-gradient">Creator</span>
            </h2>
            
            <div className="text-foreground/80 space-y-4 mb-8">
              <p className="reveal opacity-0" style={{ transitionDelay: '0.5s' }}>
                Hey there! I'm a student passionate about technology and creating cool stuff. I love to experiment with new technologies and build projects that solve real problems (or are just fun to make).
              </p>
              <p className="reveal opacity-0" style={{ transitionDelay: '0.6s' }}>
                Currently, I'm focusing on web development and design, but I'm always exploring new areas and expanding my skillset. When I'm not coding, you can find me listening to music, reading, or playing video games.
              </p>
            </div>
            
            {/* Fun Facts Section */}
            <div className="mb-8 reveal opacity-0" style={{ transitionDelay: '0.7s' }}>
              <h3 className="text-xl font-display font-semibold mb-4">Fun Facts About Me</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FunFact 
                  icon={<Coffee size={18} />} 
                  fact="I've consumed approximately 500 cups of coffee in the last year alone." 
                />
                <FunFact 
                  icon={<Code size={18} />} 
                  fact="My first line of code was a 'Hello, World!' in Python at age 13." 
                />
                <FunFact 
                  icon={<Music size={18} />} 
                  fact="I listen to lo-fi beats while coding - it helps me focus!" 
                />
                <FunFact 
                  icon={<Book size={18} />} 
                  fact="I'm currently learning about machine learning and AI in my spare time." 
                />
              </div>
            </div>
            
            <a 
              href="#" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:scale-105 active:scale-95 neon-glow reveal opacity-0"
              style={{ transitionDelay: '0.8s' }}
            >
              <FileText size={16} />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
