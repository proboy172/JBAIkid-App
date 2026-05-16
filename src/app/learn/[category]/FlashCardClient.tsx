"use client";

import { useState, useCallback, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/layout/BackButton";
import BottomNav from "@/components/layout/BottomNav";
import { ConfettiOverlay } from "@/components/shared/ConfettiOverlay";
import { getAllTopics } from "@/data/vocabulary";
import { useSpeech } from "@/hooks/useSpeech";
import { useConfetti } from "@/hooks/useConfetti";
import { useAppStore } from "@/stores/appStore";
import { Volume2, ChevronLeft, ChevronRight, Mic } from "lucide-react";
import stringSimilarity from "string-similarity";

export default function FlashCardClient() {
  const { category } = useParams<{ category: string }>();
  const cat = getAllTopics().find((c) => c.id === category);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [direction, setDirection] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const { speak } = useSpeech();
  const { pieces, fire } = useConfetti();
  const { markWordLearned, addStars, learnedWords } = useAppStore();
  const [isRecording, setIsRecording] = useState(false);
  const [speechFeedback, setSpeechFeedback] = useState<"correct" | "incorrect" | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-play English word when navigating to it (with slight delay for animation)
  useEffect(() => {
    if (isMounted && current) {
      const timer = setTimeout(() => {
        speak(current.en, "en-US");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [current, isMounted, speak]);

  const items = cat?.items || [];
  const current = items[index];
  
  const startRecording = useCallback(async () => {
    if (typeof window === "undefined" || !current) return;
    
    // Xử lý chung kết quả từ cả 2 nền tảng
    const handleResult = (transcript: string) => {
      const target = current.en.toLowerCase().trim();
      const similarity = stringSimilarity.compareTwoStrings(transcript, target);
      
      if (similarity >= 0.8 || transcript.includes(target) || target.includes(transcript)) {
        setSpeechFeedback("correct");
        addStars(2);
        fire();
        setTimeout(() => setSpeechFeedback(null), 2000);
      } else {
        setSpeechFeedback("incorrect");
        setTimeout(() => setSpeechFeedback(null), 2000);
      }
    };

    // 1. Nếu chạy Native APK (Capacitor)
    const { Capacitor } = await import("@capacitor/core");
    if (Capacitor.isNativePlatform()) {
      try {
        const { SpeechRecognition } = await import("@capacitor-community/speech-recognition");
        
        // Xin quyền
        let permStatus = await SpeechRecognition.checkPermissions();
        if (permStatus.speechRecognition !== 'granted') {
          permStatus = await SpeechRecognition.requestPermissions();
        }
        if (permStatus.speechRecognition !== 'granted') {
          alert('Vui lòng cấp quyền micro để thu âm!');
          return;
        }

        setIsRecording(true);
        // Start native listening
        SpeechRecognition.start({
          language: "en-US",
          maxResults: 1,
          prompt: "Đọc to từ tiếng Anh...",
          partialResults: false,
        });

        // Bắt sự kiện trả về
        SpeechRecognition.addListener("partialResults", (data: any) => {
          if (data.matches && data.matches.length > 0) {
            handleResult(data.matches[0].toLowerCase().trim());
          }
          setIsRecording(false);
          SpeechRecognition.stop(); // Stop after receiving result
        });

        // Tự động tắt mic sau 5 giây nếu không nói
        setTimeout(() => {
          SpeechRecognition.stop();
          setIsRecording(false);
        }, 5000);

        return; // Thoát nhánh Web
      } catch (e) {
        console.error("Native Speech Error:", e);
        setIsRecording(false);
      }
    }
    
    // 2. Nếu chạy trên Trình duyệt Web (Fallback)
    const WebSpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!WebSpeechRecognition) {
      alert("Trình duyệt không hỗ trợ nhận diện giọng nói! Hãy dùng PWA hoặc cài bản cập nhật mới nhất.");
      return;
    }
    
    const recognition = new WebSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    recognition.onstart = () => setIsRecording(true);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      handleResult(transcript);
    };
    
    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);
    
    recognition.start();
  }, [current, addStars, fire]);
  const learned = learnedWords[category] || [];
  const isLearned = current ? learned.includes(current.en) : false;
  
  const goNext = useCallback(() => {
    if (index < items.length - 1) {
      setDirection(1);
      setFlipped(false);
      setIndex((i) => i + 1);
    }
  }, [index, items.length]);

  const goPrev = useCallback(() => {
    if (index > 0) {
      setDirection(-1);
      setFlipped(false);
      setIndex((i) => i - 1);
    }
  }, [index]);

  // Prevent hydration mismatch
  if (!isMounted) {
    return <div className="min-h-dvh flex flex-col bg-white" />;
  }

  if (!cat || !current) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <p className="text-xl">Không tìm thấy chủ đề 😢</p>
      </div>
    );
  }

  const progress = Math.round(((index + 1) / items.length) * 100);

  return (
    <div className="min-h-dvh flex flex-col">
      <ConfettiOverlay pieces={pieces} />

      {/* Header */}
      <div className="pt-10 pb-2 px-5 relative z-10">
        <div className="flex items-center justify-between">
          <BackButton label={cat.nameVi} />
          <span className="text-sm font-bold px-3 py-1 rounded-full glass-card" style={{ color: cat.color }}>
            {index + 1} / {items.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-2.5 bg-white/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: cat.color }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Flash Card Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 pb-28 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ x: direction * 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -direction * 200, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-sm"
          >
            {/* Card */}
            <div
              className="flash-card-container w-full"
              style={{ height: "340px" }}
              onClick={() => setFlipped((f) => !f)}
            >
              <div className={`flash-card-inner ${flipped ? "flipped" : ""}`}>
                {/* Front - Emoji + Word */}
                <div
                  className="flash-card-front glass-card flex flex-col items-center justify-center gap-4 p-6 cursor-pointer"
                  style={{ border: `3px solid ${cat.color}33` }}
                >
                  <motion.span
                    className="text-8xl"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                  >
                    {current.emoji}
                  </motion.span>
                  <h2
                    className="text-4xl font-extrabold"
                    style={{ fontFamily: "var(--font-heading)", color: cat.color }}
                  >
                    {current.en}
                  </h2>
                  <p className="text-sm text-text-light">👆 Chạm để lật thẻ</p>
                  
                  {/* Feedback overlay */}
                  <AnimatePresence>
                    {speechFeedback && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white font-bold text-sm ${speechFeedback === "correct" ? "bg-green-500 shadow-[0_0_15px_#22c55e]" : "bg-red-500 shadow-[0_0_15px_#ef4444]"}`}
                      >
                        {speechFeedback === "correct" ? "Tuyệt vời! +2⭐" : "Thử lại nhé!"}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Back - Translation + Phonetic */}
                <div
                  className="flash-card-back glass-card flex flex-col items-center justify-center gap-3 p-6 cursor-pointer"
                  style={{ border: `3px solid ${cat.color}33`, background: `linear-gradient(135deg, ${cat.color}11, white)` }}
                >
                  <span className="text-6xl">{current.emoji}</span>
                  <h2
                    className="text-3xl font-extrabold"
                    style={{ fontFamily: "var(--font-heading)", color: cat.color }}
                  >
                    {current.en}
                  </h2>
                  <p className="text-lg text-text-light font-mono">{current.phonetic}</p>
                  <div className="h-px w-16 bg-gray-200 my-1" />
                  <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                    {current.vi}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 mt-6">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={goPrev}
            disabled={index === 0}
            className="bubble-btn w-14 h-14 bg-white shadow-md disabled:opacity-30"
            id="btn-prev"
          >
            <ChevronLeft size={28} className="text-text relative z-10" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => {
              speak(current.en, "en-US");
              if (!isLearned && current) {
                markWordLearned(category, current.en);
                addStars(1);
                fire();
              }
            }}
            className="bubble-btn w-16 h-16 shadow-lg"
            style={{ background: `linear-gradient(135deg, ${cat.color}, ${cat.color}CC)` }}
            id="btn-speak"
          >
            <Volume2 size={30} className="text-white relative z-10" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={(e) => {
              e.stopPropagation();
              startRecording();
            }}
            className={`bubble-btn w-16 h-16 shadow-lg ${isRecording ? "bg-red-500 animate-pulse" : "bg-blue-500"}`}
            id="btn-record"
          >
            <Mic size={30} className="text-white relative z-10" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={goNext}
            disabled={index === items.length - 1}
            className="bubble-btn w-14 h-14 bg-white shadow-md disabled:opacity-30"
            id="btn-next"
          >
            <ChevronRight size={28} className="text-text relative z-10" />
          </motion.button>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {current.realSound && (
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={(e) => {
                e.stopPropagation();
                const audio = new Audio(current.realSound);
                audio.play().catch(err => console.log("Lỗi phát âm thanh:", err));
              }}
              className="px-5 py-2.5 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/50 text-sm font-semibold shadow-sm flex items-center gap-2 text-green-700"
            >
              🎵 Âm thanh thực
            </motion.button>
          )}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => speak(current.vi, "vi-VN")}
            className="px-5 py-2.5 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/50 text-sm font-semibold shadow-sm flex items-center gap-2"
            id="btn-speak-vi"
          >
            🇻🇳 Nghe tiếng Việt
          </motion.button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
