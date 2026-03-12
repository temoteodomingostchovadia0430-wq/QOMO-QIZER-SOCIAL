
import React, { useState } from 'react';
import { StickyNote, Plus, Trash2, Search, Edit3, Sparkles, ChevronRight, X, Palette } from 'lucide-react';
import { Note } from '../types';

const NotesModule: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    { id: 'n1', title: 'Ideias para Live', content: 'Falar sobre o futuro da IA em Moçambique e novas recargas Nexus.', date: 'Há 2h', color: 'bg-indigo-50 border-indigo-200' },
    { id: 'n2', title: 'Roteiro Vídeo Tech', content: '1. Introdução\n2. Demo do Gemini 3\n3. Encerramento', date: 'Hoje', color: 'bg-emerald-50 border-emerald-200' },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const addNote = () => {
    if (!newTitle || !newContent) return;
    const n: Note = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      date: 'Agora',
      color: 'bg-white border-slate-200'
    };
    setNotes([n, ...notes]);
    setIsAdding(false);
    setNewTitle('');
    setNewContent('');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 p-3 rounded-2xl shadow-xl">
            <StickyNote className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">Bloco de Notas</h2>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">Suas ideias, organizadas</p>
          </div>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-indigo-600 text-white px-8 py-4 rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl hover:scale-105 active:scale-95 transition-all"
        >
           <Plus className="w-5 h-5" /> NOVA NOTA
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map(note => (
          <div key={note.id} className={`p-6 rounded-[2.5rem] border-2 shadow-sm relative group hover:shadow-xl transition-all ${note.color}`}>
             <div className="flex justify-between items-start mb-4">
                <h3 className="font-black text-slate-900 uppercase italic truncate max-w-[140px]">{note.title}</h3>
                <button className="text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
             </div>
             <p className="text-sm text-slate-600 line-clamp-4 leading-relaxed font-medium mb-6">{note.content}</p>
             <div className="flex items-center justify-between pt-4 border-t border-black/5">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{note.date}</span>
                <button className="p-2 bg-black/5 rounded-xl text-slate-400 hover:text-indigo-600"><Edit3 className="w-4 h-4" /></button>
             </div>
          </div>
        ))}
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
           <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[3rem] p-8 shadow-2xl border border-slate-100 dark:border-slate-800 animate-in zoom-in-95">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic">Criar Nota Inteligente</h3>
                 <button onClick={() => setIsAdding(false)} className="text-slate-400"><X /></button>
              </div>
              <div className="space-y-4">
                 <input 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Título da Ideia..." 
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-sm font-black focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
                 />
                 <textarea 
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Conteúdo da nota..." 
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none h-48 resize-none dark:text-white"
                 />
                 <div className="flex gap-4">
                    <button onClick={addNote} className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">GUARDAR NOTA</button>
                    <button className="bg-slate-900 text-white p-4 rounded-2xl flex items-center gap-2"><Sparkles className="w-5 h-5" /></button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default NotesModule;
