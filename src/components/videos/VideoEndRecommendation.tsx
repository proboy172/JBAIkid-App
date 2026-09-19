"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, X, Sparkles, Pause, ArrowRight } from "lucide-react";
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
  autoNextSeconds = 12,
}: VideoEndRecommendationProps) {
  const [countdown, setCountdown] = useState(autoNextSeconds);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Confetti burst on appearance
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
    if (isPaused || recommendations.length === 0) return;

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          onSelect(recommendations[0].id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, recommendations, onSelect]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 z-40 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between p-3 sm:p-5 overflow-y-auto"
    >
      {/* Top Banner: Celebration & Star Award */}
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-xl shrink-0 shadow-lg shadow-amber-400/20">
            ⭐
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-extrabold text-amber-300 flex items-center gap-1">
                <Sparkles size={14} className="text-amber-400" />
                Bé giỏi quá! Hoàn thành bài học
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                +{starsEarned} ⭐
              </span>
            </div>
            <p className="text-white/60 text-xs truncate max-w-md hidden sm:block">
              Vừa xem xong: <span className="text-white font-medium">{currentTitle}</span>
            </p>
          </div>
        </div>

        {/* Action Controls: Refresh Shuffle & Replay & Close */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {onRefresh && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playSFX("pop");
                onRefresh();
              }}
              className="px-2.5 sm:px-3 py-1.5 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/30 text-[11px] sm:text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
              title="Đổi bài ngẫu nhiên khác trong kho"
            >
              <span>🎲 Đổi gợi ý</span>
            </motion.button>
          )}

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playSFX("tap");
              onReplay();
            }}
            className="px-2.5 sm:px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/20 text-[11px] sm:text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Xem lại video từ đầu"
          >
            <RotateCcw size={13} />
            <span className="hidden sm:inline">Xem lại</span>
          </motion.button>

          <button
            onClick={() => {
              playSFX("pop");
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/15 transition-colors cursor-pointer"
            title="Đóng"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Center: Curated Recommendations Grid from JBAIkid Library (4-6 cards like YouTube Kids) */}
      <div className="my-auto py-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg">🎬</span>
            <h3
              className="text-white text-xs sm:text-sm font-extrabold tracking-wide"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Bé muốn xem tiếp bài nào nè? (Chọn để xem ngay)
            </h3>
          </div>

          {/* Auto-Next Countdown Badge */}
          {recommendations.length > 0 && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-white/70 text-[11px] hidden sm:inline">
                {isPaused ? "Tạm dừng tự động" : `Tự phát bài đầu sau ${countdown}s`}
              </span>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-white/80 text-[10px] sm:text-[11px] font-bold flex items-center gap-1 border border-white/15 cursor-pointer"
                title={isPaused ? "Bật tự động chuyển bài" : "Dừng tự động chuyển bài"}
              >
                {isPaused ? <Play size={10} /> : <Pause size={10} />}
                <span>{isPaused ? "Bật lại" : "Dừng"}</span>
              </button>
            </div>
          )}
        </div>

        {/* 6 Curated / Randomized Recommendation Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          {recommendations.slice(0, 6).map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                playSFX("tap");
                onSelect(item.id);
              }}
              className="group relative bg-white/10 hover:bg-white/15 border border-white/20 hover:border-cyan-400/60 rounded-xl sm:rounded-2xl p-2 sm:p-2.5 flex flex-col justify-between cursor-pointer transition-all shadow-md hover:shadow-cyan-500/20"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video rounded-lg sm:rounded-xl overflow-hidden bg-slate-900 mb-1.5 shadow-inner">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Duration Badge */}
                {item.duration && (
                  <span className="absolute bottom-1.5 right-1.5 text-[9px] font-bold text-white px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/20">
                    {item.duration}
                  </span>
                )}

                {/* Priority Label for first item */}
                {idx === 0 && (
                  <span className="absolute top-1.5 left-1.5 text-[9px] font-black text-slate-950 px-1.5 py-0.5 rounded bg-amber-400 shadow-md">
                    Tiếp theo
                  </span>
                )}

                {/* Hover Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-9 h-9 rounded-full bg-cyan-500 text-white flex items-center justify-center shadow-xl scale-95 group-hover:scale-110 transition-transform">
                    <Play size={16} fill="white" className="ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Card Meta & Title */}
              <div className="min-w-0">
                <div className="flex items-center gap-1 mb-0.5 text-[10px] sm:text-[11px] text-amber-300 font-bold">
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

              {/* Bottom Card Action */}
              <div className="mt-1.5 pt-1.5 border-t border-white/10 flex items-center justify-between text-[10px]">
                <span className="text-white/60 text-[9px] sm:text-[10px] truncate max-w-[65%]">
                  {item.categoryName || item.badge || "Bài học mầm non"}
                </span>
                <span className="text-cyan-400 font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform shrink-0">
                  <span>Xem</span>
                  <ArrowRight size={10} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Bar: Quick Replay or Exit */}
      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
        <button
          onClick={() => {
            playSFX("tap");
            onReplay();
          }}
          className="text-white/70 hover:text-white flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
        >
          <RotateCcw size={13} />
          <span>Xem lại video vừa rồi</span>
        </button>

        <button
          onClick={() => {
            playSFX("tap");
            onClose();
          }}
          className="text-white/70 hover:text-white flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
        >
          <span>Về trang chủ</span>
          <span>›</span>
        </button>
      </div>
    </motion.div>
  );
}
