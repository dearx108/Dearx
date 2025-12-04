import React, { useState, useEffect } from 'react';
import { PhoneOff, Mic, MicOff, Volume2, Video, VideoOff, Wifi, MessageCircle, Heart, User } from 'lucide-react';
import MatchingScreen from './MatchingScreen';

// User interface defined locally to avoid circular dependency issues if types.ts isn't perfectly synced yet,
// but ideally should be imported. Using 'any' for partner to be safe with App.tsx usage.
interface CallScreenProps {
  onEndCall: (points: number, partner?: any) => void;
  onStartChat?: (partner: any) => void;
  partner?: any;
  onLike?: (id: string | number) => void;
  isVideoEnabled?: boolean;
}

const MOCK_PARTNER = {
    id: 99,
    name: "Ananya Gupta",
    location: "Mumbai, India",
    flag: "🇮🇳",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    interests: ["Travel", "Photography"],
    level: 4,
    isVerified: true
};

const CallScreen: React.FC<CallScreenProps> = ({ onEndCall, onStartChat, partner: initialPartner, onLike, isVideoEnabled = false }) => {
  const [partner, setPartner] = useState<any | undefined>(initialPartner);
  const [isMatching, setIsMatching] = useState(!initialPartner);
  const [timer, setTimer] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(isVideoEnabled);
  const [showHeart, setShowHeart] = useState(false);
  
  useEffect(() => {
    if (isMatching) {
        // Simulate matching process
        const timeout = setTimeout(() => {
            setPartner(MOCK_PARTNER);
            setIsMatching(false);
        }, 4000); // 4 seconds matching
        return () => clearTimeout(timeout);
    }
  }, [isMatching]);

  useEffect(() => {
    if (!isMatching && partner) {
        const t = setInterval(() => setTimer(prev => prev + 1), 1000);
        return () => clearInterval(t);
    }
  }, [isMatching, partner]);

  const formatTime = (s: number) => {
    const min = String(Math.floor(s/60)).padStart(2,'0');
    const sec = String(s%60).padStart(2,'0');
    return `${min}:${sec}`;
  };

  const handleLike = () => {
    if (!partner || !onLike) return;
    onLike(partner.id);
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1000);
  };

  if (isMatching) {
      return <MatchingScreen />;
  }

  if (!partner) return null;

  return (
    <div className="h-full flex flex-col bg-slate-900 text-white relative">
       {/* Background - Blurred if video is OFF, Hidden/Subtle if video is ON */}
       {!videoOn && (
         <div className="absolute inset-0 opacity-20 bg-cover bg-center blur-3xl" style={{ backgroundImage: `url(${partner.avatarUrl})` }}></div>
       )}

       {/* Header */}
       <div className="relative z-10 flex justify-between items-center p-6">
          <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2">
             <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
             <span className="text-xs font-mono">{formatTime(timer)}</span>
          </div>
          <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full flex items-center gap-1 text-xs font-bold">
             <Wifi size={14} /> Excellent
          </div>
       </div>

       {/* Main Content Area */}
       <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6">
          
          {videoOn ? (
            /* Video Call UI */
            <div className="w-full h-full max-h-[600px] bg-slate-800 rounded-3xl overflow-hidden relative border border-white/10 shadow-2xl flex items-center justify-center">
                 {/* Remote Video Feed (Simulated) */}
                 <img src={partner.avatarUrl} className="w-full h-full object-cover" alt="Remote Video" />
                 
                 {/* Partner Name Overlay */}
                 <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl text-left">
                     <p className="font-bold text-sm">{partner.name} {partner.flag}</p>
                     <div className="flex items-center gap-1 text-[10px] text-green-400">
                         <Video size={10} /> Live Video
                     </div>
                 </div>

                 {/* Local Video Preview (PiP) */}
                 <div className="absolute top-4 right-4 w-28 h-36 bg-black/50 rounded-xl border border-white/20 overflow-hidden shadow-lg">
                     <div className="w-full h-full bg-slate-700 flex items-center justify-center relative">
                        <User size={32} className="text-white/30" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <p className="absolute bottom-2 w-full text-center text-[10px] text-white/70">You</p>
                     </div>
                 </div>

                 {/* Like Button Floating in Video */}
                 <button 
                    onClick={handleLike}
                    className="absolute bottom-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/30 hover:bg-white/30 active:scale-95 transition-all"
                  >
                      <Heart size={20} className="text-pink-500" fill={showHeart ? "currentColor" : "currentColor"} />
                  </button>
            </div>
          ) : (
            /* Audio Call UI */
            <div className="flex flex-col items-center">
                <div className="relative mb-6">
                    <div className="w-40 h-40 rounded-full border-4 border-white/10 shadow-2xl overflow-hidden relative">
                       <img src={partner.avatarUrl} className="w-full h-full object-cover" alt="Partner" />
                    </div>
                    
                    {/* Flag Badge */}
                    <div className="absolute bottom-1 right-2 w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center border-2 border-slate-600 z-10">
                       <span className="text-lg">{partner.flag}</span>
                    </div>

                    {/* Like Button */}
                    <button 
                      onClick={handleLike}
                      className="absolute bottom-1 left-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-pink-100 z-20 hover:scale-110 active:scale-95 transition-transform"
                    >
                        <Heart size={20} className="text-pink-500" fill={showHeart ? "currentColor" : "none"} />
                    </button>

                    {/* Floating Heart Animation */}
                    {showHeart && (
                        <div className="absolute top-0 right-[-20px] animate-in slide-in-from-bottom-5 fade-out duration-700">
                            <Heart size={24} className="text-pink-500" fill="currentColor" />
                            <span className="text-xs font-bold text-pink-400 ml-1">+1</span>
                        </div>
                    )}
                </div>

                <h2 className="text-3xl font-bold mb-2">{partner.name}</h2>
                <p className="text-slate-400 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span> Speaking
                </p>

                {/* AI Feedback Simulation */}
                <div className="mt-12 w-full max-w-xs bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/5">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-xs font-bold text-slate-300 uppercase">Pronunciation Score</span>
                       <span className="text-sky-400 font-bold">92%</span>
                    </div>
                    <div className="flex gap-1 h-8 items-end justify-center">
                        {[1,2,3,4,5,6,7,8,9,10].map(i => (
                           <div key={i} className="w-1.5 bg-sky-500 rounded-full animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDuration: `${Math.random() * 0.5 + 0.5}s` }}></div>
                        ))}
                    </div>
                </div>
            </div>
          )}
       </div>

       {/* Controls */}
       <div className="relative z-10 p-8 pb-12 flex justify-center items-center gap-4 sm:gap-6">
          {/* Video Toggle */}
          <button onClick={() => setVideoOn(!videoOn)} className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all ${videoOn ? 'bg-white text-slate-900' : 'bg-white/10 hover:bg-white/20'}`}>
             {videoOn ? <Video /> : <VideoOff />}
          </button>

          {/* Mic Toggle */}
          <button onClick={() => setMicOn(!micOn)} className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all ${micOn ? 'bg-white/10 hover:bg-white/20' : 'bg-white text-slate-900'}`}>
             {micOn ? <Mic /> : <MicOff />}
          </button>
          
          {/* End Call */}
          <button onClick={() => onEndCall(50, partner)} className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-3xl shadow-lg shadow-red-900/50 hover:bg-red-700 transition-colors transform active:scale-95">
             <PhoneOff fill="currentColor" />
          </button>

          {/* Chat/Volume Toggle */}
          {onStartChat ? (
             <button onClick={() => onStartChat(partner)} className="w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-xl transition-all">
                <MessageCircle />
             </button>
          ) : (
             <button className="w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-xl transition-all">
                <Volume2 />
             </button>
          )}
       </div>
    </div>
  );
};

export default CallScreen;