import React from 'react';
import { ArrowLeft, Trophy, Crown, Medal } from 'lucide-react';
import { User } from '../types';

interface LeaderboardScreenProps {
  onBack: () => void;
  users: User[];
  currentUser: User;
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ onBack, users, currentUser }) => {
  const sortedUsers = [...users].sort((a, b) => b.level - a.level);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Crown className="text-yellow-400" size={24} fill="currentColor" />;
      case 1: return <Medal className="text-gray-400" size={24} fill="currentColor" />;
      case 2: return <Medal className="text-orange-400" size={24} fill="currentColor" />;
      default: return <span className="font-bold text-gray-500 dark:text-gray-400">#{index + 1}</span>;
    }
  };

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col">
      <div className="p-6 bg-purple-600 text-white pb-12 rounded-b-[2rem] shadow-lg relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-2xl font-bold">Leaderboard</h2>
        </div>
        <div className="flex justify-center mt-2">
            <div className="flex flex-col items-center">
                <Trophy size={48} className="text-yellow-300 mb-2 animate-bounce" fill="currentColor" />
                <p className="text-purple-200">Weekly Top Speakers</p>
            </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 -mt-6 pt-8 space-y-4">
        {/* Current User Rank */}
        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/40 dark:to-indigo-900/40 p-4 rounded-2xl flex items-center border border-purple-200 dark:border-purple-800">
           <div className="font-bold text-purple-700 dark:text-purple-300 w-8">#15</div>
           <img src={currentUser.avatarUrl} className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-700 mr-3" />
           <div className="flex-1">
               <p className="font-bold text-gray-800 dark:text-gray-100">You</p>
               <p className="text-xs text-gray-500 dark:text-gray-400">{currentUser.location}</p>
           </div>
           <div className="text-right">
               <p className="font-bold text-purple-600 dark:text-purple-400">{currentUser.level * 150} pts</p>
               <p className="text-xs text-gray-400">Lvl {currentUser.level}</p>
           </div>
        </div>

        {/* Global Users */}
        {sortedUsers.map((user, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-2xl flex items-center shadow-sm">
                <div className="w-8 flex justify-center mr-2">
                    {getRankIcon(index)}
                </div>
                <img src={user.avatarUrl} className="w-10 h-10 rounded-full border border-gray-100 dark:border-gray-600 mr-3" />
                <div className="flex-1">
                    <p className="font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1">
                        {user.name} {user.isVerified && <span className="text-blue-500 text-[10px]">✔</span>}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        {user.flag} {user.location}
                    </p>
                </div>
                <div className="text-right">
                    <p className="font-bold text-gray-700 dark:text-gray-300">{user.level * 150 + Math.floor(Math.random()*100)} pts</p>
                    <p className="text-xs text-gray-400">Lvl {user.level}</p>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardScreen;