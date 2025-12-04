import React from 'react';
import { Phone, PhoneOff, MessageCircle } from 'lucide-react';
import { User } from '../types';

interface IncomingCallScreenProps {
  partner: User;
  onAccept: () => void;
  onDecline: () => void;
}

const IncomingCallScreen: React.FC<IncomingCallScreenProps> = ({ partner, onAccept, onDecline }) => {
  return (
    <div className="h-full w-full relative flex flex-col items-center justify-between py-16 bg-gray-900 text-white overflow-hidden">
      {/* Background Image with Blur */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
        style={{ backgroundImage: `url(${partner.avatarUrl})` }}
      ></div>
      <div className="absolute inset-0 z-0 backdrop-blur-xl bg-black/40"></div>

      {/* Top Info */}
      <div className="z-10 flex flex-col items-center text-center mt-10">
        <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-purple-500 to-pink-500 mb-6 shadow-2xl animate-pulse">
            <img 
                src={partner.avatarUrl} 
                className="w-full h-full rounded-full object-cover border-4 border-black"
                alt="Caller"
            />
        </div>
        <h2 className="text-4xl font-bold mb-2">{partner.name}</h2>
        <p className="text-lg opacity-80 flex items-center gap-2">
            <span className="text-2xl">{partner.flag}</span> Incoming Audio Call...
        </p>
      </div>

      {/* Mid Info */}
      <div className="z-10 text-center opacity-70">
        <p>Verified Speaker • Lvl {partner.level}</p>
      </div>

      {/* Bottom Actions */}
      <div className="z-10 w-full px-12 flex items-center justify-between mb-8">
        <div className="flex flex-col items-center gap-2">
            <button onClick={onDecline} className="w-16 h-16 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all">
                <MessageCircle size={24} />
            </button>
            <span className="text-xs">Message</span>
        </div>

        <div className="flex flex-col items-center gap-2">
             <button 
                onClick={onDecline}
                className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50 animate-bounce"
            >
                <PhoneOff size={32} fill="currentColor" />
            </button>
            <span className="text-xs font-bold">Decline</span>
        </div>

        <div className="flex flex-col items-center gap-2">
            <button 
                onClick={onAccept}
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 animate-bounce"
                style={{ animationDelay: '0.5s' }}
            >
                <Phone size={32} fill="currentColor" />
            </button>
            <span className="text-xs font-bold">Accept</span>
        </div>
      </div>
    </div>
  );
};

export default IncomingCallScreen;