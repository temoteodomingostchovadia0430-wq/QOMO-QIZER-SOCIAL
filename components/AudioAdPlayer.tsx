
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Mock audio ads (In a real app, these would come from an Ad SDK like AdMob or Unity Ads)
const MOCK_AUDIO_ADS = [
  { id: 'ad1', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', duration: 15, advertiser: 'Coca-Cola', reward: 0.5 },
  { id: 'ad2', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', duration: 10, advertiser: 'Samsung', reward: 0.3 },
  { id: 'ad3', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', duration: 20, advertiser: 'Nike', reward: 0.7 },
  { id: 'ad4', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', duration: 12, advertiser: 'Toyota', reward: 0.4 },
];

interface AudioAdPlayerProps {
  onAdFinished?: (reward: number) => void;
}

const AudioAdPlayer: React.FC<AudioAdPlayerProps> = ({ onAdFinished }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAd, setCurrentAd] = useState<typeof MOCK_AUDIO_ADS[0] | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [nextAdIn, setNextAdIn] = useState<number>(30); // Seconds until next ad attempt

  useEffect(() => {
    // Ad scheduler logic
    const timer = setInterval(() => {
      if (!isPlaying) {
        setNextAdIn(prev => {
          if (prev <= 0) {
            // Trigger ad
            const randomAd = MOCK_AUDIO_ADS[Math.floor(Math.random() * MOCK_AUDIO_ADS.length)];
            setCurrentAd(randomAd);
            setIsPlaying(true);
            return 120; // Reset to 2 minutes for next ad
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    if (currentAd && audioRef.current) {
      audioRef.current.src = currentAd.url;
      // Note: Browsers often block auto-play audio unless there's user interaction.
      // In a real app, we'd trigger this after the first click anywhere in the app.
      audioRef.current.play().catch(e => {
        console.log("Audio background ad blocked or failed:", e);
        // If blocked, we might want to show a small "Enable Audio Ads" button
      });
    }
  }, [currentAd]);

  const handleEnded = () => {
    if (currentAd && onAdFinished) {
      onAdFinished(currentAd.reward);
    }
    setIsPlaying(false);
    setCurrentAd(null);
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        onEnded={handleEnded} 
        muted={isMuted}
        className="hidden"
      />
      
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="fixed bottom-24 left-4 z-[100] bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-3 flex items-center gap-4 shadow-2xl min-w-[200px]"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Music className="w-5 h-5 text-white animate-bounce" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-slate-900">
                <Zap className="w-2 h-2 text-black fill-black" />
              </div>
            </div>

            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Renda Passiva</span>
                <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">• {currentAd?.reward} MT</span>
              </div>
              <span className="text-[10px] font-black text-white uppercase truncate max-w-[120px]">
                {currentAd?.advertiser}
              </span>
              <div className="w-full h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: currentAd?.duration || 15, ease: "linear" }}
                  className="h-full bg-emerald-500"
                />
              </div>
            </div>

            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-white" />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AudioAdPlayer;
