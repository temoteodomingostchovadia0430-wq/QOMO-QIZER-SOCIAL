
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Building2, 
  X, 
  Zap, 
  Lock,
  Loader2,
  Sparkles
} from 'lucide-react';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<'ad' | 'payment' | 'processing' | 'success'>('ad');
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'card' | 'bank' | null>(null);
  const [formData, setFormData] = useState({ account: '', name: '' });
  const [countdown, setCountdown] = useState(5);

  // Recipient is encrypted/hidden in the backend logic, but we use a constant here for simulation
  // The user explicitly asked for 875727586 to be the recipient but invisible to others.
  const RECIPIENT_ID = "875727586"; 

  useEffect(() => {
    if (step === 'success' && countdown > 0) {
      const timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (step === 'success' && countdown === 0) {
      onSuccess();
    }
  }, [step, countdown, onSuccess]);

  const handlePayment = () => {
    if (!paymentMethod || !formData.account) return;
    setStep('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      setStep('success');
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-rose-500 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {step === 'ad' && (
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-emerald-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10 text-white fill-current" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-2">Selo de Verificação</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-8">
              Destaque-se no QOMO QIZER Universo. Obtenha credibilidade instantânea, proteção de conta e recursos exclusivos.
            </p>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6 mb-8 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Preço Único</span>
                <span className="text-2xl font-black text-emerald-500 italic">350 MT</span>
              </div>
              <ul className="text-left space-y-3">
                {[
                  'Selo Azul de Autenticidade',
                  'Prioridade em Comentários',
                  'Proteção Avançada contra Impostores',
                  'Suporte Prioritário 24/7'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[11px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-tight">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <button 
              onClick={() => setStep('payment')}
              className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Obter Verificação Agora
            </button>
          </div>
        )}

        {step === 'payment' && (
          <div className="p-8">
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-6">Pagar selo agora</h3>
            
            <div className="space-y-4 mb-8">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Escolha o método de pagamento</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'wallet', icon: Smartphone, label: 'Carteira' },
                  { id: 'card', icon: CreditCard, label: 'Cartão' },
                  { id: 'bank', icon: Building2, label: 'Banco' }
                ].map((m) => (
                  <button 
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${paymentMethod === m.id ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200'}`}
                  >
                    <m.icon className={`w-6 h-6 ${paymentMethod === m.id ? 'text-emerald-500' : 'text-slate-400'}`} />
                    <span className="text-[8px] font-black uppercase">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Número ou Conta</label>
                <input 
                  type="text" 
                  placeholder={paymentMethod === 'card' ? '0000 0000 0000 0000' : '8X XXX XXXX'}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3 px-4 text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={formData.account}
                  onChange={(e) => setFormData({ ...formData, account: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Nome Completo</label>
                <input 
                  type="text" 
                  placeholder="Seu nome como no documento"
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3 px-4 text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            <div className="bg-emerald-950 p-4 rounded-2xl border border-emerald-500/30 mb-8 flex items-center gap-3">
              <Lock className="w-5 h-5 text-emerald-400" />
              <p className="text-[9px] font-black text-emerald-100 uppercase leading-tight">
                Transação Blindada: Seus dados e o destinatário (Nodo Nexus MZ) são criptografados de ponta a ponta.
              </p>
            </div>

            <button 
              disabled={!paymentMethod || !formData.account || !formData.name}
              onClick={handlePayment}
              className="w-full bg-emerald-500 disabled:opacity-50 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Pagar selo agora
            </button>
          </div>
        )}

        {step === 'processing' && (
          <div className="p-12 text-center">
            <Loader2 className="w-16 h-16 text-emerald-500 animate-spin mx-auto mb-8" />
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-2">Processando Pagamento</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Criptografando transação e validando dados quânticos...
            </p>
          </div>
        )}

        {step === 'success' && (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/40">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-4">Pagamento Confirmado!</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-8">
              O valor de <span className="text-emerald-500 font-black">350 MT</span> foi processado com sucesso para o **Nodo Nexus MZ**. Sua identidade e os dados do destinatário permanecem 100% invisíveis e criptografados.
            </p>
            
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 mb-8">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Selo Ativando em</p>
              <p className="text-4xl font-black text-emerald-500 italic">{countdown}s</p>
            </div>

            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
              Você recebeu uma mensagem de confirmação do QOMO QIZER SOCIAL.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default VerificationModal;
