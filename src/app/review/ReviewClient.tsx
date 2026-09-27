"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/layout/BackButton";
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

  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageLoading(true);
    setImageError(false);
  }, [currentIndex]);

  const currentImageUrl = currentVocab?.photoUrl || currentVocab?.illustrationUrl;

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
      <div 
        className="h-dvh max-h-dvh w-full overflow-hidden flex flex-col justify-between select-none"
        style={{
          paddingTop: "max(env(safe-area-inset-top, 8px), 8px)",
          paddingBottom: "max(env(safe-area-inset-bottom, 8px), 8px)",
        }}
      >
        <div className="pt-2 sm:pt-4 pb-2 px-5 relative z-10 shrink-0">
          <BackButton label="Home" />
        </div>
        <div className="flex-1 min-h-0 flex flex-col items-center justify-center px-5 relative z-10 overflow-hidden">
          <Mascot mood="love" message="Bé giỏi quá! Không có bài ôn nào hôm nay!" size={100} />
          <h2
            className="text-xl sm:text-2xl font-extrabold mt-3 text-center"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-accent-dark)" }}
          >
            Đã ôn tập xong!
          </h2>
          <p className="text-xs sm:text-sm text-text-light text-center mt-2 max-w-xs">
            Hãy học thêm từ mới ở phần Học Từ Vựng nhé. Các từ đã học sẽ tự động xuất hiện ở đây
            khi đến lúc cần ôn lại! 📚
          </p>
        </div>
        <div className="p-3 flex justify-center shrink-0">
          <BackButton label="Quay về Home" />
        </div>
      </div>
    );
  }

  // Done all reviews
  if (done) {
    return (
      <div 
        className="h-dvh max-h-dvh w-full overflow-hidden flex flex-col justify-between select-none"
        style={{
          paddingTop: "max(env(safe-area-inset-top, 8px), 8px)",
          paddingBottom: "max(env(safe-area-inset-bottom, 8px), 8px)",
        }}
      >
        <ConfettiOverlay pieces={pieces} />
        <div className="pt-2 sm:pt-4 pb-2 px-5 relative z-10 shrink-0">
          <BackButton label="Home" />
        </div>
        <div className="flex-1 min-h-0 flex flex-col items-center justify-center px-4 relative z-10 overflow-hidden">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-center glass-card p-5 sm:p-7 max-w-sm w-full"
          >
            <Mascot mood="cheer" message="Bé ôn tập xuất sắc!" size={80} />
            <h2
              className="text-2xl sm:text-3xl font-extrabold mt-2 mb-1"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-accent-dark)" }}
            >
              Hoàn thành! 🏆
            </h2>
            <p className="text-base sm:text-lg font-bold mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              Đã ôn {dueWords.length} từ
            </p>
            <p className="text-xs text-text-light mb-4">+3 ⭐ bonus hoàn thành tất cả!</p>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleRestart}
              className="px-6 py-2.5 rounded-2xl text-white text-base font-bold shadow-lg mb-2 flex items-center justify-center gap-2 mx-auto cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #34D399, #38BDF8)",
                fontFamily: "var(--font-heading)",
              }}
            >
              <RotateCcw size={18} /> Kiểm tra lại
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Review screen
  const progress = Math.round(((currentIndex + 1) / dueWords.length) * 100);

  return (
    <div className="h-dvh max-h-dvh w-full overflow-hidden flex flex-col justify-between select-none">
      <ConfettiOverlay pieces={pieces} />

      {/* Header */}
      <div className="pt-2 sm:pt-3 pb-1 px-4 sm:px-5 relative z-10 shrink-0">
        <div className="flex items-center justify-between max-w-xl mx-auto w-full">
          <BackButton label="Home" />
          <span
            className="text-xs sm:text-sm font-bold px-3 py-1 rounded-full glass-card"
            style={{ color: "var(--color-secondary)" }}
          >
            {currentIndex + 1} / {dueWords.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-1.5 h-2 bg-white/50 rounded-full overflow-hidden max-w-xl mx-auto">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #C084FC, #818CF8)" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Main Review Area */}
      <div className="flex-1 flex flex-col landscape:flex-row items-center justify-center px-3 sm:px-4 py-1 overflow-hidden relative z-10 w-full max-w-3xl mx-auto">
        {currentVocab ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -80, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full flex flex-col landscape:flex-row items-center justify-center landscape:gap-6"
            >
              {/* Card */}
              <div
                className="flash-card-container w-full max-w-[310px] sm:max-w-[340px] landscape:max-w-[300px] h-[min(300px,46vh)] landscape:h-[min(265px,68vh)] shrink-0"
                onClick={() => {
                  playSFX("pop");
                  setFlipped((f) => !f);
                }}
              >
                <div className={`flash-card-inner ${flipped ? "flipped" : ""}`}>
                  {/* Front */}
                  <div className="flash-card-front glass-card flex flex-col items-center justify-between p-2.5 sm:p-3 cursor-pointer border-2 border-purple-200">
                    {/* Top Mode Toggle + Real Sound */}
                    <div className="w-full flex items-center justify-between gap-1 px-1">
                      {currentVocab.photoUrl ? (
                        <div className="flex items-center gap-1 bg-slate-100/90 rounded-xl px-2 py-0.5 shadow-inner border border-slate-200 text-[10px] font-bold text-slate-600">
                          <span>📸 Ảnh thật</span>
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

                    {/* Visual Container: Real Photo */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 landscape:w-24 landscape:h-24 rounded-2xl overflow-hidden flex items-center justify-center bg-gradient-to-b from-white to-slate-50 shadow-md border-2 border-white/80 my-0.5">
                      {currentImageUrl && !imageError ? (
                        <img
                          key={currentVocab.en}
                          src={currentImageUrl}
                          alt={currentVocab.en}
                          className={`w-full h-full object-cover rounded-2xl transition-opacity duration-200 ${
                            imageLoading ? "opacity-0" : "opacity-100"
                          }`}
                          loading="eager"
                          onLoad={() => setImageLoading(false)}
                          onError={() => {
                            setImageError(true);
                            setImageLoading(false);
                          }}
                        />
                      ) : (
                        <span className="text-5xl sm:text-6xl drop-shadow-sm select-none">{currentVocab.emoji}</span>
                      )}
                    </div>

                    <div className="text-center">
                      <h2
                        className="text-xl sm:text-2xl font-extrabold"
                        style={{ fontFamily: "var(--font-heading)", color: "var(--color-secondary)" }}
                      >
                        {currentVocab.en}
                      </h2>
                      <p className="text-[11px] text-text-light mt-0.5">👆 Chạm để xem đáp án</p>
                    </div>
                  </div>

                  {/* Back */}
                  <div
                    className="flash-card-back glass-card flex flex-col items-center justify-between p-2.5 sm:p-3 cursor-pointer border-2 border-purple-200"
                    style={{ background: "linear-gradient(135deg, #f3e8ff22, white)" }}
                  >
                    {/* Compact Image */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 landscape:w-12 landscape:h-12 rounded-xl overflow-hidden flex items-center justify-center bg-white shadow-sm border border-purple-100 mt-0.5">
                      {currentImageUrl && !imageError ? (
                        <img
                          src={currentImageUrl}
                          alt={currentVocab.en}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : (
                        <span className="text-2xl sm:text-3xl">{currentVocab.emoji}</span>
                      )}
                    </div>

                    <div className="text-center my-0.5">
                      <h2
                        className="text-lg sm:text-xl font-extrabold"
                        style={{ fontFamily: "var(--font-heading)", color: "var(--color-secondary)" }}
                      >
                        {currentVocab.en}
                      </h2>
                      <p className="text-[11px] sm:text-xs text-text-light font-mono">{currentVocab.phonetic}</p>
                      <p className="text-sm sm:text-base font-bold text-purple-700" style={{ fontFamily: "var(--font-heading)" }}>
                        {currentVocab.vi}
                      </p>
                    </div>

                    {/* Bilingual practical sentence */}
                    {currentVocab.exampleSentenceEn && (
                      <div className="w-full max-w-[260px] p-1.5 rounded-xl bg-purple-50/90 border border-purple-100 text-center mb-0.5">
                        <p className="text-[11px] sm:text-xs font-semibold text-purple-950 leading-snug">
                          {currentVocab.exampleSentenceEn}
                        </p>
                        {currentVocab.exampleSentenceVi && (
                          <p className="text-[10px] text-purple-700/80 mt-0.5 leading-tight">
                            {currentVocab.exampleSentenceVi}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Controls Column (Listen & Ratings) */}
              <div className="flex flex-col items-center justify-center w-full max-w-xs landscape:max-w-[260px] mt-2 landscape:mt-0 shrink-0">
                {/* Listen button */}
                <div className="flex justify-center mb-1.5">
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      playSFX("tap");
                      speak(currentVocab.en, "en-US");
                    }}
                    className="bubble-btn w-11 h-11 sm:w-12 sm:h-12 shadow-md"
                    style={{ background: "linear-gradient(135deg, #C084FC, #818CF8)" }}
                  >
                    <Volume2 size={22} className="text-white relative z-10" />
                  </motion.button>
                </div>

                {/* Rating buttons */}
                <div className="w-full min-h-[64px] flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    {flipped ? (
                      <motion.div
                        key="ratings"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="w-full flex flex-col gap-1"
                      >
                        <p
                          className="text-center text-[11px] font-bold text-text-light"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          Bé nhớ từ này không?
                        </p>
                        <div className="grid grid-cols-3 gap-1.5 w-full">
                          <motion.button
                            whileTap={{ scale: 0.92 }}
                            onClick={() => handleRate(1)}
                            className="py-1.5 sm:py-2 rounded-xl font-bold text-[11px] sm:text-xs border-2 border-red-200 bg-red-50 text-red-600"
                            style={{ fontFamily: "var(--font-heading)" }}
                          >
                            😵 Quên rồi
                          </motion.button>
                          <motion.button
                            whileTap={{ scale: 0.92 }}
                            onClick={() => handleRate(3)}
                            className="py-1.5 sm:py-2 rounded-xl font-bold text-[11px] sm:text-xs border-2 border-yellow-200 bg-yellow-50 text-yellow-700"
                            style={{ fontFamily: "var(--font-heading)" }}
                          >
                            🤔 Hơi khó
                          </motion.button>
                          <motion.button
                            whileTap={{ scale: 0.92 }}
                            onClick={() => handleRate(5)}
                            className="py-1.5 sm:py-2 rounded-xl font-bold text-[11px] sm:text-xs border-2 border-green-200 bg-green-50 text-green-700"
                            style={{ fontFamily: "var(--font-heading)" }}
                          >
                            😎 Dễ ợt!
                          </motion.button>
                        </div>
                      </motion.div>
                    ) : (
                      <p
                        key="hint"
                        className="text-center text-xs text-text-light/80 italic py-2"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        Chạm vào thẻ để lật xem đáp án
                      </p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <p className="text-text-light">Từ vựng không tìm thấy...</p>
        )}
      </div>

      {/* Safe bottom spacer */}
      <div className="h-1 sm:h-2 shrink-0" />
    </div>
  );
}
