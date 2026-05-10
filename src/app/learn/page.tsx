"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import BackButton from "@/components/layout/BackButton";
import BottomNav from "@/components/layout/BottomNav";
import { curriculum } from "@/data/vocabulary";
import { useAppStore } from "@/stores/appStore";

export default function LearnPage() {
  const { learnedWords, totalStars } = useAppStore();

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
        className="text-center px-5 relative z-10"
      >
        <h1
          className="text-2xl font-extrabold"
          style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}
        >
          📚 Lộ Trình Học
        </h1>
        <p className="text-sm text-text-light mt-1">Học từ vựng theo từng cấp độ nhé!</p>
      </motion.div>

      <div className="flex-1 px-5 pb-36 pt-4 scroll-area relative z-10 w-full">
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
                    {!isUnlocked && <span className="text-sm ml-auto opacity-70">🔒 Cần {level.requiredStars} ⭐</span>}
                  </h2>
                  <p className="text-xs text-text-light mt-1">{level.description}</p>
                </div>

                {/* Level Topics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative">
                  {!isUnlocked && (
                    <div className="absolute inset-0 z-20 rounded-3xl bg-white/40 backdrop-blur-[2px] flex items-center justify-center">
                      <div className="glass-card p-3 text-center shadow-lg">
                        <span className="text-3xl block mb-1">🔒</span>
                        <p className="text-xs font-bold text-text-light">Cần thêm {level.requiredStars - totalStars} sao để mở</p>
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
      </div>

      <BottomNav />
    </div>
  );
}
