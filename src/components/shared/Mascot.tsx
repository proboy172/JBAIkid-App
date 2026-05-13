"use client";

import { motion, AnimatePresence } from "framer-motion";

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
  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      {/* Speech Bubble */}
      <AnimatePresence>
        {showMessage && message && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.8 }}
            className="relative bg-white rounded-2xl px-3 py-1.5 shadow-md border border-gray-100 max-w-[200px]"
          >
            <p className="text-xs font-semibold text-center" style={{ fontFamily: "var(--font-body)", color: "var(--color-text)" }}>
              {message}
            </p>
            {/* Tail */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-gray-100 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot Image */}
      <motion.img
        src={moodImages[mood]}
        alt="Bino Mascot"
        width={size}
        height={size}
        className="drop-shadow-lg"
        animate={{
          y: [0, -4, 0],
          rotate: mood === "cheer" ? [0, 3, -3, 0] : [0, 1, -1, 0],
        }}
        transition={{
          duration: mood === "cheer" ? 0.6 : 2.5,
          repeat: Infinity,
          repeatDelay: mood === "cheer" ? 0.2 : 1,
        }}
        draggable={false}
      />
    </div>
  );
}
