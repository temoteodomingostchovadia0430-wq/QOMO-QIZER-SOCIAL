
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  FileSpreadsheet, 
  File as FileIcon, 
  Download, 
  Share2, 
  Bluetooth, 
  Zap, 
  Search, 
  MoreVertical, 
  ShieldCheck, 
  Plus,
  FolderOpen,
  HardDrive,
  Cpu
} from 'lucide-react';
import { NexusFile } from '../types';

const MOCK_FILES: NexusFile[] = [
  { id: 'f1', name: 'Relatorio_Vendas_Mensal.xlsx', type: 'excel', size: '2.4 MB', date: 'Hoje, 10:30' },
  { id: 'f2', name: 'Contrato_Parceria_Nexus.pdf', type: 'pdf', size: '1.1 MB', date: 'Ontem' },
  { id: 'f3', name: 'Apresentacao_Projecto.pdf', type: 'pdf', size: '5.8 MB', date: '12 Out 2024' },
  { id: 'f4', name: 'Lista_Contactos_Business.xlsx', type: 'excel', size: '450 KB', date: '10 Out 2024' },
  { id: 'f5', name: 'Manual_Usuario_v2.doc', type: 'doc', size: '890 KB', date: '05 Out 2024' },
];

const FileExplorer: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'pdf' | 'excel'>('all');
  const [isScanning, setIsScanning] = useState(false);

  const filteredFiles = activeFilter === 'all' 
    ? MOCK_FILES 
    : MOCK_FILES.filter(f => f.type === activeFilter);

  const handleTransfer = (type: 'Bluetooth' | 'Nexus Share') => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      alert(`${type}: Dispositivos encontrados. Pronto para transferir.`);
    }, 3000);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar de Armazenamento */}
        <div className="lg:w-64 space-y-6">
          <div className="bg-slate-900 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden">
             <div className="relative z-10">
                <HardDrive className="w-8 h-8 text-indigo-400 mb-4" />
                <h3 className="font-black text-sm uppercase tracking-widest mb-1">Armazenamento</h3>
                <p className="text-[10px] text-slate-400 font-bold mb-4">45.2 GB de 100 GB</p>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                   <div className="bg-indigo-500 h-full w-[45%]" />
                </div>
             </div>
             <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-4 border border-slate-100 dark:border-slate-800">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-2">Transferência</h4>
             <div className="space-y-2">
                <button 
                  onClick={() => handleTransfer('Bluetooth')}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-300"
                >
                   <Bluetooth className="w-4 h-4 text-blue-500" />
                   <span className="text-xs font-black uppercase tracking-widest">Bluetooth</span>
                </button>
                <button 
                  onClick={() => handleTransfer('Nexus Share')}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-300"
                >
                   <Zap className="w-4 h-4 text-indigo-500" />
                   <span className="text-xs font-black uppercase tracking-widest">Nexus Share</span>
                </button>
             </div>
          </div>
        </div>

        {/* Explorador Principal */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">Nexus Drive</h2>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Documentos & Arquivos Quânticos</p>
            </div>
            <button className="bg-indigo-600 text-white p-4 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all">
               <Plus className="w-6 h-6" />
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
             {['all', 'pdf', 'excel'].map(f => (
               <button
                key={f}
                onClick={() => setActiveFilter(f as any)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === f ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white dark:bg-slate-900 text-slate-400 border border-slate-100 dark:border-slate-800'}`}
               >
                 {f === 'all' ? 'Todos' : f.toUpperCase()}
               </button>
             ))}
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
             {filteredFiles.map((file, i) => (
               <div key={file.id} className={`flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all ${i !== filteredFiles.length - 1 ? 'border-b border-slate-50 dark:border-slate-800' : ''}`}>
                  <div className="flex items-center gap-4">
                     <div className={`p-3 rounded-2xl ${file.type === 'pdf' ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-500' : file.type === 'excel' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500' : 'bg-blue-50 dark:bg-blue-500/10 text-blue-500'}`}>
                        {file.type === 'pdf' ? <FileText className="w-6 h-6" /> : file.type === 'excel' ? <FileSpreadsheet className="w-6 h-6" /> : <FileIcon className="w-6 h-6" />}
                     </div>
                     <div>
                        <h4 className="text-sm font-black text-slate-900 dark:text-white truncate max-w-[150px] sm:max-w-xs">{file.name}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{file.size} • {file.date}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <motion.button 
                       whileHover={{ scale: 1.2, rotate: 5 }}
                       whileTap={{ scale: 0.9 }}
                       className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                     >
                       <Download className="w-5 h-5" />
                     </motion.button>
                     <motion.button 
                       whileHover={{ scale: 1.2, rotate: -5 }}
                       whileTap={{ scale: 0.9 }}
                       className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                     >
                       <Share2 className="w-5 h-5" />
                     </motion.button>
                     <motion.button 
                       whileHover={{ scale: 1.1 }}
                       whileTap={{ scale: 0.9 }}
                       className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                     >
                       <MoreVertical className="w-5 h-5" />
                     </motion.button>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>

      {isScanning && (
        <div className="fixed inset-0 z-[200] bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in">
           <div className="relative mb-8">
              <div className="absolute inset-0 bg-indigo-500 rounded-full blur-3xl opacity-20 animate-pulse" />
              <div className="w-32 h-32 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin flex items-center justify-center">
                 <Cpu className="w-12 h-12 text-indigo-500 animate-pulse" />
              </div>
           </div>
           <h3 className="text-xl font-black text-white uppercase italic tracking-widest mb-2">Escaneando Dispositivos</h3>
           <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Quantum Link Handshake em curso...</p>
           <button onClick={() => setIsScanning(false)} className="mt-12 text-white/40 hover:text-white font-black text-[10px] uppercase tracking-widest">Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default FileExplorer;
