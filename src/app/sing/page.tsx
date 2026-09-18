"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import BackButton from "@/components/layout/BackButton";
import BottomNav from "@/components/layout/BottomNav";

const languages = [
  {
    href: "/sing/english",
    flag: "🇬🇧",
    title: "English Songs",
    subtitle: "29 Bài hát tiếng Anh có lyric",
    gradient: "linear-gradient(135deg, #818CF8, #C084FC)",
  },
  {
    href: "/sing/vietnamese",
    flag: "🇻🇳",
    title: "Bài Hát Việt",
    subtitle: "Vietnamese Songs",
    gradient: "linear-gradient(135deg, #FF6B9D, #FB923C)",
  },
  {
    href: "/videos",
    flag: "📺",
    title: "Video Bé Học",
    subtitle: "Ms Rachel & Kênh Mầm Non",
    gradient: "linear-gradient(135deg, #06B6D4, #3B82F6)",
  },
];

export default function SingPage() {
  return (
    <div className="min-h-dvh flex flex-col">
      <div className="pt-3 sm:pt-5 pb-2 px-5 relative z-10 max-w-4xl mx-auto w-full">
        <BackButton label="Home" />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-1"
        >
          <h1
            className="text-2xl sm:text-3xl font-extrabold"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-secondary)" }}
          >
            🎵 Ca Hát & Video
          </h1>
          <p className="text-xs sm:text-sm text-text-light mt-0.5">Chọn ngôn ngữ bé muốn hát hoặc xem kênh học tập!</p>
        </motion.div>
      </div>

      <div className="flex-1 px-5 pb-24 lg:pb-16 pt-2 scroll-area relative z-10 w-full flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl w-full">
          {languages.map((lang, i) => (
            <Link key={lang.href} href={lang.href} prefetch={false} className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, type: "spring", stiffness: 300 }}
                whileTap={{ scale: 0.95, rotate: -1 }}
                whileHover={{ scale: 1.02 }}
                className="rounded-3xl p-6 sm:p-8 flex flex-col items-center gap-2.5 shadow-xl cursor-pointer text-white h-full"
                style={{ background: lang.gradient }}
                id={`sing-${lang.href.split("/").pop()}`}
              >
                <motion.span
                  className="text-5xl sm:text-6xl"
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                >
                  {lang.flag}
                </motion.span>
                <h2 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                  {lang.title}
                </h2>
                <p className="text-xs sm:text-sm opacity-85">{lang.subtitle}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
