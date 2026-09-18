"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playSFX, speakCheer } from "@/utils/soundEffects";

type MascotMood = "wave" | "cheer" | "sad" | "love";

const moodImages: Record<MascotMood, string> = {
  wave: "/mascot/bino-wave.png",
  cheer: "/mascot/bino-cheer.png",
  sad: "/mascot/bino-sad.png",
  love: "/mascot/bino-love.png",
};

interface MascotProps {
  mood?: MascotMood;
  message?: string;
  size?: number;
  className?: string;
  showMessage?: boolean;
}

export default function Mascot({ 
  mood = "wave", 
  message, 
  size = 80, 
  className = "",
  showMessage = true 
}: MascotProps) {
  const [activeMood, setActiveMood] = useState<MascotMood>(mood);
  const [isJumping, setIsJumping] = useState(false);

  const handleTapMascot = () => {
    playSFX("giggle");
    setIsJumping(true);
    setActiveMood("cheer");
    speakCheer();

    setTimeout(() => {
      setIsJumping(false);
      setActiveMood(mood);
    }, 1800);
  };

  return (
    <div 
      className={`flex flex-col items-center gap-1 cursor-pointer select-none group ${className}`}
      onClick={handleTapMascot}
      title="Chạm vào Bino để chào nhé!"
    >
      {/* Speech Bubble */}
      <AnimatePresence>
        {showMessage && message && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.8 }}
            className="relative bg-white rounded-2xl px-3 py-1.5 shadow-md border border-gray-100 max-w-[220px] transition-transform group-hover:scale-105"
          >
            <p className="text-xs font-bold text-center" style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}>
              {isJumping ? "Yeeey! Chào bé yêu! 🎉" : message}
            </p>
            {/* Tail */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-gray-100 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot Image */}
      <motion.img
        src={moodImages[activeMood]}
        alt="Bino Mascot"
        width={size}
        height={size}
        className="drop-shadow-xl transition-transform"
        animate={
          isJumping
            ? { y: [0, -25, 0, -15, 0], rotate: [0, -10, 10, -5, 0], scale: [1, 1.15, 1] }
            : {
                y: [0, -4, 0],
                rotate: activeMood === "cheer" ? [0, 3, -3, 0] : [0, 1, -1, 0],
              }
        }
        transition={
          isJumping
            ? { duration: 0.8, ease: "easeOut" }
            : {
                duration: activeMood === "cheer" ? 0.6 : 2.5,
                repeat: Infinity,
                repeatDelay: activeMood === "cheer" ? 0.2 : 1,
              }
        }
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
        draggable={false}
      />
    </div>
  );
}

