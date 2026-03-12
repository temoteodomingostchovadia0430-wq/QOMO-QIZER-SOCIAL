
import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  MessageSquare, 
  ShieldCheck, 
  Zap, 
  CreditCard, 
  Smartphone, 
  ChevronRight, 
  ChevronDown,
  LifeBuoy,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const FAQ_DATA: FAQItem[] = [
  { id: 1, category: 'pay', question: 'Quanto tempo leva uma transferência e-Mola?', answer: 'As transferências internas e para e-Mola são processadas em tempo real. Em casos raros de congestionamento da rede móvel, pode levar até 5 minutos.' },
  { id: 2, category: 'security', question: 'O que é a Proteção Quântica?', answer: 'É a nossa tecnologia de criptografia de ponta que fragmenta seus dados em múltiplos "shards" digitais, tornando-os ilegíveis para qualquer pessoa, inclusive investigadores externos sem sua chave biométrica.' },
  { id: 3, category: 'creative', question: 'Como baixar vídeos do Creative Studio?', answer: 'Após a geração do vídeo, um botão "Download" aparecerá abaixo da prévia. O arquivo será salvo diretamente no seu Nexus Drive e na galeria do dispositivo.' },
  { id: 4, category: 'technical', question: 'O Nexus funciona sem internet?', answer: 'Sim! Funções básicas como Notas e visualização de arquivos do Nexus Drive estão disponíveis offline. Funções financeiras e sociais exigem conexão.' },
];

const SupportModule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const categories = [
    { id: 'pay', label: 'Finanças & Pagamentos', icon: CreditCard, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 'security', label: 'Segurança & Privacidade', icon: ShieldCheck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'creative', label: 'Nexus Studio (IA)', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 'technical', label: 'Conta & Dispositivos', icon: Smartphone, color: 'text-blue-500', bg: 'bg-blue-50' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in duration-500 pb-32">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="bg-indigo-600 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-200">
           <LifeBuoy className="w-8 h-8 text-white animate-pulse" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">Central de Ajuda Nexus</h2>
        <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-2">Como podemos guiar seu universo hoje?</p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto mb-16">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Pesquise por 'Segurança', 'M-Pesa', 'Resetar senha'..."
          className="w-full bg-white dark:bg-slate-900 border-none rounded-[2.5rem] py-6 pl-16 pr-8 text-lg font-medium shadow-xl shadow-slate-200/50 dark:shadow-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white"
        />
      </div>

      {/* Grid de Categorias */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {categories.map(cat => (
          <button key={cat.id} className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all group flex flex-col items-center text-center">
            <div className={`${cat.bg} ${cat.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <cat.icon className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest leading-tight">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Status do Sistema */}
      <div className="bg-slate-900 dark:bg-slate-800 rounded-[3rem] p-8 text-white mb-16 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
           <div>
              <h3 className="text-xl font-black uppercase italic tracking-tighter mb-2">Status do Ecossistema</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Monitoramento em Tempo Real Node MZ-01</p>
           </div>
           <div className="flex flex-wrap gap-4">
              {[
                { label: 'Servidores', status: 'online' },
                { label: 'M-Pesa/e-Mola', status: 'online' },
                { label: 'Gerador IA', status: 'delayed' }
              ].map((s, i) => (
                <div key={i} className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2">
                   <div className={`w-2 h-2 rounded-full ${s.status === 'online' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
                   <span className="text-[9px] font-black uppercase tracking-widest">{s.label}: {s.status === 'online' ? 'Estável' : 'Lento'}</span>
                </div>
              ))}
           </div>
        </div>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      {/* FAQ Section */}
      <div className="space-y-6">
        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 flex items-center gap-2">
          <HelpCircle className="w-4 h-4" /> Perguntas Frequentes
        </h3>
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
          {FAQ_DATA.map((item, idx) => (
            <div key={item.id} className={`${idx !== FAQ_DATA.length - 1 ? 'border-b border-slate-50 dark:border-slate-800' : ''}`}>
               <button 
                 onClick={() => setOpenFaq(openFaq === item.id ? null : item.id)}
                 className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all"
               >
                  <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight italic">{item.question}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-300 transition-transform ${openFaq === item.id ? 'rotate-180' : ''}`} />
               </button>
               {openFaq === item.id && (
                 <div className="px-6 pb-6 animate-in slide-in-from-top-2">
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      {item.answer}
                    </p>
                 </div>
               )}
            </div>
          ))}
        </div>
      </div>

      {/* Contato IA */}
      <div className="mt-16 flex flex-col md:flex-row items-center gap-8 bg-indigo-50 dark:bg-indigo-900/10 p-10 rounded-[4rem] border border-indigo-100 dark:border-indigo-800">
         <div className="flex-1">
            <h4 className="text-2xl font-black text-indigo-900 dark:text-indigo-100 uppercase italic tracking-tighter mb-2">Ainda com Dúvidas?</h4>
            <p className="text-sm text-indigo-700 dark:text-indigo-300 font-medium leading-relaxed">Nossa IA Guia Nexus está pronta para resolver qualquer problema técnico ou financeiro em segundos.</p>
         </div>
         <button className="bg-indigo-600 text-white px-10 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-300 dark:shadow-none flex items-center gap-3 hover:scale-105 active:scale-95 transition-all">
            <MessageSquare className="w-5 h-5 fill-current" /> Falar com Guia Nexus
         </button>
      </div>
    </div>
  );
};

export default SupportModule;
