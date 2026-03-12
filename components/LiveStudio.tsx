
import React, { useState, useRef, useEffect } from 'react';
import { Radio, Users, MessageSquare, Share2, X, Sparkles, Mic, Camera, Settings, Heart, Zap, Play } from 'lucide-react';

const LiveStudio: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isLive, setIsLive] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      setIsLive(true);
      setViewerCount(Math.floor(Math.random() * 50) + 10);
    } catch (err) {
      alert("Erro ao acessar câmera para Live.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-[150] flex flex-col animate-in fade-in duration-500">
      <div className="relative flex-1 bg-slate-900 overflow-hidden">
        {isLive ? (
          <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
             <div className="w-24 h-24 bg-rose-600/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <Radio className="w-12 h-12 text-rose-500" />
             </div>
             <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-4">Pronto para Entrar ao Vivo?</h2>
             <p className="text-slate-400 text-sm max-w-md mb-8 font-medium">Transmita para todo o ecossistema Nexus com latência zero e suporte de IA para moderação.</p>
             <button 
                onClick={startStream}
                className="bg-rose-600 text-white px-12 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-rose-900/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
             >
                <Play className="w-5 h-5 fill-current" /> INICIAR TRANSMISSÃO
             </button>
          </div>
        )}

        {/* Overlay Controles Live */}
        {isLive && (
          <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
            <div className="flex justify-between items-start pointer-events-auto">
               <div className="flex items-center gap-3">
                  <div className="bg-rose-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                     <div className="w-2 h-2 bg-white rounded-full animate-ping" /> AO VIVO
                  </div>
                  <div className="bg-black/40 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                     <Users className="w-3.5 h-3.5" /> {viewerCount}
                  </div>
               </div>
               <button onClick={onClose} className="p-3 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-rose-600 transition-all"><X /></button>
            </div>

            <div className="flex justify-between items-end pointer-events-auto">
               <div className="flex-1 max-w-xs space-y-2">
                  <div className="bg-black/20 backdrop-blur-md p-3 rounded-2xl border border-white/10 animate-in slide-in-from-left">
                     <p className="text-[10px] text-white/60 font-black uppercase">Sarah Chen</p>
                     <p className="text-xs text-white">Incrível! Qual IA você está usando? 🔥</p>
                  </div>
                  <div className="bg-black/20 backdrop-blur-md p-3 rounded-2xl border border-white/10 animate-in slide-in-from-left delay-150">
                     <p className="text-[10px] text-white/60 font-black uppercase">Jordan</p>
                     <p className="text-xs text-white">Nexus Pay está funcionando muito bem!</p>
                  </div>
               </div>
               
               <div className="flex flex-col gap-3">
                  <button className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20"><Sparkles className="w-6 h-6" /></button>
                  <button className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20"><Heart className="w-6 h-6" /></button>
                  <button className="p-4 bg-indigo-600 text-white rounded-full shadow-xl"><MessageSquare className="w-6 h-6" /></button>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveStudio;
