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
    id: "learn",
    href: "/learn",
    emoji: "📚",
    title: "Học Từ Vựng",
    subtitle: "Khám phá & Flashcards",
    gradientClass: "gradient-learn",
    shadow: "0 8px 20px -4px rgba(255, 107, 139, 0.4), 0 4px 0 #E0486D",
    delay: 0.05,
  },
  {
    id: "sing",
    href: "/sing",
    emoji: "🎵",
    title: "Bé Ca Hát",
    subtitle: "Karaoke tiếng Anh vui nhộn",
    gradientClass: "gradient-sing",
    shadow: "0 8px 20px -4px rgba(168, 85, 247, 0.4), 0 4px 0 #7C3AED",
    delay: 0.1,
  },
  {
    id: "play",
    href: "/play",
    emoji: "🎮",
    title: "Góc Trò Chơi",
    subtitle: "3 Mini game trí tuệ",
    gradientClass: "gradient-play",
    shadow: "0 8px 20px -4px rgba(16, 185, 129, 0.4), 0 4px 0 #059669",
    delay: 0.15,
  },
  {
    id: "stickers",
    href: "/play/stickers",
    emoji: "🎨",
    title: "Phòng Sáng Tạo",
    subtitle: "Dán sticker & Tranh vẽ",
    gradientClass: "gradient-stickers",
    shadow: "0 8px 20px -4px rgba(236, 72, 153, 0.4), 0 4px 0 #BE185D",
    delay: 0.2,
  },
  {
    id: "review",
    href: "/review",
    emoji: "📝",
    title: "Ôn Tập Trí Nhớ",
    subtitle: "Luyện phản xạ ngắt quãng",
    gradientClass: "gradient-review",
    shadow: "0 8px 20px -4px rgba(245, 158, 11, 0.4), 0 4px 0 #C2410C",
    delay: 0.25,
  },
  {
    id: "parent",
    href: "/parent",
    emoji: "👨‍👩‍👧",
    title: "Góc Phụ Huynh",
    subtitle: "Báo cáo & Cài đặt PIN",
    gradientClass: "gradient-parent",
    shadow: "0 8px 20px -4px rgba(71, 85, 105, 0.4), 0 4px 0 #0F172A",
    delay: 0.3,
    isLocked: true,
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
      <div className="pt-3 sm:pt-4 lg:pt-5 pb-1 sm:pb-2 px-5 relative z-20 flex items-center justify-between max-w-6xl mx-auto w-full">
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

      {/* Main Responsive Body: Stacked on Portrait, Side-by-Side on Landscape */}
      <div className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-2 flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-8 relative z-10 pb-24 lg:pb-16">
        
        {/* Left Panel: Hero & Daily Progress */}
        <div className="w-full lg:w-[350px] xl:w-[380px] shrink-0 flex flex-col items-center text-center">
          {/* Mascot Greeting */}
          <motion.div
            initial={{ scale: 0, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
            className="mb-1 flex justify-center"
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
              size={85}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl lg:text-4xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-primary)" }}
          >
            JBAIkid
          </motion.h1>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center gap-2.5 mt-2"
          >
            <div className="glass-card px-3 py-1.5 flex items-center gap-2">
              <span className="text-base">🔥</span>
              <div className="text-left">
                <div className="text-[9px] text-text-light font-medium">Streak</div>
                <div className="text-sm font-bold leading-none" style={{ fontFamily: "var(--font-heading)" }}>
                  {isMounted ? streak : 0} ngày
                </div>
              </div>
            </div>
            <div className="glass-card px-3 py-1.5 flex items-center gap-2">
              <span className="text-base">⭐</span>
              <div className="text-left">
                <div className="text-[9px] text-text-light font-medium">Sao</div>
                <div className="text-sm font-bold leading-none" style={{ fontFamily: "var(--font-heading)" }}>
                  {isMounted ? totalStars : 0}
                </div>
              </div>
            </div>
            {isMounted && dueCount > 0 && (
              <Link href="/review">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="glass-card px-3 py-1.5 flex items-center gap-2 border-2 border-purple-300"
                >
                  <span className="text-base">📝</span>
                  <div className="text-left">
                    <div className="text-[9px] text-text-light font-medium">Ôn tập</div>
                    <div
                      className="text-sm font-bold leading-none"
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
            transition={{ delay: 0.35 }}
            onClick={() => {
              playSFX("tap");
              setShowChest(true);
            }}
            className={`w-full max-w-sm mx-auto mt-2.5 p-2.5 rounded-2xl glass-card border-2 cursor-pointer flex items-center gap-2.5 transition-all select-none ${
              canClaimChest
                ? "border-amber-400 bg-amber-50/95 shadow-lg shadow-amber-200/60"
                : "border-purple-200/60 hover:border-purple-300"
            }`}
          >
            <div className="text-2xl shrink-0">
              <span className={canClaimChest ? "block animate-chest-wobble" : ""}>
                {isChestClaimed ? "👑" : canClaimChest ? "🎁" : "📦"}
              </span>
            </div>

            <div className="flex-1 text-left min-w-0">
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-xs font-bold text-gray-800 truncate" style={{ fontFamily: "var(--font-heading)" }}>
                  {canClaimChest ? "🎉 Mở Hòm Nhận 10 ⭐!" : "Mục tiêu ngày: Học 5 từ"}
                </span>
                <span className="text-[10px] font-extrabold text-amber-600 shrink-0">
                  {todayWordsCount}/5 từ
                </span>
              </div>

              <div className="w-full bg-gray-200/80 h-1.5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full"
                  animate={{ width: `${Math.min(100, (todayWordsCount / 5) * 100)}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            <span className="text-xs font-black text-amber-500 shrink-0">
              {canClaimChest ? "MỞ" : "›"}
            </span>
          </motion.div>
        </div>

        {/* Right Panel: Mode Cards Grid (Balanced 2 columns in landscape to match left panel height and give plenty of room for text) */}
        <div className="flex-1 w-full max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 w-full">
          {modes.map((mode, idx) => {
            const isReview = mode.id === "review";
            const showReviewBadge = isReview && isMounted && dueCount > 0;
            const currentSubtitle = showReviewBadge
              ? `${dueCount} từ cần ôn hôm nay!`
              : mode.subtitle;

            return (
              <Link
                key={mode.id}
                href={mode.href}
                prefetch={false}
                onClick={() => playSFX("tap")}
                className="w-full"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: mode.delay, type: "spring", stiffness: 300, damping: 24 }}
                  whileHover={{ translateY: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className={`mode-card-3d ${mode.gradientClass} h-[84px] sm:h-[88px] lg:h-[84px] px-3.5 sm:px-4 py-2.5 flex items-center gap-3 sm:gap-3.5 cursor-pointer group`}
                  style={{ boxShadow: mode.shadow }}
                  id={`mode-${mode.id}`}
                >
                  {/* Squircle Icon Pod */}
                  <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl sm:text-3xl shrink-0 shadow-inner border border-white/30 group-hover:scale-110 transition-transform">
                    <motion.span
                      animate={{ rotate: [0, 4, -4, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: idx * 0.4 }}
                    >
                      {mode.emoji}
                    </motion.span>
                  </div>

                  {/* Text Info */}
                  <div className="flex-1 min-w-0 pr-1">
                    <div className="flex items-center gap-1.5">
                      <h2
                        className="text-base sm:text-lg font-black text-white leading-tight truncate"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {mode.title}
                      </h2>
                      {showReviewBadge && (
                        <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-bounce shadow-md shrink-0">
                          {dueCount}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-[13px] text-white/90 font-medium truncate mt-0.5">
                      {currentSubtitle}
                    </p>
                  </div>

                  {/* Action / Arrow / Lock */}
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white/95 text-xs sm:text-sm font-black shrink-0 border border-white/25 group-hover:bg-white/30 group-hover:translate-x-0.5 transition-all shadow-xs">
                    {mode.isLocked ? "🔒" : "›"}
                  </div>
                </motion.div>
              </Link>
            );
          })}
          </div>
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
