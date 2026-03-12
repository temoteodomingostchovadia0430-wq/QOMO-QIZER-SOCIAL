
import React, { useState } from 'react';
import { Folder, Bell, Shield, User, Zap, ChevronRight, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NotificationGroup {
  id: string;
  name: string;
  count: number;
  icon: any;
  color: string;
  notifications: any[];
}

const NotificationFolder: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const folders: NotificationGroup[] = [
    {
      id: 'social',
      name: 'Social',
      count: 12,
      icon: User,
      color: 'bg-blue-500',
      notifications: [
        { id: 's1', user: 'Ana Silva', text: 'começou a seguir você', time: '2m' },
        { id: 's2', user: 'Pedro Santos', text: 'curtiu sua foto', time: '15m' },
      ]
    },
    {
      id: 'security',
      name: 'Segurança',
      count: 2,
      icon: Shield,
      color: 'bg-amber-500',
      notifications: [
        { id: 'sec1', user: 'Sistema', text: 'Novo login detectado em Maputo', time: '1h' },
      ]
    },
    {
      id: 'system',
      name: 'Sistema',
      count: 5,
      icon: Zap,
      color: 'bg-emerald-500',
      notifications: [
        { id: 'sys1', user: 'Nexus', text: 'Sua conta foi verificada com sucesso', time: '1d' },
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase flex items-center gap-3">
            <Folder className="w-8 h-8 text-indigo-600" /> Pastas de Notificação
          </h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Organize suas notificações por categoria</p>
        </div>
        <div className="flex gap-2">
          <button className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-500 hover:text-indigo-600 transition-all">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-500 hover:text-indigo-600 transition-all">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {folders.map((folder) => (
          <motion.div
            key={folder.id}
            whileHover={{ y: -5 }}
            onClick={() => setSelectedFolder(folder.id)}
            className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm cursor-pointer group relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 ${folder.color} opacity-5 -mr-8 -mt-8 rounded-full group-hover:scale-150 transition-transform duration-500`} />
            
            <div className="flex items-start justify-between mb-6">
              <div className={`${folder.color} p-4 rounded-2xl shadow-lg shadow-current/20 text-white`}>
                <folder.icon className="w-6 h-6" />
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {folder.count} Itens
              </div>
            </div>

            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic mb-1">{folder.name}</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Notificações de {folder.name.toLowerCase()}</p>

            <div className="flex items-center justify-between text-indigo-600 group-hover:translate-x-2 transition-transform">
              <span className="text-[10px] font-black uppercase tracking-widest">Abrir Pasta</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedFolder && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedFolder(null)}
          >
            <motion.div
              className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`${folders.find(f => f.id === selectedFolder)?.color} p-3 rounded-2xl text-white`}>
                    {React.createElement(folders.find(f => f.id === selectedFolder)?.icon || Bell, { className: 'w-5 h-5' })}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic">
                    {folders.find(f => f.id === selectedFolder)?.name}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedFolder(null)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all"
                >
                  <Search className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              
              <div className="p-4 max-h-[60vh] overflow-y-auto no-scrollbar">
                {folders.find(f => f.id === selectedFolder)?.notifications.map((n) => (
                  <div key={n.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-all flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-black">
                      {n.user[0]}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{n.user}</p>
                      <p className="text-xs text-slate-500">{n.text}</p>
                    </div>
                    <span className="text-[9px] font-black text-slate-400 uppercase">{n.time}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-800/50">
                <button 
                  onClick={() => setSelectedFolder(null)}
                  className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl"
                >
                  Fechar Pasta
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationFolder;
