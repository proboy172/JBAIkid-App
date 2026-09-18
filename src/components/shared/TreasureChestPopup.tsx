"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Gift } from "lucide-react";
import { useAppStore } from "@/stores/appStore";
import { playSFX, speakCheer } from "@/utils/soundEffects";
import { useConfetti } from "@/hooks/useConfetti";
import { ConfettiOverlay } from "./ConfettiOverlay";

export default function TreasureChestPopup({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { dailyWordsLearned, hasClaimedDailyChest, claimDailyChest } = useAppStore();
  const { pieces, fire } = useConfetti();
  const [justOpened, setJustOpened] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const todayWords = dailyWordsLearned?.[today] || [];
  const count = todayWords.length;
  const isClaimed = !!hasClaimedDailyChest?.[today];
  const canClaim = count >= 5 && !isClaimed;

  const handleOpenChest = () => {
    if (!canClaim) return;
    playSFX("star");
    playSFX("cheer");
    fire();
    speakCheer("Bé tuyệt vời quá! Nhận ngay mười sao!");
    claimDailyChest();
    setJustOpened(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <ConfettiOverlay pieces={pieces} />

        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.7, opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={() => {
              playSFX("pop");
              onClose();
            }}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
          >
            <X size={18} />
          </button>

          {/* Treasure Icon */}
          <div className="my-2">
            <span
              className={`text-8xl block select-none cursor-pointer transition-transform ${
                canClaim ? "animate-chest-wobble hover:scale-110 drop-shadow-[0_10px_20px_rgba(251,191,36,0.5)]" : ""
              }`}
              onClick={handleOpenChest}
            >
              {isClaimed || justOpened ? "👑" : count >= 5 ? "🎁" : "📦"}
            </span>
          </div>

          <h2
            className="text-2xl font-extrabold text-gray-800 mt-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {isClaimed || justOpened
              ? "Đã Mở Kho Báu Hôm Nay!"
              : count >= 5
              ? "Hòm Kho Báu Đã Sẵn Sàng!"
              : "Hòm Kho Báu Bí Mật"}
          </h2>

          <p className="text-xs text-text-light mt-1 max-w-xs">
            {isClaimed || justOpened
              ? "Bé đã nhận +10 sao may mắn! Hãy quay lại vào ngày mai nhé!"
              : count >= 5
              ? "Bé đã hoàn thành xuất sắc mục tiêu 5 từ hôm nay! Chạm vào hòm để mở thưởng!"
              : `Bé cần học 5 từ vựng mỗi ngày để mở khóa hòm bí mật. Hiện tại: ${count}/5 từ.`}
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden my-4 border border-gray-200">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (count / 5) * 100)}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>

          <span className="text-xs font-bold text-amber-600 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Tiến độ hôm nay: {count} / 5 từ
          </span>

          {/* Action Button */}
          {canClaim ? (
            <button
              onClick={handleOpenChest}
              className="btn-3d btn-3d-warning w-full py-4 text-lg font-black shadow-xl"
            >
              MỞ HÒM NHẬN 10 ⭐
            </button>
          ) : isClaimed || justOpened ? (
            <button
              onClick={() => {
                playSFX("pop");
                onClose();
              }}
              className="btn-3d btn-3d-accent w-full py-3.5 text-base font-bold text-white shadow-md"
            >
              Tiếp tục học thôi! 🚀
            </button>
          ) : (
            <button
              onClick={() => {
                playSFX("tap");
                onClose();
              }}
              className="btn-3d btn-3d-primary w-full py-3.5 text-base font-bold shadow-md"
            >
              Đi học từ mới ngay! 📚
            </button>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
