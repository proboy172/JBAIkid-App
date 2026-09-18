"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/layout/BackButton";
import BottomNav from "@/components/layout/BottomNav";
import { songsEn, type Song } from "@/data/songs";
import { Play } from "lucide-react";
import KaraokePlayer from "@/components/shared/KaraokePlayer";
import { playSFX } from "@/utils/soundEffects";

function SongCard({
  song,
  onPlay,
  index,
}: {
  song: Song;
  onPlay: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 300 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => {
        playSFX("tap");
        onPlay();
      }}
      className="glass-card p-4 flex items-center gap-4 cursor-pointer"
      id={`song-${song.id}`}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md shrink-0"
        style={{ background: `linear-gradient(135deg, ${song.color}44, ${song.color}22)` }}
      >
        {song.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-base truncate" style={{ fontFamily: "var(--font-heading)" }}>
          {song.title}
        </h3>
        <p className="text-xs text-text-light">YouTube • Bấm để xem</p>
      </div>
      <motion.div
        className="bubble-btn w-11 h-11 shrink-0 shadow-md"
        style={{ background: song.color }}
        whileHover={{ scale: 1.15 }}
      >
        <Play size={18} className="text-white relative z-10 ml-0.5" fill="white" />
      </motion.div>
    </motion.div>
  );
}

export default function SingEnglishPage() {
  const [activeSong, setActiveSong] = useState<Song | null>(null);

  return (
    <div className="min-h-dvh flex flex-col">
      <AnimatePresence>
        {activeSong && (
          <KaraokePlayer song={activeSong} onClose={() => setActiveSong(null)} />
        )}
      </AnimatePresence>

      <div className="pt-3 sm:pt-5 pb-2 px-4 sm:px-5 relative z-10 max-w-3xl mx-auto w-full">
        <BackButton label="Ca Hát" />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-1"
        >
          <h1
            className="text-2xl font-extrabold"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-secondary)" }}
          >
            🇬🇧 English Songs
          </h1>
        </motion.div>
      </div>

      <div className="flex-1 px-4 sm:px-5 pb-20 lg:pb-14 scroll-area relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
          {songsEn.map((song, i) => (
            <SongCard key={song.id} song={song} index={i} onPlay={() => setActiveSong(song)} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
