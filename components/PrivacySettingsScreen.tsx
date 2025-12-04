import React from 'react';
import { ChevronLeft, Eye, Users, Activity, Check, Shield } from 'lucide-react';
import { UserPrivacy, PrivacyLevel } from '../types';

interface PrivacySettingsScreenProps {
  privacySettings: UserPrivacy;
  onUpdate: (key: keyof UserPrivacy, value: PrivacyLevel) => void;
  onBack: () => void;
}

const PrivacySettingsScreen: React.FC<PrivacySettingsScreenProps> = ({ privacySettings, onUpdate, onBack }) => {
  
  const SettingSection = ({ 
    title, 
    description, 
    settingKey, 
    icon: Icon 
  }: { 
    title: string; 
    description: string; 
    settingKey: keyof UserPrivacy; 
    icon: any;
  }) => (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mb-4">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
          <Icon size={20} />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">{title}</h3>
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {['everyone', 'friends', 'nobody'].map((option) => {
           // profileDetails might not allow 'nobody' in some apps, but we'll allow all for simplicity or filter if needed
           if (settingKey === 'profileDetails' && option === 'nobody') return null;

           const isSelected = privacySettings[settingKey] === option;
           return (
             <button
               key={option}
               onClick={() => onUpdate(settingKey, option as PrivacyLevel)}
               className={`py-2 px-3 rounded-lg text-xs font-bold capitalize transition-all border ${
                 isSelected 
                   ? 'bg-sky-600 text-white border-sky-600 shadow-md' 
                   : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
               }`}
             >
               {option}
             </button>
           );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans animate-in">
      <div className="bg-white p-4 sticky top-0 z-10 shadow-sm flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft size={24} className="text-gray-600" />
        </button>
        <h2 className="text-xl font-bold text-gray-800">Privacy & Safety</h2>
      </div>

      <div className="p-6 pb-24">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex gap-3 items-start">
             <Shield className="text-blue-600 shrink-0 mt-0.5" size={20} />
             <div>
                 <h4 className="text-sm font-bold text-blue-800">Control your visibility</h4>
                 <p className="text-xs text-blue-600 mt-1">Manage who can see your activity and personal details.</p>
             </div>
        </div>

        <SettingSection 
          title="Online Status" 
          description="Who can see when you are online or active on the app."
          settingKey="onlineStatus"
          icon={Activity}
        />

        <SettingSection 
          title="Friend List" 
          description="Who can see the list of people you are friends with."
          settingKey="friendsList"
          icon={Users}
        />

        <SettingSection 
          title="Profile Details" 
          description="Who can see your extended profile info (Languages, Interests)."
          settingKey="profileDetails"
          icon={Eye}
        />
        
        <p className="text-center text-xs text-gray-400 mt-8">
            Changes are saved automatically.
        </p>
      </div>
    </div>
  );
};

export default PrivacySettingsScreen;