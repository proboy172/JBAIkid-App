"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/layout/BackButton";
import BottomNav from "@/components/layout/BottomNav";
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
    ctx.shadowBlur = 10;
    ctx.shadowColor = currentItem.color;

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
    <div className="min-h-dvh flex flex-col">
      {/* Top Header Bar */}
      <div className="pt-3 sm:pt-5 pb-2 px-4 sm:px-6 relative z-10 max-w-4xl mx-auto w-full flex items-center justify-between">
        <BackButton label="Góc Chơi" />

        {/* Tab Switcher (Letters vs Numbers) */}
        <div className="bg-white/80 backdrop-blur-md p-1 rounded-2xl border border-gray-200 flex items-center gap-1 shadow-sm">
          <button
            onClick={() => {
              playSFX("tap");
              setTab("letters");
              setCurrentIndex(0);
            }}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
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
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              tab === "numbers"
                ? "bg-primary text-white shadow-md"
                : "text-text-light hover:text-text"
            }`}
          >
            Số Đếm (1-10)
          </button>
        </div>

        {/* Stars Counter */}
        <div className="glass-card px-3 py-1.5 text-sm font-bold flex items-center gap-1.5 shadow-sm border border-amber-200">
          <span>⭐</span>
          <span style={{ color: "var(--color-primary)", fontFamily: "var(--font-heading)" }}>
            {totalStars}
          </span>
        </div>
      </div>

      {/* Main Canvas & Tracing Stage */}
      <div className="flex-1 px-4 pb-24 lg:pb-16 flex flex-col items-center justify-center relative z-10 max-w-4xl mx-auto w-full">
        
        {/* Top Info Banner */}
        <div className="flex items-center justify-between w-full max-w-sm mb-2 px-1">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{currentItem.emoji}</span>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-800 leading-none" style={{ fontFamily: "var(--font-heading)" }}>
                {currentItem.word}
              </h2>
              <p className="text-xs text-text-light mt-0.5">{currentItem.title}</p>
            </div>
          </div>

          {/* Hear Phonics button */}
          <button
            onClick={speakCurrent}
            className="px-3 py-1.5 rounded-full bg-white text-primary border border-primary/30 shadow-sm hover:bg-primary/5 active:scale-95 text-xs font-bold flex items-center gap-1 transition-all"
            title="Nghe phát âm"
          >
            <Volume2 size={15} />
            <span>Nghe</span>
          </button>
        </div>

        {/* Canvas Card Container */}
        <div className="relative bg-white/95 rounded-3xl p-3 sm:p-4 shadow-xl border-4 border-amber-200 flex flex-col items-center">
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
            className="touch-none cursor-crosshair rounded-2xl bg-amber-50/40"
          />

          {/* Completed Overlay Celebration */}
          <AnimatePresence>
            {isCompleted && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="absolute inset-0 bg-white/85 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-4 text-center z-20"
              >
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-2 shadow-md">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-black text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>
                  🎉 Hoàn Thành Xuất Sắc!
                </h3>
                <p className="text-sm font-bold text-amber-600 mt-1">
                  Nhận thưởng +3 ⭐ sao lấp lánh!
                </p>

                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={resetCanvas}
                    className="px-4 py-2 rounded-2xl bg-gray-100 hover:bg-gray-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw size={14} />
                    <span>Tô lại</span>
                  </button>
                  <button
                    onClick={goNext}
                    className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-extrabold text-sm shadow-md shadow-primary/30 flex items-center gap-1.5 active:scale-95 transition-transform"
                  >
                    <span>Tiếp theo</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Canvas Toolbar Controls */}
        <div className="flex items-center justify-between w-full max-w-sm mt-3 px-2">
          <button
            onClick={goPrev}
            className="w-10 h-10 rounded-2xl bg-white shadow-md flex items-center justify-center text-slate-700 hover:bg-gray-50 active:scale-95 transition-all"
            title="Chữ trước"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Clear Button */}
          <button
            onClick={resetCanvas}
            className="px-3.5 py-1.5 rounded-2xl bg-white text-slate-700 border border-gray-200 shadow-sm hover:bg-gray-50 active:scale-95 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <RotateCcw size={14} />
            <span>Xóa vẽ lại</span>
          </button>

          {/* Progress Indicator */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-amber-600">{progress}%</span>
            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <button
            onClick={goNext}
            className="w-10 h-10 rounded-2xl bg-white shadow-md flex items-center justify-center text-slate-700 hover:bg-gray-50 active:scale-95 transition-all"
            title="Chữ tiếp theo"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Bottom Horizontal Scroller of All Characters */}
        <div className="w-full max-w-md mt-4 overflow-x-auto scroll-area pb-2">
          <div className="flex items-center gap-1.5 px-1">
            {items.map((item, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    playSFX("tap");
                    setCurrentIndex(idx);
                  }}
                  className={`w-9 h-9 rounded-xl font-bold text-sm shrink-0 flex items-center justify-center transition-all shadow-sm ${
                    isSelected
                      ? "bg-primary text-white scale-110 shadow-md shadow-primary/30"
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

      <BottomNav />
    </div>
  );
}
