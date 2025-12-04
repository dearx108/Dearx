import React, { useState } from 'react';
import { ChevronRight, Globe, Mic, Bot, Trophy } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: <Globe size={80} className="text-purple-500" />,
      title: "Speak English Confidently",
      description: "Connect with learners worldwide and break the language barrier.",
      color: "from-purple-500 to-indigo-600"
    },
    {
      icon: <Mic size={80} className="text-blue-500" />,
      title: "Real-time Conversations",
      description: "Practice with voice calls instantly. No scheduling required.",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: <Bot size={80} className="text-emerald-500" />,
      title: "AI Practice Partner",
      description: "24/7 speaking practice with our smart AI assistant.",
      color: "from-emerald-400 to-teal-500"
    },
    {
      icon: <Trophy size={80} className="text-yellow-500" />,
      title: "Earn Rewards",
      description: "Build streaks, earn coins, and climb the leaderboard.",
      color: "from-yellow-400 to-orange-500"
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(curr => curr + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="h-full w-full bg-white dark:bg-gray-900 flex flex-col relative overflow-hidden transition-colors duration-300">
      {/* Background Blobs */}
      <div className={`absolute top-[-20%] right-[-20%] w-96 h-96 bg-gradient-to-br ${slides[currentSlide].color} rounded-full blur-[100px] opacity-20 transition-all duration-500`}></div>
      <div className={`absolute bottom-[-20%] left-[-20%] w-80 h-80 bg-gradient-to-tr ${slides[currentSlide].color} rounded-full blur-[100px] opacity-20 transition-all duration-500`}></div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 z-10 text-center">
        <div className="mb-12 transform transition-all duration-500 scale-100 hover:scale-110">
          <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-full shadow-2xl">
            {slides[currentSlide].icon}
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-300">
          {slides[currentSlide].title}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed max-w-xs transition-all duration-300">
          {slides[currentSlide].description}
        </p>
      </div>

      <div className="p-8 z-10 w-full">
        {/* Indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-purple-600' : 'w-2 bg-gray-300 dark:bg-gray-700'}`}
            ></div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <button 
            onClick={onComplete}
            className={`text-gray-400 dark:text-gray-500 font-medium px-4 py-2 hover:text-gray-600 dark:hover:text-gray-300 transition-opacity ${currentSlide === slides.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            Skip
          </button>

          <button 
            onClick={handleNext}
            className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg shadow-purple-200 dark:shadow-none transition-transform active:scale-95"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;