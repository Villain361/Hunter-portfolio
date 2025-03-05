
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote as QuoteIcon, RefreshCw } from 'lucide-react';

interface QuoteData {
  text: string;
  author: string;
}

const Quote = () => {
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  const fetchQuote = async () => {
    setLoading(true);
    try {
      // Simulating API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sample quotes data
      const quotes = [
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
        { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
        { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
        { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
        { text: "Programming isn't about what you know; it's about what you can figure out.", author: "Chris Pine" }
      ];
      
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(randomQuote);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching quote:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <motion.div 
      className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-md border border-white/10 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {loading ? (
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          <div className="h-4 bg-slate-200 rounded"></div>
          <div className="h-4 bg-slate-200 rounded w-5/6"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2 self-end"></div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start mb-4">
            <QuoteIcon className="text-purple-500 h-6 w-6" />
            <button 
              onClick={fetchQuote} 
              className="text-foreground/60 hover:text-foreground transition-colors"
              aria-label="Get new quote"
            >
              <RefreshCw size={16} />
            </button>
          </div>
          
          <blockquote>
            <p className="text-lg italic leading-relaxed mb-2">{quote?.text}</p>
            <footer className="text-right text-foreground/70 text-sm">— {quote?.author}</footer>
          </blockquote>
        </>
      )}
    </motion.div>
  );
};

export default Quote;
