
import React, { useState, useMemo } from 'react';
import { 
  Users, 
  UserPlus, 
  UserMinus,
  Check, 
  X, 
  ChevronRight, 
  Search, 
  Star, 
  ShieldCheck,
  MessageCircle,
  Clock,
  Zap,
  Heart,
  Globe,
  Lock,
  EyeOff,
  Shield
} from 'lucide-react';
import { MOCK_USERS, CURRENT_USER } from '../constants';
import { FriendRequest, User } from '../types';

const MOCK_REQUESTS: FriendRequest[] = [
  { id: 'r1', user: MOCK_USERS['u-002'], timestamp: 'Há 15 min', status: 'pending' },
  { id: 'r2', user: MOCK_USERS['u-003'], timestamp: 'Há 2h', status: 'pending' },
];

const FriendsModule: React.FC<{ onUserClick?: (user: User) => void }> = ({ onUserClick }) => {
  const [requests, setRequests] = useState<FriendRequest[]>(MOCK_REQUESTS);
  const [activeTab, setActiveTab] = useState<'requests' | 'suggestions' | 'following' | 'directory'>('directory');
  const [followedIds, setFollowedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFollow = (id: string) => {
    setFollowedIds(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const handleAction = (id: string, action: 'accepted' | 'declined') => {
    setRequests(prev => prev.filter(r => r.id !== id));
    alert(action === 'accepted' ? '✅ Nova conexão estabelecida!' : 'Pedido recusado.');
  };

  const allUsers = useMemo(() => Object.values(MOCK_USERS), []);

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return allUsers;
    const query = searchTerm.toLowerCase();
    return allUsers.filter(u => 
      u.name.toLowerCase().includes(query) || 
      u.handle.toLowerCase().includes(query)
    );
  }, [allUsers, searchTerm]);

  // Função para "criptografar" dados se for o criador (usuário atual)
  const getMaskedData = (user: User, field: 'name' | 'handle' | 'bio') => {
    const isMe = user.id === CURRENT_USER.id;
    if (isMe && user.isCreator) {
      if (field === 'name') return 'QOMO QIZER CREATOR [ENCRYPTED]';
      if (field === 'handle') return '@nexus_creator_node';
      if (field === 'bio') return 'Dados pessoais protegidos por criptografia quântica AES-256.';
    }
    return user[field];
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">Rede Nexus</h2>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">Conecte-se com o universo</p>
        </div>
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setActiveTab('directory')}
            className={`px-6 sm:px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'directory' ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-400'}`}
          >Explorar ({allUsers.length})</button>
          <button 
            onClick={() => setActiveTab('requests')}
            className={`px-6 sm:px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'requests' ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-400'}`}
          >Pedidos ({requests.length})</button>
          <button 
            onClick={() => setActiveTab('following')}
            className={`px-6 sm:px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'following' ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-400'}`}
          >Amigos ({followedIds.length})</button>
          <button 
            onClick={() => setActiveTab('suggestions')}
            className={`px-6 sm:px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'suggestions' ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-400'}`}
          >Sugestões</button>
        </div>
      </div>

      {activeTab === 'directory' && (
        <div className="mb-8 relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Pesquisar por nome ou @handle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] py-5 pl-16 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-sm"
          />
        </div>
      )}

      <div className="space-y-4">
        {activeTab === 'directory' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredUsers.map((user) => {
              const isMe = user.id === CURRENT_USER.id;
              return (
                <div 
                  key={user.id} 
                  onClick={() => onUserClick?.(user)}
                  className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
                >
                  {isMe && user.isCreator && (
                    <div className="absolute top-0 right-0 bg-indigo-600 text-white px-4 py-1.5 rounded-bl-2xl text-[8px] font-black uppercase tracking-widest flex items-center gap-1.5 z-10">
                      <Lock className="w-3 h-3" /> Blindado
                    </div>
                  )}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <img 
                        src={isMe && user.isCreator ? "https://picsum.photos/seed/encrypted/150/150" : user.avatar} 
                        className={`w-16 h-16 rounded-2xl object-cover ${isMe && user.isCreator ? 'blur-sm grayscale' : ''}`} 
                        alt={user.name} 
                      />
                      {user.isVerified && (
                        <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white p-1 rounded-full border-2 border-white dark:border-slate-900">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <div>
                       <h3 className="font-black text-slate-900 dark:text-white uppercase italic flex items-center gap-2">
                         {getMaskedData(user, 'name')}
                         {isMe && <span className="text-[8px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-black">EU</span>}
                       </h3>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{getMaskedData(user, 'handle')}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 italic">
                    {getMaskedData(user, 'bio')}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                    <div className="flex gap-4">
                       <div className="text-center">
                          <p className="text-[10px] font-black text-slate-900 dark:text-white">{user.followersCount || 0}</p>
                          <p className="text-[8px] font-bold text-slate-400 uppercase">Seguidores</p>
                       </div>
                       <div className="text-center">
                          <p className="text-[10px] font-black text-slate-900 dark:text-white">{user.followingCount || 0}</p>
                          <p className="text-[8px] font-bold text-slate-400 uppercase">Seguindo</p>
                       </div>
                    </div>
                    {!isMe && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleFollow(user.id); }}
                        className={`p-2.5 rounded-xl transition-all ${followedIds.includes(user.id) ? 'bg-rose-50 text-rose-500' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}
                      >
                        {followedIds.includes(user.id) ? <UserMinus className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : activeTab === 'requests' ? (
          requests.length > 0 ? requests.map((req) => (
            <div key={req.id} className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between animate-in slide-in-from-right duration-500">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={req.user.avatar} className="w-16 h-16 rounded-2xl object-cover" alt={req.user.name} />
                  <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white p-1 rounded-full border-2 border-white dark:border-slate-900">
                    <Users className="w-3 h-3" />
                  </div>
                </div>
                <div>
                   <h3 className="font-black text-slate-900 dark:text-white uppercase italic">{req.user.name}</h3>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{req.user.handle} • {req.timestamp}</p>
                </div>
              </div>
              <div className="flex gap-3">
                 <button 
                   onClick={() => handleAction(req.id, 'declined')}
                   className="p-4 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all"
                 >
                   <X className="w-6 h-6" />
                 </button>
                 <button 
                   onClick={() => handleAction(req.id, 'accepted')}
                   className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                 >
                   <Check className="w-5 h-5" /> Aceitar
                 </button>
              </div>
            </div>
          )) : (
            <div className="py-20 text-center">
               <Clock className="w-16 h-16 text-slate-200 mx-auto mb-4" />
               <p className="font-black text-slate-400 uppercase tracking-widest">Tudo em dia! Sem novos pedidos.</p>
            </div>
          )
        ) : activeTab === 'following' ? (
          followedIds.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allUsers.filter(u => followedIds.includes(u.id)).map(friend => (
                <div key={friend.id} className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between animate-in zoom-in duration-500">
                  <div className="flex items-center gap-4">
                    <img src={friend.avatar} className="w-14 h-14 rounded-2xl object-cover" alt={friend.name} />
                    <div>
                      <h3 className="font-black text-slate-900 dark:text-white uppercase italic text-sm">{friend.name}</h3>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{friend.handle}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleFollow(friend.id)}
                    className="p-3 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-xl hover:bg-rose-100 transition-all"
                    title="Deixar de Seguir"
                  >
                    <UserMinus className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
               <Heart className="w-16 h-16 text-slate-200 mx-auto mb-4" />
               <p className="font-black text-slate-400 uppercase tracking-widest">Ainda não segue ninguém. Explore sugestões!</p>
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {allUsers.filter(u => u.id !== CURRENT_USER.id).slice(0, 4).map(sug => {
               const isFollowed = followedIds.includes(sug.id);
               return (
                 <div key={sug.id} className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm group">
                    <div className="flex justify-between items-start mb-6">
                      <img src={sug.avatar} className="w-20 h-20 rounded-3xl object-cover shadow-lg" alt={sug.name} />
                      <div className="bg-amber-50 dark:bg-amber-500/10 p-2 rounded-xl text-amber-500">
                        <Zap className="w-4 h-4 fill-current" />
                      </div>
                    </div>
                    <h4 className="font-black text-slate-900 dark:text-white uppercase italic mb-1">{sug.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">{sug.handle} • {sug.followersCount} seguidores</p>
                    <button 
                      onClick={() => toggleFollow(sug.id)}
                      className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl ${isFollowed ? 'bg-slate-100 dark:bg-slate-800 text-slate-500' : 'bg-slate-900 dark:bg-white dark:text-slate-900 text-white group-hover:bg-indigo-600 group-hover:text-white'}`}
                    >
                      {isFollowed ? (
                        <><UserMinus className="w-4 h-4" /> Deixar de Seguir</>
                      ) : (
                        <><UserPlus className="w-4 h-4" /> Seguir</>
                      )}
                    </button>
                 </div>
               );
             })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsModule;
