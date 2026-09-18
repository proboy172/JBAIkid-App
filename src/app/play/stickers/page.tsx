"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, ArrowLeft, Lock, Check, Sparkles, 
  Palette, BookMarked, RotateCw, ZoomIn, ZoomOut, 
  Trash2, RefreshCw, Download, Dices
} from "lucide-react";
import Link from "next/link";
import { useAppStore } from "@/stores/appStore";
import { STICKERS, Sticker } from "@/data/stickers";
import { playSFX } from "@/utils/soundEffects";
import { ConfettiOverlay } from "@/components/shared/ConfettiOverlay";
import { useConfetti } from "@/hooks/useConfetti";

// Canvas background themes
interface Theme {
  id: string;
  name: string;
  emoji: string;
  bgGradient: string;
  decorations: string[];
}

const THEMES: Theme[] = [
  {
    id: "park",
    name: "Công viên xanh",
    emoji: "🏞️",
    bgGradient: "from-sky-300 via-emerald-100 to-emerald-300",
    decorations: ["☀️", "☁️", "🌳", "🌸", "🦋"],
  },
  {
    id: "space",
    name: "Vũ trụ ngân hà",
    emoji: "🌌",
    bgGradient: "from-slate-950 via-indigo-950 to-purple-950",
    decorations: ["⭐", "✨", "🪐", "🌙", "☄️"],
  },
  {
    id: "beach",
    name: "Bãi biển vàng",
    emoji: "🏖️",
    bgGradient: "from-amber-200 via-sky-200 to-cyan-300",
    decorations: ["🌞", "🌴", "🐚", "🦀", "🌊"],
  },
  {
    id: "fairy",
    name: "Lâu đài phép thuật",
    emoji: "🏰",
    bgGradient: "from-pink-300 via-purple-200 to-violet-300",
    decorations: ["✨", "🌈", "🏰", "🦄", "💫"],
  },
  {
    id: "ocean",
    name: "Đáy đại dương",
    emoji: "🌊",
    bgGradient: "from-cyan-400 via-blue-500 to-indigo-700",
    decorations: ["🫧", "🪸", "🐠", "🐡", "🐙"],
  },
];

interface PlacedSticker {
  id: string;
  stickerId: string;
  emoji: string;
  name: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

const CANVAS_STORAGE_KEY = "jbkid-sticker-canvas-scene";

export default function StickerBookPage() {
  const { totalStars, unlockedStickers, spendStars, unlockSticker } = useAppStore();
  const { pieces, fire } = useConfetti();
  
  const [activeTab, setActiveTab] = useState<"book" | "canvas">("book");
  const [selectedStickerForBuy, setSelectedStickerForBuy] = useState<string | null>(null);
  const [showUnlockModal, setShowUnlockModal] = useState(false);

  // Canvas States
  const [currentTheme, setCurrentTheme] = useState<Theme>(THEMES[0]);
  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>([]);
  const [selectedPlacedId, setSelectedPlacedId] = useState<string | null>(null);
  const [saveToast, setSaveToast] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Load saved canvas on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(CANVAS_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setPlacedStickers(parsed);
          }
        }
      } catch (e) {
        console.error("Failed to load saved canvas", e);
      }
    }
  }, []);

  // Free starter stickers for canvas if none unlocked
  const availableStickers = STICKERS.filter(
    (s) => unlockedStickers.includes(s.id) || s.id === "s1" || s.id === "s7"
  );

  const handleBuySticker = (sticker: Sticker) => {
    if (unlockedStickers.includes(sticker.id)) {
      playSFX("tap");
      return;
    }

    if (totalStars >= sticker.price) {
      if (spendStars(sticker.price)) {
        unlockSticker(sticker.id);
        setSelectedStickerForBuy(sticker.id);
        playSFX("star");
        playSFX("cheer");
        fire();
        setShowUnlockModal(true);
        setTimeout(() => setShowUnlockModal(false), 2500);
      }
    } else {
      playSFX("boop");
    }
  };

  // Canvas Actions
  const addStickerToCanvas = (sticker: Sticker) => {
    playSFX("pop");
    const newPlaced: PlacedSticker = {
      id: `placed-${Date.now()}-${Math.random()}`,
      stickerId: sticker.id,
      emoji: sticker.emoji,
      name: sticker.name,
      x: 30 + Math.random() * 40, // percent
      y: 30 + Math.random() * 40,
      scale: 1,
      rotation: 0,
    };
    setPlacedStickers((prev) => [...prev, newPlaced]);
    setSelectedPlacedId(newPlaced.id);
  };

  const updateSelectedSticker = (updates: Partial<PlacedSticker>) => {
    if (!selectedPlacedId) return;
    setPlacedStickers((prev) =>
      prev.map((item) => (item.id === selectedPlacedId ? { ...item, ...updates } : item))
    );
  };

  const removeSelectedSticker = () => {
    if (!selectedPlacedId) return;
    playSFX("pop");
    setPlacedStickers((prev) => prev.filter((item) => item.id !== selectedPlacedId));
    setSelectedPlacedId(null);
  };

  const clearCanvas = () => {
    playSFX("tap");
    setPlacedStickers([]);
    setSelectedPlacedId(null);
  };

  const randomizeScene = () => {
    playSFX("star");
    const count = Math.min(availableStickers.length, 5);
    const randomized: PlacedSticker[] = [];
    for (let i = 0; i < count; i++) {
      const s = availableStickers[i % availableStickers.length];
      randomized.push({
        id: `placed-rand-${Date.now()}-${i}`,
        stickerId: s.id,
        emoji: s.emoji,
        name: s.name,
        x: 15 + Math.random() * 70,
        y: 20 + Math.random() * 60,
        scale: 0.9 + Math.random() * 0.4,
        rotation: (Math.random() - 0.5) * 30,
      });
    }
    setPlacedStickers(randomized);
    setSelectedPlacedId(null);
  };

  const saveCanvasScene = () => {
    try {
      localStorage.setItem(CANVAS_STORAGE_KEY, JSON.stringify(placedStickers));
      playSFX("cheer");
      fire();
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 3000);
    } catch (e) {
      console.error("Save failed", e);
    }
  };

  const selectedItem = placedStickers.find((item) => item.id === selectedPlacedId);

  return (
    <div className="min-h-screen bg-slate-900 pb-24 text-white overflow-x-hidden relative flex flex-col">
      <ConfettiOverlay pieces={pieces} />

      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="pt-3 sm:pt-5 pb-2 px-4 sm:px-5 flex justify-between items-center relative z-20 max-w-5xl mx-auto w-full">
        <Link 
          href="/play" 
          onClick={() => playSFX("tap")}
          className="w-10 h-10 sm:w-11 sm:h-11 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white active:scale-90 transition-transform border border-white/10"
        >
          <ArrowLeft size={20} />
        </Link>

        {/* Tab Switcher */}
        <div className="flex bg-slate-800/80 p-1 rounded-2xl border border-slate-700/80 shadow-inner">
          <button
            onClick={() => {
              playSFX("tap");
              setActiveTab("book");
            }}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "book"
                ? "bg-primary text-white shadow-md shadow-primary/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <BookMarked size={15} />
            <span>Sổ Nhãn Dán</span>
          </button>
          <button
            onClick={() => {
              playSFX("tap");
              setActiveTab("canvas");
            }}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "canvas"
                ? "bg-gradient-to-r from-amber-500 to-pink-500 text-white shadow-md shadow-pink-500/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Palette size={15} />
            <span>Phòng Sáng Tạo</span>
          </button>
        </div>

        {/* Star Badge */}
        <div className="bg-yellow-400/20 border border-yellow-400/50 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-2xl flex items-center gap-1.5 shadow-[0_0_15px_rgba(250,204,21,0.25)]">
          <Star size={16} className="text-yellow-400 fill-yellow-400" />
          <span className="text-yellow-400 font-extrabold text-sm sm:text-base">{totalStars}</span>
        </div>
      </header>

      {/* TAB 1: SỔ NHÃN DÁN (COLLECTION / SHOP) */}
      {activeTab === "book" && (
        <main className="px-4 sm:px-5 pb-20 lg:pb-14 relative z-10 max-w-4xl mx-auto w-full flex-1">
          <div className="text-center mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-black tracking-wide text-white mb-0.5">
              Bộ Sưu Tập Nhãn Dán
            </h2>
            <p className="text-xs text-slate-400">
              Học chăm chỉ và hoàn thành thử thách để đổi sao lấy nhãn dán thần kỳ!
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 max-w-3xl mx-auto">
            {STICKERS.map((sticker) => {
              const isUnlocked = unlockedStickers.includes(sticker.id);
              const canAfford = totalStars >= sticker.price;

              return (
                <motion.div
                  key={sticker.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBuySticker(sticker)}
                  className={`
                    relative aspect-[4/3] sm:aspect-[5/4] md:aspect-square max-h-[145px] sm:max-h-[160px] rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 flex flex-col items-center justify-center cursor-pointer transition-all duration-300
                    ${isUnlocked 
                      ? "bg-gradient-to-br from-white/15 to-white/5 border border-white/20 shadow-lg" 
                      : "bg-slate-800/60 border border-slate-700/70 opacity-80"
                    }
                  `}
                >
                  {/* Sticker Emoji */}
                  <div className={`text-4xl sm:text-5xl md:text-5xl mb-1 transition-all duration-500 ${
                    !isUnlocked 
                      ? "grayscale opacity-40 blur-[1px]" 
                      : "filter-none scale-110 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                  }`}>
                    {sticker.emoji}
                  </div>
                  
                  {/* Name */}
                  <span className={`text-[11px] sm:text-xs font-bold text-center ${isUnlocked ? "text-white" : "text-slate-400"}`}>
                    {sticker.name}
                  </span>

                  {/* Price Tag / Status */}
                  <div className="absolute bottom-0 translate-y-1/2">
                    {isUnlocked ? (
                      <div className="bg-emerald-500 text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full flex items-center gap-1 shadow-md shadow-emerald-500/40">
                        <Check size={11} /> Đã Có
                      </div>
                    ) : (
                      <div className={`text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full flex items-center gap-1 shadow-md ${
                        canAfford 
                          ? "bg-amber-400 text-slate-950 shadow-amber-400/40 animate-pulse" 
                          : "bg-slate-700 text-slate-400"
                      }`}>
                        {canAfford ? <Star size={10} className="fill-slate-950" /> : <Lock size={10} />}
                        {sticker.price} sao
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-6 sm:mt-8 text-center">
            <button
              onClick={() => {
                playSFX("tap");
                setActiveTab("canvas");
              }}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-500/30 flex items-center gap-2 mx-auto active:scale-95 transition-transform"
            >
              <Palette size={16} />
              <span>Vào Phòng Sáng Tạo Dán Tranh 🎨</span>
            </button>
          </div>
        </main>
      )}

      {/* TAB 2: PHÒNG SÁNG TẠO (INTERACTIVE CANVAS) */}
      {activeTab === "canvas" && (
        <main className="px-4 sm:px-5 pb-20 lg:pb-14 relative z-10 max-w-4xl mx-auto w-full flex-1 flex flex-col gap-2.5 sm:gap-3">
          {/* Top Canvas Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-800/80 p-2.5 sm:p-3 rounded-2xl border border-slate-700/80">
            {/* Theme Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              <span className="text-xs font-bold text-slate-400 shrink-0 mr-1">Bối cảnh:</span>
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    playSFX("tap");
                    setCurrentTheme(theme);
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                    currentTheme.id === theme.id
                      ? "bg-white text-slate-900 shadow-md scale-105"
                      : "bg-slate-700/60 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <span>{theme.emoji}</span>
                  <span className="hidden sm:inline">{theme.name}</span>
                </button>
              ))}
            </div>

            {/* Quick Action Tools */}
            <div className="flex items-center gap-1.5 ml-auto">
              <button
                onClick={randomizeScene}
                className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-amber-300 text-xs font-bold flex items-center gap-1 active:scale-95 transition-transform"
                title="Xếp tự động"
              >
                <Dices size={16} />
                <span className="hidden sm:inline">Ngẫu nhiên</span>
              </button>

              <button
                onClick={clearCanvas}
                disabled={placedStickers.length === 0}
                className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-rose-400 text-xs font-bold flex items-center gap-1 disabled:opacity-30 active:scale-95 transition-transform"
                title="Xoá tranh"
              >
                <RefreshCw size={16} />
                <span className="hidden sm:inline">Làm sạch</span>
              </button>

              <button
                onClick={saveCanvasScene}
                disabled={placedStickers.length === 0}
                className="px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-500/25 disabled:opacity-30 active:scale-95 transition-transform"
              >
                <Download size={16} />
                <span>Lưu kiệt tác</span>
              </button>
            </div>
          </div>

          {/* Interactive Canvas Stage */}
          <div
            ref={canvasRef}
            onClick={() => setSelectedPlacedId(null)}
            className={`
              relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[2/1] max-h-[330px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20
              bg-gradient-to-b ${currentTheme.bgGradient} transition-colors duration-700 select-none
            `}
          >
            {/* Ambient Background Scenery Elements */}
            <div className="absolute inset-0 pointer-events-none p-4 flex flex-wrap justify-between items-start opacity-70">
              {currentTheme.decorations.map((deco, idx) => (
                <motion.span
                  key={idx}
                  className="text-3xl md:text-5xl drop-shadow-md"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3 + idx, repeat: Infinity, ease: "easeInOut" }}
                >
                  {deco}
                </motion.span>
              ))}
            </div>

            {/* Empty Canvas Guidance */}
            {placedStickers.length === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center text-3xl mb-3 shadow-lg">
                  🎨
                </div>
                <h3 className="text-lg font-black text-slate-800 drop-shadow-sm mb-1">
                  Bảng Vẽ Chưa Có Nhãn Dán
                </h3>
                <p className="text-xs text-slate-700/80 font-medium max-w-xs">
                  Chạm vào bất kỳ nhãn dán nào ở khay bên dưới để thả vào tranh và bắt đầu sáng tạo nhé!
                </p>
              </div>
            )}

            {/* Placed Stickers Layer */}
            {placedStickers.map((item) => {
              const isSelected = selectedPlacedId === item.id;
              return (
                <motion.div
                  key={item.id}
                  drag
                  dragConstraints={canvasRef}
                  dragMomentum={false}
                  onDragEnd={(_, info) => {
                    if (!canvasRef.current) return;
                    const rect = canvasRef.current.getBoundingClientRect();
                    // Update relative percentage coordinates
                    const newX = Math.max(5, Math.min(90, ((info.point.x - rect.left) / rect.width) * 100));
                    const newY = Math.max(5, Math.min(90, ((info.point.y - rect.top) / rect.height) * 100));
                    updateSelectedSticker({ x: newX, y: newY });
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    playSFX("pop");
                    setSelectedPlacedId(item.id);
                  }}
                  style={{
                    position: "absolute",
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    transform: `translate(-50%, -50%) scale(${item.scale}) rotate(${item.rotation}deg)`,
                  }}
                  className={`
                    cursor-grab active:cursor-grabbing touch-none p-2 rounded-2xl transition-shadow
                    ${isSelected ? "ring-4 ring-amber-400 bg-white/20 backdrop-blur-xs shadow-2xl z-30" : "z-10"}
                  `}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-6xl md:text-7xl drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)] filter-none"
                  >
                    {item.emoji}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Selected Sticker Manipulation Toolbar */}
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-2xl backdrop-blur-md"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedItem.emoji}</span>
                <span className="text-xs font-bold text-amber-300">{selectedItem.name}</span>
              </div>

              <div className="flex items-center gap-1">
                {/* Scale Up */}
                <button
                  onClick={() => {
                    playSFX("tap");
                    updateSelectedSticker({ scale: Math.min(2.2, selectedItem.scale + 0.2) });
                  }}
                  className="p-1.5 rounded-xl bg-slate-800 text-white hover:bg-slate-700 active:scale-90 transition-transform"
                  title="Phóng to"
                >
                  <ZoomIn size={16} />
                </button>

                {/* Scale Down */}
                <button
                  onClick={() => {
                    playSFX("tap");
                    updateSelectedSticker({ scale: Math.max(0.6, selectedItem.scale - 0.2) });
                  }}
                  className="p-1.5 rounded-xl bg-slate-800 text-white hover:bg-slate-700 active:scale-90 transition-transform"
                  title="Thu nhỏ"
                >
                  <ZoomOut size={16} />
                </button>

                {/* Rotate */}
                <button
                  onClick={() => {
                    playSFX("tap");
                    updateSelectedSticker({ rotation: (selectedItem.rotation + 30) % 360 });
                  }}
                  className="p-1.5 rounded-xl bg-slate-800 text-white hover:bg-slate-700 active:scale-90 transition-transform"
                  title="Xoay"
                >
                  <RotateCw size={16} />
                </button>

                {/* Delete */}
                <button
                  onClick={removeSelectedSticker}
                  className="p-1.5 rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 active:scale-90 transition-transform ml-1"
                  title="Gỡ nhãn"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Bottom Sticker Dock / Drawer */}
          <div className="bg-slate-800/90 border border-slate-700/80 p-3 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-400" />
                Khay nhãn dán của bé ({availableStickers.length} mẫu sẵn sàng)
              </span>
              <span className="text-[11px] text-slate-400">Chạm để thả vào tranh</span>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-slate-600">
              {availableStickers.map((sticker) => (
                <motion.button
                  key={sticker.id}
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => addStickerToCanvas(sticker)}
                  className="w-16 h-16 shrink-0 bg-slate-700/80 hover:bg-slate-700 border border-slate-600 rounded-2xl flex flex-col items-center justify-center p-1 shadow-md transition-all group"
                >
                  <span className="text-3xl group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                    {sticker.emoji}
                  </span>
                  <span className="text-[9px] font-bold text-slate-300 truncate w-full text-center mt-0.5">
                    {sticker.name}
                  </span>
                </motion.button>
              ))}

              {/* Promo to unlock more */}
              <button
                onClick={() => {
                  playSFX("tap");
                  setActiveTab("book");
                }}
                className="h-16 px-4 shrink-0 border-2 border-dashed border-slate-600 hover:border-amber-400/60 rounded-2xl flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-amber-300 transition-colors"
              >
                <span>+ Thêm nhãn mới</span>
              </button>
            </div>
          </div>
        </main>
      )}

      {/* Unlock Success Modal */}
      <AnimatePresence>
        {showUnlockModal && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-slate-900/95 border-2 border-yellow-400 p-8 rounded-3xl shadow-2xl text-center flex flex-col items-center gap-3 max-w-xs"
            >
              <span className="text-6xl animate-bounce">🎉</span>
              <h3 className="text-xl font-black text-yellow-400">MỞ KHOÁ THÀNH CÔNG!</h3>
              <p className="text-xs text-slate-300">
                Nhãn dán mới đã sẵn sàng trong Phòng Sáng Tạo!
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Save Toast Notification */}
      <AnimatePresence>
        {saveToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-emerald-600 text-white font-bold text-xs px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 z-50 border border-emerald-400"
          >
            <span>🌟</span>
            <span>Đã lưu kiệt tác của bé vào máy thành công!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
