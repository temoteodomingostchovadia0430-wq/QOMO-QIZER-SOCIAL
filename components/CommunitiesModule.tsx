
import React, { useState } from 'react';
import { Users, Layout, Plus, ChevronRight, Globe, Lock, Star, Megaphone, X, Shield, MessageSquare, UserPlus, Settings, Search } from 'lucide-react';
import { Group } from '../types';

const CommunitiesModule: React.FC = () => {
  const [activeType, setActiveType] = useState<'pages' | 'groups'>('groups');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [groups, setGroups] = useState<Group[]>([
    {
      id: 'g-001',
      name: 'Desenvolvedores QOMO QIZER',
      description: 'Grupo privado para arquitetos de IA e engenheiros frontend focados no ecossistema QOMO QIZER.',
      avatar: 'https://picsum.photos/seed/dev/200/200',
      membersCount: 1250,
      isPrivate: true,
      adminId: 'u-001',
      category: 'Tecnologia'
    },
    {
      id: 'g-002',
      name: 'Empreendedores Moçambique',
      description: 'Comunidade para troca de ideias e parcerias entre empreendedores locais.',
      avatar: 'https://picsum.photos/seed/biz/200/200',
      membersCount: 3400,
      isPrivate: false,
      adminId: 'u-002',
      category: 'Negócios'
    }
  ]);

  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    isPrivate: false,
    category: 'Geral'
  });

  const handleCreateGroup = () => {
    if (!newGroup.name) return;
    const group: Group = {
      id: `g-${Date.now()}`,
      name: newGroup.name,
      description: newGroup.description,
      avatar: `https://picsum.photos/seed/${newGroup.name}/200/200`,
      membersCount: 1,
      isPrivate: newGroup.isPrivate,
      adminId: 'u-001',
      category: newGroup.category
    };
    setGroups([group, ...groups]);
    setShowCreateModal(false);
    setNewGroup({ name: '', description: '', isPrivate: false, category: 'Geral' });
  };

  if (selectedGroup) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in duration-500 pb-32">
        <button 
          onClick={() => setSelectedGroup(null)}
          className="flex items-center gap-2 text-slate-500 hover:text-emerald-500 transition-colors mb-8 font-black text-[10px] uppercase tracking-widest"
        >
          <ChevronRight className="w-4 h-4 rotate-180" /> Voltar para Comunidades
        </button>

        <div className="bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl mb-8">
          <div className="h-48 bg-gradient-to-r from-emerald-500 to-emerald-800 relative">
             <div className="absolute -bottom-12 left-8">
                <img src={selectedGroup.avatar} className="w-24 h-24 rounded-[2rem] border-4 border-white dark:border-slate-900 shadow-2xl object-cover" />
             </div>
          </div>
          <div className="pt-16 pb-8 px-8">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                   <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">{selectedGroup.name}</h2>
                   <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{selectedGroup.category}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{selectedGroup.membersCount} Membros</span>
                      <span className="text-slate-300">•</span>
                      <div className="flex items-center gap-1 text-slate-400">
                         {selectedGroup.isPrivate ? <Lock className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                         <span className="text-[10px] font-black uppercase tracking-widest">{selectedGroup.isPrivate ? 'Privado' : 'Público'}</span>
                      </div>
                   </div>
                </div>
                <div className="flex gap-2">
                   <button className="bg-emerald-500 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all">Convidar</button>
                   <button className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"><Settings className="w-5 h-5" /></button>
                </div>
             </div>
             <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium mb-8 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 italic">
                {selectedGroup.description}
             </p>

             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center gap-4 shadow-sm">
                   <div className="bg-emerald-50 dark:bg-emerald-950/20 p-3 rounded-2xl text-emerald-500">
                      <Shield className="w-5 h-5" />
                   </div>
                   <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase">Segurança</p>
                      <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase">Criptografado</p>
                   </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center gap-4 shadow-sm">
                   <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-2xl text-blue-500">
                      <MessageSquare className="w-5 h-5" />
                   </div>
                   <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase">Discussões</p>
                      <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase">Ativas</p>
                   </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center gap-4 shadow-sm">
                   <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-2xl text-amber-500">
                      <UserPlus className="w-5 h-5" />
                   </div>
                   <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase">Crescimento</p>
                      <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase">+12% esta semana</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in duration-500 pb-32">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase leading-none">Comunidades QOMO QIZER</h2>
          <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Conecte-se com o universo SOCIAL</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex-1 sm:flex-none bg-emerald-500 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4" /> Criar {activeType === 'pages' ? 'Página' : 'Grupo'}
          </button>
        </div>
      </div>

      <div className="flex p-1.5 bg-slate-100 dark:bg-slate-900 rounded-[2rem] mb-8 w-fit border border-slate-200 dark:border-slate-800">
        <button 
          onClick={() => setActiveType('pages')}
          className={`px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeType === 'pages' ? 'bg-white dark:bg-slate-800 text-emerald-500 shadow-sm' : 'text-slate-400'}`}
        >Páginas Business</button>
        <button 
          onClick={() => setActiveType('groups')}
          className={`px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeType === 'groups' ? 'bg-white dark:bg-slate-800 text-emerald-500 shadow-sm' : 'text-slate-400'}`}
        >Grupos Privados</button>
      </div>

      <div className="relative mb-8 group">
         <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
         <input 
          type="text" 
          placeholder={`Pesquisar ${activeType === 'pages' ? 'páginas' : 'grupos'}...`}
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-xs font-black uppercase focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
         />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeType === 'pages' ? (
          <>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-950/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Layout className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight italic">QOMO QIZER Tech Store</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 font-medium">Página oficial de hardware quântico e gadgets exclusivos QOMO QIZER.</p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-800">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">12.5k Seguidores</span>
                  <button className="text-emerald-500 font-black text-xs flex items-center gap-1 uppercase tracking-widest hover:underline">GERIR <ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
              <Layout className="absolute -bottom-10 -right-10 w-48 h-48 text-slate-50 dark:text-slate-800/10" />
            </div>
          </>
        ) : (
          groups.map((group) => (
            <div 
              key={group.id}
              onClick={() => setSelectedGroup(group)}
              className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden cursor-pointer"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform overflow-hidden">
                  <img src={group.avatar} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight italic">{group.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 font-medium line-clamp-2">{group.description}</p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-emerald-500">
                      {group.isPrivate ? <Lock className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                      <span className="text-[10px] font-black uppercase tracking-widest">{group.isPrivate ? 'Privado' : 'Público'}</span>
                    </div>
                    <span className="text-slate-300">•</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{group.membersCount} Membros</span>
                  </div>
                  <button className="text-emerald-500 font-black text-xs flex items-center gap-1 uppercase tracking-widest hover:underline">ENTRAR <ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
              <Users className="absolute -bottom-10 -right-10 w-48 h-48 text-slate-50 dark:text-slate-800/10" />
            </div>
          ))
        )}
      </div>

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[200] bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">Criar Novo Grupo</h3>
                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-1">Inicie sua comunidade QOMO QIZER</p>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all text-slate-400">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome do Grupo</label>
                <input 
                  type="text" 
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                  placeholder="Ex: Desenvolvedores QOMO QIZER"
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Descrição</label>
                <textarea 
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                  placeholder="Sobre o que é este grupo?"
                  rows={3}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-emerald-500 transition-all outline-none resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Privacidade</label>
                  <select 
                    value={newGroup.isPrivate ? 'true' : 'false'}
                    onChange={(e) => setNewGroup({ ...newGroup, isPrivate: e.target.value === 'true' })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-emerald-500 transition-all outline-none appearance-none"
                  >
                    <option value="false">Público</option>
                    <option value="true">Privado</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Categoria</label>
                  <select 
                    value={newGroup.category}
                    onChange={(e) => setNewGroup({ ...newGroup, category: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-emerald-500 transition-all outline-none appearance-none"
                  >
                    <option value="Geral">Geral</option>
                    <option value="Tecnologia">Tecnologia</option>
                    <option value="Negócios">Negócios</option>
                    <option value="Educação">Educação</option>
                    <option value="Lazer">Lazer</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-8 bg-slate-50 dark:bg-slate-800/50 flex gap-4">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >Cancelar</button>
              <button 
                onClick={handleCreateGroup}
                className="flex-1 bg-emerald-500 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all"
              >Criar Grupo</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunitiesModule;
