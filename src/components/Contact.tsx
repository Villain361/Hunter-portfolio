
import React, { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Send, Github, Instagram, ExternalLink, Bot, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import DiscordCard from './DiscordCard';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const initialFormState: FormState = {
  name: '',
  email: '',
  message: '',
};

const SocialButton = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => {
  return (
    <motion.a 
      href={href}
      className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </motion.a>
  );
};

const Contact = () => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message received! 🚀",
        description: "Thanks for reaching out. I'll respond as soon as I can!",
      });
      setFormState(initialFormState);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" ref={sectionRef} className="section-padding px-6 md:px-12 bg-gradient-to-b from-secondary/5 to-primary/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium reveal opacity-0" style={{ transitionDelay: '0.2s' }}>
            Get In Touch
          </span>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 reveal opacity-0" style={{ transitionDelay: '0.3s' }}>
            Let's <span className="text-gradient">Connect</span>
          </h2>
          
          <p className="max-w-2xl mx-auto text-foreground/80 reveal opacity-0" style={{ transitionDelay: '0.4s' }}>
            Have a question, project idea, or just want to say hi? Feel free to reach out!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="reveal opacity-0" style={{ transitionDelay: '0.5s' }}>
            <motion.div 
              className="p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <h3 className="text-xl font-display font-semibold mb-6">Contact Info</h3>
              
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                    <Mail size={20} />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-foreground/70 mb-1">Email</h4>
                    <a href="mailto:freegamer758808@gmail.com" className="text-lg hover:text-primary transition-colors">
                      freegamer758808@gmail.com
                    </a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                    <Bot size={20} />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-foreground/70 mb-1">Discord Bots</h4>
                    <p className="text-lg">
                      Want a custom Discord bot?
                    </p>
                  </div>
                </motion.div>
              </div>
              
              <div className="mt-12">
                <h3 className="text-xl font-display font-semibold mb-6">Let's Connect</h3>
                
                <div className="flex space-x-4">
                  <SocialButton href="https://www.tiktok.com/@villain...2008" icon={<ExternalLink size={20} />} label="TikTok" />
                  <SocialButton href="https://www.instagram.com/villain.2008" icon={<Instagram size={20} />} label="Instagram" />
                  <SocialButton href="#" icon={<Github size={20} />} label="GitHub" />
                </div>
              </div>
              
              {/* Discord Card */}
              <div className="mt-8">
                <DiscordCard />
              </div>
            </motion.div>

            {/* Interactive Element */}
            <motion.div 
              className="mt-8 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 text-center"
              whileHover={{ 
                boxShadow: "0 0 30px 5px rgba(0, 123, 255, 0.3)", 
                scale: 1.02
              }}
            >
              <h4 className="font-medium mb-3">Click to activate pixie dust!</h4>
              <motion.button
                className="bg-primary/20 hover:bg-primary text-primary hover:text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ 
                  scale: 0.9,
                  rotate: 0,
                }}
                onClick={() => {
                  // Create pixie dust animation
                  const colors = ["#007BFF", "#9C27B0", "#00E5FF", "#FF4081"];
                  for (let i = 0; i < 30; i++) {
                    const particle = document.createElement("div");
                    document.body.appendChild(particle);
                    
                    // Random position around the cursor
                    const mouseX = window.innerWidth / 2;
                    const mouseY = window.innerHeight / 2;
                    
                    particle.style.left = `${mouseX}px`;
                    particle.style.top = `${mouseY}px`;
                    
                    particle.style.position = "fixed";
                    particle.style.width = "10px";
                    particle.style.height = "10px";
                    particle.style.borderRadius = "50%";
                    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    particle.style.pointerEvents = "none";
                    particle.style.zIndex = "9999";
                    
                    // Random directions
                    const angle = Math.random() * Math.PI * 2;
                    const speed = Math.random() * 80 + 50;
                    const vx = Math.cos(angle) * speed;
                    const vy = Math.sin(angle) * speed;
                    
                    // Animate
                    const animation = particle.animate(
                      [
                        { transform: "translate(0, 0) scale(1)", opacity: 1 },
                        { transform: `translate(${vx}px, ${vy}px) scale(0)`, opacity: 0 }
                      ],
                      {
                        duration: 1000 + Math.random() * 500,
                        easing: "cubic-bezier(0,.9,.57,1)"
                      }
                    );
                    
                    animation.onfinish = () => {
                      particle.remove();
                    };
                  }
                  
                  toast({
                    title: "✨ Magic activated!",
                    description: "You've discovered the pixie dust effect!",
                  });
                }}
              >
                <Sparkles size={24} />
              </motion.button>
            </motion.div>
          </div>
          
          {/* Contact Form */}
          <div className="reveal opacity-0" style={{ transitionDelay: '0.6s' }}>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Chat Bubble Design */}
              <div className="absolute -left-6 top-10 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center">
                <Mail size={20} />
              </div>
              <div className="absolute -left-2 top-16 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-secondary"></div>
              
              <form 
                onSubmit={handleSubmit} 
                className="ml-4 p-6 rounded-2xl rounded-tl-none bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    placeholder="Hi there! I'd like to talk about..."
                  ></textarea>
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium transition-all disabled:opacity-70"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
