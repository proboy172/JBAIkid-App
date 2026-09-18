"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, Sparkles, Lock, Unlock, Heart, Award, HelpCircle } from "lucide-react";
import { EducationalVideo } from "@/data/educationalVideos";
import { useAppStore } from "@/stores/appStore";
import { playSFX } from "@/utils/soundEffects";
import { useSpeech } from "@/hooks/useSpeech";

interface SafeVideoModalProps {
  video: EducationalVideo;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function SafeVideoModal({
  video,
  onClose,
  isFavorite,
  onToggleFavorite,
}: SafeVideoModalProps) {
  const { addStars } = useAppStore();
  const { speak } = useSpeech();
  const [hasAwardedStars, setHasAwardedStars] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [showParentTip, setShowParentTip] = useState(true);
  const openTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    // Award 5 stars automatically if the child watches for at least 25 seconds
    const timer = setTimeout(() => {
      if (!hasAwardedStars) {
        addStars(5);
        setHasAwardedStars(true);
        playSFX("star");
      }
    }, 25000);

    return () => clearTimeout(timer);
  }, [addStars, hasAwardedStars]);

  const handleClose = () => {
    if (isLocked) {
      playSFX("pop");
      return;
    }
    playSFX("tap");
    const elapsedSeconds = (Date.now() - openTimeRef.current) / 1000;
    if (!hasAwardedStars && elapsedSeconds >= 15) {
      addStars(5);
      setHasAwardedStars(true);
      playSFX("star");
    }
    onClose();
  };

  const handleSpeakWord = (word: string) => {
    playSFX("tap");
    speak(word, "en-US", 0.82);
  };

  const toggleLock = () => {
    playSFX("tap");
    setIsLocked(!isLocked);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1100] bg-black/95 backdrop-blur-md overflow-hidden flex flex-col"
    >
      {/* Top Bar Header */}
      <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-4 sm:px-6 pt-[max(env(safe-area-inset-top),20px)] pb-3 bg-gradient-to-b from-black/90 via-black/60 to-transparent pointer-events-auto">
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          <span className="text-2xl sm:text-3xl shrink-0">{video.channelAvatar}</span>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/20 text-amber-300">
                {video.channel}
              </span>
              <span className="text-[11px] text-white/70 hidden sm:inline">
                {video.categoryNameVi}
              </span>
            </div>
            <h2
              className="text-white text-sm sm:text-base md:text-lg font-bold truncate drop-shadow-md"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {video.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Favorite Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              playSFX("tap");
              onToggleFavorite();
            }}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
              isFavorite
                ? "bg-red-500/30 border-red-400 text-red-400"
                : "bg-white/15 border-white/25 text-white/70 hover:bg-white/25"
            }`}
            title={isFavorite ? "Bỏ yêu thích" : "Lưu vào video yêu thích"}
          >
            <Heart size={18} fill={isFavorite ? "#F87171" : "none"} />
          </motion.button>

          {/* Toddler Screen Lock Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleLock}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
              isLocked
                ? "bg-amber-500 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/40"
                : "bg-white/15 border-white/25 text-white/70 hover:bg-white/25"
            }`}
            title={isLocked ? "Bấm để mở khóa thao tác" : "Khóa màn hình cho bé xem"}
          >
            {isLocked ? <Lock size={18} strokeWidth={2.5} /> : <Unlock size={18} />}
          </motion.button>

          {/* Close Button */}
          <button
            onClick={handleClose}
            disabled={isLocked}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-colors text-white ${
              isLocked
                ? "opacity-30 cursor-not-allowed bg-white/10 border-white/10"
                : "bg-white/20 hover:bg-white/30 border-white/30 cursor-pointer"
            }`}
            title="Đóng video"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Main Content Area: Player (Top/Left) + Education Details (Bottom/Right) */}
      <div className="flex-1 w-full h-full flex flex-col lg:flex-row items-center justify-center z-10 pt-16 sm:pt-20 pb-3 px-3 sm:px-6 gap-3 sm:gap-5 overflow-hidden">
        
        {/* Safe YouTube Player Container */}
        <div className="w-full lg:w-3/5 xl:w-2/3 h-full max-h-[55vh] sm:max-h-[60vh] lg:max-h-[85vh] flex items-center justify-center relative">
          <div className="w-full h-full relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-white/15 bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&controls=1&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
            
            {/* Transparent click blocker when toddler screen lock is active */}
            {isLocked && (
              <div
                onClick={toggleLock}
                className="absolute inset-0 z-50 bg-black/20 flex flex-col items-center justify-center backdrop-blur-[1px] cursor-pointer"
              >
                <div className="bg-black/80 px-4 py-2 rounded-2xl border border-amber-400 text-amber-300 flex items-center gap-2 shadow-2xl animate-pulse">
                  <Lock size={18} />
                  <span className="text-xs font-bold">Màn hình đang khóa. Chạm vào đây để mở khóa.</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Education & Key Vocab Panel */}
        <div className="w-full lg:w-2/5 xl:w-1/3 flex-1 lg:h-full lg:max-h-[85vh] bg-slate-900/85 backdrop-blur-xl border border-white/15 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 text-white shadow-2xl flex flex-col overflow-hidden">
          
          {/* Header & Star Achievement */}
          <div className="flex items-center justify-between pb-2.5 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xl">{video.categoryEmoji}</span>
              <div>
                <span className="text-xs font-bold text-amber-300 block" style={{ fontFamily: "var(--font-heading)" }}>
                  Góc Từ Vựng & Mẹo Học
                </span>
                <span className="text-[10px] text-white/60">Độ tuổi: {video.recommendedAge}</span>
              </div>
            </div>

            <div className={`px-2.5 py-1 rounded-full text-xs font-black flex items-center gap-1.5 border transition-all ${
              hasAwardedStars
                ? "bg-amber-400/20 text-amber-300 border-amber-400/50 shadow-md shadow-amber-400/20"
                : "bg-white/10 text-white/50 border-white/15"
            }`}>
              <Award size={13} className={hasAwardedStars ? "text-amber-400" : ""} />
              <span>{hasAwardedStars ? "+5 ⭐ Đã nhận" : "+5 ⭐ Xem học"}</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scroll-area space-y-3 pt-2.5 pr-1">
            {/* Parent Tip Box */}
            {video.parentTip && (
              <div className="bg-amber-500/15 border border-amber-400/30 p-3 rounded-2xl">
                <div className="flex items-center justify-between gap-1 text-[11px] font-bold text-amber-300 mb-1">
                  <span className="flex items-center gap-1">
                    <HelpCircle size={13} />
                    Mẹo cho Ba Mẹ đồng hành cùng bé:
                  </span>
                </div>
                <p className="text-xs text-amber-100/90 leading-relaxed">
                  {video.parentTip}
                </p>
              </div>
            )}

            {/* Key Vocabulary Chips */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white/80 flex items-center gap-1">
                  <Sparkles size={14} className="text-yellow-400" />
                  Từ vựng bé học được qua video (Chạm để nghe):
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                {video.keyVocab.map((item, idx) => (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleSpeakWord(item.en)}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:bg-primary/30 border border-white/10 flex items-center justify-between text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">
                        {item.emoji || "✨"}
                      </span>
                      <div className="min-w-0">
                        <span className="font-bold text-yellow-300 text-sm block leading-none" style={{ fontFamily: "var(--font-heading)" }}>
                          {item.en}
                        </span>
                        <span className="text-xs text-white/80 mt-0.5 block truncate">
                          {item.vi}
                        </span>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 group-hover:text-white group-hover:bg-primary transition-colors shrink-0">
                      <Volume2 size={15} />
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Video Description */}
            <div className="pt-2 border-t border-white/10">
              <p className="text-xs text-white/70 leading-relaxed">
                {video.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
