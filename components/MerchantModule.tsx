
import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Package, 
  LayoutGrid, 
  Clock, 
  ArrowUpRight, 
  Smartphone, 
  Search, 
  Filter, 
  Calendar, 
  Download,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Zap,
  CreditCard,
  QrCode,
  Tag,
  Loader2,
  Wallet,
  ShieldCheck,
  Lock,
  RefreshCw
} from 'lucide-react';

const MerchantModule: React.FC = () => {
  const MASTER_SETTLEMENT_NUMBER = "875727586"; // Seu número privado
  const [isSettlementActive, setIsSettlementActive] = useState(true);
  const [totalCommissions, setTotalCommissions] = useState(4250.75);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [transactionVolume, setTransactionVolume] = useState(250000); // Volume de transações em MT

  // Cálculo automático de comissão baseado no volume
  // Exemplo: 2% para volumes baixos, 1.5% para médios, 1% para altos
  const calculateCommissionRate = () => {
    if (transactionVolume < 100000) return 2.0;
    if (transactionVolume < 500000) return 1.5;
    return 1.0;
  };

  const currentRate = calculateCommissionRate();

  const triggerManualWithdrawal = () => {
    setIsWithdrawing(true);
    setTimeout(() => {
      setIsWithdrawing(false);
      alert(`🌌 Comissões de ${totalCommissions} MT enviadas com sucesso para o número ${MASTER_SETTLEMENT_NUMBER}!`);
      setTotalCommissions(0);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 animate-in fade-in duration-500 pb-32">
      {/* Header com Status de Liquidação */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">Gestão de Comissões Inteligente</h2>
          <div className="flex items-center gap-2 mt-1">
             <div className="bg-emerald-500 w-2 h-2 rounded-full animate-pulse" />
             <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Saque Automático Ativo: e-Mola ({MASTER_SETTLEMENT_NUMBER})</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="bg-emerald-900 text-emerald-100 px-6 py-3 rounded-2xl border border-emerald-500/30 flex items-center gap-3 shadow-2xl">
             <Lock className="w-4 h-4 text-emerald-400" />
             <span className="text-[10px] font-black uppercase tracking-widest">Identidade Protegida</span>
          </div>
          <div className="bg-indigo-600 text-white px-4 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest">
            Taxa Atual: {currentRate}% (Cálculo Automático)
          </div>
        </div>
      </div>

      {/* Main Stats Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
         
         {/* CARTEIRA DE COMISSÕES AUTO-CONVERSÃO */}
         <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-emerald-950 rounded-[3.5rem] p-10 text-white shadow-2xl relative overflow-hidden border border-white/5">
            <div className="relative z-10">
               <div className="flex justify-between items-start mb-8">
                  <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-md">
                     <TrendingUp className="w-8 h-8 text-emerald-300" />
                  </div>
                  <div className="text-right">
                     <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Total Acumulado (MT)</span>
                     <h3 className="text-5xl font-black tabular-nums mt-1">{totalCommissions.toLocaleString('pt-MZ', { minimumFractionDigits: 2 })}</h3>
                  </div>
               </div>

               <div className="space-y-4 mb-10">
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-all">
                     <div className="flex items-center gap-4">
                        <div className="bg-[#F15A22] w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-orange-500/20">e</div>
                        <div>
                           <p className="text-xs font-black uppercase">Liquidação Automática</p>
                           <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Destino: {MASTER_SETTLEMENT_NUMBER}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-2 text-emerald-500">
                        <CheckCircle2 className="w-6 h-6" />
                        <span className="text-[10px] font-black">VINCULADO</span>
                     </div>
                  </div>
               </div>

               <div className="flex gap-4">
                  <button 
                    onClick={triggerManualWithdrawal}
                    disabled={isWithdrawing || totalCommissions === 0}
                    className="flex-[2] bg-white text-emerald-950 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all disabled:opacity-50"
                  >
                    {isWithdrawing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Wallet className="w-5 h-5" />}
                    Sacar Comissões Agora
                  </button>
                  <button className="flex-1 bg-white/10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest">Histórico</button>
               </div>
            </div>
            
            <Zap className="absolute -bottom-10 -right-10 w-64 h-64 text-emerald-500/10 -rotate-12" />
         </div>

         {/* STATUS E CONFIGURAÇÃO */}
         <div className="space-y-6">
            <div className="bg-emerald-600 rounded-[3rem] p-8 text-white shadow-xl relative overflow-hidden">
               <h4 className="font-black text-lg italic uppercase tracking-tighter mb-4">Eficiência Quântica</h4>
               <p className="text-xs font-bold text-emerald-100 uppercase tracking-widest mb-6 leading-relaxed">
                  O sistema QOMO QIZER transfere suas comissões automaticamente a cada 60 minutos se o saldo for superior a 100 MT.
               </p>
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-[9px] font-black uppercase">Proteção de Saldo Ativa</span>
               </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 mb-4">Número de Recebimento</h4>
               <div className="relative">
                  <input 
                    type="text" 
                    readOnly 
                    value={MASTER_SETTLEMENT_NUMBER} 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 text-xl font-black focus:ring-0 outline-none"
                  />
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default MerchantModule;
