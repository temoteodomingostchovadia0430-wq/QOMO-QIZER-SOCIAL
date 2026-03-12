
import React, { useState } from 'react';
import { Sparkles, Wand2, X, Check, Loader2, Image as ImageIcon, Cpu, Palette, Zap } from 'lucide-react';
import { generateNexusAvatar } from '../services/geminiService';

interface AvatarStudioProps {
  userName: string;
  onAvatarSelected: (url: string) => void;
  onClose: () => void;
}

const AVATAR_STYLES = [
  { id: 'cyber', label: 'Cyber-Noir', prompt: 'Cyberpunk aesthetic, neon indigo highlights, rainy futuristic city bokeh, high-tech gear.' },
  { id: 'ethereal', label: 'Ethereal', prompt: 'Dreamy soft lighting, golden hour glow, floating geometric shapes, celestial background.' },
  { id: 'minimal', label: 'Minimalist', prompt: 'Clean vector-style 3D render, flat pastel colors, soft clay texture, simple abstract background.' },
  { id: 'bio', label: 'Bio-Organic', prompt: 'Nature-tech hybrid, glowing floral patterns, soft forest greens, organic crystalline structures.' },
  { id: 'quantum', label: 'Quantum', prompt: 'Energy particles, deep space nebulas, holographic data streams, vibrant violet and cyan.' },
];

const AvatarStudio: React.FC<AvatarStudioProps> = ({ userName, onAvatarSelected, onClose }) => {
  const [selectedStyle, setSelectedStyle] = useState(AVATAR_STYLES[0]);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    // Check for API Key
    // @ts-ignore
    if (window.aistudio && !(await window.aistudio.hasSelectedApiKey())) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
    }

    setIsGenerating(true);
    try {
      const prompt = customPrompt || selectedStyle.prompt;
      const url = await generateNexusAvatar(userName, prompt);
      if (url) setPreviewUrl(url);
    } catch (error) {
      console.error("Studio Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Lado Esquerdo: Preview */}
        <div className="md:w-1/2 bg-slate-50 dark:bg-slate-950 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800">
          <div className="relative group mb-6">
            <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-tr from-indigo-500 via-purple-500 to-emerald-500 opacity-20 blur-xl group-hover:opacity-40 transition-opacity animate-pulse" />
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-[2.5rem] bg-white dark:bg-slate-800 overflow-hidden shadow-2xl border-4 border-white dark:border-slate-700">
              {previewUrl ? (
                <img src={previewUrl} className="w-full h-full object-cover" alt="Avatar Preview" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 dark:text-slate-600">
                  <ImageIcon className="w-12 h-12 mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Aguardando Síntese</span>
                </div>
              )}
              {isGenerating && (
                <div className="absolute inset-0 bg-indigo-900/40 backdrop-blur-sm flex items-center justify-center">
                  <Loader2 className="w-10 h-10 text-white animate-spin" />
                </div>
              )}
            </div>
          </div>
          
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">
            Visualização em HD 1K
          </p>

          <div className="flex gap-3 w-full">
            <button 
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-black text-[10px] uppercase tracking-widest hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
            >
              Cancelar
            </button>
            <button 
              onClick={() => previewUrl && onAvatarSelected(previewUrl)}
              disabled={!previewUrl || isGenerating}
              className="flex-[2] py-3 rounded-2xl bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-500/20 disabled:opacity-50 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" /> Aplicar Avatar
            </button>
          </div>
        </div>

        {/* Lado Direito: Opções */}
        <div className="md:w-1/2 p-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Avatar Studio</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-900 dark:hover:text-white"><X className="w-6 h-6" /></button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 block">Arquétipos Nexus</label>
              <div className="grid grid-cols-2 gap-3">
                {AVATAR_STYLES.map(style => (
                  <button
                    key={style.id}
                    onClick={() => { setSelectedStyle(style); setCustomPrompt(''); }}
                    className={`p-3 rounded-2xl border-2 text-left transition-all ${selectedStyle.id === style.id && !customPrompt ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-50 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50'}`}
                  >
                    <p className={`text-[10px] font-black uppercase tracking-tight ${selectedStyle.id === style.id && !customPrompt ? 'text-indigo-600' : 'text-slate-600 dark:text-slate-400'}`}>
                      {style.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-slate-100 dark:bg-slate-800" />

            <div>
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 block flex items-center gap-2">
                <Palette className="w-3 h-3" /> Estilo Customizado
              </label>
              <textarea 
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Ex: Guerreiro africano futurista, estilo pintura a óleo..."
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-xs font-medium focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white h-24 resize-none"
              />
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-4 rounded-2xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl"
            >
              {isGenerating ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Sintetizando...</>
              ) : (
                <><Wand2 className="w-5 h-5" /> Iniciar Geração IA</>
              )}
            </button>
            
            <div className="flex items-center gap-3 p-4 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl border border-indigo-100 dark:border-indigo-500/20">
               <Zap className="w-5 h-5 text-indigo-600" />
               <p className="text-[9px] font-bold text-indigo-700 dark:text-indigo-400 uppercase leading-relaxed">
                 A geração utiliza Gemini 3 Ultra-Vision. Cada síntese consome 25 Nexus Credits.
               </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AvatarStudio;
