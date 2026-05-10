"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, RefreshCcw, Music } from "lucide-react";
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
  const [beatPulse, setBeatPulse] = useState(0);

  const handleClose = () => {
    // Reward 5 stars if watched for at least 10 seconds
    if (currentTime > 10 && !hasAwardedStars) {
      addStars(5);
      setHasAwardedStars(true);
    }
    onClose();
  };
  
  const playerRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // BPM-Based Pulsing (Simulates "listening" to the music)
  useEffect(() => {
    if (!isPlaying || !song.bpm) {
      setBeatPulse(0);
      return;
    }

    const interval = 60 / song.bpm; // seconds per beat
    let rafId: number;

    const pulseLoop = () => {
      const now = Date.now() / 1000;
      const phase = (now % interval) / interval;
      // Exponential decay pulse for a "kick drum" feel
      const pulse = Math.pow(1 - phase, 4); 
      setBeatPulse(pulse);
      rafId = requestAnimationFrame(pulseLoop);
    };

    rafId = requestAnimationFrame(pulseLoop);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isPlaying, song.bpm]);

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
          origin: window.location.origin
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
              // Auto-loop when YouTube video naturally ends
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

    // Nếu có video local, không cần YouTube API
    if (song.localVideo) {
      // Video local tự phát qua autoPlay attr, theo dõi thời gian qua onTimeUpdate
      setIsPlayerReady(true);
      return () => {
        // Cleanup: pause video and reset state on unmount to prevent memory leak
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
        
        // AUTO-SYNC: Calculate countdown
        const firstLineTime = smartLyrics.length > 0 ? smartLyrics[0].time : 3;
        const targetTime = song.introDuration || firstLineTime;
        const timeToStart = targetTime - time;
        
        if (timeToStart > 0 && timeToStart <= 4 && timeToStart > 0.1) {
          setCountdown(Math.ceil(timeToStart));
        } else {
          setCountdown(null);
        }

        // Auto-loop logic: restart video after last lyric finishes
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
    // Local video
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
    // YouTube
    if (!playerRef.current || typeof playerRef.current.playVideo !== 'function') return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  // --- SMART AUTO-SYNC ALGORITHM ---
  // Tự động nội suy thời gian hát dựa trên số lượng chữ và tốc độ nhạc thiếu nhi chuẩn
  const smartLyrics = useMemo(() => {
    // Nếu bài hát không thiết lập bpm, có nghĩa là đang sử dụng thời gian chèn tay chuẩn xác
    if (!song.bpm) {
      return song.lyrics;
    }

    const intro = song.introDuration || 3; // Nhạc dạo trung bình 3 giây
    const wordsPerMinute = song.bpm * 0.8;
    
    let currentT = intro;
    return song.lyrics.map(line => {
      const wordCount = line.text.split(" ").length;
      const lineDuration = (wordCount / wordsPerMinute) * 60;
      
      const newLine = { ...line, time: currentT };
      // Cộng dồn thời gian hát và thời gian nghỉ (1.5s) cho câu tiếp theo
      currentT += lineDuration + 1.5; 
      return newLine;
    });
  }, [song]);

  const effectiveTime = currentTime;
  const currentLineIndex = smartLyrics.findLastIndex(l => l.time <= effectiveTime);
  const currentLine = currentLineIndex >= 0 ? smartLyrics[currentLineIndex] : null;
  const nextLine = currentLineIndex + 1 < smartLyrics.length ? smartLyrics[currentLineIndex + 1] : null;

  const currentWords = currentLine ? currentLine.text.split(" ") : [];

  const getWordFillPercentage = (wordIndex: number, totalWords: number) => {
    if (!currentLine) return 0;
    const elapsed = effectiveTime - currentLine.time;
    if (elapsed < 0) return 0;

    // 100% SYNC: Nếu bài hát có cấu hình độ dài từng chữ
    if (currentLine.words && currentLine.words.length === totalWords) {
      let wordStartTime = 0;
      for (let i = 0; i < wordIndex; i++) {
        wordStartTime += currentLine.words[i].duration;
      }
      const wordDuration = currentLine.words[wordIndex].duration;
      const wordEndTime = wordStartTime + wordDuration;

      if (elapsed >= wordEndTime) return 100;
      if (elapsed <= wordStartTime) return 0;
      return ((elapsed - wordStartTime) / wordDuration) * 100;
    }

    // FALLBACK (Auto Sync): Tính tổng thời gian để hát hết 1 câu
    const gap = nextLine ? nextLine.time - currentLine.time : 4;
    // Tối đa 4 giây hoặc 0.45s mỗi chữ, tránh hát quá chậm khi có đoạn nhạc dạo
    const duration = Math.min(gap, Math.max(2, totalWords * 0.45)); 
    
    const timePerWord = duration / totalWords;
    const wordStartTime = wordIndex * timePerWord;
    const wordEndTime = wordStartTime + timePerWord;
    
    if (elapsed >= wordEndTime) return 100;
    if (elapsed <= wordStartTime) return 0;
    
    return ((elapsed - wordStartTime) / timePerWord) * 100;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] flex flex-col bg-black overflow-hidden"
    >
      {/* Smart Pulse Background (Simulated via BPM) */}
      <motion.div 
        className="absolute inset-0 bg-[#0F172A]"
        animate={{ opacity: 0.1 + (beatPulse * 0.15) }}
        transition={{ duration: 0.1 }}
      />
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-10 pb-2 relative z-10">
        <div className="flex flex-col">
          <h2 className="text-white text-xl font-bold truncate flex items-center gap-2">
            <span className="text-3xl">{song.emoji}</span>
            {song.title}
          </h2>
          <div className="flex items-center gap-2 mt-1">
             <span className="text-[10px] text-primary flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                <Music size={10} /> Đang khớp nhạc tự động...
              </span>
          </div>
        </div>
        <button onClick={handleClose} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
          <X className="text-white" />
        </button>
      </div>

      {/* Video */}
      <div className="flex justify-center px-4 relative z-10 flex-shrink-0">
        <motion.div 
          className="w-full max-w-2xl max-h-[25vh] md:max-h-[35vh] aspect-video rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-black border-2 md:border-4 border-white/5"
          animate={{ scale: 1 + (beatPulse * 0.02) }}
          transition={{ duration: 0.1 }}
        >
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
                
                // Countdown logic - align with first lyric line
                const firstLineTime = smartLyrics.length > 0 ? smartLyrics[0].time : 3;
                const targetTime = song.introDuration || firstLineTime;
                const timeToStart = targetTime - time;
                if (timeToStart > 0 && timeToStart <= 4) {
                  setCountdown(Math.ceil(timeToStart));
                } else {
                  setCountdown(null);
                }

                // Auto-loop logic: restart video after last lyric finishes
                if (smartLyrics.length > 0) {
                  const lastLyric = smartLyrics[smartLyrics.length - 1];
                  // If video has played 12 seconds past the final lyric, auto-restart!
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
              className="w-full h-full object-contain bg-black"
            />
          ) : (
            <div id={`youtube-player-${song.id}`} className="pointer-events-none" />
          )}
        </motion.div>
      </div>

      {/* Lyrics Area - Classic 2-line Alternating KTV Style */}
      <div className="flex-1 w-full flex flex-col items-center justify-center px-2 md:px-4 relative z-10 text-center overflow-hidden min-h-[160px]">
        {/* Countdown Indicator (3-2-1) */}
        <AnimatePresence>
          {countdown !== null && countdown > 0 && countdown < 4 && (
            <motion.div
              key={countdown}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ scale: 2, opacity: 0 }}
              className="absolute top-4 flex items-center justify-center"
            >
              <span 
                className="text-6xl md:text-8xl font-black"
                style={{ 
                  color: song.color,
                  WebkitTextStroke: "2px white",
                  textShadow: `0 0 20px ${song.color}`
                }}
              >
                {countdown}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative w-full max-w-5xl flex flex-col items-center justify-center gap-2 sm:gap-4 md:gap-8 mt-2">
          {[
            { lineIndex: Math.ceil(Math.max(0, currentLineIndex) / 2) * 2 }, // Slot 0: Top Line (Even)
            { lineIndex: Math.floor(Math.max(0, currentLineIndex) / 2) * 2 + 1 } // Slot 1: Bottom Line (Odd)
          ].map((slot, slotIndex) => {
            const lineData = smartLyrics[slot.lineIndex];
            if (!lineData) return <div key={slotIndex} className="h-[40px] sm:h-[60px] md:h-[80px] w-full" />; // Spacer for empty slots
            
            const isActive = currentLineIndex === slot.lineIndex;
            const words = lineData.words ? lineData.words.map(w => w.text) : lineData.text.split(" ");
            const nextLineData = smartLyrics[slot.lineIndex + 1];

            return (
              <div 
                key={slot.lineIndex}
                className={`flex flex-wrap gap-x-2 sm:gap-x-3 gap-y-1 sm:gap-y-2 py-1 sm:py-2 w-full transition-all duration-500 ease-in-out ${
                  slotIndex === 0 ? 'justify-start md:justify-center pr-4 md:pr-10' : 'justify-end md:justify-center pl-4 md:pl-10'
                } ${isActive ? 'scale-[1.02] sm:scale-105 opacity-100' : 'scale-100 opacity-50'}`}
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

                  return (
                    <span 
                      key={i}
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide"
                      style={{ 
                        fontFamily: "Arial, Helvetica, sans-serif",
                        backgroundImage: `linear-gradient(to right, ${song.color} ${fillPercentage}%, rgba(255,255,255,0.3) ${fillPercentage}%)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        WebkitTextStroke: isActive && fillPercentage > 0 ? "1px white" : "2px rgba(255,255,255,0.2)",
                        lineHeight: "1.2",
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

      {/* Footer Controls */}
      <div className="relative z-20 flex-shrink-0 pt-4 pb-4 flex justify-center items-center gap-10 w-full bg-gradient-to-t from-black via-black to-transparent">
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
          }} className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors">
            <RefreshCcw size={22} />
          </button>
          
          <button 
            onClick={handleTogglePlay}
            className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all"
          >
            {isPlaying ? <Pause size={32} fill="black" /> : <Play size={32} fill="black" className="ml-1" />}
          </button>
      </div>
    </motion.div>
  );
}
