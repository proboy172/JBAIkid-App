"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/layout/BackButton";
import { ConfettiOverlay } from "@/components/shared/ConfettiOverlay";
import { getAllTopics, type VocabItem } from "@/data/vocabulary";
import { useSpeech } from "@/hooks/useSpeech";
import { useConfetti } from "@/hooks/useConfetti";
import { useAppStore } from "@/stores/appStore";
import { playSFX } from "@/utils/soundEffects";

function getMatchSet(count: number) {
  const all = getAllTopics().flatMap((c) => c.items);
  const selected = [...all].sort(() => Math.random() - 0.5).slice(0, count);
  const left = [...selected].sort(() => Math.random() - 0.5);
  const right = [...selected].sort(() => Math.random() - 0.5);
  return { left, right };
}

export default function MatchGamePage() {
  const ITEMS_PER_ROUND = 4;
  const [leftItems, setLeftItems] = useState<VocabItem[]>([]);
  const [rightItems, setRightItems] = useState<VocabItem[]>([]);
  
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const { speak } = useSpeech();
  const { pieces, fire } = useConfetti();
  const { addStars } = useAppStore();

  const loadRound = useCallback(() => {
    const { left, right } = getMatchSet(ITEMS_PER_ROUND);
    setLeftItems(left);
    setRightItems(right);
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatchedIds([]);
  }, []);

  const startGame = useCallback(() => {
    playSFX("tap");
    setScore(0);
    setRound(1);
    setGameOver(false);
    setStarted(true);
    loadRound();
  }, [loadRound]);

  // Handle Match Logic
  useEffect(() => {
    if (selectedLeft && selectedRight) {
      if (selectedLeft === selectedRight) {
        // Match!
        playSFX("correct");
        speak(selectedRight, "en-US");
        setMatchedIds(prev => [...prev, selectedLeft]);
        setScore(s => s + 1);
        setSelectedLeft(null);
        setSelectedRight(null);
      } else {
        // Mismatch
        playSFX("boop");
        setTimeout(() => {
          setSelectedLeft(null);
          setSelectedRight(null);
        }, 500);
      }
    }
  }, [selectedLeft, selectedRight, speak]);

  // Check Round Completion
  useEffect(() => {
    if (started && matchedIds.length === ITEMS_PER_ROUND) {
      setTimeout(() => {
        if (round < 3) {
          playSFX("pop");
          setRound(r => r + 1);
          loadRound();
        } else {
          playSFX("cheer");
          fire();
          setGameOver(true);
          addStars(3); // 3 stars for completing 3 rounds
        }
      }, 1000);
    }
  }, [matchedIds, started, round, loadRound, fire, addStars]);

  if (!started) {
    return (
      <div className="h-dvh max-h-dvh w-full overflow-hidden flex flex-col justify-between select-none">
        <div className="pt-2 sm:pt-4 pb-1 px-4 sm:px-5 relative z-10 shrink-0">
          <BackButton label="Game Center" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-2 relative z-10 overflow-hidden">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
            <span className="text-5xl sm:text-7xl block mb-2">🧩</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-1" style={{ fontFamily: "var(--font-heading)", color: "#34D399" }}>
              Nối Hình & Chữ
            </h1>
            <p className="text-text-light mb-4 sm:mb-6 text-xs sm:text-base">Chọn một hình ảnh và chọn từ tiếng Anh tương ứng!</p>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={startGame}
              className="px-8 py-3 rounded-2xl sm:rounded-3xl text-white text-lg sm:text-xl font-bold shadow-xl cursor-pointer"
              style={{ background: "linear-gradient(135deg, #34D399, #10B981)", fontFamily: "var(--font-heading)" }}
            >
              Bắt Đầu! 🚀
            </motion.button>
          </motion.div>
        </div>
        <div className="h-2 shrink-0" />
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="h-dvh max-h-dvh w-full overflow-hidden flex flex-col justify-between select-none">
        <ConfettiOverlay pieces={pieces} />
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-2 relative z-10 overflow-hidden">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center glass-card p-6 sm:p-8 max-w-sm w-full mx-4">
            <span className="text-5xl sm:text-6xl block mb-2">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-1" style={{ fontFamily: "var(--font-heading)", color: "#34D399" }}>
              Tuyệt vời!
            </h2>
            <div className="flex justify-center gap-1 mb-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }} className="text-3xl">
                  ⭐
                </motion.span>
              ))}
            </div>
            <p className="text-base sm:text-lg font-bold mb-4 text-text-light">Hoàn thành xuất sắc 3 vòng!</p>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={startGame}
              className="px-6 py-2.5 rounded-2xl text-white text-base font-bold shadow-lg mb-2 block w-full cursor-pointer"
              style={{ background: "linear-gradient(135deg, #34D399, #10B981)", fontFamily: "var(--font-heading)" }}
            >
              Chơi Lại 🔄
            </motion.button>
            <BackButton label="Quay Về" />
          </motion.div>
        </div>
        <div className="h-2 shrink-0" />
      </div>
    );
  }

  return (
    <div className="h-dvh max-h-dvh w-full overflow-hidden flex flex-col justify-between select-none">
      {/* Header */}
      <div className="pt-2 sm:pt-3 pb-1 px-4 sm:px-5 relative z-10 shrink-0">
        <div className="flex items-center justify-between max-w-xl mx-auto w-full">
          <BackButton />
          <span className="text-xs sm:text-sm font-bold px-3 py-1 rounded-full glass-card text-emerald-600">
            Vòng: {round}/3 &nbsp;|&nbsp; Điểm: {score}
          </span>
        </div>
      </div>

      {/* Matching columns */}
      <div className="flex-1 flex px-3 sm:px-4 py-1 relative z-10 overflow-hidden items-center justify-center gap-3 sm:gap-8 w-full max-w-xl mx-auto">
        
        {/* Left Column: Emojis/Images */}
        <div className="flex flex-col gap-2 sm:gap-2.5 w-1/2 max-w-[130px] sm:max-w-[150px] shrink-0">
          <AnimatePresence>
            {leftItems.map((item, i) => {
              const isMatched = matchedIds.includes(item.en);
              const isSelected = selectedLeft === item.en;
              return (
                <motion.button
                  key={`l-${item.en}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isMatched ? 0.2 : 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileTap={!isMatched ? { scale: 0.92 } : {}}
                  onClick={() => {
                    if (!isMatched && !(selectedLeft && selectedRight)) {
                      playSFX("tap");
                      setSelectedLeft(item.en);
                    }
                  }}
                  disabled={isMatched || !!(selectedLeft && selectedRight)}
                  className={`h-12 sm:h-15 landscape:h-11 rounded-2xl flex items-center justify-center shadow-md border-3 transition-colors cursor-pointer ${
                    isSelected ? "border-emerald-400 bg-emerald-50" : "border-transparent bg-white"
                  } ${isMatched ? "pointer-events-none opacity-20" : ""}`}
                >
                  <div className="w-8 h-8 sm:w-11 sm:h-11 landscape:w-8 landscape:h-8 flex items-center justify-center overflow-hidden">
                    {item.photoUrl || item.illustrationUrl ? (
                      <img
                        src={item.photoUrl || item.illustrationUrl}
                        alt={item.en}
                        className="w-full h-full object-contain rounded-lg"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = "none";
                          const fallback = e.currentTarget.parentElement?.querySelector(".emoji-fallback") as HTMLElement;
                          if (fallback) fallback.style.display = "block";
                        }}
                      />
                    ) : null}
                    <span
                      className="emoji-fallback text-2xl sm:text-3xl landscape:text-2xl"
                      style={{ display: item.photoUrl || item.illustrationUrl ? "none" : "block" }}
                    >
                      {item.emoji}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Right Column: Words */}
        <div className="flex flex-col gap-2 sm:gap-2.5 w-1/2 max-w-[170px] sm:max-w-[210px] shrink-0">
          <AnimatePresence>
            {rightItems.map((item, i) => {
              const isMatched = matchedIds.includes(item.en);
              const isSelected = selectedRight === item.en;
              return (
                <motion.button
                  key={`r-${item.en}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: isMatched ? 0.2 : 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileTap={!isMatched ? { scale: 0.92 } : {}}
                  onClick={() => {
                    if (!isMatched && !(selectedLeft && selectedRight)) {
                      playSFX("tap");
                      speak(item.en, "en-US");
                      setSelectedRight(item.en);
                    }
                  }}
                  disabled={isMatched || !!(selectedLeft && selectedRight)}
                  className={`h-12 sm:h-15 landscape:h-11 px-2.5 sm:px-3 rounded-2xl flex items-center justify-center shadow-md border-3 transition-colors cursor-pointer ${
                    isSelected ? "border-emerald-400 bg-emerald-50" : "border-transparent bg-white"
                  } ${isMatched ? "pointer-events-none opacity-20" : ""}`}
                >
                  <span className="text-xs sm:text-base landscape:text-xs font-bold break-words text-center leading-tight" style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}>
                    {item.en}
                  </span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

      </div>

      {/* Safe bottom spacer */}
      <div className="h-1 sm:h-2 shrink-0" />
    </div>
  );
}
