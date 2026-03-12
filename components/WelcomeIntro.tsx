
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Zap, MessageCircle, DollarSign, Volume2, VolumeX, Share2 } from 'lucide-react';

interface WelcomeIntroProps {
  onComplete: () => void;
}

const WelcomeIntro: React.FC<WelcomeIntroProps> = ({ onComplete }) => {
  const [showVideo, setShowVideo] = useState(true);
  const [step, setStep] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const features = [
    {
      icon: DollarSign,
      title: "Monetização Automática",
      description: "Ganhe comissões inteligentes calculadas automaticamente em cada transação global.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/20"
    },
    {
      icon: MessageCircle,
      title: "Comunicação Segura",
      description: "Conecte-se com mensagens criptografadas e total privacidade.",
      color: "text-blue-500",
      bg: "bg-blue-500/20"
    },
    {
      icon: Shield,
      title: "Proteção Absoluta",
      description: "Seus dados são protegidos por tecnologia quântica de ponta.",
      color: "text-indigo-500",
      bg: "bg-indigo-500/20"
    }
  ];

  useEffect(() => {
    if (!showVideo) {
      const timer = setInterval(() => {
        setStep((prev) => {
          if (prev < features.length - 1) return prev + 1;
          return prev;
        });
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [showVideo]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleVideoEnd = () => {
    setShowVideo(false);
  };

  if (showVideo) {
    return (
      <div className="fixed inset-0 z-[2000] bg-black flex items-center justify-center overflow-hidden">
        <video 
          ref={videoRef}
          autoPlay 
          playsInline
          onEnded={handleVideoEnd}
          className="w-full h-full object-cover"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-circuit-board-1123-large.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-16 bg-emerald-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/40">
                <Zap className="w-10 h-10 text-white fill-white" />
              </div>
              <h1 className="text-4xl font-black text-white tracking-tighter italic uppercase">QOMO QIZER SOCIAL</h1>
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-4">Bem-vindo ao Futuro</h2>
            <p className="text-slate-300 font-medium mb-12">Assista à nossa apresentação ou pule para começar.</p>
            
            <div className="flex items-center justify-center gap-6">
              <button 
                onClick={() => setShowVideo(false)}
                className="bg-white text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all"
              >
                Pular Apresentação
              </button>
              <button 
                onClick={toggleMute}
                className="p-4 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-white/20 transition-all"
              >
                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-xs h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 15, ease: "linear" }}
            className="h-full bg-emerald-500"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[2000] bg-slate-950 flex items-center justify-center overflow-hidden">
      <audio ref={audioRef} loop muted={isMuted}>
        <source src="https://cdn.pixabay.com/audio/2022/03/24/audio_7e641e30dd.mp3" type="audio/mpeg" />
      </audio>

      {/* Background Video Simulation */}
      <div className="absolute inset-0 opacity-40">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-circuit-board-1123-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950" />
      </div>

      <div className="relative z-10 w-full max-w-2xl px-8 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.2, y: -20 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="flex flex-col items-center"
          >
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, type: "keyframes", ease: "easeInOut" }}
              className={`w-28 h-28 ${features[step].bg} rounded-[3rem] flex items-center justify-center mb-10 shadow-[0_0_50px_rgba(16,185,129,0.2)] border border-white/10`}
            >
              {React.createElement(features[step].icon, { className: `w-14 h-14 ${features[step].color}` })}
            </motion.div>
            
            <h2 className="text-5xl sm:text-6xl font-black text-white tracking-tighter italic uppercase mb-6 leading-none drop-shadow-2xl">
              {features[step].title}
            </h2>
            
            <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-md mx-auto">
              {features[step].description}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-20 flex justify-center gap-3">
          {features.map((_, idx) => (
            <div 
              key={idx}
              className={`h-2 rounded-full transition-all duration-700 ${step === idx ? 'w-16 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'w-3 bg-white/10'}`}
            />
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-6">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: step === features.length - 1 ? 1 : 0, y: step === features.length - 1 ? 0 : 20 }}
            className="bg-white text-slate-950 px-16 py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)] border-4 border-emerald-500/20"
            onClick={onComplete}
          >
            Entrar no Universo
          </motion.button>

          <button 
            onClick={toggleMute}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            {isMuted ? 'Ativar Som' : 'Som Ativado'}
          </button>
        </div>
      </div>

      {/* Brand Logo Floating */}
      <div className="absolute top-12 left-12 flex items-center gap-3">
        <div className="w-12 h-12 bg-emerald-500 rounded-[1.25rem] flex items-center justify-center shadow-2xl shadow-emerald-500/40">
          <Zap className="w-7 h-7 text-white fill-white" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white tracking-tighter italic uppercase leading-none">QOMO QIZER</h1>
          <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">SOCIAL</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeIntro;
