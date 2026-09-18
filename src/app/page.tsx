"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import BottomNav from "@/components/layout/BottomNav";
import Mascot from "@/components/shared/Mascot";
import DailyRewardPopup from "@/components/shared/DailyRewardPopup";
import BgmPlayer from "@/components/shared/BgmPlayer";
import BadgesModal from "@/components/shared/BadgesModal";
import TreasureChestPopup from "@/components/shared/TreasureChestPopup";
import PwaPrompt from "@/components/shared/PwaPrompt";
import { useAppStore } from "@/stores/appStore";
import { playSFX } from "@/utils/soundEffects";
import { Trophy, Smartphone, Gift, Sparkles } from "lucide-react";

const modes = [
  {
    href: "/learn",
    emoji: "📚",
    title: "Học Từ Vựng",
    subtitle: "Learn English Words",
    gradient: "gradient-learn",
    delay: 0.05,
  },
  {
    href: "/sing",
    emoji: "🎵",
    title: "Ca Hát",
    subtitle: "Sing Karaoke Songs",
    gradient: "gradient-sing",
    delay: 0.1,
  },
  {
    href: "/play",
    emoji: "🎮",
    title: "Chơi Game",
    subtitle: "Fun Mini Games",
    gradient: "gradient-play",
    delay: 0.15,
  },
  {
    href: "/play/stickers",
    emoji: "🎨",
    title: "Phòng Sáng Tạo",
    subtitle: "Stickers & Tranh Dán",
    gradient: "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500",
    delay: 0.2,
  },
];

export default function HomePage() {
  const { 
    streak, totalStars, updateStreak, getDueWords, 
    dailyWordsLearned, hasClaimedDailyChest, unlockedBadges 
  } = useAppStore();
  const [isMounted, setIsMounted] = useState(false);
  const [showBadges, setShowBadges] = useState(false);
  const [showChest, setShowChest] = useState(false);
  const [showPwa, setShowPwa] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    updateStreak();
  }, [updateStreak]);

  const dueCount = isMounted ? getDueWords().length : 0;
  const today = new Date().toISOString().split("T")[0];
  const todayWords = isMounted ? (dailyWordsLearned?.[today] || []) : [];
  const todayWordsCount = todayWords.length;
  const isChestClaimed = isMounted ? !!hasClaimedDailyChest?.[today] : false;
  const canClaimChest = todayWordsCount >= 5 && !isChestClaimed;

  return (
    <div className="min-h-dvh flex flex-col">
      {/* Top Utility Bar */}
      <div className="pt-10 pb-2 px-5 relative z-20 flex items-center justify-between max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <BgmPlayer />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              playSFX("tap");
              setShowPwa(true);
            }}
            className="glass-card px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[11px] font-bold text-gray-700 hover:text-primary transition-colors border border-gray-200"
            title="Cài đặt ứng dụng về màn hình chính"
          >
            <Smartphone size={14} className="text-primary" />
            <span className="hidden sm:inline">Cài App</span>
          </motion.button>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            playSFX("tap");
            setShowBadges(true);
          }}
          className="glass-card px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[11px] font-bold text-amber-700 border border-amber-200 shadow-sm hover:border-amber-300 transition-colors"
          title="Xem bộ sưu tập huy hiệu"
        >
          <Trophy size={14} className="text-amber-500" />
          <span>Huy Hiệu</span>
          <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.2 rounded-full font-black">
            {isMounted ? (unlockedBadges?.length || 0) : 0}
          </span>
        </motion.button>
      </div>

      {/* Header */}
      <div className="pt-2 pb-4 px-6 text-center relative z-10">
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
              canClaimChest
                ? "Bé ơi! Hòm kho báu đã mở, bấm nhận sao nào! 🎁"
                : dueCount > 0
                ? `Có ${dueCount} từ cần ôn tập nè!`
                : "Chào con! Chạm vào Bino để chơi nhé! ✨"
            }
            size={105}
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
          className="flex justify-center gap-3 mt-3"
        >
          <div className="glass-card px-3 py-2 flex items-center gap-2">
            <span className="text-lg">🔥</span>
            <div className="text-left">
              <div className="text-[10px] text-text-light font-medium">Streak</div>
              <div className="text-base font-bold leading-none" style={{ fontFamily: "var(--font-heading)" }}>
                {isMounted ? streak : 0} ngày
              </div>
            </div>
          </div>
          <div className="glass-card px-3 py-2 flex items-center gap-2">
            <span className="text-lg">⭐</span>
            <div className="text-left">
              <div className="text-[10px] text-text-light font-medium">Sao</div>
              <div className="text-base font-bold leading-none" style={{ fontFamily: "var(--font-heading)" }}>
                {isMounted ? totalStars : 0}
              </div>
            </div>
          </div>
          {isMounted && dueCount > 0 && (
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

        {/* Daily Quest Chest Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => {
            playSFX("tap");
            setShowChest(true);
          }}
          className={`max-w-md mx-auto mt-4 p-3 rounded-2xl glass-card border-2 cursor-pointer flex items-center gap-3 transition-all select-none ${
            canClaimChest
              ? "border-amber-400 bg-amber-50/95 shadow-lg shadow-amber-200/60"
              : "border-purple-200/60 hover:border-purple-300"
          }`}
        >
          <div className="text-3xl shrink-0">
            <span className={canClaimChest ? "block animate-chest-wobble" : ""}>
              {isChestClaimed ? "👑" : canClaimChest ? "🎁" : "📦"}
            </span>
          </div>

          <div className="flex-1 text-left min-w-0">
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-xs font-bold text-gray-800 truncate" style={{ fontFamily: "var(--font-heading)" }}>
                {canClaimChest ? "🎉 Mở Hòm Nhận 10 ⭐!" : "Mục tiêu ngày: Học 5 từ"}
              </span>
              <span className="text-[11px] font-extrabold text-amber-600 shrink-0">
                {todayWordsCount}/5 từ
              </span>
            </div>

            <div className="w-full bg-gray-200/80 h-2 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full"
                animate={{ width: `${Math.min(100, (todayWordsCount / 5) * 100)}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          <span className="text-xs font-black text-amber-500 shrink-0">
            {canClaimChest ? "MỞ NGAY" : "›"}
          </span>
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
      <DailyRewardPopup />
      <TreasureChestPopup isOpen={showChest} onClose={() => setShowChest(false)} />
      <BadgesModal isOpen={showBadges} onClose={() => setShowBadges(false)} />
      <PwaPrompt isOpen={showPwa} onClose={() => setShowPwa(false)} />
    </div>
  );
}
