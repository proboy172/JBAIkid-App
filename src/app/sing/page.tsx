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
    subtitle: "Bài hát tiếng Anh",
    gradient: "linear-gradient(135deg, #818CF8, #C084FC)",
  },
  {
    href: "/sing/vietnamese",
    flag: "🇻🇳",
    title: "Bài Hát Việt",
    subtitle: "Vietnamese Songs",
    gradient: "linear-gradient(135deg, #FF6B9D, #FB923C)",
  },
];

export default function SingPage() {
  return (
    <div className="min-h-dvh flex flex-col">
      <div className="pt-10 pb-4 px-5 relative z-10">
        <BackButton label="Home" />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-3"
        >
          <h1
            className="text-3xl font-extrabold"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-secondary)" }}
          >
            🎵 Ca Hát
          </h1>
          <p className="text-sm text-text-light mt-1">Chọn ngôn ngữ bé muốn hát!</p>
        </motion.div>
      </div>

      <div className="flex-1 px-5 pb-36 pt-4 scroll-area relative z-10 w-full flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl w-full">
          {languages.map((lang, i) => (
            <Link key={lang.href} href={lang.href} prefetch={false} className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, type: "spring", stiffness: 300 }}
                whileTap={{ scale: 0.94, rotate: -1 }}
                whileHover={{ scale: 1.03 }}
                className="rounded-3xl p-8 flex flex-col items-center gap-3 shadow-xl cursor-pointer text-white h-full"
                style={{ background: lang.gradient }}
                id={`sing-${lang.href.split("/").pop()}`}
              >
                <motion.span
                  className="text-7xl"
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                >
                  {lang.flag}
                </motion.span>
                <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                  {lang.title}
                </h2>
                <p className="text-sm opacity-85">{lang.subtitle}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
