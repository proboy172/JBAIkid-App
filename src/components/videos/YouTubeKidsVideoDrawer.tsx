"use client";

import { useRef, useEffect, useState } from "react";
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
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // Detect whether device has true hover support (mouse/precision pointer vs touch/iPad)
  const [supportsHover, setSupportsHover] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
      setSupportsHover(mq.matches);
      const updateHover = (e: MediaQueryListEvent) => setSupportsHover(e.matches);
      try {
        mq.addEventListener("change", updateHover);
        return () => mq.removeEventListener("change", updateHover);
      } catch {
        mq.addListener?.(updateHover);
        return () => mq.removeListener?.(updateHover);
      }
    }
  }, []);

  // Global pointer cleanup to guarantee hasDraggedRef never gets permanently stuck on iPad/touch
  useEffect(() => {
    if (!isOpen) return;
    const resetDrag = () => {
      isMouseDownRef.current = false;
      hasDraggedRef.current = false;
    };
    window.addEventListener("pointerup", resetDrag, { passive: true });
    window.addEventListener("pointercancel", resetDrag, { passive: true });
    window.addEventListener("touchend", resetDrag, { passive: true });
    window.addEventListener("touchcancel", resetDrag, { passive: true });
    return () => {
      window.removeEventListener("pointerup", resetDrag);
      window.removeEventListener("pointercancel", resetDrag);
      window.removeEventListener("touchend", resetDrag);
      window.removeEventListener("touchcancel", resetDrag);
    };
  }, [isOpen]);

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

  // Mouse drag-to-scroll handlers exclusively for desktop mouse (NOT touch devices)
  const handlePointerDown = (e: React.PointerEvent) => {
    // iPad and phones use native GPU-accelerated touch scrolling
    if (e.pointerType !== "mouse") {
      isMouseDownRef.current = false;
      hasDraggedRef.current = false;
      return;
    }
    if (!scrollTrayRef.current) return;
    isMouseDownRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - scrollTrayRef.current.offsetLeft;
    scrollLeftRef.current = scrollTrayRef.current.scrollLeft;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !isMouseDownRef.current || !scrollTrayRef.current) return;
    const x = e.pageX - scrollTrayRef.current.offsetLeft;
    const walk = x - startXRef.current;
    if (Math.abs(walk) > 8) {
      hasDraggedRef.current = true;
    }
    scrollTrayRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handlePointerUpOrLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") {
      isMouseDownRef.current = false;
      hasDraggedRef.current = false;
      return;
    }
    isMouseDownRef.current = false;
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 80);
  };

  // Touch tracking on cards for instant, zero-delay taps on iPad
  const cardTouchMapRef = useRef<{
    [key: string]: { startX: number; startY: number; startTime: number; moved: boolean };
  }>({});

  const handleCardTouchStart = (id: string, e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      cardTouchMapRef.current[id] = {
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        startTime: Date.now(),
        moved: false,
      };
    }
  };

  const handleCardTouchMove = (id: string, e: React.TouchEvent) => {
    const item = cardTouchMapRef.current[id];
    if (!item) return;
    const dx = Math.abs(e.touches[0].clientX - item.startX);
    const dy = Math.abs(e.touches[0].clientY - item.startY);
    // If finger moves more than 12px, user is scrolling the list, not tapping
    if (dx > 12 || dy > 12) {
      item.moved = true;
    }
  };

  const handleCardTouchEnd = (id: string, e: React.TouchEvent) => {
    const item = cardTouchMapRef.current[id];
    delete cardTouchMapRef.current[id];
    if (!item) return;

    const touch = e.changedTouches[0];
    const dx = Math.abs(touch.clientX - item.startX);
    const dy = Math.abs(touch.clientY - item.startY);
    const dt = Date.now() - item.startTime;

    // Clean intentional tap (< 12px jitter, < 600ms): trigger immediately and eliminate 300ms iOS delay
    if (!item.moved && dx < 12 && dy < 12 && dt < 600) {
      e.preventDefault(); // Prevents delayed synthetic click from firing later
      hasDraggedRef.current = false;
      playSFX("pop");
      onSelect(id);
    }
  };

  const handleCardClick = (id: string, e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    playSFX("pop");
    onSelect(id);
  };

  // Convert vertical mouse wheel into horizontal scroll for desktop
  useEffect(() => {
    const tray = scrollTrayRef.current;
    if (!tray || !isOpen) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        tray.scrollLeft += e.deltaY;
      }
    };

    tray.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      tray.removeEventListener("wheel", handleWheel);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="absolute inset-0 z-40 flex flex-col justify-end pointer-events-auto select-none"
        >
          {/* Backdrop on top area to dismiss when tapping outside */}
          <div
            onClick={() => {
              playSFX("tap");
              onClose();
            }}
            className="flex-1 bg-black/40 backdrop-blur-[2px] cursor-pointer"
            style={{ touchAction: "manipulation" }}
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
                    type="button"
                    whileHover={supportsHover ? { scale: 1.05 } : undefined}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => {
                      playSFX("star");
                      onRandomSurprise();
                    }}
                    style={{ touchAction: "manipulation" }}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-[10px] sm:text-xs font-black flex items-center gap-1 shadow-md shadow-amber-500/30 cursor-pointer active:scale-95 transition-transform"
                    title="Mở 1 bài ngẫu nhiên bất ngờ cho bé"
                  >
                    <Sparkles size={13} />
                    <span>Xem ngẫu nhiên 🎲</span>
                  </motion.button>
                )}

                {/* Refresh cards */}
                <motion.button
                  type="button"
                  whileHover={supportsHover ? { scale: 1.05 } : undefined}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => {
                    playSFX("pop");
                    onRefresh();
                  }}
                  style={{ touchAction: "manipulation" }}
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/30 text-cyan-300 border border-cyan-400/30 text-[10px] sm:text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer active:scale-95"
                  title="Đổi danh sách video khác"
                >
                  <Shuffle size={12} />
                  <span>Đổi bài khác</span>
                </motion.button>

                {/* Autoplay Next Toggle */}
                {onToggleAutoPlayNext && (
                  <button
                    type="button"
                    onClick={() => {
                      playSFX("tap");
                      onToggleAutoPlayNext();
                    }}
                    style={{ touchAction: "manipulation" }}
                    className={`hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors cursor-pointer active:scale-95 ${
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
                  type="button"
                  onClick={() => {
                    playSFX("tap");
                    onClose();
                  }}
                  style={{ touchAction: "manipulation" }}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/30 text-white flex items-center justify-center transition-colors border border-white/20 cursor-pointer active:scale-95"
                  title="Đóng thanh gợi ý"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Horizontal Scrollable Video Cards Tray with Arrows */}
            <div className="relative group/tray">
              {/* Scroll Left Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  scrollLeft();
                }}
                style={{ touchAction: "manipulation" }}
                className="flex absolute -left-1 sm:-left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/95 text-white border-2 border-white/40 items-center justify-center shadow-xl hover:bg-cyan-600 hover:border-cyan-300 active:scale-90 transition-all cursor-pointer"
                title="Xem video phía trước"
              >
                <ChevronLeft size={22} />
              </button>

              <div 
                ref={scrollTrayRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUpOrLeave}
                onPointerLeave={handlePointerUpOrLeave}
                onPointerCancel={handlePointerUpOrLeave}
                className="flex items-center gap-2.5 sm:gap-3.5 overflow-x-auto no-scrollbar py-1 px-1 touch-pan-x overscroll-x-contain select-none cursor-grab active:cursor-grabbing"
                style={{
                  WebkitOverflowScrolling: "touch",
                  scrollbarWidth: "none",
                  touchAction: "pan-x",
                }}
              >
                {recommendations.map((item, idx) => (
                  <motion.button
                    type="button"
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(idx * 0.02, 0.15) }}
                    whileHover={supportsHover ? { scale: 1.04, y: -2 } : undefined}
                    whileTap={{ scale: 0.94 }}
                    onClick={(e) => handleCardClick(item.id, e)}
                    onTouchStart={(e) => handleCardTouchStart(item.id, e)}
                    onTouchMove={(e) => handleCardTouchMove(item.id, e)}
                    onTouchEnd={(e) => handleCardTouchEnd(item.id, e)}
                    className="group relative w-40 sm:w-48 md:w-52 shrink-0 bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 hover:border-cyan-400/80 active:border-cyan-300 rounded-2xl p-2 transition-all cursor-pointer shadow-lg hover:shadow-cyan-500/30 text-left"
                    style={{ touchAction: "manipulation" }}
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 mb-1.5 shadow-inner pointer-events-none select-none">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none select-none"
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

                      {/* Hover Play Button (only shown when hover supported) */}
                      {supportsHover && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-cyan-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play size={14} fill="white" className="ml-0.5" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Channel & Title */}
                    <div className="min-w-0 pointer-events-none select-none">
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
                  </motion.button>
                ))}
              </div>

              {/* Scroll Right Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  scrollRight();
                }}
                style={{ touchAction: "manipulation" }}
                className="flex absolute -right-1 sm:-right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/95 text-white border-2 border-white/40 items-center justify-center shadow-xl hover:bg-cyan-600 hover:border-cyan-300 active:scale-90 transition-all cursor-pointer"
                title="Xem thêm video tiếp theo"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
