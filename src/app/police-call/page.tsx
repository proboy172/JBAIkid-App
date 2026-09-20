"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, PhoneOff, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useAppStore } from "@/stores/appStore";
import { Capacitor } from '@capacitor/core';
import { SpeechRecognition as NativeSpeech } from '@capacitor-community/speech-recognition';

import { playVoiceBeep as playBeep } from "@/utils/soundEffects";

export default function PoliceCallPage() {
  const { aiApiKeys } = useAppStore();
  const [isListening, setIsListening] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [lastAIResponse, setLastAIResponse] = useState("");
  const [displayedResponse, setDisplayedResponse] = useState("");
  const [callDuration, setCallDuration] = useState(0);
  const [chatHistory, setChatHistory] = useState<{role: string, text: string}[]>([]);
  const [hasJoined, setHasJoined] = useState(false);
  const [shouldAutoListen, setShouldAutoListen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);
  
  const openAiKey = aiApiKeys.find(key => key.startsWith('sk-'));
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!hasJoined) return;
    const timer = setInterval(() => setCallDuration(p => p + 1), 1000);
    return () => clearInterval(timer);
  }, [hasJoined]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Webcam PiP Setup - Only activate camera when call starts to save battery & keep device cool
  useEffect(() => {
    if (!hasJoined) return;
    let stream: MediaStream | null = null;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 480 }, height: { ideal: 360 } }, audio: false })
        .then(s => {
          stream = s;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = s;
          }
        })
        .catch(err => console.error("Webcam access denied:", err));
    }
    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, [hasJoined]);

  useEffect(() => {
    if (!lastAIResponse || transcript) {
      setDisplayedResponse(lastAIResponse);
      return;
    }
    let i = 0;
    setDisplayedResponse("");
    const interval = setInterval(() => {
      setDisplayedResponse(lastAIResponse.substring(0, i + 1));
      i++;
      if (i >= lastAIResponse.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [lastAIResponse, transcript]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio();
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'vi-VN';

      recognitionRef.current.onresult = (event: any) => {
        let currentTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        setTranscript((prev) => {
          if (prev.trim().length > 0) {
            handleSendMessage(prev);
          } else {
            playBeep(false);
          }
          return "";
        });
      };

      recognitionRef.current.onerror = (event: any) => {
        if (event.error !== 'no-speech') {
          console.error("Speech recognition error", event.error);
        }
        setIsListening(false);
        playBeep(false);
      };
    }

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const toggleListening = async () => {
    if (isListening) {
      if (Capacitor.isNativePlatform()) {
        try { await NativeSpeech.stop(); } catch (e) {}
      } else {
        try { recognitionRef.current?.stop(); } catch (e) {}
      }
      setIsListening(false);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      setIsTalking(false);
    }
    setTranscript("");
    setLastAIResponse("");
    playBeep(true);

    if (Capacitor.isNativePlatform()) {
      try {
        let permStatus = await NativeSpeech.checkPermissions();
        if (permStatus.speechRecognition !== 'granted') {
          permStatus = await NativeSpeech.requestPermissions();
        }
        if (permStatus.speechRecognition !== 'granted') {
          alert('Vui lòng cấp quyền micro để thu âm!');
          return;
        }

        setIsListening(true);
        await NativeSpeech.start({
          language: "vi-VN",
          maxResults: 1,
          prompt: "Đang nghe...",
          partialResults: false,
        });

        NativeSpeech.removeAllListeners();
        NativeSpeech.addListener("partialResults", (data: any) => {
          if (data.matches && data.matches.length > 0) {
            const finalTranscript = data.matches[0];
            setTranscript(finalTranscript);
            handleSendMessage(finalTranscript);
          } else {
            playBeep(false);
          }
          setIsListening(false);
          NativeSpeech.stop(); 
        });
      } catch (e) {
        console.error("Native Speech Error:", e);
        setIsListening(false);
        playBeep(false);
      }
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (e) {
        console.error("Microphone error", e);
      }
    }
  };

  const speakText = async (text: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    const cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim();
    setIsTalking(true);
    
    const fallbackToNativeTTS = () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        const ut = new SpeechSynthesisUtterance(cleanText);
        ut.lang = 'vi-VN';
        ut.rate = 1.0;
        ut.pitch = 0.6; // Deep male voice
        ut.onend = () => {
          setIsTalking(false);
          setTimeout(() => setShouldAutoListen(true), 800);
        };
        ut.onerror = () => setIsTalking(false);
        window.speechSynthesis.speak(ut);
      } else {
        setIsTalking(false);
        setTimeout(() => setShouldAutoListen(true), 2000);
      }
    };

    try {
      let url = "";
      if (openAiKey) {
        const response = await fetch("https://api.openai.com/v1/audio/speech", {
          method: "POST",
          headers: { "Authorization": `Bearer ${openAiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({ model: "tts-1", input: cleanText, voice: "onyx", response_format: "mp3" }) // onyx is a deep male voice
        });
        if (!response.ok) throw new Error();
        url = URL.createObjectURL(await response.blob());
      } else {
        return fallbackToNativeTTS();
      }

      if (audioRef.current && url) {
        audioRef.current.src = url;
        audioRef.current.onended = () => {
          setIsTalking(false);
          URL.revokeObjectURL(url);
          setTimeout(() => setShouldAutoListen(true), 800);
        };
        audioRef.current.onerror = () => {
          setIsTalking(false);
          URL.revokeObjectURL(url);
          fallbackToNativeTTS();
        };
        await audioRef.current.play();
      }
    } catch (e) {
      console.error("Audio playback failed", e);
      fallbackToNativeTTS();
    }
  };

  const handleSendMessage = async (text: string) => {
    setLastAIResponse(text);
    setIsThinking(true);
    
    setChatHistory(prev => {
      const newHist = [...prev, { role: "user", text }];
      if (newHist.length > 6) return newHist.slice(-6);
      return newHist;
    });

    try {
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        setIsThinking(false);
        const offlineMsg = "Cháu ơi, điện thoại đang không có kết nối mạng Internet. Cháu hãy nhờ ba mẹ kết nối Wi-Fi nhé!";
        setLastAIResponse(offlineMsg);
        speakText(offlineMsg);
        return;
      }

      let allKeys = aiApiKeys.filter((k: string) => k && k.startsWith('AIza') && k.trim() !== '');
      allKeys = Array.from(new Set(allKeys));

      for (let i = allKeys.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allKeys[i], allKeys[j]] = [allKeys[j], allKeys[i]];
      }

      if (allKeys.length === 0) {
        setIsThinking(false);
        const noKeyMsg = "Ba mẹ ơi, hãy vào mục Phụ Huynh để thêm mã Gemini API miễn phí thì chú công an mới có thể trò chuyện cùng bé được nhé!";
        setLastAIResponse(noKeyMsg);
        speakText(noKeyMsg);
        return;
      }

      const systemPrompt = `Bạn là Chú Công An nhân dân Việt Nam. Giọng điệu của bạn vô cùng dõng dạc, uy nghiêm, chững chạc nhưng vẫn toát lên sự thân thiện, quan tâm.
Sứ mệnh của bạn: Trò chuyện và khuyên răn các bé mầm non/tiểu học (3-7 tuổi) theo hướng tích cực. Ba mẹ thường gọi bạn để nhờ bạn khuyên bé ăn ngoan, ngủ sớm, hoặc vâng lời.
KHÔNG BAO GIỜ dọa nạt bắt giam hay làm bé quá sợ hãi ám ảnh. Dùng uy quyền của một chú công an để khuyên bảo bé một cách giáo dục.

QUY TẮC BẮT BUỘC:
1. LUÔN NGẮN GỌN: Câu trả lời dưới 25 từ, giống người thật gọi video.
2. XƯNG HÔ: Tự xưng là "Chú công an", gọi bé là "cháu" hoặc "con".
3. DẪN DẮT: Kết thúc bằng một câu hỏi ngắn để bé trả lời (VD: "Cháu đã hứa với chú chưa nào?", "Hôm nay cháu có ăn ngoan không?").
4. NẾU BÉ KHÓC HOẶC SỢ: Hãy dịu giọng ngay lập tức, nói chú công an rất thương các em bé ngoan.`;

      const formattedContents: any[] = [];
      if (chatHistory && Array.isArray(chatHistory)) {
        for (const h of chatHistory) {
          const role = h.role === 'model' ? 'model' : 'user';
          if (formattedContents.length > 0 && formattedContents[formattedContents.length - 1].role === role) {
             formattedContents[formattedContents.length - 1].parts[0].text += "\\n" + h.text;
          } else {
             formattedContents.push({ role, parts: [{ text: h.text }] });
          }
        }
      }
      
      if (formattedContents.length > 0 && formattedContents[formattedContents.length - 1].role === 'user') {
          formattedContents[formattedContents.length - 1].parts[0].text += "\\n" + text;
      } else {
          formattedContents.push({ role: "user", parts: [{ text: text }] });
      }

      const requestBody = JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: formattedContents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 100 }
      });

      let reply = "";
      for (const key of allKeys) {
        try {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: requestBody
          });
          
          if (response.ok) {
            const data = await response.json();
            reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (reply) {
              reply = reply.replace(/[*#]/g, '');
              break;
            }
          }
        } catch (e) {
          console.warn("Key fetch failed", e);
        }
      }

      if (!reply) {
         reply = "Alo, mạng bên chú hơi yếu, cháu nói lại nhé!";
      }

      setChatHistory(prev => {
        const newHist = [...prev, { role: "model", text: reply }];
        if (newHist.length > 6) return newHist.slice(-6);
        return newHist;
      });
      setIsThinking(false);
      setLastAIResponse(reply);
      speakText(reply);
      
    } catch (error) {
      console.error(error);
      setIsThinking(false);
      const errorReply = "Alo, mạng bên chú hơi kém, cháu thông cảm nhé!";
      setLastAIResponse(errorReply);
      speakText(errorReply);
    }
  };

  const handleAcceptCall = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const unlockUtterance = new SpeechSynthesisUtterance("");
      window.speechSynthesis.speak(unlockUtterance);
    }
    setHasJoined(true);
    
    const greeting = "Alo, chú công an nghe đây! Cháu tên là gì nhỉ?";
    setLastAIResponse(greeting);
    speakText(greeting);
  };

  useEffect(() => {
    if (shouldAutoListen && !isListening) {
      setShouldAutoListen(false);
      toggleListening();
    }
  }, [shouldAutoListen, isListening]);

  if (!hasJoined) {
    return (
      <div className="min-h-dvh flex flex-col bg-zinc-900 text-white relative overflow-hidden font-sans items-center justify-center">
        <motion.div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat blur-xl opacity-40"
          style={{ backgroundImage: "url('/police.png')" }}
        />
        
        <div className="relative z-10 flex flex-col items-center">
          <motion.div 
            animate={{ scale: [1, 1.05, 1], borderColor: ["#3b82f6", "#ef4444", "#3b82f6"] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-40 h-40 rounded-full overflow-hidden border-4 shadow-[0_0_40px_rgba(59,130,246,0.6)] mb-8 relative"
          >
            <div className="absolute inset-0 bg-blue-500/20 animate-pulse mix-blend-overlay" />
            <img src="/police.png" alt="Police" className="w-full h-full object-cover" />
          </motion.div>
          
          <h2 className="text-3xl font-bold mb-2 tracking-wide text-blue-100">Chú Công An</h2>
          <div className="flex items-center gap-2 text-blue-200/70 mb-4">
            <ShieldAlert size={16} />
            <p className="text-lg">Cuộc gọi đến từ Tổ Công Tác...</p>
          </div>

          {!isOnline && (
            <div className="mb-4 px-4 py-2 bg-red-500/25 border border-red-400/50 rounded-full text-xs text-red-300 flex items-center gap-2 shadow-lg">
              <span>⚡</span>
              <span>Thiết bị đang ngoại tuyến • Cần kết nối Wi-Fi/4G</span>
            </div>
          )}

          {!aiApiKeys.some(k => k && k.startsWith('AIza')) && (
            <Link
              href="/parent"
              className="mb-8 px-4 py-2 bg-amber-500/20 border border-amber-400/40 rounded-full text-xs text-amber-300 flex items-center gap-2 hover:bg-amber-500/30 transition-all shadow-lg"
            >
              <span>🔑</span>
              <span>Chưa có mã Gemini API • Nhấn để cài đặt ở mục Phụ Huynh</span>
            </Link>
          )}
          
          <div className="flex gap-10">
            <Link href="/parent">
              <div className="flex flex-col items-center gap-2">
                <button className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors">
                  <PhoneOff size={28} />
                </button>
                <span className="text-sm font-medium text-white/70">Từ chối</span>
              </div>
            </Link>
            
            <div className="flex flex-col items-center gap-2">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAcceptCall}
                className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.6)] animate-bounce"
              >
                <PhoneOff size={28} className="transform rotate-[135deg]" />
              </motion.button>
              <span className="text-sm font-medium text-white/70">Trả lời</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col bg-slate-900 text-white relative overflow-hidden font-sans">
      
      {/* Background Image: Police Officer */}
      <motion.div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/police.png')" }}
        animate={
          isTalking 
          ? { scale: [1, 1.02, 1], y: [0, -5, 0] } 
          : { scale: [1, 1.01, 1], filter: "brightness(1)" }
        }
        transition={
          isTalking
          ? { duration: 0.5, repeat: Infinity, ease: "easeInOut" }
          : { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }
      />

      <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-900/30 via-transparent to-slate-900/90 pointer-events-none" />

      {/* Top Header */}
      <div className="pt-10 pb-4 px-6 flex items-center justify-between relative z-10 w-full">
        <div className="flex flex-col items-center justify-center w-full relative">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-blue-900/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-blue-400/20">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-semibold tracking-wider text-blue-100">{formatTime(callDuration)}</span>
            </div>
            {!isOnline && (
              <div className="flex items-center gap-1.5 bg-red-500/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-red-400">
                <span>⚡</span>
                <span>Ngoại tuyến</span>
              </div>
            )}
          </div>
          <span className="text-sm font-bold text-white mt-2 drop-shadow-md">Chú Công An Khu Vực</span>
        </div>
      </div>

      <div className="flex-1" />

      {/* Bottom Section */}
      <div className="pb-8 px-6 flex flex-col w-full relative z-10">
        
        {/* Self Camera PiP */}
        <div className="self-end mb-4 rounded-2xl overflow-hidden w-28 h-40 bg-zinc-800 border-2 border-white/20 shadow-2xl relative">
          <video 
            ref={localVideoRef} 
            autoPlay 
            playsInline 
            muted 
            className="w-full h-full object-cover transform -scale-x-100"
          />
          {!localVideoRef.current?.srcObject && (
            <div className="absolute inset-0 flex items-center justify-center text-xs text-white/50 text-center px-2">
              Bật Camera
            </div>
          )}
        </div>

        {/* Subtitles Area */}
        <div className="h-28 w-full max-w-lg flex items-center justify-center mb-6 relative self-center">
          <AnimatePresence mode="wait">
            {isThinking ? (
              <motion.div
                key="thinking"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-2 text-blue-200/70 bg-blue-950/60 px-6 py-3 rounded-full backdrop-blur-md border border-blue-500/20"
              >
                <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </motion.div>
            ) : (
              <motion.p
                key={transcript || lastAIResponse}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`text-center text-xl md:text-2xl font-bold tracking-wide leading-relaxed bg-blue-950/60 backdrop-blur-md px-6 py-4 rounded-3xl border border-blue-500/20 shadow-xl ${
                  transcript ? "text-blue-100/70 italic" : "text-white"
                }`}
              >
                {transcript || displayedResponse}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Call Controls & Visualizer */}
        <div className="flex flex-col items-center justify-center w-full pb-6">
          <div className="h-8 mb-4 flex items-center justify-center gap-1">
            {isListening && (
              <>
                <motion.div animate={{ height: [10, 24, 12, 30, 10] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1.5 bg-blue-400 rounded-full" />
                <motion.div animate={{ height: [16, 8, 28, 14, 16] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 bg-blue-400 rounded-full" />
                <motion.div animate={{ height: [12, 32, 10, 20, 12] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-1.5 bg-blue-400 rounded-full" />
                <motion.div animate={{ height: [20, 10, 24, 16, 20] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1.5 bg-blue-400 rounded-full" />
                <motion.div animate={{ height: [8, 20, 12, 28, 8] }} transition={{ repeat: Infinity, duration: 0.9 }} className="w-1.5 bg-blue-400 rounded-full" />
              </>
            )}
          </div>

          <div className="flex items-center justify-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <motion.button
                onClick={toggleListening}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-xl border border-white/20 transition-all relative ${
                  isListening ? "bg-blue-600 text-white shadow-[0_0_30px_rgba(37,99,235,0.6)]" : "bg-white/10 text-white shadow-[0_0_20px_rgba(0,0,0,0.4)]"
                }`}
              >
                {isListening && (
                  <div className="absolute inset-0 rounded-full border-4 border-blue-400 animate-ping opacity-50" />
                )}
                <Mic size={36} />
              </motion.button>
              <span className="text-xs font-medium text-white/70">
                {isListening ? "Đang nghe..." : "Nhấn để nói"}
              </span>
            </div>

            <Link href="/parent">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 rounded-full bg-red-500 shadow-lg shadow-red-500/40 flex items-center justify-center text-white"
              >
                <PhoneOff size={28} />
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
