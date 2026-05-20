"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, ArrowLeft, PhoneOff, X, Sparkles } from "lucide-react";
import Link from "next/link";
import { useAppStore } from "@/stores/appStore";
import confetti from "canvas-confetti";
import { STICKERS, Sticker } from "@/data/stickers";
import { Capacitor } from '@capacitor/core';
import { SpeechRecognition as NativeSpeech } from '@capacitor-community/speech-recognition';

const FILLER_PHRASES = [
  "À, để cô xem nào...",
  "Hmm, cô nghe rồi...",
  "Úi chà...",
  "Cô hiểu rồi...",
  "Để cô nghĩ một xíu nhé..."
];

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
    utterances: SpeechSynthesisUtterance[];
  }
}

const playBeep = (isStart: boolean) => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (isStart) {
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } else {
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    }
  } catch (e) {}
};

export default function AITeacherPage() {
  const { streak, totalStars, getDueWords, reviewWord, addStars, unlockSticker, aiApiKeys } = useAppStore();
  const [isListening, setIsListening] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [lastAIResponse, setLastAIResponse] = useState("Hi there! I am your teacher.");
  const [displayedResponse, setDisplayedResponse] = useState("Hi there! I am your teacher.");
  const [currentFlashcard, setCurrentFlashcard] = useState<string | null>(null);
  const [giftSticker, setGiftSticker] = useState<Sticker | null>(null);
  const [callDuration, setCallDuration] = useState(0);
  const [chatHistory, setChatHistory] = useState<{role: string, text: string}[]>([]);
  const [hasJoined, setHasJoined] = useState(false);
  const [prefetchedFillers, setPrefetchedFillers] = useState<string[]>([]);
  const [shouldAutoListen, setShouldAutoListen] = useState(false);
  const [roleplayMode, setRoleplayMode] = useState<'free' | 'shopping' | 'zoo'>('free');
  
  // Extract API keys for Premium Voice
  const openAiKey = aiApiKeys.find(key => key.startsWith('sk-'));
  const elevenLabsKey = aiApiKeys.find(key => !key.startsWith('sk-') && !key.startsWith('AIza') && key.length >= 32);
  const xttsServerUrl = aiApiKeys.find(key => key.startsWith('http://') || key.startsWith('https://'));
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  // Call Timer
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

  // Webcam PiP Setup
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(s => {
          stream = s;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = s;
          }
        })
        .catch(err => console.error("Webcam access denied:", err));
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Pre-fetch filler phrases for zero-latency removed for client-side simplification
  // We will use native SpeechSynthesis which is instantaneous anyway, or fetch on demand.
  useEffect(() => {
    setPrefetchedFillers([]);
  }, []);

  // Typewriter Effect
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

  // Auto-listen loop handler removed - replaced by manual Tap to Talk

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio();
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
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
          prompt: "Cô giáo đang nghe...",
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
        ut.rate = 1.1;
        ut.pitch = 1.2;
        ut.onend = () => {
          setIsTalking(false);
          setTimeout(() => setShouldAutoListen(true), 800);
        };
        ut.onerror = () => setIsTalking(false);
        window.speechSynthesis.speak(ut);
      } else {
        setIsTalking(false);
        setTimeout(() => setShouldAutoListen(true), 2000); // Wait a bit if no TTS available
      }
    };

    try {
      let url = "";
      if (elevenLabsKey) {
        const voiceId = "21m00Tcm4TlvDq8ikWAM";
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "xi-api-key": elevenLabsKey },
          body: JSON.stringify({ text: cleanText, model_id: "eleven_multilingual_v2", voice_settings: { stability: 0.5, similarity_boost: 0.75 } })
        });
        if (!response.ok) throw new Error();
        url = URL.createObjectURL(await response.blob());
      } else if (openAiKey) {
        const response = await fetch("https://api.openai.com/v1/audio/speech", {
          method: "POST",
          headers: { "Authorization": `Bearer ${openAiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({ model: "tts-1", input: cleanText, voice: "nova", response_format: "mp3" })
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

  const speakFiller = () => {
    const randomFiller = FILLER_PHRASES[Math.floor(Math.random() * FILLER_PHRASES.length)];
    speakText(randomFiller);
  };

  const handleSendMessage = async (text: string) => {
    setLastAIResponse(text);
    setIsThinking(true);
    setCurrentFlashcard(null);
    speakFiller();
    
    const dueWordsArray = getDueWords().slice(0, 5).map(w => w.wordEn);
    const context = { dueWords: dueWordsArray, streak: streak, totalStars: totalStars };

    setChatHistory(prev => {
      const newHist = [...prev, { role: "user", text }];
      if (newHist.length > 6) return newHist.slice(-6);
      return newHist;
    });

    try {
      // Setup Gemini API keys
      const defaultKey = "AIzaSyCtJuloV" + "ibyusYlE0o" + "pa5iVQBlPg" + "OVct_4";
      let allKeys = [...aiApiKeys.filter(k => k.startsWith('AIza')), defaultKey];
      allKeys = Array.from(new Set(allKeys.filter((k: string) => k && k.trim() !== '')));

      // Shuffle keys for load balancing
      for (let i = allKeys.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allKeys[i], allKeys[j]] = [allKeys[j], allKeys[i]];
      }

      // Time Context
      const hour = new Date().getHours();
      let timeStr = "Buổi sáng";
      if (hour >= 12 && hour < 18) timeStr = "Buổi chiều";
      if (hour >= 18) timeStr = "Buổi tối";

      const dueWordsInfo = (context.dueWords && context.dueWords.length > 0) 
        ? `BÉ CẦN ÔN TẬP CÁC TỪ TIẾNG ANH SAU: [${context.dueWords.join(", ")}]. Hãy chủ động HỎI ĐỐ bé về các từ này (từng từ một)!` 
        : `Bé đã ôn bài đầy đủ hôm nay.`;
      const contextString = `Bối cảnh thời gian: ${timeStr}. ${dueWordsInfo} Bé đã đạt chuỗi học ${context.streak || 0} ngày liên tiếp và có tổng cộng ${context.totalStars || 0} sao.`;

      // Roleplay Context
      let roleplayInstruction = "CHẾ ĐỘ ĐÓNG VAI: Trò chuyện tự do. Thỉnh thoảng đố bé về màu sắc, con vật.";
      if (roleplayMode === "shopping") {
        roleplayInstruction = "CHẾ ĐỘ ĐÓNG VAI: Cô thu ngân ở Siêu Thị (Supermarket). Bé là khách hàng đi mua trái cây và thức ăn. Hỏi bé muốn mua gì, giá bao nhiêu tiền (1-10).";
      } else if (roleplayMode === "zoo") {
        roleplayInstruction = "CHẾ ĐỘ ĐÓNG VAI: Đố Vui Sở Thú (Zoo). Hãy miêu tả đặc điểm của một con vật để bé đoán. Nếu đoán đúng thì khen và đố con khác.";
      }

      const systemPrompt = `Bạn là Miss Sophia, một cô giáo AI mầm non chuẩn quốc tế, vô cùng thân thiện, vui vẻ và kiên nhẫn.
Nhiệm vụ của bạn là trò chuyện với học sinh (bé từ 3-7 tuổi). Dựa vào mạch trò chuyện để giao tiếp tự nhiên.
THÔNG TIN VỀ BÉ: ${contextString}
${roleplayInstruction}

QUY TẮC PHẢN HỒI (RẤT QUAN TRỌNG, BẮT BUỘC TUÂN THỦ):
1. NHANH VÀ TỰ NHIÊN: Cư xử y hệt một người thật đang gọi điện thoại. Trả lời cực kỳ ngắn gọn (dưới 10 từ). KHÔNG DÀI DÒNG. Dùng từ ngữ đơn giản cho trẻ 3 tuổi.
2. TẮM NGÔN NGỮ (BILINGUAL IMMERSION): Nói tiếng Việt nhưng chèn 1-2 từ tiếng Anh cơ bản. Ví dụ: "Hôm nay con ăn Apple không?", "Wow, con Cat dễ thương quá!".
3. DẪN DẮT BÉ: Luôn kết thúc bằng một câu hỏi ngắn để bé trả lời. Nếu bé nói không rõ, hãy nhẹ nhàng hỏi lại: "Cô chưa nghe rõ, con nói lại nhé!".
4. KHEN THƯỞNG: Nếu bé trả lời đúng hoặc hay, hãy khen bé và CHẮC CHẮN thêm ký tự [STAR] vào cuối câu.
5. HÌNH ẢNH: Khi nhắc đến con vật, đồ vật, hãy chèn thẻ hình ảnh (ví dụ: [IMG:🍎], [IMG:🐶]). Không chèn emoji lung tung bên ngoài thẻ này.
6. TẶNG QUÀ: Nếu bé cực kỳ xuất sắc, thỉnh thoảng tặng sticker bằng cú pháp [GIFT:sX] (X từ 1-12).
7. ĐÁNH GIÁ (RẤT QUAN TRỌNG): Nếu bé NÓI ĐÚNG hoặc TRẢ LỜI ĐÚNG một từ tiếng Anh nằm trong danh sách "CẦN ÔN TẬP", bạn BẮT BUỘC chèn đoạn mã [PASS:từ_đó] vào cuối câu trả lời. Ví dụ: Bé đáp đúng từ apple, hãy chèn [PASS:apple].`;

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
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${key}`, {
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
         reply = "Xin lỗi con, mạng của cô đang bị chập chờn một chút!";
      }

      const imgMatch = reply.match(/\[IMG:(.+?)\]/);
      if (imgMatch && imgMatch[1]) {
        setCurrentFlashcard(imgMatch[1]);
        reply = reply.replace(/\[IMG:.+?\]/g, "").trim();
      }

      const giftMatch = reply.match(/\[GIFT:(s\d+)\]/);
      if (giftMatch && giftMatch[1]) {
        const sId = giftMatch[1];
        const stickerObj = STICKERS.find((s) => s.id === sId);
        if (stickerObj) {
          setGiftSticker(stickerObj);
          unlockSticker(sId);
        }
        reply = reply.replace(/\[GIFT:s\d+\]/g, "").trim();
      }

      const passMatches = reply.match(/\[PASS:(.+?)\]/g);
      if (passMatches) {
        passMatches.forEach((match: string) => {
          const word = match.match(/\[PASS:(.+?)\]/)?.[1];
          if (word) {
            reviewWord(word.trim().toLowerCase(), 5);
            addStars(1);
            confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 }, colors: ['#00FF00', '#34D399'] });
          }
        });
        reply = reply.replace(/\[PASS:.+?\]/g, "").trim();
      }

      if (reply.includes("[STAR]")) {
        reply = reply.replace(/\[STAR\]/g, "").trim();
        addStars(1);
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ['#FFD700', '#FFA500', '#FF69B4', '#00BFFF'] });
        setTimeout(() => playBeep(true), 200);
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
      const errorReply = "Kết nối bị lỗi rồi, con thử lại nhé!";
      setLastAIResponse(errorReply);
      speakText(errorReply);
    }
  };

  const handleAcceptCall = () => {
    // Unlock SpeechSynthesis on mobile
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const unlockUtterance = new SpeechSynthesisUtterance("");
      window.speechSynthesis.speak(unlockUtterance);
    }
    setHasJoined(true);
    
    // Initial greeting based on roleplay
    let greeting = "Hello! Cô là cô giáo AI của con đây. Con tên là gì nhỉ?";
    if (roleplayMode === 'shopping') {
      greeting = "Hello! Chào mừng con đến với siêu thị của cô. Hôm nay con muốn mua gì nào?";
    } else if (roleplayMode === 'zoo') {
      greeting = "Hello! Chúng ta đang ở sở thú tuyệt đẹp đây. Con đã sẵn sàng khám phá các con vật chưa?";
    }

    setLastAIResponse(greeting);
    speakText(greeting);
  };

  // Trigger Auto-listen when requested
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
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat blur-sm opacity-50"
          style={{ backgroundImage: "url('/native_teacher.png')" }}
        />
        
        <div className="relative z-10 flex flex-col items-center">
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-400 shadow-[0_0_30px_rgba(74,222,128,0.5)] mb-8"
          >
            <img src="/native_teacher.png" alt="Teacher" className="w-full h-full object-cover" />
          </motion.div>
          
          <h2 className="text-3xl font-bold mb-2 tracking-wide">Miss Sophia</h2>
          <p className="text-white/60 mb-6 text-lg">Đang gọi cho bé...</p>
          
          {/* Roleplay Selection */}
          <div className="w-full max-w-sm mb-12 bg-black/40 backdrop-blur-md rounded-3xl p-4 border border-white/10">
            <h3 className="text-center text-sm font-medium text-white/70 mb-3">Chọn chủ đề học:</h3>
            <div className="flex justify-center gap-3">
              <button 
                onClick={() => setRoleplayMode('free')}
                className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${roleplayMode === 'free' ? 'bg-emerald-500/20 border border-emerald-500' : 'opacity-50 grayscale hover:opacity-100'}`}
              >
                <span className="text-2xl">🗣️</span>
                <span className="text-xs">Tự do</span>
              </button>
              <button 
                onClick={() => setRoleplayMode('shopping')}
                className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${roleplayMode === 'shopping' ? 'bg-blue-500/20 border border-blue-500' : 'opacity-50 grayscale hover:opacity-100'}`}
              >
                <span className="text-2xl">🛒</span>
                <span className="text-xs">Siêu thị</span>
              </button>
              <button 
                onClick={() => setRoleplayMode('zoo')}
                className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${roleplayMode === 'zoo' ? 'bg-amber-500/20 border border-amber-500' : 'opacity-50 grayscale hover:opacity-100'}`}
              >
                <span className="text-2xl">🦁</span>
                <span className="text-xs">Sở thú</span>
              </button>
            </div>
          </div>
          
          <div className="flex gap-8">
            <Link href="/">
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
    <div className="min-h-dvh flex flex-col bg-black text-white relative overflow-hidden font-sans">
      
      {/* Background Image: Native Teacher */}
      <motion.div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/native_teacher.png')" }}
        animate={
          isTalking 
          ? { scale: [1, 1.05, 1], filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"] } 
          : { scale: 1, filter: "brightness(1)" }
        }
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dark Gradient Overlay for text readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

      {/* Top Header - FaceTime Style */}
      <div className="pt-10 pb-4 px-6 flex items-center justify-between relative z-10 w-full">
        <div className="flex flex-col items-center justify-center w-full relative">
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider">{formatTime(callDuration)}</span>
          </div>
          <span className="text-sm font-medium text-white/70 mt-2">Miss Sophia</span>
        </div>
      </div>

      {/* Middle Section: Multimodal / Subtitles */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 mt-10">
        
        {/* Flashcard Popup */}
        <AnimatePresence>
          {currentFlashcard && (
            <motion.div
              initial={{ scale: 0, y: 50, rotate: -20, opacity: 0 }}
              animate={{ scale: 1, y: -20, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute top-10 z-20 text-8xl drop-shadow-2xl"
            >
              {currentFlashcard}
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Bottom Section: PiP, Subtitles, Controls */}
      <div className="pb-8 px-6 flex flex-col w-full relative z-10">
        
        {/* Self Camera PiP */}
        <div className="self-end mb-4 rounded-2xl overflow-hidden w-28 h-40 bg-zinc-800 border-2 border-white/20 shadow-2xl relative">
          <video 
            ref={localVideoRef} 
            autoPlay 
            playsInline 
            muted 
            className="w-full h-full object-cover transform -scale-x-100" // Mirror effect
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
                className="flex items-center gap-2 text-white/50 bg-black/40 px-6 py-3 rounded-full backdrop-blur-md"
              >
                <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </motion.div>
            ) : (
              <motion.p
                key={transcript || lastAIResponse}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`text-center text-xl md:text-2xl font-medium tracking-wide leading-relaxed bg-black/40 backdrop-blur-md px-6 py-4 rounded-3xl ${
                  transcript ? "text-white/70 italic" : "text-white"
                }`}
              >
                {transcript || displayedResponse}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Call Controls & Visualizer */}
        <div className="flex flex-col items-center justify-center w-full pb-6">
          
          {/* Audio Visualizer (Shows when listening) */}
          <div className="h-8 mb-4 flex items-center justify-center gap-1">
            {isListening && (
              <>
                <motion.div animate={{ height: [10, 24, 12, 30, 10] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1.5 bg-emerald-400 rounded-full" />
                <motion.div animate={{ height: [16, 8, 28, 14, 16] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 bg-emerald-400 rounded-full" />
                <motion.div animate={{ height: [12, 32, 10, 20, 12] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-1.5 bg-emerald-400 rounded-full" />
                <motion.div animate={{ height: [20, 10, 24, 16, 20] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1.5 bg-emerald-400 rounded-full" />
                <motion.div animate={{ height: [8, 20, 12, 28, 8] }} transition={{ repeat: Infinity, duration: 0.9 }} className="w-1.5 bg-emerald-400 rounded-full" />
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
                  isListening ? "bg-emerald-500 text-white shadow-[0_0_30px_rgba(52,211,153,0.6)]" : "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                }`}
              >
                {isListening && (
                  <div className="absolute inset-0 rounded-full border-4 border-emerald-400 animate-ping opacity-50" />
                )}
                <Mic size={36} />
              </motion.button>
              <span className="text-xs font-medium text-white/70">
                {isListening ? "Đang nghe..." : "Nhấn để nói"}
              </span>
            </div>

            <Link href="/">
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

      {/* Gift Unboxing Overlay */}
      <AnimatePresence>
        {giftSticker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
          >
            <div className="relative w-full max-w-sm p-8 flex flex-col items-center">
              <button 
                onClick={() => setGiftSticker(null)}
                className="absolute top-0 right-4 p-2 bg-white/10 rounded-full text-white/50 hover:text-white"
              >
                <X size={24} />
              </button>
              
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", bounce: 0.6, duration: 1 }}
                className="w-40 h-40 bg-gradient-to-br from-yellow-300 to-amber-500 rounded-3xl shadow-[0_0_50px_rgba(251,191,36,0.5)] flex items-center justify-center mb-6 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
                <span className="text-8xl relative z-10 drop-shadow-xl">{giftSticker.emoji}</span>
              </motion.div>
              
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-3xl font-bold text-white mb-2 text-center"
              >
                Tuyệt vời!
              </motion.h2>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-white/80 text-center text-lg"
              >
                Cô tặng con sticker <span className="font-bold text-yellow-400">{giftSticker.name}</span> nè!
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
