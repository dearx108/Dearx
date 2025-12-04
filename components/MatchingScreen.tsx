import React, { useState, useEffect } from 'react';
import { MapPin, Globe } from 'lucide-react';

const MatchingScreen: React.FC = () => {
  const [status, setStatus] = useState('Connecting to server...');

  useEffect(() => {
    const statuses = [
      'Connecting to global server...',
      'Searching for speaking partners...',
      'Filtering by language level...',
      'Optimizing connection quality...',
      'Match found! Establishing link...'
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % statuses.length;
      setStatus(statuses[i]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full bg-slate-900 text-white flex flex-col items-center justify-center relative overflow-hidden">
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[500px] h-[500px] border border-sky-500/20 rounded-full absolute animate-ping opacity-20" style={{ animationDuration: '3s' }}></div>
        <div className="w-[350px] h-[350px] border border-sky-500/30 rounded-full absolute animate-ping opacity-30" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
      </div>

      <div className="z-10 flex flex-col items-center">
        <div className="w-24 h-24 bg-sky-600/20 backdrop-blur-xl rounded-full flex items-center justify-center mb-8 relative border border-sky-500/50">
          <div className="absolute inset-0 border-t-4 border-sky-500 rounded-full animate-spin"></div>
          <Globe size={40} className="text-sky-400" />
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Searching...</h2>
        <div className="flex items-center gap-2 text-sky-200 bg-white/5 px-4 py-2 rounded-full text-xs font-mono">
          <MapPin size={12} />
          <span>{status}</span>
        </div>
      </div>
    </div>
  );
};

export default MatchingScreen;