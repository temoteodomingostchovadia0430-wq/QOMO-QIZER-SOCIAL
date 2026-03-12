
import React, { useState } from 'react';
import { Sparkles, Video, Image, Loader2, Wand2, ShieldCheck, CreditCard, UserCircle } from 'lucide-react';
import { generateHDImage, generateVideo, generateNexusAvatar } from '../services/geminiService';
import { CURRENT_USER } from '../constants';

const CreativeStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [type, setType] = useState<'image' | 'video' | 'nexus_id'>('image');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState('');

  const handleGenerate = async () => {
    // Check for API Key if needed for Pro models
    // @ts-ignore
    if (window.aistudio && !(await window.aistudio.hasSelectedApiKey())) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
    }

    setIsGenerating(true);
    setResult(null);
    
    try {
      if (type === 'image') {
        if (!prompt) return;
        setStatusMsg('Crafting your HD masterpiece...');
        const img = await generateHDImage(prompt, "2K");
        setResult(img);
      } else if (type === 'video') {
        if (!prompt) return;
        setStatusMsg('Nexus AI is directing your scene... this takes about 60s');
        const vid = await generateVideo(prompt);
        setResult(vid);
      } else if (type === 'nexus_id') {
        setStatusMsg('Synthesizing your Nexus Identity Avatar...');
        const avatar = await generateNexusAvatar(CURRENT_USER.name);
        setResult(avatar);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
      setStatusMsg('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-black rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden mb-8 border border-white/10">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-indigo-500 p-2 rounded-xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black tracking-tight italic uppercase">NEXUS STUDIO PRO</h2>
          </div>
          
          <p className="text-indigo-200 text-sm mb-6 max-w-md">
            Unleash the universe. High-Definition imagery and cinematic videos synthesized via Gemini.
          </p>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 p-1.5 bg-white/5 rounded-[2rem] border border-white/10">
              <button 
                onClick={() => setType('image')}
                className={`flex-1 py-3 rounded-2xl font-black text-[10px] flex items-center justify-center gap-2 transition-all uppercase tracking-widest ${type === 'image' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-400 hover:text-white'}`}
              >
                <Image className="w-4 h-4" /> HD IMAGE
              </button>
              <button 
                onClick={() => setType('video')}
                className={`flex-1 py-3 rounded-2xl font-black text-[10px] flex items-center justify-center gap-2 transition-all uppercase tracking-widest ${type === 'video' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-400 hover:text-white'}`}
              >
                <Video className="w-4 h-4" /> VEO VIDEO
              </button>
              <button 
                onClick={() => setType('nexus_id')}
                className={`flex-1 py-3 rounded-2xl font-black text-[10px] flex items-center justify-center gap-2 transition-all uppercase tracking-widest ${type === 'nexus_id' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' : 'text-slate-400 hover:text-white'}`}
              >
                <UserCircle className="w-4 h-4" /> NEXUS ID
              </button>
            </div>

            {type !== 'nexus_id' && (
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your vision in detail..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all min-h-[120px] placeholder:text-slate-600"
              />
            )}

            {type === 'nexus_id' && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-4 animate-in slide-in-from-top-2">
                 <div className="bg-emerald-500/20 p-2 rounded-lg">
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                 </div>
                 <p className="text-xs text-emerald-100 leading-relaxed font-bold">
                   Nexus Identity mode will synthesize a futuristic profile picture that perfectly matches our ecosystem's aesthetic.
                 </p>
              </div>
            )}

            <button 
              onClick={handleGenerate}
              disabled={isGenerating || (type !== 'nexus_id' && !prompt)}
              className={`w-full py-4 rounded-2xl font-black text-xs hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-widest ${
                type === 'nexus_id' ? 'bg-emerald-500 text-slate-950' : 'bg-white text-indigo-900'
              }`}
            >
              {isGenerating ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> {statusMsg}</>
              ) : (
                <><Wand2 className="w-5 h-5" /> {type === 'nexus_id' ? 'SYNTHESIZE IDENTITY' : 'GENERATE IN HD'}</>
              )}
            </button>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[100px] -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/20 blur-[100px] -ml-32 -mb-32" />
      </div>

      {result && (
        <div className="bg-white rounded-[2.5rem] p-4 shadow-xl border border-slate-100 animate-in zoom-in-95 duration-700">
           {type === 'video' ? (
             <video src={result} controls autoPlay className="w-full rounded-[2rem] shadow-2xl" />
           ) : (
             <img src={result} className="w-full rounded-[2rem] shadow-2xl" alt="AI Generated Asset" />
           )}
           <div className="p-6">
             <div className="flex items-center justify-between">
               <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Masterpiece Synthesized</span>
                  <span className="text-xs font-bold text-indigo-600">Ultra-High Fidelity • 2024 Node</span>
               </div>
               <button className="bg-indigo-50 text-indigo-600 px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-100 transition-all">Download</button>
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default CreativeStudio;
