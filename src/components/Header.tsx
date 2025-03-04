
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Fun Facts', href: '#fun-facts' },
  { label: 'Contact', href: '#contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    // Check system preference for dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
    
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Find the current active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12",
        isScrolled 
          ? "py-4 bg-background/80 backdrop-blur-lg shadow-sm" 
          : "py-6"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.a 
          href="#home" 
          className="font-display text-2xl font-semibold text-gradient"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          Portfolio<span className="text-primary">.</span>
        </motion.a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-all duration-200 relative hover:text-primary",
                activeSection === item.href.substring(1) 
                  ? "text-primary after:w-full" 
                  : "text-foreground/80 after:w-0"
              )}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ease-out after:w-0"></span>
            </motion.a>
          ))}
          
          <motion.button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-primary/10 text-foreground hover:bg-primary/20 transition-colors"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            whileHover={{ rotate: 15 }}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <motion.button
            onClick={toggleDarkMode}
            className="mr-4 p-2 rounded-full bg-primary/10 text-foreground hover:bg-primary/20 transition-colors"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            whileHover={{ rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
          
          <motion.button 
            className="text-foreground" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className={cn(
          "fixed inset-0 bg-background/98 backdrop-blur-lg z-40 flex flex-col justify-center items-center md:hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center space-y-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.href}
              href={item.href}
              className={cn(
                "text-lg font-medium transition-all duration-200 flex items-center gap-2",
                activeSection === item.href.substring(1) 
                  ? "text-primary" 
                  : "text-foreground/80"
              )}
              onClick={closeMenu}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileHover={{ scale: 1.1, x: 5 }}
            >
              {activeSection === item.href.substring(1) && <Sparkles size={16} className="text-primary" />}
              {item.label}
            </motion.a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
