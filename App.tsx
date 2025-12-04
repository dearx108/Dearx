import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, MessageSquare, Phone, BookOpen, User, Settings, 
  Mic, Volume2, Globe, Shield, Bell, LogOut, Moon, 
  CheckCircle, Play, Star, Award, Zap, MicOff, 
  PhoneOff, ChevronRight, ChevronLeft, CreditCard, Instagram,
  TrendingUp, Send, Book, Video, HelpCircle, FileText,
  X as CloseIcon, Check, AlertCircle, MapPin, Smile, Briefcase, Heart, Type, Crown, Gem,
  Cpu, Plane, Palette, Dumbbell, Utensils, Film, Music, PenTool, Camera, Shirt, Gamepad2, Trophy, Brain, Atom, ChefHat, Landmark, HeartHandshake, Users, Clapperboard, GraduationCap, Building2, Lightbulb, Leaf, Scale, Scroll, Megaphone, Rocket, PawPrint, Coins, Stethoscope, TrendingUp as ChartUp, Gavel,
  Backpack, Calculator, Code2, FlaskConical, Search, Home as HomeIcon, UserCheck, Edit2, Camera as CameraIcon,
  MoreVertical, Flag, Ban, AlertTriangle, Languages, Target, UserPlus, PhoneCall, MessageCircle, Clock, Volume1,
  Paperclip, Plus, Image as ImageIcon
} from 'lucide-react';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import CallScreen from './components/CallScreen';
import ProfileScreen from './components/ProfileScreen';
import LoginScreen from './components/LoginScreen';
import MatchingScreen from './components/MatchingScreen';
import IncomingCallScreen from './components/IncomingCallScreen';
import LeaderboardScreen from './components/LeaderboardScreen';
import OnboardingScreen from './components/OnboardingScreen';
import PublicProfileScreen from './components/PublicProfileScreen';
import PrivacySettingsScreen from './components/PrivacySettingsScreen';
import { User as UserType, AppView, UserPrivacy } from './types';

// --- CONFIG & DATA ---

const FOUNDER_INFO = {
  name: "Santosh Choudhary",
  handle: "@__santosh__choudhary__108",
  role: "Founder & CEO",
  link: "https://instagram.com/__santosh__choudhary__108"
};

const USERS: any[] = [
  { id: 1, name: "Rahul S.", country: "India", flag: "🇮🇳", status: "online", xp: 1250, avatar: "https://randomuser.me/api/portraits/men/32.jpg", interests: ["Tech", "Music"], languages: ["Hindi", "English"], privacy: { onlineStatus: 'everyone', friendsList: 'everyone', profileDetails: 'everyone' }, likes: 124 },
  { id: 2, name: "Sarah J.", country: "USA", flag: "🇺🇸", status: "busy", xp: 980, avatar: "https://randomuser.me/api/portraits/women/44.jpg", interests: ["Travel", "Food"], languages: ["English", "Spanish"], privacy: { onlineStatus: 'friends', friendsList: 'nobody', profileDetails: 'everyone' }, likes: 89 },
  { id: 3, name: "Carlos R.", country: "Spain", flag: "🇪🇸", status: "online", xp: 1100, avatar: "https://randomuser.me/api/portraits/men/86.jpg", interests: ["Sports", "Gaming"], languages: ["Spanish", "English"], likes: 210 },
  { id: 4, name: "Aiko T.", country: "Japan", flag: "🇯🇵", status: "offline", xp: 850, avatar: "https://randomuser.me/api/portraits/women/68.jpg", interests: ["Art", "Reading"], languages: ["Japanese", "English"], likes: 56 },
  { id: 5, name: "James B.", country: "UK", flag: "🇬🇧", status: "online", xp: 2100, avatar: "https://randomuser.me/api/portraits/men/11.jpg", interests: ["History", "Writing"], languages: ["English"], likes: 342 },
];

const MOCK_FRIEND_REQUESTS = [
  { id: 101, name: "Elena K.", country: "Russia", flag: "🇷🇺", avatar: "https://randomuser.me/api/portraits/women/65.jpg", level: 5, interests: ["Chess", "Math"], languages: ["Russian", "English"], likes: 45 },
  { id: 102, name: "Marco P.", country: "Italy", flag: "🇮🇹", avatar: "https://randomuser.me/api/portraits/men/22.jpg", level: 3, interests: ["Cooking", "Football"], languages: ["Italian", "English"], likes: 78 }
];

const MOCK_FRIENDS = [
  { id: 201, name: "John D.", country: "USA", flag: "🇺🇸", status: "online", avatar: "https://randomuser.me/api/portraits/men/1.jpg", level: 8, interests: ["Movies", "Tech"], languages: ["English"], likes: 112 },
  { id: 202, name: "Priya M.", country: "India", flag: "🇮🇳", status: "offline", avatar: "https://randomuser.me/api/portraits/women/2.jpg", level: 6, interests: ["Yoga", "Reading"], languages: ["Hindi", "English"], likes: 204 }
];

const LEARN_MODULES = [
  { id: 1, title: "Grammar Rules", subtitle: "Master Tenses", icon: <Book size={24} />, color: "bg-orange-100 text-orange-600", type: 'grammar_list' },
  { id: 2, title: "Video Lessons", subtitle: "Learn from experts", icon: <Video size={24} />, color: "bg-pink-100 text-pink-600", type: 'video' },
  { id: 3, title: "Vocabulary", subtitle: "New words daily", icon: <FileText size={24} />, color: "bg-green-100 text-green-600", type: 'vocab_list' },
  { id: 4, title: "Take Quiz", subtitle: "Test your skills", icon: <HelpCircle size={24} />, color: "bg-purple-100 text-purple-600", type: 'quiz' },
];

const RECENT_LESSONS = [
  { id: 1, title: "Present Continuous Tense", category: "Grammar", progress: 80 },
  { id: 2, title: "Business Email Writing", category: "Professional", progress: 45 },
  { id: 3, title: "Travel Vocabulary", category: "Travel", progress: 20 },
];

const DAILY_VOCABULARY = [
  { id: 1, word: "Ebullient", pronunciation: "/ɪˈbʊl.i.ənt/", meaning: "Cheerful and full of energy.", example: "She sounded ebullient and happy." },
  { id: 2, word: "Ephemeral", pronunciation: "/ɪˈfem.ər.əl/", meaning: "Lasting for a very short time.", example: "Fashions are ephemeral, changing with every season." },
  { id: 3, word: "Serendipity", pronunciation: "/ˌser.ənˈdɪp.ə.t̬i/", meaning: "Finding interesting or valuable things by chance.", example: "Meeting her was pure serendipity." },
  { id: 4, word: "Eloquent", pronunciation: "/ˈel.ə.kwənt/", meaning: "Fluent or persuasive in speaking or writing.", example: "He made an eloquent speech." },
  { id: 5, word: "Resilient", pronunciation: "/rɪˈzɪl.jənt/", meaning: "Able to withstand or recover quickly from difficult conditions.", example: "Babies are generally quite resilient." },
];

const GRAMMAR_TOPICS = [
  { id: 1, title: "Tenses Masterclass", description: "Learn Present, Past, and Future tenses.", progress: 0, icon: <Clock /> },
  { id: 2, title: "Prepositions", description: "In, On, At - confusing but essential.", progress: 0, icon: <MapPin /> },
  { id: 3, title: "Active vs Passive Voice", description: "Structure your sentences correctly.", progress: 0, icon: <Type /> },
  { id: 4, title: "Articles (A, An, The)", description: "When to use definite and indefinite articles.", progress: 0, icon: <Book /> },
  { id: 5, title: "Modal Verbs", description: "Can, Could, Should, Would usage.", progress: 0, icon: <Zap /> },
];

const WORD_OF_THE_DAY = {
    word: "Serendipity",
    pronunciation: "/ˌser.ənˈdɪp.ə.t̬i/",
    meaning: "The occurrence of events by chance in a happy or beneficial way."
};

// --- INTERESTS DATA (GRID ICONS) ---
const INTEREST_ITEMS = [
    { id: 'tech', label: 'Technology', icon: <Cpu size={24} />, color: 'text-blue-500 bg-blue-100' },
    { id: 'travel', label: 'Travel', icon: <Plane size={24} />, color: 'text-sky-500 bg-sky-100' },
    { id: 'art', label: 'Art', icon: <Palette size={24} />, color: 'text-pink-500 bg-pink-100' },
    { id: 'fitness', label: 'Fitness', icon: <Dumbbell size={24} />, color: 'text-emerald-500 bg-emerald-100' },
    { id: 'food', label: 'Food', icon: <Utensils size={24} />, color: 'text-orange-500 bg-orange-100' },
    { id: 'movies', label: 'Movies', icon: <Film size={24} />, color: 'text-red-500 bg-red-100' },
    { id: 'music', label: 'Music', icon: <Music size={24} />, color: 'text-purple-500 bg-purple-100' },
    { id: 'books', label: 'Books', icon: <Book size={24} />, color: 'text-indigo-500 bg-indigo-100' },
    { id: 'writing', label: 'Writing', icon: <PenTool size={24} />, color: 'text-gray-600' },
    { id: 'gaming', label: 'Gaming', icon: <Gamepad2 size={24} />, color: 'text-violet-500 bg-violet-100' },
    { id: 'sports', label: 'Sports', icon: <Trophy size={24} />, color: 'text-yellow-500 bg-yellow-100' },
    { id: 'science', label: 'Science', icon: <Atom size={24} />, color: 'text-cyan-500 bg-cyan-100' },
    { id: 'cooking', label: 'Cooking', icon: <ChefHat size={24} />, color: 'text-orange-400 bg-orange-50' },
    { id: 'politics', label: 'Politics', icon: <Landmark size={24} />, color: 'text-stone-600 bg-stone-200' },
    { id: 'psych', label: 'Psychology', icon: <Brain size={24} />, color: 'text-rose-400 bg-rose-100' },
    { id: 'business', label: 'Business', icon: <Briefcase size={24} />, color: 'text-slate-600 bg-slate-200' },
    { id: 'family', label: 'Family', icon: <Users size={24} />, color: 'text-teal-500 bg-teal-100' },
    { id: 'bollywood', label: 'Bollywood', icon: <Clapperboard size={24} />, color: 'text-red-600 bg-red-100' },
    { id: 'college', label: 'College', icon: <GraduationCap size={24} />, color: 'text-blue-700 bg-blue-100' },
    { id: 'startup', label: 'Startup', icon: <Rocket size={24} />, color: 'text-orange-600 bg-orange-100' },
    { id: 'nature', label: 'Environment', icon: <Leaf size={24} />, color: 'text-green-500 bg-green-100' },
    { id: 'finance', label: 'Finance', icon: <Coins size={24} />, color: 'text-yellow-600 bg-yellow-100' },
];

// --- PROFESSION DATA (GRID ICONS) ---
const PROFESSION_ITEMS = [
    { label: "School Student", icon: <Backpack size={24} />, color: "text-blue-500 bg-blue-100" },
    { label: "College Student", icon: <GraduationCap size={24} />, color: "text-purple-500 bg-purple-100" },
    { label: "Working", icon: <Briefcase size={24} />, color: "text-slate-600 bg-slate-100" },
    { label: "Job Seeker", icon: <Search size={24} />, color: "text-orange-500 bg-orange-100" },
    { label: "BA", icon: <BookOpen size={24} />, color: "text-pink-500 bg-pink-100" },
    { label: "BCom", icon: <Calculator size={24} />, color: "text-green-500 bg-green-100" },
    { label: "BSc", icon: <Atom size={24} />, color: "text-cyan-500 bg-cyan-100" },
    { label: "BTech", icon: <Cpu size={24} />, color: "text-blue-600 bg-blue-100" },
    { label: "MBBS", icon: <Stethoscope size={24} />, color: "text-red-500 bg-red-100" },
    { label: "MBA", icon: <ChartUp size={24} />, color: "text-yellow-600 bg-yellow-100" },
    { label: "MA", icon: <Scroll size={24} />, color: "text-indigo-500 bg-indigo-100" },
    { label: "MSc", icon: <FlaskConical size={24} />, color: "text-teal-500 bg-teal-100" },
    { label: "MTech", icon: <Code2 size={24} />, color: "text-violet-500 bg-violet-100" },
    { label: "Homemaker", icon: <HomeIcon size={24} />, color: "text-rose-500 bg-rose-100" },
    { label: "Business", icon: <Building2 size={24} />, color: "text-gray-600 bg-gray-200" },
];

// --- ENGLISH LEVELS ---
const ENGLISH_LEVEL_DETAILS = [
    { level: "Newbie", desc: "You cannot comfortably read or understand English.", barColor: "bg-gray-300" },
    { level: "Learner", desc: "You can read English comfortably but struggle with communication.", barColor: "bg-blue-300" },
    { level: "Beginner", desc: "You can speak simple sentences but make grammatical mistakes.", barColor: "bg-green-300" },
    { level: "Intermediate", desc: "You are comfortable discussing familiar topics with moderate fluency.", barColor: "bg-yellow-400" },
    { level: "Advanced", desc: "You are fluent in most situations and can communicate effectively.", barColor: "bg-purple-500" }
];

// --- SIMPLE LIST OPTIONS ---
const PROFILE_OPTIONS: any = {
    gender: ["Male", "Female", "Other"],
    motherTongue: ["Hindi", "English", "Bengali", "Telugu", "Marathi", "Tamil", "Urdu", "Gujarati", "Kannada", "Punjabi"],
    location: [
        "🇮🇳 India", "🇺🇸 United States", "🇬🇧 United Kingdom", "🇨🇦 Canada", "🇦🇺 Australia",
        "🇩🇪 Germany", "🇫🇷 France", "🇯🇵 Japan", "🇨🇳 China", "🇧🇷 Brazil", "🇷🇺 Russia", 
        "🇦🇪 UAE", "🇸🇦 Saudi Arabia", "🇮🇹 Italy", "🇪🇸 Spain"
    ],
    learningGoal: [
        "Fluency", "Grammar Improvement", "Vocabulary Building", "Pronunciation", 
        "Public Speaking", "Job Interview Prep", "Travel English", "IELTS/TOEFL Prep",
        "Business Communication", "Social Conversation"
    ],
    languages: [
        "English", "Hindi", "Spanish", "French", "German", 
        "Mandarin", "Arabic", "Russian", "Portuguese", "Japanese",
        "Bengali", "Telugu", "Marathi", "Tamil", "Urdu", "Gujarati", "Kannada"
    ]
};

// --- MODALS ---

const ReportModal = ({ isOpen, onClose, userName }: { isOpen: boolean; onClose: () => void; userName: string }) => {
    const [step, setStep] = useState<'menu' | 'report_success' | 'block_confirm' | 'block_success'>('menu');

    useEffect(() => {
        if (isOpen) setStep('menu');
    }, [isOpen]);

    if (!isOpen) return null;

    const handleReport = () => {
        setStep('report_success');
        setTimeout(() => onClose(), 2000);
    };

    const handleBlock = () => {
        setStep('block_confirm');
    };

    const confirmBlock = () => {
        setStep('block_success');
        setTimeout(() => onClose(), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6 animate-in fade-in backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl scale-100 transition-all">
                {step === 'menu' && (
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Options for {userName}</h3>
                            <button onClick={onClose}><CloseIcon className="text-gray-400" /></button>
                        </div>
                        <div className="space-y-3">
                            <button onClick={handleReport} className="w-full flex items-center gap-4 p-4 rounded-xl bg-red-50 text-red-700 font-bold hover:bg-red-100 transition-colors">
                                <Flag size={20} /> Report User
                            </button>
                            <button onClick={handleBlock} className="w-full flex items-center gap-4 p-4 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-colors">
                                <Ban size={20} /> Block User
                            </button>
                        </div>
                    </div>
                )}

                {step === 'report_success' && (
                    <div className="p-10 text-center">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Report Sent</h3>
                        <p className="text-gray-500 text-sm">Thank you for keeping our community safe. We will review this shortly.</p>
                    </div>
                )}

                {step === 'block_confirm' && (
                    <div className="p-6">
                        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Block {userName}?</h3>
                        <p className="text-gray-500 text-center text-sm mb-6">They will not be able to contact you or see your profile. This action cannot be undone easily.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setStep('menu')} className="flex-1 py-3 rounded-xl font-bold text-gray-600 bg-gray-100">Cancel</button>
                            <button onClick={confirmBlock} className="flex-1 py-3 rounded-xl font-bold text-white bg-red-600 shadow-lg shadow-red-200">Yes, Block</button>
                        </div>
                    </div>
                )}

                {step === 'block_success' && (
                    <div className="p-10 text-center">
                        <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <Ban size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Blocked</h3>
                        <p className="text-gray-500 text-sm">You have successfully blocked {userName}.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- SELECTION SCREENS ---

const SelectionScreen = ({ title, options, onSelect, onBack }: any) => (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans animate-in">
        <div className="bg-white p-4 sticky top-0 z-10 shadow-sm flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft size={24} /></button>
            <h2 className="text-xl font-bold text-gray-800">Select {title}</h2>
        </div>
        <div className="p-4 space-y-2 overflow-y-auto pb-20">
            {options.map((option: string, index: number) => (
                <div 
                    key={index} 
                    onClick={() => onSelect(option)}
                    className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between cursor-pointer active:bg-sky-50 active:border-sky-200 transition-colors"
                >
                    <span className="font-medium text-gray-700">{option}</span>
                    <ChevronRight size={18} className="text-gray-300" />
                </div>
            ))}
        </div>
    </div>
);

const MultiSelectionScreen = ({ title, options, selectedValues, onToggle, onBack }: any) => (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans animate-in">
        <div className="bg-white p-4 sticky top-0 z-10 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft size={24} /></button>
                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            </div>
             <button onClick={onBack} className="text-sky-600 font-bold text-sm">Done</button>
        </div>
        <div className="p-4 space-y-2 overflow-y-auto pb-20">
            {options.map((option: string, index: number) => {
                const isSelected = selectedValues.includes(option);
                return (
                    <div 
                        key={index} 
                        onClick={() => onToggle(option)}
                        className={`p-4 rounded-xl border shadow-sm flex items-center justify-between cursor-pointer transition-colors ${isSelected ? 'bg-sky-50 border-sky-200' : 'bg-white border-gray-100'}`}
                    >
                        <span className={`font-medium ${isSelected ? 'text-sky-700' : 'text-gray-700'}`}>{option}</span>
                        {isSelected && <CheckCircle size={18} className="text-sky-600" />}
                    </div>
                );
            })}
        </div>
    </div>
);

// Grid Selection for Interests
const InterestSelectionScreen = ({ currentInterests, onSelect, onBack }: any) => {
    const handleInterestClick = (label: string) => {
        onSelect(label);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans animate-in">
            <div className="bg-white p-4 sticky top-0 z-10 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft size={24} /></button>
                    <h2 className="text-xl font-bold text-gray-800">Edit Interests</h2>
                </div>
                <button onClick={onBack} className="text-sky-600 font-bold text-sm">Save</button>
            </div>
            <div className="p-4 pb-20">
                <div className="grid grid-cols-3 gap-3">
                    {INTEREST_ITEMS.map((item) => {
                        const isSelected = currentInterests.includes(item.label);
                        return (
                            <div 
                                key={item.id}
                                onClick={() => handleInterestClick(item.label)}
                                className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 p-2 cursor-pointer transition-all border-2 ${isSelected ? 'bg-sky-50 border-sky-500 shadow-md' : 'bg-white border-transparent shadow-sm hover:shadow'}`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color.split(' ')[1]}`}>
                                    {React.cloneElement(item.icon, { size: 20, className: item.color.split(' ')[0] })}
                                </div>
                                <span className={`text-[10px] font-bold text-center leading-tight ${isSelected ? 'text-sky-700' : 'text-gray-500'}`}>
                                    {item.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// Grid Selection for Profession
const ProfessionSelectionScreen = ({ onSelect, onBack }: any) => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans animate-in">
            <div className="bg-white p-4 sticky top-0 z-10 shadow-sm flex items-center gap-3">
                <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft size={24} /></button>
                <h2 className="text-xl font-bold text-gray-800">Select Profession</h2>
            </div>
            <div className="p-4 pb-20">
                <div className="grid grid-cols-3 gap-3">
                    {PROFESSION_ITEMS.map((item, index) => (
                        <div 
                            key={index}
                            onClick={() => onSelect(item.label)}
                            className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-sky-300 active:scale-95 transition-all aspect-square"
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color.split(' ')[1]}`}>
                                {React.cloneElement(item.icon, { size: 20, className: item.color.split(' ')[0] })}
                            </div>
                            <span className="text-xs font-medium text-gray-700 text-center leading-tight">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// English Level with Descriptions
const LevelSelectionScreen = ({ onSelect, onBack }: any) => (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans animate-in">
        <div className="bg-white p-4 sticky top-0 z-10 shadow-sm flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft size={24} /></button>
            <h2 className="text-xl font-bold text-gray-800">Edit English Level</h2>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto pb-20">
            {ENGLISH_LEVEL_DETAILS.map((item, index) => (
                <div 
                    key={index} 
                    onClick={() => onSelect(item.level)}
                    className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm cursor-pointer active:scale-98 transition-transform hover:border-sky-200"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className={`w-3 h-8 rounded-full ${item.barColor}`}></div>
                        <h3 className="font-bold text-lg text-gray-800">{item.level}</h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed pl-6">
                        {item.desc}
                    </p>
                </div>
            ))}
        </div>
    </div>
);

// --- OTHER VIEWS ---

const CallFeedbackScreen = ({ onHome, partner, onAddFriend, isFriend, sessionType }: any) => {
    const feedback = { 
        score: sessionType === 'call' ? 8.5 : null, 
        duration: "12:04", 
        grammar: sessionType === 'call' ? [{ original: "I go to market.", corrected: "I went to the market.", type: "Tense Error" }] : [], 
        pronunciation: [] 
    };
    
    const [requestSent, setRequestSent] = useState(false);

    const handleAddFriend = () => {
        onAddFriend();
        setRequestSent(true);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-10 animate-in">
            <div className="bg-sky-600 p-6 pt-10 rounded-b-[40px] text-white text-center shadow-xl">
                <h2 className="text-2xl font-bold mb-1">{sessionType === 'call' ? 'Call Analysis' : 'Chat Summary'}</h2>
                <p className="text-sky-100 text-sm mb-6">Great job! Here is your report.</p>
                {/* Score only for calls */}
                {sessionType === 'call' && (
                    <div className="w-32 h-32 rounded-full border-4 border-white/30 flex items-center justify-center mx-auto bg-white/10 backdrop-blur-md mb-4 relative">
                        <div className="text-center"><div className="text-4xl font-bold">{feedback.score}</div><div className="text-xs uppercase opacity-80">Out of 10</div></div>
                    </div>
                )}
                
                <div className="flex justify-center gap-6 text-sm font-medium text-sky-100">
                    <span>⏱️ {feedback.duration} Mins</span>
                    <span>🔥 +{sessionType === 'call' ? 50 : 20} pts</span>
                </div>
            </div>
            
            <div className="px-6 -mt-6 space-y-6">
                {partner && (
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <img src={partner.avatar || partner.avatarUrl} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                            <div>
                                <h4 className="font-bold text-gray-800">{partner.name}</h4>
                                <p className="text-xs text-gray-500">{partner.country}</p>
                            </div>
                         </div>
                         {!isFriend && !requestSent ? (
                             <button onClick={handleAddFriend} className="flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-700 rounded-full font-bold text-xs hover:bg-sky-200 transition-colors">
                                <UserPlus size={16} /> Add Friend
                             </button>
                         ) : isFriend ? (
                             <div className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold">
                                 <Check size={14} /> Friends
                             </div>
                         ) : (
                             <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-bold">
                                 <Check size={14} /> Sent
                             </div>
                         )}
                    </div>
                )}
                
                {sessionType === 'call' && (
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><BookOpen size={18} className="text-purple-500" /> Grammar Check</h3>
                        <div className="space-y-4">
                            {feedback.grammar.map((item: any, i: number) => (
                                <div key={i} className="bg-gray-50 p-3 rounded-xl border-l-4 border-red-400">
                                    <div className="flex items-start gap-2 mb-1"><CloseIcon size={16} className="text-red-500 mt-0.5" /><p className="text-gray-500 line-through text-sm">{item.original}</p></div>
                                    <div className="flex items-start gap-2"><Check size={16} className="text-green-500 mt-0.5" /><p className="text-gray-800 font-medium text-sm">{item.corrected}</p></div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                <button onClick={onHome} className="w-full bg-sky-600 text-white py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-transform">Back to Home</button>
            </div>
        </div>
    );
};

const AiPracticeScreen = ({ onBack }: any) => {
    const [messages, setMessages] = useState([{ id: 1, sender: 'ai', text: "Hello! I am your AI Tutor." }]);
    const [inputText, setInputText] = useState("");
    const chatEndRef = useRef<any>(null);
    useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
    const sendMessage = () => { if (!inputText.trim()) return; setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: inputText }]); setInputText(""); setTimeout(() => { setMessages(prev => [...prev, { id: Date.now(), sender: 'ai', text: "That's interesting! Tell me more." }]); }, 1000); };
    return (
        <div className="h-screen flex flex-col bg-white font-sans animate-in"><div className="p-4 border-b flex items-center gap-3 shadow-sm bg-white z-10"><button onClick={onBack}><ChevronLeft /></button><h3 className="font-bold">AI Tutor</h3></div><div className="flex-1 bg-slate-50 p-4 overflow-y-auto space-y-4 pb-20">{messages.map(msg => (<div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[80%] p-4 rounded-2xl text-sm shadow-sm ${msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border'}`}>{msg.text}</div></div>))}<div ref={chatEndRef} /></div><div className="p-4 border-t bg-white flex gap-2 fixed bottom-0 w-full max-w-md"><input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Type..." className="flex-1 bg-gray-100 rounded-full px-5 py-3" /><button onClick={sendMessage} className="p-3 bg-indigo-600 text-white rounded-full"><Send size={20} /></button></div></div>
    );
};

// --- NEW LEARNING SCREENS ---

const VocabularyListScreen = ({ onBack }: { onBack: () => void }) => (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans animate-in">
        <div className="bg-white p-4 sticky top-0 z-10 shadow-sm flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft size={24} className="text-gray-600" /></button>
            <h2 className="text-xl font-bold text-gray-800">Daily Vocabulary</h2>
        </div>
        <div className="p-4 space-y-4 pb-20">
            {DAILY_VOCABULARY.map(item => (
                <div key={item.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{item.word}</h3>
                        <div className="p-2 bg-sky-50 text-sky-600 rounded-full cursor-pointer hover:bg-sky-100">
                            <Volume1 size={16} />
                        </div>
                    </div>
                    <p className="text-sm text-sky-600 font-mono mb-2">{item.pronunciation}</p>
                    <p className="text-gray-600 text-sm mb-3">{item.meaning}</p>
                    <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-sky-400">
                        <p className="text-xs text-gray-500 italic">"{item.example}"</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const GrammarListScreen = ({ onBack }: { onBack: () => void }) => (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans animate-in">
        <div className="bg-white p-4 sticky top-0 z-10 shadow-sm flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft size={24} className="text-gray-600" /></button>
            <h2 className="text-xl font-bold text-gray-800">Grammar Rules</h2>
        </div>
        <div className="p-4 space-y-4 pb-20">
            {GRAMMAR_TOPICS.map(topic => (
                <div key={topic.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98]">
                    <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center shrink-0">
                        {topic.icon}
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{topic.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{topic.description}</p>
                    </div>
                    <ChevronRight className="text-gray-300" size={20} />
                </div>
            ))}
        </div>
    </div>
);

// --- INLINED CHAT SCREEN (To fix missing module error) ---

const ChatDetailScreen = ({ chat, onBack, onAddFriend, isFriend, onVideoCall }: { chat: any; onBack: () => void; onAddFriend: () => void; isFriend: boolean; onVideoCall: () => void }) => {
    const [msgs, setMsgs] = useState([
        { id: 1, text: "Hi! Nice talking to you earlier.", sender: "them", time: "10:30 AM", type: "text" },
        { id: 2, text: "I really liked your English accent!", sender: "them", time: "10:31 AM", type: "text" }
    ]);
    const [text, setText] = useState("");
    const messagesEndRef = useRef<any>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [msgs]);

    const send = () => {
        if (!text.trim()) return;
        setMsgs([...msgs, { id: Date.now(), text, sender: "me", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), type: "text" }]);
        setText("");
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') send();
    };

    return (
        <div className="h-full bg-[#E4E9F0] flex flex-col font-sans relative">
            {/* Header */}
            <div className="bg-white p-3 shadow-sm flex items-center justify-between z-20 sticky top-0">
                <div className="flex items-center gap-3">
                    <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full text-gray-600"><ChevronLeft size={24} /></button>
                    <div className="flex items-center gap-3">
                         <div className="relative">
                            <img src={chat?.avatar || chat?.avatarUrl || "https://via.placeholder.com/50"} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                         </div>
                         <div>
                             <h3 className="font-bold text-gray-900 text-sm leading-tight">{chat?.name}</h3>
                             <p className="text-xs text-sky-600">Online</p>
                         </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={onVideoCall} className="p-2 hover:bg-gray-100 rounded-full text-sky-600"><Video size={22} /></button>
                    <button className="p-2 hover:bg-gray-100 rounded-full text-green-600"><Phone size={20} /></button>
                    {!isFriend && (
                        <button onClick={onAddFriend} className="p-2 hover:bg-gray-100 rounded-full text-gray-500"><UserPlus size={20} /></button>
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                <div className="flex justify-center mb-4">
                    <span className="bg-gray-200 text-gray-600 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">Today</span>
                </div>
                
                {msgs.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow-sm relative group ${
                            msg.sender === 'me' 
                            ? 'bg-sky-600 text-white rounded-tr-none' 
                            : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                        }`}>
                            <p className="leading-relaxed">{msg.text}</p>
                            <div className={`text-[10px] mt-1 flex items-center justify-end gap-1 ${msg.sender === 'me' ? 'text-sky-100' : 'text-gray-400'}`}>
                                {msg.time}
                                {msg.sender === 'me' && <Check size={12} className="text-sky-200" />}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white p-3 flex items-center gap-2 border-t border-gray-100 z-20">
                <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
                    <Plus size={24} />
                </button>
                <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex items-center gap-2 border border-transparent focus-within:border-sky-200 transition-colors">
                    <input 
                        type="text" 
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Message..." 
                        className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400" 
                    />
                    <button className="text-gray-400 hover:text-gray-600"><Paperclip size={18} /></button>
                    <button className="text-gray-400 hover:text-gray-600"><CameraIcon size={18} /></button>
                </div>
                {text.trim() ? (
                    <button onClick={send} className="p-3 bg-sky-600 text-white rounded-full shadow-lg hover:bg-sky-700 active:scale-95 transition-all">
                        <Send size={20} fill="currentColor" />
                    </button>
                ) : (
                    <button className="p-3 bg-sky-600 text-white rounded-full shadow-lg hover:bg-sky-700 active:scale-95 transition-all">
                        <Mic size={20} fill="currentColor" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<AppView>('home'); 
  const [credits, setCredits] = useState(15);
  const [darkMode, setDarkMode] = useState(false);
  const [currentChat, setCurrentChat] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>({ 
      name: "James Babu",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop",
      gender: "Male", profession: "Student", interests: "Technology", englishLevel: "Advanced", motherTongue: "English", location: "🇮🇳 India", streak: 12, callRating: "Excellent",
      bio: "Passionate about learning languages and connecting with people worldwide!",
      languages: "English, Hindi",
      learningGoal: "Fluency",
      privacy: { onlineStatus: 'everyone', friendsList: 'everyone', profileDetails: 'everyone' },
      likes: 42
  });
  const [editField, setEditField] = useState<string | null>(null); 
  const [users, setUsers] = useState(USERS);
  const [friends, setFriends] = useState(MOCK_FRIENDS);
  const [friendRequests, setFriendRequests] = useState(MOCK_FRIEND_REQUESTS);
  const [sentRequests, setSentRequests] = useState<number[]>([]);
  const [socialTab, setSocialTab] = useState<'leaderboard' | 'friends'>('leaderboard');
  const [lastCallPartner, setLastCallPartner] = useState<any>(null);
  const [lastSessionType, setLastSessionType] = useState<'call' | 'chat'>('call');
  const [viewingUser, setViewingUser] = useState<any>(null);
  const [callSettings, setCallSettings] = useState<{partner: any | null, isVideo: boolean}>({ partner: null, isVideo: false });

  useEffect(() => {
      const newRating = userProfile.streak >= 7 ? "Excellent" : "Good";
      if (userProfile.callRating !== newRating) setUserProfile((prev: any) => ({ ...prev, callRating: newRating }));
  }, [userProfile.streak]);

  if (loading) return <SplashScreen onFinish={() => setLoading(false)} />;

  const handleSelection = (value: string) => {
      let newVal = value;
      if (editField === 'interests') {
          const current = userProfile.interests ? userProfile.interests.split(', ') : [];
          if (current.includes(value)) newVal = current.filter((i: string) => i !== value).join(', ');
          else newVal = [...current, value].join(', ');
      } else if (editField === 'languages') {
          const current = userProfile.languages ? userProfile.languages.split(', ') : [];
          if (current.includes(value)) newVal = current.filter((i: string) => i !== value).join(', ');
          else newVal = [...current, value].join(', ');
      }
      setUserProfile((prev: any) => ({ ...prev, [editField!]: newVal }));
      if (editField !== 'interests' && editField !== 'languages') setEditField(null);
  };

  const updateProfileField = (field: string, value: string) => {
      setUserProfile((prev: any) => ({ ...prev, [field]: value }));
  };

  const handlePrivacyUpdate = (key: keyof UserPrivacy, value: any) => {
      setUserProfile((prev: any) => ({
          ...prev,
          privacy: { ...prev.privacy, [key]: value }
      }));
  };

  const handleLikeUser = (userId: string | number) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, likes: (u.likes || 0) + 1 } : u));
    
    // Also update friends/requests/mock data logic if needed, but primarily USERS array covers leaderboard/search
    if (viewingUser && viewingUser.id === userId) {
        setViewingUser((prev: any) => ({ ...prev, likes: (prev.likes || 0) + 1 }));
    }
  };

  // Friend System Logic
  const handleAcceptFriend = (request: any) => {
      setFriendRequests(prev => prev.filter(r => r.id !== request.id));
      setFriends(prev => [...prev, { ...request, status: 'online' }]);
      alert(`${request.name} added to your friends!`);
  };

  const handleDeclineFriend = (id: number) => {
      setFriendRequests(prev => prev.filter(r => r.id !== id));
  };

  const handleCallFriend = (friend: any) => {
      setCallSettings({ partner: friend, isVideo: false });
      setView('call');
  };

  const handleVideoCall = (friend: any) => {
      setCallSettings({ partner: friend, isVideo: true });
      setView('call');
  };

  const handleMessageFriend = (friend: any) => {
      setCurrentChat(friend);
      setView('chat');
  };

  const handleSendFriendRequest = (user: any) => {
      if (!user) return;
      if (friends.find(f => f.id === user.id)) {
          alert("You are already friends!");
          return;
      }
      if (sentRequests.includes(user.id)) {
          alert("Request already sent!");
          return;
      }
      setSentRequests(prev => [...prev, user.id]);
      alert(`Friend request sent to ${user.name}!`);
  };

  const handleViewProfile = (user: any) => {
      // Find updated user data from USERS to get latest likes
      const updatedUser = users.find(u => u.id === user.id) || user;
      setViewingUser(updatedUser);
      setView('public_profile');
  };

  const getFriendStatus = (user: any) => {
      if (!user) return 'none';
      if (friends.some(f => f.id === user.id)) return 'friend';
      if (friendRequests.some(r => r.id === user.id)) return 'received';
      if (sentRequests.includes(user.id)) return 'sent';
      return 'none';
  };

  const BottomNav = () => (
    <div className={`fixed bottom-0 w-full ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'} border-t pb-safe pt-2 px-6 flex justify-between items-end z-40 h-20 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.05)]`}>
      <NavBtn icon={Home} label="Home" active={view === 'home'} onClick={() => setView('home')} />
      <NavBtn icon={BookOpen} label="Learn" active={view === 'learn'} onClick={() => setView('learn')} />
      <div className="relative -top-8"><button onClick={() => { setCallSettings({ partner: null, isVideo: false }); setView('call'); }} className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-sky-500/40 border-4 border-white transform transition-transform active:scale-95"><Phone size={28} fill="currentColor" /></button></div>
      <NavBtn icon={Award} label="Social" active={view === 'social'} onClick={() => setView('social')} />
      <NavBtn icon={User} label="Profile" active={view === 'profile'} onClick={() => setView('profile')} />
    </div>
  );

  const NavBtn = ({ icon: Icon, label, active, onClick }: any) => (
    <button onClick={onClick} className={`flex flex-col items-center w-12 gap-1 mb-2 transition-colors ${active ? 'text-sky-600' : 'text-gray-400'}`}><Icon size={24} strokeWidth={active ? 2.5 : 2} /><span className="text-[10px] font-bold">{label}</span></button>
  );

  const Header = () => (
    <div className={`px-6 pt-6 pb-2 flex justify-between items-center sticky top-0 z-30 ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <div className="flex items-center gap-1"><div><h1 className="text-2xl font-bold tracking-tight text-slate-800 flex items-center">DEAR <span className="text-red-600 font-serif italic text-4xl ml-1" style={{fontFamily: 'serif'}}>X</span></h1><span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block -mt-1 ml-0.5">Premium</span></div></div>
      <div className="flex items-center gap-3"><div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-yellow-200 shadow-sm"><Zap size={12} fill="currentColor" /> {credits}</div><div className="relative"><Bell size={24} className="text-gray-400" /><span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-50"></span></div></div>
    </div>
  );

  // --- VIEWS ---

  const HomeView = () => (
    <div className={`min-h-screen pb-24 ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-gray-900'}`}>
      <Header />
      <div className="p-6 space-y-6">
        <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden"><div className="relative z-10"><h2 className="text-2xl font-bold mb-1">Welcome Back! 👋</h2><p className="text-sky-100 text-sm">Ready to master English today?</p><button onClick={() => { setCallSettings({ partner: null, isVideo: false }); setView('call'); }} className="mt-4 bg-white text-sky-600 px-6 py-2 rounded-full font-bold text-sm shadow-md">Start Speaking</button></div><Star className="absolute -right-6 -top-6 text-white opacity-10 w-40 h-40" fill="currentColor" /></div>
        <div><h3 className="font-bold text-lg mb-4 flex justify-between items-center">Practice Mode</h3><div className="grid grid-cols-2 gap-4"><div onClick={() => { setCallSettings({ partner: null, isVideo: false }); setView('call'); }} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-transform flex flex-col items-center text-center gap-3 group hover:border-sky-200"><div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 group-hover:bg-sky-500 group-hover:text-white transition-colors"><Phone size={24} fill="currentColor" /></div><div><h4 className="font-bold text-gray-800">Talk to Human</h4><p className="text-xs text-gray-500">Global matching</p></div></div><div onClick={() => setView('ai')} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-transform flex flex-col items-center text-center gap-3 group hover:border-purple-200"><div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors"><Zap size={24} fill="currentColor" /></div><div><h4 className="font-bold text-gray-800">Talk to AI</h4><p className="text-xs text-gray-500">24/7 Available</p></div></div></div></div>
        <div><h3 className="font-bold text-lg mb-4">Live Students <span className="text-green-500 text-sm">({users.length} active)</span></h3><div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">{users.map(u => (<div key={u.id} onClick={() => handleViewProfile(u)} className="flex flex-col items-center gap-2 min-w-[70px] cursor-pointer active:scale-95 transition-transform"><div className="relative"><img src={u.avatar} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md" /><span className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white rounded-full ${u.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></span></div><span className="text-xs font-medium truncate w-full text-center">{u.name}</span></div>))}</div></div>
      </div>
    </div>
  );

  const LearnView = () => (
      <div className="min-h-screen bg-slate-50 pb-24">
          <Header />
          <div className="p-6">
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 mb-6 relative overflow-hidden"><div className="relative z-10"><h4 className="text-orange-500 text-xs font-bold uppercase tracking-wider mb-1">Word of the Day</h4><h2 className="text-2xl font-bold text-gray-800">{WORD_OF_THE_DAY.word}</h2><div className="flex items-center gap-2 mt-1 text-sm text-gray-600"><span>{WORD_OF_THE_DAY.pronunciation}</span></div><p className="text-gray-600 text-sm mt-2 italic">"{WORD_OF_THE_DAY.meaning}"</p></div><BookOpen className="absolute -right-4 -bottom-4 text-orange-200 w-24 h-24 opacity-50" /></div>
              <h3 className="font-bold text-lg text-gray-800 mb-4">Study Modules</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {LEARN_MODULES.map(mod => (
                  <div 
                    key={mod.id} 
                    onClick={() => {
                        if (mod.type === 'vocab_list') setView('vocab_list');
                        else if (mod.type === 'grammar_list') setView('grammar_list');
                    }}
                    className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-start gap-3 active:scale-95 transition-transform cursor-pointer"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${mod.color} bg-opacity-20`}>{mod.icon}</div>
                    <div><h4 className="font-bold text-gray-800 text-sm">{mod.title}</h4><p className="text-xs text-gray-500">{mod.subtitle}</p></div>
                  </div>
                ))}
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-4">Recent Lessons</h3><div className="space-y-3">{RECENT_LESSONS.map(lesson => (<div key={lesson.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"><div className="w-10 h-10 bg-sky-50 text-sky-600 flex items-center justify-center rounded-full"><Play size={16} fill="currentColor" /></div><div className="flex-1"><h4 className="font-bold text-gray-800 text-sm">{lesson.title}</h4><p className="text-xs text-gray-500">{lesson.category}</p></div><div className="text-xs font-bold text-sky-600">{lesson.progress}%</div></div>))}</div>
          </div>
      </div>
  );

  const SocialView = () => (
      <div className="min-h-screen bg-slate-50 pb-24">
          <div className="bg-sky-600 p-6 pb-12 text-white rounded-b-3xl shadow-lg">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-2"><Award /> Social</h2>
            <div className="flex p-1 bg-sky-700/50 rounded-xl">
                <button 
                    onClick={() => setSocialTab('leaderboard')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${socialTab === 'leaderboard' ? 'bg-white text-sky-600 shadow-sm' : 'text-sky-100 hover:bg-white/10'}`}
                >
                    Leaderboard
                </button>
                <button 
                    onClick={() => setSocialTab('friends')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${socialTab === 'friends' ? 'bg-white text-sky-600 shadow-sm' : 'text-sky-100 hover:bg-white/10'}`}
                >
                    Friends
                </button>
            </div>
          </div>
          
          <div className="px-6 -mt-6">
              {socialTab === 'leaderboard' ? (
                <div className="space-y-3">
                    {users.sort((a,b) => b.xp - a.xp).map((u, i) => (<div key={u.id} onClick={() => handleViewProfile(u)} className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4 border border-gray-100 cursor-pointer active:scale-[0.98] transition-transform"><div className={`w-8 h-8 flex items-center justify-center font-bold rounded-full ${i===0 ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'}`}>{i+1}</div><img src={u.avatar} className="w-10 h-10 rounded-full object-cover" /><div className="flex-1"><h3 className="font-bold text-gray-800">{u.name} <span className="text-xs">{u.flag}</span></h3><p className="text-xs text-gray-500">{u.country}</p></div><div className="font-bold text-sky-600">{u.xp} XP</div></div>))}
                </div>
              ) : (
                <div className="space-y-6">
                    {/* Friend Requests */}
                    {friendRequests.length > 0 && (
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2"><UserPlus size={16} className="text-orange-500" /> Friend Requests</h3>
                            <div className="space-y-4">
                                {friendRequests.map(req => (
                                    <div key={req.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3" onClick={() => handleViewProfile(req)}>
                                            <img src={req.avatar} className="w-10 h-10 rounded-full object-cover" />
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-900">{req.name} {req.flag}</h4>
                                                <p className="text-xs text-gray-500">Level {req.level}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleDeclineFriend(req.id)} className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200"><CloseIcon size={16} /></button>
                                            <button onClick={() => handleAcceptFriend(req)} className="p-2 bg-sky-600 rounded-full text-white shadow-sm hover:bg-sky-700"><Check size={16} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Friends List */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 min-h-[200px]">
                         <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2"><Users size={16} className="text-sky-500" /> My Friends ({friends.length})</h3>
                         {friends.length === 0 ? (
                             <div className="text-center py-8 text-gray-400">
                                 <p className="text-sm">No friends yet. Start talking to people!</p>
                             </div>
                         ) : (
                             <div className="space-y-4">
                                {friends.map(friend => (
                                    <div key={friend.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3" onClick={() => handleViewProfile(friend)}>
                                            <div className="relative">
                                                <img src={friend.avatar} className="w-10 h-10 rounded-full object-cover" />
                                                <div className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-900">{friend.name} {friend.flag}</h4>
                                                <p className="text-xs text-gray-500">{friend.status === 'online' ? 'Online' : 'Offline'}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleMessageFriend(friend)} className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"><MessageCircle size={18} /></button>
                                            <button onClick={() => handleCallFriend(friend)} className="p-2 bg-green-50 rounded-full text-green-600 hover:bg-green-100 border border-green-100"><PhoneCall size={18} /></button>
                                        </div>
                                    </div>
                                ))}
                             </div>
                         )}
                    </div>
                </div>
              )}
          </div>
      </div>
  );

  return (
    <div className={`font-sans antialiased max-w-md mx-auto shadow-2xl min-h-screen overflow-hidden relative ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      {view === 'home' && <HomeView />}
      {view === 'call' && (
        <CallScreen 
            partner={callSettings.partner}
            isVideoEnabled={callSettings.isVideo}
            onEndCall={(points: number, partner: any) => { 
                if (partner) {
                    setLastCallPartner(partner);
                    setLastSessionType('call');
                    setView('feedback');
                } else {
                    setView('home');
                }
            }} 
            onStartChat={(partner: any) => { 
                setCurrentChat(partner); 
                setView('chat'); 
            }}
            onLike={(id: any) => handleLikeUser(id)}
        />
      )}
      {view === 'feedback' && (
        <CallFeedbackScreen 
            onHome={() => setView('home')} 
            partner={lastCallPartner}
            onAddFriend={() => handleSendFriendRequest(lastCallPartner)}
            isFriend={friends.some(f => f.id === lastCallPartner?.id)}
            sessionType={lastSessionType}
        />
      )}
      {view === 'chat' && (
        <ChatDetailScreen 
            chat={currentChat} 
            onBack={() => {
                setLastCallPartner(currentChat);
                setLastSessionType('chat');
                setView('feedback');
            }} 
            onAddFriend={() => handleSendFriendRequest(currentChat)}
            isFriend={friends.some(f => f.id === currentChat?.id)}
            onVideoCall={() => handleVideoCall(currentChat)}
        />
      )}
      {view === 'ai' && <AiPracticeScreen onBack={() => setView('home')} />}
      
      {view === 'public_profile' && viewingUser && (
          <PublicProfileScreen 
              user={viewingUser}
              onBack={() => setView('home')} 
              onAddFriend={() => handleSendFriendRequest(viewingUser)}
              onMessage={() => handleMessageFriend(viewingUser)}
              onAcceptRequest={() => handleAcceptFriend(viewingUser)}
              friendStatus={getFriendStatus(viewingUser)}
              onLike={(id: any) => handleLikeUser(id)}
          />
      )}

      {view === 'profile' && !editField && (
          <ProfileScreen 
              userProfile={userProfile} 
              onEdit={setEditField} 
              onUpdateProfile={updateProfileField} 
              onPrivacy={() => setView('privacy_settings')}
          />
      )}

      {view === 'privacy_settings' && (
          <PrivacySettingsScreen 
              privacySettings={userProfile.privacy}
              onUpdate={handlePrivacyUpdate}
              onBack={() => setView('profile')}
          />
      )}

      {view === 'vocab_list' && <VocabularyListScreen onBack={() => setView('learn')} />}
      {view === 'grammar_list' && <GrammarListScreen onBack={() => setView('learn')} />}
      
      {editField === 'englishLevel' && (
          <LevelSelectionScreen 
              onSelect={handleSelection}
              onBack={() => setEditField(null)}
          />
      )}
      
      {editField === 'interests' && (
          <InterestSelectionScreen 
              currentInterests={userProfile.interests ? userProfile.interests.split(', ') : []}
              onSelect={(selected: string) => {
                  let current = userProfile.interests ? userProfile.interests.split(', ') : [];
                  if (current.includes(selected)) {
                      current = current.filter((i: string) => i !== selected);
                  } else {
                      current.push(selected);
                  }
                  handleSelection(current.join(', '));
              }}
              onBack={() => setEditField(null)}
          />
      )}

      {editField === 'profession' && (
          <ProfessionSelectionScreen
              onSelect={handleSelection}
              onBack={() => setEditField(null)}
          />
      )}
      
      {editField === 'languages' && (
          <MultiSelectionScreen 
              title="Spoken Languages"
              options={PROFILE_OPTIONS.languages}
              selectedValues={userProfile.languages ? userProfile.languages.split(', ') : []}
              onToggle={(value: string) => handleSelection(value)}
              onBack={() => setEditField(null)}
          />
      )}

      {editField && !['englishLevel', 'interests', 'profession', 'languages'].includes(editField) && (
          <SelectionScreen 
              title={editField} 
              options={PROFILE_OPTIONS[editField] || []} 
              onSelect={handleSelection}
              onBack={() => setEditField(null)}
          />
      )}
      
      {view === 'learn' && <LearnView />}
      {view === 'social' && <SocialView />}
      {view !== 'call' && view !== 'ai' && view !== 'chat' && view !== 'feedback' && !editField && view !== 'public_profile' && view !== 'privacy_settings' && view !== 'vocab_list' && view !== 'grammar_list' && <BottomNav />}
    </div>
  );
}