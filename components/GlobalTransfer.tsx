
import React, { useState } from 'react';
import { Globe, ArrowRight, DollarSign, CreditCard, ShieldCheck, Zap, ChevronDown } from 'lucide-react';

const GlobalTransfer: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('USD');
  const [isProcessing, setIsProcessing] = useState(false);

  const rates: Record<string, number> = {
    'USD': 63.85,
    'EUR': 69.20,
    'ZAR': 3.45,
    'BRL': 11.20
  };

  const countries = [
    { code: 'US', name: 'Estados Unidos', curr: 'USD' },
    { code: 'PT', name: 'Portugal', curr: 'EUR' },
    { code: 'ZA', name: 'África do Sul', curr: 'ZAR' },
    { code: 'BR', name: 'Brasil', curr: 'BRL' }
  ];

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 animate-in fade-in duration-700">
      <div className="bg-gradient-to-br from-emerald-900 to-slate-900 rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden mb-8">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
               <Globe className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
               <h2 className="text-2xl font-black italic uppercase tracking-tighter">QOMO QIZER Global Send</h2>
               <p className="text-[10px] text-emerald-200 font-bold uppercase tracking-widest">Transferência Sem Fronteiras</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-emerald-300 uppercase tracking-widest">Enviar de (MT)</label>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00 MT"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-xl font-black focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-emerald-300 uppercase tracking-widest">País de Destino</label>
                  <div className="relative">
                    <select 
                      onChange={(e) => setTargetCurrency(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-black appearance-none focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      {countries.map(c => <option key={c.code} value={c.curr} className="text-slate-900">{c.name} ({c.curr})</option>)}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                  </div>
               </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 flex items-center justify-between">
               <div>
                  <p className="text-[10px] font-black text-emerald-300 uppercase tracking-widest mb-1">Recebe Aproximadamente</p>
                  <h3 className="text-3xl font-black tabular-nums">
                    {amount ? (parseFloat(amount) / rates[targetCurrency]).toFixed(2) : '0.00'} <span className="text-sm font-medium opacity-60">{targetCurrency}</span>
                  </h3>
               </div>
               <div className="text-right">
                  <p className="text-[10px] font-black text-emerald-400 uppercase">Taxa QOMO QIZER: 1.5%</p>
                  <p className="text-[10px] text-white/40 font-bold uppercase">Taxa Câmbio: 1 {targetCurrency} = {rates[targetCurrency]} MT</p>
               </div>
            </div>

            <button 
              onClick={() => setIsProcessing(true)}
              className="w-full bg-white text-emerald-900 py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
            >
              INICIAR TRANSFERÊNCIA
            </button>
          </div>
        </div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
         <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
            <div>
               <h4 className="text-xs font-black uppercase dark:text-white">Garantia Quântica</h4>
               <p className="text-[10px] text-slate-500 mt-1 font-medium">Seu dinheiro chega em até 15 minutos ou devolvemos a taxa.</p>
            </div>
         </div>
         <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex items-start gap-4">
            <Zap className="w-6 h-6 text-amber-500" />
            <div>
               <h4 className="text-xs font-black uppercase dark:text-white">Rede M-Pesa/e-Mola</h4>
               <p className="text-[10px] text-slate-500 mt-1 font-medium">Use seu saldo móvel para enviar para o exterior sem precisar de banco.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default GlobalTransfer;
