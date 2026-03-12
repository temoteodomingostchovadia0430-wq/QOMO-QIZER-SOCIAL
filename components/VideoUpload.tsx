
import React, { useRef, useState } from 'react';
import { Video, X, Film, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VideoUploadProps {
  onVideoSelect: (videoUrl: string | null) => void;
  selectedVideo: string | null;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onVideoSelect, selectedVideo }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        alert("O vídeo é muito grande! O limite é 50MB.");
        return;
      }

      setIsUploading(true);
      // Simulate upload delay
      setTimeout(() => {
        const url = URL.createObjectURL(file);
        onVideoSelect(url);
        setIsUploading(false);
      }, 1500);
    }
  };

  const removeVideo = () => {
    onVideoSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="video/*"
        className="hidden"
      />

      <AnimatePresence>
        {selectedVideo ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative rounded-xl overflow-hidden bg-black aspect-video mb-4 shadow-lg border border-slate-200 dark:border-slate-800"
          >
            <video 
              src={selectedVideo} 
              className="w-full h-full object-contain" 
              controls 
            />
            <button
              onClick={removeVideo}
              className="absolute top-2 right-2 bg-black/60 hover:bg-black text-white p-1.5 rounded-full transition-all backdrop-blur-sm z-10"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2 left-2 bg-emerald-500/80 backdrop-blur-sm text-white text-[10px] font-black px-2 py-1 rounded-md flex items-center gap-1 uppercase tracking-widest">
              <Film className="w-3 h-3" />
              Vídeo Pronto
            </div>
          </motion.div>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className={`flex items-center gap-2 p-2 rounded-lg transition-all ${isUploading ? 'bg-slate-100 dark:bg-slate-800 text-slate-400' : 'text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20'}`}
            title="Upload Vídeo"
          >
            {isUploading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Video className="w-5 h-5" />
            )}
            <span className="text-[10px] font-black hidden sm:inline uppercase tracking-widest">
              {isUploading ? 'A processar...' : 'Vídeo'}
            </span>
          </button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoUpload;
