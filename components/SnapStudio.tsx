
import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, Zap, X, Sparkles, Send, Download, Timer, Smile } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { CURRENT_USER } from '../constants';
import { Post } from '../types';

interface SnapStudioProps {
  onClose: () => void;
  onSnapCreated: (post: Post) => void;
}

const AI_LENSES = [
  { id: 'none', label: 'Original', prompt: '' },
  { id: 'cyber', label: 'Cyberpunk', prompt: 'cyberpunk neon style, high tech, futuristic glowing details, cinematic lighting' },
  { id: 'anime', label: 'Anime', prompt: 'studio ghibli style, hand-drawn anime aesthetic, vibrant colors, soft lighting' },
  { id: '3d', label: 'Pixar 3D', prompt: 'disney pixar 3d animation style, cute character design, soft shadows, 4k render' },
  { id: 'sketch', label: 'Sketch', prompt: 'pencil charcoal sketch, artistic hand-drawn style, high contrast, paper texture' },
];

const SnapStudio: React.FC<SnapStudioProps> = ({ onClose, onSnapCreated }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeLens, setActiveLens] = useState(AI_LENSES[0]);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [timer, setTimer] = useState(10); // seconds
  const [isFrontCamera, setIsFrontCamera] = useState(true);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [isFrontCamera]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: isFrontCamera ? 'user' : 'environment' },
        audio: false
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
    }
  };

  const capture = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    const base64 = canvas.toDataURL('image/jpeg');
    
    if (activeLens.id === 'none') {
      setCapturedImage(base64);
    } else {
      applyLens(base64);
    }
  };

  const applyLens = async (base64: string) => {
    setIsProcessing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const imageData = base64.split(',')[1];
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: imageData, mimeType: 'image/jpeg' } },
            { text: `Re-style this photo with the following style: ${activeLens.prompt}. Maintain the original composition and subject, just change the artistic style.` }
          ]
        }
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          setCapturedImage(`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`);
        }
      }
    } catch (err) {
      console.error("Lens error:", err);
      setCapturedImage(base64); // Fallback to original if AI fails
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSend = () => {
    if (!capturedImage) return;
    const newSnap: Post = {
      id: `snap-${Date.now()}`,
      user: CURRENT_USER,
      content: "Sent a Snap ✨",
      image: capturedImage,
      likes: 0,
      views: 0,
      comments: [],
      timestamp: 'Just now',
      isSnap: true,
      expiresAt: Date.now() + (timer * 1000),
      aiGenerated: activeLens.id !== 'none'
    };
    onSnapCreated(newSnap);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col animate-in fade-in zoom-in duration-300">
      <div className="relative flex-1 flex flex-col overflow-hidden rounded-b-[3rem] shadow-2xl">
        {!capturedImage ? (
          <>
            <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
            
            <div className="absolute top-8 left-0 right-0 px-6 flex justify-between items-start">
              <button onClick={onClose} className="p-3 bg-black/20 backdrop-blur-md rounded-full text-white"><X /></button>
              <div className="flex flex-col gap-4">
                <button onClick={() => setIsFrontCamera(!isFrontCamera)} className="p-3 bg-black/20 backdrop-blur-md rounded-full text-white"><RefreshCw /></button>
                <button className="p-3 bg-black/20 backdrop-blur-md rounded-full text-white"><Zap /></button>
              </div>
            </div>

            <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-8">
              {/* Lens Selection */}
              <div className="flex gap-4 overflow-x-auto px-10 pb-4 w-full scrollbar-hide">
                {AI_LENSES.map(lens => (
                  <button 
                    key={lens.id}
                    onClick={() => setActiveLens(lens)}
                    className={`flex-shrink-0 flex flex-col items-center gap-2 transition-all ${activeLens.id === lens.id ? 'scale-110' : 'opacity-60'}`}
                  >
                    <div className={`w-14 h-14 rounded-full border-2 p-1 flex items-center justify-center ${activeLens.id === lens.id ? 'border-white bg-white/20' : 'border-white/40'}`}>
                      {lens.id === 'none' ? <Camera className="w-6 h-6 text-white" /> : <Smile className="w-6 h-6 text-white" />}
                    </div>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">{lens.label}</span>
                  </button>
                ))}
              </div>

              {/* Capture Button */}
              <button 
                onClick={capture}
                className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center p-1"
              >
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <Sparkles className={`w-8 h-8 text-indigo-600 transition-all ${activeLens.id !== 'none' ? 'animate-pulse' : ''}`} />
                </div>
              </button>
            </div>
          </>
        ) : (
          <div className="relative w-full h-full animate-in zoom-in-95 duration-300">
            <img src={capturedImage} className="w-full h-full object-cover" />
            {isProcessing && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center text-white gap-4">
                <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <p className="font-black text-xs uppercase tracking-widest">Applying AI Lens...</p>
              </div>
            )}
            
            <div className="absolute top-8 left-6 flex gap-4">
              <button onClick={() => setCapturedImage(null)} className="p-3 bg-black/20 backdrop-blur-md rounded-full text-white"><X /></button>
            </div>

            <div className="absolute bottom-8 left-6 right-6 flex items-center justify-between">
              <div className="flex gap-4">
                <button 
                  onClick={() => setTimer(timer === 10 ? 3 : 10)}
                  className="bg-black/20 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 text-white font-black text-xs"
                >
                  <Timer className="w-4 h-4" /> {timer}s
                </button>
                <button className="bg-black/20 backdrop-blur-md p-3 rounded-full text-white"><Download className="w-5 h-5" /></button>
              </div>
              
              <button 
                onClick={handleSend}
                className="bg-indigo-600 text-white px-8 py-4 rounded-3xl font-black flex items-center gap-3 shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                SEND <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default SnapStudio;
