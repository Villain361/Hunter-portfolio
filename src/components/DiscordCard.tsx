
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DiscordCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.a
      href="https://discord.gg/83ftcHz8sh"
      target="_blank"
      rel="noopener noreferrer"
      className="block overflow-hidden relative rounded-2xl"
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

export default DiscordCard;
