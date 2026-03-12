
import React, { useState, useEffect } from 'react';
import { 
  Gift, Zap, Star, TrendingUp, 
  PlayCircle, UserPlus, CheckCircle2, 
  ChevronRight, Wallet, Award, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { notificationService } from '../services/notificationService';

const RewardModule: React.FC = () => {
  const [points, setPoints] = useState(1250);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Assistir 5 Vídeos', reward: 10, progress: 3, total: 5, icon: PlayCircle, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/20' },
    { id: 2, title: 'Convidar 1 Amigo', reward: 50, progress: 0, total: 1, icon: UserPlus, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/20' },
    { id: 3, title: 'Completar Perfil', reward: 25, progress: 1, total: 1, icon: CheckCircle2, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/20', completed: true },
    { id: 4, title: 'Primeira Venda', reward: 100, progress: 0, total: 1, icon: TrendingUp, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-950/20' },
  ]);

  const handleClaim = (taskId: number, reward: number) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, claimed: true } : t));
    setPoints(prev => prev + reward);
    
    notificationService.notify('Recompensa Coletada!', {
      body: `Você resgatou ${reward} MT de bônus!`,
      type: 'reward' as any
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 pb-32">
      {/* Header / Wallet */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-900 rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden mb-10">
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Saldo de Recompensas</p>
              <h2 className="text-4xl font-black tabular-nums">{points.toLocaleString()} <span className="text-lg font-medium opacity-60">MT</span></h2>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button className="flex-1 bg-white text-indigo-600 py-4 rounded-2xl font-black text-xs shadow-xl active:scale-95 transition-all uppercase tracking-widest">Sacar Agora</button>
            <button className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-md py-4 rounded-2xl font-black text-xs transition-all uppercase tracking-widest">Histórico</button>
          </div>
        </div>
        <Sparkles className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 -rotate-12" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Daily Tasks */}
        <section className="space-y-6">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Missões Diárias</h3>
            <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Complete e ganhe dinheiro real</p>
          </div>

          <div className="space-y-4">
            {tasks.map(task => (
              <div 
                key={task.id}
                className={`bg-white dark:bg-slate-900 p-5 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex items-center gap-5 transition-all ${task.claimed ? 'opacity-50' : 'hover:shadow-lg'}`}
              >
                <div className={`${task.bg} ${task.color} p-4 rounded-2xl`}>
                  <task.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase italic">{task.title}</h4>
                  <div className="mt-2 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${task.progress >= task.total ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                      style={{ width: `${(task.progress / task.total) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <p className="text-[9px] font-bold text-slate-400 uppercase">{task.progress}/{task.total} Concluído</p>
                    <p className="text-[9px] font-black text-indigo-500 uppercase">+{task.reward} MT</p>
                  </div>
                </div>
                
                {task.progress >= task.total && !task.claimed ? (
                  <button 
                    onClick={() => handleClaim(task.id, task.reward)}
                    className="bg-emerald-500 text-white p-3 rounded-xl shadow-lg shadow-emerald-500/20 animate-bounce"
                  >
                    <Gift className="w-5 h-5" />
                  </button>
                ) : task.claimed ? (
                  <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl text-slate-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="p-3 text-slate-300">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Bonus Section */}
        <section className="space-y-6">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Bônus Especial</h3>
            <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Oportunidades únicas de hoje</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <div className="bg-amber-500/10 p-4 rounded-3xl w-fit mb-6">
                <Zap className="w-8 h-8 text-amber-500" />
              </div>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-2">Multiplicador 2x</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                Todas as suas vendas no Marketplace hoje renderão o dobro de pontos de recompensa!
              </p>
              <button className="w-full bg-amber-500 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-amber-500/20 active:scale-95 transition-all">Ativar Bônus</button>
            </div>
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl" />
          </div>

          <div className="bg-indigo-600 rounded-[3rem] p-8 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h4 className="text-lg font-black uppercase italic tracking-tighter">Ranking Semanal</h4>
                <p className="text-[10px] font-bold uppercase opacity-60">Você está em #42</p>
              </div>
              <button className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                <TrendingUp className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RewardModule;
