"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, RotateCcw, Shuffle, Sparkles, Check, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { RecommendedItem } from "./VideoEndRecommendation";
import { playSFX } from "@/utils/soundEffects";

interface YouTubeKidsVideoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  recommendations: RecommendedItem[];
  onSelect: (id: string) => void;
  onRefresh: () => void;
  isAutoPlayNext?: boolean;
  onToggleAutoPlayNext?: () => void;
  onRandomSurprise?: () => void;
}

export default function YouTubeKidsVideoDrawer({
  isOpen,
  onClose,
  recommendations,
  onSelect,
  onRefresh,
  isAutoPlayNext = true,
  onToggleAutoPlayNext,
  onRandomSurprise,
}: YouTubeKidsVideoDrawerProps) {
  const scrollTrayRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    playSFX("tap");
    if (scrollTrayRef.current) {
      scrollTrayRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    playSFX("tap");
    if (scrollTrayRef.current) {
      scrollTrayRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 z-40 flex flex-col justify-end pointer-events-auto"
        >
          {/* Backdrop on top area to dismiss when tapping outside */}
          <div
            onClick={() => {
              playSFX("tap");
              onClose();
            }}
            className="flex-1 bg-black/40 backdrop-blur-[2px] cursor-pointer"
            title="Chạm để đóng gợi ý"
          />

          {/* Bottom Drawer Container (YouTube Kids style) */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="w-full bg-gradient-to-t from-slate-950 via-slate-900/98 to-slate-900/90 backdrop-blur-xl border-t border-white/20 p-3 sm:p-4 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.8)]"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-white/10">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xl sm:text-2xl animate-bounce">🎈</span>
                <div>
                  <h3
                    className="text-white text-xs sm:text-sm md:text-base font-extrabold flex items-center gap-1.5 flex-wrap"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    <span>Bé muốn xem bài nào tiếp theo?</span>
                    <span className="text-[10px] sm:text-[11px] font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                      {recommendations.length} video gợi ý
                    </span>
                  </h3>
                </div>
              </div>

              {/* Action Buttons: Shuffle & Surprise & Close */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {/* Random Surprise Button */}
                {onRandomSurprise && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => {
                      playSFX("star");
                      onRandomSurprise();
                    }}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-[10px] sm:text-xs font-black flex items-center gap-1 shadow-md shadow-amber-500/30 cursor-pointer"
                    title="Mở 1 bài ngẫu nhiên bất ngờ cho bé"
                  >
                    <Sparkles size={13} />
                    <span>Xem ngẫu nhiên 🎲</span>
                  </motion.button>
                )}

                {/* Refresh cards */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => {
                    playSFX("pop");
                    onRefresh();
                  }}
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-cyan-300 border border-cyan-400/30 text-[10px] sm:text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  title="Đổi danh sách video khác"
                >
                  <Shuffle size={12} />
                  <span>Đổi bài khác</span>
                </motion.button>

                {/* Autoplay Next Toggle */}
                {onToggleAutoPlayNext && (
                  <button
                    onClick={() => {
                      playSFX("tap");
                      onToggleAutoPlayNext();
                    }}
                    className={`hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${
                      isAutoPlayNext
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/30"
                        : "bg-white/10 text-white/60 border-white/15"
                    }`}
                    title="Tự động phát tiếp video kế tiếp khi xem xong"
                  >
                    <Zap size={11} fill={isAutoPlayNext ? "#34D399" : "none"} />
                    <span>Tự phát tiếp: {isAutoPlayNext ? "BẬT" : "TẮT"}</span>
                  </button>
                )}

                {/* Close Drawer Button */}
                <button
                  onClick={() => {
                    playSFX("tap");
                    onClose();
                  }}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors border border-white/20 cursor-pointer"
                  title="Đóng thanh gợi ý"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Horizontal Scrollable Video Cards Tray with Arrows */}
            <div className="relative group/tray">
              {/* Scroll Left Button */}
              <button
                onClick={scrollLeft}
                className="hidden sm:flex absolute -left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-900/90 text-white border border-white/30 items-center justify-center shadow-xl hover:bg-cyan-600 transition-all cursor-pointer opacity-75 hover:opacity-100"
                title="Xem video phía trước"
              >
                <ChevronLeft size={18} />
              </button>

              <div 
                ref={scrollTrayRef}
                className="flex items-center gap-2.5 sm:gap-3.5 overflow-x-auto no-scrollbar py-1 px-1 scroll-smooth"
              >
                {recommendations.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => {
                      playSFX("pop");
                      onSelect(item.id);
                    }}
                    className="group relative w-40 sm:w-48 md:w-52 shrink-0 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-cyan-400/80 rounded-2xl p-2 transition-all cursor-pointer shadow-lg hover:shadow-cyan-500/30"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 mb-1.5 shadow-inner">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                      {/* Duration badge */}
                      {item.duration && (
                        <span className="absolute bottom-1 right-1 text-[9px] font-bold text-white px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/20">
                          {item.duration}
                        </span>
                      )}

                      {/* Priority label for first card */}
                      {idx === 0 && (
                        <span className="absolute top-1 left-1 text-[8px] sm:text-[9px] font-black text-slate-950 px-1.5 py-0.5 rounded bg-amber-400 shadow-md">
                          Tiếp theo
                        </span>
                      )}

                      {/* Hover Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-cyan-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play size={14} fill="white" className="ml-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Channel & Title */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1 text-[10px] text-amber-300 font-bold mb-0.5">
                        <span>{item.avatarOrEmoji}</span>
                        <span className="truncate">{item.channelOrArtist}</span>
                      </div>
                      <h4
                        className="text-white text-[11px] sm:text-xs font-bold line-clamp-2 leading-snug group-hover:text-cyan-300 transition-colors"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {item.title}
                      </h4>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Scroll Right Button */}
              <button
                onClick={scrollRight}
                className="hidden sm:flex absolute -right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-900/90 text-white border border-white/30 items-center justify-center shadow-xl hover:bg-cyan-600 transition-all cursor-pointer opacity-75 hover:opacity-100"
                title="Xem thêm video tiếp theo"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
