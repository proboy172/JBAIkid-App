"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/layout/BackButton";
import { tracingLetters, tracingNumbers, TracingItem } from "@/data/tracingData";
import { useSpeech } from "@/hooks/useSpeech";
import { useAppStore } from "@/stores/appStore";
import { playSFX, speakCheer } from "@/utils/soundEffects";
import { Volume2, RotateCcw, ChevronRight, ChevronLeft, Sparkles, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

export default function TracingPage() {
  const { addStars, totalStars } = useAppStore();
  const { speak } = useSpeech();
  const [tab, setTab] = useState<"letters" | "numbers">("letters");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const items: TracingItem[] = tab === "letters" ? tracingLetters : tracingNumbers;
  const currentItem = items[currentIndex] || items[0];

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawnPointsRef = useRef<{ x: number; y: number }[]>([]);

  // Speak phonics on letter change
  const speakCurrent = useCallback(() => {
    playSFX("tap");
    speak(currentItem.phonics, "en-US", 0.85);
  }, [currentItem, speak]);

  useEffect(() => {
    speakCurrent();
    resetCanvas();
  }, [currentIndex, tab, speakCurrent]);

  const resetCanvas = () => {
    drawnPointsRef.current = [];
    setProgress(0);
    setIsCompleted(false);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLetterGuide(ctx, canvas.width, canvas.height);
  };

  // Draw faint guide outline of letter
  const drawLetterGuide = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.save();

    // Draw background character silhouette
    ctx.font = `bold ${Math.round(height * 0.72)}px var(--font-heading), sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(226, 232, 240, 0.55)";
    ctx.fillText(currentItem.char, width / 2, height / 2 + 10);

    // Draw dashed outline strokes
    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "rgba(203, 213, 225, 0.7)";
    ctx.setLineDash([8, 8]);

    for (const stroke of currentItem.strokes) {
      if (stroke.points.length < 2) continue;
      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x * width, stroke.points[0].y * height);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x * width, stroke.points[i].y * height);
      }
      ctx.stroke();
    }

    // Draw start dots
    ctx.setLineDash([]);
    for (let i = 0; i < currentItem.strokes.length; i++) {
      const startPt = currentItem.strokes[i].points[0];
      if (!startPt) continue;

      const px = startPt.x * width;
      const py = startPt.y * height;

      // Start circle
      ctx.beginPath();
      ctx.arc(px, py, 14, 0, Math.PI * 2);
      ctx.fillStyle = currentItem.color;
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#FFFFFF";
      ctx.stroke();

      // Number indicator
      ctx.font = "bold 12px sans-serif";
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText((i + 1).toString(), px, py);
    }

    ctx.restore();
  };

  // Check progress by comparing drawn points with target strokes
  const checkProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = canvas.width;
    const height = canvas.height;

    // Collect all checkpoints from currentItem
    const checkpoints: { x: number; y: number }[] = [];
    for (const stroke of currentItem.strokes) {
      for (const pt of stroke.points) {
        checkpoints.push({ x: pt.x * width, y: pt.y * height });
      }
    }

    if (checkpoints.length === 0) return;

    // Distance threshold in pixels
    const threshold = 38;
    let hitCount = 0;

    for (const cp of checkpoints) {
      const isHit = drawnPointsRef.current.some((dp) => {
        const dx = dp.x - cp.x;
        const dy = dp.y - cp.y;
        return Math.sqrt(dx * dx + dy * dy) <= threshold;
      });
      if (isHit) hitCount++;
    }

    const pct = Math.min(100, Math.round((hitCount / checkpoints.length) * 100));
    setProgress(pct);

    if (pct >= 75 && !isCompleted) {
      setIsCompleted(true);
      playSFX("correct");
      addStars(3);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });
      speakCheer("Bé tô chữ đẹp tuyệt vời!");
    }
  };

  // Canvas drawing handlers
  const getCanvasCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    let clientX = 0;
    let clientY = 0;

    if ("touches" in e) {
      if (e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const handleStartDraw = (e: React.MouseEvent | React.TouchEvent) => {
    if (isCompleted) return;
    setIsDrawing(true);
    const coords = getCanvasCoords(e);
    drawnPointsRef.current.push(coords);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.arc(coords.x, coords.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = currentItem.color;
    ctx.fill();
  };

  const handleDraw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || isCompleted) return;
    const coords = getCanvasCoords(e);
    drawnPointsRef.current.push(coords);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineWidth = 20;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = currentItem.color;

    const points = drawnPointsRef.current;
    if (points.length >= 2) {
      const prev = points[points.length - 2];
      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    }
  };

  const handleEndDraw = () => {
    setIsDrawing(false);
    checkProgress();
  };

  const goNext = () => {
    playSFX("tap");
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const goPrev = () => {
    playSFX("tap");
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(items.length - 1);
    }
  };

  return (
    <div className="h-dvh max-h-dvh w-full overflow-hidden flex flex-col justify-between select-none">
      {/* Top Header Bar */}
      <div className="pt-2 sm:pt-3 pb-1 px-3 sm:px-6 relative z-10 max-w-4xl mx-auto w-full flex items-center justify-between shrink-0">
        <BackButton label="Góc Chơi" />

        {/* Tab Switcher (Letters vs Numbers) */}
        <div className="bg-white/80 backdrop-blur-md p-1 rounded-2xl border border-gray-200 flex items-center gap-1 shadow-sm">
          <button
            onClick={() => {
              playSFX("tap");
              setTab("letters");
              setCurrentIndex(0);
            }}
            className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              tab === "letters"
                ? "bg-primary text-white shadow-md"
                : "text-text-light hover:text-text"
            }`}
          >
            Chữ Cái (A-Z)
          </button>
          <button
            onClick={() => {
              playSFX("tap");
              setTab("numbers");
              setCurrentIndex(0);
            }}
            className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              tab === "numbers"
                ? "bg-primary text-white shadow-md"
                : "text-text-light hover:text-text"
            }`}
          >
            Số Đếm (1-10)
          </button>
        </div>

        {/* Stars Counter */}
        <div className="glass-card px-2.5 sm:px-3 py-1 text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm border border-amber-200">
          <span>⭐</span>
          <span style={{ color: "var(--color-primary)", fontFamily: "var(--font-heading)" }}>
            {totalStars}
          </span>
        </div>
      </div>

      {/* Main Canvas & Tracing Stage */}
      <div className="flex-1 px-3 sm:px-4 py-1 overflow-hidden flex flex-col landscape:flex-row items-center justify-center relative z-10 max-w-4xl mx-auto w-full gap-2 sm:gap-6">
        
        {/* Canvas Card Container (Left side in landscape) */}
        <div className="relative bg-white/95 rounded-3xl p-2 sm:p-3 shadow-xl border-3 border-amber-200 flex flex-col items-center shrink-0">
          <canvas
            ref={canvasRef}
            width={340}
            height={340}
            onMouseDown={handleStartDraw}
            onMouseMove={handleDraw}
            onMouseUp={handleEndDraw}
            onTouchStart={handleStartDraw}
            onTouchMove={handleDraw}
            onTouchEnd={handleEndDraw}
            className="touch-none cursor-crosshair rounded-2xl bg-amber-50/40 w-[min(280px,40vh)] h-[min(280px,40vh)] landscape:w-[min(260px,68vh)] landscape:h-[min(260px,68vh)]"
          />

          {/* Completed Overlay Celebration */}
          <AnimatePresence>
            {isCompleted && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-3 text-center z-20"
              >
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-1.5 shadow-md">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>
                  🎉 Hoàn Thành Xuất Sắc!
                </h3>
                <p className="text-xs sm:text-sm font-bold text-amber-600 mt-0.5">
                  Nhận thưởng +3 ⭐ sao lấp lánh!
                </p>

                <div className="flex items-center gap-2.5 mt-2.5">
                  <button
                    onClick={resetCanvas}
                    className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-slate-700 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <RotateCcw size={12} />
                    <span>Tô lại</span>
                  </button>
                  <button
                    onClick={goNext}
                    className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-extrabold text-xs shadow-md shadow-primary/30 flex items-center gap-1 active:scale-95 transition-transform cursor-pointer"
                  >
                    <span>Tiếp theo</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Info & Controls (Right side in landscape, stacked in portrait) */}
        <div className="flex flex-col items-center justify-center w-full max-w-sm landscape:max-w-xs shrink-0 gap-1.5 sm:gap-2">
          
          {/* Top Info Banner */}
          <div className="flex items-center justify-between w-full px-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl">{currentItem.emoji}</span>
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-800 leading-none" style={{ fontFamily: "var(--font-heading)" }}>
                  {currentItem.word}
                </h2>
                <p className="text-[11px] text-text-light mt-0.5">{currentItem.title}</p>
              </div>
            </div>

            {/* Hear Phonics button */}
            <button
              onClick={speakCurrent}
              className="px-2.5 py-1 rounded-full bg-white text-primary border border-primary/30 shadow-sm hover:bg-primary/5 active:scale-95 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
              title="Nghe phát âm"
            >
              <Volume2 size={14} />
              <span>Nghe</span>
            </button>
          </div>

          {/* Canvas Toolbar Controls */}
          <div className="flex items-center justify-between w-full px-1">
            <button
              onClick={goPrev}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white shadow-md flex items-center justify-center text-slate-700 hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
              title="Chữ trước"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Clear Button */}
            <button
              onClick={resetCanvas}
              className="px-3 py-1 rounded-xl bg-white text-slate-700 border border-gray-200 shadow-sm hover:bg-gray-50 active:scale-95 text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Xóa vẽ lại</span>
            </button>

            {/* Progress Indicator */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-amber-600">{progress}%</span>
              <div className="w-14 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <button
              onClick={goNext}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white shadow-md flex items-center justify-center text-slate-700 hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
              title="Chữ tiếp theo"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Character Scroller */}
          <div className="w-full overflow-x-auto scroll-area py-1">
            <div className="flex items-center gap-1 px-1">
              {items.map((item, idx) => {
                const isSelected = idx === currentIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      playSFX("tap");
                      setCurrentIndex(idx);
                    }}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg font-bold text-xs shrink-0 flex items-center justify-center transition-all shadow-sm cursor-pointer ${
                      isSelected
                        ? "bg-primary text-white scale-105 shadow-md shadow-primary/30"
                        : "bg-white/80 text-slate-700 hover:bg-white"
                    }`}
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.char}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Safe bottom spacer */}
      <div className="h-1 sm:h-2 shrink-0" />
    </div>
  );
}
