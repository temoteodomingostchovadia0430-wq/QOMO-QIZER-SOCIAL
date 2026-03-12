
import React, { useState, useEffect } from 'react';
import { 
  Bell, MessageSquare, AtSign, CreditCard, ShieldCheck, 
  Zap, ChevronLeft, Check, Moon, Volume2, 
  Star, Smartphone
} from 'lucide-react';
import { notificationService, NotificationType } from '../services/notificationService';
import { motion } from 'motion/react';

interface NotificationSettingsProps {
  onBack: () => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ onBack }) => {
  const [prefs, setPrefs] = useState(notificationService.getPreferences());
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );
  
  // Funções Avançadas (Simuladas no estado local)
  const [silentMode, setSilentMode] = useState(false);
  const [priorityMode, setPriorityMode] = useState(true);
  const [customSounds, setCustomSounds] = useState(true);

  const togglePref = (type: NotificationType) => {
    const newValue = !prefs[type];
    notificationService.updatePreference(type, newValue);
    setPrefs({ ...prefs, [type]: newValue });
  };

  const handleRequestPermission = async () => {
    const result = await notificationService.requestPermission();
    setPermission(result);
    if (result === 'granted') {
      notificationService.notify('Notificações Ativadas!', {
        body: 'Agora você receberá alertas do NEXPAY SOCIAL.',
        type: 'system'
      });
    }
  };

  const settings = [
    { id: 'messages' as NotificationType, label: 'Novas Mensagens', icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/20' },
    { id: 'mentions' as NotificationType, label: 'Menções e Tags', icon: AtSign, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/20' },
    { id: 'payments' as NotificationType, label: 'Pagamentos e Comissões', icon: CreditCard, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/20' },
    { id: 'security' as NotificationType, label: 'Alertas de Segurança', icon: ShieldCheck, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-950/20' },
    { id: 'system' as NotificationType, label: 'Atualizações do Sistema', icon: Zap, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-950/20' },
  ];

  const advancedFunctions = [
    { 
      id: 'silent', 
      label: 'Modo Silencioso Automático', 
      desc: 'Desativa notificações durante o sono (22h - 07h)', 
      icon: Moon, 
      color: 'text-slate-600', 
      value: silentMode, 
      setter: setSilentMode 
    },
    { 
      id: 'priority', 
      label: 'Prioridade Inteligente', 
      desc: 'Mostra primeiro as notificações mais importantes', 
      icon: Star, 
      color: 'text-amber-500', 
      value: priorityMode, 
      setter: setPriorityMode 
    },
    { 
      id: 'sounds', 
      label: 'Sons Personalizados', 
      desc: 'Escolher sons diferentes para cada tipo de alerta', 
      icon: Volume2, 
      color: 'text-indigo-500', 
      value: customSounds, 
      setter: setCustomSounds 
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl mx-auto py-8 px-4 pb-32"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-emerald-500 transition-colors mb-8 font-black text-[10px] uppercase tracking-widest"
      >
        <ChevronLeft className="w-4 h-4" /> Voltar para Definições
      </button>

      <div className="flex items-center gap-4 mb-10 bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="bg-amber-500 p-4 rounded-3xl shadow-xl">
          <Bell className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">Notificações Push</h2>
          <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Personalize seus Alertas Nexus</p>
        </div>
      </div>

      {permission !== 'granted' && (
        <div className="mb-8 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 rounded-[2rem] flex flex-col items-center text-center gap-4">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm">
            <Bell className="w-6 h-6 text-amber-500 animate-bounce" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase italic">Ativar Notificações no Browser</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Para receber alertas em tempo real, precisamos da sua permissão.</p>
          </div>
          <button 
            onClick={handleRequestPermission}
            className="px-8 py-3 bg-amber-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-amber-500/20 hover:scale-105 transition-transform"
          >
            Permitir Agora
          </button>
        </div>
      )}

      <div className="space-y-8">
        {/* Categorias Principais */}
        <section className="space-y-3">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4">Categorias de Alerta</h3>
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm">
            {settings.map((item, i) => (
              <div 
                key={item.id}
                className={`flex items-center justify-between p-5 transition-all ${i !== settings.length - 1 ? 'border-b border-slate-50 dark:border-slate-800' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`${item.bg} ${item.color} p-3 rounded-2xl`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{item.label}</span>
                </div>
                
                <button 
                  onClick={() => togglePref(item.id)}
                  className={`w-12 h-6 rounded-full transition-all relative ${prefs[item.id] ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${prefs[item.id] ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Funções Avançadas */}
        <section className="space-y-3">
          <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] px-4">Funções Inteligentes Nexus</h3>
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm">
            {advancedFunctions.map((item, i) => (
              <div 
                key={item.id}
                className={`flex items-center justify-between p-5 transition-all ${i !== advancedFunctions.length - 1 ? 'border-b border-slate-50 dark:border-slate-800' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`bg-slate-50 dark:bg-slate-800 ${item.color} p-3 rounded-2xl`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{item.label}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{item.desc}</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => item.setter(!item.value)}
                  className={`w-12 h-6 rounded-full transition-all relative ${item.value ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${item.value ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Canais de Recebimento */}
        <section className="space-y-3">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4">Canais de Entrega</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'App', icon: Smartphone, active: true },
              { label: 'Email', icon: AtSign, active: false },
              { label: 'SMS', icon: MessageSquare, active: false },
            ].map((channel) => (
              <button 
                key={channel.label}
                className={`p-4 rounded-[2rem] border flex flex-col items-center gap-2 transition-all ${channel.active ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400'}`}
              >
                <channel.icon className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">{channel.label}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-700">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Dica Nexus</h4>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
          As notificações push permitem que você saiba instantaneamente quando recebe uma comissão ou uma mensagem importante, mesmo se o aplicativo estiver em segundo plano.
        </p>
      </div>
    </motion.div>
  );
};

export default NotificationSettings;
