"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Topic } from "@/data/vocabulary";
import { ChevronRight, Sparkles } from "lucide-react";

interface NextLessonBannerProps {
  nextTopic: Topic;
  learnedCount: number;
  compact?: boolean;
}

export default function NextLessonBanner({ nextTopic, learnedCount, compact = false }: NextLessonBannerProps) {
  if (compact) {
    return (
      <Link href={`/learn/${nextTopic.id}`} className="w-full block">
        <motion.div
          whileTap={{ scale: 0.96 }}
          className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-2xl bg-amber-50/95 border border-amber-200 text-amber-900 shadow-xs cursor-pointer hover:bg-amber-100/90 transition-colors"
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-base shrink-0">{nextTopic.emoji}</span>
            <p className="text-[11px] sm:text-xs font-bold truncate">
              Mở rộng game: Học bài <span className="text-amber-800 font-extrabold underline">{nextTopic.nameVi}</span>
            </p>
          </div>
          <ChevronRight size={14} className="text-amber-700 shrink-0" />
        </motion.div>
      </Link>
    );
  }

  return (
    <Link href={`/learn/${nextTopic.id}`} className="w-full block">
      <motion.div
        whileTap={{ scale: 0.97 }}
        className="w-full p-2.5 sm:p-3 rounded-2xl bg-gradient-to-r from-amber-50 via-white to-orange-50 border border-amber-200 shadow-sm flex items-center justify-between gap-3 cursor-pointer hover:shadow-md transition-all"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-inner"
            style={{ backgroundColor: `${nextTopic.color}22` }}
          >
            {nextTopic.emoji}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1 text-[10px] font-bold text-amber-700 uppercase tracking-wide">
              <Sparkles size={11} />
              <span>Mở rộng thêm trò chơi</span>
            </div>
            <p className="text-xs sm:text-sm font-extrabold text-slate-800 truncate" style={{ fontFamily: "var(--font-heading)" }}>
              Học tiếp: {nextTopic.nameVi}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-bold text-amber-700 shrink-0 bg-white/80 px-2.5 py-1 rounded-xl border border-amber-200 shadow-xs">
          <span>Học ngay</span>
          <ChevronRight size={14} />
        </div>
      </motion.div>
    </Link>
  );
}
