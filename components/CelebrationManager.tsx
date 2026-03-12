
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cake, PartyPopper, X, Award, Star, TrendingUp } from 'lucide-react';
import { User, Post } from '../types';

interface CelebrationManagerProps {
  currentUser: User;
  posts: Post[];
}

const CelebrationManager: React.FC<CelebrationManagerProps> = ({ currentUser, posts }) => {
  const [celebration, setCelebration] = useState<{ type: 'birthday' | 'ad_anniversary', title: string, message: string } | null>(null);

  useEffect(() => {
    const today = new Date();
    const todayStr = today.toISOString().slice(5, 10); // MM-DD

    // Check User Birthday
    if (currentUser.birthday && currentUser.birthday.slice(5, 10) === todayStr) {
      const lastCelebrated = localStorage.getItem(`celebrated_birthday_${currentUser.id}_${today.getFullYear()}`);
      if (!lastCelebrated) {
        setCelebration({
          type: 'birthday',
          title: `Feliz Aniversário, ${currentUser.name}! 🎂`,
          message: 'Parabéns por mais um ano de vida e por fazer parte da comunidade QOMO QIZER SOCIAL!'
        });
        localStorage.setItem(`celebrated_birthday_${currentUser.id}_${today.getFullYear()}`, 'true');
      }
    }

    // Check Ad Anniversaries (Publicity)
    posts.filter(p => p.isAd && p.adStartDate).forEach(ad => {
      const adDate = new Date(ad.adStartDate!);
      const isAnniversary = adDate.getMonth() === today.getMonth() && adDate.getDate() === today.getDate() && adDate.getFullYear() < today.getFullYear();
      
      if (isAnniversary) {
        const lastCelebrated = localStorage.getItem(`celebrated_ad_${ad.id}_${today.getFullYear()}`);
        if (!lastCelebrated) {
          setCelebration({
            type: 'ad_anniversary',
            title: `Aniversário de Publicidade! 🚀`,
            message: `A campanha "${ad.title || 'Sua Publicidade'}" completou 1 ano de sucesso no QOMO QIZER!`
          });
          localStorage.setItem(`celebrated_ad_${ad.id}_${today.getFullYear()}`, 'true');
        }
      }
    });
  }, [currentUser, posts]);

  if (!celebration) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 max-w-md w-full shadow-2xl border border-white/20 relative overflow-hidden">
          {/* Background Decorations */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl" />

          <button 
            onClick={() => setCelebration(null)}
            className="absolute top-6 right-6 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>

          <div className="text-center space-y-6 relative">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-xl shadow-indigo-500/20 animate-bounce">
              {celebration.type === 'birthday' ? (
                <Cake className="w-10 h-10 text-white" />
              ) : (
                <TrendingUp className="w-10 h-10 text-white" />
              )}
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
                {celebration.title}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                {celebration.message}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 py-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                <Award className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Bónus</p>
                <p className="text-xs font-black text-slate-900 dark:text-white">+500 XP</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                <Star className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Estatuto</p>
                <p className="text-xs font-black text-slate-900 dark:text-white">VIP</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                <PartyPopper className="w-5 h-5 text-pink-500 mx-auto mb-1" />
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Prémio</p>
                <p className="text-xs font-black text-slate-900 dark:text-white">Badge</p>
              </div>
            </div>

            <button 
              onClick={() => setCelebration(null)}
              className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-slate-900/10"
            >
              Obrigado!
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CelebrationManager;
