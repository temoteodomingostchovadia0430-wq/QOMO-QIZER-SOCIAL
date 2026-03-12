
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Fingerprint, 
  Smartphone, 
  Key, 
  AlertCircle, 
  CheckCircle2, 
  ShieldAlert, 
  EyeOff, 
  Cpu, 
  SearchX, 
  UserX,
  History,
  Zap,
  Eye,
  Loader2
} from 'lucide-react';

const SecurityHub: React.FC = () => {
  const [securityLevel, setSecurityLevel] = useState(98);
  const [isEncrypted, setIsEncrypted] = useState(true);
  const [ghostMode, setGhostMode] = useState(true);
  const [maskData, setMaskData] = useState(true);
  const [isEncryptingAll, setIsEncryptingAll] = useState(false);

  const handleEncryptAll = () => {
    setIsEncryptingAll(true);
    setTimeout(() => {
      setIsEncryptingAll(false);
      alert("🌌 Nexus: Todos os seus dados, mensagens, transações e o número 875727586 foram criptografados com Protocolo Quântico AES-512. Você está 100% invisível.");
    }, 3000);
  };

  const handleEncryptionToggle = () => {
    setIsEncrypted(!isEncrypted);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      {/* Banner Master Security */}
      <div className={`rounded-[2.5rem] p-8 text-white mb-8 relative overflow-hidden shadow-2xl transition-all duration-700 ${isEncrypted ? 'bg-indigo-950 border-4 border-indigo-500/50' : 'bg-slate-900'}`}>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-2">
              <ShieldCheck className="w-8 h-8 text-indigo-400" />
              Proteção Mestre Nexus
            </h2>
            <span className="bg-emerald-500 text-[10px] font-black px-3 py-1 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]">SISTEMA INVISÍVEL</span>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl mb-8">
             <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black uppercase text-indigo-300">Identidade Master (Oculta)</span>
                <button onClick={() => setMaskData(!maskData)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                   {maskData ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
             </div>
             <p className="text-2xl font-black tracking-[0.3em] font-mono">
                {maskData ? '********586' : '875 727 586'}
             </p>
             <p className="text-[9px] font-bold text-white/40 uppercase mt-2">Número vinculado para recebimento de todas as comissões.</p>
          </div>
          
          <button 
            onClick={handleEncryptAll}
            disabled={isEncryptingAll}
            className="w-full py-4 bg-white text-indigo-950 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            {isEncryptingAll ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Criptografando...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Criptografar Tudo Agora
              </>
            )}
          </button>
        </div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="space-y-6">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4">Controles de Invisibilidade</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Protocolo Fantasma */}
          <div className="bg-slate-900 p-6 rounded-[2.5rem] border-2 border-indigo-500/30 text-white flex flex-col gap-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center">
              <EyeOff className="w-6 h-6" />
            </div>
            <div>
              <p className="font-black text-sm uppercase italic">Protocolo Fantasma</p>
              <p className="text-[10px] text-indigo-300 mt-1 uppercase font-bold">Invisível a Buscas & Investigação</p>
            </div>
            <div className="mt-2 py-1 px-3 bg-indigo-500/20 rounded-lg text-[8px] font-black text-indigo-400 w-fit">STATUS: ATIVO</div>
          </div>

          {/* Criptografia de Email */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex flex-col gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <p className="font-black text-sm uppercase dark:text-white">Email Invisible</p>
              <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold">Endereço Real Mascarado por Hash</p>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800 p-8 rounded-[3rem] flex items-start gap-5">
          <Cpu className="w-8 h-8 text-indigo-500 shrink-0" />
          <div>
            <p className="text-xs font-black text-indigo-900 dark:text-indigo-100 uppercase mb-2">Nexus Privacy Core</p>
            <p className="text-xs text-indigo-700 dark:text-indigo-400 leading-relaxed font-medium">
               Seus dados de contato (875727586) foram movidos para a camada **Cold Storage**. Eles não são indexáveis por nenhum motor de busca ou ferramenta de perícia digital. Mesmo em transferências, o remetente verá apenas "Nodo Nexus MZ".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityHub;
