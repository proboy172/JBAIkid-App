"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/layout/BackButton";
import BottomNav from "@/components/layout/BottomNav";
import { ConfettiOverlay } from "@/components/shared/ConfettiOverlay";
import Mascot from "@/components/shared/Mascot";
import { getAllTopics, type VocabItem } from "@/data/vocabulary";
import { useSpeech } from "@/hooks/useSpeech";
import { useConfetti } from "@/hooks/useConfetti";
import { useAppStore, type SRSCard, type SRSQuality } from "@/stores/appStore";
import { Volume2, RotateCcw } from "lucide-react";
import { playSFX, playRealLifeSound } from "@/utils/soundEffects";

export default function ReviewClient() {
  const { getDueWords, reviewWord, addStars } = useAppStore();
  const [dueWords, setDueWords] = useState<SRSCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { speak } = useSpeech();
  const { pieces, fire } = useConfetti();

  useEffect(() => {
    setIsMounted(true);
    const words = getDueWords();
    setDueWords(words);
  }, []);

  const allTopics = useMemo(() => getAllTopics(), []);

  const findVocabItem = useCallback(
    (wordEn: string): VocabItem | undefined => {
      for (const topic of allTopics) {
        const item = topic.items.find((i) => i.en === wordEn);
        if (item) return item;
      }
      return undefined;
    },
    [allTopics]
  );

  const currentCard = dueWords[currentIndex];
  const currentVocab = currentCard ? findVocabItem(currentCard.wordEn) : undefined;

  const [imageMode, setImageMode] = useState<"photo" | "illustration">("photo");
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("jbaikid_image_mode");
      if (saved === "photo" || saved === "illustration") {
        setImageMode(saved as "photo" | "illustration");
      }
    }
  }, []);

  useEffect(() => {
    setImageLoading(true);
    setImageError(false);
  }, [currentIndex, imageMode]);

  const currentImageUrl = imageMode === "photo"
    ? (currentVocab?.photoUrl || currentVocab?.illustrationUrl)
    : (currentVocab?.illustrationUrl || currentVocab?.photoUrl);

  const handleRate = useCallback(
    (quality: SRSQuality) => {
      if (!currentCard) return;
      reviewWord(currentCard.wordEn, quality);

      if (quality >= 4) {
        playSFX("correct");
        addStars(1);
        fire();
      } else if (quality <= 2) {
        playSFX("boop");
      } else {
        playSFX("tap");
      }

      if (currentIndex + 1 >= dueWords.length) {
        addStars(3); // Bonus for finishing all reviews
        playSFX("cheer");
        fire();
        setDone(true);
      } else {
        setFlipped(false);
        setCurrentIndex((i) => i + 1);
      }
    },
    [currentCard, currentIndex, dueWords.length, reviewWord, addStars, fire]
  );

  const handleRestart = () => {
    const words = getDueWords();
    setDueWords(words);
    setCurrentIndex(0);
    setFlipped(false);
    setDone(false);
  };

  if (!isMounted) {
    return <div className="min-h-dvh flex flex-col" />;
  }

  // No words to review
  if (dueWords.length === 0) {
    return (
      <div className="min-h-dvh flex flex-col">
        <div className="pt-10 pb-4 px-5 relative z-10">
          <BackButton label="Home" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-5 pb-28 relative z-10">
          <Mascot mood="love" message="Bé giỏi quá! Không có bài ôn nào hôm nay!" size={120} />
          <h2
            className="text-2xl font-extrabold mt-4 text-center"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-accent-dark)" }}
          >
            Đã ôn tập xong!
          </h2>
          <p className="text-sm text-text-light text-center mt-2 max-w-xs">
            Hãy học thêm từ mới ở phần Học Từ Vựng nhé. Các từ đã học sẽ tự động xuất hiện ở đây
            khi đến lúc cần ôn lại! 📚
          </p>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Done all reviews
  if (done) {
    return (
      <div className="min-h-dvh flex flex-col">
        <ConfettiOverlay pieces={pieces} />
        <div className="flex-1 flex flex-col items-center justify-center px-5 pb-28 relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-center glass-card p-8 max-w-sm w-full"
          >
            <Mascot mood="cheer" message="Bé ôn tập xuất sắc!" size={100} />
            <h2
              className="text-3xl font-extrabold mt-3 mb-2"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-accent-dark)" }}
            >
              Hoàn thành! 🏆
            </h2>
            <p className="text-lg font-bold mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              Đã ôn {dueWords.length} từ
            </p>
            <p className="text-sm text-text-light mb-6">+3 ⭐ bonus hoàn thành tất cả!</p>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleRestart}
              className="px-8 py-3 rounded-3xl text-white text-lg font-bold shadow-lg mb-3 flex items-center justify-center gap-2 mx-auto"
              style={{
                background: "linear-gradient(135deg, #34D399, #38BDF8)",
                fontFamily: "var(--font-heading)",
              }}
            >
              <RotateCcw size={20} /> Kiểm tra lại
            </motion.button>
            <BackButton label="Về trang chủ" />
          </motion.div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Review screen
  const progress = Math.round(((currentIndex + 1) / dueWords.length) * 100);

  return (
    <div className="min-h-dvh flex flex-col">
      <ConfettiOverlay pieces={pieces} />

      <div className="pt-3 sm:pt-5 pb-2 px-4 sm:px-5 relative z-10">
        <div className="flex items-center justify-between max-w-xl mx-auto w-full">
          <BackButton label="Home" />
          <span
            className="text-sm font-bold px-3 py-1 rounded-full glass-card"
            style={{ color: "var(--color-secondary)" }}
          >
            {currentIndex + 1} / {dueWords.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-2.5 h-2.5 bg-white/50 rounded-full overflow-hidden max-w-xl mx-auto">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #C084FC, #818CF8)" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-20 lg:pb-14 relative z-10">
        {currentVocab ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-xs sm:max-w-sm"
            >
              {/* Card */}
              <div
                className="flash-card-container w-full h-[320px] sm:h-[360px]"
                onClick={() => {
                  playSFX("pop");
                  setFlipped((f) => !f);
                }}
              >
                <div className={`flash-card-inner ${flipped ? "flipped" : ""}`}>
                  {/* Front */}
                  <div className="flash-card-front glass-card flex flex-col items-center justify-between p-3 sm:p-4 cursor-pointer border-2 border-purple-200">
                    {/* Top Mode Toggle + Real Sound */}
                    <div className="w-full flex items-center justify-between gap-1 px-1">
                      {currentVocab.photoUrl && currentVocab.illustrationUrl ? (
                        <div
                          className="flex items-center bg-slate-100/90 rounded-xl p-0.5 shadow-inner border border-slate-200"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setImageMode("photo");
                              if (typeof window !== "undefined") localStorage.setItem("jbaikid_image_mode", "photo");
                            }}
                            className={`px-2 py-0.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all ${
                              imageMode === "photo"
                                ? "bg-white text-indigo-700 shadow-sm"
                                : "text-slate-500 hover:text-slate-700"
                            }`}
                          >
                            <span>📸 Ảnh thật</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setImageMode("illustration");
                              if (typeof window !== "undefined") localStorage.setItem("jbaikid_image_mode", "illustration");
                            }}
                            className={`px-2 py-0.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all ${
                              imageMode === "illustration"
                                ? "bg-white text-purple-700 shadow-sm"
                                : "text-slate-500 hover:text-slate-700"
                            }`}
                          >
                            <span>🎨 Hình 3D</span>
                          </button>
                        </div>
                      ) : (
                        <div />
                      )}

                      {(currentVocab.realSound || currentVocab.realSoundType) && (
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            playRealLifeSound(currentVocab.realSoundType, currentVocab.realSound);
                          }}
                          className="px-2 py-0.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-[10px] sm:text-xs font-bold shadow-sm flex items-center gap-1 transition-all"
                          title="Nghe âm thanh thực tế"
                        >
                          <span className="animate-bounce">🔊</span>
                          <span>{currentVocab.soundLabel ? currentVocab.soundLabel.replace("Tiếng ", "") : "Âm thanh"}</span>
                        </motion.button>
                      )}
                    </div>

                    {/* Visual Container */}
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden flex items-center justify-center bg-gradient-to-b from-white to-slate-50 shadow-md border-2 border-white/80 my-1">
                      {currentImageUrl && !imageError ? (
                        <img
                          key={`${currentVocab.en}-${imageMode}`}
                          src={currentImageUrl}
                          alt={currentVocab.en}
                          className={`w-full h-full object-cover rounded-2xl transition-opacity duration-300 ${
                            imageLoading ? "opacity-0" : "opacity-100"
                          }`}
                          onLoad={() => setImageLoading(false)}
                          onError={() => {
                            setImageError(true);
                            setImageLoading(false);
                          }}
                        />
                      ) : (
                        <span className="text-6xl drop-shadow-sm select-none">{currentVocab.emoji}</span>
                      )}
                    </div>

                    <div className="text-center">
                      <h2
                        className="text-2xl sm:text-3xl font-extrabold"
                        style={{ fontFamily: "var(--font-heading)", color: "var(--color-secondary)" }}
                      >
                        {currentVocab.en}
                      </h2>
                      <p className="text-xs text-text-light mt-0.5">👆 Chạm để xem đáp án</p>
                    </div>
                  </div>

                  {/* Back */}
                  <div
                    className="flash-card-back glass-card flex flex-col items-center justify-between p-3 sm:p-4 cursor-pointer border-2 border-purple-200"
                    style={{ background: "linear-gradient(135deg, #f3e8ff22, white)" }}
                  >
                    {/* Compact Image */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex items-center justify-center bg-white shadow-sm border border-purple-100 mt-1">
                      {currentImageUrl && !imageError ? (
                        <img
                          src={currentImageUrl}
                          alt={currentVocab.en}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : (
                        <span className="text-3xl sm:text-4xl">{currentVocab.emoji}</span>
                      )}
                    </div>

                    <div className="text-center my-0.5">
                      <h2
                        className="text-xl sm:text-2xl font-extrabold"
                        style={{ fontFamily: "var(--font-heading)", color: "var(--color-secondary)" }}
                      >
                        {currentVocab.en}
                      </h2>
                      <p className="text-xs sm:text-sm text-text-light font-mono">{currentVocab.phonetic}</p>
                      <p className="text-base sm:text-lg font-bold mt-0.5 text-purple-700" style={{ fontFamily: "var(--font-heading)" }}>
                        {currentVocab.vi}
                      </p>
                    </div>

                    {/* Bilingual practical sentence */}
                    {currentVocab.exampleSentenceEn && (
                      <div className="w-full max-w-[280px] p-2 rounded-xl bg-purple-50/90 border border-purple-100 text-center mb-1">
                        <p className="text-xs sm:text-sm font-semibold text-purple-950 leading-snug">
                          {currentVocab.exampleSentenceEn}
                        </p>
                        {currentVocab.exampleSentenceVi && (
                          <p className="text-[11px] sm:text-xs text-purple-700/80 mt-0.5 leading-tight">
                            {currentVocab.exampleSentenceVi}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Listen button */}
              <div className="flex justify-center mt-2.5 sm:mt-3">
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    playSFX("tap");
                    speak(currentVocab.en, "en-US");
                  }}
                  className="bubble-btn w-12 h-12 sm:w-14 sm:h-14 shadow-lg"
                  style={{ background: "linear-gradient(135deg, #C084FC, #818CF8)" }}
                >
                  <Volume2 size={24} className="text-white relative z-10" />
                </motion.button>
              </div>

              {/* Rating buttons - show after flip */}
              <AnimatePresence>
                {flipped && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-2.5 sm:mt-3 flex flex-col gap-1.5"
                  >
                    <p
                      className="text-center text-xs font-bold text-text-light"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Bé nhớ từ này không?
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      <motion.button
                        whileTap={{ scale: 0.92 }}
                        onClick={() => handleRate(1)}
                        className="py-2 sm:py-2.5 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm border-2 border-red-200 bg-red-50 text-red-600"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        😵 Quên rồi
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.92 }}
                        onClick={() => handleRate(3)}
                        className="py-2 sm:py-2.5 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm border-2 border-yellow-200 bg-yellow-50 text-yellow-700"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        🤔 Hơi khó
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.92 }}
                        onClick={() => handleRate(5)}
                        className="py-2 sm:py-2.5 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm border-2 border-green-200 bg-green-50 text-green-700"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        😎 Dễ ợt!
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        ) : (
          <p className="text-text-light">Từ vựng không tìm thấy...</p>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
