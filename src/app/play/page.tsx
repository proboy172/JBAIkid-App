"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import BackButton from "@/components/layout/BackButton";
import BottomNav from "@/components/layout/BottomNav";
import { useAppStore } from "@/stores/appStore";

const games = [
  {
    id: "quiz",
    href: "/play/quiz",
    title: "Nghe & Chọn",
    desc: "Nghe phát âm và chọn đúng hình.",
    emoji: "🎧",
    color: "#38BDF8", // blue
    bg: "bg-blue-50",
  },
  {
    id: "memory",
    href: "/play/memory",
    title: "Lật Thẻ Nhớ",
    desc: "Tìm và ghép 2 hình giống nhau.",
    emoji: "❓",
    color: "#C084FC", // purple
    bg: "bg-purple-50",
  },
  {
    id: "match",
    href: "/play/match",
    title: "Nối Hình",
    desc: "Nối từ tiếng Anh với hình đúng.",
    emoji: "🧩",
    color: "#34D399", // green
    bg: "bg-emerald-50",
  },
  {
    id: "tracing",
    href: "/play/tracing",
    title: "Tập Tô Nét",
    desc: "Tô chữ A-Z & số 1-10 nhận sao.",
    emoji: "✍️",
    color: "#F43F5E", // rose
    bg: "bg-rose-50",
  },
  {
    id: "stickers",
    href: "/play/stickers",
    title: "Sổ Nhãn Dán",
    desc: "Dùng sao để đổi nhãn dán.",
    emoji: "📔",
    color: "#FBBF24", // yellow
    bg: "bg-amber-50",
  },
];

export default function PlayMenuPage() {
  const { totalStars } = useAppStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
        className="text-center px-5 relative z-10 mb-3"
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

      <div className="flex-1 px-4 sm:px-6 pb-24 lg:pb-16 scroll-area relative z-10 w-full flex flex-col justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 max-w-2xl mx-auto w-full">
          {games.map((game, i) => (
            <Link key={game.id} href={game.href} className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileTap={{ scale: 0.98 }}
                whileHover={{ translateY: -2 }}
                className="glass-card h-[92px] sm:h-[98px] px-3.5 sm:px-4 py-3 flex items-center gap-3 sm:gap-3.5 border-2 border-transparent hover:border-current transition-all cursor-pointer group"
                style={{ color: game.color }}
              >
                <div className={`w-12 h-12 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-sm shrink-0 ${game.bg} group-hover:scale-105 transition-transform`}>
                  {game.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base sm:text-lg font-bold truncate leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                    {game.title}
                  </h2>
                  <p className="text-xs text-text-light font-medium truncate mt-0.5">{game.desc}</p>
                </div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100/80 flex items-center justify-center text-gray-400 group-hover:text-current group-hover:translate-x-0.5 transition-all shrink-0">
                  <span className="text-sm font-black">›</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
