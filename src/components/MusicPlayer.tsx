
import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Music, Pause, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const tracks = [
  {
    title: 'Chillhop Beats',
    artist: 'Lo-Fi Producer',
    src: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3'
  },
  {
    title: 'Ambient Dreams',
    artist: 'Ambient Artist',
    src: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0c6ff1fbd.mp3?filename=electronic-future-beats-117997.mp3'
  }
];

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const currentTrack = tracks[currentTrackIndex];
  
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    if (isPlaying && audioRef.current) {
      // Need to wait for the audio element to update its src before playing
      setTimeout(() => {
        audioRef.current?.play();
      }, 100);
    }
  };
  
  return (
    <>
      <audio 
        ref={audioRef} 
        src={currentTrack.src}
        loop={false}
        onEnded={nextTrack}
      />
      
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="fixed bottom-24 right-6 z-50"
      >
        {!showPlayer ? (
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPlayer(true)}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center shadow-lg"
            aria-label="Open music player"
          >
            <Music size={20} />
          </motion.button>
        ) : (
          <motion.div 
            className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-md border border-primary/20 shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium">
                <div className="text-primary">{currentTrack.title}</div>
                <div className="text-xs text-foreground/70">{currentTrack.artist}</div>
              </div>
              <button 
                onClick={() => setShowPlayer(false)}
                className="text-foreground/50 hover:text-foreground"
                aria-label="Close music player"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="flex justify-between items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  isPlaying 
                    ? "bg-primary/20 text-primary" 
                    : "bg-primary text-white"
                )}
                aria-label={isPlaying ? "Pause music" : "Play music"}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMute}
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTrack}
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                aria-label="Next track"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 4 15 12 5 20 5 4"></polygon>
                  <line x1="19" y1="5" x2="19" y2="19"></line>
                </svg>
              </motion.button>
            </div>
            
            {/* Audio visualizer effect */}
            <div className="mt-3 flex justify-center space-x-1">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gradient-to-t from-primary to-secondary rounded-full"
                  animate={{
                    height: isPlaying 
                      ? [15, 25, 10, 30, 15][i % 5] 
                      : 4
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.1
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default MusicPlayer;
