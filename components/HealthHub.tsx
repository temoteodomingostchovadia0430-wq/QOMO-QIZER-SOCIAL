
import React, { useState } from 'react';
import { Heart, Eye, Activity, ShieldCheck, Target, TrendingUp, Clock, Wind, Moon, Sun } from 'lucide-react';

const HealthHub: React.FC = () => {
  const [activeProgram, setActiveProgram] = useState<string | null>('eye');
  
  const programs = [
    { id: 'eye', name: 'Proteção Visual 20-20-20', desc: 'Alertas a cada 20min para evitar fadiga ocular.', icon: Eye, color: 'text-amber-500', progress: 85 },
    { id: 'focus', name: 'Foco de Alta Performance', desc: 'Sessões de 45min sem notificações externas.', icon: Target, color: 'text-indigo-500', progress: 40 },
    { id: 'posture', name: 'Alerta de Postura IA', desc: 'Monitoramento via webcam para ergonomia.', icon: Activity, color: 'text-emerald-500', progress: 60 },
    { id: 'breath', name: 'Respiração Quântica', desc: 'Exercícios guiados de relaxamento profundo.', icon: Wind, color: 'text-blue-500', progress: 10 },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase leading-none">Controle de Saúde</h2>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-2">Equilíbrio perfeito entre vida e tecnologia</p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 px-6 py-3 rounded-[1.5rem] flex items-center gap-3">
           <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
           <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">Proteção Ativa</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
             <div className="flex items-center justify-between mb-8">
                <h3 className="font-black text-lg uppercase italic text-slate-900 dark:text-white">Programas Disponíveis</h3>
                <Activity className="w-5 h-5 text-indigo-600" />
             </div>

             <div className="grid grid-cols-1 gap-4">
                {programs.map(prog => (
                  <button 
                    key={prog.id}
                    onClick={() => setActiveProgram(prog.id)}
                    className={`flex items-center justify-between p-6 rounded-[2rem] border-2 transition-all text-left group ${activeProgram === prog.id ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-50 dark:border-slate-800 hover:border-slate-100'}`}
                  >
                    <div className="flex items-center gap-5">
                      <div className={`p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm ${prog.color}`}>
                        <prog.icon className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 dark:text-white uppercase text-sm tracking-tight">{prog.name}</h4>
                        <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">{prog.desc}</p>
                        <div className="mt-3 w-32 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                           <div className={`h-full ${activeProgram === prog.id ? 'bg-indigo-600' : 'bg-slate-300'}`} style={{ width: `${prog.progress}%` }} />
                        </div>
                      </div>
                    </div>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${activeProgram === prog.id ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200'}`}>
                      {activeProgram === prog.id && <ShieldCheck className="w-4 h-4" />}
                    </div>
                  </button>
                ))}
             </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-gradient-to-br from-indigo-700 to-indigo-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                 <div className="flex items-center gap-2 mb-6">
                    <Moon className="w-5 h-5 text-indigo-200" />
                    <h4 className="text-xs font-black uppercase tracking-widest">Higiene do Sono</h4>
                 </div>
                 <p className="text-sm italic opacity-80 mb-8 leading-relaxed">"Seu tempo de exposição à luz azul reduziu 22% esta semana. Qualidade do sono melhorada."</p>
                 <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[10px] font-black uppercase">Consistência</span>
                       <span className="text-lg font-black italic">8.5/10</span>
                    </div>
                    <div className="w-full bg-white/20 h-1 rounded-full">
                       <div className="bg-white h-full w-[85%]" />
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 text-center">
              <Heart className="w-10 h-10 text-rose-500 mx-auto mb-4 animate-pulse" />
              <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase italic">Nexus AI Coach</h4>
              <p className="text-[10px] text-slate-500 font-bold mt-2 leading-relaxed">BEBA ÁGUA! <br/> Sua meta é 3L hoje. <br/> Progresso: 1.2L</p>
              <button className="mt-6 w-full bg-slate-50 dark:bg-slate-800 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-indigo-600">Registrar Copo</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default HealthHub;
