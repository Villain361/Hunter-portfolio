
import React, { useEffect, useRef } from 'react';
import { Radar } from 'recharts';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'design' | 'tools';
  icon?: string;
}

const skills: Skill[] = [
  { name: 'HTML/CSS', level: 90, category: 'frontend', icon: '🌐' },
  { name: 'JavaScript', level: 85, category: 'frontend', icon: '📜' },
  { name: 'React', level: 80, category: 'frontend', icon: '⚛️' },
  { name: 'TypeScript', level: 75, category: 'frontend', icon: '📘' },
  { name: 'Node.js', level: 70, category: 'backend', icon: '🟢' },
  { name: 'Express', level: 65, category: 'backend', icon: '🚂' },
  { name: 'MongoDB', level: 70, category: 'backend', icon: '🍃' },
  { name: 'SQL', level: 60, category: 'backend', icon: '📊' },
  { name: 'UI/UX Design', level: 80, category: 'design', icon: '🎨' },
  { name: 'Figma', level: 85, category: 'design', icon: '✏️' },
  { name: 'Git', level: 75, category: 'tools', icon: '📚' },
  { name: 'Docker', level: 60, category: 'tools', icon: '🐋' },
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

  const frontendSkills = skills.filter(skill => skill.category === 'frontend');
  const backendSkills = skills.filter(skill => skill.category === 'backend');
  const designSkills = skills.filter(skill => skill.category === 'design');
  const toolSkills = skills.filter(skill => skill.category === 'tools');

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
            Here's what I've been learning and working with. My toolkit is constantly expanding as I love to experiment with new technologies!
          </p>
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
              <span className="text-xl mr-2">⚡</span>
              Frontend Skills
            </h3>
            {frontendSkills.map((skill, index) => (
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
              <span className="text-xl mr-2">🛠️</span>
              Backend Skills
            </h3>
            {backendSkills.map((skill, index) => (
              <SkillCard key={skill.name} name={skill.name} level={skill.level} icon={skill.icon} delay={index * 200} />
            ))}
          </motion.div>
          
          <motion.div 
            className="p-6 rounded-2xl cyberpunk-card reveal opacity-0" 
            style={{ transitionDelay: '0.7s' }}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <h3 className="text-xl font-display font-semibold mb-6 flex items-center">
              <span className="text-xl mr-2">🎨</span>
              Design Skills
            </h3>
            {designSkills.map((skill, index) => (
              <SkillCard key={skill.name} name={skill.name} level={skill.level} icon={skill.icon} delay={index * 200} />
            ))}
          </motion.div>
          
          <motion.div 
            className="p-6 rounded-2xl cyberpunk-card reveal opacity-0" 
            style={{ transitionDelay: '0.8s' }}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <h3 className="text-xl font-display font-semibold mb-6 flex items-center">
              <span className="text-xl mr-2">🧰</span>
              Tools & Technologies
            </h3>
            {toolSkills.map((skill, index) => (
              <SkillCard key={skill.name} name={skill.name} level={skill.level} icon={skill.icon} delay={index * 200} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
