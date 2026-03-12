
import React, { useState } from 'react';
import { 
  Zap, 
  Wifi, 
  Smartphone, 
  Droplets, 
  ShoppingCart, 
  TrendingUp, 
  ChevronRight, 
  Search, 
  Flame, 
  Globe, 
  CreditCard,
  CheckCircle2,
  Clock,
  Smartphone as PhoneIcon,
  Loader2,
  ShieldCheck
} from 'lucide-react';

const ServicesModule: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'internet' | 'energy' | 'essential'>('all');
  const [selectedService, setSelectedService] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [isPaying, setIsPaying] = useState(false);
  const [step, setStep] = useState<'form' | 'success'>('form');

  const services = [
    { id: 'credelec', name: 'Credelec EDM', category: 'energy', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50', desc: 'Recarga de energia pré-paga', label: 'Número do Contador' },
    { id: 'fipag', name: 'Água FIPAG', category: 'essential', icon: Droplets, color: 'text-sky-500', bg: 'bg-sky-50', desc: 'Pagamento de faturas de água', label: 'Número de Contrato' },
    { id: 'vodacom', name: 'Vodacom Dados', category: 'internet', icon: Wifi, color: 'text-red-500', bg: 'bg-red-50', desc: 'Pacotes de Dados & Voz', label: 'Número de Telefone' },
    { id: 'movitel', name: 'Movitel Ofertas', category: 'internet', icon: Wifi, color: 'text-orange-500', bg: 'bg-orange-50', desc: 'Internet Ilimitada & e-Mola', label: 'Número Movitel' },
    { id: 'tmcel', name: 'Tmcel Recargas', category: 'internet', icon: Smartphone, color: 'text-yellow-500', bg: 'bg-yellow-50', desc: 'Saldo & Pacotes Giga', label: 'Número Tmcel' },
  ];

  const handlePayment = () => {
    if (!amount || !customerId) return;
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setStep('success');
    }, 2000);
  };

  const calculateCommission = (val: string) => {
    const n = parseFloat(val) || 0;
    return (n * 0.017).toFixed(2);
  };

  if (selectedService) {
    return (
      <div className="max-w-xl mx-auto py-8 px-4 animate-in zoom-in-95 duration-300">
        {step === 'form' ? (
          <>
            <button onClick={() => setSelectedService(null)} className="mb-6 text-slate-400 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:text-slate-900 transition-colors">
              <ChevronRight className="w-4 h-4 rotate-180" /> Cancelar Operação
            </button>
            
            <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden relative">
              <div className="flex items-center gap-4 mb-10">
                <div className={`${selectedService.bg} ${selectedService.color} p-4 rounded-2xl`}>
                  <selectedService.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">{selectedService.name}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{selectedService.desc}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{selectedService.label}</label>
                  <input 
                    type="text" 
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    placeholder="Introduza o ID..." 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl py-4 px-6 text-lg font-black focus:border-emerald-500 outline-none transition-all dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Valor (MT)</label>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00" 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl py-5 px-6 text-3xl font-black focus:border-emerald-500 outline-none transition-all dark:text-white"
                  />
                </div>

                <div className="bg-orange-50 dark:bg-orange-950/20 p-6 rounded-3xl border border-orange-100 dark:border-orange-900/30">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black text-orange-800 dark:text-orange-400 uppercase tracking-widest">Bónus e-Mola (1,70%)</span>
                    <span className="text-xl font-black text-[#F15A22]">+{calculateCommission(amount)} MT</span>
                  </div>
                  <p className="text-[9px] text-orange-600/70 font-bold uppercase">Cashback creditado após confirmação.</p>
                </div>

                <button 
                  onClick={handlePayment}
                  disabled={!amount || !customerId || isPaying}
                  className="w-full bg-emerald-600 text-white py-5 rounded-[2rem] font-black text-sm tracking-widest hover:bg-emerald-700 transition-all shadow-xl active:scale-95 uppercase flex items-center justify-center gap-3"
                >
                  {isPaying ? <Loader2 className="w-5 h-5 animate-spin" /> : <CreditCard className="w-5 h-5" />}
                  Confirmar Pagamento
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-12 shadow-2xl border border-slate-100 dark:border-slate-800 text-center animate-in zoom-in">
             <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-200">
                <CheckCircle2 className="w-10 h-10" />
             </div>
             <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-2">Sucesso Quântico!</h3>
             <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed">
               Seu pagamento para <b>{selectedService.name}</b> foi processado. O comprovativo foi enviado para o seu QOMO QIZER Drive.
             </p>
             <button 
               onClick={() => { setSelectedService(null); setStep('form'); setAmount(''); setCustomerId(''); }}
               className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest"
             >
               Finalizar
             </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase leading-none">QOMO QIZER Utilities</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2 italic">Soluções para o dia-a-dia de Moçambique</p>
        </div>
        <div className="relative w-full md:w-80">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
           <input type="text" placeholder="Qual conta pagar hoje?..." className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-xs font-black uppercase focus:ring-2 focus:ring-emerald-500 outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <button 
            key={service.id} 
            onClick={() => setSelectedService(service)}
            className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex flex-col gap-6 group hover:shadow-2xl hover:border-emerald-500 transition-all text-left relative overflow-hidden"
          >
            <div className={`${service.bg} ${service.color} w-16 h-16 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
              <service.icon className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-black text-slate-900 dark:text-white text-xl italic uppercase tracking-tighter">{service.name}</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em] mt-1">{service.desc}</p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
               <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-xl">e-Mola: +1.7% Bónus</span>
               <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
            </div>
          </button>
        ))}

        {/* Card Adicional para Mercado */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
           <div className="relative z-10">
              <div className="bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6"><ShoppingCart className="w-7 h-7 text-white" /></div>
              <h4 className="text-xl font-black italic uppercase tracking-tighter mb-2">Supermercado QOMO QIZER</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">Compras essenciais com entrega em 30min em Maputo e Matola.</p>
           </div>
           <button className="relative z-10 bg-white text-slate-900 w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest mt-8 shadow-xl">Fazer Compras</button>
           <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
};

export default ServicesModule;
