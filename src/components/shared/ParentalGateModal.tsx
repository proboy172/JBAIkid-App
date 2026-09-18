"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Lock, ShieldCheck, X, RefreshCw } from "lucide-react";
import { playSFX } from "@/utils/soundEffects";

interface ParentalGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  title?: string;
}

const VIETNAMESE_NUMBERS = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín", "mười"];

function generateMathChallenge() {
  const num1 = Math.floor(Math.random() * 8) + 2; // 2 to 9
  const num2 = Math.floor(Math.random() * 8) + 2; // 2 to 9
  const isMultiplication = Math.random() > 0.5;

  let questionText = "";
  let correctAnswer = 0;

  if (isMultiplication) {
    correctAnswer = num1 * num2;
    questionText = `${VIETNAMESE_NUMBERS[num1] || num1} nhân ${VIETNAMESE_NUMBERS[num2] || num2} bằng bao nhiêu?`;
  } else {
    correctAnswer = num1 + num2;
    questionText = `${VIETNAMESE_NUMBERS[num1] || num1} cộng ${VIETNAMESE_NUMBERS[num2] || num2} bằng bao nhiêu?`;
  }

  // Generate 4 options
  const optionsSet = new Set<number>([correctAnswer]);
  while (optionsSet.size < 4) {
    const delta = Math.floor(Math.random() * 9) - 4;
    const fake = Math.max(1, correctAnswer + delta);
    optionsSet.add(fake);
  }

  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return {
    questionText,
    correctAnswer,
    options,
  };
}

export default function ParentalGateModal({
  isOpen,
  onClose,
  onSuccess,
  title = "Dành Riêng Cho Phụ Huynh",
}: ParentalGateModalProps) {
  const [challenge, setChallenge] = useState(generateMathChallenge);
  const [errorShake, setErrorShake] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const holdIntervalRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen) {
      setChallenge(generateMathChallenge());
      setHoldProgress(0);
      setIsHolding(false);
      setErrorShake(false);
    }
  }, [isOpen]);

  const handleSelectOption = (selected: number) => {
    playSFX("tap");
    if (selected === challenge.correctAnswer) {
      playSFX("correct");
      onSuccess();
      onClose();
    } else {
      playSFX("boop");
      setErrorShake(true);
      setTimeout(() => {
        setErrorShake(false);
        setChallenge(generateMathChallenge());
      }, 500);
    }
  };

  // Hold 3 seconds alternative
  const startHold = () => {
    setIsHolding(true);
    let count = 0;
    holdIntervalRef.current = setInterval(() => {
      count += 50;
      const pct = Math.min(100, (count / 2500) * 100);
      setHoldProgress(pct);
      if (count >= 2500) {
        clearInterval(holdIntervalRef.current);
        playSFX("correct");
        onSuccess();
        onClose();
      }
    }, 50);
  };

  const endHold = () => {
    setIsHolding(false);
    setHoldProgress(0);
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1300] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, x: errorShake ? [-10, 10, -10, 10, 0] : 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border-2 border-slate-200 text-center relative"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            playSFX("tap");
            endHold();
            onClose();
          }}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors"
        >
          <X size={16} />
        </button>

        {/* Icon & Title */}
        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 mx-auto flex items-center justify-center mb-2 shadow-inner">
          <ShieldCheck size={26} />
        </div>

        <h3 className="text-lg font-black text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>
          {title}
        </h3>
        <p className="text-xs text-text-light mt-0.5">
          Vui lòng giải phép tính bằng chữ dưới đây để xác nhận bạn là phụ huynh:
        </p>

        {/* Math Question Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 my-3.5">
          <p className="text-sm sm:text-base font-extrabold text-slate-800 capitalize leading-snug">
            "{challenge.questionText}"
          </p>
        </div>

        {/* 4 Choices Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {challenge.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectOption(opt)}
              className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 font-black text-base transition-all border border-slate-200/80"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Or Hold 3s button */}
        <div className="pt-3 border-t border-gray-100">
          <p className="text-[11px] text-gray-400 mb-2 font-medium">Hoặc nhấn giữ ổ khóa 3 giây:</p>
          <button
            onMouseDown={startHold}
            onMouseUp={endHold}
            onMouseLeave={endHold}
            onTouchStart={startHold}
            onTouchEnd={endHold}
            className="relative w-full py-2.5 rounded-2xl bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 overflow-hidden shadow-md select-none cursor-pointer active:scale-98"
          >
            {/* Progress Fill Bar */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-primary/40 transition-all"
              style={{ width: `${holdProgress}%` }}
            />
            <Lock size={14} className="relative z-10" />
            <span className="relative z-10">
              {isHolding ? `Đang giữ (${Math.round(holdProgress)}%)...` : "Nhấn & Giữ 3 giây để mở"}
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
