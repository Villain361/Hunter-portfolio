
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Cloud, CloudRain, CloudSnow, CloudFog, CloudLightning, Wind } from 'lucide-react';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: React.ReactNode;
}

const Weather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        
        // This is a mock fetch since we're not using a real API key
        // In reality you would use an actual weather API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock weather data
        const conditions = [
          { condition: 'Clear', icon: <Sun className="text-yellow-400" /> },
          { condition: 'Cloudy', icon: <Cloud className="text-gray-400" /> },
          { condition: 'Rainy', icon: <CloudRain className="text-blue-400" /> },
          { condition: 'Snowy', icon: <CloudSnow className="text-white" /> },
          { condition: 'Foggy', icon: <CloudFog className="text-gray-300" /> },
          { condition: 'Stormy', icon: <CloudLightning className="text-purple-400" /> },
          { condition: 'Windy', icon: <Wind className="text-blue-300" /> }
        ];
        
        const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
        
        setWeather({
          location: 'Your Location',
          temperature: Math.floor(Math.random() * 30) + 10, // Random temp between 10-40°C
          condition: randomCondition.condition,
          humidity: Math.floor(Math.random() * 60) + 40, // Random humidity between 40-100%
          windSpeed: Math.floor(Math.random() * 20) + 5, // Random wind speed
          icon: randomCondition.icon
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError('Failed to load weather data');
        setLoading(false);
      }
    };

    fetchWeather();
    
    // Refresh weather data every 15 minutes
    const interval = setInterval(fetchWeather, 15 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="w-full p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-md flex justify-center items-center h-32">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
          <div className="flex-1 space-y-3 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-6 rounded-xl bg-red-500/10 backdrop-blur-md text-center">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      className="w-full p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-md border border-white/10 shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-foreground">{weather?.location}</h3>
          <p className="text-3xl font-bold text-foreground mt-1">{weather?.temperature}°C</p>
          <p className="text-sm text-foreground/70">{weather?.condition}</p>
        </div>
        <motion.div 
          className="text-4xl"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {weather?.icon}
        </motion.div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
          <div>
            <p className="text-xs text-foreground/70">Humidity</p>
            <p className="text-sm font-medium">{weather?.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Wind size={14} className="text-blue-500" />
          </div>
          <div>
            <p className="text-xs text-foreground/70">Wind Speed</p>
            <p className="text-sm font-medium">{weather?.windSpeed} km/h</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Weather;
