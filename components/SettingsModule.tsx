
import React, { useState } from 'react';
import { 
  Settings, User, ShieldCheck, CheckCircle2,
  Globe, LogOut, ChevronRight, Download, Zap,
  Smartphone, Palette, HardDrive, MessageSquare, Bot,
  Facebook, Youtube, Instagram, MessageCircle, Camera,
  CreditCard, Wallet, Droplets, Tv, ShoppingCart, 
  Coins, Wifi, ArrowRightLeft, TrendingUp, History,
  Lock, Bluetooth, Share2, FileText, FileSpreadsheet, FileArchive,
  Activity, Gift, LifeBuoy, Eye, Bell, Megaphone, PlayCircle,
  Languages, Database, UserCheck, ShieldAlert
} from 'lucide-react';
import { User as UserType, AppTab } from '../types';

interface SettingsModuleProps {
  currentUser: UserType;
  onVerify: () => void;
  onSupport?: () => void;
  onTabChange: (tab: AppTab) => void;
}

const SettingsModule: React.FC<SettingsModuleProps> = ({ currentUser, onVerify, onSupport, onTabChange }) => {
  const [isInstalling, setIsInstalling] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);

  const handleInstall = () => {
    setIsInstalling(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setInstallProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsInstalling(false);
          alert('🌌 Nexus Super instalado com sucesso!');
        }, 500);
      }
    }, 100);
  };

  const sections = [
    {
      title: 'Guia de Navegação Rápida',
      items: [
        { icon: FileText, label: 'Guia Completo de Definições (Estilo Facebook)', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/20', badge: 'NOVO', action: () => alert('Abrindo Guia Detalhado...') },
      ]
    },
    {
      title: 'Central de Contas & Identidade',
      items: [
        { icon: User, label: 'Informações Pessoais (Nome, Email, Tel)', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/20' },
        { icon: ShieldCheck, label: 'Senha e Segurança', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/20' },
        { icon: Database, label: 'Suas Informações e Permissões', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-950/20' },
        { icon: Download, label: 'Desativação ou Exclusão de Conta', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-950/20' },
      ]
    },
    {
      title: 'Privacidade & Público',
      items: [
        { icon: Eye, label: 'Quem pode ver o que você compartilha', color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-950/20' },
        { icon: UserCheck, label: 'Como as pessoas encontram você', color: 'text-sky-500', bg: 'bg-sky-50 dark:bg-sky-950/20' },
        { icon: ShieldAlert, label: 'Bloqueio de Pessoas e Apps', color: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-950/20' },
        { icon: History, label: 'Linha do Tempo e Marcações', color: 'text-slate-600', bg: 'bg-slate-100 dark:bg-slate-800' },
      ]
    },
    {
      title: 'Monetização & Ganhos',
      items: [
        { icon: TrendingUp, label: 'Painel de Monetização (Vídeos/Posts)', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/20', action: () => onTabChange(AppTab.STATISTICS) },
        { icon: Gift, label: 'Missões Diárias & Recompensas', color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-950/20', action: () => onTabChange(AppTab.REWARDS) },
        { icon: Wallet, label: 'Carteira Nexus & Saques', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-950/20', action: () => onTabChange(AppTab.PAY) },
      ]
    },
    {
      title: 'Preferências & Notificações',
      items: [
        { icon: Bell, label: 'Configurações de Notificações (Push/Email)', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/20', action: () => onTabChange(AppTab.NOTIFICATION_SETTINGS) },
        { icon: Megaphone, label: 'Preferências de Anúncios & Atividade', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-950/20', action: () => onTabChange(AppTab.AD_MANAGER) },
        { icon: PlayCircle, label: 'Mídia: Reprodução Automática e Qualidade', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/20' },
        { icon: Languages, label: 'Idioma e Região (Fuso Horário)', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/20' },
      ]
    },
    {
      title: 'Financeiro & Pagamentos Master',
      items: [
        { icon: CreditCard, label: 'QOMO QIZER Pay (M-Pesa, e-Mola, m-Kesh)', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/20', action: () => onTabChange(AppTab.PAY), badge: 'PAGAR' },
        { icon: ArrowRightLeft, label: 'Transferência Global & Câmbio', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/20', action: () => onTabChange(AppTab.GLOBAL_TRANSFER) },
        { icon: TrendingUp, label: 'Auto-Liquidação de Comissões', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-950/20', badge: 'ATIVO', action: () => onTabChange(AppTab.MERCHANT) },
      ]
    },
    {
      title: 'Aplicativos, Sites & Jogos',
      items: [
        { icon: Smartphone, label: 'Login com QOMO QIZER (Apps Conectados)', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/20' },
        { icon: Bot, label: 'Permissões de IA e Bots Externos', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/20' },
        { icon: ShieldCheck, label: 'Remover Acesso de Apps Antigos', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-950/20' },
      ]
    },
    {
      title: 'Pagamentos & Pedidos Avançados',
      items: [
        { icon: Wallet, label: 'Formas de Pagamento (Cartões, PayPal)', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/20' },
        { icon: History, label: 'Histórico de Compras e Doações', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/20' },
        { icon: Lock, label: 'Segurança de Pagamento (PIN de Compras)', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/20' },
      ]
    },
    {
      title: 'Utilidades & Serviços (Moçambique)',
      items: [
        { icon: Zap, label: 'Energia Credelec (EDM)', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/20', action: () => onTabChange(AppTab.SERVICES) },
        { icon: Droplets, label: 'Água FIPAG', color: 'text-sky-500', bg: 'bg-sky-50 dark:bg-sky-950/20', action: () => onTabChange(AppTab.SERVICES) },
        { icon: Tv, label: 'TV Satélite (DStv, Gotv, Star)', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-950/20', action: () => onTabChange(AppTab.SERVICES) },
      ]
    },
    {
      title: 'Dados & Entretenimento',
      items: [
        { icon: Wifi, label: 'Compra de Megabytes (Dados)', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/20', action: () => onTabChange(AppTab.SERVICES), badge: 'PROMO' },
        { icon: Gift, label: 'Jackpot de Crédito Nexus', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-950/20', badge: 'SORTE', action: () => alert('Abrindo Jackpot...') },
        { icon: ShoppingCart, label: 'Produtos Essenciais Nexus', color: 'text-slate-700', bg: 'bg-slate-100 dark:bg-slate-800', action: () => onTabChange(AppTab.SERVICES) },
      ]
    },
    {
      title: 'Transferência & Arquivos',
      items: [
        { icon: Bluetooth, label: 'QOMO QIZER Bluetooth', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/20', badge: 'PRONTO', action: () => onTabChange(AppTab.FILE_EXPLORER) },
        { icon: Share2, label: 'Share It (P2P)', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20', badge: 'MESH', action: () => onTabChange(AppTab.FILE_EXPLORER) },
      ]
    },
    {
      title: 'Documentos Pro',
      items: [
        { icon: FileText, label: 'Documentos PDF', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-950/20', action: () => onTabChange(AppTab.FILE_EXPLORER) },
        { icon: FileSpreadsheet, label: 'Planilhas Excel', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/20', action: () => onTabChange(AppTab.FILE_EXPLORER) },
        { icon: FileArchive, label: 'Arquivos Word/Doc', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/20', action: () => onTabChange(AppTab.FILE_EXPLORER) },
      ]
    },
    {
      title: 'Sistemas Fortes & Estrutura Pro',
      items: [
        { icon: Zap, label: 'QOMO QIZER Engine: Automação de Vendas', color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-950/20', badge: 'ULTRA' },
        { icon: ShieldCheck, label: 'Criptografia de Dados AES-256', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/20', badge: 'MILITAR' },
        { icon: HardDrive, label: 'Nuvem Nexus: Backup em Tempo Real', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/20' },
      ]
    },
    {
      title: 'Ideias de Crescimento & Monetização',
      items: [
        { icon: TrendingUp, label: 'Funil de Vendas Automático', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-950/20', badge: 'ROI+' },
        { icon: Coins, label: 'Programa de Afiliados QOMO QIZER', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/20' },
        { icon: Globe, label: 'Expansão de Mercado: África & Mundo', color: 'text-sky-600', bg: 'bg-sky-50 dark:bg-sky-950/20' },
      ]
    },
    {
      title: 'Palavras de Poder & Gatilhos Mentais',
      items: [
        { icon: MessageSquare, label: 'Dicionário de Persuasão Pro', color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-950/20', badge: 'COPY' },
        { icon: Zap, label: 'Gatilhos de Escassez & Urgência', color: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-950/20' },
        { icon: Bot, label: 'IA Copywriter: Gerador de Títulos', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/20' },
      ]
    },
    {
      title: 'Segurança & Conta',
      items: [
        { icon: CheckCircle2, label: 'Obter Selo de Verificação (350 MT)', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/20', action: onVerify, badge: currentUser.isVerified ? 'VERIFICADO' : 'OBTER' },
        { icon: Lock, label: 'Alterar Palavra-passe', color: 'text-slate-600', bg: 'bg-slate-100 dark:bg-slate-800', action: () => alert('Redirecionando para alteração de senha...') },
        { icon: ShieldCheck, label: 'Esqueci minha Palavra-passe', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-950/20', action: () => alert('Enviando código de recuperação para 875 727 586...') },
        { icon: Smartphone, label: 'Dispositivos Conectados', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/20', badge: '2 ATIVOS' },
        { icon: Activity, label: 'Painel de Estatísticas & Desafios', color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-950/20', action: () => onTabChange(AppTab.STATISTICS), badge: 'NOVO' },
      ]
    },
    {
      title: 'Ajuda & Suporte (Estilo Facebook)',
      items: [
        { icon: LifeBuoy, label: 'Central de Ajuda QOMO QIZER', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/20', action: () => onTabChange(AppTab.SUPPORT) },
        { icon: Bot, label: 'Suporte Inteligente IA', color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-950/20', action: () => onTabChange(AppTab.MESSAGES), badge: '24/7' },
        { icon: FileText, label: 'Termos e Políticas', color: 'text-slate-500', bg: 'bg-slate-100 dark:bg-slate-800' },
        { icon: MessageCircle, label: 'Relatar um Problema', color: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-950/20' },
      ]
    }
  ];

  const socialApps = [
    { name: 'Facebook', icon: Facebook, color: 'text-blue-600', active: true },
    { name: 'WhatsApp', icon: MessageCircle, color: 'text-emerald-500', active: true },
    { name: 'YouTube', icon: Youtube, color: 'text-red-600', active: false },
    { name: 'Instagram', icon: Instagram, color: 'text-pink-600', active: true },
    { name: 'TikTok', icon: Smartphone, color: 'text-black dark:text-white', active: false },
    { name: 'Snapchat', icon: Camera, color: 'text-yellow-400', active: false },
  ];

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 animate-in fade-in duration-500 pb-32">
      <div className="flex items-center gap-4 mb-10 bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="bg-emerald-500 p-4 rounded-3xl shadow-xl">
          <Settings className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">Ecossistema QOMO QIZER</h2>
          <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Controle Total Moçambique</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Associar Redes Sociais */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 px-2 flex items-center gap-2">
            <Globe className="w-4 h-4" /> Hub Social Integrado
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {socialApps.map((app) => (
              <button 
                key={app.name} 
                className={`flex flex-col items-center gap-2 group p-2 rounded-2xl transition-all ${app.active ? 'bg-emerald-50 dark:bg-emerald-900/10' : 'opacity-40 grayscale hover:grayscale-0'}`}
              >
                <div className={`${app.color} w-10 h-10 flex items-center justify-center`}>
                  <app.icon className="w-6 h-6" />
                </div>
                <span className="text-[8px] font-black uppercase tracking-tighter">{app.name}</span>
                {app.active && <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />}
              </button>
            ))}
          </div>
        </div>

        {sections.map((section, idx) => (
          <div key={idx} className="space-y-3">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4">{section.title}</h3>
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm">
              {section.items.map((item, i) => (
                <button 
                  key={i}
                  onClick={() => item.action && item.action()}
                  className={`w-full flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all ${i !== section.items.length - 1 ? 'border-b border-slate-50 dark:border-slate-800' : ''}`}
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className={`${item.bg} ${item.color} p-3 rounded-2xl`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className={`text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest ${
                        item.badge === 'ATIVO' ? 'bg-emerald-500 text-white' : 
                        item.badge === 'PAGAR' ? 'bg-emerald-100 text-emerald-600' : 
                        'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        <button className="w-full flex items-center justify-center gap-3 p-6 bg-rose-50 dark:bg-rose-500/10 text-rose-600 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-rose-100 transition-all mb-12 border border-rose-100 dark:border-rose-500/20">
          <LogOut className="w-5 h-5" /> Terminar Sessão QOMO QIZER
        </button>
      </div>
    </div>
  );
};

export default SettingsModule;
