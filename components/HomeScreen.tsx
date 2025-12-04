import React, { useState } from 'react';
import { Phone, Bot, CheckCircle, Circle, Mic, Clock } from 'lucide-react';
import { User, DailyTask } from '../types';

interface HomeScreenProps {
  user: User;
  tasks: DailyTask[];
  onStartCall: () => void;
  onStartAI: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ user, tasks, onStartCall, onStartAI }) => {
  const [status, setStatus] = useState<'online' | 'busy' | 'offline'>('online');

  return (
    <div className="p-6 pb-24 space-y-8 animate-in fade-in">
      
      {/* Welcome & Status */}
      <div className="flex justify-between items-start">
        <div>
           <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Good Morning,</p>
           <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{user.name} 👋</h2>
        </div>
        <div className="relative group">
           <button 
             onClick={() => setStatus(status === 'online' ? 'busy' : 'online')}
             className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all ${
               status === 'online' 
                 ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                 : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:border-red-800'
             }`}
           >
              <span className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></span>
              {status === 'online' ? 'Online' : 'Busy'}
           </button>
        </div>
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-2 gap-4">
         <button 
            onClick={onStartCall}
            className="bg-sky-600 hover:bg-sky-700 text-white p-5 rounded-2xl shadow-lg shadow-sky-200 dark:shadow-none flex flex-col items-center gap-3 transition-transform active:scale-95"
         >
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
               <Phone size={24} fill="currentColor" />
            </div>
            <div className="text-center">
               <span className="font-bold block">Find Partner</span>
               <span className="text-sky-100 text-xs">Global Match</span>
            </div>
         </button>

         <button 
            onClick={onStartAI}
            className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-5 rounded-2xl shadow-sm hover:shadow-md flex flex-col items-center gap-3 transition-transform active:scale-95 group"
         >
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
               <Bot size={24} />
            </div>
            <div className="text-center">
               <span className="font-bold block text-slate-800 dark:text-white">AI Tutor</span>
               <span className="text-slate-400 text-xs">Practice 24/7</span>
            </div>
         </button>
      </div>

      {/* Daily Tasks */}
      <div>
         <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <Clock size={18} className="text-sky-600" />
            Daily Tasks
         </h3>
         <div className="space-y-3">
            {tasks.map(task => (
               <div key={task.id} className="flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                  <div className="flex items-center gap-3">
                     {task.completed ? <CheckCircle className="text-green-500" size={20} /> : <Circle className="text-slate-300" size={20} />}
                     <span className={`text-sm font-medium ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-200'}`}>{task.title}</span>
                  </div>
                  <span className="text-xs font-bold text-amber-500">+{task.reward} pts</span>
               </div>
            ))}
         </div>
      </div>

      {/* Stats Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl flex justify-between items-center">
          <div>
             <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Your Speaking Score</p>
             <h4 className="text-3xl font-bold text-sky-400">7.5 <span className="text-base text-white font-normal">/ 10</span></h4>
          </div>
          <div className="h-12 w-12 rounded-full border-4 border-sky-500 border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
};

export default HomeScreen;