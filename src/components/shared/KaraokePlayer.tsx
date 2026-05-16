"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause } from "lucide-react";
import { Song, LyricLine } from "@/data/songs";
import { useAppStore } from "@/stores/appStore";

// Sub-component for a single Lyric Line
function KaraokeLine({ line, currentTime, isActive }: { line: LyricLine; currentTime: number; isActive: boolean }) {
  // Word-level highlight logic
  if (line.words && line.words.length > 0) {
    let wordStartTime = line.time;
    return (
      <div className={`transition-all duration-500 ${isActive ? "opacity-100 scale-100" : "opacity-40 scale-95"} mb-6 origin-left`}>
        <p className="text-3xl md:text-5xl font-extrabold text-left leading-tight drop-shadow-2xl" style={{ fontFamily: "var(--font-heading)" }}>
          {line.words.map((word, idx) => {
            const wordEndTime = wordStartTime + word.duration;
            const isPassed = currentTime >= wordEndTime;
            const isCurrent = currentTime >= wordStartTime && currentTime < wordEndTime;
            let fillPct = 0;
            
            if (isPassed) {
              fillPct = 100;
            } else if (isCurrent) {
              fillPct = Math.min(100, Math.max(0, ((currentTime - wordStartTime) / word.duration) * 100));
            }
            
            wordStartTime = wordEndTime; // Prepare for next word
            
            return (
              <span key={idx} className="relative inline-block mr-[0.3em]">
                <span className="text-white/80">{word.text}</span>
                <span 
                  className="absolute left-0 top-0 text-[#FF6B9D] overflow-hidden whitespace-nowrap"
                  style={{ width: `${fillPct}%` }}
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
  
  // Fallback if no words array is present (Line-level highlight)
  return (
    <div className={`transition-all duration-500 ${isActive ? "opacity-100 scale-100 text-[#FF6B9D]" : "opacity-40 scale-95 text-white"} mb-6 origin-left`}>
      <p className="text-3xl md:text-5xl font-extrabold text-left drop-shadow-2xl" style={{ fontFamily: "var(--font-heading)" }}>
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeLineIdx, setActiveLineIdx] = useState(-1);

  const handleClose = () => {
    if (!hasAwardedStars) {
      addStars(5);
      setHasAwardedStars(true);
    }
    onClose();
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      setCurrentTime(time);
      
      // Find active line
      let newIdx = -1;
      for (let i = 0; i < song.lyrics.length; i++) {
        // Lookahead 0.3s for better feel
        if (time + 0.3 >= song.lyrics[i].time) {
          newIdx = i;
        } else {
          break;
        }
      }
      setActiveLineIdx(newIdx);
    }
  };

  // Smooth scroll active line
  useEffect(() => {
    if (activeLineIdx >= 0 && scrollRef.current) {
      const activeElement = scrollRef.current.children[activeLineIdx] as HTMLElement;
      if (activeElement) {
        // Custom offset scroll to keep it at the top 1/3 of the container
        const containerHeight = scrollRef.current.clientHeight;
        const offset = activeElement.offsetTop - (containerHeight / 3);
        scrollRef.current.scrollTo({ top: offset, behavior: 'smooth' });
      }
    }
  }, [activeLineIdx]);

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-black overflow-hidden flex flex-col"
    >
      {/* Background Video - Takes full screen but dimmed */}
      {song.localVideo && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video
            ref={videoRef}
            src={song.localVideo}
            autoPlay
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleClose}
            className="w-full h-full object-cover opacity-80"
          />
          {/* Elegant Gradient Overlay to make lyrics pop */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>
      )}

      {/* Header */}
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-6 pt-[max(env(safe-area-inset-top),32px)] pb-4">
        <h2 className="text-white text-xl md:text-2xl font-bold truncate flex items-center gap-2 drop-shadow-md">
          <span className="text-3xl">{song.emoji}</span>
          {song.title}
        </h2>
        <button 
          onClick={handleClose} 
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <X className="text-white" strokeWidth={3} />
        </button>
      </div>

      {/* Lyrics Engine UI (Only if localVideo exists) */}
      {song.localVideo && (
        <div className="absolute bottom-0 inset-x-0 h-[60vh] z-10 flex flex-col pointer-events-auto">
          {/* Scrolling Lyrics Container */}
          <div 
            className="flex-1 w-full overflow-y-auto px-6 pb-[30vh] pt-10 scroll-smooth [&::-webkit-scrollbar]:hidden" 
            ref={scrollRef}
            style={{ scrollbarWidth: 'none' }}
          >
             {song.lyrics.length > 0 ? (
               song.lyrics.map((line, idx) => (
                 <KaraokeLine 
                   key={idx} 
                   line={line} 
                   currentTime={currentTime} 
                   isActive={idx === activeLineIdx} 
                 />
               ))
             ) : (
               <p className="text-white/50 font-bold mt-10">Đang tải lời bài hát...</p>
             )}
          </div>
          
          {/* Play Controls Overlay */}
          <div className="absolute bottom-10 right-6 z-20">
            <button 
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_0_20px_rgba(255,107,157,0.5)] active:scale-95 transition-transform"
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
