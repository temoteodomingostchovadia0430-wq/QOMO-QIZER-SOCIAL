
import { Post, User, Theme } from './types';

export const APP_THEMES: Theme[] = [
  { id: 'emerald', name: 'Esmeralda Nexus', primary: '#10b981', secondary: '#059669', accent: '#34d399', bg: '#f8fafc', text: '#0f172a' },
  { id: 'ocean', name: 'Oceano Profundo', primary: '#0ea5e9', secondary: '#0284c7', accent: '#38bdf8', bg: '#f0f9ff', text: '#0c4a6e' },
  { id: 'sunset', name: 'Pôr do Sol', primary: '#f59e0b', secondary: '#d97706', accent: '#fbbf24', bg: '#fffbeb', text: '#78350f' },
  { id: 'royal', name: 'Real Púrpura', primary: '#8b5cf6', secondary: '#7c3aed', accent: '#a78bfa', bg: '#f5f3ff', text: '#4c1d95' },
  { id: 'rose', name: 'Rosa Quartzo', primary: '#f43f5e', secondary: '#e11d48', accent: '#fb7185', bg: '#fff1f2', text: '#881337' },
  { id: 'midnight', name: 'Meia Noite', primary: '#1e293b', secondary: '#0f172a', accent: '#334155', bg: '#020617', text: '#f8fafc', isSpecial: true },
  { id: 'gold', name: 'Ouro Supremo', primary: '#fbbf24', secondary: '#d97706', accent: '#fef3c7', bg: '#fffcf0', text: '#451a03', isSpecial: true },
  { id: 'neon', name: 'Cyber Neon', primary: '#00ff00', secondary: '#00cc00', accent: '#33ff33', bg: '#000000', text: '#ffffff', isSpecial: true },
  { id: 'lava', name: 'Lava Vulcânica', primary: '#ef4444', secondary: '#dc2626', accent: '#f87171', bg: '#450a0a', text: '#fef2f2', isSpecial: true },
  { id: 'forest', name: 'Floresta Amazônica', primary: '#166534', secondary: '#14532d', accent: '#22c55e', bg: '#f0fdf4', text: '#064e3b' },
  { id: 'sky', name: 'Céu Limpo', primary: '#60a5fa', secondary: '#3b82f6', accent: '#93c5fd', bg: '#eff6ff', text: '#1e3a8a' },
  { id: 'slate', name: 'Ardósia Moderna', primary: '#475569', secondary: '#334155', accent: '#64748b', bg: '#f1f5f9', text: '#0f172a' },
  { id: 'amber', name: 'Âmbar Quente', primary: '#d97706', secondary: '#b45309', accent: '#f59e0b', bg: '#fff7ed', text: '#7c2d12' },
  { id: 'teal', name: 'Teal Elegante', primary: '#0d9488', secondary: '#0f766e', accent: '#2dd4bf', bg: '#f0fdfa', text: '#134e4a' },
  { id: 'indigo', name: 'Índigo Noite', primary: '#4f46e5', secondary: '#4338ca', accent: '#6366f1', bg: '#eef2ff', text: '#312e81' },
  { id: 'violet', name: 'Violeta Elétrico', primary: '#7c3aed', secondary: '#6d28d9', accent: '#8b5cf6', bg: '#f5f3ff', text: '#4c1d95' },
  { id: 'fuchsia', name: 'Fúcsia Vibrante', primary: '#c026d3', secondary: '#a21caf', accent: '#d946ef', bg: '#fdf4ff', text: '#701a75' },
  { id: 'pink', name: 'Pink Doce', primary: '#db2777', secondary: '#be185d', accent: '#ec4899', bg: '#fdf2f8', text: '#831843' },
  { id: 'orange', name: 'Laranja Energético', primary: '#ea580c', secondary: '#c2410c', accent: '#f97316', bg: '#fff7ed', text: '#7c2d12' },
  { id: 'lime', name: 'Lima Fresca', primary: '#65a30d', secondary: '#4d7c0f', accent: '#84cc16', bg: '#f7fee7', text: '#365314' }
];

export const CURRENT_USER: User = {
  id: 'u-001',
  name: 'Master Node QOMO QIZER',
  handle: '@master_node_001',
  avatar: 'https://picsum.photos/seed/nexus_master/150/150',
  bio: 'Controlando o fluxo quântico de comissões e megabytes. Identidade invisível, ganhos reais. 🌌',
  followersCount: 5800,
  followingCount: 1200,
  isVerified: true,
  isCreator: true,
  birthday: '1990-01-01',
  joinedAt: '2024-01-01',
  loginStreak: 365,
  points: 150000,
  balance: 4250.75,
  investedAmount: 10000,
  dailyEarnings: 850,
  videosWatchedToday: 0,
  referralCount: 1245,
  referralCode: 'NEX-MASTER-875',
  referralBonus: 12500,
  postsCount: 150,
  themeId: 'emerald'
};

export const MOCK_USERS: Record<string, User> = {
  'u-001': CURRENT_USER,
  'u-002': {
    id: 'u-002',
    name: 'Sarah Chen',
    handle: '@schen_tech',
    avatar: 'https://picsum.photos/seed/sarah/150/150',
    bio: 'Building the future with Gemini. Software Architect @ Google. Coffee and Code.',
    followersCount: 8500,
    followingCount: 120
  },
  'u-003': {
    id: 'u-003',
    name: 'Jordan Smith',
    handle: '@jsmith_design',
    avatar: 'https://picsum.photos/seed/jordan/150/150',
    bio: 'Product Designer focused on human-AI interaction. Minimalism lover.',
    followersCount: 3200,
    followingCount: 890
  },
  'u-004': {
    id: 'u-004',
    name: 'Elena Gomez',
    handle: '@elena_g',
    avatar: 'https://picsum.photos/seed/elena/150/150',
    bio: 'Travel blogger & Photographer. Capturing the world one frame at a time. 📸✈️',
    followersCount: 15000,
    followingCount: 300,
    isOnline: true
  },
  'u-005': {
    id: 'u-005',
    name: 'Marcus Thorne',
    handle: '@mthorne_fitness',
    avatar: 'https://picsum.photos/seed/marcus/150/150',
    bio: 'Fitness Coach | Nutritionist | Helping you reach your peak performance. 💪',
    followersCount: 50000,
    followingCount: 150,
    isOnline: true
  }
};

export const MOCK_POSTS: Post[] = [
  {
    id: 'p-1',
    user: MOCK_USERS['u-002'],
    content: 'Just finished deploying the new Gemini-powered recommendation engine. The latency is incredible! 🚀 #AI #TechLife',
    image: 'https://picsum.photos/seed/post1/800/600',
    likes: 42,
    views: 1250,
    comments: [],
    timestamp: '2h ago'
  },
  {
    id: 'p-4',
    user: MOCK_USERS['u-004'],
    content: 'Sunset in Santorini is something everyone should experience at least once. Pure magic. ✨🌅',
    image: 'https://picsum.photos/seed/santorini/800/600',
    likes: 2500,
    views: 12000,
    comments: [
      { id: 'c-2', userId: 'u-003', userName: 'Jordan Smith', content: 'Stunning shot, Elena!', timestamp: '30m ago' }
    ],
    timestamp: '1h ago'
  },
  {
    id: 'p-5',
    user: MOCK_USERS['u-005'],
    content: 'Consistency is key. 5 AM workout done! Who else is grinding today? 🏋️‍♂️🔥',
    likes: 890,
    views: 5600,
    comments: [],
    timestamp: '3h ago'
  },
  {
    id: 'p-2',
    user: MOCK_USERS['u-003'],
    content: 'The future of social media isn\'t just about connection, it\'s about augmentation. AI helping us express ourselves better.',
    likes: 128,
    views: 3400,
    comments: [
      { id: 'c-1', userId: 'u-001', userName: 'Alex Rivers', content: 'Couldn\'t agree more!', timestamp: '1h ago' }
    ],
    timestamp: '4h ago'
  },
  {
    id: 'p-ad-1',
    user: {
      id: 'u-nexus',
      name: 'QOMO QIZER Ads',
      handle: '@nexpay_ads',
      avatar: 'https://picsum.photos/seed/nexus/150/150'
    },
    title: 'Nexus Super App Launch',
    content: 'Transforme sua vida financeira e social com o QOMO QIZER. O futuro é agora! 🚀',
    image: 'https://picsum.photos/seed/ad/800/600',
    likes: 15000,
    views: 100000,
    comments: [],
    timestamp: 'Sponsored',
    isAd: true,
    adStartDate: '2025-03-09'
  }
];

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  cover: string;
  duration: string;
  genre: string;
}

export const MOCK_TRACKS: MusicTrack[] = [
  { id: 't1', title: 'Quantum Harmony', artist: 'Nexus AI', cover: 'https://picsum.photos/seed/music1/400/400', duration: '3:45', genre: 'Ambient' },
  { id: 't2', title: 'Midnight Pulse', artist: 'Cyber Ghost', cover: 'https://picsum.photos/seed/music2/400/400', duration: '4:12', genre: 'Synthwave' },
  { id: 't3', title: 'Maputo Sunrise', artist: 'Afro-Nexus', cover: 'https://picsum.photos/seed/music3/400/400', duration: '5:01', genre: 'Afrobeat' },
  { id: 't4', title: 'Digital Rain', artist: 'Lofi Bot', cover: 'https://picsum.photos/seed/music4/400/400', duration: '2:50', genre: 'Lofi' },
];

export interface Video {
  id: number;
  title: string;
  views: string;
  duration: string;
  thumbnail: string;
  provider: string;
}

export const MOCK_VIDEOS: Video[] = [
  { id: 1, title: 'O Último Quantum', views: '1.2M', duration: '2:15:00', thumbnail: 'https://picsum.photos/seed/v1/400/225', provider: 'Netflix' },
  { id: 2, title: 'Drama Box: Segredos de Maputo', views: '850K', duration: '45:00', thumbnail: 'https://picsum.photos/seed/v2/400/225', provider: 'DramaBox' },
  { id: 3, title: 'Live: Moçambola 2026', views: '45K', duration: 'LIVE', thumbnail: 'https://picsum.photos/seed/v3/400/225', provider: 'Sports TV' },
  { id: 4, title: 'NEXPAY Documentário', views: '120K', duration: '12:30', thumbnail: 'https://picsum.photos/seed/v4/400/225', provider: 'NEXPAY' },
];
