
import React, { useEffect, useRef } from 'react';
import { FileText } from 'lucide-react';

const About = () => {
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
    <section id="about" ref={sectionRef} className="section-padding px-6 md:px-12 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="w-full md:w-5/12">
            <div className="relative reveal opacity-0" style={{ transitionDelay: '0.2s' }}>
              <div className="absolute -left-4 -top-4 w-full h-full border-2 border-primary/20 rounded-2xl"></div>
              <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-2xl bg-muted"></div>
            </div>
          </div>
          
          <div className="w-full md:w-7/12">
            <span className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium reveal opacity-0" style={{ transitionDelay: '0.3s' }}>
              About Me
            </span>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 reveal opacity-0" style={{ transitionDelay: '0.4s' }}>
              A dedicated Developer and Designer based in <span className="text-gradient">Your Location</span>
            </h2>
            
            <div className="text-foreground/80 space-y-4 mb-8">
              <p className="reveal opacity-0" style={{ transitionDelay: '0.5s' }}>
                As a passionate web developer, I have been crafting digital experiences for over X years. My approach combines technical expertise with creative problem-solving to deliver solutions that exceed expectations.
              </p>
              <p className="reveal opacity-0" style={{ transitionDelay: '0.6s' }}>
                I specialize in creating responsive websites and applications that provide users with a seamless experience. My work is driven by a deep understanding of both design principles and technical implementation.
              </p>
              <p className="reveal opacity-0" style={{ transitionDelay: '0.7s' }}>
                When I'm not coding, you can find me [your hobbies or interests]. These activities keep me inspired and help me bring fresh perspectives to my work.
              </p>
            </div>
            
            <a 
              href="#" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:scale-105 active:scale-95 reveal opacity-0"
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
