import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import MusicPlayer from '@/components/MusicPlayer';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  useEffect(() => {
    // Set document title
    document.title = 'Hunter\'s Portfolio';
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const href = this.getAttribute('href');
        if (!href) return;
        
        const targetElement = document.querySelector(href);
        if (!targetElement) return;
        
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
          behavior: 'smooth'
        });
      });
    });
    
    // Welcome toast
    setTimeout(() => {
      toast({
        title: "👋 Welcome to Hunter's digital playground!",
        description: "Feel free to explore and discover more about me and my projects!",
      });
    }, 1500);

    // Discord server toast
    setTimeout(() => {
      toast({
        title: "🎮 Join my Discord server!",
        description: "Connect with me and other developers at discord.gg/83ftcHz8sh",
        action: (
          <a 
            href="https://discord.gg/83ftcHz8sh"
            target="_blank"
            rel="noopener noreferrer" 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#5865F2] text-white hover:bg-[#5865F2]/90 h-8 px-4 py-2"
          >
            Join Now
          </a>
        ),
      });
    }, 8000);
    
    // Easter egg
    let konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    const checkKonami = (e: KeyboardEvent) => {
      if (e.key === konami[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konami.length) {
          toast({
            title: "🎮 Konami Code Activated!",
            description: "You found a secret! You must be a true gamer!",
          });
          
          // Create a pixie dust explosion effect
          const particles = Array.from({ length: 50 }, (_, i) => {
            const particle = document.createElement('div');
            particle.className = 'pixie-dust-particle';
            particle.style.cssText = `
              position: fixed;
              width: ${Math.random() * 10 + 2}px;
              height: ${Math.random() * 10 + 2}px;
              background: ${['#007BFF', '#9C27B0', '#FFC107', '#FF4081'][Math.floor(Math.random() * 4)]};
              border-radius: 50%;
              top: 50%;
              left: 50%;
              z-index: 9999;
              pointer-events: none;
              opacity: 1;
              animation: pixieDustFly 1.5s ease-out forwards;
              transform: translate(-50%, -50%);
            `;
            
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 200 + 50;
            const duration = Math.random() * 1 + 0.5;
            
            particle.style.setProperty('--angle', angle.toString());
            particle.style.setProperty('--distance', `${distance}px`);
            particle.style.setProperty('--duration', `${duration}s`);
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
              document.body.removeChild(particle);
            }, 2000);
            
            return particle;
          });
          
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };
    
    window.addEventListener('keydown', checkKonami);
    
    // Add pixie dust animation style
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pixieDustFly {
        0% { 
          transform: translate(-50%, -50%) scale(1); 
          opacity: 1; 
        }
        100% { 
          transform: translate(
            calc(-50% + cos(var(--angle)) * var(--distance)), 
            calc(-50% + sin(var(--angle)) * var(--distance))
          ) scale(0);
          opacity: 0; 
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      window.removeEventListener('keydown', checkKonami);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="relative">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <MusicPlayer />
    </div>
  );
};

export default Index;
