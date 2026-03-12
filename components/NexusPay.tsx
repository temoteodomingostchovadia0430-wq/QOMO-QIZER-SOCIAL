
import React, { useState, useMemo } from 'react';
import { 
  CreditCard, 
  ArrowRightLeft, 
  CheckCircle2, 
  Smartphone, 
  TrendingUp, 
  ShieldCheck, 
  Wallet,
  History,
  ChevronRight,
  Smartphone as PhoneIcon,
  Building2,
  Zap,
  Coins,
  ArrowUpRight,
  Gift,
  UserPlus
} from 'lucide-react';
import { MobileOperator } from '../types';
import { notificationService } from '../services/notificationService';

const NexusPay: React.FC = () => {
  const [balance, setBalance] = useState(15450.75); // MT (Meticais)
  const [commissionBalance, setCommissionBalance] = useState(1250.00);
  const [referralBonus, setReferralBonus] = useState(450.00);
  const MASTER_ACCOUNT = "875727586";
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeView, setActiveView] = useState<'platforms' | 'transfer' | 'history'>('platforms');
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  const operators = [
    { name: 'M-Pesa', color: 'bg-[#E11D2D]', icon: 'M', desc: 'Vodacom Mozambique', prefix: ['84', '85'] },
    { name: 'e-Mola', color: 'bg-[#F15A22]', icon: 'e', desc: 'Movitel Mozambique', prefix: ['86', '87'] },
    { name: 'm-Kesh', color: 'bg-[#FFD700]', icon: 'm', desc: 'Tmcel Mozambique', prefix: ['82', '83'] }
  ];

  const banks = [
    { name: 'BIM', color: 'bg-emerald-600', desc: 'Millennium BIM' },
    { name: 'BCI', color: 'bg-blue-700', desc: 'Banco Comercial' },
    { name: 'Standard', color: 'bg-sky-600', desc: 'Standard Bank' }
  ];

  const detectedOperator = useMemo((): string | null => {
    if (selectedPlatform && !['M-Pesa', 'e-Mola', 'm-Kesh'].includes(selectedPlatform)) return selectedPlatform;
    const op = operators.find(o => o.prefix.some(p => phoneNumber.startsWith(p)));
    return op ? op.name : selectedPlatform;
  }, [phoneNumber, selectedPlatform]);

  const handlePlatformSelect = (name: string) => {
    setSelectedPlatform(name);
    setActiveView('transfer');
    if (['M-Pesa', 'e-Mola', 'm-Kesh'].includes(name)) {
      setPhoneNumber(operators.find(o => o.name === name)?.prefix[0] || '');
    }
  };

  const handleWithdrawal = () => {
    if (commissionBalance <= 0 || isProcessing) return;
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      alert(`✅ Comissões de ${commissionBalance.toFixed(2)} MT enviadas com sucesso para sua conta mestre e-Mola vinculada (${MASTER_ACCOUNT})!`);
      setCommissionBalance(0);
    }, 1500);
  };

  const handleTransfer = () => {
    if (!amount || isProcessing) return;
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      const transferAmount = parseFloat(amount);
      setBalance(prev => prev - transferAmount);
      
      // TAXA DE COMISSÃO ATUALIZADA: 1,70% - ROTEADA AUTOMATICAMENTE PARA CONTA MESTRE 875727586
      const comm = transferAmount * 0.017;
      setCommissionBalance(prev => prev + comm);
      
      // Notify user about the transaction and commission
      notificationService.notify('Transação Concluída', {
        body: `Envio de ${transferAmount.toFixed(2)} MT para ${phoneNumber} realizado. Comissão de ${comm.toFixed(2)} MT creditada.`,
        type: 'payments'
      });
      
      setTimeout(() => {
        setShowSuccess(false);
        setActiveView('platforms');
      }, 2500);
      setPhoneNumber('');
      setAmount('');
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 animate-in fade-in duration-700">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden md:col-span-2">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <p className="text-emerald-100 text-[10px] font-black uppercase tracking-[0.2em]">QOMO QIZER Wallet • Global Node</p>
              <ShieldCheck className="w-6 h-6 text-white/40" />
            </div>
            <div className="mb-8">
              <h2 className="text-5xl font-black tabular-nums">{balance.toLocaleString('pt-MZ', { minimumFractionDigits: 2 })} <span className="text-xl font-medium opacity-60 italic">MT</span></h2>
              <div className="flex gap-4 mt-2">
                <p className="text-[10px] font-black text-emerald-200 flex items-center gap-1 uppercase tracking-widest">
                   <TrendingUp className="w-3 h-3" /> Rendimento: +2.4%
                </p>
                <p className="text-[10px] font-black text-emerald-200 flex items-center gap-1 uppercase tracking-widest">
                   <ShieldCheck className="w-3 h-3" /> Seguro Ativo
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="flex-1 bg-white text-emerald-900 py-4 rounded-2xl font-black text-xs shadow-xl active:scale-95 transition-all uppercase tracking-widest">Depositar</button>
              <button className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-md py-4 rounded-2xl font-black text-xs transition-all uppercase tracking-widest">Levantar</button>
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-[100px]" />
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border-2 border-[#F15A22]/20 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#F15A22]/10 p-3 rounded-2xl">
                <TrendingUp className="w-6 h-6 text-[#F15A22]" />
              </div>
              <div>
                <h4 className="font-black text-slate-900 dark:text-white uppercase text-xs tracking-tighter">Comissões Inteligentes</h4>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Conta Mestre: {MASTER_ACCOUNT}</p>
              </div>
            </div>
            <h3 className="text-3xl font-black text-[#F15A22] tabular-nums">+{commissionBalance.toFixed(2)} <span className="text-xs">MT</span></h3>
            
            <button 
              onClick={handleWithdrawal}
              disabled={commissionBalance <= 0 || isProcessing}
              className="w-full mt-6 bg-white dark:bg-slate-800 text-[#F15A22] py-3.5 rounded-2xl font-black text-[10px] shadow-xl active:scale-95 transition-all uppercase tracking-widest flex items-center justify-center gap-2 border border-[#F15A22]/10 disabled:opacity-50"
            >
              <ArrowUpRight className="w-4 h-4" /> Sacar para {MASTER_ACCOUNT}
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border-2 border-amber-500/20 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-500/10 p-3 rounded-2xl">
                <Gift className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h4 className="font-black text-slate-900 dark:text-white uppercase text-xs tracking-tighter">Bônus de Indicação</h4>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Ganhos por Convite</p>
              </div>
            </div>
            <h3 className="text-3xl font-black text-amber-500 tabular-nums">+{referralBonus.toFixed(2)} <span className="text-xs">MT</span></h3>
            
            <button 
              className="w-full mt-6 bg-amber-500 text-white py-3.5 rounded-2xl font-black text-[10px] shadow-xl active:scale-95 transition-all uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" /> Convidar Mais
            </button>
          </div>
        </div>
      </div>

      {activeView === 'platforms' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-2">Plataformas de Transferência</h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Selecione o destino para a sua transação quântica</p>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Mobile Money Operators */}
              {operators.map(op => (
                 <button 
                  key={op.name}
                  onClick={() => handlePlatformSelect(op.name)}
                  className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-2xl transition-all text-left group relative overflow-hidden"
                >
                   <div className="flex justify-between items-start mb-6">
                      <div className={`${op.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                        {op.icon}
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-xl">
                         <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                      </div>
                   </div>
                   <h4 className="text-lg font-black text-slate-900 dark:text-white mb-1 uppercase italic">{op.name}</h4>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{op.desc}</p>
                   <div className="mt-4 flex items-center gap-2">
                      <span className="text-[9px] font-black bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 px-2 py-0.5 rounded uppercase">Instantâneo</span>
                      <span className="text-[9px] font-black bg-orange-50 dark:bg-orange-900/30 text-[#F15A22] px-2 py-0.5 rounded uppercase">+1.7% Comis.</span>
                   </div>
                </button>
              ))}

              {/* Bank Transfer Card */}
              <button 
                onClick={() => handlePlatformSelect('Banco')}
                className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:border-emerald-500 hover:shadow-2xl transition-all text-left group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-slate-900 dark:bg-slate-100 w-14 h-14 rounded-2xl flex items-center justify-center text-white dark:text-slate-900 shadow-lg group-hover:scale-110 transition-transform">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-xl">
                    <ChevronRight className="w-5 h-5 text-slate-300" />
                  </div>
                </div>
                <h4 className="text-lg font-black text-slate-900 dark:text-white mb-1 uppercase italic">Transferência Bancária</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">BIM, BCI, Standard Bank e mais</p>
                <div className="mt-4">
                  <div className="flex -space-x-2">
                     {['BIM', 'BCI', 'STB'].map(b => (
                       <div key={b} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[7px] font-black">{b}</div>
                     ))}
                  </div>
                </div>
              </button>

              {/* NEXPAY Credits Card */}
              <button 
                onClick={() => handlePlatformSelect('QOMO QIZER Credits')}
                className="bg-gradient-to-br from-emerald-600 to-emerald-800 p-6 rounded-[2.5rem] text-white hover:shadow-2xl hover:scale-[1.02] transition-all text-left group relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                      <Coins className="w-8 h-8" />
                    </div>
                  </div>
                  <h4 className="text-lg font-black mb-1 uppercase italic">QOMO QIZER Credits</h4>
                  <p className="text-[10px] text-emerald-100 font-bold uppercase tracking-widest">Ecossistema Digital Interno</p>
                  <p className="mt-4 text-[9px] font-black uppercase opacity-60">Taxa: 0% • Instantâneo</p>
                </div>
                <Zap className="absolute -bottom-6 -right-6 w-32 h-32 text-white/5 -rotate-12" />
              </button>
           </div>
        </div>
      )}

      {activeView === 'transfer' && (
        <div className="max-w-xl mx-auto animate-in zoom-in-95 duration-300">
           <button 
             onClick={() => setActiveView('platforms')}
             className="mb-6 flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-emerald-500 transition-colors"
           >
              <ArrowRightLeft className="w-4 h-4 rotate-180" /> Voltar às Plataformas
           </button>

           <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 border border-slate-100 dark:border-slate-800 shadow-2xl relative">
              <div className="flex items-center gap-4 mb-10">
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg ${selectedPlatform === 'M-Pesa' ? 'bg-[#E11D2D]' : selectedPlatform === 'e-Mola' ? 'bg-[#F15A22]' : 'bg-slate-900'}`}>
                    {selectedPlatform === 'M-Pesa' ? 'M' : selectedPlatform === 'e-Mola' ? 'e' : <Smartphone className="w-7 h-7" />}
                 </div>
                 <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Envio via {selectedPlatform}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verificação de Segurança Nexus Ativa</p>
                 </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Número do Beneficiário</label>
                   <div className="relative">
                       <input 
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="84 / 86 / 82..."
                        className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl py-5 px-6 text-xl font-black focus:border-emerald-500 outline-none transition-all dark:text-white"
                      />
                      {detectedOperator && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-white dark:bg-slate-700 px-3 py-1.5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-600">
                           <div className={`w-2 h-2 rounded-full ${detectedOperator === 'M-Pesa' ? 'bg-[#E11D2D]' : detectedOperator === 'e-Mola' ? 'bg-[#F15A22]' : 'bg-emerald-500'}`} />
                           <span className="text-[9px] font-black uppercase text-slate-600 dark:text-slate-300">{detectedOperator}</span>
                        </div>
                      )}
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Valor (MT)</label>
                   <div className="relative">
                      <input 
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl py-5 px-6 text-3xl font-black focus:border-emerald-500 outline-none transition-all dark:text-white tabular-nums"
                      />
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-slate-300">MT</span>
                   </div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-950/20 p-5 rounded-[2rem] border border-orange-100 dark:border-orange-900/30">
                   <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-black text-orange-800 dark:text-orange-400 uppercase tracking-widest">Comissão Inteligente QOMO QIZER</span>
                      <span className="text-xl font-black text-[#F15A22]">+{amount ? (parseFloat(amount) * 0.017).toFixed(2) : '0.00'} MT</span>
                   </div>
                   <p className="text-[9px] text-orange-600/70 dark:text-orange-500/60 font-bold uppercase">Pagamento creditado ao confirmar esta transação.</p>
                </div>

                <button 
                  onClick={handleTransfer}
                  disabled={!amount || isProcessing}
                  className={`w-full py-6 rounded-[2.5rem] font-black text-sm tracking-widest transition-all flex items-center justify-center gap-3 ${
                    isProcessing ? 'bg-emerald-400 text-white cursor-wait' :
                    showSuccess ? 'bg-emerald-500 text-white' :
                    'bg-emerald-500 text-white shadow-2xl shadow-emerald-200 dark:shadow-none hover:scale-[1.02] active:scale-95'
                  }`}
                >
                  {isProcessing ? (
                    <><History className="w-5 h-5 animate-spin" /> PROCESSANDO...</>
                  ) : showSuccess ? (
                    <><CheckCircle2 className="w-5 h-5" /> SUCESSO!</>
                  ) : (
                    <><Zap className="w-5 h-5 fill-current" /> CONFIRMAR ENVIO</>
                  )}
                </button>
              </div>

              {/* Security Badge */}
              <div className="mt-8 flex flex-col items-center justify-center gap-2 opacity-60">
                 <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span className="text-[8px] font-black uppercase tracking-widest">Criptografia AES-256 Ativa</span>
                 </div>
                 <span className="text-[7px] font-bold text-slate-400 uppercase">Processamento de Alta Potência Nexus v3.1</span>
              </div>
           </div>
        </div>
      )}

      {/* Quick History Switcher (Floating) */}
      <div className="fixed bottom-24 right-6 sm:bottom-12 sm:right-12 z-40">
         <button 
           onClick={() => {
             if (activeView === 'history') setActiveView('platforms');
             else setActiveView('history');
           }}
           className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3 group transition-all hover:scale-105"
         >
            <div className={`p-2 rounded-xl ${activeView === 'history' ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
               <History className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Histórico</span>
         </button>
      </div>

      {activeView === 'history' && (
        <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-right duration-500">
           <div className="flex items-center justify-between px-4">
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Atividade Recente</h3>
              <button className="text-[10px] font-black text-emerald-500 uppercase">Exportar PDF</button>
           </div>
           
           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
              {[
                { type: 'M-Pesa', desc: 'Transferência para Antonio', amt: -500, time: 'Hoje, 14:20', icon: 'M', color: 'bg-[#E11D2D]' },
                { type: 'e-Mola', desc: 'Comissão Inteligente Transação #42', amt: +8.5, time: 'Hoje, 14:20', icon: 'e', color: 'bg-[#F15A22]' },
                { type: 'Banco BIM', desc: 'Depósito NEXPAY', amt: +2500, time: 'Ontem', icon: <Building2 className="w-4 h-4" />, color: 'bg-emerald-900' }
              ].map((h, i) => (
                <div key={i} className={`flex items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all ${i !== 2 ? 'border-b border-slate-50 dark:border-slate-800' : ''}`}>
                   <div className="flex items-center gap-4">
                      <div className={`${h.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-sm`}>
                         {h.icon}
                      </div>
                      <div>
                         <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase">{h.desc}</h4>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{h.time} • {h.type}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className={`text-sm font-black ${h.amt > 0 ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>
                        {h.amt > 0 ? `+${h.amt.toFixed(2)}` : h.amt.toFixed(2)} MT
                      </p>
                      <ArrowUpRight className={`w-4 h-4 ml-auto mt-1 ${h.amt > 0 ? 'text-emerald-500' : 'text-slate-300'}`} />
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default NexusPay;
