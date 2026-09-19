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
import { playSFX } from "@/utils/soundEffects";

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
    playSFX("tap");
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
        playSFX("correct");
        setScore((s) => s + 1);
        fire();
      } else {
        playSFX("boop");
      }

      setTimeout(() => {
        setSelected(null);
        if (qIndex + 1 >= TOTAL) {
          const finalScore = isCorrect ? score + 1 : score;
          addStars(finalScore);
          setQuizHighScore(finalScore);
          setGameOver(true);
          playSFX("cheer");
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
        <div className="pt-3 sm:pt-5 pb-2 px-4 sm:px-5 relative z-10 max-w-xl mx-auto w-full">
          <BackButton label="Game Center" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-20 lg:pb-14 relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-center"
          >
            <span className="text-5xl sm:text-6xl block mb-2">🎧</span>
            <h1
              className="text-2xl sm:text-3xl font-extrabold mb-1"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-accent-dark)" }}
            >
              Nghe & Chọn
            </h1>
            <p className="text-text-light mb-1 text-sm sm:text-base">
              Nghe phát âm tiếng Anh, chọn đúng hình ảnh!
            </p>
            <p className="text-xs sm:text-sm text-text-light mb-4">🏆 Kỷ lục: {quizHighScore}/{TOTAL}</p>

            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={startGame}
              className="px-8 py-3 rounded-2xl sm:rounded-3xl text-white text-lg sm:text-xl font-bold shadow-xl"
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
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-20 lg:pb-14 relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="glass-card p-8 rounded-3xl text-center max-w-sm w-full mx-4"
          >
            <span className="text-6xl block mb-2">{stars >= 2 ? "🎉" : "💪"}</span>
            <h2
              className="text-3xl font-extrabold mb-2"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-accent-dark)" }}
            >
              {stars === 3 ? "Xuất sắc!" : stars === 2 ? "Giỏi lắm!" : "Cố lên nhé!"}
            </h2>
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.2 }}
                  className="text-4xl"
                >
                  {i < stars ? "⭐" : "☆"}
                </motion.span>
              ))}
            </div>
            <p className="text-xl font-bold mb-2">
              {score} / {TOTAL} câu đúng
            </p>
            {score > quizHighScore && (
              <p className="text-sm text-accent-dark font-bold mb-4">🏆 Kỷ lục mới!</p>
            )}
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={startGame}
              className="px-8 py-3 rounded-3xl text-white text-lg font-bold shadow-lg mb-3 block w-full"
              style={{ background: "linear-gradient(135deg, #34D399, #38BDF8)", fontFamily: "var(--font-heading)" }}
              id="btn-play-again"
            >
              Chơi Lại 🔄
            </motion.button>
            <BackButton label="Game Center" />
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

      <div className="pt-3 sm:pt-5 pb-2 px-4 sm:px-5 relative z-10 max-w-2xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <BackButton />
          <span className="text-sm font-bold px-3 py-1 rounded-full glass-card text-accent-dark">
            {qIndex + 1} / {TOTAL} &nbsp;|&nbsp; ⭐ {score}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-2.5 h-2.5 bg-white/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-accent"
            animate={{ width: `${((qIndex + 1) / TOTAL) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-20 lg:pb-14 relative z-10">
        {/* Prompt */}
        <motion.div
          key={qIndex}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-3 sm:mb-4"
        >
          <p className="text-text-light text-base sm:text-lg mb-2 font-semibold">🔊 Nghe và chọn đáp án đúng:</p>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              playSFX("tap");
              speak(current.en, "en-US");
            }}
            className="px-6 py-2.5 sm:px-8 sm:py-3 rounded-2xl sm:rounded-3xl text-white text-lg sm:text-xl font-bold shadow-xl"
            style={{ background: "linear-gradient(135deg, #C084FC, #818CF8)", fontFamily: "var(--font-heading)" }}
            id="btn-repeat"
          >
            🔊 Nghe lại
          </motion.button>
        </motion.div>

        {/* Choices */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 w-full max-w-xl mx-auto">
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
                className={`${bg} rounded-2xl sm:rounded-3xl p-3 sm:p-4 flex flex-col items-center gap-1.5 sm:gap-2 shadow-lg border-4 transition-colors ${
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
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden flex items-center justify-center bg-slate-50/80 shadow-sm border border-slate-100">
                  {item.photoUrl || item.illustrationUrl ? (
                    <img
                      src={item.photoUrl || item.illustrationUrl}
                      alt={item.en}
                      className="w-full h-full object-cover rounded-2xl"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = "none";
                        const fallback = e.currentTarget.parentElement?.querySelector(".emoji-fallback") as HTMLElement;
                        if (fallback) fallback.style.display = "block";
                      }}
                    />
                  ) : null}
                  <span
                    className="emoji-fallback text-4xl sm:text-5xl md:text-6xl"
                    style={{ display: item.photoUrl || item.illustrationUrl ? "none" : "block" }}
                  >
                    {item.emoji}
                  </span>
                </div>
                <span className="text-xs sm:text-sm md:text-base font-bold text-text-light text-center">{item.vi}</span>
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
