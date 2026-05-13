"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";
import BottomNav from "@/components/layout/BottomNav";
import Mascot from "@/components/shared/Mascot";
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
  const { streak, totalStars, updateStreak, getDueWords } = useAppStore();

  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  const dueCount = getDueWords().length;

  return (
    <div className="min-h-dvh flex flex-col">
      {/* Header */}
      <div className="pt-12 pb-4 px-6 text-center relative z-10">
        {/* Mascot Greeting */}
        <motion.div
          initial={{ scale: 0, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          className="mb-1 mt-2 flex justify-center"
        >
          <Mascot
            mood="wave"
            message={
              dueCount > 0
                ? `Có ${dueCount} từ cần ôn tập nè!`
                : "Chào con! Hôm nay học gì nào? ✨"
            }
            size={100}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold mb-1"
          style={{ fontFamily: "var(--font-heading)", color: "var(--color-primary)" }}
        >
          JBAIkid
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-base text-text-light font-medium"
        >
          <span className="block text-[10px] opacity-30 mt-1">Version 2.0</span>
        </motion.p>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex justify-center gap-4 mt-3"
        >
          <div className="glass-card px-3 py-2 flex items-center gap-2">
            <span className="text-lg">🔥</span>
            <div className="text-left">
              <div className="text-[10px] text-text-light font-medium">Streak</div>
              <div className="text-base font-bold leading-none" style={{ fontFamily: "var(--font-heading)" }}>
                {streak} ngày
              </div>
            </div>
          </div>
          <div className="glass-card px-3 py-2 flex items-center gap-2">
            <span className="text-lg">⭐</span>
            <div className="text-left">
              <div className="text-[10px] text-text-light font-medium">Sao</div>
              <div className="text-base font-bold leading-none" style={{ fontFamily: "var(--font-heading)" }}>
                {totalStars}
              </div>
            </div>
          </div>
          {dueCount > 0 && (
            <Link href="/review">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="glass-card px-3 py-2 flex items-center gap-2 border-2 border-purple-300"
              >
                <span className="text-lg">📝</span>
                <div className="text-left">
                  <div className="text-[10px] text-text-light font-medium">Ôn tập</div>
                  <div
                    className="text-base font-bold leading-none"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--color-secondary)" }}
                  >
                    {dueCount} từ
                  </div>
                </div>
              </motion.div>
            </Link>
          )}
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

          {/* Review Card - prominent when there are due words */}
          {dueCount > 0 && (
            <Link href="/review" prefetch={false}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35, type: "spring", stiffness: 300 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-3xl p-5 flex items-center gap-5 shadow-lg cursor-pointer"
                style={{ background: "linear-gradient(135deg, #C084FC, #818CF8)" }}
              >
                <motion.span
                  className="text-5xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  📝
                </motion.span>
                <div className="text-white">
                  <h2
                    className="text-2xl font-bold leading-tight"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Ôn Tập
                  </h2>
                  <p className="text-sm opacity-90 font-medium">{dueCount} từ cần ôn hôm nay</p>
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
          )}

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
