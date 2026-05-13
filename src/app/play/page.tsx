"use client";

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

  return (
    <div className="min-h-dvh flex flex-col">
      <div className="pt-10 pb-4 px-5 relative z-10 flex items-center justify-between">
        <BackButton label="Home" />
        <div className="glass-card px-3 py-1 text-sm font-bold flex items-center gap-1">
          <span>⭐</span>
          <span style={{ color: "var(--color-primary)", fontFamily: "var(--font-heading)" }}>
            {totalStars}
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-5 relative z-10 mb-4"
      >
        <span className="text-6xl block mb-2">🎮</span>
        <h1
          className="text-3xl font-extrabold"
          style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}
        >
          Game Center
        </h1>
        <p className="text-sm text-text-light mt-1">Chọn một trò chơi để bắt đầu nhé!</p>
      </motion.div>

      <div className="flex-1 px-5 pb-36 scroll-area relative z-10 w-full">
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto w-full">
          {games.map((game, i) => (
            <Link key={game.id} href={game.href}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileTap={{ scale: 0.95 }}
                className={`glass-card p-5 flex items-center gap-4 border-2 border-transparent hover:border-current transition-colors`}
                style={{ color: game.color }}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-sm ${game.bg}`}>
                  {game.emoji}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                    {game.title}
                  </h2>
                  <p className="text-xs font-medium text-text-light">{game.desc}</p>
                </div>
                <span className="text-2xl opacity-50">›</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
