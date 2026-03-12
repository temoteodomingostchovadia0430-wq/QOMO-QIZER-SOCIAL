
import React from 'react';
import { 
  Megaphone, 
  TrendingUp, 
  Eye, 
  MousePointer2, 
  Target, 
  BarChart3, 
  Plus, 
  Settings, 
  ChevronRight,
  ShieldCheck,
  Zap,
  DollarSign,
  Filter,
  Calendar
} from 'lucide-react';

const AdManager: React.FC = () => {
  const campaigns = [
    { id: 'ad1', title: 'Nexus Tech Promo - Inverno 2024', status: 'Ativa', reach: '45.2k', clicks: '1.2k', spend: '2,500 MT', roi: '+12%', type: 'Tráfego' },
    { id: 'ad2', title: 'Curso de React Pro - Turma 05', status: 'Pausada', reach: '12k', clicks: '450', spend: '1,000 MT', roi: '+5%', type: 'Conversão' },
    { id: 'ad3', title: 'Software Boutique - Landing Page', status: 'Concluída', reach: '89k', clicks: '4.8k', spend: '5,000 MT', roi: '+18%', type: 'Alcance' },
  ];

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Gerenciador de Anúncios</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Conta: Nexus Business Node #001</p>
        </div>
        <div className="flex gap-2">
           <button className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <Calendar className="w-5 h-5" />
           </button>
           <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all">
              <Plus className="w-5 h-5" /> Criar anúncio
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 mb-8">
         {[
           { label: 'Alcance Total', val: '146.2k', icon: Eye, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
           { label: 'Impressões', val: '280.4k', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
           { label: 'Cliques Unícos', val: '6.4k', icon: MousePointer2, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
           { label: 'Gasto Mensal', val: '8,500 MT', icon: DollarSign, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
         ].map(stat => (
           <div key={stat.label} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between group hover:border-indigo-500 transition-all">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{stat.label}</p>
                  <h4 className="text-2xl font-black text-slate-900 dark:text-white">{stat.val}</h4>
                </div>
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
           </div>
         ))}
      </div>

      <div className="space-y-4">
        <div className="p-4 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800">
           <div className="flex gap-4">
              <button className="flex items-center gap-2 text-[10px] font-black uppercase text-indigo-600 border-b-2 border-indigo-600 pb-1">Campanhas</button>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 hover:text-slate-600 transition-colors pb-1">Conjuntos</button>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 hover:text-slate-600 transition-colors pb-1">Anúncios</button>
           </div>
           <button className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500"><Filter className="w-3 h-3" /> Filtro</button>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {campaigns.map(campaign => (
            <div key={campaign.id} className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex flex-col gap-6">
                {/* Header do Card */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                      <Megaphone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase italic tracking-tighter group-hover:text-indigo-500 transition-colors">{campaign.title}</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ID: {campaign.id.toUpperCase()} • {campaign.type}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-full ${
                    campaign.status === 'Ativa' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 
                    campaign.status === 'Pausada' ? 'bg-slate-100 text-slate-500 border border-slate-200' : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                  }`}>
                    {campaign.status}
                  </span>
                </div>

                {/* Grid de Informações Verticais */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Alcance</span>
                    <span className="text-sm font-black text-slate-900 dark:text-white">{campaign.reach}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Cliques</span>
                    <span className="text-sm font-black text-slate-900 dark:text-white">{campaign.clicks}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Gasto Total</span>
                    <span className="text-sm font-black text-emerald-500">{campaign.spend}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">ROI</span>
                    <span className="text-sm font-black text-indigo-500">{campaign.roi}</span>
                  </div>
                </div>

                {/* Rodapé do Card */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800" />
                      ))}
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">Público Ativo</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">
                      <BarChart3 className="w-3.5 h-3.5" /> Relatório
                    </button>
                    <button className="p-2 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-indigo-50 dark:bg-indigo-950/20 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-900/30 flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="flex items-center gap-4">
            <div className="bg-indigo-600 p-3 rounded-xl text-white shadow-lg shadow-indigo-100 dark:shadow-none">
               <Zap className="w-6 h-6 fill-current" />
            </div>
            <div>
               <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight italic">Nexus AI Advise</h4>
               <p className="text-xs text-slate-500 font-medium">Sua campanha "Nexus Tech Promo" pode aumentar o ROI em 15% se você reduzir o público para Maputo.</p>
            </div>
         </div>
         <button className="bg-white dark:bg-slate-800 text-indigo-600 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-sm border border-indigo-100 dark:border-indigo-900/50 hover:bg-indigo-50 transition-all">Aplicar Sugestão</button>
      </div>
    </div>
  );
};

export default AdManager;
