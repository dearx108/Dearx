import React from 'react';
import { Smartphone, Mail, Globe } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="h-full w-full bg-white dark:bg-slate-900 flex flex-col p-8 relative overflow-hidden">
      <div className="flex-1 flex flex-col justify-center z-10">
        <div className="w-16 h-16 bg-sky-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-sky-200 dark:shadow-none">
           <Globe className="text-white" size={32} />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Welcome to Dear<span className="text-sky-600">X</span></h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg mb-12">The world's most advanced platform to master English speaking.</p>
        
        <div className="space-y-4">
          <button 
            onClick={onLogin}
            className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-transform"
          >
            <Mail size={20} />
            Continue with Google
          </button>
          
          <button 
            onClick={onLogin}
            className="w-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-all"
          >
            <Smartphone size={20} />
            Use Phone Number
          </button>
        </div>
      </div>
      
      <p className="text-center text-xs text-slate-400 mt-4">
        By continuing, you agree to our Terms & Privacy Policy.
      </p>
    </div>
  );
};

export default LoginScreen;