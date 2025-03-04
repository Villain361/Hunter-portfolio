
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 px-6 md:px-12 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="font-display text-xl font-semibold">
              Portfolio<span className="text-primary">.</span>
            </a>
            <p className="mt-2 text-sm text-foreground/70">
              Creating exceptional digital experiences
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
                  <a href="#contact" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">Social</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/60">
            © {currentYear} Portfolio. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-sm text-foreground/60 hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <span className="mx-2 text-foreground/60">•</span>
            <a href="#" className="text-sm text-foreground/60 hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
