
import React, { useState } from 'react';
import { Calendar as CalendarIcon, ListTodo, ChevronLeft, ChevronRight, Plus, Clock, Star, Zap } from 'lucide-react';

// Completed the truncated component and added default export
const PlannerModule: React.FC = () => {
  const [view, setView] = useState<'calendar' | 'agenda'>('calendar');
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 p-3 rounded-2xl shadow-xl">
            <CalendarIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">Planejador Quantum</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sincronizado com Agenda IA</p>
          </div>
        </div>
        
        <div className="flex p-1 bg-slate-100 rounded-2xl">
          <button 
            onClick={() => setView('calendar')}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${view === 'calendar' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
          >Calendário</button>
          <button 
            onClick={() => setView('agenda')}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${view === 'agenda' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
          >Agenda</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lado Esquerdo: Calendário/Agenda principal */}
        <div className="lg:col-span-2">
          {view === 'calendar' ? (
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-black text-lg">Outubro 2024</h3>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-slate-50 rounded-xl transition-all"><ChevronLeft className="w-5 h-5" /></button>
                  <button className="p-2 hover:bg-slate-50 rounded-xl transition-all"><ChevronRight className="w-5 h-5" /></button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map(d => (
                  <div key={d} className="text-center text-[10px] font-black text-slate-400 uppercase pb-4">{d}</div>
                ))}
                {days.map(d => (
                  <button key={d} className={`aspect-square rounded-2xl flex items-center justify-center text-sm font-bold transition-all relative group ${d === 12 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'hover:bg-slate-50 text-slate-700'}`}>
                    {d}
                    {d % 7 === 0 && <div className="absolute bottom-2 w-1 h-1 bg-rose-500 rounded-full" />}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {[
                { time: '09:00', task: 'Reunião Nexus Team', priority: 'high' },
                { time: '11:30', task: 'Design Review: Security Module', priority: 'medium' },
                { time: '15:00', task: 'Nexus Pay Beta Test', priority: 'high' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center justify-between group hover:border-indigo-200 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-50 p-3 rounded-2xl group-hover:bg-indigo-50">
                      <Clock className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.time}</p>
                      <h4 className="font-bold text-slate-900">{item.task}</h4>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${item.priority === 'high' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'}`}>
                    {item.priority}
                  </div>
                </div>
              ))}
              <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 text-xs font-black uppercase tracking-widest hover:border-indigo-200 hover:text-indigo-600 transition-all flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Adicionar Evento
              </button>
            </div>
          )}
        </div>

        {/* Lado Direito: Recomendações IA */}
        <div className="space-y-6">
          <div className="bg-indigo-900 rounded-[2.5rem] p-6 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-indigo-300" />
                <h4 className="text-xs font-black uppercase tracking-widest">Nexus AI Insights</h4>
              </div>
              <p className="text-xs text-indigo-100 leading-relaxed italic">
                "Notei um buraco na sua agenda na Quinta-feira. Que tal agendar uma sessão de foco para o Nexus Studio?"
              </p>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
          </div>

          <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Metas Semanais</h4>
             <div className="space-y-4">
               {[
                 { label: 'Completar App.tsx', progress: 85, color: 'bg-indigo-500' },
                 { label: 'Nexus Pay UI', progress: 40, color: 'bg-emerald-500' },
               ].map((goal, i) => (
                 <div key={i} className="space-y-1">
                   <div className="flex justify-between text-[10px] font-bold">
                     <span className="text-slate-600">{goal.label}</span>
                     <span className="text-slate-900">{goal.progress}%</span>
                   </div>
                   <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                     <div className={`h-full ${goal.color}`} style={{ width: `${goal.progress}%` }} />
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerModule;
