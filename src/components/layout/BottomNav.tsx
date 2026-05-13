"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, Music, Gamepad2, Home } from "lucide-react";
import { useAppStore } from "@/stores/appStore";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", icon: Home, label: "Home", emoji: "🏠" },
  { href: "/learn", icon: BookOpen, label: "Học", emoji: "📚" },
  { href: "/review", icon: BookOpen, label: "Ôn tập", emoji: "📝" },
  { href: "/sing", icon: Music, label: "Hát", emoji: "🎵" },
  { href: "/play", icon: Gamepad2, label: "Chơi", emoji: "🎮" },
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
      <div className="flex items-center justify-around px-2 pt-2 pb-1 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const showBadge = item.href === "/review" && dueCount > 0;

          return (
            <Link
              key={item.href}
              href={item.href}
              id={`nav-${item.label.toLowerCase()}`}
              className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-2xl transition-colors relative"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-2xl"
                  style={{ background: "linear-gradient(135deg, rgba(255,107,157,0.15), rgba(192,132,252,0.15))" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <div className="relative">
                <motion.span
                  className="text-xl relative z-10 block"
                  animate={isActive ? { scale: 1.2, y: -2 } : { scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  {item.emoji}
                </motion.span>
                {/* Badge */}
                {showBadge && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center z-20 shadow-sm"
                  >
                    {dueCount > 9 ? "9+" : dueCount}
                  </motion.span>
                )}
              </div>
              <span
                className={`text-[10px] font-semibold relative z-10 transition-colors ${
                  isActive ? "text-primary" : "text-text-light"
                }`}
                style={{ fontFamily: "var(--font-body)" }}
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
