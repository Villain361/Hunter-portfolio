
import React from 'react';
import { Heart, Coffee, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 px-6 md:px-12 bg-gradient-to-b from-secondary/10 to-primary/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <motion.a 
              href="#home" 
              className="font-display text-2xl font-semibold text-gradient"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Portfolio<span className="text-primary">.</span>
            </motion.a>
            <p className="mt-2 text-sm text-foreground/70">
              Student & Creator
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div>
              <h3 className="text-sm font-medium mb-3">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#fun-facts" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                    Fun Facts
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">Connect</h3>
              <div className="flex space-x-3">
                <motion.a 
                  href="#" 
                  className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-foreground/70 hover:bg-primary hover:text-white transition-all"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="GitHub"
                >
                  <Github size={16} />
                </motion.a>
                <motion.a 
                  href="#" 
                  className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-foreground/70 hover:bg-primary hover:text-white transition-all"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} />
                </motion.a>
                <motion.a 
                  href="#" 
                  className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-foreground/70 hover:bg-primary hover:text-white transition-all"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Twitter"
                >
                  <Twitter size={16} />
                </motion.a>
                <motion.a 
                  href="#" 
                  className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-foreground/70 hover:bg-primary hover:text-white transition-all"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <motion.p 
            className="text-sm text-foreground/60 flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
          >
            Made with <Heart size={14} className="text-primary" fill="currentColor" /> & <Coffee size={14} />
            <span className="ml-1">© {currentYear}</span>
          </motion.p>
          
          <div className="mt-4 md:mt-0">
            <motion.a 
              href="#" 
              className="text-sm text-foreground/60 hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Privacy Policy
            </motion.a>
            <span className="mx-2 text-foreground/60">•</span>
            <motion.a 
              href="#" 
              className="text-sm text-foreground/60 hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Terms of Service
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
