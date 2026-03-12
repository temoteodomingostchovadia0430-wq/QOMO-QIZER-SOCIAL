
import React, { useState } from 'react';
import { 
  Images, 
  Video, 
  Plus, 
  Sparkles, 
  ChevronRight, 
  Trash2, 
  Edit3, 
  LayoutGrid,
  Heart,
  Calendar,
  Layers
} from 'lucide-react';
import { Album } from '../types';

const MOCK_ALBUMS: Album[] = [
  { id: 'a1', title: 'Férias em Bazaruto', description: 'Memórias do verão azul de 2024', coverImage: 'https://picsum.photos/seed/bazaruto/400/400', itemsCount: 42, type: 'mixed' },
  { id: 'a2', title: 'Lançamento Nexus', description: 'O dia que mudamos o universo social', coverImage: 'https://picsum.photos/seed/nexus_launch/400/400', itemsCount: 15, type: 'video' },
  { id: 'a3', title: 'Setup de Trabalho', description: 'A evolução do meu workspace', coverImage: 'https://picsum.photos/seed/setup/400/400', itemsCount: 8, type: 'photo' },
];

const AlbumStudio: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>(MOCK_ALBUMS);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">Álbum Studio</h2>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">Organize suas memórias quânticas</p>
        </div>
        <button className="bg-indigo-600 text-white px-8 py-4 rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-indigo-100 hover:scale-105 active:scale-95 transition-all">
           <Plus className="w-5 h-5" /> Criar Novo Álbum
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {albums.map(album => (
          <div key={album.id} className="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500">
            <div className="relative aspect-square overflow-hidden">
               <img src={album.coverImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={album.title} />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
               <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                  <div className="flex items-center gap-1.5 text-white">
                    {album.type === 'photo' ? <Images className="w-3.5 h-3.5" /> : album.type === 'video' ? <Video className="w-3.5 h-3.5" /> : <Layers className="w-3.5 h-3.5" />}
                    <span className="text-[10px] font-black uppercase">{album.itemsCount} itens</span>
                  </div>
               </div>
               <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-xl font-black text-white mb-1">{album.title}</h3>
                  <p className="text-xs text-white/70 font-medium line-clamp-1 italic">{album.description}</p>
               </div>
            </div>
            
            <div className="p-4 flex items-center justify-between">
               <div className="flex gap-1">
                  <button className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl text-slate-400 transition-all"><Heart className="w-5 h-5" /></button>
                  <button className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl text-slate-400 transition-all"><Edit3 className="w-5 h-5" /></button>
                  <button className="p-3 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-2xl text-slate-400 hover:text-rose-500 transition-all"><Trash2 className="w-5 h-5" /></button>
               </div>
               <button className="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 p-3 rounded-2xl hover:bg-indigo-100 transition-all">
                  <ChevronRight className="w-5 h-5" />
               </button>
            </div>
          </div>
        ))}

        {/* Card de Inspiração IA */}
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-between shadow-xl relative overflow-hidden group cursor-pointer">
           <div className="relative z-10">
              <Sparkles className="w-10 h-10 text-indigo-300 mb-6 group-hover:rotate-12 transition-transform" />
              <h3 className="text-2xl font-black mb-2 italic">Auto-Álbum IA</h3>
              <p className="text-xs text-indigo-100 leading-relaxed opacity-80">Deixe a Nexus IA analisar suas fotos recentes e criar uma narrativa visual automática para você.</p>
           </div>
           <button className="relative z-10 w-full py-4 bg-white text-indigo-900 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl mt-8">Gerar Sugestão IA</button>
           <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
};

export default AlbumStudio;
