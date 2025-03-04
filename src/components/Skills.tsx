
import React, { useEffect, useRef } from 'react';

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'design' | 'tools';
}

const skills: Skill[] = [
  { name: 'HTML/CSS', level: 90, category: 'frontend' },
  { name: 'JavaScript', level: 85, category: 'frontend' },
  { name: 'React', level: 80, category: 'frontend' },
  { name: 'TypeScript', level: 75, category: 'frontend' },
  { name: 'Node.js', level: 70, category: 'backend' },
  { name: 'Express', level: 65, category: 'backend' },
  { name: 'MongoDB', level: 70, category: 'backend' },
  { name: 'SQL', level: 60, category: 'backend' },
  { name: 'UI/UX Design', level: 80, category: 'design' },
  { name: 'Figma', level: 85, category: 'design' },
  { name: 'Git', level: 75, category: 'tools' },
  { name: 'Docker', level: 60, category: 'tools' },
];

const SkillBar = ({ name, level, delay }: { name: string; level: number; delay: number }) => {
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
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-medium text-sm">{name}</span>
        <span className="text-xs text-foreground/80">{level}%</span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div 
          ref={progressRef}
          className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
          style={{ width: '0%' }}
        ></div>
      </div>
    </div>
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
            My Skills
          </span>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 reveal opacity-0" style={{ transitionDelay: '0.3s' }}>
            Technical Expertise
          </h2>
          
          <p className="max-w-2xl mx-auto text-foreground/80 reveal opacity-0" style={{ transitionDelay: '0.4s' }}>
            I've cultivated a diverse set of skills in web development, design, and various tools. Here's an overview of my technical proficiency.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className="p-6 bg-secondary/30 rounded-2xl reveal opacity-0" style={{ transitionDelay: '0.5s' }}>
            <h3 className="text-xl font-display font-semibold mb-6">Frontend Development</h3>
            {frontendSkills.map((skill, index) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={index * 200} />
            ))}
          </div>
          
          <div className="p-6 bg-secondary/30 rounded-2xl reveal opacity-0" style={{ transitionDelay: '0.6s' }}>
            <h3 className="text-xl font-display font-semibold mb-6">Backend Development</h3>
            {backendSkills.map((skill, index) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={index * 200} />
            ))}
          </div>
          
          <div className="p-6 bg-secondary/30 rounded-2xl reveal opacity-0" style={{ transitionDelay: '0.7s' }}>
            <h3 className="text-xl font-display font-semibold mb-6">Design</h3>
            {designSkills.map((skill, index) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={index * 200} />
            ))}
          </div>
          
          <div className="p-6 bg-secondary/30 rounded-2xl reveal opacity-0" style={{ transitionDelay: '0.8s' }}>
            <h3 className="text-xl font-display font-semibold mb-6">Tools & Technologies</h3>
            {toolSkills.map((skill, index) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={index * 200} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
