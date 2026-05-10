"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/layout/BackButton";
import BottomNav from "@/components/layout/BottomNav";
import { ConfettiOverlay } from "@/components/shared/ConfettiOverlay";
import { getAllTopics, type VocabItem } from "@/data/vocabulary";
import { useSpeech } from "@/hooks/useSpeech";
import { useConfetti } from "@/hooks/useConfetti";
import { useAppStore } from "@/stores/appStore";

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
        speak(selectedRight, "en-US");
        setMatchedIds(prev => [...prev, selectedLeft]);
        setScore(s => s + 1);
        setSelectedLeft(null);
        setSelectedRight(null);
      } else {
        // Mismatch
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
          setRound(r => r + 1);
          loadRound();
        } else {
          fire();
          setGameOver(true);
          addStars(3); // 3 stars for completing 3 rounds
        }
      }, 1000);
    }
  }, [matchedIds, started, round, loadRound, fire, addStars]);

  if (!started) {
    return (
      <div className="min-h-dvh flex flex-col">
        <div className="pt-10 pb-4 px-5 relative z-10">
          <BackButton label="Game Center" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-5 pb-28 relative z-10">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
            <span className="text-8xl block mb-4">🧩</span>
            <h1 className="text-3xl font-extrabold mb-2" style={{ fontFamily: "var(--font-heading)", color: "#34D399" }}>
              Nối Hình & Chữ
            </h1>
            <p className="text-text-light mb-8">Chọn một hình ảnh và chọn từ tiếng Anh tương ứng!</p>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={startGame}
              className="px-10 py-4 rounded-3xl text-white text-xl font-bold shadow-xl"
              style={{ background: "linear-gradient(135deg, #34D399, #10B981)", fontFamily: "var(--font-heading)" }}
            >
              Bắt Đầu! 🚀
            </motion.button>
          </motion.div>
        </div>
        <BottomNav />
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="min-h-dvh flex flex-col">
        <ConfettiOverlay pieces={pieces} />
        <div className="flex-1 flex flex-col items-center justify-center px-5 pb-28 relative z-10">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center glass-card p-8 max-w-sm w-full">
            <span className="text-7xl block mb-3">🏆</span>
            <h2 className="text-3xl font-extrabold mb-2" style={{ fontFamily: "var(--font-heading)", color: "#34D399" }}>
              Tuyệt vời!
            </h2>
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }} className="text-4xl">
                  ⭐
                </motion.span>
              ))}
            </div>
            <p className="text-lg font-bold mb-6 text-text-light">Hoàn thành xuất sắc 3 vòng!</p>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={startGame}
              className="px-8 py-3 rounded-3xl text-white text-lg font-bold shadow-lg mb-3"
              style={{ background: "linear-gradient(135deg, #34D399, #10B981)", fontFamily: "var(--font-heading)" }}
            >
              Chơi Lại 🔄
            </motion.button>
            <BackButton label="Quay Về" />
          </motion.div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col">
      <div className="pt-10 pb-2 px-5 relative z-10">
        <div className="flex items-center justify-between">
          <BackButton />
          <span className="text-sm font-bold px-3 py-1 rounded-full glass-card text-emerald-600">
            Vòng: {round}/3 &nbsp;|&nbsp; Điểm: {score}
          </span>
        </div>
      </div>

      <div className="flex-1 flex px-6 pb-24 pt-8 relative z-10 items-center justify-center gap-8">
        
        {/* Left Column: Emojis */}
        <div className="flex flex-col gap-4 w-1/2 max-w-[120px]">
          <AnimatePresence>
            {leftItems.map((item, i) => {
              const isMatched = matchedIds.includes(item.en);
              const isSelected = selectedLeft === item.en;
              return (
                <motion.button
                  key={`l-${item.en}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isMatched ? 0 : 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileTap={!isMatched ? { scale: 0.9 } : {}}
                  onClick={() => !isMatched && setSelectedLeft(item.en)}
                  disabled={isMatched}
                  className={`aspect-square rounded-2xl flex items-center justify-center text-5xl shadow-md border-4 transition-colors ${
                    isSelected ? "border-emerald-400 bg-emerald-50" : "border-transparent bg-white"
                  } ${isMatched ? "pointer-events-none" : ""}`}
                >
                  {item.emoji}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Right Column: Words */}
        <div className="flex flex-col gap-4 w-1/2 max-w-[160px]">
          <AnimatePresence>
            {rightItems.map((item, i) => {
              const isMatched = matchedIds.includes(item.en);
              const isSelected = selectedRight === item.en;
              return (
                <motion.button
                  key={`r-${item.en}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: isMatched ? 0 : 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileTap={!isMatched ? { scale: 0.9 } : {}}
                  onClick={() => {
                    if (!isMatched) {
                      speak(item.en, "en-US");
                      setSelectedRight(item.en);
                    }
                  }}
                  disabled={isMatched}
                  className={`py-6 px-2 rounded-2xl flex items-center justify-center shadow-md border-4 transition-colors ${
                    isSelected ? "border-emerald-400 bg-emerald-50" : "border-transparent bg-white"
                  } ${isMatched ? "pointer-events-none" : ""}`}
                >
                  <span className="text-xl font-bold break-words text-center" style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}>
                    {item.en}
                  </span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
      <BottomNav />
    </div>
  );
}
