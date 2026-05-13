"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/stores/appStore";
import Mascot from "./Mascot";

const DAILY_REWARDS = [2, 3, 4, 5, 6, 8, 10];

export default function DailyRewardPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [starsEarned, setStarsEarned] = useState(0);
  const { canClaimDailyReward, claimDailyReward, dailyRewardStreak } = useAppStore();

  useEffect(() => {
    // Show popup after a small delay if reward is available
    const timer = setTimeout(() => {
      if (canClaimDailyReward()) {
        setIsOpen(true);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleClaim = () => {
    const stars = claimDailyReward();
    setStarsEarned(stars);
    setClaimed(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const currentDay = dailyRewardStreak % 7;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999] flex items-center justify-center p-5"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={claimed ? handleClose : undefined}
        />

        {/* Card */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-sm glass-card p-6 flex flex-col items-center gap-4 z-10"
          style={{ background: "rgba(255,255,255,0.95)" }}
        >
          {!claimed ? (
            <>
              <Mascot mood="wave" message="Quà hàng ngày nè!" size={90} />

              <h2
                className="text-2xl font-extrabold text-center"
                style={{ fontFamily: "var(--font-heading)", color: "var(--color-primary)" }}
              >
                🎁 Quà Hàng Ngày
              </h2>
              <p className="text-sm text-text-light text-center">
                Mở app mỗi ngày để nhận thưởng nhé!
              </p>

              {/* 7-day progress */}
              <div className="flex gap-2 w-full justify-center">
                {DAILY_REWARDS.map((reward, i) => {
                  const isPast = i < currentDay;
                  const isCurrent = i === currentDay;
                  return (
                    <motion.div
                      key={i}
                      animate={isCurrent ? { scale: [1, 1.15, 1] } : {}}
                      transition={{ duration: 1, repeat: Infinity }}
                      className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl min-w-[38px] border-2 ${
                        isCurrent
                          ? "border-primary bg-primary/10 shadow-md"
                          : isPast
                          ? "border-green-400 bg-green-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <span className="text-[10px] font-bold text-text-light">
                        N{i + 1}
                      </span>
                      <span className="text-sm font-bold">
                        {isPast ? "✅" : `${reward}⭐`}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Claim button */}
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={handleClaim}
                className="w-full py-4 rounded-2xl text-white text-lg font-bold shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #FF6B9D, #C084FC)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                Nhận Quà! 🎉
              </motion.button>
            </>
          ) : (
            <>
              <Mascot mood="cheer" message={`Tuyệt vời! +${starsEarned}⭐`} size={100} />

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                className="text-center"
              >
                <h2
                  className="text-3xl font-extrabold mb-1"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--color-accent-dark)" }}
                >
                  +{starsEarned} ⭐
                </h2>
                <p className="text-sm text-text-light">
                  Ngày thứ {dailyRewardStreak} liên tiếp!
                </p>
              </motion.div>

              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={handleClose}
                className="w-full py-3 rounded-2xl text-white font-bold"
                style={{
                  background: "linear-gradient(135deg, #34D399, #38BDF8)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                Bắt đầu học nào! 🚀
              </motion.button>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
