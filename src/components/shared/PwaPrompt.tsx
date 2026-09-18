"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, Download, Share, PlusSquare } from "lucide-react";
import { playSFX } from "@/utils/soundEffects";

export default function PwaPrompt({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isIOS, setIsIOS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userAgent = window.navigator.userAgent.toLowerCase();
      setIsIOS(/iphone|ipad|ipod/.test(userAgent));

      const handleBeforeInstall = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
      };

      window.addEventListener("beforeinstallprompt", handleBeforeInstall);
      return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    }
  }, []);

  const handleNativeInstall = async () => {
    if (deferredPrompt) {
      playSFX("tap");
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={() => {
              playSFX("tap");
              onClose();
            }}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
          >
            <X size={18} />
          </button>

          {/* Icon */}
          <div className="w-16 h-16 rounded-3xl bg-pink-100 flex items-center justify-center text-3xl mb-3 shadow-sm text-primary">
            📱
          </div>

          <h2
            className="text-2xl font-extrabold text-gray-800"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Cài Đặt App Cho Bé
          </h2>

          <p className="text-xs text-text-light mt-1 mb-5">
            Cài đặt về màn hình chính điện thoại để bé mở học toàn màn hình 1 chạm, không sợ bé bấm nhầm thanh web!
          </p>

          {/* Instructions */}
          {isIOS ? (
            <div className="w-full bg-gray-50 p-4 rounded-2xl border border-gray-200 text-left space-y-3 mb-5 text-xs text-gray-700">
              <div className="flex items-center gap-2.5 font-medium">
                <span className="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  1
                </span>
                <span>Bấm vào nút <strong className="text-primary inline-flex items-center gap-0.5"><Share size={13} /> Chia sẻ</strong> ở dưới trình duyệt Safari.</span>
              </div>
              <div className="flex items-center gap-2.5 font-medium">
                <span className="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  2
                </span>
                <span>Cuộn xuống chọn <strong className="text-primary inline-flex items-center gap-0.5"><PlusSquare size={13} /> Thêm vào MH chính</strong>.</span>
              </div>
            </div>
          ) : deferredPrompt ? (
            <button
              onClick={handleNativeInstall}
              className="btn-3d btn-3d-primary w-full py-4 text-base font-bold shadow-lg mb-4 flex items-center justify-center gap-2"
            >
              <Download size={18} />
              <span>Cài Đặt Ngay (1 Chạm)</span>
            </button>
          ) : (
            <div className="w-full bg-gray-50 p-4 rounded-2xl border border-gray-200 text-left space-y-3 mb-5 text-xs text-gray-700">
              <div className="flex items-center gap-2.5 font-medium">
                <span className="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  1
                </span>
                <span>Bấm vào biểu tượng <strong>Menu 3 chấm (⋮)</strong> ở góc trên Chrome.</span>
              </div>
              <div className="flex items-center gap-2.5 font-medium">
                <span className="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  2
                </span>
                <span>Chọn <strong>Thêm vào màn hình chính</strong> hoặc <strong>Cài đặt ứng dụng</strong>.</span>
              </div>
            </div>
          )}

          <button
            onClick={() => {
              playSFX("tap");
              onClose();
            }}
            className="text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors"
          >
            Đã hiểu, đóng lại
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
