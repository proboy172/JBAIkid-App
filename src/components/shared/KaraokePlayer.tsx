"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, RefreshCcw } from "lucide-react";
import { Song } from "@/data/songs";
import { useAppStore } from "@/stores/appStore";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

export default function KaraokePlayer({ song, onClose }: { song: Song; onClose: () => void }) {
  const { addStars } = useAppStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [hasAwardedStars, setHasAwardedStars] = useState(false);
  
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const handleClose = () => {
    if (currentTime > 10 && !hasAwardedStars) {
      addStars(5);
      setHasAwardedStars(true);
    }
    onClose();
  };
  
  const playerRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadAPI = () => {
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      } else if (window.YT.Player) {
        initPlayer();
      }
    };

    window.onYouTubeIframeAPIReady = () => {
      initPlayer();
    };

    const initPlayer = () => {
      if (playerRef.current) return;
      playerRef.current = new window.YT.Player(`youtube-player-${song.id}`, {
        height: '100%',
        width: '100%',
        videoId: song.youtubeId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          enablejsapi: 1,
          origin: window.location.origin,
          showinfo: 0,
          fs: 0,
          iv_load_policy: 3
        },
        events: {
          onReady: (event: any) => {
            setIsPlayerReady(true);
            event.target.playVideo();
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              startProgressTracker();
            } else if (event.data === window.YT.PlayerState.ENDED) {
              if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
                playerRef.current.seekTo(0);
                playerRef.current.playVideo();
              }
            } else {
              setIsPlaying(false);
              stopProgressTracker();
            }
          }
        }
      });
    };

    if (song.localVideo) {
      setIsPlayerReady(true);
      return () => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.removeAttribute('src');
          videoRef.current.load();
        }
      };
    }

    loadAPI();

    return () => {
      stopProgressTracker();
      if (playerRef.current) playerRef.current.destroy();
    };
  }, [song.id, song.youtubeId, song.localVideo]);

  const startProgressTracker = () => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    progressIntervalRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const time = playerRef.current.getCurrentTime();
        setCurrentTime(time);
        
        const firstLineTime = smartLyrics.length > 0 ? smartLyrics[0].time : 3;
        const targetTime = song.introDuration || firstLineTime;
        const timeToStart = targetTime - time;
        
        if (timeToStart > 0 && timeToStart <= 4 && timeToStart > 0.1) {
          setCountdown(Math.ceil(timeToStart));
        } else {
          setCountdown(null);
        }

        if (smartLyrics.length > 0) {
          const lastLyric = smartLyrics[smartLyrics.length - 1];
          if (time > lastLyric.time + 12) {
            playerRef.current.seekTo(0);
            playerRef.current.playVideo();
          }
        }
      }
    }, 50);
  };

  const stopProgressTracker = () => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
  };

  const handleTogglePlay = () => {
    if (song.localVideo && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
      return;
    }
    if (!playerRef.current || typeof playerRef.current.playVideo !== 'function') return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const smartLyrics = useMemo(() => {
    if (!song.bpm) {
      return song.lyrics;
    }
    const intro = song.introDuration || 3;
    const wordsPerMinute = song.bpm * 0.8;
    
    let currentT = intro;
    return song.lyrics.map(line => {
      const wordCount = line.text.split(" ").length;
      const lineDuration = (wordCount / wordsPerMinute) * 60;
      const newLine = { ...line, time: currentT };
      currentT += lineDuration + 1.5; 
      return newLine;
    });
  }, [song]);

  const effectiveTime = currentTime;
  const currentLineIndex = smartLyrics.findLastIndex(l => l.time <= effectiveTime);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-black overflow-hidden flex flex-col"
    >
      {/* FULLSCREEN VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0 bg-black pointer-events-none">
        {song.localVideo ? (
          <video
            ref={videoRef}
            src={song.localVideo}
            autoPlay
            playsInline
            onTimeUpdate={(e) => {
              const time = e.currentTarget.currentTime;
              setCurrentTime(time);
              setIsPlaying(true);
              
              const firstLineTime = smartLyrics.length > 0 ? smartLyrics[0].time : 3;
              const targetTime = song.introDuration || firstLineTime;
              const timeToStart = targetTime - time;
              if (timeToStart > 0 && timeToStart <= 4) {
                setCountdown(Math.ceil(timeToStart));
              } else {
                setCountdown(null);
              }

              if (smartLyrics.length > 0) {
                const lastLyric = smartLyrics[smartLyrics.length - 1];
                if (time > lastLyric.time + 12) {
                  e.currentTarget.currentTime = 0;
                  e.currentTarget.play();
                }
              }
            }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={(e) => {
              e.currentTarget.currentTime = 0;
              e.currentTarget.play();
              setIsPlaying(true);
            }}
            className="w-full h-full object-cover"
          />
        ) : (
          <div 
            id={`youtube-player-${song.id}`} 
            className="w-full h-full object-cover scale-[1.3] md:scale-[1.15]" 
          />
        )}
      </div>

      {/* TOP GRADIENT & HEADER */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/80 to-transparent z-10" />
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-6 pt-[max(env(safe-area-inset-top),32px)] pb-2">
        <div className="flex flex-col drop-shadow-md">
          <h2 className="text-white text-xl md:text-2xl font-bold truncate flex items-center gap-2">
            <span className="text-3xl">{song.emoji}</span>
            {song.title}
          </h2>
        </div>
        <button 
          onClick={handleClose} 
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <X className="text-white" strokeWidth={3} />
        </button>
      </div>

      {/* BOTTOM GRADIENT FOR LYRICS READABILITY */}
      <div className="absolute bottom-0 inset-x-0 h-[60%] bg-gradient-to-t from-black via-black/70 to-transparent z-10 pointer-events-none" />

      {/* LYRICS AREA - CLASSIC KTV 2-LINE FULLSCREEN */}
      <div className="absolute bottom-28 md:bottom-32 inset-x-0 z-20 px-4 md:px-12 flex flex-col items-center pointer-events-none">
        
        {/* COUNTDOWN 3-2-1 */}
        <AnimatePresence>
          {countdown !== null && countdown > 0 && countdown < 4 && (
            <motion.div
              key={countdown}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ scale: 2, opacity: 0 }}
              className="absolute -top-32 md:-top-40 flex items-center justify-center"
            >
              <span 
                className="text-7xl md:text-9xl font-black"
                style={{ 
                  color: song.color,
                  WebkitTextStroke: "2px white",
                  textShadow: `0 0 30px ${song.color}`
                }}
              >
                {countdown}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2-LINE LYRICS BLOCK */}
        <div className="w-full max-w-6xl flex flex-col gap-4 md:gap-8">
          {[
            { lineIndex: Math.ceil(Math.max(0, currentLineIndex) / 2) * 2 }, // TOP LINE (EVEN)
            { lineIndex: Math.floor(Math.max(0, currentLineIndex) / 2) * 2 + 1 } // BOTTOM LINE (ODD)
          ].map((slot, slotIndex) => {
            const lineData = smartLyrics[slot.lineIndex];
            // Spacer if no line
            if (!lineData) return <div key={slotIndex} className="h-[48px] md:h-[72px] w-full" />; 
            
            const isActive = currentLineIndex === slot.lineIndex;
            const words = lineData.words ? lineData.words.map(w => w.text) : lineData.text.split(" ");
            const nextLineData = smartLyrics[slot.lineIndex + 1];

            // Adjust layout based on slot
            const alignmentClass = slotIndex === 0 
              ? "justify-start md:pr-24" // Line 1: Left
              : "justify-end md:pl-24";  // Line 2: Right

            return (
              <div 
                key={slot.lineIndex}
                className={`flex flex-wrap gap-x-2 md:gap-x-4 gap-y-2 w-full transition-all duration-300 ${alignmentClass} ${
                  isActive ? "opacity-100 scale-100" : "opacity-50 scale-95"
                }`}
                style={{ transformOrigin: slotIndex === 0 ? "left center" : "right center" }}
              >
                {words.map((word, i) => {
                  let fillPercentage = 0;
                  if (isActive) {
                    const elapsed = effectiveTime - lineData.time;
                    if (elapsed > 0) {
                      if (lineData.words && lineData.words.length === words.length) {
                        let wordStartTime = 0;
                        for (let j = 0; j < i; j++) wordStartTime += lineData.words[j].duration;
                        const wordDuration = lineData.words[i].duration;
                        const wordEndTime = wordStartTime + wordDuration;
                        if (elapsed >= wordEndTime) fillPercentage = 100;
                        else if (elapsed > wordStartTime) fillPercentage = ((elapsed - wordStartTime) / wordDuration) * 100;
                      } else {
                        const gap = nextLineData ? nextLineData.time - lineData.time : 4;
                        const duration = Math.min(gap, Math.max(2, words.length * 0.45)); 
                        const timePerWord = duration / words.length;
                        const wordStartTime = i * timePerWord;
                        const wordEndTime = wordStartTime + timePerWord;
                        if (elapsed >= wordEndTime) fillPercentage = 100;
                        else if (elapsed > wordStartTime) fillPercentage = ((elapsed - wordStartTime) / timePerWord) * 100;
                      }
                    }
                  }

                  // Determine font size
                  const isLongText = lineData.text.length > 40 || words.length > 8;
                  const textClass = isLongText 
                    ? "text-3xl md:text-5xl lg:text-6xl" 
                    : "text-4xl md:text-6xl lg:text-7xl";

                  return (
                    <span 
                      key={i}
                      className={`${textClass} font-black tracking-wide leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]`}
                      style={{ 
                        fontFamily: "var(--font-heading), Arial, sans-serif",
                        backgroundImage: `linear-gradient(to right, ${song.color} ${fillPercentage}%, white ${fillPercentage}%)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        WebkitTextStroke: isActive && fillPercentage > 0 ? "2px white" : "2px black",
                        paddingBottom: "4px"
                      }}
                    >
                      {word}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM CONTROLS */}
      <div className="absolute bottom-6 inset-x-0 z-30 flex justify-center items-center gap-10 w-full px-6 pb-[env(safe-area-inset-bottom)]">
        <button onClick={() => {
          setCurrentTime(0);
          setCountdown(null);
          if (song.localVideo && videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
            setIsPlaying(true);
          } else if (playerRef.current?.seekTo) {
            playerRef.current.seekTo(0);
            if (typeof playerRef.current.playVideo === 'function') {
              playerRef.current.playVideo();
            }
          }
        }} className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 hover:scale-105 transition-all">
          <RefreshCcw size={24} />
        </button>
        
        <button 
          onClick={handleTogglePlay}
          className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 transition-all"
        >
          {isPlaying ? <Pause size={28} fill="black" /> : <Play size={28} fill="black" className="ml-1" />}
        </button>
      </div>
    </motion.div>
  );
}
