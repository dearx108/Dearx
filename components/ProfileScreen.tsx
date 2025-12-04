import React from 'react';
import { User } from '../types';
import { Settings, Shield, Globe, Award, LogOut, Instagram, TrendingUp, CheckCircle, Gem, Crown, User as UserIcon, Smile, Briefcase, Heart, Type, MapPin, Languages, Target, Edit2, Camera as CameraIcon, ChevronRight } from 'lucide-react';

interface ProfileScreenProps {
  userProfile: any;
  onEdit: (field: string) => void;
  onUpdateProfile: (field: string, value: string) => void;
  onPrivacy: () => void;
}

const FOUNDER_INFO = {
  name: "Santosh Choudhary",
  handle: "@__santosh__choudhary__108",
  role: "Founder & CEO",
  link: "https://instagram.com/__santosh__choudhary__108"
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ userProfile, onEdit, onUpdateProfile, onPrivacy }) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-24 animate-in">
        <div className="bg-white p-6 sticky top-0 z-10 shadow-sm flex justify-between items-center"><h2 className="text-xl font-bold">Profile</h2><Settings className="text-gray-400" /></div>
        <div className="p-6">
            <div className="flex flex-col items-center mb-8">
                <div className="relative group cursor-pointer" onClick={() => {
                    const url = window.prompt("Enter new Profile Photo URL:", userProfile.avatar);
                    if (url) onUpdateProfile('avatar', url);
                }}>
                    {/* GOLDEN PREMIUM GLOWING FRAME */}
                    <div className="absolute -inset-1.5 bg-gradient-to-tr from-yellow-300 via-yellow-500 to-amber-600 rounded-full blur-md opacity-80 animate-pulse"></div>
                    <div className="absolute -inset-0.5 bg-white rounded-full"></div>
                    
                    <img src={userProfile.avatar} className="relative w-28 h-28 rounded-full object-cover border-2 border-white shadow-lg z-10" />
                    
                    {/* CAMERA ICON FOR EDIT */}
                    <div className="absolute bottom-1 right-1 bg-white text-gray-700 p-1.5 rounded-full border border-gray-200 shadow-md z-20 hover:bg-gray-100 transition-colors"><CameraIcon size={16} /></div>
                </div>
                
                {/* BIO SECTION */}
                <div className="mt-5 flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-bold text-gray-900">{userProfile.name}</h2>
                        <button onClick={() => {
                            const newName = window.prompt("Enter your name:", userProfile.name);
                            if (newName) onUpdateProfile('name', newName);
                        }} className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-600 transition-colors"><Edit2 size={14} /></button>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-1 px-4 py-1 rounded-full hover:bg-gray-50 cursor-pointer group" onClick={() => {
                         const newBio = window.prompt("Enter a short bio:", userProfile.bio);
                         if (newBio) onUpdateProfile('bio', newBio);
                    }}>
                        <p className="text-sm text-gray-500 text-center max-w-xs">{userProfile.bio || "No bio set. Click to add."}</p>
                        <Edit2 size={12} className="text-gray-300 group-hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                </div>

                <span className="text-lg text-gray-500 mt-2">🇮🇳</span>
                
                <div className="mt-6 w-full bg-orange-50 border border-orange-100 rounded-2xl p-4 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600"><TrendingUp size={20} /></div><div><div className="font-bold text-gray-800">{userProfile.streak} Days Streak</div><div className="text-xs text-gray-500">Keep it up!</div></div></div></div>
            </div>
            <h3 className="font-bold text-lg text-gray-800 mb-4">Rewards</h3>
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className={`p-4 rounded-2xl border shadow-sm flex flex-col items-start gap-2 ${userProfile.streak >= 7 ? 'bg-pink-50 border-pink-200' : 'bg-white border-gray-100'}`}><div className={`w-10 h-10 rounded-full flex items-center justify-center ${userProfile.streak >= 7 ? 'bg-pink-200 text-pink-700' : 'bg-gray-100 text-gray-400'}`}>{userProfile.streak >= 7 ? <CheckCircle size={20} /> : <Gem size={20} />}</div><div><h4 className="font-bold text-sm text-gray-800">Pro Pass</h4>{userProfile.streak >= 7 ? <span className="text-xs text-green-600 font-bold">Active</span> : <span className="text-xs text-gray-400">{userProfile.streak}/7 Days</span>}</div></div>
                <div className={`p-4 rounded-2xl border shadow-sm flex flex-col items-start gap-2 ${userProfile.streak >= 14 ? 'bg-yellow-50 border-yellow-200' : 'bg-white border-gray-100'}`}><div className={`w-10 h-10 rounded-full flex items-center justify-center ${userProfile.streak >= 14 ? 'bg-yellow-200 text-yellow-700' : 'bg-gray-100 text-gray-400'}`}>{userProfile.streak >= 14 ? <CheckCircle size={20} /> : <Crown size={20} />}</div><div><h4 className="font-bold text-sm text-gray-800">Elite Pass</h4>{userProfile.streak >= 14 ? <span className="text-xs text-green-600 font-bold">Active</span> : <span className="text-xs text-gray-400">{userProfile.streak}/14 Days</span>}</div></div>
            </div>
            <h3 className="font-bold text-lg text-gray-800 mb-4">Information</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                <InfoItem icon={UserIcon} label="Gender" value={userProfile.gender || "Select Gender"} color="text-cyan-500" onClick={() => onEdit('gender')} />
                <InfoItem icon={Smile} label="Call Rating (Auto)" value={userProfile.callRating} color="text-purple-500" onClick={() => {}} readOnly={true} />
                <InfoItem icon={Briefcase} label="Profession" value={userProfile.profession || "Select Profession"} color="text-blue-500" onClick={() => onEdit('profession')} />
                <InfoItem icon={Heart} label="Interests" value={userProfile.interests || "Select Interests"} color="text-pink-500" onClick={() => onEdit('interests')} />
                <InfoItem icon={Languages} label="Spoken Languages" value={userProfile.languages || "Select Languages"} color="text-orange-500" onClick={() => onEdit('languages')} />
                <InfoItem icon={Target} label="Learning Goal" value={userProfile.learningGoal || "Select Goal"} color="text-emerald-500" onClick={() => onEdit('learningGoal')} />
                <InfoItem icon={Type} label="English Level" value={userProfile.englishLevel || "Select Level"} color="text-indigo-500" onClick={() => onEdit('englishLevel')} />
                <InfoItem icon={Globe} label="Mother Tongue" value={userProfile.motherTongue || "Select Language"} color="text-green-500" onClick={() => onEdit('motherTongue')} />
                <InfoItem icon={MapPin} label="Location" value={userProfile.location || "Select Location"} color="text-red-500" onClick={() => onEdit('location')} />
                <InfoItem icon={Shield} label="Privacy & Safety" value="Manage" color="text-gray-500" onClick={onPrivacy} />
            </div>
            <div className="pb-8">
                <div className="relative group mx-2">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                    <div className="relative bg-gray-900 rounded-2xl p-6 text-white shadow-2xl flex flex-col items-center">
                        
                        <h4 className="font-bold text-xl flex items-center gap-2 mt-2">{FOUNDER_INFO.name} <CheckCircle size={18} className="text-blue-400" fill="currentColor" /></h4>
                        <p className="text-sm text-gray-300 uppercase tracking-wide mb-4">{FOUNDER_INFO.role}</p>
                        
                        <div className="w-full mt-2">
                            <a href={FOUNDER_INFO.link} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95">
                                <Instagram size={20} /><span>Follow on Instagram</span>
                            </a>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-4">{FOUNDER_INFO.handle}</p>
                    </div>
                </div>
                <p className="text-center text-[10px] text-gray-400 mt-6">DEAR X • Version 5.0.5 • Made with ❤️</p>
            </div>
        </div>
    </div>
  );
};

const InfoItem = ({ icon: Icon, label, value, color, onClick, readOnly }: any) => (
    <div onClick={onClick} className={`p-4 border-b border-gray-50 flex items-center justify-between last:border-0 transition-colors ${readOnly ? 'cursor-default' : 'hover:bg-gray-50 cursor-pointer'}`}>
        <div className="flex items-center gap-4"><div className={`w-10 h-10 rounded-full bg-opacity-10 flex items-center justify-center ${color.replace('text-', 'bg-')} ${color}`}><Icon size={20} /></div><div className="flex-1 min-w-0"><p className="text-xs text-gray-400 font-bold uppercase tracking-wide">{label}</p><p className="text-sm font-medium text-gray-800 truncate max-w-[200px]">{value}</p></div></div>{!readOnly && <ChevronRight size={18} className="text-gray-300" />}
    </div>
);

export default ProfileScreen;