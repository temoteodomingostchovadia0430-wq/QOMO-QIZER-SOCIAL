
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Tv, Film, Monitor, Search, Star, Wifi, Info, Zap, 
  Settings2, CheckCircle2, ShoppingBag, Trophy, PlaySquare, 
  Globe, Radio, Cast, LayoutGrid, ChevronLeft, ChevronRight
} from 'lucide-react';
import { MediaItem } from '../types';

const EntertainmentHub: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'mz' | 'netflix' | 'sports' | 'dramas'>('all');
  const [quality, setQuality] = useState<'HD' | '4K'>(() => {
    const saved = localStorage.getItem('nexus_streaming_quality');
    return (saved === 'HD' || saved === '4K') ? saved : '4K';
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredItems = [
    {
      id: 'f1',
      title: 'O Mundo em 4K',
      subtitle: 'Nexus TV Box • Live: Moçambola',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=2025',
      badge: 'Live: Moçambola',
      badgeColor: 'bg-rose-600'
    },
    {
      id: 'f2',
      title: 'O Código de Maputo',
      subtitle: 'Original Nexus • Suspense',
      image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=2025',
      badge: 'Estreia',
      badgeColor: 'bg-indigo-600'
    },
    {
      id: 'f3',
      title: 'Champions League',
      subtitle: 'Final: Real Madrid vs Man City',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=2025',
      badge: 'Exclusivo',
      badgeColor: 'bg-blue-600'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);

  const mediaItems: MediaItem[] = [
    // Canais de Moçambique
    { id: 'mz1', title: 'TVM 1 - Notícias', thumbnail: 'https://images.unsplash.com/photo-1585829365234-781fcd50c3ef?q=80&w=400&h=225&fit=crop', category: 'mz', provider: 'TVM' },
    { id: 'mz2', title: 'Stv - Entretenimento', thumbnail: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=400&h=225&fit=crop', category: 'mz', provider: 'Soico' },
    { id: 'mz3', title: 'Miramar - Reality', thumbnail: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=400&h=225&fit=crop', category: 'mz', provider: 'Miramar' },
    
    // Futebol & Esportes
    { id: 'sp1', title: 'Moçambola: Costa do Sol vs Bulls', thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400&h=225&fit=crop', category: 'sports', provider: 'Nexus Sports' },
    { id: 'sp2', title: 'Champions League Live', thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=400&h=225&fit=crop', category: 'sports', provider: 'TV Box' },
    
    // Netflix & Dramas
    { id: 'nf1', title: 'O Código de Maputo', thumbnail: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=400&h=600&fit=crop', category: 'netflix', provider: 'Netflix', rating: '9.5' },
    { id: 'dr1', title: 'Amor Quântico (DramaBox)', thumbnail: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed0963c?q=80&w=400&h=600&fit=crop', category: 'dramas', provider: 'DramaBox', rating: '4.8' },
  ];

  const filteredItems = activeCategory === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-32 animate-in fade-in duration-700">
      {/* Featured Carousel */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img 
              src={featuredItems[currentSlide].image} 
              className="w-full h-full object-cover opacity-60"
              alt={featuredItems[currentSlide].title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            
            <div className="absolute bottom-16 left-8 right-8 max-w-4xl">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-4">
                   <span className={`${featuredItems[currentSlide].badgeColor} text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg`}>
                     {featuredItems[currentSlide].badge}
                   </span>
                   <span className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">
                     {featuredItems[currentSlide].subtitle}
                   </span>
                </div>
                <h1 className="text-5xl sm:text-7xl font-black mb-6 tracking-tighter uppercase italic leading-none">
                  {featuredItems[currentSlide].title}
                </h1>
                <div className="flex gap-4">
                   <button className="bg-white text-slate-950 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10 flex items-center gap-2">
                     <Play className="w-4 h-4 fill-current" /> Assistir Agora
                   </button>
                   <button className="bg-white/10 backdrop-blur-xl px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2">
                     <Info className="w-4 h-4" /> Detalhes
                   </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls */}
        <div className="absolute bottom-16 right-8 flex items-center gap-4 z-20">
           <button 
            onClick={prevSlide}
            className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
           >
             <ChevronLeft className="w-6 h-6" />
           </button>
           <div className="flex gap-2">
             {featuredItems.map((_, idx) => (
               <button 
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 transition-all rounded-full ${currentSlide === idx ? 'w-8 bg-white' : 'w-2 bg-white/30'}`}
               />
             ))}
           </div>
           <button 
            onClick={nextSlide}
            className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
           >
             <ChevronRight className="w-6 h-6" />
           </button>
        </div>
      </div>

      <div className="px-6 -mt-8 relative z-10">
        {/* Categorias - O usuário pediu "Tudo que existe" */}
        <div className="flex items-center gap-3 overflow-x-auto pb-6 scrollbar-hide">
          {[
            { id: 'all', label: 'Tudo', icon: LayoutGrid },
            { id: 'mz', label: 'Moçambique', icon: Globe },
            { id: 'sports', label: 'Futebol', icon: Trophy },
            { id: 'netflix', label: 'Netflix', icon: Film },
            { id: 'dramas', label: 'DramaBox', icon: PlaySquare },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap border ${
                activeCategory === cat.id ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-500/20' : 'bg-slate-900 border-white/5 text-slate-400 hover:border-white/20'
              }`}
            >
              <cat.icon className="w-4 h-4" /> {cat.label}
            </button>
          ))}
        </div>

        {/* Grade de Conteúdo */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredItems.map(item => (
            <div key={item.id} className="group relative rounded-2xl overflow-hidden cursor-pointer hover:ring-4 ring-indigo-500/50 transition-all">
              <div className={`aspect-video ${item.category === 'netflix' || item.category === 'dramas' ? 'aspect-[2/3]' : ''} relative`}>
                 <img src={item.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="w-10 h-10 fill-white" />
                 </div>
                 {item.rating && (
                   <div className="absolute top-2 left-2 bg-yellow-400 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> {item.rating}
                   </div>
                 )}
              </div>
              <div className="p-3 bg-slate-900/50 backdrop-blur-md">
                 <h4 className="text-[11px] font-black uppercase truncate">{item.title}</h4>
                 <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">{item.provider}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Ad-Section / Upgrade */}
        <div className="mt-12 bg-gradient-to-r from-indigo-900 to-indigo-600 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10 shadow-2xl">
           <div className="flex items-center gap-6">
              <div className="bg-white/20 p-4 rounded-2xl"><Cast className="w-8 h-8 text-white" /></div>
              <div>
                 <h3 className="text-xl font-black italic uppercase tracking-tighter">Nexus TV Box Pro</h3>
                 <p className="text-xs text-indigo-100 font-medium max-w-sm">Assista mais de 2000 canais mundiais sem gastar megas adicionais. Oferta exclusiva para Node MZ.</p>
              </div>
           </div>
           <button className="bg-white text-indigo-900 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
              SABER MAIS
           </button>
        </div>
      </div>
    </div>
  );
};

export default EntertainmentHub;
