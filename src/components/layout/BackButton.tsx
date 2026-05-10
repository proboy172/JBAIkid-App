"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

export default function BackButton({ label }: { label?: string }) {
  const router = useRouter();

  return (
    <motion.button
      id="back-button"
      onClick={() => router.back()}
      className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 text-text font-semibold text-sm"
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
    >
      <ChevronLeft size={22} strokeWidth={3} />
      {label && <span>{label}</span>}
    </motion.button>
  );
}
