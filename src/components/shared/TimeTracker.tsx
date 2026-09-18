"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/stores/appStore";
import Mascot from "./Mascot";

const generateMathProblem = () => {
  const a = Math.floor(Math.random() * 20) + 10;
  const b = Math.floor(Math.random() * 20) + 5;
  return { a, b, answer: a + b };
};

export default function TimeTracker() {
  const { dailyPlayTime, screenTimeLimit, addPlayTime } = useAppStore();
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
  }, [dailyPlayTime, screenTimeLimit, flushTime]);

  const handleOverrideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(userAnswer) === mathProblem.answer) {
      // Temporarily add 15 minutes to limit so they can keep playing
      useAppStore.getState().setScreenTimeLimit(screenTimeLimit + 15);
      setShowOverride(false);
      setUserAnswer("");
      setMathProblem(generateMathProblem());
    } else {
      setError(true);
      setUserAnswer("");
      setTimeout(() => setError(false), 500);
    }
  };

  if (!isLocked) return null;

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
          className="relative w-full max-w-sm glass-card p-8 flex flex-col items-center gap-4 text-center"
          style={{ background: "rgba(255,255,255,0.95)" }}
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
              <p className="text-slate-600 text-sm">
                Con đã học rất ngoan hôm nay. Hãy để mắt nghỉ ngơi và hẹn gặp lại ngày mai nhé!
              </p>
              
              <button 
                onClick={() => setShowOverride(true)}
                className="mt-6 text-xs text-slate-400 underline font-medium"
              >
                Khu vực Phụ huynh (Thêm thời gian)
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
              <p className="text-slate-600 text-sm mb-4">
                Giải phép toán để thêm 15 phút học
              </p>

              <motion.div 
                animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                className="bg-slate-100 p-4 rounded-2xl w-full mb-4"
              >
                <span className="text-2xl font-black text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>
                  {mathProblem.a} + {mathProblem.b} = ?
                </span>
              </motion.div>

              <form onSubmit={handleOverrideSubmit} className="flex flex-col gap-3 w-full">
                <input 
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Nhập kết quả..."
                  className="w-full text-center text-xl font-bold p-4 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-4 focus:ring-primary/20"
                  autoFocus
                />
                <button 
                  type="submit"
                  className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-transform"
                >
                  Xác nhận
                </button>
                <button 
                  type="button"
                  onClick={() => setShowOverride(false)}
                  className="w-full bg-slate-200 text-slate-600 font-bold py-3 rounded-2xl active:scale-95 transition-transform mt-1"
                >
                  Quay lại
                </button>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
