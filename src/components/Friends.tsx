
import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Users, ExternalLink, Heart } from 'lucide-react';

const Friends = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const friendCards = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (inView) {
      friendCards.current.forEach((card, index) => {
        setTimeout(() => {
          card?.classList.add('opacity-100', 'translate-y-0');
        }, 150 * index);
      });
    }
  }, [inView]);

  const friends = [
    {
      name: "Tushar",
      role: "Full-Stack Developer",
      image: "https://avatars.githubusercontent.com/u/70436220",
      portfolio: "https://loverboy-ten.vercel.app/",
      description: "Talented full-stack developer specializing in modern web technologies."
    },
    {
      name: "Coming Soon",
      role: "Web Designer",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80",
      portfolio: "#",
      description: "Friend's portfolio spot reserved for future addition."
    },
    {
      name: "Coming Soon",
      role: "UX/UI Designer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80",
      portfolio: "#",
      description: "Friend's portfolio spot reserved for future addition."
    }
  ];

  return (
    <section id="friends" className="py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-black/70 z-0"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div 
          className={`text-center mb-16 opacity-0 transform translate-y-10 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : ''}`}
          ref={ref}
        >
          <div className="inline-block p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg mb-4">
            <Users size={28} className="text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Friends
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Connecting with talented individuals in the tech community. Check out my friends' amazing portfolios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {friends.map((friend, index) => (
            <div
              key={index}
              ref={el => el && (friendCards.current[index] = el)}
              className="friend-card group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-xl backdrop-blur-sm shadow-xl opacity-0 transform translate-y-10 transition-all duration-700 ease-out border border-gray-700 hover:border-purple-500/50 overflow-hidden"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="friend-card-inner relative z-10 transition-transform duration-700 ease-out transform">
                <div className="friend-card-front flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500/50 shadow-lg shadow-purple-500/20 mb-4 transform transition-transform duration-500 ease-out group-hover:scale-105">
                    <img 
                      src={friend.image} 
                      alt={friend.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{friend.name}</h3>
                  <p className="text-purple-400 mb-4">{friend.role}</p>
                  <p className="text-gray-300 text-center text-sm mb-4">
                    {friend.description}
                  </p>
                  
                  <a 
                    href={friend.portfolio} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`inline-flex items-center px-4 py-2 rounded-full 
                      ${friend.portfolio === "#" 
                        ? "bg-gray-700 cursor-not-allowed" 
                        : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"}
                      text-white font-medium transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/30`}
                  >
                    <ExternalLink size={16} className="mr-2" />
                    {friend.portfolio === "#" ? "Coming Soon" : "View Portfolio"}
                  </a>
                </div>
              </div>
              
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Heart size={16} className="text-pink-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Custom animations for the section */}
      <style jsx>{`
        .friend-card {
          transform-style: preserve-3d;
          transition: all 0.5s ease;
        }
        
        .friend-card:hover {
          transform: translateY(-5px) rotateX(5deg) rotateY(5deg);
          box-shadow: 0 20px 30px -10px rgba(139, 92, 246, 0.2);
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .friend-card:hover .friend-card-inner {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Friends;
