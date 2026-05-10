"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowLeft, Lock, Check } from "lucide-react";
import Link from "next/link";
import { useAppStore } from "@/stores/appStore";
import { STICKERS } from "@/data/stickers";

export default function StickerBookPage() {
  const { totalStars, unlockedStickers, spendStars, unlockSticker } = useAppStore();
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);

  const handleBuySticker = (id: string, price: number) => {
    if (unlockedStickers.includes(id)) return;
    
    if (spendStars(price)) {
      unlockSticker(id);
      setSelectedSticker(id);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      
      // Play a sound effect if possible
      if (typeof window !== "undefined") {
        const audio = new Audio("https://cdn.freesound.org/previews/270/270404_5123851-lq.mp3"); // success chime
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Audio play failed", e));
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 pb-20 overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

      {/* Header */}
      <header className="pt-12 pb-6 px-6 flex justify-between items-center relative z-10">
        <Link href="/play" className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white active:scale-95 transition-transform">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-black text-white tracking-widest uppercase">
          Sổ Nhãn Dán
        </h1>
        <div className="bg-yellow-400/20 border border-yellow-400/50 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-[0_0_15px_rgba(250,204,21,0.3)]">
          <Star size={20} className="text-yellow-400 fill-yellow-400" />
          <span className="text-yellow-400 font-bold text-xl">{totalStars}</span>
        </div>
      </header>

      <main className="px-6 relative z-10 max-w-4xl mx-auto">
        <p className="text-slate-400 text-center mb-8">
          Hãy hát và học thật giỏi để kiếm sao đổi lấy các nhãn dán tuyệt đẹp nhé!
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {STICKERS.map((sticker) => {
            const isUnlocked = unlockedStickers.includes(sticker.id);
            const canAfford = totalStars >= sticker.price;

            return (
              <motion.div
                key={sticker.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => !isUnlocked && handleBuySticker(sticker.id, sticker.price)}
                className={`
                  relative aspect-square rounded-3xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-300
                  ${isUnlocked 
                    ? "bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-lg" 
                    : "bg-slate-800/50 border border-slate-700 opacity-80"
                  }
                `}
              >
                {/* Sticker Image (Emoji) */}
                <div className={`text-6xl md:text-7xl mb-2 transition-all duration-500 ${!isUnlocked ? "grayscale opacity-50 blur-[2px]" : "filter-none scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"}`}>
                  {sticker.emoji}
                </div>
                
                {/* Name */}
                <span className={`text-sm font-bold text-center ${isUnlocked ? "text-white" : "text-slate-500"}`}>
                  {sticker.name}
                </span>

                {/* Price Tag / Status */}
                <div className="absolute bottom-0 translate-y-1/2">
                  {isUnlocked ? (
                    <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                      <Check size={14} /> Đã Sở Hữu
                    </div>
                  ) : (
                    <div className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 ${canAfford ? "bg-yellow-500 text-black shadow-[0_0_10px_rgba(234,179,8,0.5)]" : "bg-slate-700 text-slate-400"}`}>
                      {canAfford ? <Star size={12} className="fill-black" /> : <Lock size={12} />}
                      {sticker.price}
                    </div>
                  )}
                </div>

                {/* Unlock Animation Overlay */}
                <AnimatePresence>
                  {selectedSticker === sticker.id && showConfetti && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 2, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                      className="absolute inset-0 border-4 border-yellow-400 rounded-3xl"
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </main>

      {/* Basic CSS Confetti for Unlock Success */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            exit={{ scale: 0 }}
            className="text-8xl"
          >
            🎉
          </motion.div>
        </div>
      )}
    </div>
  );
}
