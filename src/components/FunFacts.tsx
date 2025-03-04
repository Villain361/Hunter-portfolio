
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Gamepad, Code, Book, Coffee, Sparkles } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface Fact {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const facts: Fact[] = [
  {
    icon: <Code className="text-primary" size={24} />,
    title: "First Code",
    description: "Wrote my first 'Hello World' program at age 13 and haven't stopped coding since!",
  },
  {
    icon: <Music className="text-secondary" size={24} />,
    title: "Music Lover",
    description: "I've listened to over 30,000 minutes of music last year according to Spotify Wrapped.",
  },
  {
    icon: <Gamepad className="text-accent" size={24} />,
    title: "Gamer",
    description: "I enjoy strategy games and have spent 500+ hours in my favorite game.",
  },
  {
    icon: <Coffee className="text-primary" size={24} />,
    title: "Coffee Addict",
    description: "I've tried 27 different coffee beans from around the world. My favorite is Ethiopian Yirgacheffe.",
  },
  {
    icon: <Book className="text-secondary" size={24} />,
    title: "Book Worm",
    description: "I read about 20 books per year, mostly science fiction and technical books.",
  },
  {
    icon: <Sparkles className="text-accent" size={24} />,
    title: "Fun Fact",
    description: "I can solve a Rubik's cube in under 2 minutes (still working on getting faster!).",
  },
];

const EmojiCard = ({ emoji, label, isActive, onClick }: { emoji: string; label: string; isActive: boolean; onClick: () => void }) => {
  return (
    <motion.button
      className={`flex flex-col items-center p-4 rounded-xl transition-all ${isActive ? 'bg-primary text-white' : 'bg-primary/10 hover:bg-primary/20'}`}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <span className="text-3xl mb-2">{emoji}</span>
      <span className="text-xs font-medium">{label}</span>
    </motion.button>
  );
};

const FunFacts = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedEmoji, setSelectedEmoji] = useState("😊");
  
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
    <section id="fun-facts" ref={sectionRef} className="section-padding px-6 md:px-12 bg-gradient-to-br from-secondary/5 to-primary/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium reveal opacity-0" style={{ transitionDelay: '0.2s' }}>
            Get to Know Me
          </span>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 reveal opacity-0" style={{ transitionDelay: '0.3s' }}>
            Fun Facts & Hobbies
          </h2>
          
          <p className="max-w-2xl mx-auto text-foreground/80 reveal opacity-0" style={{ transitionDelay: '0.4s' }}>
            Beyond coding and creating, here are some random facts about me and things I enjoy!
          </p>
        </div>
        
        {/* Mood Meter */}
        <div className="mb-16 reveal opacity-0" style={{ transitionDelay: '0.5s' }}>
          <div className="text-center mb-8">
            <h3 className="text-xl font-display font-semibold mb-2">Today's Mood</h3>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2 rounded-full">
              <span>Current Mood:</span>
              <span className="text-2xl">{selectedEmoji}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 max-w-3xl mx-auto">
            <EmojiCard emoji="😊" label="Happy" isActive={selectedEmoji === "😊"} onClick={() => setSelectedEmoji("😊")} />
            <EmojiCard emoji="🤔" label="Thinking" isActive={selectedEmoji === "🤔"} onClick={() => setSelectedEmoji("🤔")} />
            <EmojiCard emoji="😴" label="Sleepy" isActive={selectedEmoji === "😴"} onClick={() => setSelectedEmoji("😴")} />
            <EmojiCard emoji="🚀" label="Motivated" isActive={selectedEmoji === "🚀"} onClick={() => setSelectedEmoji("🚀")} />
            <EmojiCard emoji="☕" label="Caffeinated" isActive={selectedEmoji === "☕"} onClick={() => setSelectedEmoji("☕")} />
            <EmojiCard emoji="🎮" label="Gaming" isActive={selectedEmoji === "🎮"} onClick={() => setSelectedEmoji("🎮")} />
            <EmojiCard emoji="📚" label="Learning" isActive={selectedEmoji === "📚"} onClick={() => setSelectedEmoji("📚")} />
            <EmojiCard emoji="🎧" label="Chilling" isActive={selectedEmoji === "🎧"} onClick={() => setSelectedEmoji("🎧")} />
          </div>
        </div>
        
        {/* Random Facts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal opacity-0" style={{ transitionDelay: '0.6s' }}>
          {facts.map((fact, index) => (
            <motion.div 
              key={fact.title} 
              className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 10px 25px -5px rgba(0, 123, 255, 0.1), 0 10px 10px -5px rgba(0, 123, 255, 0.04)" 
              }}
            >
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {fact.icon}
                </div>
                <div className="ml-4">
                  <h3 className="font-display font-semibold mb-2">{fact.title}</h3>
                  <p className="text-foreground/70 text-sm">{fact.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Easter Egg */}
        <div className="mt-16 text-center reveal opacity-0" style={{ transitionDelay: '0.7s' }}>
          <motion.button
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 text-foreground/70 hover:text-foreground transition-colors"
            onClick={() => {
              toast({
                title: "🎉 Easter Egg Found!",
                description: "You found the hidden button! Here's a virtual high five ✋",
              });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles size={16} />
            <span>Find the Easter Egg</span>
          </motion.button>
          <p className="mt-2 text-xs text-foreground/50">Hint: There might be other hidden surprises around the site...</p>
        </div>
      </div>
    </section>
  );
};

export default FunFacts;
