
import React from 'react';
import { Play, Film, Tv, Radio, TrendingUp, Search, ChevronRight } from 'lucide-react';
import { MOCK_VIDEOS } from '../constants';

const VideoHub: React.FC = () => {
  const categories = [
    { name: 'Para Você', icon: TrendingUp, active: true },
    { name: 'Filmes', icon: Film },
    { name: 'Séries', icon: Tv },
    { name: 'Canais Live', icon: Radio },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 pb-32 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase leading-none">QOMO QIZER Video Hub</h2>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Cinema, TV e Streaming em um só lugar</p>
        </div>
        <div className="relative w-full md:w-80">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
           <input type="text" placeholder="Pesquisar filmes, séries..." className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-xs font-black uppercase focus:ring-2 focus:ring-emerald-500 outline-none" />
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-6 mb-8 scrollbar-hide">
        {categories.map((cat, i) => (
          <button 
            key={i} 
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${cat.active ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800'}`}
          >
            <cat.icon className="w-4 h-4" />
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_VIDEOS.map((video) => (
          <div key={video.id} className="group cursor-pointer">
            <div className="relative aspect-video rounded-[2rem] overflow-hidden mb-3 shadow-sm group-hover:shadow-xl transition-all">
              <img src={video.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                 <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                    <Play className="w-6 h-6 text-white fill-current" />
                 </div>
              </div>
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[9px] font-black px-2 py-1 rounded-lg">
                {video.duration}
              </div>
              <div className="absolute top-3 left-3 bg-emerald-500 text-white text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-widest">
                {video.provider}
              </div>
            </div>
            <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-emerald-500 transition-colors">{video.title}</h4>
            <div className="flex items-center gap-2 mt-1">
               <span className="text-[10px] font-bold text-slate-400 uppercase">{video.views} visualizações</span>
               <span className="text-slate-300">•</span>
               <span className="text-[10px] font-bold text-emerald-500 uppercase">HD 4K</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
         <div className="relative z-10 max-w-lg">
            <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-4">QOMO QIZER Drama Box</h3>
            <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">Assista as melhores séries curtas e dramas exclusivos produzidos localmente em Moçambique.</p>
            <button className="bg-emerald-500 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all">Começar a Assistir</button>
         </div>
         <Film className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5" />
      </div>
    </div>
  );
};

export default VideoHub;
