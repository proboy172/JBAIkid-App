"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, Music, Gamepad2, Home, Tv } from "lucide-react";
import { useAppStore } from "@/stores/appStore";
import { useEffect, useState } from "react";
import { playSFX } from "@/utils/soundEffects";

const navItems = [
  { href: "/", icon: Home, label: "Home", emoji: "🏠" },
  { href: "/learn", icon: BookOpen, label: "Học", emoji: "📚" },
  { href: "/videos", icon: Tv, label: "Xem & Hát", emoji: "📺" },
  { href: "/play", icon: Gamepad2, label: "Chơi", emoji: "🎮" },
  { href: "/review", icon: BookOpen, label: "Ôn tập", emoji: "📝" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { getDueWords } = useAppStore();
  const [dueCount, setDueCount] = useState(0);

  useEffect(() => {
    const count = getDueWords().length;
    setDueCount(count);
  }, [getDueWords]);

  return (
    <nav className="bottom-nav" id="bottom-nav">
      <div className="flex items-center justify-around px-2 sm:px-6 md:px-8 pt-2 sm:pt-3 pb-1.5 sm:pb-3 max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href) || (item.href === "/videos" && pathname.startsWith("/sing"));
          const showBadge = item.href === "/review" && dueCount > 0;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => playSFX("tap")}
              id={`nav-${item.label.toLowerCase()}`}
              className="flex flex-col items-center justify-center gap-0.5 sm:gap-1.5 py-1 sm:py-2 md:py-2.5 px-2.5 sm:px-5 md:px-7 rounded-2xl sm:rounded-3xl transition-all relative group cursor-pointer select-none"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-2xl sm:rounded-3xl shadow-sm sm:shadow-md border border-pink-300/50"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 107, 157, 0.2), rgba(192, 132, 252, 0.2))",
                  }}
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <div className="relative flex items-center justify-center">
                <motion.span
                  className="text-2xl sm:text-3xl md:text-4xl relative z-10 block filter drop-shadow-sm"
                  animate={isActive ? { scale: 1.15, y: -2 } : { scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  {item.emoji}
                </motion.span>
                {/* Badge */}
                {showBadge && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-2 sm:-top-1.5 sm:-right-3 bg-red-500 text-white text-[9px] sm:text-xs font-black w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center z-20 shadow-md ring-2 ring-white"
                  >
                    {dueCount > 9 ? "9+" : dueCount}
                  </motion.span>
                )}
              </div>
              <span
                className={`text-[10px] sm:text-xs md:text-sm font-extrabold relative z-10 transition-colors whitespace-nowrap ${
                  isActive ? "text-primary" : "text-slate-500 group-hover:text-slate-700"
                }`}
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
