"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import BackButton from "@/components/layout/BackButton";
import BottomNav from "@/components/layout/BottomNav";
import { useAppStore } from "@/stores/appStore";
import { getAllTopics } from "@/data/vocabulary";
import { RotateCcw, Trophy, BookOpen, Gamepad2, Volume2, Clock, Key, Plus, Trash2 } from "lucide-react";

const generateMathProblem = () => {
  const a = Math.floor(Math.random() * 20) + 10;
  const b = Math.floor(Math.random() * 20) + 5;
  return { a, b, answer: a + b };
};

export default function ParentPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [mathProblem, setMathProblem] = useState(generateMathProblem());
  const [userAnswer, setUserAnswer] = useState("");
  const [error, setError] = useState(false);
  const { learnedWords, streak, totalStars, quizHighScore, resetProgress, screenTimeLimit, setScreenTimeLimit, aiApiKeys, addApiKey, removeApiKey } = useAppStore();
  const [showReset, setShowReset] = useState(false);
  const [newApiKey, setNewApiKey] = useState("");

  const handleAddKey = () => {
    if (newApiKey.trim().length > 10) {
      addApiKey(newApiKey.trim());
      setNewApiKey("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(userAnswer) === mathProblem.answer) {
      setUnlocked(true);
    } else {
      setError(true);
      setUserAnswer("");
      setTimeout(() => setError(false), 500);
    }
  };

  // Lock screen
  if (!unlocked) {
    return (
      <div className="min-h-dvh flex flex-col">
        <div className="pt-10 pb-4 px-5 relative z-10">
          <BackButton label="Home" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-5 pb-28 relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center glass-card p-8 max-w-sm w-full"
          >
            <span className="text-6xl block mb-4">🔒</span>
            <h1
              className="text-2xl font-extrabold mb-2"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}
            >
              Khu Vực Phụ Huynh
            </h1>
            <p className="text-sm text-text-light mb-6">
              Vui lòng giải phép toán để tiếp tục
            </p>

            <motion.div 
              animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
              className="bg-white/50 border-2 border-white/80 p-4 rounded-2xl mb-6 shadow-sm"
            >
              <span className="text-3xl font-black" style={{ fontFamily: "var(--font-heading)", color: "var(--color-primary)" }}>
                {mathProblem.a} + {mathProblem.b} = ?
              </span>
            </motion.div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input 
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Nhập kết quả..."
                className="w-full text-center text-xl font-bold p-4 rounded-2xl bg-white focus:outline-none focus:ring-4 focus:ring-primary/20"
                autoFocus
              />
              <button 
                type="submit"
                className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-transform"
              >
                Mở khoá
              </button>
            </form>
          </motion.div>
        </div>

        <BottomNav />
      </div>
    );
  }

  // Unlocked: Dashboard
  const totalLearned = Object.values(learnedWords).reduce((a, b) => a + b.length, 0);
  const totalWords = getAllTopics().reduce((a, c) => a + c.items.length, 0);

  return (
    <div className="min-h-dvh flex flex-col">
      <div className="pt-10 pb-4 px-5 relative z-10">
        <BackButton label="Home" />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-3"
        >
          <h1
            className="text-2xl font-extrabold"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}
          >
            👨‍👩‍👧 Phụ Huynh
          </h1>
        </motion.div>
      </div>

      <div className="flex-1 px-5 pb-36 scroll-area relative z-10 w-full">
        <div className="max-w-4xl mx-auto flex flex-col gap-4 w-full">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: "🔥", label: "Streak", value: `${streak} ngày`, color: "#FB923C" },
              { icon: "⭐", label: "Tổng sao", value: `${totalStars}`, color: "#FBBF24" },
              { icon: "📚", label: "Từ đã học", value: `${totalLearned}/${totalWords}`, color: "#34D399" },
              { icon: "🏆", label: "Quiz cao nhất", value: `${quizHighScore}/8`, color: "#C084FC" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-4 text-center"
              >
                <span className="text-3xl block mb-1">{stat.icon}</span>
                <p className="text-xs text-text-light font-medium">{stat.label}</p>
                <p className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)", color: stat.color }}>
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Per-category progress */}
          <div className="glass-card p-5">
            <h3 className="font-bold text-base mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Tiến trình từng chủ đề
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {getAllTopics().map((cat) => {
                const learned = (learnedWords[cat.id] || []).length;
                const pct = Math.round((learned / cat.items.length) * 100);
                return (
                  <div key={cat.id} className="w-full">
                    <div className="flex justify-between text-sm font-medium mb-1">
                      <span>{cat.emoji} {cat.nameVi}</span>
                      <span className="text-text-light">{learned}/{cat.items.length}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: cat.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Settings */}
          <div className="glass-card p-5">
            <h3 className="font-bold text-base mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Cài đặt & Bảo vệ
            </h3>

            {/* Screen Time Limiter */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={18} className="text-primary" />
                <span className="font-semibold text-sm">Thời gian học tối đa mỗi ngày</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[15, 30, 60, 0].map((limit) => (
                  <motion.button
                    key={limit}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setScreenTimeLimit(limit)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold transition-colors ${
                      screenTimeLimit === limit
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-100 text-text-light hover:bg-gray-200"
                    }`}
                  >
                    {limit === 0 ? "Vô hạn" : `${limit} phút`}
                  </motion.button>
                ))}
              </div>
              <p className="text-[10px] text-text-light mt-2 italic">
                Ứng dụng sẽ tự động khóa lại khi hết thời gian, giúp bảo vệ mắt cho bé.
              </p>
            </div>

            {/* AI API Keys Config */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Key size={18} className="text-primary" />
                <span className="font-semibold text-sm">Cấu hình AI API Keys (Xoay vòng)</span>
              </div>
              
              <div className="flex flex-col gap-2 mb-3">
                {aiApiKeys && aiApiKeys.map((key) => (
                  <div key={key} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                    <span className="text-xs font-mono text-gray-600">
                      {key.substring(0, 8)}...{key.substring(key.length - 6)}
                    </span>
                    <button 
                      onClick={() => removeApiKey(key)}
                      className="text-red-400 hover:text-red-600 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {(!aiApiKeys || aiApiKeys.length === 0) && (
                  <p className="text-xs text-text-light italic px-1">Chưa có API Key nào được thêm. Hệ thống sẽ dùng key mặc định.</p>
                )}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newApiKey}
                  onChange={(e) => setNewApiKey(e.target.value)}
                  placeholder="Nhập Gemini API Key..."
                  className="flex-1 text-xs px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                />
                <button
                  onClick={handleAddKey}
                  disabled={newApiKey.trim().length < 10}
                  className="bg-primary text-white px-3 py-2 rounded-xl flex items-center gap-1 disabled:opacity-50"
                >
                  <Plus size={16} /> <span className="text-xs font-bold">Thêm</span>
                </button>
              </div>
            </div>

            <div className="h-[1px] w-full bg-gray-200 mb-6" />

            {!showReset ? (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowReset(true)}
                className="w-full py-3 rounded-2xl bg-gray-100 text-sm font-semibold flex items-center justify-center gap-2"
              >
                <RotateCcw size={16} /> Reset tiến trình
              </motion.button>
            ) : (
              <div className="flex gap-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    resetProgress();
                    setShowReset(false);
                  }}
                  className="flex-1 py-3 rounded-2xl bg-danger text-white text-sm font-bold"
                >
                  Xác nhận xoá
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowReset(false)}
                  className="flex-1 py-3 rounded-2xl bg-gray-100 text-sm font-semibold"
                >
                  Huỷ
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
