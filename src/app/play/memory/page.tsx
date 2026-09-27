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

interface Card {
  id: string;
  item: VocabItem;
  type: "emoji" | "text";
  isFlipped: boolean;
  isMatched: boolean;
}

function generateCards(count: number): Card[] {
  const all = getAllTopics().flatMap((c) => c.items);
  const selected = [...all].sort(() => Math.random() - 0.5).slice(0, count);
  
  const cards: Card[] = [];
  selected.forEach((item, index) => {
    cards.push({ id: `emoji-${index}`, item, type: "emoji", isFlipped: false, isMatched: false });
    cards.push({ id: `text-${index}`, item, type: "text", isFlipped: false, isMatched: false });
  });

  return cards.sort(() => Math.random() - 0.5);
}

export default function MemoryGamePage() {
  const PAIRS = 6;
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  
  const { speak } = useSpeech();
  const { pieces, fire } = useConfetti();
  const { addStars } = useAppStore();

  const startGame = useCallback(() => {
    playSFX("tap");
    setCards(generateCards(PAIRS));
    setFlippedIds([]);
    setMoves(0);
    setMatches(0);
    setGameOver(false);
    setStarted(true);
  }, []);

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

  if (!started) {
    return (
      <div className="h-dvh max-h-dvh w-full overflow-hidden flex flex-col justify-between select-none">
        <div className="pt-2 sm:pt-4 pb-1 px-4 sm:px-5 relative z-10 shrink-0">
          <BackButton label="Game Center" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-2 relative z-10 overflow-hidden">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
            <span className="text-5xl sm:text-7xl block mb-2">❓</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-1" style={{ fontFamily: "var(--font-heading)", color: "#C084FC" }}>
              Lật Thẻ Nhớ
            </h1>
            <p className="text-text-light mb-4 sm:mb-6 text-xs sm:text-base">Tìm và lật 2 thẻ giống nhau (Hình và Chữ)!</p>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={startGame}
              className="px-8 py-3 rounded-2xl sm:rounded-3xl text-white text-lg sm:text-xl font-bold shadow-xl cursor-pointer"
              style={{ background: "linear-gradient(135deg, #C084FC, #A855F7)", fontFamily: "var(--font-heading)" }}
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
    const finalMoves = moves;
    const stars = finalMoves <= PAIRS + 2 ? 3 : finalMoves <= PAIRS + 6 ? 2 : 1;
    return (
      <div className="h-dvh max-h-dvh w-full overflow-hidden flex flex-col justify-between select-none">
        <ConfettiOverlay pieces={pieces} />
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-2 relative z-10 overflow-hidden">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center glass-card p-6 sm:p-8 max-w-sm w-full mx-4">
            <span className="text-5xl sm:text-6xl block mb-2">{stars >= 3 ? "🏆" : stars >= 2 ? "🌟" : "👍"}</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-1" style={{ fontFamily: "var(--font-heading)", color: "#C084FC" }}>
              Chiến thắng!
            </h2>
            <div className="flex justify-center gap-1 mb-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }} className="text-3xl">
                  {i < stars ? "⭐" : "☆"}
                </motion.span>
              ))}
            </div>
            <p className="text-base sm:text-lg font-bold mb-4 text-text-light">Hoàn thành trong {moves} lượt lật</p>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={startGame}
              className="px-6 py-2.5 rounded-2xl text-white text-base font-bold shadow-lg mb-2 block w-full cursor-pointer"
              style={{ background: "linear-gradient(135deg, #C084FC, #A855F7)", fontFamily: "var(--font-heading)" }}
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
