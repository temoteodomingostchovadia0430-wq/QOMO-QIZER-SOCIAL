
import React, { useState } from 'react';
import { User, Post, AppTab } from '../types';
import { CURRENT_USER } from '../constants';
import { 
  ArrowLeft, 
  Sparkles, 
  UserX,
  CreditCard,
  CheckCircle2,
  Lock,
  Moon,
  Sun,
  Eye,
  Palette,
  Globe,
  MessageCircle,
  Facebook,
  Youtube,
  Smartphone,
  Swords,
  Zap,
  RefreshCw,
  Trophy,
  Coins,
  Users,
  UserPlus,
  UserCheck,
  ShieldCheck,
  EyeOff,
  ShoppingCart,
  Crown,
  Gift,
  Image as ImageIcon,
  Video,
  Info,
  Share2,
  Ban,
  AlertTriangle,
  Wallet,
  PlayCircle,
  Send,
  Star,
  LayoutGrid,
  Calendar,
  MoreHorizontal,
  MapPin,
  Briefcase,
  GraduationCap,
  Phone,
  Heart,
  History,
  TrendingUp,
  Rocket,
  Target as TargetIcon
} from 'lucide-react';
import PostCard from './PostCard';
import AvatarStudio from './AvatarStudio';

enum ProfileSection {
  POSTS = 'publicacoes',
  ABOUT = 'sobre',
  FRIENDS = 'amigos',
  PHOTOS = 'fotos',
  VIDEOS = 'videos',
  HIGHLIGHTS = 'destaques',
  GROUPS = 'grupos',
  EVENTS = 'eventos'
}

interface UserProfileProps {
  user: User;
  posts: Post[];
  onBack?: () => void;
  onUserClick?: (user: User) => void;
  onVerify?: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  eyeHealth: boolean;
  setEyeHealth: (val: boolean) => void;
  onTabChange?: (tab: any) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ 
  user, 
  posts, 
  onBack, 
  onUserClick, 
  onVerify, 
  darkMode, 
  setDarkMode, 
  eyeHealth, 
  setEyeHealth,
  onTabChange
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [friendStatus, setFriendStatus] = useState<'none' | 'pending' | 'friends'>('none');
  const [showAvatarStudio, setShowAvatarStudio] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(user.avatar);
  const [activeSection, setActiveSection] = useState<ProfileSection>(ProfileSection.POSTS);
  const isMe = user.id === CURRENT_USER.id;

  const userPosts = posts.filter(p => p.user.id === user.id);

  const handleLogout = () => {
    if (confirm("🌌 Nexus: Deseja realmente terminar sua sessão quântica?")) {
      window.location.reload();
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen relative">
      {showAvatarStudio && (
        <AvatarStudio 
          userName={user.name} 
          onAvatarSelected={(url) => { setCurrentAvatar(url); setShowAvatarStudio(false); }} 
          onClose={() => setShowAvatarStudio(false)} 
        />
      )}

      {/* Header Cover com Imagem e Gradiente Stealth */}
      <div className={`sticky top-0 h-48 sm:h-64 z-0 overflow-hidden relative group`}>
        <img 
          src={isMe ? "https://picsum.photos/seed/nexus_cover/1200/400" : "https://picsum.photos/seed/user_cover/1200/400"} 
          className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className={`absolute inset-0 ${isMe ? 'bg-gradient-to-b from-slate-900/40 to-slate-950' : 'bg-gradient-to-b from-emerald-900/40 to-slate-950'}`} />
        
        {onBack && (
          <button onClick={onBack} className="absolute top-4 left-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-md z-20">
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        
        {isMe && (
          <div className="absolute top-4 right-4 bg-emerald-500/20 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 border border-white/10 animate-pulse z-20">
             <EyeOff className="w-3.5 h-3.5 text-emerald-300" />
             <span className="text-[8px] font-black text-emerald-100 uppercase tracking-widest">Protocolo Fantasma Ativo</span>
          </div>
        )}

        {isMe && (
          <button className="absolute bottom-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/20 transition-all z-20">
            <ImageIcon className="w-4 h-4 inline-block mr-2" /> Alterar Capa
          </button>
        )}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 -mt-20 sm:-mt-24 pb-12">
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl p-8 mb-6 border border-slate-100 dark:border-slate-800">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
              <div className="relative group">
                <div className={`absolute -inset-1 rounded-[3rem] blur opacity-30 bg-gradient-to-r from-emerald-500 to-emerald-600 ${isMe ? 'block' : 'hidden'}`} />
                <img 
                  src={isMe ? "https://picsum.photos/seed/ghost_node/300/300" : currentAvatar} 
                  className={`relative w-32 h-32 sm:w-40 sm:h-40 rounded-[3rem] object-cover border-8 border-white dark:border-slate-900 shadow-2xl bg-white dark:bg-slate-800 ${isMe ? 'blur-md grayscale' : ''}`}
                />
                {isMe && (
                  <button 
                    onClick={() => setShowAvatarStudio(true)}
                    className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-3 rounded-2xl shadow-xl hover:scale-110 transition-all border-4 border-white dark:border-slate-900 z-20"
                  >
                    <Sparkles className="w-6 h-6" />
                  </button>
                )}
              </div>

              <div className="text-center md:text-left space-y-2">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    {isMe ? 'Nodo Privado QOMO QIZER' : user.name}
                  </h2>
                  {user.isVerified && (
                    <div className={`${user.isCreator ? 'bg-emerald-500' : 'bg-[#00d2ff]'} text-white rounded-full p-1.5 shadow-[0_0_20px_rgba(16,185,129,0.6)]`}>
                      {user.isCreator ? <ShieldCheck className="w-5 h-5 fill-current" /> : <CheckCircle2 className="w-5 h-5 fill-current" />}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <p className="text-emerald-500 font-black uppercase text-xs tracking-widest">{isMe ? '@master_node_001' : user.handle}</p>
                  <div className="flex items-center gap-1 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    <Users className="w-3.5 h-3.5" /> 1.2k Amigos • 5.8k Seguidores
                  </div>
                  <div className="flex items-center gap-1 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    <MapPin className="w-3.5 h-3.5" /> Maputo, MZ
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-2">
               {isMe ? (
                 <>
                    <button 
                      onClick={() => onTabChange?.(AppTab.PAY)}
                      className="bg-amber-500 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-105 transition-all"
                    >
                       <CreditCard className="w-4 h-4" /> Pagamento Rápido
                    </button>
                    <button className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all">
                       <Palette className="w-4 h-4" /> Editar Perfil
                    </button>
                    <button className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 p-3 rounded-2xl hover:bg-slate-200 transition-all">
                       <MoreHorizontal className="w-5 h-5" />
                    </button>
                 </>
               ) : (
                 <>
                    <button 
                      onClick={() => onTabChange?.(AppTab.PAY)}
                      className="bg-amber-500 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-105 transition-all"
                    >
                       <CreditCard className="w-4 h-4" /> Pagar
                    </button>
                    <button className="bg-emerald-500 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-transform flex items-center gap-2">
                      <UserPlus className="w-5 h-5" /> Adicionar
                    </button>
                    <button className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition-all shadow-md active:scale-95">
                       <MessageCircle className="w-5 h-5" /> Mensagem
                    </button>
                    <button className="bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-all">
                       <Star className="w-5 h-5" />
                    </button>
                    <div className="relative group/menu">
                      <button className="bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-all">
                         <MoreHorizontal className="w-5 h-5" />
                      </button>
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 py-2 hidden group-hover/menu:block z-50">
                        <button className="w-full px-4 py-2 text-left text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                          <Share2 className="w-4 h-4" /> Partilhar
                        </button>
                        <button className="w-full px-4 py-2 text-left text-xs font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 flex items-center gap-2">
                          <Ban className="w-4 h-4" /> Bloquear
                        </button>
                        <button className="w-full px-4 py-2 text-left text-xs font-black uppercase tracking-widest text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" /> Denunciar
                        </button>
                      </div>
                    </div>
                 </>
               )}
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed font-medium bg-slate-50/50 dark:bg-slate-800/30 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 italic relative">
               <span className="absolute -top-3 left-6 bg-white dark:bg-slate-900 px-3 text-[10px] font-black text-emerald-500 uppercase tracking-widest">Biografia</span>
               {isMe ? '"Controlando o fluxo quântico de comissões e megabytes. Identidade invisível, ganhos reais."' : user.bio}
            </p>
            
            {/* Menu Principal do Perfil */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-slate-100 dark:border-slate-800">
               {[
                 { id: ProfileSection.POSTS, label: 'Publicações', icon: LayoutGrid },
                 { id: ProfileSection.ABOUT, label: 'Sobre', icon: Info },
                 { id: ProfileSection.FRIENDS, label: 'Amigos', icon: Users },
                 { id: ProfileSection.PHOTOS, label: 'Fotos', icon: ImageIcon },
                 { id: ProfileSection.VIDEOS, label: 'Vídeos', icon: Video },
                 { id: ProfileSection.HIGHLIGHTS, label: 'Destaques', icon: Star },
                 { id: ProfileSection.GROUPS, label: 'Grupos', icon: Users },
                 { id: ProfileSection.EVENTS, label: 'Eventos', icon: Calendar },
               ].map(tab => (
                 <button
                   key={tab.id}
                   onClick={() => setActiveSection(tab.id as ProfileSection)}
                   className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                     activeSection === tab.id 
                       ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                       : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                   }`}
                 >
                   <tab.icon className="w-4 h-4" /> {tab.label}
                 </button>
               ))}
            </div>
          </div>
        </div>

        {/* Funções Especiais QOMO QIZER SOCIAL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
           {[
             { label: 'Carteira Digital', icon: Wallet, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10', desc: 'Gerir Saldo' },
             { label: 'Ganhar Vídeos', icon: PlayCircle, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10', desc: 'Monetizar' },
             { label: 'Transferir', icon: Send, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10', desc: 'Enviar MT' },
             { label: 'Recompensas', icon: Trophy, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-500/10', desc: 'Resgatar' },
           ].map(func => (
             <button key={func.label} className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-left group">
                <div className={`w-12 h-12 rounded-2xl ${func.bg} flex items-center justify-center ${func.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <func.icon className="w-6 h-6" />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{func.label}</p>
                <p className="text-xs font-black text-slate-900 dark:text-white uppercase italic">{func.desc}</p>
             </button>
           ))}
        </div>

        {/* Conteúdo Dinâmico das Abas */}
        <div className="space-y-6">
           {activeSection === ProfileSection.POSTS && (
             <div className="space-y-6">
                {isMe && (
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                      <img src={currentAvatar} className="w-10 h-10 rounded-xl object-cover" />
                      <button className="flex-1 bg-slate-50 dark:bg-slate-800/50 text-slate-400 text-left px-6 py-3 rounded-2xl text-xs font-medium hover:bg-slate-100 transition-all">
                        No que estás a pensar, {user.name.split(' ')[0]}?
                      </button>
                    </div>
                    <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <button className="flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-black uppercase text-slate-500 hover:bg-slate-50 rounded-xl transition-all"><ImageIcon className="w-4 h-4 text-emerald-500" /> Foto</button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-black uppercase text-slate-500 hover:bg-slate-50 rounded-xl transition-all"><Video className="w-4 h-4 text-blue-500" /> Vídeo</button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-black uppercase text-slate-500 hover:bg-slate-50 rounded-xl transition-all"><Sparkles className="w-4 h-4 text-amber-500" /> IA Post</button>
                    </div>
                  </div>
                )}
                {userPosts.length > 0 ? (
                  userPosts.map(post => (
                    <PostCard key={post.id} post={post} onUserClick={onUserClick} />
                  ))
                ) : (
                  <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800">
                    <LayoutGrid className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                    <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Nenhuma publicação encontrada</p>
                  </div>
                )}
             </div>
           )}

           {activeSection === ProfileSection.ABOUT && (
             <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-6">
                      <h4 className="text-xs font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                        <Info className="w-4 h-4" /> Informação Pessoal
                      </h4>
                      <div className="space-y-4">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400"><Briefcase className="w-5 h-5" /></div>
                            <div>
                               <p className="text-[8px] font-black text-slate-400 uppercase">Trabalho</p>
                               <p className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase">Nexus Core Developer</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400"><GraduationCap className="w-5 h-5" /></div>
                            <div>
                               <p className="text-[8px] font-black text-slate-400 uppercase">Educação</p>
                               <p className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase">Quantum Computing Institute</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400"><MapPin className="w-5 h-5" /></div>
                            <div>
                               <p className="text-[8px] font-black text-slate-400 uppercase">Cidade Atual</p>
                               <p className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase">Maputo, Moçambique</p>
                            </div>
                         </div>
                      </div>
                   </div>
                   <div className="space-y-6">
                      <h4 className="text-xs font-black uppercase tracking-widest text-blue-500 flex items-center gap-2">
                        <Phone className="w-4 h-4" /> Contacto & Básicos
                      </h4>
                      <div className="space-y-4">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400"><Globe className="w-5 h-5" /></div>
                            <div>
                               <p className="text-[8px] font-black text-slate-400 uppercase">Website</p>
                               <p className="text-xs font-black text-blue-500 lowercase">nexus.social/master_node</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400"><Heart className="w-5 h-5" /></div>
                            <div>
                               <p className="text-[8px] font-black text-slate-400 uppercase">Relacionamento</p>
                               <p className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase">Casado com a Tecnologia</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400"><History className="w-5 h-5" /></div>
                            <div>
                               <p className="text-[8px] font-black text-slate-400 uppercase">Membro desde</p>
                               <p className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase">Janeiro 2024</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
           )}

           {activeSection === ProfileSection.FRIENDS && (
             <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                   <h4 className="text-lg font-black uppercase tracking-tighter italic text-slate-900 dark:text-white">Amigos <span className="text-slate-400 text-sm ml-2">1,245</span></h4>
                   <button className="text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:underline">Ver Todos</button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                   {[1, 2, 3, 4, 5, 6].map(i => (
                     <div key={i} className="group cursor-pointer">
                        <img src={`https://picsum.photos/seed/friend_${i}/300/300`} className="w-full aspect-square rounded-2xl object-cover mb-2 group-hover:scale-[1.02] transition-transform" />
                        <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-tight truncate">Amigo Nexus #{i}</p>
                        <p className="text-[8px] font-bold text-slate-400 uppercase">12 amigos em comum</p>
                     </div>
                   ))}
                </div>
             </div>
           )}

           {activeSection === ProfileSection.PHOTOS && (
             <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                   <h4 className="text-lg font-black uppercase tracking-tighter italic text-slate-900 dark:text-white">Fotos</h4>
                   <div className="flex gap-4">
                      <button className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Álbuns</button>
                      <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Marcadas</button>
                   </div>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                   {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
                     <img key={i} src={`https://picsum.photos/seed/photo_${i}/400/400`} className="w-full aspect-square rounded-xl object-cover hover:opacity-80 cursor-pointer transition-opacity" />
                   ))}
                </div>
             </div>
           )}
        </div>

        {/* 20 Funções Secretas de Crescimento (Growth Node) */}
        <div className="mt-12 bg-slate-900 rounded-[3rem] p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
           <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-16 h-16 bg-emerald-500 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl shadow-emerald-500/40">
                    <Rocket className="w-8 h-8" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Growth Node Pro</h3>
                    <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em]">20 Funções Secretas de Crescimento Ativadas</p>
                 </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {[
                   { title: 'Viral Loop 2.0', icon: RefreshCw, desc: 'Indicação em cadeia com bônus exponencial.' },
                   { title: 'IA Engagement', icon: MessageCircle, desc: 'Respostas automáticas inteligentes para posts.' },
                   { title: 'Smart Rewards', icon: Trophy, desc: 'Gamificação de cada clique no app.' },
                   { title: 'Social Mining', icon: Coins, desc: 'Ganhe tokens por tempo de uso ativo.' },
                   { title: 'Nexus Ads Rev', icon: TrendingUp, desc: 'Receba parte da receita dos anúncios no seu feed.' },
                   { title: 'Ghost Mode', icon: EyeOff, desc: 'Navegação 100% anônima e segura.' },
                   { title: 'Auto-Growth', icon: UserPlus, desc: 'Sugestões de rede baseadas em interesses IA.' },
                   { title: 'Market Boost', icon: ShoppingCart, desc: 'Impulsionamento gratuito de 1 produto/mês.' },
                   { title: 'Quantum Auth', icon: ShieldCheck, desc: 'Segurança biométrica de nível militar.' }
                 ].map((f, i) => (
                   <div key={i} className="bg-white/5 p-6 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all group">
                      <f.icon className="w-6 h-6 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
                      <h4 className="text-sm font-black text-white uppercase tracking-tight mb-2">{f.title}</h4>
                      <p className="text-[10px] text-slate-400 font-medium leading-relaxed">{f.desc}</p>
                   </div>
                 ))}
                 <div className="bg-emerald-500 p-6 rounded-[2rem] flex flex-col items-center justify-center text-center group cursor-pointer hover:scale-105 transition-all">
                    <TargetIcon className="w-8 h-8 text-white mb-2 animate-bounce" />
                    <p className="text-xs font-black text-white uppercase tracking-widest">Ver Todas as 20 Funções</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Desafios Semanais (Movido para baixo para melhor fluxo) */}
        <div className="mt-8 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden relative">
           <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-sm font-black uppercase tracking-widest italic flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" /> Desafios Semanais
                 </h3>
                 <span className="text-[9px] font-black bg-amber-100 text-amber-600 px-3 py-1 rounded-full uppercase">3/5 Concluídos</span>
              </div>
              
              <div className="space-y-4">
                 {[
                   { label: 'Venda algo no Marketplace', progress: 100, icon: ShoppingCart },
                   { label: 'Crie 3 posts com IA', progress: 66, icon: Sparkles },
                   { label: 'Indique 5 amigos', progress: 40, icon: UserPlus }
                 ].map((d, i) => (
                   <div key={i} className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-tight">
                         <span className="flex items-center gap-2"><d.icon className="w-3 h-3" /> {d.label}</span>
                         <span>{d.progress}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                         <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${d.progress}%` }} />
                      </div>
                   </div>
                 ))}
              </div>

              {isMe && onTabChange && (
                <button 
                 onClick={() => onTabChange(AppTab.REFERRALS)}
                 className="w-full mt-6 bg-amber-500 text-white py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-all"
                >
                   <Gift className="w-4 h-4" /> Convidar Amigos & Ganhar Bônus
                </button>
              )}
           </div>
           <Swords className="absolute -bottom-10 -right-10 w-48 h-48 text-slate-50 dark:text-slate-800/20" />
        </div>

        {/* Informações Invisíveis (Apenas para o dono) */}
        {isMe && (
          <div className="space-y-6 mb-8">
            <div className="bg-emerald-950 rounded-[2.5rem] p-8 border border-emerald-500/30 shadow-2xl relative overflow-hidden group">
               <div className="relative z-10">
                  <h3 className="text-emerald-300 text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                     <Lock className="w-4 h-4" /> Dados Blindados (Invisíveis para Terceiros)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                        <p className="text-[8px] font-black text-white/40 uppercase mb-1">Telefone Master (Criptografado)</p>
                        <p className="text-sm font-black text-white">875 727 586</p>
                     </div>
                     <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                        <p className="text-[8px] font-black text-white/40 uppercase mb-1">Status de Repasse</p>
                        <p className="text-sm font-black text-emerald-400">AUTOMÁTICO • CONTA 875727586</p>
                     </div>
                  </div>
               </div>
               <Zap className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5" />
            </div>

            {/* Estado da Conta (Novidade) */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" /> Estado da Conta
               </h3>
               <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-800">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                        <CheckCircle2 className="w-6 h-6" />
                     </div>
                     <div>
                        <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">Excelente</p>
                        <p className="text-[10px] font-bold text-emerald-600 uppercase">Nenhuma restrição ativa</p>
                     </div>
                  </div>
                  <button className="text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:underline">Ver Detalhes</button>
               </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
           {[
             { label: 'Ganhos 24h', val: '850 MT', icon: Coins },
             { label: 'Rede', val: '1.2k', icon: Users },
             { label: 'Uptime', val: '99.9%', icon: Zap },
             { label: 'Segurança', val: 'MÁXIMA', icon: ShieldCheck }
           ].map(stat => (
             <div key={stat.label} className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 text-center shadow-sm">
                <p className="text-lg font-black text-slate-900 dark:text-white uppercase italic">{stat.val}</p>
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1 mt-1">
                   <stat.icon className="w-3 h-3 text-emerald-500" /> {stat.label}
                </p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
