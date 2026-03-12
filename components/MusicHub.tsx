
import React, { useState, useEffect } from 'react';
import { 
  Music, 
  Play, 
  Pause, 
  Download, 
  Search, 
  Heart, 
  SkipBack, 
  SkipForward, 
  MoreVertical, 
  CheckCircle2,
  ListMusic,
  Headphones,
  Zap,
  Loader2
} from 'lucide-react';
import { motion } from 'motion/react';
import { MusicTrack, MOCK_TRACKS } from '../constants';

const MusicHub: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState<MusicTrack | null>(MOCK_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadedIds, setDownloadedIds] = useState<Set<string>>(new Set());
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('nexus_favorite_tracks');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem('nexus_favorite_tracks', JSON.stringify(Array.from(favoriteIds)));
  }, [favoriteIds]);

  const toggleFavorite = (id: string) => {
    setFavoriteIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleDownload = (track: MusicTrack) => {
    setDownloadingId(track.id);
    // Simular download quântico
    setTimeout(() => {
      setDownloadedIds(prev => new Set([...prev, track.id]));
      setDownloadingId(null);
      alert(`✅ "${track.title}" baixada em Alta Fidelidade (Lossless)! Disponível no Nexus Drive.`);
    }, 2500);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Lado Esquerdo: Player & Playlist */}
        <div className="flex-1 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">Nexus Music</h2>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">Streaming & Downloads Lossless</p>
            </div>
            <div className="bg-indigo-600 text-white p-3 rounded-2xl shadow-xl">
              <Headphones className="w-6 h-6" />
            </div>
          </div>

          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Pesquisar artistas, álbuns ou podcasts..." 
              className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl py-4 pl-12 pr-6 text-sm font-medium shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
               <h3 className="font-black text-slate-900 dark:text-white uppercase text-xs tracking-widest flex items-center gap-2">
                 <ListMusic className="w-4 h-4 text-indigo-600" /> Top Tendências
               </h3>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">4 Músicas</span>
            </div>
            <div className="divide-y divide-slate-50 dark:divide-slate-800">
              {MOCK_TRACKS.map((track) => (
                <div 
                  key={track.id} 
                  onClick={() => setActiveTrack(track)}
                  className={`flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer group ${activeTrack?.id === track.id ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img src={track.cover} className="w-12 h-12 rounded-xl object-cover shadow-sm" alt={track.title} />
                      {activeTrack?.id === track.id && isPlaying && (
                        <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
                          <div className="flex gap-0.5 items-end h-4">
                            <div className="w-1 bg-white animate-bounce h-2" />
                            <div className="w-1 bg-white animate-bounce h-4 delay-75" />
                            <div className="w-1 bg-white animate-bounce h-3 delay-150" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white">{track.title}</h4>
                      <p className="text-[10px] font-bold text-slate-500 uppercase">{track.artist} • {track.genre}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black text-slate-400">{track.duration}</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(track.id); }}
                      className={`p-2 rounded-xl transition-all ${
                        favoriteIds.has(track.id) ? 'text-rose-500 bg-rose-50 dark:bg-rose-500/10' : 
                        'text-slate-300 hover:text-rose-500 hover:bg-rose-50'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${favoriteIds.has(track.id) ? 'fill-current' : ''}`} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDownload(track); }}
                      disabled={downloadingId === track.id}
                      className={`p-2 rounded-xl transition-all ${
                        downloadedIds.has(track.id) ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' : 
                        'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50'
                      }`}
                    >
                      {downloadingId === track.id ? <Loader2 className="w-5 h-5 animate-spin" /> : 
                       downloadedIds.has(track.id) ? <CheckCircle2 className="w-5 h-5" /> : <Download className="w-5 h-5" />}
                    </button>
                    <button className="text-slate-300 hover:text-slate-600"><MoreVertical className="w-5 h-5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lado Direito: Player Visual & Recomendações */}
        <div className="w-full md:w-[380px] space-y-6">
          <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-black rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden">
             <div className="relative z-10 flex flex-col items-center">
                <div className="w-full aspect-square rounded-[2rem] overflow-hidden shadow-2xl mb-8 group relative">
                   <img src={activeTrack?.cover} className={`w-full h-full object-cover transition-transform duration-1000 ${isPlaying ? 'scale-110' : ''}`} />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-20 h-20 bg-white text-slate-950 rounded-full flex items-center justify-center shadow-2xl transform transition-all hover:scale-110 active:scale-95"
                      >
                        {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-2" />}
                      </button>
                   </div>
                </div>

                <div className="text-center mb-8">
                   <h3 className="text-2xl font-black mb-1">{activeTrack?.title}</h3>
                   <div className="flex items-center justify-center gap-2">
                      <p className="text-indigo-400 font-bold uppercase tracking-widest text-xs">{activeTrack?.artist}</p>
                      {activeTrack && favoriteIds.has(activeTrack.id) && (
                        <Heart className="w-3 h-3 text-rose-500 fill-current" />
                      )}
                   </div>
                </div>

                <div className="w-full space-y-6">
                   <div className="flex items-center justify-between mb-2">
                      <button 
                        onClick={() => activeTrack && toggleFavorite(activeTrack.id)}
                        className={`p-3 rounded-2xl transition-all ${
                          activeTrack && favoriteIds.has(activeTrack.id) ? 'bg-rose-500/20 text-rose-500' : 'bg-white/5 text-white/40 hover:text-white'
                        }`}
                      >
                        <Heart className={`w-6 h-6 ${activeTrack && favoriteIds.has(activeTrack.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button className="p-3 bg-white/5 text-white/40 hover:text-white rounded-2xl transition-all">
                        <Download className="w-6 h-6" />
                      </button>
                   </div>

                   <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black text-indigo-300 uppercase">0:45</span>
                      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                         <div className="bg-indigo-500 h-full w-[30%]" />
                      </div>
                      <span className="text-[10px] font-black text-indigo-300 uppercase">{activeTrack?.duration}</span>
                   </div>

                   <div className="flex items-center justify-center gap-8">
                      <button className="text-white/40 hover:text-white transition-colors"><SkipBack className="w-8 h-8" /></button>
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="bg-white text-slate-950 p-5 rounded-full shadow-xl"
                      >
                        {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                      </button>
                      <button className="text-white/40 hover:text-white transition-colors"><SkipForward className="w-8 h-8" /></button>
                   </div>
                </div>
             </div>

             <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] pointer-events-none" />
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
             <div className="flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-amber-500" />
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Insights Musais IA</h4>
             </div>
             <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium italic">
               "Com base no seu gosto por Afrobeat, você pode adorar a nova track 'Neon Savannah' sintetizada por nossa IA."
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicHub;
