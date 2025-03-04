
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import FunFacts from '@/components/FunFacts';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  useEffect(() => {
    // Set document title
    document.title = 'Student Portfolio';
    
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
        title: "👋 Welcome to my portfolio!",
        description: "Feel free to explore and discover more about me and my projects!",
      });
    }, 1500);
    
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
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };
    
    window.addEventListener('keydown', checkKonami);
    
    return () => {
      window.removeEventListener('keydown', checkKonami);
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
        <FunFacts />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
