
import React, { useState } from 'react';
import { Play, Star, ChevronRight, Bookmark, Zap, Film, Flame } from 'lucide-react';

const DRAMAS = [
  { id: 'd1', title: 'O Código de Maputo', type: 'Sci-Fi', rating: '4.8', ep: 'Ep 12/24', image: 'https://picsum.photos/seed/drama1/400/600' },
  { id: 'd2', title: 'Amor Quântico', type: 'Romance', rating: '4.9', ep: 'Ep 05/30', image: 'https://picsum.photos/seed/drama2/400/600' },
  { id: 'd3', title: 'Investigação Nexus', type: 'Mistério', rating: '4.7', ep: 'Novo Ep', image: 'https://picsum.photos/seed/drama3/400/600' },
];

const DramaBox: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-rose-500 fill-rose-500" />
            <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Tendência Agora</span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase leading-none">Drama Box Pro</h2>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-2">Séries ultra-curtas de alta qualidade</p>
        </div>
        <div className="flex gap-4">
           <button className="bg-slate-100 dark:bg-slate-800 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest">Populares</button>
           <button className="bg-indigo-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Meu Histórico</button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {DRAMAS.map(drama => (
          <div key={drama.id} className="group relative aspect-[2/3] rounded-[2rem] overflow-hidden shadow-sm cursor-pointer hover:shadow-2xl transition-all duration-500">
             <img src={drama.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
             
             <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg border border-white/20">
                <div className="flex items-center gap-1 text-white">
                   <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                   <span className="text-[9px] font-black">{drama.rating}</span>
                </div>
             </div>

             <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[9px] font-black text-indigo-400 uppercase mb-1 tracking-widest">{drama.type}</p>
                <h3 className="text-white font-black text-sm mb-3 group-hover:text-indigo-400 transition-colors">{drama.title}</h3>
                <div className="flex items-center justify-between">
                   <span className="text-[9px] font-bold text-white/60 uppercase">{drama.ep}</span>
                   <div className="bg-white p-2 rounded-full text-slate-950 scale-0 group-hover:scale-100 transition-transform duration-300">
                      <Play className="w-4 h-4 fill-current" />
                   </div>
                </div>
             </div>
          </div>
        ))}

        {/* Explore More Card */}
        <div className="bg-slate-100 dark:bg-slate-800 rounded-[2rem] flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-200 dark:border-slate-700 group hover:border-indigo-600 transition-all">
           <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-3xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <Film className="w-8 h-8" />
           </div>
           <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Mais de 500 títulos</p>
           <button className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">Explorar Tudo <ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  );
};

export default DramaBox;
