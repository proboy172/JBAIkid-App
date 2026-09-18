"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { VolumeX } from "lucide-react";
import { useAppStore } from "@/stores/appStore";
import { startBGM, stopBGM, playSFX } from "@/utils/soundEffects";

export default function BgmPlayer({ className = "" }: { className?: string }) {
  const { bgmEnabled, toggleBgm } = useAppStore();

  useEffect(() => {
    if (bgmEnabled) {
      startBGM();
    } else {
      stopBGM();
    }
  }, [bgmEnabled]);

  const handleToggle = () => {
    playSFX("tap");
    toggleBgm();
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      onClick={handleToggle}
      className={`glass-card px-3 py-1.5 rounded-full flex items-center gap-1.5 cursor-pointer border shadow-sm transition-all ${
        bgmEnabled 
          ? "border-pink-300 bg-pink-50/90 text-primary shadow-pink-200/50" 
          : "border-gray-200 bg-white/70 text-gray-400"
      } ${className}`}
      title={bgmEnabled ? "Tắt nhạc nền vui nhộn" : "Bật nhạc nền vui nhộn"}
      aria-label="Toggle background music"
    >
      {bgmEnabled ? (
        <>
          <span className="text-base animate-bounce">🎵</span>
          <div className="flex items-end gap-0.5 h-3.5 w-3.5">
            <span className="w-1 bg-primary rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-full" />
            <span className="w-1 bg-secondary rounded-full animate-[pulse_0.4s_ease-in-out_infinite_0.2s] h-3/4" />
            <span className="w-1 bg-accent rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.4s] h-2/3" />
          </div>
          <span className="text-[11px] font-bold text-primary hidden sm:inline" style={{ fontFamily: "var(--font-heading)" }}>
            Nhạc
          </span>
        </>
      ) : (
        <>
          <VolumeX size={15} className="text-gray-400" />
          <span className="text-[11px] font-bold text-gray-400 hidden sm:inline" style={{ fontFamily: "var(--font-heading)" }}>
            Nhạc
          </span>
        </>
      )}
    </motion.button>
  );
}
