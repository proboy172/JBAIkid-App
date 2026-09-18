"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, Lock, CheckCircle2, Sparkles } from "lucide-react";
import { useAppStore } from "@/stores/appStore";
import { playSFX } from "@/utils/soundEffects";

export interface BadgeItem {
  id: string;
  title: string;
  desc: string;
  emoji: string;
  color: string;
}

export const ALL_BADGES: BadgeItem[] = [
  {
    id: "badge_streak_3",
    title: "Mầm Non Chăm Chỉ",
    desc: "Đạt streak 3 ngày liên tiếp",
    emoji: "🌱",
    color: "#34D399",
  },
  {
    id: "badge_streak_7",
    title: "Bé Siêu Kiên Trì",
    desc: "Đạt streak 7 ngày liên tiếp",
    emoji: "🔥",
    color: "#FB923C",
  },
  {
    id: "badge_words_10",
    title: "Người Khám Phá Nhí",
    desc: "Đã học 10 từ vựng",
    emoji: "🧭",
    color: "#38BDF8",
  },
  {
    id: "badge_words_30",
    title: "Thần Đồng Từ Vựng",
    desc: "Đã học 30 từ vựng",
    emoji: "📚",
    color: "#C084FC",
  },
  {
    id: "badge_words_50",
    title: "Bậc Thầy Ngôn Ngữ",
    desc: "Đã học 50 từ vựng",
    emoji: "👑",
    color: "#FBBF24",
  },
  {
    id: "badge_stars_50",
    title: "Triệu Phú Sao",
    desc: "Tích lũy đạt 50 ngôi sao",
    emoji: "⭐",
    color: "#EAB308",
  },
  {
    id: "badge_stars_100",
    title: "Siêu Sao Vàng",
    desc: "Tích lũy đạt 100 ngôi sao",
    emoji: "🏆",
    color: "#F59E0B",
  },
  {
    id: "badge_quiz_master",
    title: "Vua Trắc Nghiệm",
    desc: "Đạt điểm tuyệt đối 8/8 tại Mini Quiz",
    emoji: "🎯",
    color: "#EC4899",
  },
  {
    id: "badge_daily_chest",
    title: "Thợ Săn Kho Báu",
    desc: "Mở khóa thành công Hòm Kho Báu Mục Tiêu Ngày",
    emoji: "🎁",
    color: "#8B5CF6",
  },
];

export default function BadgesModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { unlockedBadges } = useAppStore();
  const unlockedList = unlockedBadges || [];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-xl text-amber-600 shadow-sm">
                <Trophy size={22} className="text-amber-500" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Bộ Sưu Tập Huy Hiệu
                </h2>
                <p className="text-xs text-text-light font-medium">
                  Đã mở khóa: {unlockedList.length} / {ALL_BADGES.length} huy hiệu
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playSFX("tap");
                onClose();
              }}
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 active:scale-95 transition-all text-gray-500"
            >
              <X size={18} />
            </button>
          </div>

          {/* Badges Grid */}
          <div className="flex-1 overflow-y-auto py-4 pr-1 scroll-area grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ALL_BADGES.map((badge) => {
              const isUnlocked = unlockedList.includes(badge.id);

              return (
                <div
                  key={badge.id}
                  className={`p-3 rounded-2xl border-2 flex items-center gap-3 transition-all ${
                    isUnlocked
                      ? "bg-white border-amber-300 shadow-md shadow-amber-100/60 shimmer-badge"
                      : "bg-gray-50/80 border-gray-200 opacity-60"
                  }`}
                >
                  <div
                    className={`w-13 h-13 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-sm ${
                      isUnlocked ? "bg-amber-50 ring-2 ring-amber-300/40" : "bg-gray-200 grayscale"
                    }`}
                  >
                    {badge.emoji}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <h3
                        className="font-bold text-sm truncate"
                        style={{
                          fontFamily: "var(--font-heading)",
                          color: isUnlocked ? "var(--color-text)" : "#9CA3AF",
                        }}
                      >
                        {badge.title}
                      </h3>
                      {isUnlocked && <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />}
                    </div>
                    <p className="text-[11px] text-gray-500 line-clamp-2 leading-tight mt-0.5">
                      {badge.desc}
                    </p>
                  </div>

                  {!isUnlocked && <Lock size={15} className="text-gray-400 shrink-0 mr-1" />}
                </div>
              );
            })}
          </div>

          {/* Footer Motivation */}
          <div className="pt-3 border-t border-gray-100 text-center">
            <p className="text-xs text-text-light font-medium">
              ✨ Hãy học từ vựng và chơi mini-game mỗi ngày để thu thập thêm nhiều huy hiệu nhé!
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
