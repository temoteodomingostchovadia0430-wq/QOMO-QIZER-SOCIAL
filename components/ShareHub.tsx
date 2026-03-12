
import React from 'react';
import { 
  X, 
  Share2, 
  MessageCircle, 
  Facebook, 
  Youtube, 
  Instagram, 
  Send, 
  Megaphone, 
  Link as LinkIcon, 
  Download,
  Smartphone,
  CheckCircle2
} from 'lucide-react';

interface ShareHubProps {
  content: any;
  onClose: () => void;
}

const ShareHub: React.FC<ShareHubProps> = ({ content, onClose }) => {
  const shareOptions = [
    { name: 'WhatsApp', icon: MessageCircle, color: 'bg-emerald-500', action: () => alert('Partilhando no WhatsApp...') },
    { name: 'Facebook', icon: Facebook, color: 'bg-blue-600', action: () => alert('Partilhando no Facebook...') },
    { name: 'TikTok', icon: Smartphone, color: 'bg-black', action: () => alert('Partilhando no TikTok...') },
    { name: 'YouTube', icon: Youtube, color: 'bg-red-600', action: () => alert('Partilhando no YouTube...') },
  ];

  return (
    <div className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-xl flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-t-[3rem] sm:rounded-[3rem] p-8 shadow-2xl border border-slate-100 dark:border-slate-800 animate-in slide-in-from-bottom-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2.5 rounded-2xl">
               <Share2 className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Nexus Share Hub</h3>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-8">
          {/* Promoção Interna */}
          <div className="grid grid-cols-1 gap-4">
             <button 
              onClick={() => alert('Transformando em Publicidade...')}
              className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-[2rem] text-white shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
             >
                <div className="flex items-center gap-4">
                   <div className="bg-white/20 p-3 rounded-2xl"><Megaphone className="w-5 h-5" /></div>
                   <div className="text-left">
                      <p className="text-xs font-black uppercase tracking-widest">Promover como Publicidade</p>
                      <p className="text-[10px] opacity-80 font-bold uppercase">Alcance 50k+ usuários Nexus</p>
                   </div>
                </div>
                <Send className="w-5 h-5 opacity-50" />
             </button>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800" />

          {/* Redes Externas */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Plataformas Externas</h4>
            <div className="grid grid-cols-4 gap-4">
               {shareOptions.map((opt) => (
                 <button 
                  key={opt.name} 
                  onClick={opt.action}
                  className="flex flex-col items-center gap-2 group"
                 >
                    <div className={`${opt.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                       <opt.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{opt.name}</span>
                 </button>
               ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
             <button className="flex items-center justify-center gap-2 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">
                <LinkIcon className="w-4 h-4" /> Copiar Link
             </button>
             <button className="flex items-center justify-center gap-2 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">
                <Download className="w-4 h-4" /> Baixar Ficheiro
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareHub;
