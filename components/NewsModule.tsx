
import React, { useState } from 'react';
import { Newspaper, Sparkles, Clock, Share2, Bookmark, ChevronRight, Loader2 } from 'lucide-react';
import { NewsArticle } from '../types';

const MOCK_NEWS: NewsArticle[] = [
  { id: 'n1', title: 'Nexus anuncia integração quântica em Maputo', category: 'Tech', image: 'https://picsum.photos/seed/news1/600/400', source: 'Nexus Daily', time: '10 min ago' },
  { id: 'n2', title: 'Economia Digital: O impacto das criptos em África', category: 'Economia', image: 'https://picsum.photos/seed/news2/600/400', source: 'Finanças Today', time: '1h ago' },
  { id: 'n3', title: 'Lançamento do Veo 3.1 revoluciona vídeos por IA', category: 'AI', image: 'https://picsum.photos/seed/news3/600/400', source: 'Google Tech', time: '3h ago' },
];

const NewsModule: React.FC = () => {
  const [summarizingId, setSummarizingId] = useState<string | null>(null);
  const [summary, setSummary] = useState<Record<string, string>>({});

  const handleSummarize = (id: string) => {
    setSummarizingId(id);
    setTimeout(() => {
      setSummary(prev => ({ ...prev, [id]: "1. Nova infraestrutura em Moçambique.\n2. Redução de latência em 40%.\n3. Disponível para todos usuários Pro." }));
      setSummarizingId(null);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-10">
        <div className="bg-slate-900 p-3 rounded-2xl">
          <Newspaper className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Nexus News</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Informação em tempo real</p>
        </div>
      </div>

      <div className="space-y-8">
        {MOCK_NEWS.map(article => (
          <div key={article.id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm group">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 relative overflow-hidden">
                <img src={article.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-indigo-600 text-white text-[9px] font-black px-2 py-1 rounded uppercase">{article.category}</div>
              </div>
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-[10px] font-bold text-slate-400 uppercase">
                    <span>{article.source}</span>
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    <span>{article.time}</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 leading-tight">{article.title}</h3>
                  
                  {summary[article.id] && (
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-2xl mb-4 border border-indigo-100 dark:border-indigo-800 animate-in slide-in-from-top-2">
                       <p className="text-xs font-black text-indigo-600 uppercase mb-2 flex items-center gap-2"><Sparkles className="w-3 h-3" /> Resumo IA</p>
                       <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line font-medium leading-relaxed">{summary[article.id]}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4">
                  <button 
                    onClick={() => handleSummarize(article.id)}
                    className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-700 transition-colors"
                  >
                    {summarizingId === article.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    {summary[article.id] ? 'Resumo Atualizado' : 'Resumir com IA'}
                  </button>
                  <div className="flex gap-2">
                    <button className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-indigo-600 transition-all"><Share2 className="w-4 h-4" /></button>
                    <button className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-indigo-600 transition-all"><Bookmark className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsModule;
