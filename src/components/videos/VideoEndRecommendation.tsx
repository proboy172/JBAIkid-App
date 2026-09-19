"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, X, Sparkles, Pause, ArrowRight, Shuffle, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import { playSFX } from "@/utils/soundEffects";

export interface RecommendedItem {
  id: string;
  title: string;
  thumbnail: string;
  channelOrArtist: string;
  avatarOrEmoji: string;
  badge?: string;
  duration?: string;
  categoryName?: string;
}

interface VideoEndRecommendationProps {
  currentTitle: string;
  starsEarned?: number;
  recommendations: RecommendedItem[];
  onSelect: (id: string) => void;
  onReplay: () => void;
  onClose: () => void;
  onRefresh?: () => void;
  autoNextSeconds?: number;
}

export default function VideoEndRecommendation({
  currentTitle,
  starsEarned = 5,
  recommendations,
  onSelect,
  onReplay,
  onClose,
  onRefresh,
  autoNextSeconds = 8,
}: VideoEndRecommendationProps) {
  const [countdown, setCountdown] = useState(autoNextSeconds);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const heroItem = recommendations[0];
  const otherItems = recommendations.slice(1, 6);

  // Confetti burst on appearance
  useEffect(() => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.55 },
        colors: ["#FF6B9D", "#38BDF8", "#FBBF24", "#34D399", "#A855F7"],
      });
      playSFX("cheer");
    } catch {
      // Ignore if confetti context unavailable
    }
  }, []);

  // Countdown for auto-next video
  useEffect(() => {
    if (isPaused || !heroItem) return;

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          playSFX("correct");
          onSelect(heroItem.id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, heroItem, onSelect]);

  // Circumference for circular SVG progress ring (radius = 34)
  const circleRadius = 34;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = isPaused
    ? circleCircumference
    : circleCircumference * (1 - countdown / autoNextSeconds);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.28 }}
      className="absolute inset-0 z-40 bg-slate-950/95 backdrop-blur-2xl flex flex-col justify-between p-3 sm:p-5 overflow-y-auto select-none"
    >
      {/* Top Banner: Celebration & Star Award */}
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-2.5 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <motion.div
            initial={{ rotate: -15, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-amber-300 flex items-center justify-center text-xl sm:text-2xl shrink-0 shadow-lg shadow-amber-400/30"
          >
            ⭐
          </motion.div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs sm:text-sm md:text-base font-extrabold text-amber-300 flex items-center gap-1">
                <Sparkles size={16} className="text-amber-400 animate-spin" style={{ animationDuration: "3s" }} />
                Bé giỏi quá! Hoàn thành bài học rồi nè 🎉
              </span>
              <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 shadow-sm">
                +{starsEarned} ⭐
              </span>
            </div>
            <p className="text-white/60 text-xs truncate max-w-md hidden sm:block">
              Vừa xem xong: <span className="text-white font-medium">{currentTitle}</span>
            </p>
          </div>
        </div>

        {/* Action Controls: Shuffle & Replay & Close */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {onRefresh && (
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                playSFX("pop");
                onRefresh();
              }}
              className="px-2.5 sm:px-3 py-1.5 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/30 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Đổi gợi ý video ngẫu nhiên khác trong kho"
            >
              <Shuffle size={13} />
              <span className="hidden sm:inline">Đổi gợi ý</span>
            </motion.button>
          )}

          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => {
              playSFX("tap");
              onReplay();
            }}
            className="px-2.5 sm:px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Xem lại video vừa rồi"
          >
            <RotateCcw size={13} />
            <span className="hidden sm:inline">Xem lại</span>
          </motion.button>

          <button
            onClick={() => {
              playSFX("pop");
              onClose();
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-colors cursor-pointer"
            title="Đóng"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Center Hero Next Video Card + Circular Countdown (True YouTube Kids Experience) */}
      <div className="my-auto py-2.5 max-w-4xl mx-auto w-full">
        {heroItem && (
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 border-2 border-cyan-400/40 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-[0_10px_35px_rgba(6,182,212,0.18)] mb-3 sm:mb-4"
          >
            <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-5">
              {/* Left: Next Video Thumbnail with Circular Ring Overlay */}
              <div
                onClick={() => {
                  playSFX("correct");
                  onSelect(heroItem.id);
                }}
                className="relative w-full sm:w-64 aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950 shrink-0 cursor-pointer group shadow-xl border border-white/20"
              >
                <img
                  src={heroItem.thumbnail}
                  alt={heroItem.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Priority Badge */}
                <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] sm:text-[11px] font-black shadow-md">
                  <span>⚡ Tiếp theo</span>
                </div>

                {/* Duration Badge */}
                {heroItem.duration && (
                  <span className="absolute bottom-2 right-2 text-[10px] font-bold text-white px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/20">
                    {heroItem.duration}
                  </span>
                )}

                {/* Center Radial SVG Countdown Ring */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                    {/* SVG Ring */}
                    <svg className="w-full h-full -rotate-90 drop-shadow-md" viewBox="0 0 80 80">
                      <circle
                        cx="40"
                        cy="40"
                        r={circleRadius}
                        className="stroke-white/25"
                        strokeWidth="5"
                        fill="transparent"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r={circleRadius}
                        className="stroke-cyan-400 transition-all duration-1000 ease-linear"
                        strokeWidth="5"
                        strokeDasharray={circleCircumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>

                    {/* Center Action Button Inside Ring */}
                    <motion.div
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.92 }}
                      className="absolute inset-0 m-auto w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-cyan-500/50 group-hover:bg-cyan-400"
                    >
                      <Play size={20} fill="white" className="ml-0.5" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Right: Info & Large One-Touch Watch Buttons */}
              <div className="flex-1 min-w-0 text-center sm:text-left flex flex-col justify-between w-full">
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-1 text-xs text-amber-300 font-bold">
                    <span className="text-base">{heroItem.avatarOrEmoji}</span>
                    <span className="truncate">{heroItem.channelOrArtist}</span>
                    <span className="text-white/40">•</span>
                    <span className="text-white/70 text-[11px] truncate">
                      {heroItem.categoryName || "Bài học mầm non"}
                    </span>
                  </div>

                  <h3
                    onClick={() => {
                      playSFX("correct");
                      onSelect(heroItem.id);
                    }}
                    className="text-white text-base sm:text-lg md:text-xl font-black leading-snug line-clamp-2 hover:text-cyan-300 transition-colors cursor-pointer"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {heroItem.title}
                  </h3>

                  <p className="text-white/70 text-xs sm:text-sm mt-1">
                    {isPaused
                      ? "Đã tạm dừng tự phát. Bé chạm nút để xem ngay nhé!"
                      : `Tự động phát sau ${countdown} giây nữa nè...`}
                  </p>
                </div>

                {/* Chunky Action Buttons */}
                <div className="flex items-center justify-center sm:justify-start gap-2.5 mt-3 sm:mt-4 flex-wrap">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => {
                      playSFX("correct");
                      onSelect(heroItem.id);
                    }}
                    className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-cyan-500/40 border border-cyan-300/40 cursor-pointer"
                  >
                    <Play size={18} fill="white" />
                    <span>Xem Ngay {!isPaused && `(${countdown}s)`}</span>
                  </motion.button>

                  <button
                    onClick={() => {
                      playSFX("tap");
                      setIsPaused(!isPaused);
                    }}
                    className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white/90 text-xs sm:text-sm font-bold flex items-center gap-1.5 border border-white/20 transition-all cursor-pointer"
                    title={isPaused ? "Bật lại tự động phát" : "Dừng tự động phát"}
                  >
                    {isPaused ? <Play size={14} fill="currentColor" /> : <Pause size={14} fill="currentColor" />}
                    <span>{isPaused ? "Bật tự phát" : "Dừng tự phát"}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Other Recommendations Discovery Row */}
        {otherItems.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-bold text-white/80 flex items-center gap-1.5">
                <span>🎈</span>
                <span>Hoặc bé chọn xem các video thú vị khác:</span>
              </span>
              <span className="text-[11px] text-white/50 hidden sm:inline">Chạm vào để xem ngay</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-2.5">
              {otherItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    playSFX("tap");
                    onSelect(item.id);
                  }}
                  className="group relative bg-white/10 hover:bg-white/15 border border-white/15 hover:border-cyan-400/60 rounded-xl sm:rounded-2xl p-2 flex flex-col justify-between cursor-pointer transition-all shadow-md hover:shadow-cyan-500/20"
                >
                  <div className="relative aspect-video rounded-lg sm:rounded-xl overflow-hidden bg-slate-900 mb-1.5 shadow-inner">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

                    {item.duration && (
                      <span className="absolute bottom-1 right-1 text-[9px] font-bold text-white px-1 py-0.2 rounded bg-black/70 backdrop-blur-md border border-white/20">
                        {item.duration}
                      </span>
                    )}

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center shadow-lg">
                        <Play size={14} fill="white" className="ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1 mb-0.5 text-[10px] text-amber-300 font-bold">
                      <span>{item.avatarOrEmoji}</span>
                      <span className="truncate">{item.channelOrArtist}</span>
                    </div>
                    <h4
                      className="text-white text-[11px] sm:text-xs font-bold leading-tight line-clamp-2 group-hover:text-cyan-300 transition-colors"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {item.title}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bar: Replay or Exit */}
      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs shrink-0">
        <button
          onClick={() => {
            playSFX("tap");
            onReplay();
          }}
          className="text-white/70 hover:text-white flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
        >
          <RotateCcw size={13} />
          <span>Xem lại video vừa rồi</span>
        </button>

        <button
          onClick={() => {
            playSFX("tap");
            onClose();
          }}
          className="text-white/70 hover:text-white flex items-center gap-1 py-1 px-2.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
        >
          <span>Về trang chủ</span>
          <span>›</span>
        </button>
      </div>
    </motion.div>
  );
}

