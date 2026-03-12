
import React, { useMemo, useState } from 'react';
import { 
  Bell, Heart, UserPlus, Zap, AlertTriangle, 
  MessageSquare, CreditCard, AtSign, Share2,
  TrendingUp, ShieldCheck, Users, ShoppingBag,
  Calendar, Gift, Star, Eye, MapPin
} from 'lucide-react';

interface Notification {
  id: number;
  type: 'like' | 'follow' | 'message' | 'payment' | 'mention' | 'share' | 'security' | 'reward' | 'marketplace' | 'event' | 'visit';
  user: string;
  content: string;
  time: string;
  icon: any;
  color: string;
  bg: string;
  label: string;
  targetId?: string;
  isRead?: boolean;
}

const NotificationCenter: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const rawNotifications: Notification[] = [
    { 
      id: 1, 
      type: 'like', 
      user: 'Sarah Chen', 
      content: 'curtiu seu post sobre IA', 
      time: '5m', 
      icon: Heart, 
      color: 'text-rose-500', 
      bg: 'bg-rose-50 dark:bg-rose-950/20',
      label: 'CURTIDA',
      targetId: 'post_ia_123'
    },
    { 
      id: 1.1, 
      type: 'like', 
      user: 'João Paulo', 
      content: 'curtiu seu post sobre IA', 
      time: '10m', 
      icon: Heart, 
      color: 'text-rose-500', 
      bg: 'bg-rose-50 dark:bg-rose-950/20',
      label: 'CURTIDA',
      targetId: 'post_ia_123'
    },
    { 
      id: 8, 
      type: 'reward', 
      user: 'NEXPAY Rewards', 
      content: 'Parabéns! Você ganhou 30 MT por assistir vídeos hoje.', 
      time: '12m', 
      icon: Gift, 
      color: 'text-purple-500', 
      bg: 'bg-purple-50 dark:bg-purple-950/20',
      label: 'RECOMPENSA'
    },
    { 
      id: 2, 
      type: 'follow', 
      user: 'Jordan Smith', 
      content: 'começou a seguir você', 
      time: '1h', 
      icon: UserPlus, 
      color: 'text-indigo-500', 
      bg: 'bg-indigo-50 dark:bg-indigo-950/20',
      label: 'SEGUIDOR'
    },
    { 
      id: 9, 
      type: 'visit', 
      user: 'Alguém', 
      content: 'visitou seu perfil recentemente', 
      time: '1h', 
      icon: Eye, 
      color: 'text-sky-500', 
      bg: 'bg-sky-50 dark:bg-sky-950/20',
      label: 'VISITA'
    },
    { 
      id: 3, 
      type: 'message', 
      user: 'Alex Rivers', 
      content: 'enviou uma mensagem privada', 
      time: '2h', 
      icon: MessageSquare, 
      color: 'text-blue-500', 
      bg: 'bg-blue-50 dark:bg-blue-950/20',
      label: 'MENSAGEM'
    },
    { 
      id: 10, 
      type: 'marketplace', 
      user: 'Marketplace', 
      content: 'Um item que você salvou baixou de preço!', 
      time: '3h', 
      icon: ShoppingBag, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50 dark:bg-emerald-950/20',
      label: 'LOJA'
    },
    { 
      id: 4, 
      type: 'payment', 
      user: 'Sistema Nexus', 
      content: 'Comissão de 1.70% recebida com sucesso', 
      time: '3h', 
      icon: CreditCard, 
      color: 'text-emerald-500', 
      bg: 'bg-emerald-50 dark:bg-emerald-950/20',
      label: 'PAGAMENTO'
    },
    { 
      id: 5, 
      type: 'mention', 
      user: 'Maria Silva', 
      content: 'mencionou você em um comentário', 
      time: '5h', 
      icon: AtSign, 
      color: 'text-amber-500', 
      bg: 'bg-amber-50 dark:bg-amber-950/20',
      label: 'MENÇÃO'
    },
    { 
      id: 11, 
      type: 'event', 
      user: 'Evento Próximo', 
      content: 'Live de Lançamento Nexus começa em 15 min', 
      time: '6h', 
      icon: Calendar, 
      color: 'text-rose-600', 
      bg: 'bg-rose-50 dark:bg-rose-950/20',
      label: 'EVENTO'
    },
    { 
      id: 6, 
      type: 'share', 
      user: 'Lucas Neto', 
      content: 'partilhou o seu produto no Marketplace', 
      time: '8h', 
      icon: Share2, 
      color: 'text-purple-500', 
      bg: 'bg-purple-50 dark:bg-purple-950/20',
      label: 'PARTILHA'
    },
    { 
      id: 7, 
      type: 'security', 
      user: 'Nexus Shield', 
      content: 'Novo dispositivo conectado à sua conta', 
      time: '12h', 
      icon: ShieldCheck, 
      color: 'text-slate-600', 
      bg: 'bg-slate-100 dark:bg-slate-800',
      label: 'SEGURANÇA'
    }
  ];

  const filters = [
    { id: 'all', label: 'Todas', icon: Bell },
    { id: 'social', label: 'Sociais', icon: Users },
    { id: 'money', label: 'Ganhos', icon: TrendingUp },
    { id: 'shop', label: 'Loja', icon: ShoppingBag },
    { id: 'security', label: 'Segurança', icon: ShieldCheck },
  ];

  const groupedNotifications = useMemo(() => {
    let filtered = rawNotifications;
    
    if (activeFilter === 'social') {
      filtered = rawNotifications.filter(n => ['like', 'follow', 'mention', 'share', 'visit'].includes(n.type));
    } else if (activeFilter === 'money') {
      filtered = rawNotifications.filter(n => ['payment', 'reward'].includes(n.type));
    } else if (activeFilter === 'shop') {
      filtered = rawNotifications.filter(n => ['marketplace'].includes(n.type));
    } else if (activeFilter === 'security') {
      filtered = rawNotifications.filter(n => ['security'].includes(n.type));
    }

    const groups: Record<string, any> = {};

    filtered.forEach(notif => {
      const groupKey = notif.targetId ? `${notif.type}_${notif.targetId}` : `${notif.type}_${notif.content}`;

      if (!groups[groupKey]) {
        groups[groupKey] = {
          ...notif,
          users: [notif.user],
          count: 1
        };
      } else {
        groups[groupKey].count += 1;
        if (!groups[groupKey].users.includes(notif.user)) {
          groups[groupKey].users.push(notif.user);
        }
      }
    });

    return Object.values(groups);
  }, [activeFilter]);

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 pb-32">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500 p-3 rounded-2xl shadow-lg shadow-emerald-500/20">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">Notificações</h2>
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Protocolo de Alerta Nexus</p>
          </div>
        </div>
        <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 hover:text-emerald-500 transition-colors">
          <Star className="w-5 h-5" />
        </button>
      </div>

      {/* Filtros Estilo Facebook */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${
              activeFilter === filter.id 
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                : 'bg-white dark:bg-slate-900 text-slate-500 border border-slate-100 dark:border-slate-800 hover:border-emerald-200'
            }`}
          >
            <filter.icon className="w-3.5 h-3.5" />
            {filter.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {groupedNotifications.length > 0 ? (
          groupedNotifications.map((notif) => (
            <div 
              key={notif.id} 
              className="bg-white dark:bg-slate-900 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex items-center gap-5 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group relative"
            >
              <div className={`${notif.bg} ${notif.color} p-4 rounded-2xl group-hover:scale-110 transition-transform shadow-sm relative`}>
                <notif.icon className="w-6 h-6" />
                {notif.count > 1 && (
                  <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] font-black w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center shadow-lg">
                    {notif.count}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-lg uppercase tracking-widest ${notif.bg} ${notif.color}`}>
                      {notif.label}
                    </span>
                    {notif.count > 1 && (
                      <span className="text-[9px] font-black bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-lg uppercase tracking-widest flex items-center gap-1">
                        <Users className="w-2.5 h-2.5" /> Agrupado
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{notif.time}</span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-tight">
                  {notif.count > 1 ? (
                    <>
                      <span className="font-black text-slate-900 dark:text-white uppercase italic">
                        {notif.users[0]} e outras {notif.count - 1} pessoas
                      </span> {notif.content}
                    </>
                  ) : (
                    <>
                      <span className="font-black text-slate-900 dark:text-white uppercase italic">{notif.user}</span> {notif.content}
                    </>
                  )}
                </p>
              </div>
              {!notif.isRead && <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />}
            </div>
          ))
        ) : (
          <div className="py-20 text-center">
            <div className="bg-slate-100 dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Nenhuma notificação nesta categoria</p>
          </div>
        )}
      </div>

      <button className="w-full mt-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all border border-slate-200 dark:border-slate-700">
        Ver Notificações Antigas
      </button>
    </div>
  );
};

export default NotificationCenter;
