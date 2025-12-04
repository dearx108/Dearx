
import React from 'react';
import { ChevronLeft, MapPin, Globe, MessageCircle, UserPlus, Check, Flag, MoreVertical, Shield, Languages, Target, Heart } from 'lucide-react';
import { User } from '../types';

interface PublicProfileScreenProps {
  user: any;
  onBack: () => void;
  onAddFriend: () => void;
  onMessage: () => void;
  onAcceptRequest?: () => void;
  friendStatus: 'none' | 'friend' | 'sent' | 'received';
  onLike?: (id: any) => void;
}

const PublicProfileScreen: React.FC<PublicProfileScreenProps> = ({ user, onBack, onAddFriend, onMessage, onAcceptRequest, friendStatus, onLike }) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-24 animate-in slide-in-from-right-10 font-sans">
      
      {/* Header */}
      <div className="bg-white p-4 sticky top-0 z-10 shadow-sm flex justify-between items-center">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft size={24} className="text-gray-600" />
        </button>
        <div className="font-bold text-gray-800">Profile</div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreVertical size={24} className="text-gray-400" />
        </button>
      </div>

      <div className="p-6">
        {/* Profile Card */}
        <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
                <img src={user.avatar || user.avatarUrl} className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover" alt="Profile" />
                <div className={`absolute bottom-1 right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}>
                </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                {user.name} <span className="text-2xl">{user.flag}</span>
            </h2>
            <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                <MapPin size={12} /> {user.country || user.location}
            </p>

            {/* Action Button */}
            <div className="mt-6 w-full max-w-xs">
                {friendStatus === 'friend' ? (
                    <button onClick={onMessage} className="w-full bg-sky-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-sky-200 active:scale-95 transition-all flex items-center justify-center gap-2">
                        <MessageCircle size={20} /> Message
                    </button>
                ) : friendStatus === 'sent' ? (
                    <button disabled className="w-full bg-gray-100 text-gray-400 py-3 rounded-xl font-bold cursor-not-allowed flex items-center justify-center gap-2">
                        <Check size={20} /> Request Sent
                    </button>
                ) : friendStatus === 'received' ? (
                    <button onClick={onAcceptRequest} className="w-full bg-green-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-green-200 active:scale-95 transition-all flex items-center justify-center gap-2">
                        <UserPlus size={20} /> Accept Request
                    </button>
                ) : (
                    <button onClick={onAddFriend} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold shadow-lg shadow-slate-200 active:scale-95 transition-all flex items-center justify-center gap-2">
                        <UserPlus size={20} /> Add Friend
                    </button>
                )}
            </div>
        </div>

        {/* Bio */}
        {user.bio && (
            <div className="mb-6 text-center">
                <p className="text-gray-600 italic text-sm">"{user.bio}"</p>
            </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="bg-white p-3 rounded-xl border border-gray-100 text-center shadow-sm">
                <div className="text-lg font-bold text-sky-600">{user.xp || 1200}</div>
                <div className="text-[10px] uppercase font-bold text-gray-400">XP</div>
            </div>
            <div 
                className="bg-white p-3 rounded-xl border border-gray-100 text-center shadow-sm cursor-pointer active:scale-95 transition-transform hover:bg-pink-50 hover:border-pink-100"
                onClick={() => onLike && onLike(user.id)}
            >
                <div className="text-lg font-bold text-pink-500 flex items-center justify-center gap-1">
                    <Heart size={16} fill="currentColor" /> {user.likes || 0}
                </div>
                <div className="text-[10px] uppercase font-bold text-gray-400">Likes</div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-gray-100 text-center shadow-sm">
                <div className="text-lg font-bold text-gray-800">4.9</div>
                <div className="text-[10px] uppercase font-bold text-gray-400">Rating</div>
            </div>
        </div>

        {/* Details Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden space-y-1">
            {user.languages && (
                <div className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center"><Languages size={20} /></div>
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase">Languages</p>
                        <p className="text-sm font-medium text-gray-800">{Array.isArray(user.languages) ? user.languages.join(', ') : user.languages}</p>
                    </div>
                </div>
            )}
            
            {(user.interests || (user.interests && user.interests.length > 0)) && (
                <div className="p-4 flex items-center gap-4 border-t border-gray-50">
                    <div className="w-10 h-10 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center"><Heart size={20} /></div>
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase">Interests</p>
                        <p className="text-sm font-medium text-gray-800">{Array.isArray(user.interests) ? user.interests.join(', ') : user.interests}</p>
                    </div>
                </div>
            )}

            <div className="p-4 flex items-center gap-4 border-t border-gray-50">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center"><Target size={20} /></div>
                <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Learning Goal</p>
                    <p className="text-sm font-medium text-gray-800">{user.goal || "Fluency"}</p>
                </div>
            </div>
        </div>
        
        <div className="mt-8 text-center">
             <button className="text-gray-400 text-xs font-bold flex items-center justify-center gap-1 hover:text-red-500 transition-colors">
                 <Flag size={12} /> Report this user
             </button>
        </div>
      </div>
    </div>
  );
};

export default PublicProfileScreen;
