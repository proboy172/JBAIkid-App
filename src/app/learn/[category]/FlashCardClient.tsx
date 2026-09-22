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
import Link from "next/link";
import { playSFX, playRealLifeSound } from "@/utils/soundEffects";
import { getWordSyllables } from "@/utils/syllableHelper";
import SpeechPracticeModal from "@/components/shared/SpeechPracticeModal";

export default function FlashCardClient() {
  const { category } = useParams<{ category: string }>();
  const cat = getAllTopics().find((c) => c.id === category);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [direction, setDirection] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [showSpeechModal, setShowSpeechModal] = useState(false);
  const { speak } = useSpeech();
  const { pieces, fire } = useConfetti();
  const { markWordLearned, addStars, learnedWords } = useAppStore();
  const [isRecording, setIsRecording] = useState(false);
  const [speechFeedback, setSpeechFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [activeSyllableIndex, setActiveSyllableIndex] = useState<number | null>(null);
  const [isPlayingPhonics, setIsPlayingPhonics] = useState(false);

  // Swipe state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  const items = cat?.items || [];
  const current = items[index];
  const syllables = current ? getWordSyllables(current.en) : [];

  // Montessori Real Photos as primary visual
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageLoading(true);
    setImageError(false);
  }, [index]);

  // Always show real photo directly (authentic Montessori learning)
  const currentImageUrl = current?.photoUrl || current?.illustrationUrl;

  const playPhonicsSequence = useCallback(async () => {
    if (!current || syllables.length === 0 || isPlayingPhonics) return;
    setIsPlayingPhonics(true);
    playSFX("tap");

    for (let i = 0; i < syllables.length; i++) {
      setActiveSyllableIndex(i);
      speak(syllables[i], "en-US", 0.65);
      await new Promise((r) => setTimeout(r, 750));
    }
    setActiveSyllableIndex(null);
    await new Promise((r) => setTimeout(r, 200));
    speak(current.en, "en-US", 0.85);
    setIsPlayingPhonics(false);
  }, [current, syllables, isPlayingPhonics, speak]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-play English word when navigating to it manually (with slight delay for animation)
  useEffect(() => {
    if (isMounted && current && !isAutoPlay) {
      const timer = setTimeout(() => {
        speak(current.en, "en-US");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [current, isMounted, speak, isAutoPlay]);

  const learned = learnedWords[category] || [];
  const isLearned = current ? learned.includes(current.en) : false;

  const goNext = useCallback(() => {
    if (index < items.length - 1) {
      playSFX("pop");
      setDirection(1);
      setFlipped(false);
      setActiveSyllableIndex(null);
      setIsPlayingPhonics(false);
      setIndex((i) => i + 1);
    } else {
      playSFX("cheer");
      addStars(3);
      fire();
      setShowCompletion(true);
    }
  }, [index, items.length, addStars, fire]);

  const goPrev = useCallback(() => {
    if (index > 0) {
      playSFX("pop");
      setDirection(-1);
      setFlipped(false);
      setActiveSyllableIndex(null);
      setIsPlayingPhonics(false);
      setIndex((i) => i - 1);
    }
  }, [index]);

  // Hands-free Auto-play Slideshow loop
  useEffect(() => {
    if (!isAutoPlay || !current || showCompletion) return;

    // 1. Speak English word clearly
    speak(current.en, "en-US", 0.75);

    // 2. Flip to back after 1.8s and speak Vietnamese translation
    const flipTimer = setTimeout(() => {
      setFlipped(true);
      if (!isLearned && current) {
        markWordLearned(category, current.en);
        addStars(1);
      }
      speak(current.vi, "vi-VN", 0.65);
    }, 1800);

    // 3. Move to next card after 4.2s
    const nextTimer = setTimeout(() => {
      if (index < items.length - 1) {
        goNext();
      } else {
        setIsAutoPlay(false);
        goNext();
      }
    }, 4200);

    return () => {
      clearTimeout(flipTimer);
      clearTimeout(nextTimer);
    };
  }, [isAutoPlay, index, current, showCompletion, goNext, speak, isLearned, category, markWordLearned, addStars, items.length]);
  
  const startRecording = useCallback(async () => {
    if (typeof window === "undefined" || !current) return;
    
    // Xử lý chung kết quả từ cả 2 nền tảng
    const handleResult = (transcript: string) => {
      const target = current.en.toLowerCase().trim();
      const similarity = stringSimilarity.compareTwoStrings(transcript, target);
      
      if (similarity >= 0.8 || transcript.includes(target) || target.includes(transcript)) {
        playSFX("correct");
        setSpeechFeedback("correct");
        addStars(2);
        fire();
        if (!isLearned && current) {
          markWordLearned(category, current.en);
        }
        setTimeout(() => setSpeechFeedback(null), 2500);
      } else {
        playSFX("boop");
        setSpeechFeedback("incorrect");
        setTimeout(() => setSpeechFeedback(null), 2500);
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
  }, [current, isLearned, category, markWordLearned, addStars, fire]);

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

  // Suggest next 3 topics
  const allTopics = getAllTopics();
  const currentTopicIndex = allTopics.findIndex(t => t.id === category);
  let nextTopics = allTopics.slice(currentTopicIndex + 1, currentTopicIndex + 4);
  if (nextTopics.length < 3) {
    nextTopics = [...nextTopics, ...allTopics.slice(0, 3 - nextTopics.length)];
  }

  // Swipe handlers
  const minSwipeDistance = 50;
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      goNext();
    }
    if (isRightSwipe && index > 0) {
      goPrev();
    }
  };

  if (showCompletion) {
    return (
      <div className="min-h-dvh flex flex-col bg-white p-5">
        <ConfettiOverlay pieces={pieces} />
        
        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center mb-8"
          >
            <span className="text-8xl block mb-4">🏆</span>
            <h1 className="text-4xl font-extrabold text-green-500 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Tuyệt vời!
            </h1>
            <p className="text-xl text-gray-600">Bé đã hoàn thành chủ đề {cat.nameVi}</p>
          </motion.div>

          <h2 className="text-xl font-bold mb-4 text-gray-700">Học tiếp chủ đề nào đây?</h2>
          
          <div className="w-full max-w-md space-y-4">
            {nextTopics.map((topic, i) => (
              <motion.div
                key={topic.id}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/learn/${topic.id}`}>
                  <div 
                    className="glass-card flex items-center p-4 gap-4 cursor-pointer hover:scale-[1.02] transition-transform"
                    style={{ borderLeft: `6px solid ${topic.color}` }}
                  >
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm" style={{ backgroundColor: `${topic.color}22` }}>
                      {topic.emoji}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800">{topic.nameVi}</h3>
                      <p className="text-gray-500">{topic.nameEn}</p>
                    </div>
                    <ChevronRight className="text-gray-400" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <Link href="/">
            <button className="mt-8 px-8 py-4 bg-gray-100 rounded-full font-bold text-gray-600 hover:bg-gray-200 transition-colors">
              Về trang chủ
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh flashcard-screen-root flex flex-col">
      <ConfettiOverlay pieces={pieces} />

      {/* Header */}
      <div className="pt-8 sm:pt-10 pb-2 px-4 sm:px-5 landscape:pt-2 landscape:pb-1 relative z-10 flashcard-screen-header">
        <div className="flex items-center justify-between">
          <BackButton label={cat.nameVi} />
          
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                playSFX("tap");
                setIsAutoPlay((prev) => !prev);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border shadow-sm transition-all ${
                isAutoPlay
                  ? "bg-pink-500 text-white border-pink-400 shadow-pink-300/50 animate-pulse"
                  : "bg-white/80 text-text-light border-white/60 hover:text-text"
              }`}
              title={isAutoPlay ? "Tạm dừng tự động xem" : "Bật tự động lật & đọc từ"}
            >
              <span>{isAutoPlay ? "⏸️ Dừng" : "▶️ Tự động xem"}</span>
            </motion.button>

            <span className="text-sm font-bold px-3 py-1 rounded-full glass-card" style={{ color: cat.color }}>
              {index + 1} / {items.length}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-2.5 sm:mt-3 landscape:mt-1 h-2 sm:h-2.5 bg-white/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: cat.color }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Flash Card Area */}
      <div className="flex-1 flashcard-main-layout flex flex-col items-center justify-center px-4 py-1 sm:py-2 pb-20 sm:pb-24 overflow-y-auto relative z-10 w-full max-w-5xl mx-auto">
        {/* Card Column */}
        <div className="w-full max-w-xs sm:max-w-sm flashcard-card-box flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ x: direction * 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -direction * 200, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full"
            >
              {/* Card */}
              <div
                className="flash-card-container w-full h-[360px] sm:h-[400px] flashcard-card-inner-h"
              onClick={() => {
                playSFX("pop");
                setFlipped((f) => !f);
                if (!isLearned && current) {
                  markWordLearned(category, current.en);
                  addStars(1);
                  fire();
                }
              }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEndHandler}
            >
              <div className={`flash-card-inner ${flipped ? "flipped" : ""}`}>
                {/* Front - Mode Switch + Visual (Photo/3D/Emoji) + Word + Syllables */}
                <div
                  className="flash-card-front glass-card flex flex-col items-center justify-between p-3.5 sm:p-4 cursor-pointer relative overflow-hidden"
                  style={{ border: `3px solid ${cat.color}33` }}
                >
                  {/* Top Bar: Authentic Photo Badge + Real Sound Button */}
                  <div className="w-full flex items-center justify-between gap-1 z-20">
                    {current.photoUrl ? (
                      <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2.5 py-1 rounded-full shadow-xs text-[11px] font-bold">
                        <span>📸 Ảnh thực tế • Montessori</span>
                      </div>
                    ) : (
                      <div />
                    )}

                    {(current.realSound || current.realSoundType) && (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          playRealLifeSound(current.realSoundType, current.realSound);
                        }}
                        className="px-2.5 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-[11px] sm:text-xs font-bold shadow-sm flex items-center gap-1 transition-all"
                        title="Nghe âm thanh thực tế"
                      >
                        <span className="animate-bounce">🔊</span>
                        <span>{current.soundLabel ? current.soundLabel.replace("Tiếng ", "") : "Âm thanh"}</span>
                      </motion.button>
                    )}
                  </div>

                  {/* Visual Presentation: Montessori Real Photo Always Direct */}
                  <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 shrink-0 rounded-2xl overflow-hidden flex items-center justify-center bg-gradient-to-b from-white to-slate-50 shadow-md border-2 border-white/90 my-0.5 sm:my-1 flashcard-photo-box">
                    {currentImageUrl && !imageError ? (
                      <>
                        <img
                          key={current.en}
                          src={currentImageUrl}
                          alt={current.en}
                          className={`w-full h-full object-cover rounded-2xl transition-opacity duration-200 ${
                            imageLoading ? "opacity-0" : "opacity-100"
                          }`}
                          loading="eager"
                          onLoad={() => setImageLoading(false)}
                          onError={() => {
                            setImageError(true);
                            setImageLoading(false);
                          }}
                        />
                        {imageLoading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-100/90 animate-pulse">
                            <span className="text-4xl opacity-50">{current.emoji}</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <motion.span
                        className="text-5xl sm:text-6xl"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                      >
                        {current.emoji}
                      </motion.span>
                    )}
                  </div>

                  {/* English Word */}
                  <h2
                    className="text-2xl sm:text-3xl font-extrabold tracking-tight"
                    style={{ fontFamily: "var(--font-heading)", color: cat.color }}
                  >
                    {current.en}
                  </h2>

                  {/* Association Prompt for Toddler */}
                  {current.association && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-1.5 px-3 py-1 bg-amber-50/95 border border-amber-200/90 rounded-full text-xs sm:text-sm font-bold text-amber-900 shadow-sm max-w-full text-center my-0.5"
                    >
                      <span className="text-amber-500">💡</span>
                      <span className="truncate">{current.association}</span>
                    </motion.div>
                  )}

                  {/* Interactive Syllables Breakdown Pill Strip */}
                  <div 
                    className="flex flex-col items-center gap-1 z-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-1.5 flex-wrap justify-center max-w-full px-1">
                      {syllables.map((syl, i) => (
                        <motion.button
                          key={i}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            playSFX("tap");
                            setActiveSyllableIndex(i);
                            speak(syl, "en-US", 0.65);
                            setTimeout(() => setActiveSyllableIndex(null), 900);
                          }}
                          className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-xl text-xs sm:text-sm font-black tracking-wide transition-all shadow-sm flex items-center gap-1 ${
                            activeSyllableIndex === i
                              ? "bg-amber-400 text-slate-900 scale-110 ring-2 ring-amber-300 shadow-md"
                              : "bg-white/90 hover:bg-white text-slate-700 border border-slate-200"
                          }`}
                        >
                          <span>{syl}</span>
                        </motion.button>
                      ))}

                      {syllables.length > 1 && (
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            playPhonicsSequence();
                          }}
                          className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xl text-[11px] sm:text-xs font-bold transition-all shadow-sm flex items-center gap-1 ${
                            isPlayingPhonics 
                              ? "bg-primary text-white animate-pulse" 
                              : "bg-primary/15 text-primary hover:bg-primary/25"
                          }`}
                          title="Đọc chậm từng âm"
                        >
                          <span>🎧 Ghép vần</span>
                        </motion.button>
                      )}
                    </div>
                  </div>

                  <p className="text-[10px] sm:text-[11px] text-text-light">👆 Chạm để lật thẻ xem nghĩa</p>
                  
                  {/* Feedback overlay */}
                  <AnimatePresence>
                    {speechFeedback && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-white font-bold text-sm shadow-xl flex items-center gap-1.5 z-30 ${
                          speechFeedback === "correct" 
                            ? "bg-green-500 shadow-green-500/50" 
                            : "bg-amber-500 shadow-amber-500/50"
                        }`}
                      >
                        {speechFeedback === "correct" ? "🌟 Tuyệt vời! +2⭐" : "💪 Cố lên, đọc lại nhé!"}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Back - Translation + Phonetic + Contextual Example Sentence */}
                <div
                  className="flash-card-back glass-card flex flex-col justify-between p-3.5 sm:p-4 cursor-pointer"
                  style={{ border: `3px solid ${cat.color}33`, background: `linear-gradient(135deg, ${cat.color}11, white)` }}
                >
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{current.emoji}</span>
                      <span className="text-lg font-bold" style={{ color: cat.color }}>{current.en}</span>
                    </div>
                    <span className="text-xs text-text-light font-mono bg-white/80 px-2.5 py-0.5 rounded-full border border-gray-100">
                      {current.phonetic}
                    </span>
                  </div>

                  <div 
                    className="my-auto text-center py-1 cursor-pointer group"
                    onClick={(e) => {
                      e.stopPropagation();
                      playSFX("tap");
                      speak(current.vi, "vi-VN", 0.65);
                    }}
                    title="Chạm để nghe tiếng Việt chậm rãi"
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <p className="text-2xl sm:text-3xl font-black text-gray-800 tracking-tight group-hover:text-primary transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                        {current.vi}
                      </p>
                      <span className="p-1 rounded-full bg-primary/10 text-primary text-xs opacity-70 group-hover:opacity-100 transition-opacity">
                        🔊
                      </span>
                    </div>
                    {current.association && (
                      <div className="mt-2 text-xs sm:text-sm font-semibold text-amber-900 bg-amber-50/95 px-3 py-1.5 rounded-xl border border-amber-200/80 inline-flex items-center gap-1.5 shadow-xs max-w-full text-center">
                        <span className="text-amber-600">💡 Liên tưởng:</span>
                        <span>{current.association}</span>
                      </div>
                    )}
                    <div className="mt-1 text-xs text-gray-500 flex items-center justify-center gap-1 bg-white/70 px-3 py-0.5 rounded-full inline-flex border border-gray-100">
                      <span>Âm tiết:</span>
                      <span className="font-bold text-primary">{syllables.join(" • ")}</span>
                    </div>
                  </div>

                  {/* Contextual Action / Example Sentence */}
                  {current.exampleSentenceEn && (
                    <div
                      className="w-full bg-white/95 rounded-2xl p-2.5 sm:p-3 border border-slate-100 shadow-sm flex flex-col gap-1 text-left z-20"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold tracking-wider uppercase text-primary flex items-center gap-1">
                          💡 Câu ví dụ thực tế
                        </span>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            playSFX("tap");
                            speak(current.exampleSentenceEn!, "en-US", 0.8);
                          }}
                          className="px-2 py-0.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 text-xs font-bold flex items-center gap-1 transition-colors"
                          title="Nghe phát âm câu"
                        >
                          <Volume2 size={13} />
                          <span>Nghe câu</span>
                        </motion.button>
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                        {current.exampleSentenceEn}
                      </p>
                      {current.exampleSentenceVi && (
                        <p className="text-[11px] sm:text-xs text-slate-500 italic">
                          {current.exampleSentenceVi}
                        </p>
                      )}
                    </div>
                  )}

                  <p className="text-[10px] sm:text-[11px] text-center text-text-light mt-1">👆 Chạm để quay lại mặt trước</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action Controls Box */}
      <div className="flashcard-action-box flex flex-col items-center justify-center gap-2.5 sm:gap-3.5 z-20">
        {/* Live Audio Waveform Visualizer */}
        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-1 bg-red-500/10 border border-red-500/30 px-4 py-1.5 rounded-2xl backdrop-blur-md shadow-lg"
            >
              <div className="flex items-center gap-1.5 h-5">
                {[0.2, 0.6, 1.0, 0.4, 0.9, 0.5, 0.8, 0.3].map((delay, idx) => (
                  <motion.span
                    key={idx}
                    className="w-1.5 bg-red-500 rounded-full"
                    animate={{ height: ["5px", "18px", "5px"] }}
                    transition={{
                      duration: 0.7,
                      repeat: Infinity,
                      delay: delay * 0.15,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
              <span className="text-[11px] font-bold text-red-500 animate-pulse">
                Đang lắng nghe bé đọc... 🎙️
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 sm:gap-4">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={goPrev}
            disabled={index === 0}
            className="bubble-btn w-12 h-12 sm:w-14 sm:h-14 bg-white shadow-md disabled:opacity-30 hover:scale-105 transition-transform"
            id="btn-prev"
            title="Từ trước"
          >
            <ChevronLeft size={24} className="text-text relative z-10" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => {
              playSFX("tap");
              speak(current.en, "en-US");
              if (!isLearned && current) {
                markWordLearned(category, current.en);
                addStars(1);
                fire();
              }
            }}
            className="bubble-btn w-14 h-14 sm:w-16 sm:h-16 shadow-lg hover:scale-105 transition-transform"
            style={{ background: `linear-gradient(135deg, ${cat.color}, ${cat.color}CC)` }}
            id="btn-speak"
            title="Nghe tiếng Anh"
          >
            <Volume2 size={26} className="text-white relative z-10" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={(e) => {
              e.stopPropagation();
              playSFX("tap");
              setShowSpeechModal(true);
            }}
            className="bubble-btn w-14 h-14 sm:w-16 sm:h-16 shadow-lg bg-gradient-to-tr from-blue-500 to-cyan-400 hover:scale-105 transition-transform"
            id="btn-record"
            title="Luyện đọc phát âm cùng AI"
          >
            <Mic size={26} className="text-white relative z-10" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={goNext}
            disabled={index === items.length - 1}
            className="bubble-btn w-12 h-12 sm:w-14 sm:h-14 bg-white shadow-md disabled:opacity-30 hover:scale-105 transition-transform"
            id="btn-next"
            title="Từ tiếp theo"
          >
            <ChevronRight size={24} className="text-text relative z-10" />
          </motion.button>
        </div>

        {/* Secondary Audio Pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
          {(current.realSound || current.realSoundType) && (
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={(e) => {
                e.stopPropagation();
                playRealLifeSound(current.realSoundType, current.realSound);
              }}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 backdrop-blur-sm border border-emerald-200 text-xs sm:text-sm font-bold shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <span>🔊 {current.soundLabel || "Âm thanh thực tế"}</span>
            </motion.button>
          )}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => speak(current.vi, "vi-VN", 0.65)}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-white/80 hover:bg-white backdrop-blur-sm border border-white/60 text-xs sm:text-sm font-semibold shadow-sm flex items-center gap-1.5 transition-colors"
            id="btn-speak-vi"
          >
            <span>🇻🇳 Nghe tiếng Việt</span>
          </motion.button>
        </div>
      </div>
    </div>

      <AnimatePresence>
        {showSpeechModal && current && (
          <SpeechPracticeModal
            wordEn={current.en}
            wordVi={current.vi}
            emoji={current.emoji}
            phonetic={current.phonetic}
            onClose={() => setShowSpeechModal(false)}
            onSuccess={() => {
              if (!isLearned && current) {
                markWordLearned(category, current.en);
              }
            }}
          />
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}
