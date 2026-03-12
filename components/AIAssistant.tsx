
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, ThinkingLevel, GenerateContentResponse } from "@google/genai";
import { 
  Send, Bot, User, Sparkles, 
  Trash2, RefreshCw, ChevronLeft, 
  Mic, Image as ImageIcon, Paperclip,
  MoreVertical, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { notificationService } from '../services/notificationService';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  isStreaming?: boolean;
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: 'Olá! Eu sou o Assistente de IA QOMO QIZER. Como posso ajudar você hoje no seu universo social e financeiro?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSupportMode, setIsSupportMode] = useState(false);
  const [isProMode, setIsProMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'pt-BR';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev + (prev ? ' ' : '') + transcript);
        setIsRecording(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      if (!recognitionRef.current) {
        alert('Reconhecimento de voz não suportado neste navegador.');
        return;
      }
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };

  const quickActions = [
    { label: 'Gerar Script de Vendas', prompt: 'Crie um script de vendas persuasivo para um produto digital no QOMO QIZER.' },
    { label: 'Analisar meu Perfil', prompt: 'Como posso melhorar meu perfil no QOMO QIZER para atrair mais clientes?' },
    { label: 'Ideias de Posts Virais', prompt: 'Sugira 5 ideias de posts virais para o meu nicho de mercado.' },
    { label: 'Estratégia de Monetização', prompt: 'Qual a melhor estratégia para monetizar 1000 seguidores no QOMO QIZER?' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (customInput?: string) => {
    const messageText = customInput || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!customInput) setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const model = isProMode ? "gemini-3.1-pro-preview" : "gemini-3-flash-preview";
      
      let systemInstruction = isSupportMode 
        ? "Você é o Suporte QOMO QIZER. Resolva problemas técnicos e de pagamentos. Seja profissional e direto."
        : "Você é o Assistente QOMO QIZER Expert. Ajude com o app, finanças e social. Seja prestativo e moderno.";

      if (isProMode) {
        systemInstruction += " Você está no modo ChatGPT Pro (Gemini 3.1 Pro). Forneça análises profundas, estratégias de marketing avançadas e scripts de alta conversão.";
      }

      const streamResponse = await ai.models.generateContentStream({
        model,
        contents: messageText,
        config: {
          systemInstruction,
          thinkingConfig: { thinkingLevel: isProMode ? ThinkingLevel.HIGH : ThinkingLevel.LOW }
        }
      });

      const aiMessageId = (Date.now() + 1).toString();
      const aiMessage: Message = {
        id: aiMessageId,
        role: 'model',
        text: '',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isStreaming: true
      };

      setMessages(prev => [...prev, aiMessage]);

      let fullText = '';
      let isFirstChunk = true;
      try {
        for await (const chunk of streamResponse) {
          if (isFirstChunk) {
            setIsLoading(false);
            isFirstChunk = false;
          }
          const c = chunk as GenerateContentResponse;
          const textChunk = c.text || '';
          fullText += textChunk;
          
          setMessages(prev => prev.map(msg => 
            msg.id === aiMessageId ? { ...msg, text: fullText } : msg
          ));
        }
      } catch (streamError) {
        console.error('Stream Error:', streamError);
      } finally {
        setIsLoading(false);
        setMessages(prev => prev.map(msg => 
          msg.id === aiMessageId ? { ...msg, isStreaming: false } : msg
        ));
        
        // Notify user if app is in background or tab is not active
        if (document.visibilityState === 'hidden') {
          notificationService.notify('Nova Resposta da IA', {
            body: fullText.substring(0, 100) + '...',
            type: 'messages'
          });
        }

        // Simular ganho de recompensa por interação (10% de chance)
        if (Math.random() > 0.9) {
          setTimeout(() => {
            notificationService.notify('Bônus de Interação!', {
              body: 'Você ganhou 5 MT por usar a IA hoje! Continue assim.',
              type: 'reward' as any
            });
          }, 3000);
        }
      }

    } catch (error) {
      console.error('Gemini Error:', error);
      setIsLoading(false);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: 'Ocorreu um erro ao conectar com a inteligência artificial. Verifique sua conexão.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const clearChat = () => {
    if (window.confirm('Deseja limpar todo o histórico da conversa com a IA?')) {
      setMessages([{
        id: '1',
        role: 'model',
        text: 'Histórico limpo. Como posso ajudar você agora?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-140px)] sm:h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 animate-in fade-in">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Sparkles className="w-6 h-6 text-white fill-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
              {isSupportMode ? 'Suporte Inteligente' : 'Assistente IA QOMO QIZER'}
            </h3>
            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1">
              <Shield className="w-2.5 h-2.5" />
              {isSupportMode ? 'Canal de Apoio Oficial' : 'Criptografado & Seguro'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsProMode(!isProMode)}
            className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
              isProMode 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-emerald-600'
            }`}
          >
            {isProMode ? 'ChatGPT Pro ON' : 'Ativar Pro'}
          </button>
          <button 
            onClick={() => setIsSupportMode(!isSupportMode)}
            className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
              isSupportMode 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-indigo-600'
            }`}
          >
            {isSupportMode ? 'Suporte ON' : 'Suporte'}
          </button>
          <button onClick={clearChat} className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all text-slate-500">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        {messages.length === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {quickActions.map((action, i) => (
              <button 
                key={i}
                onClick={() => handleSend(action.prompt)}
                className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-left hover:border-emerald-500 transition-all group"
              >
                <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-1 group-hover:text-emerald-500">{action.label}</p>
                <p className="text-[10px] text-slate-500 line-clamp-1">{action.prompt}</p>
              </button>
            ))}
          </div>
        )}
        {messages.map((msg) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 max-w-[85%] sm:max-w-2xl ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center shadow-sm ${
                msg.role === 'user' ? 'bg-slate-200 dark:bg-slate-800' : 'bg-emerald-500'
              }`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-slate-600 dark:text-slate-400" /> : <Bot className="w-4 h-4 text-white" />}
              </div>
              <div className="space-y-1">
                <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
                <p className={`text-[9px] font-bold text-slate-400 uppercase tracking-widest ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center shadow-sm">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl rounded-tl-none shadow-sm">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="flex gap-1">
            <button className="p-3 text-slate-400 hover:text-emerald-500 transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <button className="p-3 text-slate-400 hover:text-emerald-500 transition-colors">
              <ImageIcon className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 relative flex items-center">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isRecording ? "Ouvindo..." : "Pergunte qualquer coisa à IA..."}
              className={`w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl py-4 pl-6 pr-12 text-sm focus:ring-2 focus:ring-emerald-500 transition-all font-medium dark:text-white ${isRecording ? 'ring-2 ring-rose-500 animate-pulse' : ''}`}
            />
            <button 
              onClick={toggleRecording}
              className={`absolute right-3 p-2 transition-colors ${isRecording ? 'text-rose-500' : 'text-slate-400 hover:text-emerald-500'}`}
            >
              <Mic className={`w-5 h-5 ${isRecording ? 'animate-bounce' : ''}`} />
            </button>
          </div>

          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl transition-all ${
              !input.trim() || isLoading 
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400' 
                : 'bg-emerald-500 text-white hover:scale-105 active:scale-95 shadow-emerald-500/20'
            }`}
          >
            {isLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-4">
          A IA pode cometer erros. Verifique informações importantes.
        </p>
      </div>
    </div>
  );
};

export default AIAssistant;
