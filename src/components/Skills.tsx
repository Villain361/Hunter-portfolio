
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
  category: 'programming' | 'tools' | 'languages' | 'other';
  icon?: string;
}

const skills: Skill[] = [
  { name: 'Python', level: 90, category: 'programming', icon: '🐍' },
  { name: 'Discord Bot Dev', level: 85, category: 'programming', icon: '🤖' },
  { name: 'VS Code', level: 80, category: 'tools', icon: '⚙️' },
  { name: 'Git', level: 75, category: 'tools', icon: '📦' },
  { name: 'API Integration', level: 70, category: 'programming', icon: '🔄' },
  { name: 'Web Scraping', level: 65, category: 'programming', icon: '🕸️' },
  { name: 'Game Modding', level: 80, category: 'other', icon: '🎮' },
  { name: 'Problem Solving', level: 85, category: 'other', icon: '🧩' },
];

const SkillCard = ({ name, level, icon, delay }: { name: string; level: number; icon?: string; delay: number }) => {
  const progressRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && progressRef.current) {
            setTimeout(() => {
              if (progressRef.current) {
                progressRef.current.style.width = `${level}%`;
              }
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (progressRef.current) {
      observer.observe(progressRef.current);
    }
    
    return () => {
      if (progressRef.current) {
        observer.unobserve(progressRef.current);
      }
    };
  }, [level, delay]);

  return (
    <motion.div 
      className="mb-4 hover:transform hover-scale"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      <div className="flex justify-between mb-1">
        <span className="font-medium text-sm flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          {name}
        </span>
        <span className="text-xs text-foreground/80">{level}%</span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div 
          ref={progressRef}
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out"
          style={{ width: '0%' }}
        ></div>
      </div>
    </motion.div>
  );
};

const SkillRing = ({ name, level, icon, index }: { name: string; level: number; icon?: string; index: number }) => {
  return (
    <motion.div 
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      <div className="relative mb-2">
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="35" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted" />
          <circle 
            cx="40" 
            cy="40" 
            r="35" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="4" 
            strokeDasharray={`${2 * Math.PI * 35 * level / 100} ${2 * Math.PI * 35 * (100 - level) / 100}`}
            strokeDashoffset={2 * Math.PI * 35 * 0.25}
            strokeLinecap="round"
            className="text-primary"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-xl">{icon}</span>
          <span className="text-xs font-semibold">{level}%</span>
        </div>
      </div>
      <span className="text-sm font-medium">{name}</span>
    </motion.div>
  );
};

const Skills = () => {
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

  const programmingSkills = skills.filter(skill => skill.category === 'programming');
  const toolsSkills = skills.filter(skill => skill.category === 'tools');
  const otherSkills = skills.filter(skill => skill.category === 'other');

  return (
    <section id="skills" ref={sectionRef} className="section-padding px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium reveal opacity-0" style={{ transitionDelay: '0.2s' }}>
            My Superpowers
          </span>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 reveal opacity-0" style={{ transitionDelay: '0.3s' }}>
            Skills & Technologies
          </h2>
          
          <p className="max-w-2xl mx-auto text-foreground/80 reveal opacity-0" style={{ transitionDelay: '0.4s' }}>
            Here's what I've been learning and working with. My toolkit is constantly expanding as I explore new technologies and techniques!
          </p>
        </div>
        
        {/* Interactive Skill Visualization */}
        <div className="mb-16 reveal opacity-0" style={{ transitionDelay: '0.5s' }}>
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
            
            <div className="text-center mb-8">
              <h3 className="text-xl font-display font-semibold">Skills Overview</h3>
              <p className="text-sm text-foreground/70">Hover over each skill to see details</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
              {skills.map((skill, index) => (
                <motion.div 
                  key={skill.name}
                  className="flex flex-col items-center justify-center p-4 rounded-xl bg-background/30 backdrop-blur-sm hover:bg-primary/10 transition-colors"
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 10px 25px -5px rgba(0, 123, 255, 0.2)",
                    scale: 1.05
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    delay: 0.05 * index 
                  }}
                >
                  <span className="text-3xl mb-2">{skill.icon}</span>
                  <span className="font-medium text-sm text-center">{skill.name}</span>
                  <div className="w-full h-1 bg-muted/50 rounded-full mt-2 overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-primary to-secondary"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.1 * index }}
                      viewport={{ once: true }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Skill Rings for Mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12 lg:hidden reveal opacity-0" style={{ transitionDelay: '0.5s' }}>
          {skills.slice(0, 8).map((skill, index) => (
            <SkillRing 
              key={skill.name} 
              name={skill.name} 
              level={skill.level} 
              icon={skill.icon}
              index={index}
            />
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <motion.div 
            className="p-6 rounded-2xl cyberpunk-card reveal opacity-0" 
            style={{ transitionDelay: '0.5s' }}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <h3 className="text-xl font-display font-semibold mb-6 flex items-center">
              <span className="text-xl mr-2">🐍</span>
              Programming Skills
            </h3>
            {programmingSkills.map((skill, index) => (
              <SkillCard key={skill.name} name={skill.name} level={skill.level} icon={skill.icon} delay={index * 200} />
            ))}
          </motion.div>
          
          <motion.div 
            className="p-6 rounded-2xl cyberpunk-card reveal opacity-0" 
            style={{ transitionDelay: '0.6s' }}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <h3 className="text-xl font-display font-semibold mb-6 flex items-center">
              <span className="text-xl mr-2">⚙️</span>
              Tools & Technologies
            </h3>
            {toolsSkills.map((skill, index) => (
              <SkillCard key={skill.name} name={skill.name} level={skill.level} icon={skill.icon} delay={index * 200} />
            ))}
          </motion.div>
          
          <motion.div 
            className="p-6 rounded-2xl cyberpunk-card reveal opacity-0 md:col-span-2" 
            style={{ transitionDelay: '0.7s' }}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <h3 className="text-xl font-display font-semibold mb-6 flex items-center">
              <span className="text-xl mr-2">🎮</span>
              Other Skills
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherSkills.map((skill, index) => (
                <SkillCard key={skill.name} name={skill.name} level={skill.level} icon={skill.icon} delay={index * 200} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
