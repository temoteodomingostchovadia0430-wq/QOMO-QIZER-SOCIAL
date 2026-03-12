
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Zap, DollarSign, Shield, Clock, TrendingUp, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

interface AdCenterProps {
  onReward: (amount: number) => void;
  dailyLimit?: number;
  videosWatchedToday?: number;
}

const AdCenter: React.FC<AdCenterProps> = ({ onReward, dailyLimit = 10, videosWatchedToday = 0 }) => {
  const [isWatching, setIsWatching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastReward, setLastReward] = useState(0);

  const startAd = () => {
    if (videosWatchedToday >= dailyLimit) return;
    
    setIsWatching(true);
    setProgress(0);
    
    const duration = 15; // 15 seconds
    const interval = 100; // update every 100ms
    const step = (interval / (duration * 1000)) * 100;
    
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          finishAd();
          return 100;
        }
        return prev + step;
      });
    }, interval);
  };

  const finishAd = () => {
    const reward = 2.0; // 2 MT per video as per user plan example
    setLastReward(reward);
    onReward(reward);
    setIsWatching(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 p-4 sm:p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">
            Centro de <span className="text-emerald-500">Ganhos</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Assista anúncios e monetize seu tempo no QOMO QIZER SOCIAL.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="flex flex-col gap-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-500">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Limite Diário</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">{videosWatchedToday}</span>
                  <span className="text-slate-400 font-bold">/ {dailyLimit}</span>
                </div>
              </div>
            </div>
            <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500" style={{ width: `${(videosWatchedToday / dailyLimit) * 100}%` }} />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-500">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Taxa de Ganho</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">2.00</span>
                  <span className="text-slate-400 font-bold uppercase text-xs">MT / Vídeo</span>
                </div>
              </div>
            </div>
            <div className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-lg text-[10px] font-black uppercase">Premium</div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-2xl flex items-center justify-center text-yellow-500">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status da Conta</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black text-emerald-500 uppercase italic">Verificada</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
              </div>
            </div>
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
          </div>
        </div>

        {/* Main Ad Section */}
        <div className="bg-slate-900 rounded-[3rem] p-8 sm:p-12 relative overflow-hidden border border-white/10 shadow-2xl">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 flex flex-col items-center text-center gap-8">
            <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center border border-white/10 shadow-2xl">
              <Play className={`w-12 h-12 text-emerald-500 ${isWatching ? 'animate-pulse' : ''}`} fill="currentColor" />
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">
                {isWatching ? 'Assistindo Anúncio...' : 'Pronto para Monetizar?'}
              </h2>
              <p className="text-slate-400 max-w-md mx-auto font-medium">
                {isWatching 
                  ? 'Mantenha o aplicativo aberto para garantir sua recompensa.' 
                  : 'Assista a um vídeo curto de 15 segundos e ganhe 2.00 MT instantaneamente.'}
              </p>
            </div>

            {isWatching ? (
              <div className="w-full max-w-md space-y-4">
                <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <motion.div 
                    className="h-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  <span>Progresso</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>
            ) : (
              <button
                onClick={startAd}
                disabled={videosWatchedToday >= dailyLimit}
                className={`group relative px-12 py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center gap-3 ${
                  videosWatchedToday >= dailyLimit
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-emerald-500 text-white hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(16,185,129,0.3)]'
                }`}
              >
                <Play className="w-5 h-5 fill-current" />
                {videosWatchedToday >= dailyLimit ? 'Limite Atingido' : 'Assistir Agora'}
              </button>
            )}

            {videosWatchedToday >= dailyLimit && (
              <div className="flex items-center gap-2 text-amber-500 bg-amber-500/10 px-4 py-2 rounded-xl border border-amber-500/20">
                <AlertCircle className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Volte amanhã para mais recompensas</span>
              </div>
            )}
          </div>
        </div>

        {/* Success Toast */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] bg-emerald-500 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-4 border-4 border-white/20"
            >
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Recompensa Recebida</p>
                <p className="text-xl font-black italic">+ {lastReward.toFixed(2)} MT</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Cards */}
        <div className="flex flex-col gap-6 pb-20">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl">
            <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-500" /> Como Funciona?
            </h3>
            <ul className="space-y-4">
              {[
                'Assista vídeos de parceiros até o final.',
                'Ganhe MT instantaneamente em sua carteira.',
                'Comissão de 1.70% aplicada automaticamente.',
                'Saque via M-Pesa ou e-Mola ao atingir 500 MT.'
              ].map((text, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 text-[10px] font-black">
                    {i + 1}
                  </div>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl">
            <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-500" /> Segurança Total
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Seus dados pessoais e número de telefone estão protegidos por criptografia de ponta a ponta. 
              Nenhum dado sensível é compartilhado com anunciantes ou outros usuários.
            </p>
            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-emerald-500 mb-1">
                <Shield className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Criptografia Ativa</span>
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">AES-256 Bit Protection</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdCenter;
