
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Image, MapPin, Smile, Sparkles, Loader2, Send, X, Sticker, Type as TypeIcon, Hash, Video } from 'lucide-react';
import { generatePostDraft, generateHDImage } from '../services/geminiService';
import { firestoreService } from '../services/firestoreService';
import { CURRENT_USER } from '../constants';
import { Post } from '../types';
import VideoUpload from './VideoUpload';

interface CreatePostProps {
  onPostCreated: (post: Post) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiImage, setAiImage] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [showStickers, setShowStickers] = useState(false);

  const mockStickers = [
    '🔥', '🚀', '✨', '💎', '🎨', '🎮', '❤️', '🦄', '🌟', '🌈', '🍕', '🎉'
  ];

  const handleAiDraft = async () => {
    if (!content && !confirm("No topic provided. Generate a random creative post?")) return;
    setIsGenerating(true);
    const draft = await generatePostDraft(content || 'a random positive thought about technology');
    setContent(draft);
    setIsGenerating(false);
  };

  const handleAiImage = async () => {
    if (!content && !title) {
      alert("Please provide some text or title so the AI knows what to visualize!");
      return;
    }

    // @ts-ignore
    if (window.aistudio && !(await window.aistudio.hasSelectedApiKey())) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
    }

    setIsGenerating(true);
    try {
      const prompt = `${title ? title + ': ' : ''}${content}`;
      const img = await generateHDImage(prompt);
      if (img) {
        setAiImage(img);
      } else {
        alert("Could not generate image at this time.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during image generation.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStickerClick = (sticker: string) => {
    setContent(prev => prev + ' ' + sticker);
    setShowStickers(false);
  };

  const handleSubmit = async () => {
    if (!content && !aiImage && !title) return;

    setIsGenerating(true);
    try {
      const postData: Omit<Post, "id"> = {
        user: CURRENT_USER,
        title: title.trim() || undefined,
        content: content.trim(),
        hashtag: hashtag.trim() ? (hashtag.startsWith('#') ? hashtag : `#${hashtag}`) : undefined,
        image: aiImage || undefined,
        video: videoUrl || undefined,
        likes: 0,
        views: 0,
        comments: [],
        timestamp: new Date().toISOString(),
        aiGenerated: !!aiImage || content.includes('✨')
      };

      const postId = await firestoreService.addPost(postData);
      
      onPostCreated({
        id: postId,
        ...postData
      });

      setTitle('');
      setContent('');
      setHashtag('');
      setAiImage(null);
      setVideoUrl(null);
    } catch (error) {
      console.error("Error creating post in Firestore:", error);
      alert("Erro ao criar postagem. Verifique sua conexão.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-4 mb-6 relative transition-all">
      {/* Video Preview */}
      <VideoUpload onVideoSelect={setVideoUrl} selectedVideo={videoUrl} />

      {/* AI Image Preview */}
      {aiImage && (
        <div className="relative mb-4 group animate-in fade-in zoom-in duration-300">
          <img 
            src={aiImage} 
            alt="AI Visualization" 
            className="w-full h-56 object-cover rounded-xl shadow-inner bg-slate-100 dark:bg-slate-800" 
          />
          <button 
            onClick={() => setAiImage(null)}
            className="absolute top-2 right-2 bg-slate-900/60 hover:bg-slate-900 text-white p-1.5 rounded-full transition-all backdrop-blur-sm"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-2 left-2 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 uppercase" style={{ backgroundColor: 'var(--theme-primary)', opacity: 0.8 }}>
            <Sparkles className="w-3 h-3" />
            AI Generated
          </div>
        </div>
      )}

      <div className="flex space-x-3 mb-2">
        <img src={CURRENT_USER.avatar} alt="Me" className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-50 dark:ring-slate-800" />
        <div className="flex-1 space-y-2">
          {/* TÍTULO INPUT */}
          <div className="relative">
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título da sua cápsula..."
              className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-xl px-4 py-2 text-sm font-black uppercase tracking-tight focus:ring-1 focus:ring-emerald-500 outline-none text-slate-900 dark:text-white"
            />
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="O que está a pensar? Use IA ✨ ou Stickers..."
            className="w-full bg-transparent border-none focus:ring-0 text-slate-800 dark:text-slate-200 placeholder-slate-400 resize-none min-h-[80px] text-sm font-medium"
          />

          {/* HASHTAG INPUT */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-black text-xs" style={{ color: 'var(--theme-primary)' }}>#</span>
            <input 
              type="text"
              value={hashtag}
              onChange={(e) => setHashtag(e.target.value.replace(/\s/g, ''))}
              placeholder="hashtag"
              className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-xl py-2 pl-7 pr-4 text-[10px] font-black uppercase tracking-widest outline-none text-slate-900 dark:text-white focus:ring-1"
              style={{ '--tw-ring-color': 'var(--theme-primary)' } as any}
            />
          </div>
        </div>
      </div>

      {showStickers && (
        <div className="absolute bottom-16 left-4 right-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-4 shadow-xl z-20 flex flex-wrap gap-4 animate-in slide-in-from-bottom-2">
           {mockStickers.map(s => (
             <button key={s} onClick={() => handleStickerClick(s)} className="text-2xl hover:scale-125 transition-transform">{s}</button>
           ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-slate-50 dark:border-slate-800">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button 
            onClick={handleAiDraft}
            disabled={isGenerating}
            className="flex items-center space-x-1 p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-500 transition-colors disabled:opacity-50"
            title="AI Draft"
          >
            <Sparkles className="w-5 h-5" />
          </button>
          
          <button 
            onClick={handleAiImage}
            disabled={isGenerating || !!videoUrl}
            className={`flex items-center gap-1.5 p-2 rounded-lg transition-colors disabled:opacity-50 ${aiImage ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' : 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'}`}
            title="AI Image"
          >
            <Image className="w-5 h-5" />
            <span className="text-[10px] font-bold hidden sm:inline uppercase">Gerar Imagem IA</span>
          </button>

          <button 
            onClick={() => setShowStickers(!showStickers)}
            className="p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-400 flex items-center gap-1"
          >
            <Sticker className="w-5 h-5" />
            <span className="text-[10px] font-bold hidden sm:inline uppercase">Stickers</span>
          </button>
        </div>

        <motion.button 
          whileHover={{ 
            scale: 1.08, 
            boxShadow: "0 0 25px var(--theme-primary)",
            filter: "brightness(1.2)"
          }}
          whileTap={{ 
            scale: 0.85, 
            y: 3,
            boxShadow: "0 0 10px var(--theme-primary)"
          }}
          transition={{ 
            type: "spring", 
            stiffness: 600, 
            damping: 12,
            mass: 0.5
          }}
          onClick={handleSubmit}
          disabled={(!content && !aiImage && !videoUrl && !title) || isGenerating}
          className="text-white px-6 py-2 rounded-full font-black text-sm shadow-lg transition-all disabled:opacity-50 uppercase tracking-widest flex items-center gap-2"
          style={{ backgroundColor: 'var(--theme-primary)' }}
        >
          {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          Post
        </motion.button>
      </div>
    </div>
  );
};

export default CreatePost;
