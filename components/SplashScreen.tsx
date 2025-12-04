import React, { useEffect } from 'react';

interface SplashScreenProps {
  onFinish?: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish?.();
    }, 3000); // 3 seconds splash
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="h-full w-full bg-slate-900 flex flex-col items-center justify-center text-white p-4 relative overflow-hidden">
      <div className="absolute top-[-20%] right-[-20%] w-96 h-96 bg-sky-600 rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute bottom-[-20%] left-[-20%] w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
      
      <div className="animate-in fade-in zoom-in duration-700 flex flex-col items-center z-10">
        <h1 className="text-6xl font-bold mb-2 tracking-tighter text-white">Dear<span className="text-sky-500">X</span></h1>
        <p className="text-sky-200 text-sm font-medium tracking-widest uppercase">Professional English</p>
      </div>
      
      <div className="absolute bottom-10 text-center opacity-60">
        <p className="text-[10px] font-bold uppercase tracking-widest mb-1">Founded By</p>
        <p className="text-sm font-medium text-white">Santosh Choudhary 🇮🇳</p>
      </div>
    </div>
  );
};

export default SplashScreen;