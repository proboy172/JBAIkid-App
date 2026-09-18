"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { X, Play, Pause, RotateCcw } from "lucide-react";
import { Song } from "@/data/songs";
import { useAppStore } from "@/stores/appStore";
import { playSFX } from "@/utils/soundEffects";

export default function KaraokePlayer({ song, onClose }: { song: Song; onClose: () => void }) {
  const { addStars } = useAppStore();
  const [hasAwardedStars, setHasAwardedStars] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const openTimeRef = useRef<number>(Date.now());

  const handleClose = () => {
    playSFX("tap");
    const elapsedSeconds = (Date.now() - openTimeRef.current) / 1000;
    const qualified = (song.localVideo && currentTime >= 15) || (!song.localVideo && elapsedSeconds >= 15);
    if (!hasAwardedStars && qualified) {
      addStars(5);
      setHasAwardedStars(true);
      playSFX("star");
    }
    onClose();
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleRestart = () => {
    playSFX("tap");
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-black overflow-hidden flex flex-col"
    >
      {/* Background Video - Takes full screen (if local file) */}
      {song.localVideo && (
        <div className="absolute inset-0 z-0 bg-black">
          <video
            ref={videoRef}
            src={song.localVideo}
            autoPlay
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleClose}
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* Header */}
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-6 pt-[max(env(safe-area-inset-top),32px)] pb-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        <h2 className="text-white text-xl md:text-2xl font-bold truncate flex items-center gap-2 drop-shadow-md">
          <span className="text-3xl">{song.emoji}</span>
          {song.title}
        </h2>

        <button 
          onClick={handleClose} 
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
          title="Đóng video"
        >
          <X className="text-white" strokeWidth={3} />
        </button>
      </div>

      {/* Play Controls Overlay (Only if localVideo exists) */}
      {song.localVideo && (
        <div className="absolute bottom-0 inset-x-0 h-[25vh] z-10 flex items-end justify-between px-6 pb-6 pointer-events-none bg-gradient-to-t from-black/80 via-black/20 to-transparent">
          <div className="pointer-events-auto">
            <button 
              onClick={handleRestart}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white/30 active:scale-95 transition-all"
              title="Phát lại từ đầu"
            >
              <RotateCcw size={20} />
            </button>
          </div>

          <div className="pointer-events-auto">
            <button 
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_0_20px_rgba(255,107,157,0.5)] active:scale-95 transition-transform"
              title={isPlaying ? "Tạm dừng" : "Phát tiếp"}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
            </button>
          </div>
        </div>
      )}

      {/* YouTube Player */}
      {!song.localVideo && (
        <div className="flex-1 w-full h-full flex items-center justify-center z-10 bg-black pt-20 pb-6 px-3 sm:px-6">
          <div className="w-full h-full max-w-6xl mx-auto relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <iframe
              src={`https://www.youtube.com/embed/${song.youtubeId}?autoplay=1&controls=1&rel=0`}
              title={song.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
