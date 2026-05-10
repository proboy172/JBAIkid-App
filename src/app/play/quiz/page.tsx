"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/layout/BackButton";
import BottomNav from "@/components/layout/BottomNav";
import { ConfettiOverlay } from "@/components/shared/ConfettiOverlay";
import { getAllTopics, type VocabItem } from "@/data/vocabulary";
import { useSpeech } from "@/hooks/useSpeech";
import { useConfetti } from "@/hooks/useConfetti";
import { useAppStore } from "@/stores/appStore";

function getRandomItems(count: number): VocabItem[] {
  const all = getAllTopics().flatMap((c) => c.items);
  const shuffled = [...all].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function pickChoices(correct: VocabItem, pool: VocabItem[]): VocabItem[] {
  const others = pool.filter((w) => w.en !== correct.en).sort(() => Math.random() - 0.5).slice(0, 2);
  return [correct, ...others].sort(() => Math.random() - 0.5);
}

export default function PlayPage() {
  const [questionPool, setQuestionPool] = useState<VocabItem[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const { speak } = useSpeech();
  const { pieces, fire } = useConfetti();
  const { addStars, setQuizHighScore, quizHighScore } = useAppStore();

  const TOTAL = 8;

  const startGame = useCallback(() => {
    setQuestionPool(getRandomItems(TOTAL + 10));
    setQIndex(0);
    setScore(0);
    setSelected(null);
    setGameOver(false);
    setStarted(true);
  }, []);

  const current = questionPool[qIndex];
  const choices = useMemo(() => {
    if (!current) return [];
    return pickChoices(current, questionPool);
  }, [current, questionPool]);

  useEffect(() => {
    if (started && current) {
      const timer = setTimeout(() => speak(current.en, "en-US"), 400);
      return () => clearTimeout(timer);
    }
  }, [qIndex, started, current, speak]);

  const handleAnswer = useCallback(
    (item: VocabItem) => {
      if (selected) return;
      setSelected(item.en);

      const isCorrect = item.en === current.en;
      if (isCorrect) {
        setScore((s) => s + 1);
        fire();
      }

      setTimeout(() => {
        setSelected(null);
        if (qIndex + 1 >= TOTAL) {
          const finalScore = isCorrect ? score + 1 : score;
          addStars(finalScore);
          setQuizHighScore(finalScore);
          setGameOver(true);
        } else {
          setQIndex((i) => i + 1);
        }
      }, 1200);
    },
    [selected, current, qIndex, score, fire, addStars, setQuizHighScore]
  );

  // Start screen
  if (!started) {
    return (
      <div className="min-h-dvh flex flex-col">
        <div className="pt-10 pb-4 px-5 relative z-10">
          <BackButton label="Game Center" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-5 pb-28 relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-center"
          >
            <span className="text-8xl block mb-4">🎧</span>
            <h1
              className="text-3xl font-extrabold mb-2"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-accent-dark)" }}
            >
              Nghe & Chọn
            </h1>
            <p className="text-text-light mb-2 text-base">
              Nghe phát âm tiếng Anh, chọn đúng hình ảnh!
            </p>
            <p className="text-sm text-text-light mb-6">🏆 Kỷ lục: {quizHighScore}/{TOTAL}</p>

            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={startGame}
              className="px-10 py-4 rounded-3xl text-white text-xl font-bold shadow-xl"
              style={{ background: "linear-gradient(135deg, #34D399, #38BDF8)", fontFamily: "var(--font-heading)" }}
              id="btn-start-game"
            >
              Bắt Đầu! 🚀
            </motion.button>
          </motion.div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Game Over screen
  if (gameOver) {
    const stars = score >= 7 ? 3 : score >= 5 ? 2 : score >= 3 ? 1 : 0;
    return (
      <div className="min-h-dvh flex flex-col">
        <ConfettiOverlay pieces={pieces} />
        <div className="flex-1 flex flex-col items-center justify-center px-5 pb-28 relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-center glass-card p-8 max-w-sm w-full"
          >
            <span className="text-7xl block mb-3">
              {stars >= 3 ? "🏆" : stars >= 2 ? "🌟" : stars >= 1 ? "👍" : "💪"}
            </span>
            <h2
              className="text-3xl font-extrabold mb-2"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-primary)" }}
            >
              {stars >= 3 ? "Xuất sắc!" : stars >= 2 ? "Giỏi lắm!" : stars >= 1 ? "Tốt lắm!" : "Cố lên nào!"}
            </h2>
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3 + i * 0.2, type: "spring" }}
                  className="text-4xl"
                >
                  {i < stars ? "⭐" : "☆"}
                </motion.span>
              ))}
            </div>
            <p className="text-xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              {score} / {TOTAL} câu đúng
            </p>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={startGame}
              className="px-8 py-3 rounded-3xl text-white text-lg font-bold shadow-lg mb-3"
              style={{ background: "linear-gradient(135deg, #34D399, #38BDF8)", fontFamily: "var(--font-heading)" }}
              id="btn-play-again"
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

  // Quiz screen
  return (
    <div className="min-h-dvh flex flex-col">
      <ConfettiOverlay pieces={pieces} />

      <div className="pt-10 pb-2 px-5 relative z-10">
        <div className="flex items-center justify-between">
          <BackButton />
          <span className="text-sm font-bold px-3 py-1 rounded-full glass-card text-accent-dark">
            {qIndex + 1} / {TOTAL} &nbsp;|&nbsp; ⭐ {score}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-2.5 bg-white/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-accent"
            animate={{ width: `${((qIndex + 1) / TOTAL) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-5 pb-28 relative z-10">
        {/* Prompt */}
        <motion.div
          key={qIndex}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-6"
        >
          <p className="text-text-light text-base mb-2">🔊 Nghe và chọn đáp án đúng:</p>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => speak(current.en, "en-US")}
            className="px-6 py-3 rounded-2xl text-white text-xl font-bold shadow-lg"
            style={{ background: "linear-gradient(135deg, #C084FC, #818CF8)", fontFamily: "var(--font-heading)" }}
            id="btn-repeat"
          >
            🔊 Nghe lại
          </motion.button>
        </motion.div>

        {/* Choices */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
          {choices.map((item) => {
            const isCorrect = item.en === current.en;
            const isSelected = selected === item.en;
            let bg = "bg-white";
            if (selected) {
              if (isCorrect) bg = "bg-accent/20";
              else if (isSelected) bg = "bg-danger/20";
            }

            return (
              <motion.button
                key={item.en}
                whileTap={!selected ? { scale: 0.9 } : {}}
                onClick={() => handleAnswer(item)}
                disabled={!!selected}
                className={`${bg} rounded-3xl p-5 flex flex-col items-center gap-2 shadow-md border-2 transition-colors ${
                  isSelected && isCorrect
                    ? "border-accent"
                    : isSelected && !isCorrect
                    ? "border-danger"
                    : selected && isCorrect
                    ? "border-accent"
                    : "border-transparent"
                }`}
                id={`choice-${item.en.toLowerCase()}`}
              >
                <span className="text-5xl">{item.emoji}</span>
                <span className="text-xs font-bold text-text-light">{item.vi}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {selected && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-4 text-lg font-bold ${
                selected === current.en ? "text-accent-dark" : "text-danger"
              }`}
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {selected === current.en ? "Đúng rồi! 🎉" : `Sai rồi! Đáp án là ${current.emoji} ${current.vi}`}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <BottomNav />
    </div>
  );
}
