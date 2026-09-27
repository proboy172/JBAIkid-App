"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import BackButton from "@/components/layout/BackButton";
import BottomNav from "@/components/layout/BottomNav";
import { useAppStore } from "@/stores/appStore";
import { getLearnedGameData } from "@/utils/gameLearnedHelper";
import NextLessonBanner from "@/components/shared/NextLessonBanner";

const games = [
  {
    id: "quiz",
    href: "/play/quiz",
    title: "Nghe & Chọn",
    desc: "Nghe phát âm và chọn đúng hình.",
    emoji: "🎧",
    color: "#38BDF8", // blue
    bg: "bg-blue-50",
    minWords: 3,
  },
  {
    id: "memory",
    href: "/play/memory",
    title: "Lật Thẻ Nhớ",
    desc: "Tìm và ghép 2 hình giống nhau.",
    emoji: "❓",
    color: "#C084FC", // purple
    bg: "bg-purple-50",
    minWords: 3,
  },
  {
    id: "match",
    href: "/play/match",
    title: "Nối Hình",
    desc: "Nối từ tiếng Anh với hình đúng.",
    emoji: "🧩",
    color: "#34D399", // green
    bg: "bg-emerald-50",
    minWords: 4,
  },
  {
    id: "tracing",
    href: "/play/tracing",
    title: "Tập Tô Nét",
    desc: "Tô chữ A-Z & số 1-10 nhận sao.",
    emoji: "✍️",
    color: "#F43F5E", // rose
    bg: "bg-rose-50",
    minWords: 0,
  },
  {
    id: "stickers",
    href: "/play/stickers",
    title: "Sổ Nhãn Dán",
    desc: "Dùng sao để đổi nhãn dán.",
    emoji: "📔",
    color: "#FBBF24", // yellow
    bg: "bg-amber-50",
    minWords: 0,
  },
];

export default function PlayMenuPage() {
  const { totalStars, learnedWords } = useAppStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { learnedCount, nextTopic } = useMemo(
    () => getLearnedGameData(learnedWords),
    [learnedWords]
  );

  return (
    <div className="min-h-dvh flex flex-col">
      <div className="pt-3 sm:pt-5 pb-2 px-5 relative z-10 flex items-center justify-between max-w-2xl mx-auto w-full">
        <BackButton label="Home" />
        <div className="glass-card px-3 py-1 text-sm font-bold flex items-center gap-1">
          <span>⭐</span>
          <span style={{ color: "var(--color-primary)", fontFamily: "var(--font-heading)" }}>
            {isMounted ? totalStars : 0}
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-5 relative z-10 mb-2"
      >
        <span className="text-4xl sm:text-5xl block mb-1">🎮</span>
        <h1
          className="text-2xl sm:text-3xl font-extrabold"
          style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}
        >
          Game Center
        </h1>
        <p className="text-xs sm:text-sm text-text-light mt-0.5">Chọn một trò chơi để bắt đầu nhé!</p>
      </motion.div>

      {/* Next Lesson Recommendation Banner */}
      {isMounted && (
        <div className="px-4 sm:px-6 max-w-2xl mx-auto w-full relative z-10 mb-3">
          <NextLessonBanner nextTopic={nextTopic} learnedCount={learnedCount} />
        </div>
      )}

      <div className="flex-1 px-4 sm:px-6 pb-32 sm:pb-36 lg:pb-40 scroll-area relative z-10 w-full flex flex-col justify-start">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 max-w-2xl mx-auto w-full">
          {games.map((game, i) => {
            const isLocked = game.minWords > 0 && learnedCount < game.minWords;
            return (
              <Link key={game.id} href={game.href} className="w-full">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ translateY: -2 }}
                  className="glass-card h-[96px] sm:h-[102px] px-3.5 sm:px-4 py-2.5 flex items-center gap-3 sm:gap-3.5 border-2 border-transparent hover:border-current transition-all cursor-pointer group"
                  style={{ color: game.color }}
                >
                  <div className={`w-12 h-12 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-sm shrink-0 ${game.bg} group-hover:scale-105 transition-transform`}>
                    {game.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h2 className="text-base sm:text-lg font-bold truncate leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                        {game.title}
                      </h2>
                      {isLocked ? (
                        <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded-md shrink-0">
                          Cần học bài
                        </span>
                      ) : game.minWords > 0 ? (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-md shrink-0">
                          {learnedCount} từ
                        </span>
                      ) : null}
                    </div>
                    <p className="text-xs text-text-light font-medium truncate mt-0.5">{game.desc}</p>
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100/80 flex items-center justify-center text-gray-400 group-hover:text-current group-hover:translate-x-0.5 transition-all shrink-0">
                    <span className="text-sm font-black">›</span>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
