"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Shuffle, Sparkles, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { RecommendedItem } from "./VideoEndRecommendation";
import { playSFX } from "@/utils/soundEffects";
import { renderAvatar } from "@/utils/avatarHelper";

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
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Pointer position tracker for reliable tap selection
  const pointerStartPosRef = useRef<{ x: number; y: number; time: number } | null>(null);

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

  // Track scrolling state on container to avoid false clicks during inertia scrolling
  const handleScroll = useCallback(() => {
    isScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
      hasDraggedRef.current = false;
    }, 120);
  }, []);

  // Global pointer cleanup
  useEffect(() => {
    if (!isOpen) return;
    const resetDrag = () => {
      isMouseDownRef.current = false;
      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 50);
    };
    window.addEventListener("pointerup", resetDrag, { passive: true });
    window.addEventListener("pointercancel", resetDrag, { passive: true });
    window.addEventListener("touchend", resetDrag, { passive: true });
    return () => {
      window.removeEventListener("pointerup", resetDrag);
      window.removeEventListener("pointercancel", resetDrag);
      window.removeEventListener("touchend", resetDrag);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [isOpen]);

  const scrollLeft = () => {
    playSFX("tap");
    if (scrollTrayRef.current) {
      scrollTrayRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    playSFX("tap");
    if (scrollTrayRef.current) {
      scrollTrayRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  // Mouse drag-to-scroll handlers exclusively for desktop mouse
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
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
    if (e.pointerType !== "mouse") return;
    isMouseDownRef.current = false;
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 60);
  };

  // Card interaction handlers: zero-delay tap with distance check
  const handleCardPointerDown = (e: React.PointerEvent) => {
    pointerStartPosRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
    };
  };

  const handleCardPointerUp = (id: string, e: React.PointerEvent) => {
    if (!pointerStartPosRef.current) return;
    const dx = Math.abs(e.clientX - pointerStartPosRef.current.x);
    const dy = Math.abs(e.clientY - pointerStartPosRef.current.y);
    pointerStartPosRef.current = null;

    // If movement is larger than 12px or user was scrolling, treat as swipe/scroll, not tap
    if (dx > 12 || dy > 12 || hasDraggedRef.current || isScrollingRef.current) {
      return;
    }

    // Clean tap: Trigger video immediately
    playSFX("pop");
    try {
      if (navigator.vibrate) navigator.vibrate(10);
    } catch {}
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
          className="absolute inset-0 z-50 flex flex-col justify-end pointer-events-auto select-none"
        >
          {/* Top backdrop area: Tap to dismiss */}
          <div
            onClick={() => {
              playSFX("tap");
              onClose();
            }}
            className="flex-1 bg-black/50 backdrop-blur-[3px] cursor-pointer"
            style={{ touchAction: "manipulation" }}
            title="Chạm để đóng gợi ý"
          />

          {/* Bottom Drawer Container */}
          <motion.div
            initial={{ y: "100%", opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="w-full bg-gradient-to-t from-slate-950 via-slate-900/98 to-slate-900/95 backdrop-blur-2xl border-t-2 border-white/20 p-3 sm:p-4 rounded-t-3xl shadow-[0_-12px_45px_rgba(0,0,0,0.85)] max-h-[85vh] flex flex-col"
          >
            {/* Top Handle Bar */}
            <div
              onClick={() => {
                playSFX("tap");
                onClose();
              }}
              className="w-14 h-1.5 bg-white/40 hover:bg-white/60 rounded-full mx-auto -mt-1 mb-2.5 opacity-90 cursor-pointer transition-colors"
              title="Đóng gợi ý"
            />

            {/* Drawer Header Row */}
            <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xl sm:text-2xl animate-bounce">🎈</span>
                <div className="min-w-0">
                  <h3
                    className="text-white text-xs sm:text-sm md:text-base font-extrabold flex items-center gap-1.5 flex-wrap"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    <span>Bé muốn xem bài nào tiếp theo?</span>
                    <span className="text-[10px] sm:text-[11px] font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                      {recommendations.length} gợi ý
                    </span>
                  </h3>
                </div>
              </div>

              {/* Action Buttons: Shuffle, Random, Autoplay, Close */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {/* Random Surprise Button */}
                {onRandomSurprise && (
                  <button
                    type="button"
                    onClick={() => {
                      playSFX("star");
                      onRandomSurprise();
                    }}
                    style={{ touchAction: "manipulation" }}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 text-[10px] sm:text-xs font-black flex items-center gap-1 shadow-md shadow-amber-500/30 cursor-pointer active:scale-95 transition-all"
                    title="Mở 1 bài ngẫu nhiên bất ngờ cho bé"
                  >
                    <Sparkles size={13} />
                    <span>Ngẫu nhiên 🎲</span>
                  </button>
                )}

                {/* Refresh cards */}
                <button
                  type="button"
                  onClick={() => {
                    playSFX("pop");
                    onRefresh();
                  }}
                  style={{ touchAction: "manipulation" }}
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/30 text-cyan-300 border border-cyan-400/30 text-[10px] sm:text-xs font-bold flex items-center gap-1 transition-all cursor-pointer active:scale-95"
                  title="Đổi danh sách video khác"
                >
                  <Shuffle size={12} />
                  <span>Đổi bài khác</span>
                </button>

                {/* Autoplay Next Toggle */}
                {onToggleAutoPlayNext && (
                  <button
                    type="button"
                    onClick={() => {
                      playSFX("tap");
                      onToggleAutoPlayNext();
                    }}
                    style={{ touchAction: "manipulation" }}
                    className={`hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all cursor-pointer active:scale-95 ${
                      isAutoPlayNext
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/30"
                        : "bg-white/10 text-white/60 border-white/15"
                    }`}
                    title="Tự động phát tiếp video kế tiếp khi xem xong"
                  >
                    <Zap size={11} fill={isAutoPlayNext ? "#34D399" : "none"} />
                    <span>Tự phát: {isAutoPlayNext ? "BẬT" : "TẮT"}</span>
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
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 hover:bg-white/30 active:bg-white/40 text-white flex items-center justify-center transition-all border border-white/30 cursor-pointer active:scale-90 shadow-md"
                  title="Đóng thanh gợi ý"
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Horizontal Scrollable Video Cards Tray with Left/Right Arrow Navigation */}
            <div className="relative group/tray flex-1 min-h-0">
              {/* Scroll Left Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  scrollLeft();
                }}
                style={{ touchAction: "manipulation" }}
                className="flex absolute -left-1 sm:-left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/95 hover:bg-cyan-600 active:bg-cyan-500 text-white border-2 border-white/40 hover:border-cyan-300 items-center justify-center shadow-2xl active:scale-90 transition-all cursor-pointer"
                title="Xem video phía trước"
              >
                <ChevronLeft size={22} strokeWidth={2.5} />
              </button>

              <div
                ref={scrollTrayRef}
                onScroll={handleScroll}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUpOrLeave}
                onPointerLeave={handlePointerUpOrLeave}
                onPointerCancel={handlePointerUpOrLeave}
                className="flex items-center gap-2.5 sm:gap-3.5 overflow-x-auto no-scrollbar py-2 px-1 touch-pan-x overscroll-x-contain select-none"
                style={{
                  WebkitOverflowScrolling: "touch",
                  scrollbarWidth: "none",
                  touchAction: "pan-x",
                }}
              >
                {recommendations.map((item, idx) => (
                  <button
                    type="button"
                    key={item.id}
                    onPointerDown={handleCardPointerDown}
                    onPointerUp={(e) => handleCardPointerUp(item.id, e)}
                    onClick={(e) => {
                      if (hasDraggedRef.current || isScrollingRef.current) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                      }
                      playSFX("pop");
                      onSelect(item.id);
                    }}
                    style={{ touchAction: "manipulation" }}
                    className="group relative w-38 sm:w-48 md:w-52 shrink-0 bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/20 hover:border-cyan-400 active:border-cyan-300 rounded-2xl p-2 transition-all cursor-pointer shadow-lg hover:shadow-cyan-500/30 text-left active:scale-95"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 mb-1.5 shadow-inner pointer-events-none select-none">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        draggable={false}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none select-none"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                      {/* Duration badge */}
                      {item.duration && (
                        <span className="absolute bottom-1 right-1 text-[9px] font-bold text-white px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/20 pointer-events-none">
                          {item.duration}
                        </span>
                      )}

                      {/* Priority label for first card */}
                      {idx === 0 && (
                        <span className="absolute top-1 left-1 text-[8px] sm:text-[9px] font-black text-slate-950 px-1.5 py-0.5 rounded bg-amber-400 shadow-md pointer-events-none">
                          Tiếp theo
                        </span>
                      )}

                      {/* Play Icon Badge */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="w-9 h-9 rounded-full bg-cyan-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play size={16} fill="white" className="ml-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Channel & Title */}
                    <div className="min-w-0 pointer-events-none select-none">
                      <div className="flex items-center gap-1 text-[10px] text-amber-300 font-bold mb-0.5">
                        {renderAvatar(item.avatarOrEmoji, {
                          alt: item.channelOrArtist,
                          sizeClass: "w-4 h-4",
                          textClass: "text-sm",
                        })}
                        <span className="truncate">{item.channelOrArtist}</span>
                      </div>
                      <h4
                        className="text-white text-[11px] sm:text-xs font-bold line-clamp-2 leading-snug group-hover:text-cyan-300 transition-colors"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {item.title}
                      </h4>
                    </div>
                  </button>
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
                className="flex absolute -right-1 sm:-right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/95 hover:bg-cyan-600 active:bg-cyan-500 text-white border-2 border-white/40 hover:border-cyan-300 items-center justify-center shadow-2xl active:scale-90 transition-all cursor-pointer"
                title="Xem thêm video tiếp theo"
              >
                <ChevronRight size={22} strokeWidth={2.5} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
