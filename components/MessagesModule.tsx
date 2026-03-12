
import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send, MoreVertical, Phone, Video, ChevronLeft, Play, Pause, Trash2, X, Clock, Camera, Sparkles } from 'lucide-react';
import { User } from '../types';
import { MOCK_USERS, CURRENT_USER } from '../constants';
import { firestoreService } from '../services/firestoreService';

interface Message {
  id: string;
  senderId: string;
  text?: string;
  image?: string;
  isViewOnce?: boolean;
  hasViewed?: boolean;
  audio?: {
    duration: string;
    waveform: number[];
  };
  timestamp: string;
}

const VoiceBubble: React.FC<{ 
  audio: any; 
  isMe: boolean; 
  activeConversation: User | null; 
  timestamp: string; 
}> = ({ audio, isMe, activeConversation, timestamp }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  return (
    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} mb-4 animate-in slide-in-from-bottom-2`}>
      <div className={`flex items-center gap-3 p-3 rounded-2xl max-w-[85%] sm:max-w-md ${isMe ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white border border-slate-100 text-slate-900 shadow-sm'}`}>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isMe ? 'bg-white/20 hover:bg-white/30' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
        </button>
        
        <div className="flex-1 space-y-1">
          <div className="flex items-end gap-[2px] h-6 px-1">
            {audio.waveform.map((h: number, i: number) => (
              <div 
                key={i} 
                style={{ height: `${h}%` }} 
                className={`flex-1 rounded-full ${isMe ? 'bg-white/40' : 'bg-slate-200'} min-w-[2px]`} 
              />
            ))}
          </div>
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider opacity-70">
            <span>{audio.duration}</span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setPlaybackRate(prev => prev === 2 ? 1 : prev + 0.5);
              }}
              className={`px-1.5 py-0.5 rounded-md border ${isMe ? 'border-white/20' : 'border-indigo-100 bg-indigo-50 text-indigo-600'}`}
            >
              {playbackRate}x
            </button>
          </div>
        </div>

        <div className="relative">
           <img src={isMe ? CURRENT_USER.avatar : activeConversation?.avatar} className="w-6 h-6 rounded-full object-cover border-2 border-white/20" />
           <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full border border-white" />
        </div>
      </div>
      <span className="text-[9px] font-bold text-slate-400 mt-1 uppercase px-2">{isMe ? 'Enviado' : activeConversation?.name} • {timestamp}</span>
    </div>
  );
};

const MessagesModule: React.FC = () => {
  const [activeConversation, setActiveConversation] = useState<User | null>(MOCK_USERS['u-002']);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', senderId: 'u-002', text: 'Alex, você viu a nova atualização do Nexus Studio? 🚀', timestamp: '10:05' },
    { id: '2', senderId: 'u-001', text: 'Vi sim! A latência do Gemini 2.5 está surreal.', timestamp: '10:06' },
    { id: '3', senderId: 'u-002', image: 'https://picsum.photos/seed/snap/300/600', isViewOnce: true, hasViewed: false, timestamp: '10:10' }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [inputText, setInputText] = useState('');
  const [viewingSnap, setViewingSnap] = useState<Message | null>(null);
  const [showConversations, setShowConversations] = useState(true);
  const timerRef = useRef<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        console.log('Audio recording stopped, blob created:', audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Não foi possível acessar o microfone. Verifique as permissões.');
    }
  };

  // Fetch messages from Firestore when conversation changes
  useEffect(() => {
    if (!activeConversation) return;
    
    const fetchMessages = async () => {
      try {
        const conversationId = [CURRENT_USER.id, activeConversation.id].sort().join('_');
        const dbMessages = await firestoreService.getMessages(conversationId);
        if (dbMessages.length > 0) {
          setMessages(dbMessages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [activeConversation]);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = window.setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setRecordingDuration(0);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isRecording]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || !activeConversation) return;
    
    const conversationId = [CURRENT_USER.id, activeConversation.id].sort().join('_');
    const messageData = {
      senderId: CURRENT_USER.id,
      text: inputText,
      conversationId,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    try {
      const msgId = await firestoreService.sendMessage(messageData);
      setMessages([...messages, { id: msgId, ...messageData }]);
      setInputText('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const stopRecordingAndSend = async () => {
    if (!isRecording || !activeConversation) return;

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }

    setIsRecording(false);
    
    const conversationId = [CURRENT_USER.id, activeConversation.id].sort().join('_');
    const audioData = {
      senderId: CURRENT_USER.id,
      conversationId,
      audio: {
        duration: formatTime(recordingDuration),
        waveform: Array.from({ length: 20 }, () => Math.random() * 100)
      },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    try {
      const msgId = await firestoreService.sendMessage(audioData);
      setMessages([...messages, { id: msgId, ...audioData }]);
    } catch (error) {
      console.error("Error sending audio message:", error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const openSnap = (msg: Message) => {
    if (msg.hasViewed) return;
    setViewingSnap(msg);
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, hasViewed: true } : m));
      setViewingSnap(null);
    }, 5000);
  };

  return (
    <div className="flex-1 flex h-[calc(100vh-140px)] sm:h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 animate-in fade-in overflow-hidden">
      {/* Snap Viewer Overlay */}
      {viewingSnap && (
        <div className="fixed inset-0 z-[200] bg-black animate-in fade-in zoom-in duration-300 flex items-center justify-center p-4">
          <div className="relative w-full h-full max-w-md overflow-hidden rounded-[2.5rem] shadow-2xl">
            <img src={viewingSnap.image} className="w-full h-full object-cover" />
            <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white font-black animate-pulse">
               5s
            </div>
            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Enviado por</p>
              <p className="text-sm font-black">{activeConversation?.name}</p>
            </div>
          </div>
        </div>
      )}

      {/* Conversations List (Sidebar) */}
      <div className={`${showConversations ? 'w-full sm:w-80' : 'hidden'} border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0 transition-all`}>
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-black uppercase tracking-tighter italic dark:text-white">Mensagens</h2>
          <div className="mt-4 relative">
            <input 
              type="text" 
              placeholder="Procurar conversas..." 
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-2 px-4 text-xs font-bold uppercase tracking-widest placeholder:text-slate-400 dark:text-white"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {Object.values(MOCK_USERS).filter(u => u.id !== CURRENT_USER.id).map(user => (
            <button 
              key={user.id}
              onClick={() => {
                setActiveConversation(user);
                if (window.innerWidth < 640) setShowConversations(false);
              }}
              className={`w-full p-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all border-b border-slate-50 dark:border-slate-800/50 ${activeConversation?.id === user.id ? 'bg-emerald-50 dark:bg-emerald-500/10 border-l-4 border-l-emerald-500' : ''}`}
            >
              <div className="relative shrink-0">
                <img src={user.avatar} className="w-12 h-12 rounded-2xl object-cover shadow-sm" />
                {user.isOnline && <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-sm font-black text-slate-900 dark:text-white truncate">{user.name}</h4>
                  <span className="text-[9px] font-bold text-slate-400 uppercase">10:05</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate font-medium">Alex, você viu a nova atualização...</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`${!showConversations || window.innerWidth >= 640 ? 'flex' : 'hidden'} flex-1 flex flex-col bg-slate-50 dark:bg-slate-950`}>
        {/* Header */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setShowConversations(true)} className="sm:hidden text-slate-400 hover:text-slate-600 dark:hover:text-white"><ChevronLeft /></button>
            <div className="relative">
              <img src={activeConversation?.avatar} className="w-10 h-10 rounded-2xl object-cover shadow-md" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white">{activeConversation?.name}</h3>
              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                Online Agora
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all text-slate-500"><Phone className="w-5 h-5" /></button>
            <button className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all text-slate-500"><Video className="w-5 h-5" /></button>
            <button className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all text-slate-500"><MoreVertical className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
          {messages.map((msg) => {
            const isMe = msg.senderId === CURRENT_USER.id;
            
            if (msg.audio) return (
              <VoiceBubble 
                key={msg.id} 
                audio={msg.audio} 
                isMe={isMe} 
                activeConversation={activeConversation} 
                timestamp={msg.timestamp} 
              />
            );

            if (msg.isViewOnce) return (
              <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} mb-4`}>
                 <button 
                  onClick={() => openSnap(msg)}
                  disabled={msg.hasViewed}
                  className={`flex items-center gap-3 p-4 rounded-3xl transition-all ${msg.hasViewed ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 opacity-50' : isMe ? 'bg-indigo-600 text-white' : 'bg-rose-500 text-white shadow-lg'}`}
                 >
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${msg.hasViewed ? 'bg-slate-200 dark:bg-slate-700' : 'bg-white/20'}`}>
                      {msg.hasViewed ? <Clock className="w-5 h-5" /> : <Camera className="w-5 h-5" />}
                   </div>
                   <div className="text-left">
                      <p className="text-xs font-black uppercase tracking-widest">{msg.hasViewed ? 'Opened' : 'New Snap'}</p>
                      <p className="text-[10px] opacity-70">{msg.hasViewed ? 'Tap to replay (0)' : 'Tap to view • 5s'}</p>
                   </div>
                 </button>
                 <span className="text-[9px] font-bold text-slate-400 mt-1 uppercase px-2">{msg.timestamp}</span>
              </div>
            );
            
            return (
              <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-1`}>
                <div className={`p-4 rounded-2xl max-w-[80%] text-sm font-medium shadow-sm ${isMe ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-none'}`}>
                  {msg.text}
                </div>
                <span className="text-[9px] font-bold text-slate-400 mt-1 uppercase px-1">{msg.timestamp}</span>
              </div>
            );
          })}
        </div>

        {/* Input Area */}
        <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
          {isRecording ? (
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800 p-2 rounded-2xl animate-in slide-in-from-bottom-2">
              <div className="flex items-center gap-3 flex-1 px-4">
                <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                <span className="text-sm font-black text-slate-900 dark:text-white">{formatTime(recordingDuration)}</span>
                <div className="flex-1 flex gap-1 items-center h-4">
                   {Array.from({ length: 15 }).map((_, i) => (
                     <div key={i} className="flex-1 bg-indigo-200 dark:bg-indigo-500/30 rounded-full animate-bounce" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }} />
                   ))}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button onClick={() => setIsRecording(false)} className="p-3 text-slate-400 hover:text-rose-500 transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
                <button onClick={stopRecordingAndSend} className="bg-indigo-600 text-white p-4 rounded-2xl shadow-xl">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button className="p-4 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                <Camera className="w-6 h-6" />
              </button>
              
              <div className="flex-1 relative flex items-center">
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Escreva uma mensagem..."
                  className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl py-4 pl-6 pr-12 text-sm focus:ring-2 focus:ring-indigo-500 transition-all font-medium dark:text-white"
                />
                <button className="absolute right-3 p-2 text-slate-400 hover:text-indigo-600">
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>

              {inputText.trim() ? (
                <button onClick={handleSendMessage} className="bg-indigo-600 text-white p-4 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                  <Send className="w-5 h-5" />
                </button>
              ) : (
                <button 
                  onMouseDown={startRecording}
                  onMouseUp={stopRecordingAndSend}
                  onTouchStart={startRecording}
                  onTouchEnd={stopRecordingAndSend}
                  className="bg-slate-900 dark:bg-emerald-500 text-white p-4 rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all group relative"
                >
                  <Mic className="w-6 h-6" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesModule;
