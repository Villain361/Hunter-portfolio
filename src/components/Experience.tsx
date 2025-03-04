
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string[];
}

const experiences: Experience[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'Tech Company',
    period: 'Jan 2022 - Present',
    description: [
      'Led the frontend development team in building a scalable SaaS platform.',
      'Implemented modern React patterns and performance optimizations.',
      'Collaborated with design team to ensure pixel-perfect implementation.',
      'Mentored junior developers and conducted code reviews.'
    ]
  },
  {
    id: '2',
    title: 'Frontend Developer',
    company: 'Digital Agency',
    period: 'Mar 2020 - Dec 2021',
    description: [
      'Developed responsive websites and web applications for various clients.',
      'Utilized modern JavaScript frameworks like React and Vue.js.',
      'Ensured cross-browser compatibility and optimal performance.',
      'Participated in client meetings and requirement gathering sessions.'
    ]
  },
  {
    id: '3',
    title: 'Web Developer Intern',
    company: 'Startup Inc.',
    period: 'Jun 2019 - Feb 2020',
    description: [
      'Assisted in developing and maintaining company website.',
      'Gained experience in HTML, CSS, JavaScript, and basic React.',
      'Participated in team sprints and agile development processes.',
      'Contributed to UI component library development.'
    ]
  }
];

const Experience = () => {
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
    <section id="experience" ref={sectionRef} className="section-padding px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium reveal opacity-0" style={{ transitionDelay: '0.2s' }}>
            Experience
          </span>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 reveal opacity-0" style={{ transitionDelay: '0.3s' }}>
            Work Experience
          </h2>
          
          <p className="max-w-2xl mx-auto text-foreground/80 reveal opacity-0" style={{ transitionDelay: '0.4s' }}>
            My professional journey in the tech industry, showcasing roles and responsibilities that have shaped my career.
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:translate-x-[-0.5px]"></div>
          
          {/* Experience Items */}
          {experiences.map((exp, index) => (
            <div 
              key={exp.id}
              className={cn(
                "relative mb-16 last:mb-0 flex flex-col md:flex-row reveal opacity-0",
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              )}
              style={{ transitionDelay: `${0.5 + index * 0.2}s` }}
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-primary transform -translate-x-1.5 md:-translate-x-2"></div>
              
              {/* Content */}
              <div className={cn(
                "w-full md:w-1/2 pl-8 md:pl-0 md:pr-12",
                index % 2 === 0 ? "md:pl-12 md:pr-0" : ""
              )}>
                <div className="p-6 bg-secondary/30 rounded-2xl">
                  <div className="mb-2 text-primary font-medium">{exp.period}</div>
                  <h3 className="text-xl font-display font-semibold mb-1">{exp.title}</h3>
                  <div className="text-foreground/70 mb-4">{exp.company}</div>
                  
                  <ul className="space-y-2 text-foreground/80">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Empty Space for Alternating Layout */}
              <div className="hidden md:block w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
