"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/layout/BackButton";
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
      <div className="h-dvh max-h-dvh w-full overflow-hidden flex flex-col justify-between select-none">
        <div className="pt-2 sm:pt-4 pb-1 px-4 sm:px-5 relative z-10 max-w-xl mx-auto w-full shrink-0">
          <BackButton label="Game Center" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-2 relative z-10 overflow-hidden">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-center"
          >
            <span className="text-4xl sm:text-6xl block mb-1 sm:mb-2">🎧</span>
            <h1
              className="text-xl sm:text-3xl font-extrabold mb-1"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-accent-dark)" }}
            >
              Nghe & Chọn
            </h1>
            <p className="text-text-light mb-1 text-xs sm:text-base">
              Nghe phát âm tiếng Anh, chọn đúng hình ảnh!
            </p>
            <p className="text-xs sm:text-sm text-text-light mb-3 sm:mb-4">🏆 Kỷ lục: {quizHighScore}/{TOTAL}</p>

            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={startGame}
              className="px-6 py-2.5 sm:px-8 sm:py-3 rounded-2xl sm:rounded-3xl text-white text-base sm:text-xl font-bold shadow-xl cursor-pointer"
              style={{ background: "linear-gradient(135deg, #34D399, #38BDF8)", fontFamily: "var(--font-heading)" }}
              id="btn-start-game"
            >
              Bắt Đầu! 🚀
            </motion.button>
          </motion.div>
        </div>
        <div className="h-2 shrink-0" />
      </div>
    );
  }

  // Game Over screen
  if (gameOver) {
    const stars = score >= 7 ? 3 : score >= 5 ? 2 : score >= 3 ? 1 : 0;
    return (
      <div className="h-dvh max-h-dvh w-full overflow-hidden flex flex-col justify-between select-none">
        <ConfettiOverlay pieces={pieces} />
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-2 relative z-10 overflow-hidden">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="glass-card p-5 sm:p-7 rounded-3xl text-center max-w-sm w-full mx-4"
          >
            <span className="text-4xl sm:text-5xl block mb-1">{stars >= 2 ? "🎉" : "💪"}</span>
            <h2
              className="text-xl sm:text-2xl font-extrabold mb-1"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-accent-dark)" }}
            >
              {stars === 3 ? "Xuất sắc!" : stars === 2 ? "Giỏi lắm!" : "Cố lên nhé!"}
            </h2>
            <div className="flex justify-center gap-1 mb-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.2 }}
                  className="text-2xl sm:text-3xl"
                >
                  {i < stars ? "⭐" : "☆"}
                </motion.span>
              ))}
            </div>
            <p className="text-base sm:text-lg font-bold mb-1">
              {score} / {TOTAL} câu đúng
            </p>
            {score > quizHighScore && (
              <p className="text-xs sm:text-sm text-accent-dark font-bold mb-2">🏆 Kỷ lục mới!</p>
            )}
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={startGame}
              className="px-6 py-2.5 rounded-2xl sm:rounded-3xl text-white text-base font-bold shadow-lg mb-2 block w-full cursor-pointer"
              style={{ background: "linear-gradient(135deg, #34D399, #38BDF8)", fontFamily: "var(--font-heading)" }}
              id="btn-play-again"
            >
              Chơi Lại 🔄
            </motion.button>
            <BackButton label="Game Center" />
          </motion.div>
        </div>
        <div className="h-2 shrink-0" />
      </div>
    );
  }

  // Quiz screen
  return (
    <div className="h-dvh max-h-dvh w-full overflow-hidden flex flex-col justify-between select-none">
      <ConfettiOverlay pieces={pieces} />

      {/* Header */}
      <div className="pt-2 sm:pt-3 pb-1 px-4 sm:px-5 relative z-10 max-w-2xl mx-auto w-full shrink-0">
        <div className="flex items-center justify-between">
          <BackButton />
          <span className="text-xs sm:text-sm font-bold px-3 py-1 rounded-full glass-card text-accent-dark">
            {qIndex + 1} / {TOTAL} &nbsp;|&nbsp; ⭐ {score}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-1.5 h-2 bg-white/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-accent"
            animate={{ width: `${((qIndex + 1) / TOTAL) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Main Quiz Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-3 sm:px-4 py-1 overflow-hidden relative z-10 w-full max-w-2xl mx-auto">
        {/* Prompt */}
        <motion.div
          key={qIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-2 landscape:mb-1 shrink-0"
        >
          <p className="text-text-light text-xs sm:text-sm mb-1 font-semibold">🔊 Nghe và chọn đáp án đúng:</p>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              playSFX("tap");
              speak(current.en, "en-US");
            }}
            className="px-5 py-1.5 sm:px-7 sm:py-2 rounded-2xl sm:rounded-3xl text-white text-sm sm:text-base font-bold shadow-md cursor-pointer"
            style={{ background: "linear-gradient(135deg, #C084FC, #818CF8)", fontFamily: "var(--font-heading)" }}
            id="btn-repeat"
          >
            🔊 Nghe lại
          </motion.button>
        </motion.div>

        {/* Choices Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-lg mx-auto shrink-0">
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
                whileTap={!selected ? { scale: 0.92 } : {}}
                onClick={() => handleAnswer(item)}
                disabled={!!selected}
                className={`${bg} rounded-2xl p-2 sm:p-3 flex flex-col items-center gap-1 sm:gap-1.5 shadow-md border-3 transition-colors cursor-pointer ${
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
                <div className="w-14 h-14 sm:w-20 sm:h-20 landscape:w-14 landscape:h-14 rounded-xl sm:rounded-2xl overflow-hidden flex items-center justify-center bg-slate-50/80 shadow-inner border border-slate-100">
                  {item.photoUrl || item.illustrationUrl ? (
                    <img
                      src={item.photoUrl || item.illustrationUrl}
                      alt={item.en}
                      className="w-full h-full object-cover rounded-xl"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = "none";
                        const fallback = e.currentTarget.parentElement?.querySelector(".emoji-fallback") as HTMLElement;
                        if (fallback) fallback.style.display = "block";
                      }}
                    />
                  ) : null}
                  <span
                    className="emoji-fallback text-3xl sm:text-4xl landscape:text-3xl"
                    style={{ display: item.photoUrl || item.illustrationUrl ? "none" : "block" }}
                  >
                    {item.emoji}
                  </span>
                </div>
                <span className="text-[11px] sm:text-xs md:text-sm font-bold text-text-light text-center leading-tight truncate max-w-full px-0.5">
                  {item.vi}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Feedback message */}
        <div className="min-h-[28px] flex items-center justify-center mt-1.5">
          <AnimatePresence>
            {selected && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`text-sm sm:text-base font-bold text-center ${
                  selected === current.en ? "text-accent-dark" : "text-danger"
                }`}
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {selected === current.en ? "Đúng rồi! 🎉" : `Sai rồi! Đáp án: ${current.emoji} ${current.vi}`}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Safe bottom spacer */}
      <div className="h-1 sm:h-2 shrink-0" />
    </div>
  );
}
