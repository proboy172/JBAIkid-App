"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, Music, Gamepad2, Home } from "lucide-react";

const navItems = [
  { href: "/", icon: Home, label: "Home", emoji: "🏠" },
  { href: "/learn", icon: BookOpen, label: "Học", emoji: "📚" },
  { href: "/sing", icon: Music, label: "Hát", emoji: "🎵" },
  { href: "/play", icon: Gamepad2, label: "Chơi", emoji: "🎮" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav" id="bottom-nav">
      <div className="flex items-center justify-around px-2 pt-2 pb-1 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              id={`nav-${item.label.toLowerCase()}`}
              className="flex flex-col items-center gap-0.5 py-1 px-4 rounded-2xl transition-colors relative"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-2xl"
                  style={{ background: "linear-gradient(135deg, rgba(255,107,157,0.15), rgba(192,132,252,0.15))" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <motion.span
                className="text-2xl relative z-10"
                animate={isActive ? { scale: 1.2, y: -2 } : { scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                {item.emoji}
              </motion.span>
              <span
                className={`text-xs font-semibold relative z-10 transition-colors ${
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
