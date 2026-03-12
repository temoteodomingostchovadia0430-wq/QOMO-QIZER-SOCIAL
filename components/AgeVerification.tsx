
import React from 'react';
import { ShieldAlert, CheckCircle2, XCircle, Zap } from 'lucide-react';

interface AgeVerificationProps {
  onVerify: () => void;
}

const AgeVerification: React.FC<AgeVerificationProps> = ({ onVerify }) => {
  return (
    <div className="fixed inset-0 z-[1000] bg-slate-950 flex items-center justify-center p-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      <div className="relative w-full max-w-md bg-slate-900/80 backdrop-blur-2xl rounded-[3rem] border border-white/10 p-10 shadow-2xl text-center animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-emerald-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-500/20">
          <ShieldAlert className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-4xl font-black text-white tracking-tighter italic uppercase mb-4 leading-none">
          QOMO QIZER <span className="text-emerald-500">SOCIAL</span>
        </h1>
        
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl py-2 px-4 inline-block mb-8">
          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Verificação de Segurança</p>
        </div>

        <p className="text-slate-400 text-sm font-medium leading-relaxed mb-10">
          Este aplicativo contém funcionalidades de monetização, conteúdo social e ferramentas avançadas. 
          <span className="block mt-2 text-white font-bold">Você confirma que tem 18 anos ou mais?</span>
        </p>

        <div className="space-y-4">
          <button 
            onClick={onVerify}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-500/20 transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5" /> Sim, tenho +18 anos
          </button>
          
          <button 
            onClick={() => window.location.href = 'https://www.google.com'}
            className="w-full bg-white/5 hover:bg-white/10 text-slate-400 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            <XCircle className="w-5 h-5" /> Não, sou menor
          </button>
        </div>

        <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-center gap-2">
          <Zap className="w-4 h-4 text-emerald-500" />
          <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Proteção Quântica QOMO QIZER</p>
        </div>
      </div>
    </div>
  );
};

export default AgeVerification;
