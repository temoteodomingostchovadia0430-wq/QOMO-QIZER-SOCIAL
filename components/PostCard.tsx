
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Post, User } from '../types';
import { 
  Heart, 
  Share2, 
  MoreHorizontal, 
  Eye, 
  Bookmark,
  ThumbsUp,
  MessageSquare, 
  CheckCircle2,
  HandHeart,
  Smile,
  Flame,
  Angry,
  Frown,
  ShieldCheck,
  Crown
} from 'lucide-react';

interface PostCardProps {
  post: Post;
  onUserClick?: (user: User) => void;
  onDelete?: (postId: string) => void;
  onShare?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onUserClick, onDelete, onShare }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeColor, setLikeColor] = useState('text-emerald-500');
  const [selectedReaction, setSelectedReaction] = useState<any>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showLikeAnim, setShowLikeAnim] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [hoveredReactionId, setHoveredReactionId] = useState<string | null>(null);
  const [isHidden, setIsHidden] = useState(false);

  const handleNotInterested = () => {
    setIsHidden(true);
    setShowOptions(false);
  };

  if (isHidden) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl mb-4 text-center border border-dashed border-slate-200 dark:border-slate-700"
      >
        <div className="flex flex-col items-center gap-2">
          <Frown className="w-8 h-8 text-slate-400" />
          <p className="text-micro text-slate-500">Post ocultado. Mostraremos menos conteúdo como este.</p>
          <button 
            onClick={() => setIsHidden(false)}
            className="mt-2 px-4 py-2 bg-white dark:bg-slate-700 rounded-full shadow-sm text-micro text-emerald-500 hover:bg-slate-50 dark:hover:bg-slate-600 transition-all"
          >
            Desfazer
          </button>
        </div>
      </motion.div>
    );
  }

  const reactionColors = [
    { text: 'text-red-500', bg: 'bg-red-500' },
    { text: 'text-pink-500', bg: 'bg-pink-500' },
    { text: 'text-rose-500', bg: 'bg-rose-500' },
    { text: 'text-emerald-500', bg: 'bg-emerald-500' },
    { text: 'text-blue-500', bg: 'bg-blue-500' },
    { text: 'text-indigo-500', bg: 'bg-indigo-500' },
    { text: 'text-amber-500', bg: 'bg-amber-500' },
    { text: 'text-yellow-500', bg: 'bg-yellow-500' },
    { text: 'text-violet-500', bg: 'bg-violet-500' },
    { text: 'text-slate-500', bg: 'bg-slate-500' },
  ];

  const reactions = [
    { id: 'love', emoji: '😍', color: 'text-rose-500', label: 'Amor', anim: { scale: [1, 1.3, 1.1, 1], rotate: [0, -10, 10, 0], y: [0, -5, 0] } },
    { id: 'passionate', emoji: '😘', color: 'text-pink-500', label: 'Apaixonado', anim: { scale: [1, 1.2, 1], x: [0, 5, -5, 0], rotate: [0, 15, -15, 0] } },
    { id: 'care', emoji: '🥰', color: 'text-emerald-500', label: 'Carinho', anim: { rotate: [0, 15, -15, 0], scale: [1, 1.2, 1], opacity: [1, 0.8, 1] } },
    { id: 'support', emoji: '🫂', color: 'text-blue-500', label: 'Suporte', anim: { scale: [1, 1.1, 1], y: [0, -3, 0] } },
    { id: 'appreciation', emoji: '🙌', color: 'text-indigo-500', label: 'Apoio', anim: { y: [0, -10, 0], scale: [1, 1.2, 1] } },
    { id: 'happy', emoji: '🤩', color: 'text-amber-500', label: 'Muito Feliz', anim: { scale: [1, 1.4, 1], rotate: [0, 360], filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"] } },
    { id: 'humor', emoji: '😂', color: 'text-yellow-500', label: 'Humor', anim: { rotate: [-10, 10, -10], scale: [1, 1.2, 1], x: [-2, 2, -2] } },
    { id: 'sad', emoji: '😢', color: 'text-violet-600', label: 'Triste', anim: { y: [0, 5, 0], opacity: [1, 0.6, 1], scale: [1, 0.9, 1] } },
    { id: 'anger', emoji: '😡', color: 'text-red-600', label: 'Ira', anim: { x: [-3, 3, -3, 3, 0], scale: [1, 1.2, 1], filter: ["saturate(1)", "saturate(2)", "saturate(1)"] } },
  ];

  const handleLike = (reaction?: any, customColor?: string) => {
    if (reaction) {
      setLikeColor(customColor || reaction.color);
      setSelectedReaction({ ...reaction, color: customColor || reaction.color });
      setIsLiked(true);
      setShowLikeAnim(true);
    } else {
      const newLikedState = !isLiked;
      setIsLiked(newLikedState);
      if (newLikedState) {
        setShowLikeAnim(true);
        const defaultReaction = reactions[0];
        setLikeColor(defaultReaction.color);
        setSelectedReaction(defaultReaction);
      } else {
        setSelectedReaction(null);
      }
    }
    setShowReactions(false);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  useEffect(() => {
    if (showLikeAnim) {
      const timer = setTimeout(() => setShowLikeAnim(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showLikeAnim]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={`bg-white dark:bg-slate-900 sm:rounded-[2rem] shadow-sm border-y sm:border border-slate-200 dark:border-slate-800/50 overflow-hidden mb-4 transition-all relative group/card hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/20`}
    >
      <AnimatePresence>
        {showLikeAnim && selectedReaction && (
          <motion.div 
            initial={{ scale: 0, opacity: 0, y: 0 }}
            animate={{ 
              scale: [0, 2.5, 2], 
              opacity: [0, 1, 0],
              y: [0, -120, -180],
              rotate: [0, -20, 20, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, type: "keyframes", ease: "backOut" }}
            className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <span className="text-8xl drop-shadow-[0_0_30px_rgba(0,0,0,0.3)]">
              {selectedReaction.emoji}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onUserClick?.(post.user)}>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-tr from-emerald-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
              <img src={post.user.avatar} className="relative w-11 h-11 rounded-full object-cover ring-2 ring-white dark:ring-slate-900 shadow-md" />
              {post.user.isOnline && (
                <div 
                  className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-900 shadow-lg" 
                  style={{ backgroundColor: 'var(--theme-primary)', boxShadow: '0 0 8px var(--theme-primary)' }}
                />
              )}
              {post.user.isVerified && (
                <div 
                  className={`absolute -bottom-1 -right-1 text-white rounded-full p-0.5 border-2 border-white dark:border-slate-900 shadow-lg`}
                  style={{ backgroundColor: post.user.isCreator ? 'var(--theme-primary)' : '#00d2ff' }}
                >
                  {post.user.isCreator ? <ShieldCheck className="w-3 h-3 fill-current" /> : <CheckCircle2 className="w-3 h-3 fill-current" />}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1 group-hover:text-emerald-500 transition-colors">
                {post.user.name}
                {post.user.isCreator && (
                  <span className="text-micro px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 ml-1">CRIADOR</span>
                )}
              </h3>
              <div className="flex items-center gap-1.5 text-slate-500">
                <p className="text-micro opacity-60">{post.timestamp}</p>
                <span className="text-[10px] opacity-30">•</span>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3 opacity-40" />
                  <span className="text-micro opacity-60">{post.views.toLocaleString()}</span>
                </div>
                {post.isAd && (
                  <>
                    <span className="text-[10px] opacity-30">•</span>
                    <span className="text-micro text-amber-500 font-black flex items-center gap-1">
                      <Crown className="w-3 h-3" /> Patrocinado
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="relative">
            <button onClick={() => setShowOptions(!showOptions)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 p-2.5 rounded-2xl transition-all">
              <MoreHorizontal className="w-5 h-5" />
            </button>
            
            <AnimatePresence>
              {showOptions && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowOptions(false)} />
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 mt-2 w-64 glass rounded-[2rem] shadow-2xl z-50 overflow-hidden p-2"
                  >
                    <button 
                      onClick={handleNotInterested}
                      className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-500/5 rounded-2xl transition-colors text-left"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <Frown className="w-4 h-4 text-slate-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-micro text-slate-900 dark:text-white">Não Interessante</span>
                        <span className="text-[9px] text-slate-400 uppercase font-bold">Ocultar posts similares</span>
                      </div>
                    </button>

                    <button 
                      onClick={() => { setIsSaved(!isSaved); setShowOptions(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-500/5 rounded-2xl transition-colors text-left"
                    >
                      <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center">
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500 text-amber-500' : 'text-amber-500'}`} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-micro text-slate-900 dark:text-white">{isSaved ? 'Remover dos Salvos' : 'Salvar Post'}</span>
                        <span className="text-[9px] text-slate-400 uppercase font-bold">Guardar na biblioteca</span>
                      </div>
                    </button>

                    {onDelete && (
                      <button 
                        onClick={() => { onDelete(post.id); setShowOptions(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-bold text-red-600 hover:bg-red-500/5 rounded-2xl transition-colors text-left border-t border-slate-100 dark:border-slate-800/50 mt-1 pt-3"
                      >
                        <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center">
                          <Angry className="w-4 h-4 text-red-500" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-micro text-red-600">Eliminar Post</span>
                          <span className="text-[9px] text-red-400 uppercase font-bold">Remover permanentemente</span>
                        </div>
                      </button>
                    )}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {post.title && (
          <h2 className="text-display text-xl font-black text-slate-900 dark:text-white mb-2 leading-tight uppercase italic">
            {post.title}
          </h2>
        )}

        <p className="text-slate-700 dark:text-slate-300 text-[15px] leading-relaxed mb-4 whitespace-pre-wrap font-medium">
          {post.content}
        </p>

        {post.hashtag && (
          <div className="flex flex-wrap gap-2 mb-4">
            <span 
              className="px-3 py-1 rounded-full bg-theme-primary/10 text-theme-primary text-micro cursor-pointer hover:bg-theme-primary/20 transition-all border border-theme-primary/20"
            >
              {post.hashtag}
            </span>
          </div>
        )}
      </div>

      {post.image && (
        <div className="relative group/img bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <img 
            src={post.image} 
            className="w-full h-auto object-cover max-h-[650px] transition-transform duration-700 group-hover/img:scale-105" 
            alt="Post visual" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity" />
        </div>
      )}
      
      {post.video && (
        <div className="relative group/vid bg-black aspect-video overflow-hidden">
          <video 
            src={post.video} 
            className="w-full h-full object-contain" 
            controls 
            playsInline
          />
        </div>
      )}

      <div className="px-3 py-4 border-t border-slate-100 dark:border-slate-800/50">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 relative">
            <div className="flex-1 relative">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLike()}
                onMouseEnter={() => setShowReactions(true)}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl transition-all text-micro ${isLiked ? `${likeColor} bg-slate-50 dark:bg-slate-800/50 shadow-sm border border-slate-200 dark:border-slate-700` : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent'}`}
              >
                <motion.div
                  animate={isLiked ? { scale: [1, 1.4, 1], rotate: [0, 15, -15, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  className="text-lg"
                >
                  {isLiked ? selectedReaction?.emoji : <ThumbsUp className="w-4 h-4" />}
                </motion.div>
                <span>{isLiked ? (selectedReaction?.label || 'Curtiu') : 'Curtir'}</span>
              </motion.button>

              <AnimatePresence>
                {showReactions && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    className="absolute bottom-full left-0 mb-4 glass p-2 rounded-[2.5rem] shadow-2xl flex gap-1 z-50"
                    onMouseLeave={() => setShowReactions(false)}
                  >
                    <div className="flex gap-1 py-1 px-1">
                      {reactions.map((r, i) => (
                        <div 
                          key={i} 
                          className="relative flex flex-col items-center group/btn"
                          onMouseEnter={() => setHoveredReactionId(r.id)}
                          onMouseLeave={() => setHoveredReactionId(null)}
                        >
                          <AnimatePresence>
                            {hoveredReactionId === r.id && (
                              <motion.div 
                                initial={{ opacity: 0, y: 5, scale: 0.5 }}
                                animate={{ opacity: 1, y: -8, scale: 1 }}
                                exit={{ opacity: 0, y: 5, scale: 0.5 }}
                                className="absolute bottom-full mb-2 glass px-3 py-1 rounded-full shadow-lg z-[60]"
                              >
                                <div className="flex gap-2">
                                  {reactionColors.slice(0, 5).map((color, ci) => (
                                    <button
                                      key={ci}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleLike(r, color.text);
                                      }}
                                      className={`w-3.5 h-3.5 rounded-full ${color.bg} hover:scale-125 transition-transform shadow-sm border border-white/20`}
                                    />
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <button 
                            onClick={() => handleLike(r)}
                            className="flex flex-col items-center p-2 rounded-full hover:bg-white/10 transition-colors"
                          >
                            <motion.div
                              animate={r.anim}
                              transition={{ repeat: Infinity, duration: 2, type: "keyframes", ease: "easeInOut" }}
                              className="text-2xl"
                            >
                              {r.emoji}
                            </motion.div>
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-micro transition-all border border-transparent"
            >
              <MessageSquare className="w-4 h-4 text-theme-primary" /> 
              {post.comments && post.comments.length > 0 && (
                <span className="font-black text-theme-primary">
                  {post.comments.length}
                </span>
              )}
              <span>Comentar</span>
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={onShare} 
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-micro transition-all border border-transparent"
            >
              <Share2 className="w-4 h-4" /> 
              <span>Partilhar</span>
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl transition-all text-micro ${isSaved ? 'text-amber-500 bg-amber-500/10 shadow-sm border border-amber-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent'}`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} /> 
              <span>{isSaved ? 'Salvo' : 'Salvar'}</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;
