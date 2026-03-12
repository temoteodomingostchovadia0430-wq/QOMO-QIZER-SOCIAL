
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UserPlus, 
  Gift, 
  Share2, 
  Copy, 
  CheckCircle2, 
  Users, 
  TrendingUp, 
  Coins, 
  Zap,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  QrCode,
  Smartphone
} from 'lucide-react';
import { User } from '../types';

interface ReferralHubProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

const ReferralHub: React.FC<ReferralHubProps> = ({ user, onUpdateUser }) => {
  const [referralCode, setReferralCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    if (user.referralCode) {
      navigator.clipboard.writeText(user.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleApplyCode = () => {
    if (!referralCode || isProcessing) return;
    
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      
      // Reward the user for applying a code (one-time bonus)
      const bonus = 50; // MT
      onUpdateUser({
        ...user,
        balance: (user.balance || 0) + bonus,
        referralBonus: (user.referralBonus || 0) + bonus
      });

      setTimeout(() => setShowSuccess(false), 3000);
      setReferralCode('');
    }, 1500);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'QOMO QIZER SOCIAL',
      text: `Junte-se a mim no QOMO QIZER SOCIAL! Use meu código ${user.referralCode} para ganhar um bônus de boas-vindas.`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        handleCopyCode();
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
          <Gift className="w-5 h-5 text-emerald-500" />
          <span className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em]">Programa de Indicações Nexus</span>
        </div>
        <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Convide Amigos, Ganhe Bônus</h2>
        <p className="text-sm text-slate-500 font-bold uppercase tracking-widest max-w-lg mx-auto">
          Expanda o ecossistema QOMO QIZER e seja recompensado por cada novo nodo ativo na rede.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center group hover:border-emerald-500 transition-all">
          <div className="bg-emerald-500/10 p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
            <Users className="w-8 h-8 text-emerald-500" />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total de Indicações</p>
          <h3 className="text-3xl font-black text-slate-900 dark:text-white">{user.referralCount || 0}</h3>
        </div>

        <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 p-6 rounded-[2.5rem] text-white shadow-xl flex flex-col items-center text-center relative overflow-hidden group">
          <div className="relative z-10">
            <div className="bg-white/20 p-4 rounded-2xl mb-4 group-hover:rotate-12 transition-transform">
              <Coins className="w-8 h-8 text-white" />
            </div>
            <p className="text-[10px] font-black text-emerald-100 uppercase tracking-widest mb-1">Bônus Acumulado</p>
            <h3 className="text-3xl font-black">{(user.referralBonus || 0).toFixed(2)} <span className="text-sm">MT</span></h3>
          </div>
          <Zap className="absolute -bottom-6 -right-6 w-32 h-32 text-white/5 -rotate-12" />
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center group hover:border-emerald-500 transition-all">
          <div className="bg-blue-500/10 p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Nível de Influência</p>
          <h3 className="text-3xl font-black text-slate-900 dark:text-white">Prata</h3>
        </div>
      </div>

      {/* Main Referral Card */}
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side: Your Code */}
          <div className="p-10 space-y-8 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800">
            <div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-2">Seu Código de Convite</h4>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Compartilhe este código com seus amigos para ganhar 50 MT por cada cadastro.</p>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <span className="text-2xl font-black text-slate-900 dark:text-white tracking-widest">{user.referralCode}</span>
                <button 
                  onClick={handleCopyCode}
                  className="p-3 bg-white dark:bg-slate-700 rounded-xl shadow-sm hover:scale-110 active:scale-95 transition-all text-emerald-500"
                >
                  {copied ? <CheckCircle2 className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={handleShare}
                className="flex-1 bg-emerald-500 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" /> Compartilhar Link
              </button>
              <button className="p-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl hover:bg-slate-200 transition-all">
                <QrCode className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Right Side: Apply Code */}
          <div className="p-10 bg-slate-50/50 dark:bg-slate-800/20 space-y-8">
            <div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-2">Foi Convidado?</h4>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Insira o código de quem te convidou para ganhar um bônus de boas-vindas instantâneo.</p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <input 
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                  placeholder="EX: NEX-AMIGO-2026"
                  className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl py-5 px-6 text-lg font-black focus:border-emerald-500 outline-none transition-all dark:text-white uppercase tracking-widest"
                />
                <Smartphone className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              </div>

              <button 
                onClick={handleApplyCode}
                disabled={!referralCode || isProcessing}
                className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                  isProcessing ? 'bg-slate-200 text-slate-400 cursor-wait' :
                  showSuccess ? 'bg-emerald-500 text-white' :
                  'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-[1.02] active:scale-95'
                }`}
              >
                {isProcessing ? (
                  <><Zap className="w-4 h-4 animate-pulse" /> Validando...</>
                ) : showSuccess ? (
                  <><CheckCircle2 className="w-4 h-4" /> Bônus Creditado!</>
                ) : (
                  <><ArrowRight className="w-4 h-4" /> Aplicar Código</>
                )}
              </button>
            </div>

            <div className="bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/10 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-[9px] font-bold text-emerald-700 dark:text-emerald-400 uppercase leading-relaxed">
                Cada código é verificado pela rede Nexus para garantir a integridade do sistema de recompensas. Bônus são creditados instantaneamente.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="space-y-6">
        <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase italic tracking-widest text-center">Como Funciona</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { step: '01', title: 'Convide', desc: 'Envie seu código único para amigos e familiares.' },
            { step: '02', title: 'Cadastro', desc: 'Seu amigo se cadastra e aplica seu código no perfil.' },
            { step: '03', title: 'Ganhe', desc: 'Ambos recebem bônus em MT diretamente na carteira.' }
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 relative group overflow-hidden">
              <span className="text-5xl font-black text-slate-100 dark:text-slate-800 absolute -top-2 -left-2 group-hover:text-emerald-500/10 transition-colors">{item.step}</span>
              <div className="relative z-10">
                <h5 className="font-black text-slate-900 dark:text-white uppercase italic mb-1">{item.title}</h5>
                <p className="text-[10px] font-bold text-slate-500 uppercase leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReferralHub;
