"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";
import BottomNav from "@/components/layout/BottomNav";
import { useAppStore } from "@/stores/appStore";

const modes = [
  {
    href: "/learn",
    emoji: "📚",
    title: "Học Từ Vựng",
    subtitle: "Learn English Words",
    gradient: "gradient-learn",
    delay: 0.1,
  },
  {
    href: "/sing",
    emoji: "🎵",
    title: "Ca Hát",
    subtitle: "Sing Songs",
    gradient: "gradient-sing",
    delay: 0.2,
  },
  {
    href: "/play",
    emoji: "🎮",
    title: "Chơi Game",
    subtitle: "Fun Games",
    gradient: "gradient-play",
    delay: 0.3,
  },
];

export default function HomePage() {
  const { streak, totalStars, updateStreak } = useAppStore();

  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  return (
    <div className="min-h-dvh flex flex-col">
      {/* Header */}
      <div className="pt-12 pb-4 px-6 text-center relative z-10">
        {/* Mascot Greeting */}
        <motion.div
          initial={{ scale: 0, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          className="mb-1 mt-4 flex justify-center"
        >
          <img 
            src="/app_icon.png" 
            alt="JBAIkid Logo" 
            className="w-32 h-32 rounded-3xl shadow-xl border-4 border-white/50"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-1"
          style={{ fontFamily: "var(--font-heading)", color: "var(--color-primary)" }}
        >
          Kid
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-base text-text-light font-medium"
        >
          Chào con! Hôm nay học gì nào? ✨
          <span className="block text-[10px] opacity-30 mt-1">Version 1.9</span>
        </motion.p>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex justify-center gap-6 mt-4"
        >
          <div className="glass-card px-4 py-2 flex items-center gap-2">
            <span className="text-xl">🔥</span>
            <div className="text-left">
              <div className="text-xs text-text-light font-medium">Streak</div>
              <div className="text-lg font-bold leading-none" style={{ fontFamily: "var(--font-heading)" }}>
                {streak} ngày
              </div>
            </div>
          </div>
          <div className="glass-card px-4 py-2 flex items-center gap-2">
            <span className="text-xl">⭐</span>
            <div className="text-left">
              <div className="text-xs text-text-light font-medium">Sao</div>
              <div className="text-lg font-bold leading-none" style={{ fontFamily: "var(--font-heading)" }}>
                {totalStars}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mode Cards */}
      <div className="flex-1 px-5 pb-36 scroll-area relative z-10 w-full">
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto w-full">
          {modes.map((mode) => (
            <Link key={mode.href} href={mode.href} prefetch={false}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: mode.delay, type: "spring", stiffness: 300 }}
                whileTap={{ scale: 0.95, rotate: -1 }}
                whileHover={{ scale: 1.02 }}
                className={`${mode.gradient} rounded-3xl p-5 flex items-center gap-5 shadow-lg cursor-pointer`}
                id={`mode-${mode.href.replace("/", "")}`}
              >
                <motion.span
                  className="text-5xl"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  {mode.emoji}
                </motion.span>
                <div className="text-white">
                  <h2
                    className="text-2xl font-bold leading-tight"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {mode.title}
                  </h2>
                  <p className="text-sm opacity-90 font-medium">{mode.subtitle}</p>
                </div>
                <motion.span
                  className="ml-auto text-3xl text-white/70"
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ›
                </motion.span>
              </motion.div>
            </Link>
          ))}

          {/* Parent Zone Link */}
          <Link href="/parent" prefetch={false}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileTap={{ scale: 0.95 }}
              className="gradient-parent rounded-3xl p-4 flex items-center gap-4 shadow-md cursor-pointer mt-2"
              id="mode-parent"
            >
              <span className="text-3xl">👨‍👩‍👧</span>
              <div className="text-white">
                <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                  Khu Vực Phụ Huynh
                </h2>
                <p className="text-xs opacity-80">Xem tiến trình & cài đặt</p>
              </div>
              <span className="ml-auto text-xl text-white/50">🔒</span>
            </motion.div>
          </Link>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
