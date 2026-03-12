
import React from 'react';
import { BarChart3, TrendingUp, Users, Eye, Target, Zap, Award, CheckCircle2, Star, Clock } from 'lucide-react';

const StatisticsHub: React.FC = () => {
  const challenges = [
    { id: 1, title: 'Maestro dos Snaps', task: 'Publique 5 Snaps esta semana', progress: 3, total: 5, reward: 'Badge Especial' },
    { id: 2, title: 'Alcance Global', task: 'Obtenha 2k visualizações totais', progress: 1450, total: 2000, reward: 'Verificação Grátis (7d)' },
    { id: 3, title: 'Incentivador', task: 'Apoie 3 criadores diferentes', progress: 1, total: 3, reward: '10 Nexus Credits' },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">Minhas Estatísticas</h2>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">Análise de Performance Nexus</p>
        </div>
        <div className="bg-indigo-600 text-white px-6 py-2 rounded-2xl flex items-center gap-3">
           <Award className="w-5 h-5" />
           <span className="text-[10px] font-black uppercase tracking-widest">Nível 12 Criador</span>
        </div>
      </div>

      {/* Grid de Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
         {[
           { label: 'Alcance Médio', val: '8.4k', icon: Eye, color: 'text-blue-500' },
           { label: 'Engajamento', val: '12.8%', icon: Zap, color: 'text-amber-500' },
           { label: 'Crescimento', val: '+24%', icon: TrendingUp, color: 'text-emerald-500' },
         ].map((stat, i) => (
           <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
              <div className={`${stat.color} mb-6 transition-transform group-hover:scale-110`}><stat.icon className="w-8 h-8" /></div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white">{stat.val}</h4>
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 <stat.icon className="w-24 h-24" />
              </div>
           </div>
         ))}
      </div>

      {/* Dedicação e Streak */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-[3rem] p-8 mb-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Zap className="w-40 h-40" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter">Nível de Dedicação</h3>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-slate-900 flex items-center justify-center ${i <= 4 ? 'bg-amber-500' : 'bg-slate-700'}`}>
                    <Star className="w-4 h-4 text-white fill-current" />
                  </div>
                ))}
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-300 ml-2">4/5 Estrelas</span>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300 mb-1">Streak Atual</p>
              <h4 className="text-4xl font-black italic">12 Dias</h4>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300 mb-1">Pontos Totais</p>
              <h4 className="text-4xl font-black italic">4,250</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Desafios Semanais */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
           <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <Target className="w-4 h-4" /> Desafios Semanais
           </h3>
           <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">Reseta em 2 dias</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {challenges.map(challenge => {
            const perc = (challenge.progress / challenge.total) * 100;
            return (
              <div key={challenge.id} className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
                 <div className="flex justify-between items-start mb-4">
                    <div>
                       <h4 className="font-black text-slate-900 dark:text-white uppercase italic">{challenge.title}</h4>
                       <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">{challenge.task}</p>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-500/10 p-2 rounded-xl text-amber-500">
                       <Star className="w-4 h-4 fill-current" />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                       <span className="text-slate-400">Progresso</span>
                       <span className="text-indigo-600">{challenge.progress} / {challenge.total}</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                       <div className="bg-indigo-600 h-full transition-all duration-1000" style={{ width: `${perc}%` }} />
                    </div>
                 </div>

                 <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                    <span className="text-[9px] font-black text-emerald-600 uppercase">Prémio: {challenge.reward}</span>
                    {perc === 100 ? (
                      <button className="bg-emerald-500 text-white px-4 py-1.5 rounded-xl text-[9px] font-black uppercase">RESGATAR</button>
                    ) : (
                      <span className="text-[9px] font-black text-slate-300 uppercase italic">EM CURSO</span>
                    )}
                 </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatisticsHub;
