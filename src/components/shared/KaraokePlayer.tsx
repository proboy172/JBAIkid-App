"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, RotateCcw, Mic, MicOff } from "lucide-react";
import { Song, LyricLine } from "@/data/songs";
import { useAppStore } from "@/stores/appStore";
import { playSFX } from "@/utils/soundEffects";

// Sub-component for a single Lyric Line with word-level sync
function KaraokeLine({ 
  line, 
  currentTime, 
  isActive, 
  songColor 
}: { 
  line: LyricLine; 
  currentTime: number; 
  isActive: boolean; 
  songColor: string;
}) {
  if (line.words && line.words.length > 0) {
    let runningStart = line.time;
    const timedWords = line.words.map((w) => {
      const start = runningStart;
      const end = start + w.duration;
      runningStart = end;
      return { text: w.text, duration: w.duration, start, end };
    });

    return (
      <div className={`transition-all duration-300 ${isActive ? "opacity-100 scale-100" : "opacity-50 scale-95"} text-center`}>
        <p 
          className="text-xl sm:text-2xl md:text-3xl font-black leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" 
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {timedWords.map((word, idx) => {
            const isPassed = currentTime >= word.end;
            const isCurrent = currentTime >= word.start && currentTime < word.end;
            let fillPct = 0;
            
            if (isPassed) {
              fillPct = 100;
            } else if (isCurrent) {
              fillPct = Math.min(100, Math.max(0, ((currentTime - word.start) / word.duration) * 100));
            }
            
            return (
              <span key={idx} className="relative inline-block mx-[0.2em]">
                <span className="text-white/80">{word.text}</span>
                <span 
                  className="absolute left-0 top-0 overflow-hidden whitespace-nowrap select-none"
                  style={{ 
                    width: `${fillPct}%`,
                    color: songColor || '#FF6B9D',
                    filter: 'drop-shadow(0 0 10px rgba(255,107,157,0.9))'
                  }}
                >
                  {word.text}
                </span>
              </span>
            );
          })}
        </p>
      </div>
    );
  }

  // Fallback if no word-level timing (Line-level highlight)
  return (
    <div className={`transition-all duration-300 ${isActive ? "opacity-100 scale-100" : "opacity-50 scale-95"} text-center`}>
      <p 
        className="text-xl sm:text-2xl md:text-3xl font-black leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" 
        style={{ fontFamily: "var(--font-heading)", color: isActive ? (songColor || '#FF6B9D') : 'white' }}
      >
        {line.text}
      </p>
    </div>
  );
}

export default function KaraokePlayer({ song, onClose }: { song: Song; onClose: () => void }) {
  const { addStars } = useAppStore();
  const [hasAwardedStars, setHasAwardedStars] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showLyrics, setShowLyrics] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const openTimeRef = useRef<number>(Date.now());
  const [activeLineIdx, setActiveLineIdx] = useState(-1);

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
      const time = videoRef.current.currentTime;
      setCurrentTime(time);
      
      // Find active line with 0.25s lookahead
      let newIdx = -1;
      for (let i = 0; i < song.lyrics.length; i++) {
        if (time + 0.25 >= song.lyrics[i].time) {
          newIdx = i;
        } else {
          break;
        }
      }
      setActiveLineIdx(newIdx);
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
      {/* Background Video - Takes full screen */}
      {song.localVideo && (
        <div className="absolute inset-0 z-0 pointer-events-none bg-black">
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
        <div className="flex items-center gap-3">
          {/* Toggle lyrics button */}
          {song.lyrics && song.lyrics.length > 0 && (
            <button
              onClick={() => setShowLyrics(!showLyrics)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all backdrop-blur-md border ${
                showLyrics 
                  ? "bg-primary text-white border-primary/50 shadow-md shadow-primary/30" 
                  : "bg-white/20 text-white/70 border-white/30 hover:bg-white/30"
              }`}
            >
              {showLyrics ? <Mic size={14} /> : <MicOff size={14} />}
              <span>{showLyrics ? "Lời: Bật" : "Lời: Tắt"}</span>
            </button>
          )}

          <button 
            onClick={handleClose} 
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="text-white" strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Dynamic KTV AI Lyrics Overlay */}
      <AnimatePresence>
        {showLyrics && activeLineIdx >= 0 && song.lyrics[activeLineIdx] && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-24 inset-x-4 md:inset-x-20 z-20 pointer-events-none flex flex-col items-center"
          >
            <div className="bg-black/70 backdrop-blur-md px-6 py-3.5 rounded-2xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)] max-w-2xl w-full text-center">
              <KaraokeLine 
                line={song.lyrics[activeLineIdx]} 
                currentTime={currentTime} 
                isActive={true} 
                songColor={song.color}
              />
              {song.lyrics[activeLineIdx + 1] && (
                <p className="text-xs sm:text-sm text-white/40 font-medium mt-1 truncate">
                  Tiếp: {song.lyrics[activeLineIdx + 1].text}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* Fallback YouTube player */}
      {!song.localVideo && (
        <div className="flex-1 w-full h-full flex items-center justify-center z-10 bg-black pt-20 pb-8 px-4">
          <div className="w-full h-full max-w-6xl mx-auto relative rounded-xl overflow-hidden shadow-2xl">
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
