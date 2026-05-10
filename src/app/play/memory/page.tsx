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
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === card1.id || c.id === card2.id ? { ...c, isMatched: true } : c
          ));
          setFlippedIds([]);
          setMatches(m => {
            const newMatches = m + 1;
            if (newMatches === PAIRS) {
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
        setTimeout(() => {
          setFlippedIds([]);
        }, 1000);
      }
    }
  };

  if (!started) {
    return (
      <div className="min-h-dvh flex flex-col">
        <div className="pt-10 pb-4 px-5 relative z-10">
          <BackButton label="Game Center" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-5 pb-28 relative z-10">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
            <span className="text-8xl block mb-4">🃏</span>
            <h1 className="text-3xl font-extrabold mb-2" style={{ fontFamily: "var(--font-heading)", color: "#C084FC" }}>
              Lật Thẻ Nhớ
            </h1>
            <p className="text-text-light mb-8">Tìm và lật 2 thẻ giống nhau (Hình và Chữ)!</p>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={startGame}
              className="px-10 py-4 rounded-3xl text-white text-xl font-bold shadow-xl"
              style={{ background: "linear-gradient(135deg, #C084FC, #A855F7)", fontFamily: "var(--font-heading)" }}
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
    const finalMoves = moves;
    const stars = finalMoves <= PAIRS + 2 ? 3 : finalMoves <= PAIRS + 6 ? 2 : 1;
    return (
      <div className="min-h-dvh flex flex-col">
        <ConfettiOverlay pieces={pieces} />
        <div className="flex-1 flex flex-col items-center justify-center px-5 pb-28 relative z-10">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center glass-card p-8 max-w-sm w-full">
            <span className="text-7xl block mb-3">{stars >= 3 ? "🏆" : stars >= 2 ? "🌟" : "👍"}</span>
            <h2 className="text-3xl font-extrabold mb-2" style={{ fontFamily: "var(--font-heading)", color: "#C084FC" }}>
              Chiến thắng!
            </h2>
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }} className="text-4xl">
                  {i < stars ? "⭐" : "☆"}
                </motion.span>
              ))}
            </div>
            <p className="text-lg font-bold mb-6 text-text-light">Hoàn thành trong {moves} lượt lật</p>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={startGame}
              className="px-8 py-3 rounded-3xl text-white text-lg font-bold shadow-lg mb-3"
              style={{ background: "linear-gradient(135deg, #C084FC, #A855F7)", fontFamily: "var(--font-heading)" }}
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
          <span className="text-sm font-bold px-3 py-1 rounded-full glass-card text-purple-600">
            Lượt: {moves} &nbsp;|&nbsp; Ghép: {matches}/{PAIRS}
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-24 relative z-10">
        <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
          <AnimatePresence>
            {cards.map((card) => {
              const isFlipped = flippedIds.includes(card.id) || card.isMatched;
              return (
                <motion.div
                  key={card.id}
                  className="aspect-[3/4] relative cursor-pointer perspective-1000"
                  onClick={() => handleCardClick(card.id)}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="w-full h-full preserve-3d"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    {/* Front (Hidden) */}
                    <div
                      className="absolute inset-0 backface-hidden rounded-2xl shadow-md border-2 border-purple-200 bg-purple-100 flex items-center justify-center"
                      style={{ background: "radial-gradient(circle, #f3e8ff 0%, #e9d5ff 100%)" }}
                    >
                      <span className="text-3xl opacity-50">🃏</span>
                    </div>

                    {/* Back (Revealed) */}
                    <div
                      className={`absolute inset-0 backface-hidden rounded-2xl shadow-md border-2 bg-white flex flex-col items-center justify-center p-2 ${
                        card.isMatched ? "border-green-400 bg-green-50" : "border-purple-400"
                      }`}
                      style={{ transform: "rotateY(180deg)" }}
                    >
                      {card.type === "emoji" ? (
                        <span className="text-5xl">{card.item.emoji}</span>
                      ) : (
                        <span className="text-lg font-bold text-center break-words w-full" style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}>
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
      <BottomNav />
    </div>
  );
}
