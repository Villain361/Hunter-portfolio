
import React, { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Send, Github, Instagram, ExternalLink, Bot, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

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

// Discord Card Animation
const DiscordCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.a
      href="https://discord.gg/83ftcHz8sh"
      target="_blank"
      rel="noopener noreferrer"
      className="block mt-8 overflow-hidden relative rounded-2xl"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.03 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#5865F2] via-[#7289da] to-[#9B84EC] opacity-80 z-0"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 50 + 10}px`,
              height: `${Math.random() * 50 + 10}px`,
            }}
            animate={{
              y: isHovered ? [0, -100, 0] : 0,
              x: isHovered ? [0, Math.random() * 40 - 20, 0] : 0,
              scale: isHovered ? [1, 1.5, 1] : 1,
              opacity: isHovered ? [0.1, 0.3, 0.1] : 0.1,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 p-6 backdrop-blur-sm">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-[#5865F2] flex items-center justify-center text-white mr-4 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 127.14 96.36" fill="currentColor">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
            </svg>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">Join My Discord Server</h3>
            <p className="text-white/80 text-sm">Connect, chat, and collaborate!</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex">
            {[...Array(3)].map((_, i) => (
              <motion.div 
                key={i}
                className="w-8 h-8 rounded-full bg-white/20 -ml-2 first:ml-0 flex items-center justify-center text-white text-xs"
                animate={{ 
                  x: isHovered ? [0, 5, 0] : 0,
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.1,
                  repeat: isHovered ? Infinity : 0,
                  repeatType: "reverse"
                }}
              >
                {i === 0 ? '👋' : i === 1 ? '🚀' : '🎮'}
              </motion.div>
            ))}
            <motion.div 
              className="ml-2 text-white/90 text-sm"
              animate={{
                opacity: isHovered ? 1 : 0.7,
              }}
            >
              120+ members
            </motion.div>
          </div>
          
          <motion.div
            className="px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              backgroundColor: isHovered ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.2)",
              y: isHovered ? -2 : 0,
            }}
          >
            Join Now
          </motion.div>
        </div>
      </div>
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
              <DiscordCard />
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
