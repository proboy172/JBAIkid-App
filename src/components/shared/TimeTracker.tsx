"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/stores/appStore";
import { playSFX } from "@/utils/soundEffects";
import Mascot from "./Mascot";

const generateMathProblem = () => {
  const a = Math.floor(Math.random() * 20) + 10;
  const b = Math.floor(Math.random() * 20) + 5;
  return { a, b, answer: a + b };
};

export default function TimeTracker() {
  const pathname = usePathname();
  const { dailyPlayTime, screenTimeLimit, addPlayTime, resetDailyPlayTime, setScreenTimeLimit } = useAppStore();
  const [isLocked, setIsLocked] = useState(false);
  const bufferedSecondsRef = useRef(0);
  
  // For parent override
  const [showOverride, setShowOverride] = useState(false);
  const [mathProblem, setMathProblem] = useState(generateMathProblem());
  const [userAnswer, setUserAnswer] = useState("");
  const [error, setError] = useState(false);

  // Flush in-memory accumulated seconds to storage
  const flushTime = useCallback(() => {
    if (bufferedSecondsRef.current > 0) {
      addPlayTime(bufferedSecondsRef.current);
      bufferedSecondsRef.current = 0;
    }
  }, [addPlayTime]);

  useEffect(() => {
    // 1-second in-memory tick for exact lock timing, flushed to disk every 30 seconds
    const interval = setInterval(() => {
      // Do not accumulate time if the tab is hidden / in background
      if (typeof document !== "undefined" && document.hidden) return;
      // Do not accumulate child play time if parent is on /parent settings
      if (pathname === "/parent") return;

      bufferedSecondsRef.current += 1;
      
      // Check lock condition against combined persisted + buffered time
      const totalEffectiveTime = dailyPlayTime + bufferedSecondsRef.current;
      if (screenTimeLimit > 0 && totalEffectiveTime >= screenTimeLimit * 60) {
        setIsLocked(true);
      } else {
        setIsLocked(false);
      }

      // Flush to disk every 30 seconds to protect flash storage and battery
      if (bufferedSecondsRef.current >= 30) {
        flushTime();
      }
    }, 1000);

    const handleBeforeUnload = () => {
      flushTime();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      flushTime();
    };
  }, [dailyPlayTime, screenTimeLimit, flushTime, pathname]);

  const handleUnlockWithAction = (action: "add15" | "resetToday" | "unlimited") => {
    if (parseInt(userAnswer.trim()) === mathProblem.answer) {
      playSFX("correct");
      if (action === "add15") {
        const currentEffectiveMins = Math.ceil((dailyPlayTime + bufferedSecondsRef.current) / 60);
        const newLimit = Math.max(screenTimeLimit, currentEffectiveMins) + 15;
        setScreenTimeLimit(newLimit);
      } else if (action === "resetToday") {
        resetDailyPlayTime();
        bufferedSecondsRef.current = 0;
      } else if (action === "unlimited") {
        setScreenTimeLimit(0);
      }
      setIsLocked(false);
      setShowOverride(false);
      setUserAnswer("");
      setMathProblem(generateMathProblem());
    } else {
      playSFX("boop");
      setError(true);
      setUserAnswer("");
      setTimeout(() => setError(false), 600);
    }
  };

  // Never lock parents out while on the parent settings page
  if (pathname === "/parent" || !isLocked) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-5 bg-slate-900/95 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          className="relative w-full max-w-sm glass-card p-6 sm:p-8 flex flex-col items-center gap-4 text-center"
          style={{ background: "rgba(255,255,255,0.98)" }}
        >
          {!showOverride ? (
            <>
              <Mascot mood="sad" message="Mắt bé cần nghỉ ngơi rồi!" size={100} />
              <h2
                className="text-2xl font-extrabold text-slate-800"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Hết giờ học rồi!
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Hôm nay bé đã học đủ <strong className="text-primary">{screenTimeLimit} phút</strong> quy định. Hãy để mắt nghỉ ngơi nhé!
              </p>
              
              <button 
                onClick={() => {
                  playSFX("tap");
                  setShowOverride(true);
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 font-bold transition-colors"
              >
                👨‍👩‍👧 Dành cho Phụ huynh (Mở khóa)
              </button>
            </>
          ) : (
            <>
              <h2
                className="text-xl font-extrabold text-slate-800"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Xác Nhận Phụ Huynh
              </h2>
              <p className="text-slate-600 text-xs mb-2">
                Giải phép tính để mở khóa cho bé học tiếp:
              </p>

              <motion.div 
                animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl w-full mb-3"
              >
                <span className="text-2xl font-black text-amber-900" style={{ fontFamily: "var(--font-heading)" }}>
                  {mathProblem.a} + {mathProblem.b} = ?
                </span>
              </motion.div>

              <div className="flex flex-col gap-2.5 w-full">
                <input 
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Nhập kết quả..."
                  className="w-full text-center text-xl font-bold p-3 rounded-2xl bg-white border-2 border-slate-200 focus:outline-none focus:border-primary"
                  autoFocus
                />

                <button 
                  type="button"
                  onClick={() => handleUnlockWithAction("add15")}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl shadow-md active:scale-95 transition-all text-xs sm:text-sm"
                >
                  ➕ Thêm 15 phút học cho bé
                </button>

                <button 
                  type="button"
                  onClick={() => handleUnlockWithAction("resetToday")}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2.5 rounded-xl shadow-md active:scale-95 transition-all text-xs sm:text-sm"
                >
                  🔄 Đặt lại lượt mới ({screenTimeLimit} phút)
                </button>

                <button 
                  type="button"
                  onClick={() => handleUnlockWithAction("unlimited")}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-xl active:scale-95 transition-all text-xs"
                >
                  ♾️ Tắt giới hạn hôm nay (Vô hạn)
                </button>

                <button 
                  type="button"
                  onClick={() => {
                    playSFX("tap");
                    setShowOverride(false);
                    setUserAnswer("");
                  }}
                  className="w-full text-slate-400 hover:text-slate-600 font-medium py-1 text-xs transition-colors"
                >
                  Quay lại
                </button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
