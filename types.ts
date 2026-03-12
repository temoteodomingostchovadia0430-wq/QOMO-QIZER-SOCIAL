
export interface Theme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  text: string;
  isSpecial?: boolean;
}

export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio?: string;
  followersCount?: number;
  followingCount?: number;
  isVerified?: boolean;
  isCreator?: boolean;
  isEncrypted?: boolean;
  isGhostMode?: boolean;
  isOnline?: boolean;
  securityLevel?: number;
  birthday?: string;
  joinedAt?: string;
  loginStreak?: number;
  lastLogin?: string;
  points?: number;
  balance?: number;
  investedAmount?: number;
  dailyEarnings?: number;
  videosWatchedToday?: number;
  referralCount?: number;
  referralCode?: string;
  referralBonus?: number;
  postsCount?: number;
  themeId?: string;
  socialLinks?: {
    whatsapp?: string;
    youtube?: string;
    facebook?: string;
    tiktok?: string;
  };
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: string;
}

export interface Post {
  id: string;
  user: User;
  title?: string;
  content: string;
  hashtag?: string;
  image?: string;
  video?: string;
  likes: number;
  views: number;
  comments: Comment[];
  timestamp: string;
  aiGenerated?: boolean;
  isCampaign?: boolean;
  isDedication?: boolean;
  isSnap?: boolean;
  isAd?: boolean;
  adStartDate?: string;
  expiresAt?: number;
  status?: 'active' | 'deleted' | 'flagged';
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  cover: string;
  duration: string;
  genre: string;
  isDownloaded?: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  image: string;
  source: string;
  time: string;
  summary?: string;
}

export interface Match {
  id: string;
  teamA: string;
  teamB: string;
  scoreA?: number;
  scoreB?: number;
  status: 'live' | 'finished' | 'scheduled';
  league: string;
  time: string;
}

export interface FriendRequest {
  id: string;
  user: User;
  timestamp: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface MobileOperator {
  name: string;
  color: string;
  icon: string;
  desc: string;
  prefix: string[];
}

export interface MediaItem {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  provider: string;
  rating?: string;
}

export interface NexusFile {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
}

export interface Album {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  itemsCount: number;
  type: 'photo' | 'video' | 'mixed';
}

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  color: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  avatar: string;
  membersCount: number;
  isPrivate: boolean;
  adminId: string;
  category: string;
}

export enum AppTab {
  FEED = 'feed',
  VIDEOS = 'videos',
  PAY = 'pay',
  GLOBAL_TRANSFER = 'global_transfer',
  CREATIVE = 'creative',
  DOCS = 'docs',
  PROFILE = 'profile',
  MESSAGES = 'messages',
  NOTIFICATIONS = 'notifications',
  VIDEO_CALL = 'video_call',
  ENTERTAINMENT = 'entertainment',
  SETTINGS = 'settings',
  RECYCLE_BIN = 'recycle_bin',
  CAMPAIGNS = 'campaigns',
  SUPPORT = 'support',
  SECURITY_HUB = 'security_hub',
  PLANNER = 'planner',
  COMMUNITIES = 'communities',
  SNAP = 'snap',
  VIDEO_HUB = 'video_hub',
  SERVICES = 'services',
  MERCHANT = 'merchant',
  HEALTH_HUB = 'health_hub',
  FILE_EXPLORER = 'file_explorer',
  ALBUM_STUDIO = 'album_studio',
  AD_MANAGER = 'ad_manager',
  LIVE_STUDIO = 'live_studio',
  CHANNEL_MANAGER = 'channel_manager',
  STATISTICS = 'statistics',
  NOTES = 'notes',
  MUSIC_HUB = 'music_hub',
  FRIENDS = 'friends',
  NEWS = 'news',
  SPORTS = 'sports',
  DRAMA_BOX = 'drama_box',
  ESSENTIALS = 'essentials',
  INTERNET_HUB = 'internet_hub',
  CHAT = 'chat',
  REFERRALS = 'referrals',
  NOTIFICATION_SETTINGS = 'notification_settings',
  REWARDS = 'rewards'
}
