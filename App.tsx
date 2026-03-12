
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppTab, Post, User } from './types';
import { MOCK_POSTS, CURRENT_USER, MOCK_USERS, MOCK_TRACKS, MOCK_VIDEOS } from './constants';
import { firestoreService } from './services/firestoreService';
import PostCard from './components/PostCard';
import CreatePost from './components/CreatePost';
import UserProfile from './components/UserProfile';
import CreativeStudio from './components/CreativeStudio';
import NexusPay from './components/NexusPay';
import GlobalTransfer from './components/GlobalTransfer';
import VideoCall from './components/VideoCall';
import EntertainmentHub from './components/EntertainmentHub';
import Navigation from './components/Navigation';
import AIAssistant from './components/AIAssistant';
import MessagesModule from './components/MessagesModule';
import SettingsModule from './components/SettingsModule';
import NotificationsModule from './components/NotificationsModule';
import SecurityHub from './components/SecurityHub';
import PlannerModule from './components/PlannerModule';
import CommunitiesModule from './components/CommunitiesModule';
import HealthHub from './components/HealthHub';
import FileExplorer from './components/FileExplorer';
import AlbumStudio from './components/AlbumStudio';
import AdManager from './components/AdManager';
import LiveStudio from './components/LiveStudio';
import ChannelManager from './components/ChannelManager';
import StatisticsHub from './components/StatisticsHub';
import NotesModule from './components/NotesModule';
import MusicHub from './components/MusicHub';
import FriendsModule from './components/FriendsModule';
import NewsModule from './components/NewsModule';
import SportsModule from './components/SportsModule';
import DramaBox from './components/DramaBox';
import ServicesModule from './components/ServicesModule';
import SupportModule from './components/SupportModule';
import MerchantModule from './components/MerchantModule';
import VideoHub from './components/VideoHub';
import AgeVerification from './components/AgeVerification';
import WelcomeIntro from './components/WelcomeIntro';
import CelebrationManager from './components/CelebrationManager';
import VerificationModal from './components/VerificationModal';
import AudioAdPlayer from './components/AudioAdPlayer';
import ReferralHub from './components/ReferralHub';
import NotificationSettings from './components/NotificationSettings';
import RewardModule from './components/RewardModule';
import { TRANSLATIONS, Language } from './translations';
import { 
  Zap, Bell, X, Activity, Bluetooth, Share2, 
  LayoutGrid, Globe, CreditCard, ShoppingCart, 
  FileText, FileSpreadsheet, FileArchive, Languages,
  ChevronRight, Laptop, Smartphone, Search, Menu, Sun, Moon,
  LifeBuoy, PlayCircle, Tv, TrendingUp, Music, User as UserIcon,
  Film, Trophy, PlaySquare, Radio, SlidersHorizontal,
  HardDrive, MessageSquare, RefreshCw, Loader2, Bot,
  UserPlus, Users, Image, Home, UserCircle, MessageCircle,
  Palette, Play, CheckCircle2, Plus, Gift, Hash, Megaphone, UserCheck
} from 'lucide-react';
import { APP_THEMES } from './constants';

import { notificationService } from './services/notificationService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.FEED);
  const [feedFilter, setFeedFilter] = useState<'all' | 'creator' | 'hashtag' | 'sponsored'>('all');
  const [currentUser, setCurrentUser] = useState<User>({ ...CURRENT_USER, isOnline: true });
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS.map(p => ({ ...p, views: Math.floor(Math.random() * 5000) })));
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [lastPostId, setLastPostId] = useState<string | undefined>(undefined);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isHubOpen, setIsHubOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    return (localStorage.getItem('nexus_theme') as any) || 'system';
  });
  const darkMode = useMemo(() => {
    if (theme === 'dark') return true;
    if (theme === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }, [theme]);
  const [eyeHealth, setEyeHealth] = useState(false);
  const [isAgeVerified, setIsAgeVerified] = useState(() => {
    return localStorage.getItem('nexpay_age_verified') === 'true';
  });
  const [showWelcome, setShowWelcome] = useState(() => {
    return localStorage.getItem('nexpay_welcome_seen') !== 'true';
  });
  const [currentThemeId, setCurrentThemeId] = useState(() => {
    return localStorage.getItem('nexus_custom_theme') || 'emerald';
  });
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('nexus_language') as Language) || 'pt';
  });
  const observerTarget = useRef<HTMLDivElement>(null);

  const t = useMemo(() => TRANSLATIONS[language], [language]);

  useEffect(() => {
    localStorage.setItem('nexus_language', language);
  }, [language]);

  const handleAudioAdReward = (reward: number) => {
    setCurrentUser(prev => ({
      ...prev,
      balance: (prev.balance || 0) + reward,
      dailyEarnings: (prev.dailyEarnings || 0) + reward
    }));
  };

  // Fetch posts from Firestore
  useEffect(() => {
    const fetchInitialPosts = async () => {
      try {
        const dbPosts = await firestoreService.getPosts(10);
        if (dbPosts.length > 0) {
          setPosts(dbPosts);
          setLastPostId(dbPosts[dbPosts.length - 1].id);
          setHasMore(dbPosts.length === 10);
        }
      } catch (error) {
        console.error("Error fetching posts from Firestore:", error);
      }
    };

    const syncUser = async () => {
      try {
        await firestoreService.saveUser(currentUser);
      } catch (error) {
        console.error("Error syncing user to Firestore:", error);
      }
    };

    fetchInitialPosts();
    syncUser();
  }, []);

  const loadMorePosts = async () => {
    if (isLoadingMore || !hasMore || !lastPostId) return;
    
    setIsLoadingMore(true);
    try {
      const morePosts = await firestoreService.getPosts(10, lastPostId);
      if (morePosts.length > 0) {
        setPosts(prev => [...prev, ...morePosts]);
        setLastPostId(morePosts[morePosts.length - 1].id);
        setHasMore(morePosts.length === 10);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more posts:", error);
      setHasMore(false);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore && activeTab === AppTab.FEED) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, lastPostId, activeTab]);

  // Pull to Refresh State
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const touchStartRef = useRef<number>(0);
  const isPullingRef = useRef<boolean>(false);

  const currentTheme = useMemo(() => {
    return APP_THEMES.find(t => t.id === currentThemeId) || APP_THEMES[0];
  }, [currentThemeId]);

  useEffect(() => {
    localStorage.setItem('nexus_custom_theme', currentThemeId);
    // Aplicar cores do tema como variáveis CSS
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', currentTheme.primary);
    root.style.setProperty('--theme-secondary', currentTheme.secondary);
    root.style.setProperty('--theme-accent', currentTheme.accent);
    root.style.setProperty('--theme-bg', currentTheme.bg);
    root.style.setProperty('--theme-text', currentTheme.text);
  }, [currentThemeId, currentTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        // Forçar re-renderização se o tema for sistema
        setTheme('system'); 
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('nexus_theme', theme);
  }, [darkMode, theme]);

  useEffect(() => {
    // Simular uma menção após 10 segundos para demonstrar o sistema
    const timer = setTimeout(() => {
      if (document.visibilityState === 'hidden') {
        notificationService.notify('Você foi mencionado!', {
          body: 'Sarah Chen mencionou você em um novo post sobre IA.',
          type: 'mentions'
        });
      }
    }, 10000);

    // Simular amigo online após 20 segundos
    const onlineTimer = setTimeout(() => {
      if (document.visibilityState === 'hidden') {
        notificationService.notify('Amigo Online', {
          body: 'Jordan Smith acabou de entrar online. Diga olá!',
          type: 'follow' // Usando follow como fallback para social
        });
      }
    }, 20000);

    return () => {
      clearTimeout(timer);
      clearTimeout(onlineTimer);
    };
  }, []);

  const handleTabChange = (tab: AppTab) => {
    if (tab === AppTab.PROFILE && !selectedUser) setSelectedUser(currentUser);
    else if (tab !== AppTab.PROFILE) setSelectedUser(null);
    setActiveTab(tab);
    setIsHubOpen(false);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setHasMore(true);
    try {
      const dbPosts = await firestoreService.getPosts(10);
      if (dbPosts.length > 0) {
        setPosts(dbPosts);
        setLastPostId(dbPosts[dbPosts.length - 1].id);
        setHasMore(dbPosts.length === 10);
      } else {
        // Fallback to mock shuffle if DB is empty
        setPosts(prev => [...prev].sort(() => Math.random() - 0.5));
      }
    } catch (error) {
      console.error("Error refreshing posts:", error);
      setPosts(prev => [...prev].sort(() => Math.random() - 0.5));
    }
    setIsRefreshing(false);
    setPullDistance(0);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0 && activeTab === AppTab.FEED) {
      touchStartRef.current = e.touches[0].clientY;
      isPullingRef.current = true;
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isPullingRef.current) return;
    const currentY = e.touches[0].clientY;
    const distance = currentY - touchStartRef.current;
    
    if (distance > 0 && window.scrollY === 0) {
      // Adiciona resistência
      const easedDistance = Math.min(distance * 0.4, 100);
      setPullDistance(easedDistance);
      if (easedDistance > 70) {
        // Haptic feedback simulation could go here
      }
    }
  };

  const onTouchEnd = () => {
    if (pullDistance > 70) {
      handleRefresh();
    } else {
      setPullDistance(0);
    }
    isPullingRef.current = false;
  };

  const filteredPosts = useMemo(() => {
    let result = posts;
    
    // Apply search term
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      result = result.filter(post => 
        post.content.toLowerCase().includes(query) ||
        (post.title && post.title.toLowerCase().includes(query)) ||
        post.user.name.toLowerCase().includes(query) ||
        post.user.handle.toLowerCase().includes(query) ||
        (post.hashtag && post.hashtag.toLowerCase().includes(query))
      );
    }

    // Apply feed filter
    if (feedFilter === 'creator') {
      result = result.filter(post => post.user.isCreator);
    } else if (feedFilter === 'hashtag') {
      result = result.filter(post => !!post.hashtag || post.content.includes('#'));
    } else if (feedFilter === 'sponsored') {
      result = result.filter(post => post.isAd);
    }

    return result;
  }, [posts, searchTerm, feedFilter]);

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return null;
    const query = searchTerm.toLowerCase();
    
    return {
      users: Object.values(MOCK_USERS).filter(u => 
        u.name.toLowerCase().includes(query) || 
        u.handle.toLowerCase().includes(query)
      ),
      tracks: MOCK_TRACKS.filter(t => 
        t.title.toLowerCase().includes(query) || 
        t.artist.toLowerCase().includes(query) ||
        t.genre.toLowerCase().includes(query)
      ),
      videos: MOCK_VIDEOS.filter(v => 
        v.title.toLowerCase().includes(query) || 
        v.provider.toLowerCase().includes(query)
      )
    };
  }, [searchTerm]);

  const appsList = [
    // Social & Communication
    { id: AppTab.FEED, label: 'Início', icon: Home, color: 'bg-indigo-500' },
    { id: AppTab.PROFILE, label: 'Perfil', icon: UserCircle, color: 'bg-black' },
    { id: AppTab.CHAT, label: 'Mensagens', icon: MessageCircle, color: 'bg-emerald-500' },
    { id: AppTab.MESSAGES, label: 'mensagem', icon: MessageSquare, color: 'bg-black' },
    { id: AppTab.FRIENDS, label: 'Amigos', icon: UserPlus, color: 'bg-emerald-500' },
    { id: AppTab.COMMUNITIES, label: 'Grupos', icon: Users, color: 'bg-indigo-500' },
    { id: AppTab.CHANNEL_MANAGER, label: 'Páginas', icon: LayoutGrid, color: 'bg-slate-600' },
    
    // Finance & Business
    { id: AppTab.PAY, label: 'NexusPay', icon: CreditCard, color: 'bg-emerald-600' },
    { id: AppTab.MERCHANT, label: 'Vendas+', icon: ShoppingCart, color: 'bg-emerald-700' },
    { id: AppTab.AD_MANAGER, label: 'Anúncios', icon: TrendingUp, color: 'bg-orange-500' },
    { id: AppTab.REFERRALS, label: 'Indicações', icon: Gift, color: 'bg-amber-500' },
    
    // Entertainment & Media
    { id: AppTab.ENTERTAINMENT, label: 'TV Box', icon: Tv, color: 'bg-rose-600' },
    { id: AppTab.DRAMA_BOX, label: 'DramaBox', icon: PlaySquare, color: 'bg-amber-500' },
    { id: AppTab.VIDEO_HUB, label: 'Vídeos', icon: PlayCircle, color: 'bg-rose-500' },
    { id: AppTab.MUSIC_HUB, label: 'Música', icon: Radio, color: 'bg-rose-500' },
    { id: AppTab.ALBUM_STUDIO, label: 'Álbuns', icon: Image, color: 'bg-blue-500' },
    
    // Utilities & Info
    { id: AppTab.SERVICES, label: 'Utilidades', icon: Zap, color: 'bg-emerald-500' },
    { id: AppTab.FILE_EXPLORER, label: 'Drive', icon: HardDrive, color: 'bg-slate-700' },
    { id: AppTab.HEALTH_HUB, label: 'Saúde', icon: Activity, color: 'bg-emerald-600' },
    { id: AppTab.NEWS, label: 'Notícias', icon: Globe, color: 'bg-blue-600' },
    { id: AppTab.SPORTS, label: 'Futebol', icon: Trophy, color: 'bg-emerald-800' },
    { id: AppTab.STATISTICS, label: 'Estatísticas', icon: TrendingUp, color: 'bg-indigo-600' },
    { id: AppTab.SETTINGS, label: 'Definições', icon: Menu, color: 'bg-slate-500' },
  ];

  const renderContent = () => {
    if (activeTab === AppTab.VIDEO_CALL) return <VideoCall onEndCall={() => handleTabChange(AppTab.FEED)} />;
    
    switch (activeTab) {
      case AppTab.PAY: return <NexusPay />;
      case AppTab.GLOBAL_TRANSFER: return <GlobalTransfer />;
      case AppTab.SERVICES: return <ServicesModule />;
      case AppTab.MERCHANT: return <MerchantModule />;
      case AppTab.ENTERTAINMENT: return <EntertainmentHub />;
      case AppTab.HEALTH_HUB: return <HealthHub />;
      case AppTab.FILE_EXPLORER: return <FileExplorer />;
      case AppTab.MESSAGES: return <AIAssistant />;
      case AppTab.CHAT: return <MessagesModule />;
      case AppTab.NOTIFICATIONS: return <NotificationsModule />;
      case AppTab.SECURITY_HUB: return <SecurityHub />;
      case AppTab.SETTINGS: 
        return (
          <div className="flex-1 flex flex-col">
            <div className="max-w-4xl mx-auto w-full p-8 space-y-8">
               <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl">
                  <h3 className="text-xl font-black uppercase italic tracking-tighter mb-6 flex items-center gap-2">
                     <Palette className="w-6 h-6 text-emerald-500" /> Personalização de Cores (20 Modos)
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                     {APP_THEMES.map(theme => (
                       <button 
                        key={theme.id}
                        onClick={() => setCurrentThemeId(theme.id)}
                        className={`group relative flex flex-col items-center gap-2 p-4 rounded-3xl border-2 transition-all ${currentThemeId === theme.id ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10' : 'border-slate-100 dark:border-slate-800 hover:border-emerald-300'}`}
                       >
                          <div className="w-10 h-10 rounded-2xl shadow-lg flex items-center justify-center text-white" style={{ backgroundColor: theme.primary }}>
                             {theme.isSpecial && <Zap className="w-5 h-5 fill-current" />}
                          </div>
                          <span className="text-[8px] font-black uppercase text-center leading-tight">{theme.name}</span>
                          {currentThemeId === theme.id && (
                            <div className="absolute -top-2 -right-2 bg-emerald-500 text-white p-1 rounded-full shadow-lg">
                               <CheckCircle2 className="w-3 h-3" />
                            </div>
                          )}
                       </button>
                     ))}
                  </div>
               </div>
            </div>
            <SettingsModule 
              currentUser={currentUser} 
              onVerify={() => setIsVerificationModalOpen(true)} 
              onSupport={() => handleTabChange(AppTab.SUPPORT)}
              onTabChange={handleTabChange}
            />
          </div>
        );
      case AppTab.SUPPORT: return <SupportModule />;
      case AppTab.NEWS: return <NewsModule />;
      case AppTab.SPORTS: return <SportsModule />;
      case AppTab.DRAMA_BOX: return <DramaBox />;
      case AppTab.MUSIC_HUB: return <MusicHub />;
      case AppTab.REFERRALS: return <ReferralHub user={currentUser} onUpdateUser={setCurrentUser} />;
      case AppTab.REWARDS: return <RewardModule />;
      case AppTab.NOTIFICATION_SETTINGS: return <NotificationSettings onBack={() => handleTabChange(AppTab.SETTINGS)} />;
      case AppTab.FRIENDS: return <FriendsModule onUserClick={setSelectedUser} />;
      case AppTab.CREATIVE: return <CreativeStudio />;
      case AppTab.VIDEO_HUB: return <VideoHub />;
      case AppTab.ALBUM_STUDIO: return <AlbumStudio />;
      case AppTab.AD_MANAGER: return <AdManager />;
      case AppTab.STATISTICS: return <StatisticsHub />;
      case AppTab.COMMUNITIES: return <CommunitiesModule />;
      case AppTab.CHANNEL_MANAGER: return <ChannelManager />;
      case AppTab.PROFILE:
        return selectedUser ? (
          <UserProfile 
            user={selectedUser} 
            posts={posts} 
            onBack={() => handleTabChange(AppTab.FEED)} 
            darkMode={darkMode}
            setDarkMode={() => {}} 
            eyeHealth={eyeHealth} 
            setEyeHealth={setEyeHealth} 
            onTabChange={handleTabChange}
          />
        ) : null;
      case AppTab.FEED:
      default:
        return (
          <main 
            className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 flex flex-col gap-4 relative"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Pull to Refresh Indicator */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center transition-all duration-200 z-[60]"
              style={{ 
                top: `${pullDistance}px`, 
                opacity: pullDistance > 20 ? 1 : 0,
                transform: `translateX(-50%) translateY(${isRefreshing ? '20px' : '0px'})`
              }}
            >
              <div className="bg-white dark:bg-slate-900 p-3 rounded-full shadow-xl border border-slate-100 dark:border-slate-800">
                <RefreshCw className={`w-5 h-5 text-emerald-500 ${isRefreshing ? 'animate-spin' : ''}`} style={{ transform: `rotate(${pullDistance * 4}deg)` }} />
              </div>
            </div>

            <section 
              className="flex-1 max-w-[680px] mx-auto w-full transition-transform duration-200"
              style={{ transform: `translateY(${pullDistance}px)` }}
            >
              {/* Stories / Status Bar */}
              <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
                 <div className="flex flex-col items-center gap-2 shrink-0">
                    <div className="relative">
                       <img src={currentUser.avatar} className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500 p-0.5 shadow-lg" />
                       <div className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1 border-2 border-white dark:border-slate-900">
                          <Plus className="w-3 h-3" />
                       </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500">Seu Story</span>
                 </div>
                 {Object.values(MOCK_USERS).map((u, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group">
                       <div className="w-16 h-16 rounded-full object-cover border-2 border-slate-200 dark:border-slate-800 p-0.5 group-hover:border-emerald-500 transition-all">
                          <img src={u.avatar} className="w-full h-full rounded-full object-cover" />
                       </div>
                       <span className="text-[10px] font-bold text-slate-500 truncate w-16 text-center">{u.name.split(' ')[0]}</span>
                    </div>
                 ))}
              </div>

              <CreatePost onPostCreated={(p) => setPosts([p, ...posts])} />
              
              {/* Feed Filters */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                <button 
                  onClick={() => setFeedFilter('all')}
                  className={`px-4 py-2 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${feedFilter === 'all' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-white dark:bg-slate-900 text-slate-500 border border-slate-100 dark:border-slate-800'}`}
                >
                  Tudo
                </button>
                <button 
                  onClick={() => setFeedFilter('creator')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${feedFilter === 'creator' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-white dark:bg-slate-900 text-slate-500 border border-slate-100 dark:border-slate-800'}`}
                >
                  <UserCheck className="w-3.5 h-3.5" /> Criadores
                </button>
                <button 
                  onClick={() => setFeedFilter('hashtag')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${feedFilter === 'hashtag' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'bg-white dark:bg-slate-900 text-slate-500 border border-slate-100 dark:border-slate-800'}`}
                >
                  <Hash className="w-3.5 h-3.5" /> Hashtags
                </button>
                <button 
                  onClick={() => setFeedFilter('sponsored')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${feedFilter === 'sponsored' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-white dark:bg-slate-900 text-slate-500 border border-slate-100 dark:border-slate-800'}`}
                >
                  <Megaphone className="w-3.5 h-3.5" /> Patrocinado
                </button>
              </div>
              
              {searchTerm && searchResults && (
                <div className="space-y-6 mb-8 animate-in slide-in-from-top-2 duration-300">
                   {searchResults.users.length > 0 && (
                     <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-2 flex items-center gap-2">
                          <UserIcon className="w-3 h-3" /> Pessoas
                        </h3>
                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                           {searchResults.users.map(u => (
                             <div key={u.id} onClick={() => setSelectedUser(u)} className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group">
                                <img src={u.avatar} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100 dark:ring-slate-800 group-hover:ring-emerald-500 transition-all" />
                                <span className="text-[8px] font-black uppercase text-slate-500 truncate w-12 text-center">{u.name.split(' ')[0]}</span>
                             </div>
                           ))}
                        </div>
                     </div>
                   )}

                   {searchResults.tracks.length > 0 && (
                     <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-2 flex items-center gap-2">
                          <Music className="w-3 h-3" /> Músicas
                        </h3>
                        <div className="space-y-2">
                           {searchResults.tracks.map(t => (
                             <div key={t.id} onClick={() => handleTabChange(AppTab.MUSIC_HUB)} className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer">
                                <img src={t.cover} className="w-10 h-10 rounded-lg object-cover" />
                                <div>
                                   <p className="text-xs font-black text-slate-900 dark:text-white uppercase">{t.title}</p>
                                   <p className="text-[9px] font-bold text-slate-400 uppercase">{t.artist}</p>
                                </div>
                             </div>
                           ))}
                        </div>
                     </div>
                   )}

                   {searchResults.videos.length > 0 && (
                     <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-2 flex items-center gap-2">
                          <Film className="w-3 h-3" /> Vídeos & Filmes
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                           {searchResults.videos.map(v => (
                             <div key={v.id} onClick={() => handleTabChange(AppTab.VIDEO_HUB)} className="group cursor-pointer">
                                <div className="relative aspect-video rounded-xl overflow-hidden mb-1">
                                   <img src={v.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                   <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                      <PlayCircle className="w-6 h-6 text-white" />
                                   </div>
                                </div>
                                <p className="text-[9px] font-black text-slate-900 dark:text-white uppercase truncate">{v.title}</p>
                             </div>
                           ))}
                        </div>
                     </div>
                   )}
                </div>
              )}

              {searchTerm && (
                <div className="mb-6 flex items-center justify-between px-2">
                   <p className="text-xs font-black text-slate-500 uppercase tracking-widest">
                     Posts para: <span className="text-emerald-500">"{searchTerm}"</span>
                   </p>
                   <button onClick={() => setSearchTerm('')} className="text-[10px] font-black text-rose-500 uppercase tracking-widest bg-rose-50 dark:bg-rose-500/10 px-3 py-1 rounded-lg">Limpar</button>
                </div>
              )}

                <div className="flex flex-col gap-6">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                      <PostCard key={post.id} post={post} onUserClick={setSelectedUser} />
                    ))
                  ) : (
                    <div className="py-20 text-center">
                      <Search className="w-8 h-8 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase italic">Nada encontrado</h3>
                    </div>
                  )}
                  
                  {/* Infinite Scroll Sentinel */}
                  <div ref={observerTarget} className="py-8 flex justify-center">
                    {isLoadingMore && (
                      <div className="flex items-center gap-2 text-slate-500 font-black uppercase text-[10px] tracking-widest">
                        <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
                        Acelerando Processamento...
                      </div>
                    )}
                    {!hasMore && posts.length > 0 && (
                      <div className="text-slate-400 font-black uppercase text-[10px] tracking-widest italic">
                        Fim dos dados criptografados
                      </div>
                    )}
                  </div>
                </div>
            </section>
          </main>
        );
    }
  };

  const handleVerifyAge = () => {
    localStorage.setItem('nexpay_age_verified', 'true');
    setIsAgeVerified(true);
  };

  const handleWelcomeComplete = () => {
    localStorage.setItem('nexpay_welcome_seen', 'true');
    setShowWelcome(false);
  };

  const handleVerificationSuccess = () => {
    const updatedUser = { ...currentUser, isVerified: true };
    setCurrentUser(updatedUser);
    firestoreService.saveUser(updatedUser);
    setIsVerificationModalOpen(false);
    
    // Update posts to show the badge for current user
    setPosts(prev => prev.map(p => p.user.id === currentUser.id ? { ...p, user: { ...p.user, isVerified: true } } : p));
  };

  return (
    <div 
      className={`min-h-screen flex flex-col transition-all duration-500 theme-transition ${eyeHealth ? 'sepia-[0.3] brightness-[0.9]' : ''} ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}
      style={{ 
        backgroundColor: darkMode ? undefined : 'var(--theme-bg)',
        color: darkMode ? undefined : 'var(--theme-text)'
      }}
    >
      {!isAgeVerified && <AgeVerification onVerify={handleVerifyAge} />}
      {isAgeVerified && showWelcome && <WelcomeIntro onComplete={handleWelcomeComplete} />}
      <Navigation activeTab={activeTab} setActiveTab={handleTabChange} />
      
      {/* Encryption Overlay (Global) */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-500 z-[200] opacity-30" />
      
      <VerificationModal 
        isOpen={isVerificationModalOpen} 
        onClose={() => setIsVerificationModalOpen(false)} 
        onSuccess={handleVerificationSuccess} 
      />

      <header className="sticky top-14 sm:top-0 z-[100] glass border-b border-slate-200 dark:border-slate-800/50 mt-14 sm:mt-0">
        {/* Top Apps Bar (Above Search) */}
        <div className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800/50 px-4 py-2 overflow-x-auto flex gap-6 scrollbar-hide">
          {appsList.map((app) => (
            <button 
              key={app.id} 
              onClick={() => handleTabChange(app.id)}
              className="flex items-center gap-2 shrink-0 group px-3 py-1.5 rounded-xl hover:bg-white dark:hover:bg-slate-700/50 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            >
              <motion.div 
                animate={activeTab === app.id ? { 
                  scale: [1, 1.2, 1],
                  y: [0, -2, 0]
                } : { scale: 1, y: 0 }}
                transition={{ duration: 0.4, type: "keyframes", ease: "easeInOut" }}
                whileTap={{ scale: 0.9 }}
                className={`${app.color} w-7 h-7 rounded-lg flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}
              >
                <app.icon className="w-4 h-4" />
              </motion.div>
              <span className={`text-micro ${activeTab === app.id ? 'text-emerald-500' : 'text-slate-500 dark:text-slate-400'}`}>{app.label}</span>
            </button>
          ))}
        </div>

        <div className="max-w-[1920px] mx-auto flex items-center justify-between h-16 sm:h-20 px-4 sm:px-8 gap-4">
          <div className="flex items-center gap-4 shrink-0">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-2xl flex items-center justify-center cursor-pointer shadow-xl shadow-emerald-500/20" 
              style={{ backgroundColor: 'var(--theme-primary)' }}
              onClick={() => handleTabChange(AppTab.FEED)}
            >
              <Zap className="w-6 h-6 text-white fill-white" />
            </motion.div>
            <div className="hidden lg:block">
              <h1 className="text-display text-xl font-black tracking-tighter italic uppercase">QOMO QIZER SOCIAL</h1>
              <div className="flex items-center gap-1.5">
                 <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
                 <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">Global Node: {language.toUpperCase()}</span>
              </div>
            </div>
            <h1 className="font-black text-lg tracking-tighter lg:hidden italic uppercase">QOMO QIZER</h1>
          </div>

          <div className="flex-1 max-w-2xl relative group hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.search}
              className="w-full bg-slate-100 dark:bg-slate-800/50 border-none rounded-2xl py-3 pl-12 pr-10 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none dark:text-white placeholder:text-slate-400"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            <div className="relative group/theme">
              <button className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl hover:bg-slate-200 transition-all flex items-center gap-2">
                {theme === 'dark' ? <Moon className="w-5 h-5" /> : theme === 'light' ? <Sun className="w-5 h-5" /> : <Laptop className="w-5 h-5" />}
                <span className="text-[10px] font-black uppercase">{theme}</span>
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 py-2 hidden group-hover/theme:block z-50">
                {[
                  { id: 'light', label: 'Claro', icon: Sun },
                  { id: 'dark', label: 'Escuro', icon: Moon },
                  { id: 'system', label: 'Sistema', icon: Laptop }
                ].map((t) => (
                  <button 
                    key={t.id}
                    onClick={() => setTheme(t.id as any)}
                    className={`w-full px-4 py-2 text-left text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between ${theme === t.id ? 'text-emerald-500' : 'text-slate-600 dark:text-slate-400'}`}
                  >
                    <div className="flex items-center gap-2">
                      <t.icon className="w-4 h-4" />
                      <span>{t.label}</span>
                    </div>
                    {theme === t.id && <CheckCircle2 className="w-3 h-3" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative group/lang">
              <button className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl hover:bg-slate-200 transition-all flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase">{language}</span>
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 py-2 hidden group-hover/lang:block z-50">
                {Object.keys(TRANSLATIONS).map((lang) => (
                  <button 
                    key={lang}
                    onClick={() => setLanguage(lang as Language)}
                    className={`w-full px-4 py-2 text-left text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between ${language === lang ? 'text-emerald-500' : 'text-slate-600 dark:text-slate-400'}`}
                  >
                    <span>{lang.toUpperCase()}</span>
                    {language === lang && <CheckCircle2 className="w-3 h-3" />}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => handleTabChange(AppTab.ENTERTAINMENT)} className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-rose-50 dark:bg-rose-500/10 text-rose-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-100 transition-all border border-rose-100 dark:border-rose-500/20 shadow-sm">
               <Tv className="w-4 h-4" /> TV
            </button>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsHubOpen(!isHubOpen)} 
              className="p-3 text-white rounded-2xl shadow-xl hover:shadow-theme-primary/20 transition-all relative group"
              style={{ backgroundColor: 'var(--theme-primary)' }}
            >
              <LayoutGrid className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
            </motion.button>

            <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />

            <button onClick={() => handleTabChange(AppTab.PROFILE)} className="relative flex items-center p-0.5 hover:ring-2 hover:ring-emerald-500 rounded-full transition-all">
              <img src={currentUser.avatar} className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-slate-900 shadow-md" />
            </button>
          </div>
        </div>
      </header>

      {isHubOpen && (
        <div className="fixed inset-0 z-[150] bg-slate-950/40 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setIsHubOpen(false)}>
          <div className="absolute top-20 right-4 w-full max-w-[450px] max-h-[85vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 p-8 animate-in slide-in-from-top-4 duration-500 scrollbar-hide" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black uppercase tracking-tighter italic">Pasta Quântica</h3>
              <button onClick={() => setIsHubOpen(false)} className="p-2 text-slate-400 hover:text-rose-500 transition-colors"><X className="w-6 h-6" /></button>
            </div>

            <div className="space-y-10">
              <div className="grid grid-cols-3 gap-3">
                {appsList.map((app, i) => (
                  <button key={i} onClick={() => handleTabChange(app.id)} className="flex flex-col items-center gap-2 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-3xl hover:scale-105 transition-all group">
                     <div className={`${app.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                        <app.icon className="w-6 h-6" />
                     </div>
                     <span className="text-[8px] font-black uppercase text-center truncate w-full">{app.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {renderContent()}
      
      <CelebrationManager currentUser={currentUser} posts={posts} />
      <AudioAdPlayer onAdFinished={handleAudioAdReward} />

      {/* Floating AI Assistant Button - Very Small, Bottom Left */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleTabChange(AppTab.MESSAGES)}
        className="fixed bottom-6 left-4 z-[100] w-8 h-8 bg-black rounded-full flex items-center justify-center shadow-lg border border-white/20 sm:bottom-6 sm:left-6"
        title="Assistente IA"
      >
        <Bot className="w-4 h-4 text-white" />
      </motion.button>
    </div>
  );
};

export default App;
