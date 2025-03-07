
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import Friends from '@/components/Friends';

const Index = () => {
  useEffect(() => {
    // Set document title
    document.title = 'Hunter\'s Portfolio';
    
    // Improved smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const href = this.getAttribute('href');
        if (!href) return;
        
        const targetElement = document.querySelector(href);
        if (!targetElement) return;
        
        // Add smooth scroll behavior to html and body elements
        document.documentElement.style.scrollBehavior = 'smooth';
        document.body.style.scrollBehavior = 'smooth';
        
        // Scroll with offset for header
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Adjust scroll position for fixed header
        setTimeout(() => {
          const headerOffset = 80;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: targetPosition - headerOffset,
            behavior: 'smooth'
          });
        }, 0);
      });
    });
    
    // Konami code Easter egg
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    const checkKonami = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          activateEasterEgg();
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };
    
    const activateEasterEgg = () => {
      const audio = new Audio('https://soundbible.com/mp3/TomCat-Mr_Smith-2055290520.mp3');
      audio.play();
      
      document.body.classList.add('konami-active');
      
      setTimeout(() => {
        document.body.classList.remove('konami-active');
      }, 5000);
    };
    
    window.addEventListener('keydown', checkKonami);
    
    // Add Konami code CSS
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @keyframes rainbow {
        0% { color: red; }
        14% { color: orange; }
        28% { color: yellow; }
        42% { color: green; }
        57% { color: blue; }
        71% { color: indigo; }
        85% { color: violet; }
        100% { color: red; }
      }
      
      .konami-active * {
        animation: rainbow 2s linear infinite, spin 2s linear infinite;
      }
      
      .konami-active section, .konami-active div, .konami-active header {
        overflow: visible !important;
      }
      
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
      }
      
      .konami-active {
        animation: shake 0.5s linear infinite;
        overflow-x: hidden;
      }
    `;
    document.head.appendChild(style);
    
    // Add smooth scroll behavior to the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.scrollBehavior = 'smooth';
    
    return () => {
      window.removeEventListener('keydown', checkKonami);
      document.head.removeChild(style);
      // Remove scroll behavior when component unmounts
      document.documentElement.style.scrollBehavior = '';
      document.body.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Friends />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
