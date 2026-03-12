
import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { PhoneOff, Mic, MicOff, Camera, CameraOff, Sparkles, Loader2, Maximize2 } from 'lucide-react';

interface VideoCallProps {
  onEndCall: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({ onEndCall }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [transcription, setTranscription] = useState('');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const frameIntervalRef = useRef<number | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const outputNodeRef = useRef<GainNode | null>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // Base64 Helpers
  const encode = (bytes: Uint8Array) => {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number) => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  useEffect(() => {
    let isMounted = true;

    const initCall = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        const inputAudioCtx = new AudioContext({ sampleRate: 16000 });
        const outputAudioCtx = new AudioContext({ sampleRate: 24000 });
        audioContextRef.current = outputAudioCtx;
        outputNodeRef.current = outputAudioCtx.createGain();
        outputNodeRef.current.connect(outputAudioCtx.destination);

        const sessionPromise = ai.live.connect({
          model: 'gemini-2.5-flash-native-audio-preview-12-2025',
          callbacks: {
            onopen: () => {
              if (!isMounted) return;
              setIsConnected(true);
              
              // Audio Streaming
              const source = inputAudioCtx.createMediaStreamSource(stream);
              const scriptProcessor = inputAudioCtx.createScriptProcessor(4096, 1, 1);
              scriptProcessor.onaudioprocess = (e) => {
                if (isMuted) return;
                const inputData = e.inputBuffer.getChannelData(0);
                const int16 = new Int16Array(inputData.length);
                for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
                
                sessionPromise.then(session => {
                  session.sendRealtimeInput({
                    media: {
                      data: encode(new Uint8Array(int16.buffer)),
                      mimeType: 'audio/pcm;rate=16000'
                    }
                  });
                });
              };
              source.connect(scriptProcessor);
              scriptProcessor.connect(inputAudioCtx.destination);

              // Video Streaming
              frameIntervalRef.current = window.setInterval(() => {
                if (isVideoOff || !videoRef.current || !canvasRef.current) return;
                const canvas = canvasRef.current;
                const video = videoRef.current;
                const ctx = canvas.getContext('2d');
                if (!ctx) return;
                
                canvas.width = 320;
                canvas.height = 240;
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                
                canvas.toBlob(blob => {
                  if (blob) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      const base64Data = (reader.result as string).split(',')[1];
                      sessionPromise.then(session => {
                        session.sendRealtimeInput({
                          media: { data: base64Data, mimeType: 'image/jpeg' }
                        });
                      });
                    };
                    reader.readAsDataURL(blob);
                  }
                }, 'image/jpeg', 0.5);
              }, 1000);
            },
            onmessage: async (message: LiveServerMessage) => {
              const audioBase64 = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
              if (audioBase64) {
                const ctx = outputAudioCtx;
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
                const audioBuffer = await decodeAudioData(decode(audioBase64), ctx, 24000, 1);
                const source = ctx.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outputNodeRef.current!);
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                sourcesRef.current.add(source);
                source.onended = () => sourcesRef.current.delete(source);
              }

              if (message.serverContent?.outputTranscription) {
                setTranscription(prev => (prev + ' ' + message.serverContent?.outputTranscription?.text).slice(-200));
              }

              if (message.serverContent?.interrupted) {
                sourcesRef.current.forEach(s => s.stop());
                sourcesRef.current.clear();
                nextStartTimeRef.current = 0;
              }
            },
            onclose: () => onEndCall(),
            onerror: (e) => console.error("Call error:", e)
          },
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
            systemInstruction: 'You are Nexus AI, a friendly digital entity. You are having a video call with a user. Be expressive, use the visual input provided by their camera to make the conversation more natural.',
            outputAudioTranscription: {}
          }
        });

        sessionRef.current = await sessionPromise;
      } catch (err) {
        console.error("Failed to start call:", err);
        onEndCall();
      }
    };

    initCall();

    return () => {
      isMounted = false;
      if (frameIntervalRef.current) clearInterval(frameIntervalRef.current);
      if (sessionRef.current) sessionRef.current.close();
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col items-center justify-center animate-in fade-in duration-500">
      {/* Main AI Visualization Area */}
      <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500 rounded-full blur-[160px] animate-pulse" />
        </div>

        {/* Dynamic AI "Mouth" Visualization */}
        <div className="relative z-10 flex flex-col items-center gap-12">
          <div className={`w-48 h-48 rounded-full border-4 border-indigo-400/30 flex items-center justify-center relative ${isConnected ? 'animate-pulse' : ''}`}>
             <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl" />
             <Sparkles className={`w-20 h-20 text-indigo-400 ${isConnected ? 'animate-bounce' : ''}`} />
          </div>
          
          <div className="text-center max-w-xl">
             <h2 className="text-2xl font-black text-white mb-2">Nexus AI</h2>
             <p className="text-indigo-300 font-bold uppercase tracking-[0.3em] text-[10px] mb-8">
               {isConnected ? 'Nexus Link Active' : 'Establishing Secure Secure Quantum Link...'}
             </p>
             <p className="text-white/60 text-sm italic min-h-[3em] px-4">
               {transcription || "Nexus is listening for your input..."}
             </p>
          </div>
        </div>

        {/* Local Camera Preview (PIP) */}
        <div className="absolute top-8 right-8 w-40 h-56 sm:w-48 sm:h-64 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10 group">
          <video 
            ref={videoRef} 
            autoPlay 
            muted 
            playsInline 
            className={`w-full h-full object-cover ${isVideoOff ? 'hidden' : ''}`} 
          />
          {isVideoOff && (
            <div className="w-full h-full flex items-center justify-center bg-slate-800">
              <CameraOff className="w-8 h-8 text-slate-600" />
            </div>
          )}
          <div className="absolute top-2 left-2 px-2 py-1 bg-black/40 backdrop-blur-md rounded-lg text-[8px] font-bold text-white uppercase">You</div>
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Call Controls */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 p-6 bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-2xl">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className={`p-5 rounded-full transition-all ${isMuted ? 'bg-rose-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
        >
          {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>

        <button 
          onClick={onEndCall}
          className="p-6 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition-all shadow-xl shadow-rose-900/40 transform hover:scale-110 active:scale-90"
        >
          <PhoneOff className="w-8 h-8" />
        </button>

        <button 
          onClick={() => setIsVideoOff(!isVideoOff)}
          className={`p-5 rounded-full transition-all ${isVideoOff ? 'bg-rose-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
        >
          {isVideoOff ? <CameraOff className="w-6 h-6" /> : <Camera className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
