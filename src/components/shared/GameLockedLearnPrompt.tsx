"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import BackButton from "@/components/layout/BackButton";
import Mascot from "@/components/shared/Mascot";
import type { Topic } from "@/data/vocabulary";
import { BookOpen, Sparkles, ChevronRight } from "lucide-react";

interface GameLockedLearnPromptProps {
  gameTitle: string;
  gameIcon: string;
  minWordsRequired: number;
  currentLearnedCount: number;
  nextTopic: Topic;
  backHref?: string;
}

export default function GameLockedLearnPrompt({
  gameTitle,
  gameIcon,
  minWordsRequired,
  currentLearnedCount,
  nextTopic,
  backHref = "/play",
}: GameLockedLearnPromptProps) {
  return (
    <div className="h-dvh max-h-dvh w-full overflow-hidden flex flex-col justify-between select-none">
      {/* Top Header */}
      <div className="pt-2 sm:pt-4 pb-1 px-4 sm:px-5 relative z-10 max-w-xl mx-auto w-full shrink-0">
        <BackButton href={backHref} label="Game Center" />
      </div>

      {/* Main Content: Fits in 1 frame in portrait & landscape */}
      <div className="flex-1 flex flex-col landscape:flex-row items-center justify-center px-4 py-2 relative z-10 overflow-hidden w-full max-w-2xl mx-auto gap-3 sm:gap-6">
        
        {/* Mascot / Icon Card */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center shrink-0"
        >
          <div className="relative inline-block mb-1 sm:mb-2">
            <Mascot mood="wave" size={76} />
            <span className="absolute -bottom-1 -right-1 text-2xl bg-white rounded-full p-0.5 shadow-md">
              {gameIcon}
            </span>
          </div>

          <h1
            className="text-xl sm:text-2xl font-black text-slate-800"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Học bài trước khi chơi nhé!
          </h1>
          <p className="text-xs sm:text-sm text-text-light mt-1 max-w-xs mx-auto leading-relaxed">
            Trò chơi <span className="font-bold text-primary">{gameTitle}</span> chỉ hiện những từ vựng bé đã học xong để bé ôn tập tốt nhất.
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mt-2">
            <span>⭐ Hiện có: {currentLearnedCount}/{minWordsRequired} từ vựng</span>
          </div>
        </motion.div>

        {/* Next Topic Recommendation Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="w-full max-w-sm glass-card p-3 sm:p-5 rounded-3xl border-2 border-primary/20 shadow-xl flex flex-col items-center shrink-0"
        >
          <div className="flex items-center gap-1 text-[11px] font-bold text-primary mb-1 uppercase tracking-wider">
            <Sparkles size={14} />
            <span>Bài học gợi ý tiếp theo</span>
          </div>

          <div className="w-full bg-white/90 rounded-2xl p-3 border border-slate-100 shadow-sm flex items-center gap-3 my-1">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner shrink-0"
              style={{ backgroundColor: `${nextTopic.color}22` }}
            >
              {nextTopic.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-extrabold text-slate-800 truncate" style={{ fontFamily: "var(--font-heading)" }}>
                {nextTopic.nameVi}
              </h3>
              <p className="text-xs text-text-light truncate">{nextTopic.nameEn} • {nextTopic.items.length} từ vựng</p>
            </div>
          </div>

          {/* Action Button: Start Learning */}
          <Link href={`/learn/${nextTopic.id}`} className="w-full mt-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              className="w-full py-2.5 sm:py-3 rounded-2xl text-white text-sm sm:text-base font-bold shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #34D399, #10B981)",
                fontFamily: "var(--font-heading)",
              }}
            >
              <BookOpen size={18} />
              <span>Học bài này ngay!</span>
              <ChevronRight size={18} />
            </motion.button>
          </Link>
        </motion.div>

      </div>

      {/* Safe bottom spacer */}
      <div className="h-2 shrink-0" />
    </div>
  );
}
