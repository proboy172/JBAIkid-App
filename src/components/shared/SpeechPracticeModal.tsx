"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Volume2, X, RotateCcw, Sparkles, Star, Award } from "lucide-react";
import { useSpeechRecognition, PronunciationScore } from "@/hooks/useSpeechRecognition";
import { useSpeech } from "@/hooks/useSpeech";
import { useAppStore } from "@/stores/appStore";
import { playSFX, speakCheer } from "@/utils/soundEffects";
import confetti from "canvas-confetti";

interface SpeechPracticeModalProps {
  wordEn: string;
  wordVi: string;
  emoji?: string;
  phonetic?: string;
  onClose: () => void;
  onSuccess?: (stars: number) => void;
}

export default function SpeechPracticeModal({
  wordEn,
  wordVi,
  emoji = "✨",
  phonetic,
  onClose,
  onSuccess,
}: SpeechPracticeModalProps) {
  const { addStars } = useAppStore();
  const { speak } = useSpeech();
  const {
    isRecording,
    transcript,
    similarity,
    stars,
    grade,
    error,
    startListening,
    stopListening,
    reset,
  } = useSpeechRecognition();

  const [hasClaimedStars, setHasClaimedStars] = useState(false);

  const handleHearSample = () => {
    playSFX("tap");
    speak(wordEn, "en-US", 0.8);
  };

  const handleStartPractice = async () => {
    playSFX("tap");
    const result = await startListening(wordEn);
    if (result && result.stars >= 2 && !hasClaimedStars) {
      addStars(result.stars);
      setHasClaimedStars(true);
      if (result.stars === 3) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        });
        speakCheer("Bé phát âm tuyệt vời quá!");
      } else {
        speakCheer("Bé đọc giỏi lắm!");
      }
      onSuccess?.(result.stars);
    }
  };

  const handleRetry = () => {
    playSFX("tap");
    reset();
    handleStartPractice();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1200] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.85, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 20 }}
        className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border-4 border-amber-300 relative overflow-hidden flex flex-col items-center text-center"
      >
        {/* Top Close Button */}
        <button
          onClick={() => {
            playSFX("tap");
            stopListening();
            onClose();
          }}
          className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Title */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-3">
          <Sparkles size={14} className="text-amber-500" />
          <span>Luyện Phát Âm Cùng AI</span>
        </div>

        {/* Big Word Card */}
        <div className="w-full bg-gradient-to-b from-amber-50 to-orange-50/50 rounded-2xl p-4 border border-amber-200/80 mb-4 flex flex-col items-center">
          <span className="text-6xl mb-2 filter drop-shadow-md animate-bounce-slow">
            {emoji}
          </span>
          <h3
            className="text-3xl font-extrabold text-slate-800 tracking-wide"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {wordEn}
          </h3>
          {phonetic && (
            <p className="text-sm font-semibold text-primary mt-0.5">{phonetic}</p>
          )}
          <p className="text-sm text-gray-600 font-medium mt-1">{wordVi}</p>

          {/* Sample Audio Button */}
          <button
            onClick={handleHearSample}
            className="mt-3 px-3.5 py-1.5 rounded-full bg-white text-primary border border-primary/30 shadow-sm hover:bg-primary/5 active:scale-95 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <Volume2 size={15} />
            <span>Nghe giọng chuẩn</span>
          </button>
        </div>

        {/* Interactive Practice Zone */}
        {grade ? (
          /* Result State */
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full flex flex-col items-center my-2"
          >
            {/* 3-Star Rating Display */}
            <div className="flex items-center gap-2 mb-2">
              {[1, 2, 3].map((starIdx) => (
                <motion.div
                  key={starIdx}
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: starIdx * 0.15, type: "spring", stiffness: 400 }}
                >
                  <Star
                    size={36}
                    className={
                      starIdx <= stars
                        ? "text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                        : "text-gray-200 fill-gray-200"
                    }
                  />
                </motion.div>
              ))}
            </div>

            {/* Praise message */}
            <h4
              className="text-xl font-extrabold mb-1"
              style={{
                fontFamily: "var(--font-heading)",
                color:
                  stars === 3
                    ? "#10B981"
                    : stars === 2
                    ? "#F59E0B"
                    : "#EF4444",
              }}
            >
              {stars === 3
                ? "🎉 Xuất Sắc! Chuẩn Bản Xứ!"
                : stars === 2
                ? "👏 Bé Đọc Rất Tốt!"
                : "💪 Bé Cố Gắng Lên Nào!"}
            </h4>

            {transcript && (
              <p className="text-xs text-gray-500 mb-3">
                Máy nghe thấy: <span className="font-bold text-slate-700">"{transcript}"</span>
              </p>
            )}

            {stars >= 2 && (
              <div className="mb-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-black">
                <Award size={14} className="text-amber-500" />
                <span>Thưởng +{stars} ⭐ vào túi!</span>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center gap-2.5 w-full">
              <button
                onClick={handleRetry}
                className="flex-1 py-2.5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw size={14} />
                <span>Đọc lại</span>
              </button>
              <button
                onClick={() => {
                  playSFX("tap");
                  onClose();
                }}
                className="flex-1 py-2.5 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-xs shadow-md shadow-primary/30 flex items-center justify-center gap-1.5"
              >
                <span>Xong rồi!</span>
                <span>✨</span>
              </button>
            </div>
          </motion.div>
        ) : (
          /* Recording / Ready State */
          <div className="w-full flex flex-col items-center my-3">
            {isRecording ? (
              <div className="flex flex-col items-center">
                {/* Pulsing Ripple Rings */}
                <div className="relative flex items-center justify-center w-24 h-24 mb-3">
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full bg-red-400"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.25, 1], opacity: [0.8, 0.2, 0.8] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    className="absolute inset-2 rounded-full bg-red-500/50"
                  />
                  <button
                    onClick={stopListening}
                    className="relative z-10 w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-500/50"
                  >
                    <Mic size={28} className="animate-pulse" />
                  </button>
                </div>
                <p className="text-sm font-bold text-red-500 animate-pulse" style={{ fontFamily: "var(--font-heading)" }}>
                  Đang lắng nghe... Bé đọc to từ "{wordEn}" nào!
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartPractice}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center shadow-xl shadow-primary/40 mb-3 cursor-pointer group"
                >
                  <Mic size={36} className="group-hover:scale-110 transition-transform" />
                </motion.button>
                <p className="text-xs font-bold text-gray-700">
                  Bấm vào micro và đọc to từ tiếng Anh nhé!
                </p>
              </div>
            )}

            {error && (
              <p className="text-xs text-red-500 mt-2 font-medium bg-red-50 px-3 py-1 rounded-lg border border-red-200">
                {error}
              </p>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
