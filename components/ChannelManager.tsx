
import React, { useState } from 'react';
import { LayoutGrid, Plus, Globe, Settings, PlayCircle, Users, BarChart2, ShieldCheck, ChevronRight } from 'lucide-react';

const ChannelManager: React.FC = () => {
  const [channels, setChannels] = useState([
    { id: 'c1', name: 'Nexus Tech Lounge', subscribers: '12.4k', videos: 45, type: 'Official' },
    { id: 'c2', name: 'Daily Snaps', subscribers: '1.2k', videos: 128, type: 'Creator' },
  ]);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">Meus Canais</h2>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">Gerencie seu império de conteúdo</p>
        </div>
        <button className="bg-indigo-600 text-white px-8 py-4 rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl hover:scale-105 transition-all">
           <Plus className="w-5 h-5" /> CRIAR CANAL
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {channels.map(channel => (
          <div key={channel.id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm group hover:border-indigo-500 transition-all">
             <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                   <PlayCircle className="w-8 h-8" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 px-3 py-1 rounded-lg">
                   {channel.type}
                </span>
             </div>
             
             <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">{channel.name}</h3>
             
             <div className="flex gap-6 mb-8">
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Inscritos</p>
                   <p className="font-black text-slate-900 dark:text-white">{channel.subscribers}</p>
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Vídeos</p>
                   <p className="font-black text-slate-900 dark:text-white">{channel.videos}</p>
                </div>
             </div>

             <div className="flex gap-2">
                <button className="flex-1 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-indigo-50 transition-all">Dashboard</button>
                <button className="flex-1 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-indigo-50 transition-all">Definições</button>
                <button className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg"><ChevronRight className="w-5 h-5" /></button>
             </div>
          </div>
        ))}

        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center">
           <div className="bg-white dark:bg-slate-800 p-4 rounded-full mb-4 shadow-sm">
              <Plus className="w-8 h-8 text-slate-300" />
           </div>
           <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Adicionar Canal Secundário</p>
        </div>
      </div>
    </div>
  );
};

export default ChannelManager;
