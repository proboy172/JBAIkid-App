"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/layout/BackButton";
import BottomNav from "@/components/layout/BottomNav";
import Mascot from "@/components/shared/Mascot";
import { curriculum } from "@/data/vocabulary";
import { useAppStore } from "@/stores/appStore";
import { playSFX } from "@/utils/soundEffects";
import { MapPin, Grid, Lock, CheckCircle2, Star, Sparkles } from "lucide-react";

export default function LearnPage() {
  const { learnedWords, totalStars } = useAppStore();
  const [viewMode, setViewMode] = useState<"map" | "grid">("map");

  // Determine which topic is currently active (first unlocked topic not yet completed)
  let activeTopicId: string | null = null;
  for (const level of curriculum) {
    if (totalStars >= level.requiredStars) {
      for (const topic of level.topics) {
        const learned = (learnedWords[topic.id] || []).length;
        if (learned < topic.items.length) {
          activeTopicId = topic.id;
          break;
        }
      }
      if (activeTopicId) break;
    }
  }

  return (
    <div className="min-h-dvh flex flex-col">
      {/* Top Bar */}
      <div className="pt-10 pb-3 px-5 relative z-10 flex items-center justify-between">
        <BackButton label="Home" />

        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="bg-white/60 backdrop-blur-md p-1 rounded-2xl border border-white/60 flex items-center gap-1 shadow-sm">
            <button
              onClick={() => {
                playSFX("tap");
                setViewMode("map");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === "map"
                  ? "bg-primary text-white shadow-md"
                  : "text-text-light hover:text-text hover:bg-white/40"
              }`}
            >
              <MapPin size={13} />
              <span>Bản đồ</span>
            </button>
            <button
              onClick={() => {
                playSFX("tap");
                setViewMode("grid");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === "grid"
                  ? "bg-primary text-white shadow-md"
                  : "text-text-light hover:text-text hover:bg-white/40"
              }`}
            >
              <Grid size={13} />
              <span>Lưới</span>
            </button>
          </div>

          {/* Stars Counter */}
          <div className="glass-card px-3 py-1.5 text-sm font-bold flex items-center gap-1 shadow-sm">
            <span>⭐</span>
            <span style={{ color: "var(--color-primary)", fontFamily: "var(--font-heading)" }}>
              {totalStars}
            </span>
          </div>
        </div>
      </div>

      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-5 relative z-10 mb-2"
      >
        <h1
          className="text-2xl sm:text-3xl font-extrabold flex items-center justify-center gap-2"
          style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}
        >
          {viewMode === "map" ? "🗺️ Bản Đồ Thám Hiểm" : "📚 Lộ Trình Học"}
        </h1>
        <p className="text-xs sm:text-sm text-text-light mt-0.5">
          {viewMode === "map"
            ? "Chinh phục từng trạm dừng để mở khoá thế giới mới!"
            : "Học từ vựng theo từng cấp độ nhé!"}
        </p>
      </motion.div>

      {/* Content Area */}
      <div className="flex-1 px-5 pb-36 pt-2 scroll-area relative z-10 w-full">
        {viewMode === "map" ? (
          /* ================= ADVENTURE MAP VIEW ================= */
          <div className="max-w-md mx-auto flex flex-col items-center gap-12 w-full py-4">
            {curriculum.map((level, levelIdx) => {
              const isUnlocked = totalStars >= level.requiredStars;
              const biomeEmojis = ["🏝️", "🌲", "🏰"];
              const biomeColors = ["from-sky-400 to-indigo-500", "from-emerald-400 to-teal-600", "from-purple-400 to-pink-500"];

              return (
                <div key={level.id} className="w-full flex flex-col items-center relative">
                  {/* Biome Portal Header */}
                  <div className="w-full mb-8 relative">
                    <div
                      className={`w-full bg-gradient-to-r ${biomeColors[levelIdx % biomeColors.length]} text-white p-4 rounded-3xl shadow-lg flex items-center justify-between relative overflow-hidden`}
                    >
                      <div className="relative z-10">
                        <span className="text-xs uppercase tracking-widest font-extrabold opacity-80">
                          Thế giới {levelIdx + 1}
                        </span>
                        <h2 className="text-lg sm:text-xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                          {level.name}
                        </h2>
                        <p className="text-[11px] opacity-90 mt-0.5">{level.description}</p>
                      </div>
                      <span className="text-4xl relative z-10">{biomeEmojis[levelIdx % biomeEmojis.length]}</span>
                      {!isUnlocked && (
                        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px] z-20 flex items-center justify-center gap-2">
                          <Lock size={18} className="text-amber-300" />
                          <span className="text-xs font-bold text-amber-200">
                            Cần {level.requiredStars} ⭐ để mở
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stepping-Stone Road */}
                  <div className="w-full flex flex-col items-center relative">
                    {level.topics.map((topic, topicIdx) => {
                      const learned = (learnedWords[topic.id] || []).length;
                      const total = topic.items.length;
                      const isComplete = learned >= total;
                      const isCurrent = isUnlocked && topic.id === activeTopicId;
                      const pct = Math.round((learned / total) * 100);

                      // S-Curve horizontal offset pattern: center -> right -> center -> left
                      const offsets = [0, 50, 0, -50];
                      const xOffset = offsets[topicIdx % offsets.length];

                      return (
                        <div
                          key={topic.id}
                          className="relative flex flex-col items-center my-3 w-full"
                          style={{ transform: `translateX(${xOffset}px)` }}
                        >
                          {/* Stepping Stone Node */}
                          <Link
                            href={isUnlocked ? `/learn/${topic.id}/` : "#"}
                            onClick={() => {
                              if (isUnlocked) {
                                playSFX("pop");
                              } else {
                                playSFX("boop");
                              }
                            }}
                            className={isUnlocked ? "relative group" : "relative group cursor-not-allowed"}
                            prefetch={false}
                          >
                            <motion.div
                              whileHover={isUnlocked ? { scale: 1.08 } : {}}
                              whileTap={isUnlocked ? { scale: 0.92 } : { x: [-4, 4, -4, 4, 0] }}
                              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full p-2 flex flex-col items-center justify-center shadow-xl relative transition-all ${
                                !isUnlocked
                                  ? "bg-slate-200/90 border-4 border-slate-300 text-slate-400"
                                  : isComplete
                                  ? "bg-gradient-to-br from-amber-200 via-amber-300 to-yellow-400 border-4 border-amber-400 text-amber-950 shadow-amber-300/50"
                                  : isCurrent
                                  ? "bg-gradient-to-br from-white to-pink-50 border-4 border-primary shadow-[0_0_25px_rgba(255,107,157,0.7)] animate-pulse"
                                  : "bg-white/90 border-4 border-white text-slate-700 shadow-md"
                              }`}
                            >
                              {/* Station Emoji */}
                              <span className="text-3xl sm:text-4xl drop-shadow-md mb-1">
                                {!isUnlocked ? "🔒" : topic.emoji}
                              </span>

                              {/* Station Label */}
                              <span
                                className="text-[11px] sm:text-xs font-black truncate max-w-[80px] text-center"
                                style={{ fontFamily: "var(--font-heading)" }}
                              >
                                {topic.nameVi}
                              </span>

                              {/* Progress Badge */}
                              {isUnlocked && (
                                <div className="absolute -bottom-2 bg-white/90 px-2 py-0.5 rounded-full border border-gray-200 shadow-sm flex items-center gap-1">
                                  {isComplete ? (
                                    <span className="text-[10px] font-bold text-amber-600 flex items-center gap-0.5">
                                      <Star size={10} fill="#D97706" /> 100%
                                    </span>
                                  ) : (
                                    <span
                                      className="text-[10px] font-bold"
                                      style={{ color: topic.color }}
                                    >
                                      {learned}/{total}
                                    </span>
                                  )}
                                </div>
                              )}
                            </motion.div>

                            {/* Mascot Companion at Current Station */}
                            {isCurrent && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                className={`absolute top-0 z-30 pointer-events-none ${
                                  xOffset > 0 ? "-left-28 sm:-left-32" : "-right-28 sm:-right-32"
                                } flex items-center gap-2`}
                              >
                                <div className="bg-white/95 px-3 py-1.5 rounded-2xl border border-primary/30 shadow-lg text-[11px] font-bold text-primary whitespace-nowrap">
                                  Học bài này nè! ✨
                                </div>
                                <Mascot mood="wave" size={50} />
                              </motion.div>
                            )}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ================= GRID VIEW ================= */
          <div className="max-w-4xl mx-auto flex flex-col gap-8 w-full">
            {curriculum.map((level, i) => {
              const isUnlocked = totalStars >= level.requiredStars;

              return (
                <div key={level.id} className="relative">
                  {/* Level Header */}
                  <div className="mb-3">
                    <h2
                      className="text-xl font-bold flex items-center gap-2"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      <span className="bg-primary/20 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">
                        {i + 1}
                      </span>
                      {level.name}
                      {!isUnlocked && (
                        <span className="text-sm ml-auto opacity-70">🔒 Cần {level.requiredStars} ⭐</span>
                      )}
                    </h2>
                    <p className="text-xs text-text-light mt-1">{level.description}</p>
                  </div>

                  {/* Level Topics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative">
                    {!isUnlocked && (
                      <div className="absolute inset-0 z-20 rounded-3xl bg-white/40 backdrop-blur-[2px] flex items-center justify-center">
                        <div className="glass-card p-3 text-center shadow-lg">
                          <span className="text-3xl block mb-1">🔒</span>
                          <p className="text-xs font-bold text-text-light">
                            Cần thêm {level.requiredStars - totalStars} sao để mở
                          </p>
                        </div>
                      </div>
                    )}

                    {level.topics.map((topic, j) => {
                      const learned = (learnedWords[topic.id] || []).length;
                      const total = topic.items.length;
                      const pct = Math.round((learned / total) * 100);

                      return (
                        <Link
                          key={topic.id}
                          href={isUnlocked ? `/learn/${topic.id}/` : "#"}
                          onClick={() => {
                            if (isUnlocked) playSFX("pop");
                            else playSFX("boop");
                          }}
                          className={isUnlocked ? "block" : "pointer-events-none block"}
                          prefetch={false}
                        >
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 + j * 0.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="glass-card p-4 flex flex-col items-center text-center gap-2 h-full"
                            style={{ borderBottom: `4px solid ${topic.color}44` }}
                          >
                            <span className="text-4xl drop-shadow-md mb-1">{topic.emoji}</span>
                            <div>
                              <h3 className="font-bold text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                                {topic.nameVi}
                              </h3>
                              <p className="text-xs text-text-light">{topic.nameEn}</p>
                            </div>

                            <div className="w-full mt-auto pt-2">
                              <div className="flex justify-between text-[10px] font-bold text-text-light mb-1">
                                <span>Tiến độ</span>
                                <span style={{ color: topic.color }}>
                                  {learned}/{total}
                                </span>
                              </div>
                              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full rounded-full"
                                  style={{ backgroundColor: topic.color }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${pct}%` }}
                                  transition={{ duration: 0.5, delay: 0.2 }}
                                />
                              </div>
                            </div>
                          </motion.div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
