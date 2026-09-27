"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/layout/BackButton";
import { ConfettiOverlay } from "@/components/shared/ConfettiOverlay";
import type { VocabItem } from "@/data/vocabulary";
import { useSpeech } from "@/hooks/useSpeech";
import { useConfetti } from "@/hooks/useConfetti";
import { useAppStore } from "@/stores/appStore";
import { playSFX } from "@/utils/soundEffects";
import { getLearnedGameData } from "@/utils/gameLearnedHelper";
import GameLockedLearnPrompt from "@/components/shared/GameLockedLearnPrompt";
import NextLessonBanner from "@/components/shared/NextLessonBanner";

interface Card {
  id: string;
  item: VocabItem;
  type: "emoji" | "text";
  isFlipped: boolean;
  isMatched: boolean;
}

function generateCards(pool: VocabItem[], count: number): Card[] {
  const selected = [...pool].sort(() => Math.random() - 0.5).slice(0, count);
  
  const cards: Card[] = [];
  selected.forEach((item, index) => {
    cards.push({ id: `emoji-${index}`, item, type: "emoji", isFlipped: false, isMatched: false });
    cards.push({ id: `text-${index}`, item, type: "text", isFlipped: false, isMatched: false });
  });

  return cards.sort(() => Math.random() - 0.5);
}

export default function MemoryGamePage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  
  const { speak } = useSpeech();
  const { pieces, fire } = useConfetti();
  const { addStars, learnedWords } = useAppStore();

  // Extract learned words & next lesson to recommend
  const { learnedItems, learnedCount, nextTopic, hasEnoughForMemory } = useMemo(
    () => getLearnedGameData(learnedWords),
    [learnedWords]
  );

  const PAIRS = Math.min(6, Math.max(3, Math.min(learnedItems.length, 6)));

  const startGame = useCallback(() => {
    playSFX("tap");
    setCards(generateCards(learnedItems, PAIRS));
    setFlippedIds([]);
    setMoves(0);
    setMatches(0);
    setGameOver(false);
    setStarted(true);
  }, [learnedItems, PAIRS]);

  const handleCardClick = (id: string) => {
    if (flippedIds.length === 2) return; // Prevent clicking more than 2
    if (flippedIds.includes(id)) return; // Prevent clicking already flipped
    
    const card = cards.find(c => c.id === id);
    if (card?.isMatched) return;

    playSFX("pop");

    if (card?.type === "text" || card?.type === "emoji") {
      speak(card.item.en, "en-US");
    }

    const newFlipped = [...flippedIds, id];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const card1 = cards.find(c => c.id === newFlipped[0]);
      const card2 = cards.find(c => c.id === newFlipped[1]);

      if (card1?.item.en === card2?.item.en && card1 && card2) {
        // Match!
        playSFX("correct");
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === card1.id || c.id === card2.id ? { ...c, isMatched: true } : c
          ));
          setFlippedIds([]);
          setMatches(m => {
            const newMatches = m + 1;
            if (newMatches === PAIRS) {
              playSFX("cheer");
              fire();
              setGameOver(true);
              // moves was incremented above this block, so current moves value is accurate
              const finalMoves = moves + 1;
              const stars = finalMoves <= PAIRS + 2 ? 3 : finalMoves <= PAIRS + 6 ? 2 : 1;
              addStars(stars);
            }
            return newMatches;
          });
        }, 500);
      } else {
        // No match
        playSFX("boop");
        setTimeout(() => {
          setFlippedIds([]);
        }, 1000);
      }
    }
  };

  // If child hasn't learned enough words (needs at least 3)
  if (!hasEnoughForMemory) {
    return (
      <GameLockedLearnPrompt
        gameTitle="Lật Thẻ Nhớ"
        gameIcon="❓"
        minWordsRequired={3}
        currentLearnedCount={learnedCount}
        nextTopic={nextTopic}
      />
    );
  }

  if (!started) {
    return (
      <div className="h-dvh max-h-dvh w-full overflow-hidden flex flex-col justify-between select-none">
        <div className="pt-2 sm:pt-4 pb-1 px-4 sm:px-5 relative z-10 shrink-0">
          <BackButton label="Game Center" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-2 relative z-10 overflow-hidden w-full max-w-md mx-auto">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center w-full flex flex-col items-center">
            <span className="text-4xl sm:text-5xl block mb-1">❓</span>
            <h1 className="text-xl sm:text-3xl font-extrabold mb-0.5" style={{ fontFamily: "var(--font-heading)", color: "#C084FC" }}>
              Lật Thẻ Nhớ
            </h1>
            <p className="text-text-light mb-1 text-xs sm:text-sm">Tìm và lật 2 thẻ giống nhau (Hình và Chữ)!</p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold mb-2 shadow-xs">
              <span>🎯 Ghép {PAIRS} cặp từ {learnedCount} từ bé đã học</span>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={startGame}
              className="px-7 py-2.5 sm:px-8 sm:py-3 rounded-2xl sm:rounded-3xl text-white text-base sm:text-lg font-bold shadow-xl cursor-pointer mb-3"
              style={{ background: "linear-gradient(135deg, #C084FC, #A855F7)", fontFamily: "var(--font-heading)" }}
            >
              Bắt Đầu! 🚀
            </motion.button>

            {/* Next lesson recommendation to expand game */}
            <div className="w-full mt-1">
              <NextLessonBanner nextTopic={nextTopic} learnedCount={learnedCount} compact />
            </div>
          </motion.div>
        </div>
        <div className="h-2 shrink-0" />
      </div>
    );
  }

  if (gameOver) {
    const finalMoves = moves;
    const stars = finalMoves <= PAIRS + 2 ? 3 : finalMoves <= PAIRS + 6 ? 2 : 1;
    return (
      <div className="h-dvh max-h-dvh w-full overflow-hidden flex flex-col justify-between select-none">
        <ConfettiOverlay pieces={pieces} />
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-2 relative z-10 overflow-hidden w-full max-w-sm mx-auto">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center glass-card p-4 sm:p-6 rounded-3xl w-full mx-4 flex flex-col items-center">
            <span className="text-3xl sm:text-4xl block mb-0.5">{stars >= 3 ? "🏆" : stars >= 2 ? "🌟" : "👍"}</span>
            <h2 className="text-lg sm:text-2xl font-extrabold mb-0.5" style={{ fontFamily: "var(--font-heading)", color: "#C084FC" }}>
              Chiến thắng!
            </h2>
            <div className="flex justify-center gap-1 mb-1.5">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }} className="text-2xl">
                  {i < stars ? "⭐" : "☆"}
                </motion.span>
              ))}
            </div>
            <p className="text-sm sm:text-base font-bold mb-2 text-text-light">Hoàn thành trong {moves} lượt lật</p>

            <div className="flex items-center gap-2 w-full mb-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={startGame}
                className="flex-1 py-2 rounded-2xl text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer"
                style={{ background: "linear-gradient(135deg, #C084FC, #A855F7)", fontFamily: "var(--font-heading)" }}
              >
                Chơi Lại 🔄
              </motion.button>
              <BackButton label="Thoát" />
            </div>

            {/* Next lesson recommendation to expand game */}
            <div className="w-full mt-1">
              <NextLessonBanner nextTopic={nextTopic} learnedCount={learnedCount} compact />
            </div>
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
        <div className="flex items-center justify-between max-w-4xl mx-auto w-full">
          <BackButton />
          <span className="text-xs sm:text-sm font-bold px-3 py-1 rounded-full glass-card text-purple-600">
            Lượt: {moves} &nbsp;|&nbsp; Ghép: {matches}/{PAIRS}
          </span>
        </div>
      </div>

      {/* Cards Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-2 sm:px-4 py-1 overflow-hidden relative z-10 w-full max-w-sm sm:max-w-xl md:max-w-4xl mx-auto">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 landscape:grid-cols-6 gap-2 sm:gap-2.5 w-full shrink-0">
          <AnimatePresence>
            {cards.map((card) => {
              const isFlipped = flippedIds.includes(card.id) || card.isMatched;
              return (
                <motion.div
                  key={card.id}
                  className="aspect-[3/4] relative cursor-pointer perspective-1000 max-h-[min(135px,17vh)] landscape:max-h-[min(125px,38vh)]"
                  onClick={() => handleCardClick(card.id)}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="w-full h-full"
                    style={{ transformStyle: "preserve-3d" }}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    {/* Front (Hidden) */}
                    <div
                      className="absolute inset-0 rounded-2xl shadow-md border-2 border-purple-300 flex items-center justify-center overflow-hidden"
                      style={{ 
                        background: "repeating-linear-gradient(45deg, #f3e8ff, #f3e8ff 10px, #e9d5ff 10px, #e9d5ff 20px)",
                        backfaceVisibility: "hidden", 
                        WebkitBackfaceVisibility: "hidden" 
                      }}
                    >
                      <div className="bg-white/80 p-1.5 sm:p-2.5 rounded-full shadow-sm backdrop-blur-sm w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center">
                        <span className="text-2xl sm:text-3xl text-purple-500 drop-shadow-md font-black">?</span>
                      </div>
                    </div>

                    {/* Back (Revealed) */}
                    <div
                      className={`absolute inset-0 rounded-2xl shadow-md border-2 bg-white flex flex-col items-center justify-center p-1.5 sm:p-2 ${
                        card.isMatched ? "border-green-400 bg-green-50" : "border-purple-400"
                      }`}
                      style={{ 
                        transform: "rotateY(180deg)", 
                        backfaceVisibility: "hidden", 
                        WebkitBackfaceVisibility: "hidden" 
                      }}
                    >
                      {card.type === "emoji" ? (
                        <div className="w-full h-full flex items-center justify-center p-0.5 overflow-hidden">
                          {card.item.photoUrl || card.item.illustrationUrl ? (
                            <img
                              src={card.item.photoUrl || card.item.illustrationUrl}
                              alt={card.item.en}
                              className="w-full h-full object-contain max-h-[65px] sm:max-h-[85px] landscape:max-h-[60px] rounded-lg"
                              onError={(e) => {
                                (e.currentTarget as HTMLElement).style.display = "none";
                                const fallback = e.currentTarget.parentElement?.querySelector(".emoji-fallback") as HTMLElement;
                                if (fallback) fallback.style.display = "block";
                              }}
                            />
                          ) : null}
                          <span
                            className="emoji-fallback text-3xl sm:text-4xl landscape:text-3xl"
                            style={{ display: card.item.photoUrl || card.item.illustrationUrl ? "none" : "block" }}
                          >
                            {card.item.emoji}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[11px] sm:text-xs md:text-sm font-bold text-center break-words w-full px-0.5 leading-tight" style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}>
                          {card.item.en}
                        </span>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
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
