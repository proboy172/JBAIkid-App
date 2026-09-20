"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import BackButton from "@/components/layout/BackButton";
import BottomNav from "@/components/layout/BottomNav";
import { useAppStore } from "@/stores/appStore";
import { getAllTopics } from "@/data/vocabulary";
import { RotateCcw, Trophy, BookOpen, Gamepad2, Volume2, Clock, Key, Plus, Trash2, BarChart3, Sparkles, CheckCircle2 } from "lucide-react";
import { playSFX } from "@/utils/soundEffects";

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
  const { 
    learnedWords, streak, totalStars, quizHighScore, resetProgress, 
    screenTimeLimit, setScreenTimeLimit, dailyPlayTime, resetDailyPlayTime,
    aiApiKeys, addApiKey, removeApiKey,
    getWeeklyStudyStats, clearTempCache, getDueWords, srsCards,
    ecoMode, toggleEcoMode
  } = useAppStore();
  const [showReset, setShowReset] = useState(false);
  const [newApiKey, setNewApiKey] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const [cleanSuccess, setCleanSuccess] = useState(false);
  const [diagSuccess, setDiagSuccess] = useState(false);
  const router = useRouter();

  const handleTitleClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        router.push("/police-call");
        return 0;
      }
      return newCount;
    });
  };

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

        <div className="flex-1 flex flex-col items-center justify-center px-5 pb-32 sm:pb-36 lg:pb-40 overflow-y-auto relative z-10">
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
      <div className="pt-3 sm:pt-5 pb-2 px-4 sm:px-5 relative z-10 max-w-4xl mx-auto w-full">
        <BackButton label="Home" />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-1"
          onClick={handleTitleClick}
        >
          <h1
            className="text-2xl font-extrabold cursor-pointer select-none"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}
          >
            👨‍👩‍👧 Phụ Huynh
          </h1>
        </motion.div>
      </div>

      <div className="flex-1 px-4 sm:px-5 pb-32 sm:pb-36 lg:pb-40 scroll-area relative z-10 w-full">
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

          {/* Báo Cáo Học Tập Tuần (Weekly Learning Intelligence) */}
          {(() => {
            const weeklyStats = getWeeklyStudyStats();
            const maxMinutes = Math.max(10, ...weeklyStats.map((d) => d.minutes));
            const totalWeeklyMinutes = Math.round(weeklyStats.reduce((acc, d) => acc + d.minutes, 0) * 10) / 10;
            const avgDailyMinutes = Math.round((totalWeeklyMinutes / 7) * 10) / 10;
            const allLearnedWords = Object.values(learnedWords).flat();
            const masteredWords = allLearnedWords.slice(0, 4);
            const dueWords = getDueWords();

            return (
              <div className="glass-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/15 flex items-center justify-center text-primary font-bold">
                      📊
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                        Báo Cáo Học Tập Tuần
                      </h3>
                      <p className="text-xs text-text-light">Thống kê 7 ngày gần nhất của bé</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 border border-emerald-500/30">
                    Tổng: {totalWeeklyMinutes} phút
                  </span>
                </div>

                {/* 7-Day Bar Chart */}
                <div className="bg-white/70 rounded-2xl p-4 border border-gray-100 shadow-inner">
                  <div className="flex items-end justify-between h-36 gap-2 pt-6 pb-1">
                    {weeklyStats.map((day, idx) => {
                      const heightPct = Math.max(8, Math.round((day.minutes / maxMinutes) * 100));
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end relative">
                          <span className="text-[10px] font-extrabold text-gray-600 mb-1">
                            {day.minutes > 0 ? `${day.minutes}p` : "0"}
                          </span>

                          <div className="w-full max-w-[28px] h-full flex items-end justify-center">
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${heightPct}%` }}
                              transition={{ duration: 0.6, delay: idx * 0.08 }}
                              className={`w-full rounded-xl transition-all shadow-sm ${
                                day.isToday
                                  ? "bg-gradient-to-t from-amber-500 to-orange-400 shadow-orange-500/30 ring-2 ring-orange-300"
                                  : day.minutes > 0
                                  ? "bg-gradient-to-t from-primary to-sky-400"
                                  : "bg-gray-200/80"
                              }`}
                            />
                          </div>

                          <span className={`text-xs mt-2 font-bold ${day.isToday ? "text-orange-500 underline font-black" : "text-gray-500"}`}>
                            {day.dayLabel}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Summary footer */}
                  <div className="flex items-center justify-between border-t border-gray-200/80 pt-3 mt-2 text-xs text-gray-600 font-medium">
                    <span>🎯 Trung bình: <strong className="text-gray-800">{avgDailyMinutes} phút/ngày</strong></span>
                    <span>⭐ Hôm nay: <strong className="text-orange-600">{weeklyStats.find((d) => d.isToday)?.minutes || 0} phút</strong></span>
                  </div>
                </div>

                {/* Mastered words & SRS insights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  <div className="bg-emerald-50/80 border border-emerald-200/70 p-3 rounded-2xl">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-1.5">
                      <span>🌟 Từ vựng đã ghi nhớ tốt:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {masteredWords.length > 0 ? (
                        masteredWords.map((w) => (
                          <span key={w} className="px-2.5 py-0.5 rounded-lg bg-emerald-600 text-white text-xs font-bold shadow-xs">
                            {w}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-emerald-600 italic">Bé đang làm quen các từ vựng đầu tiên!</span>
                      )}
                    </div>
                  </div>

                  <div className="bg-sky-50/80 border border-sky-200/70 p-3 rounded-2xl">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-sky-800 mb-1.5">
                      <span>🔄 Trạng thái ôn tập (SRS):</span>
                    </div>
                    <p className="text-xs text-sky-700">
                      {dueWords.length > 0
                        ? `Có ${dueWords.length} từ vựng sẵn sàng để ôn lại!`
                        : "Tuyệt vời! Toàn bộ từ vựng đã được ôn tập đúng hạn."}
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}

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

          {/* Quản Lý Bộ Nhớ & Smart Cache */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-600 font-bold">
                  💾
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Quản Lý Bộ Nhớ & Smart Cache
                  </h3>
                  <p className="text-xs text-text-light">Tối ưu hiệu năng & lưu trữ thiết bị</p>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                ⚡ Tối ưu 100%
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div className="bg-white/70 p-3 rounded-2xl border border-gray-100">
                <span className="text-xs text-gray-500 block">Nhạc & Video KTV</span>
                <span className="text-base font-extrabold text-gray-800">30 bài (~480MB)</span>
                <span className="text-[10px] text-emerald-600 font-medium block mt-0.5">✓ 100% Offline</span>
              </div>
              <div className="bg-white/70 p-3 rounded-2xl border border-gray-100">
                <span className="text-xs text-gray-500 block">Dữ liệu tiến trình</span>
                <span className="text-base font-extrabold text-gray-800">~16.4 KB</span>
                <span className="text-[10px] text-blue-600 font-medium block mt-0.5">✓ Flush buffer 30s</span>
              </div>
              <div className="bg-white/70 p-3 rounded-2xl border border-gray-100">
                <span className="text-xs text-gray-500 block">Trạng thái bộ nhớ</span>
                <span className="text-base font-extrabold text-emerald-600">Khỏe mạnh</span>
                <span className="text-[10px] text-gray-500 font-medium block mt-0.5">Zero I/O lag</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => {
                  playSFX("tap");
                  clearTempCache();
                  setCleanSuccess(true);
                  setTimeout(() => setCleanSuccess(false), 2500);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold hover:bg-purple-100 flex items-center justify-center gap-1.5 transition-colors active:scale-95"
              >
                <Sparkles size={16} />
                <span>{cleanSuccess ? "✓ Đã dọn sạch cache rác!" : "Dọn dẹp cache rác"}</span>
              </button>

              <button
                onClick={() => {
                  playSFX("star");
                  setDiagSuccess(true);
                  setTimeout(() => setDiagSuccess(false), 2500);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 flex items-center justify-center gap-1.5 transition-colors active:scale-95"
              >
                <CheckCircle2 size={16} />
                <span>{diagSuccess ? "✓ Bộ nhớ 100% toàn vẹn!" : "Kiểm tra tính toàn vẹn"}</span>
              </button>
            </div>
          </div>

          {/* Settings */}
          <div className="glass-card p-5">
            <h3 className="font-bold text-base mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Cài đặt & Bảo vệ
            </h3>

            {/* Screen Time Limiter */}
            <div className="mb-6">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-primary" />
                  <span className="font-semibold text-sm">Thời gian học tối đa mỗi ngày</span>
                </div>
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                  Đã dùng: <strong className="text-primary">{Math.floor(dailyPlayTime / 60)} phút</strong>
                </span>
              </div>

              {/* Status Warning if time expired */}
              {screenTimeLimit > 0 && dailyPlayTime >= screenTimeLimit * 60 && (
                <div className="mb-3 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center justify-between gap-2">
                  <div>
                    <span className="font-bold block">⚠️ Hôm nay bé đã học đủ {Math.floor(dailyPlayTime / 60)} phút.</span>
                    <span className="text-[11px] text-amber-700">Ứng dụng đã kích hoạt khóa bảo vệ mắt. Bấm nút bên để cấp lượt học mới.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      playSFX("correct");
                      resetDailyPlayTime();
                    }}
                    className="shrink-0 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
                    🔄 Cấp lượt mới
                  </button>
                </div>
              )}

              <div className="grid grid-cols-4 gap-2">
                {[15, 30, 60, 0].map((limit) => (
                  <motion.button
                    key={limit}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      playSFX("tap");
                      setScreenTimeLimit(limit);
                      // If setting a limit and child already used up this limit today, automatically refresh daily play time so the child gets a fresh session!
                      if (limit > 0 && dailyPlayTime >= limit * 60) {
                        resetDailyPlayTime();
                      }
                    }}
                    className={`py-2 px-1 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      screenTimeLimit === limit
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-100 text-text-light hover:bg-gray-200"
                    }`}
                  >
                    {limit === 0 ? "Vô hạn" : `${limit} phút`}
                  </motion.button>
                ))}
              </div>

              <div className="flex items-center justify-between mt-2.5">
                <p className="text-[11px] text-text-light italic">
                  {screenTimeLimit === 0
                    ? "✨ Đang tắt giới hạn thời gian (Bé học thoải mái)."
                    : `Tự động nhắc nghỉ ngơi khi bé học đủ ${screenTimeLimit} phút mỗi ngày.`}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    playSFX("tap");
                    resetDailyPlayTime();
                  }}
                  className="text-xs font-bold text-amber-600 hover:text-amber-800 underline transition-colors cursor-pointer"
                  title="Đặt lại số phút bé đã học hôm nay về 0"
                >
                  🔄 Đặt lại về 0 phút
                </button>
              </div>
            </div>

            {/* Cool Tablet & Battery Saver Eco Mode */}
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center text-lg shadow-sm">
                    ❄️
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">Chế độ Máy Mát & Tiết Kiệm Pin</h4>
                    <p className="text-[11px] text-slate-500">Tắt hiệu ứng kính mờ nặng, giảm tải GPU giúp máy tính bảng mát rượi và dùng lâu</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    playSFX("tap");
                    toggleEcoMode();
                  }}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    ecoMode ? "bg-emerald-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                      ecoMode ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
              {ecoMode && (
                <p className="text-[11px] font-bold text-emerald-700 mt-2 bg-emerald-100/70 px-2.5 py-1 rounded-lg">
                  ✓ Đang bật chế độ siêu mát. Ứng dụng đã loại bỏ toàn bộ hiệu ứng blur nặng để bảo vệ thiết bị.
                </p>
              )}
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
                  <p className="text-xs text-amber-600 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                    💡 <strong>Chưa có API Key nào.</strong> Ba mẹ hãy thêm mã Gemini API để kích hoạt tính năng Cô Giáo AI và Cuộc Gọi Cảnh Sát nhé!
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newApiKey}
                  onChange={(e) => setNewApiKey(e.target.value)}
                  placeholder="Dán mã Gemini API (AIzaSy...)..."
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
              <p className="text-[11px] text-text-light mt-2 flex items-center gap-1">
                <span>🔗 Lấy mã miễn phí 100% tại:</span>
                <a 
                  href="https://aistudio.google.com/apikey" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary font-bold underline"
                >
                  Google AI Studio
                </a>
              </p>
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
