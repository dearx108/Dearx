
export enum ScreenState {
  SPLASH = 'SPLASH',
  ONBOARDING = 'ONBOARDING',
  LOGIN = 'LOGIN',
  APP_CONTAINER = 'APP_CONTAINER', // Main app wrapper
  MATCHING = 'MATCHING',
  INCOMING_CALL = 'INCOMING_CALL',
  CALL = 'CALL',
  CHAT_DETAIL = 'CHAT_DETAIL',
  AI_PRACTICE = 'AI_PRACTICE'
}

export type AppView = 'home' | 'learn' | 'social' | 'profile' | 'chat' | 'feedback' | 'ai' | 'public_profile' | 'privacy_settings' | 'call' | 'grammar_list' | 'vocab_list';

export type PrivacyLevel = 'everyone' | 'friends' | 'nobody';

export interface UserPrivacy {
  onlineStatus: PrivacyLevel;
  friendsList: PrivacyLevel;
  profileDetails: PrivacyLevel;
}

export interface User {
  id: string | number;
  name: string;
  location: string;
  interests: string[];
  avatarUrl: string;
  isVerified?: boolean;
  level: number;
  flag: string;
  isAI?: boolean;
  bio?: string;
  status?: 'online' | 'busy' | 'offline';
  languages?: string[];
  goal?: string;
  xp?: number;
  privacy?: UserPrivacy;
  likes?: number; // Added likes count
}

export interface LessonCategory {
  id: number;
  title: string;
  icon: string;
  progress: number;
  total: number;
  color: string;
}

export interface DailyTask {
  id: number;
  title: string;
  reward: number;
  completed: boolean;
}
