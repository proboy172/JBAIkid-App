"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  Volume2,
  Languages,
  Sparkles,
  Lock,
  Unlock,
  SkipBack,
  SkipForward,
  Heart,
  Award,
} from "lucide-react";
import { Song, songsEn, songsVi, getRecommendedSongs } from "@/data/songs";
import { useAppStore } from "@/stores/appStore";
import { playSFX } from "@/utils/soundEffects";
import { useSpeech } from "@/hooks/useSpeech";
import VideoEndRecommendation, { RecommendedItem } from "@/components/videos/VideoEndRecommendation";
import YouTubeKidsVideoDrawer from "@/components/videos/YouTubeKidsVideoDrawer";

interface KaraokePlayerProps {
  song: Song;
  onClose: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onSelectSong?: (newSong: Song) => void;
  randomMode?: boolean;
}

export default function KaraokePlayer({
  song,
  onClose,
  isFavorite = false,
  onToggleFavorite,
  onSelectSong,
  randomMode = false,
}: KaraokePlayerProps) {
  const { addStars } = useAppStore();
  const { speak } = useSpeech();
  const [currentSong, setCurrentSong] = useState<Song>(song);
  const [hasAwardedStars, setHasAwardedStars] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showLyricsPanel, setShowLyricsPanel] = useState(false);
  const [showTranslation, setShowTranslation] = useState(true);
  const [isSongEnded, setIsSongEnded] = useState(false);
  const [showQuickDrawer, setShowQuickDrawer] = useState(false);
  const [isAutoPlayNext, setIsAutoPlayNext] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [unlockTapCount, setUnlockTapCount] = useState(0);
  const [showHUD, setShowHUD] = useState(false);
  const [historyStack, setHistoryStack] = useState<string[]>([]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const openTimeRef = useRef<number>(Date.now());
  const hudTimerRef = useRef<NodeJS.Timeout | null>(null);
  const unlockTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync state if song prop changes
  useEffect(() => {
    setCurrentSong(song);
    setIsSongEnded(false);
    setShowQuickDrawer(false);
    setShowHUD(false);
    setShowLyricsPanel(false);
    setHasAwardedStars(false);
    setIsPlaying(true);
    openTimeRef.current = Date.now();
  }, [song]);

  const isEnglishSong = songsEn.some((en) => en.id === currentSong.id);

  // Rich pool of 20 song recommendations matching SafeVideoModal
  const [songRecommendations, setSongRecommendations] = useState<RecommendedItem[]>(() =>
    getRecommendedSongs(currentSong, 20, randomMode).map((s) => ({
      id: s.id,
      title: s.title,
      thumbnail: s.youtubeId
        ? `https://img.youtube.com/vi/${s.youtubeId}/hqdefault.jpg`
        : "/images/karaoke-thumb.jpg",
      channelOrArtist: songsEn.some((en) => en.id === s.id) ? "English Nursery" : "Bài Hát Thiếu Nhi",
      avatarOrEmoji: s.emoji,
      duration: `${s.lyrics.length} câu`,
      categoryName: "Karaoke Thiếu Nhi",
    }))
  );

  useEffect(() => {
    setSongRecommendations(
      getRecommendedSongs(currentSong, 20, randomMode).map((s) => ({
        id: s.id,
        title: s.title,
        thumbnail: s.youtubeId
          ? `https://img.youtube.com/vi/${s.youtubeId}/hqdefault.jpg`
          : "/images/karaoke-thumb.jpg",
        channelOrArtist: songsEn.some((en) => en.id === s.id) ? "English Nursery" : "Bài Hát Thiếu Nhi",
        avatarOrEmoji: s.emoji,
        duration: `${s.lyrics.length} câu`,
        categoryName: "Karaoke Thiếu Nhi",
      }))
    );
  }, [currentSong, randomMode]);

  const handleRefreshSongRecommendations = () => {
    setSongRecommendations(
      getRecommendedSongs(currentSong, 20, randomMode).map((s) => ({
        id: s.id,
        title: s.title,
        thumbnail: s.youtubeId
          ? `https://img.youtube.com/vi/${s.youtubeId}/hqdefault.jpg`
          : "/images/karaoke-thumb.jpg",
        channelOrArtist: songsEn.some((en) => en.id === s.id) ? "English Nursery" : "Bài Hát Thiếu Nhi",
        avatarOrEmoji: s.emoji,
        duration: `${s.lyrics.length} câu`,
        categoryName: "Karaoke Thiếu Nhi",
      }))
    );
  };

  // Continuous Handshake & Message Listener for YouTube Iframe Player
  useEffect(() => {
    const sendHandshake = () => {
      try {
        if (iframeRef.current?.contentWindow) {
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({ event: "listening", id: 1, channel: "widget" }),
            "*"
          );
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({ event: "command", func: "addEventListener", args: ["onStateChange"] }),
            "*"
          );
        }
      } catch {}
    };

    sendHandshake();
    const interval = setInterval(sendHandshake, 1200);
    const stopTimer = setTimeout(() => clearInterval(interval), 15000);

    const handleMessage = (e: MessageEvent) => {
      try {
        let data = e.data;
        if (typeof data === "string") {
          try {
            data = JSON.parse(data);
          } catch {
            return;
          }
        }
        if (!data) return;

        // Player State changes
        // 1 = Playing, 2 = Paused, 0 = Ended
        if (data.event === "onStateChange") {
          if (data.info === 1 || data.info === "1") {
            setIsPlaying(true);
          } else if (data.info === 2 || data.info === "2") {
            setIsPlaying(false);
          } else if (data.info === 0 || data.info === "0") {
            handleSongFinished();
          }
        }

        if (data.event === "infoDelivery" && data.info) {
          if (data.info.playerState === 1 || data.info.playerState === "1") {
            setIsPlaying(true);
          } else if (data.info.playerState === 2 || data.info.playerState === "2") {
            setIsPlaying(false);
          } else if (data.info.playerState === 0 || data.info.playerState === "0") {
            handleSongFinished();
          }

          // Near-end detection via infoDelivery
          const ct = data.info.currentTime;
          if (typeof ct === "number") {
            setCurrentTime(ct);
          }
          const dur = data.info.duration;
          if (typeof ct === "number" && typeof dur === "number" && dur > 5 && ct >= dur - 1.5) {
            handleSongFinished();
          }
        }
      } catch {}
    };

    window.addEventListener("message", handleMessage);
    return () => {
      clearInterval(interval);
      clearTimeout(stopTimer);
      window.removeEventListener("message", handleMessage);
    };
  }, [iframeKey, currentSong.id]);

  // HUD Auto-Hide Timer (4.5s of inactivity like YouTube Kids)
  const resetHUDTimer = useCallback(() => {
    if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
    hudTimerRef.current = setTimeout(() => {
      setShowHUD(false);
    }, 4500);
  }, []);

  const handleOpenHUD = useCallback(() => {
    if (isLocked || isSongEnded) return;
    setShowHUD(true);
    resetHUDTimer();
  }, [isLocked, isSongEnded, resetHUDTimer]);

  const handleCloseHUD = useCallback(() => {
    if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
    setShowHUD(false);
  }, []);

  // Toddler 3-Tap Safety Unlock
  const handleUnlockTap = () => {
    const nextCount = unlockTapCount + 1;
    if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);

    if (nextCount >= 3) {
      playSFX("cheer");
      setUnlockTapCount(3);
      setTimeout(() => {
        setIsLocked(false);
        setUnlockTapCount(0);
      }, 400);
    } else {
      playSFX("boop");
      setUnlockTapCount(nextCount);
      unlockTimerRef.current = setTimeout(() => {
        setUnlockTapCount(0);
      }, 2500);
    }
  };

  const toggleLock = () => {
    playSFX("tap");
    if (!isLocked) {
      setIsLocked(true);
      setUnlockTapCount(0);
      setShowHUD(false);
      setShowQuickDrawer(false);
    } else {
      handleUnlockTap();
    }
  };

  // Award 5 stars automatically if the child listens for at least 25 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasAwardedStars) {
        addStars(5);
        setHasAwardedStars(true);
        playSFX("star");
      }
    }, 25000);

    return () => clearTimeout(timer);
  }, [addStars, hasAwardedStars, currentSong.id]);

  const handleSongFinished = () => {
    if (!hasAwardedStars) {
      addStars(5);
      setHasAwardedStars(true);
      playSFX("star");
    }
    setIsSongEnded(true);
    setShowHUD(false);
  };

  const handleSelectNextSong = (nextId: string) => {
    const all = [...songsEn, ...songsVi];
    const nextS = all.find((s) => s.id === nextId);
    if (nextS) {
      setHistoryStack((prev) => [...prev, currentSong.id]);
      setCurrentSong(nextS);
      setIsSongEnded(false);
      setShowQuickDrawer(false);
      setShowHUD(false);
      setIsPlaying(true);
      setIframeKey((prev) => prev + 1);
      setHasAwardedStars(false);
      openTimeRef.current = Date.now();
      onSelectSong?.(nextS);
    }
  };

  const handlePreviousSong = () => {
    playSFX("tap");
    if (historyStack.length > 0) {
      const prevId = historyStack[historyStack.length - 1];
      setHistoryStack((prev) => prev.slice(0, -1));
      const all = [...songsEn, ...songsVi];
      const prevS = all.find((s) => s.id === prevId);
      if (prevS) {
        setCurrentSong(prevS);
        setIsSongEnded(false);
        setShowQuickDrawer(false);
        setShowHUD(false);
        setIsPlaying(true);
        setIframeKey((prev) => prev + 1);
        setHasAwardedStars(false);
        openTimeRef.current = Date.now();
        onSelectSong?.(prevS);
        return;
      }
    }
    handleRandomSongSurprise();
  };

  const handleNextSongShortcut = () => {
    playSFX("tap");
    if (randomMode) {
      handleRandomSongSurprise();
    } else if (songRecommendations.length > 0) {
      handleSelectNextSong(songRecommendations[0].id);
    } else {
      handleRandomSongSurprise();
    }
  };

  const handleRandomSongSurprise = () => {
    const all = [...songsEn, ...songsVi].filter((s) => s.id !== currentSong.id);
    if (all.length === 0) return;
    const randomSong = all[Math.floor(Math.random() * all.length)];
    setHistoryStack((prev) => [...prev, currentSong.id]);
    setCurrentSong(randomSong);
    setIsSongEnded(false);
    setShowQuickDrawer(false);
    setShowHUD(false);
    setIsPlaying(true);
    setIframeKey((prev) => prev + 1);
    setHasAwardedStars(false);
    openTimeRef.current = Date.now();
    onSelectSong?.(randomSong);
  };

  const handleReplaySong = () => {
    setIsSongEnded(false);
    setShowHUD(false);
    setIsPlaying(true);
    if (currentSong.localVideo && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      setIframeKey((prev) => prev + 1);
    }
    openTimeRef.current = Date.now();
  };

  const handleClose = () => {
    if (isLocked) {
      handleUnlockTap();
      return;
    }
    playSFX("tap");
    const elapsedSeconds = (Date.now() - openTimeRef.current) / 1000;
    const qualified = (currentSong.localVideo && currentTime >= 15) || (!currentSong.localVideo && elapsedSeconds >= 15);
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
    playSFX("tap");
    if (currentSong.localVideo && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    } else if (iframeRef.current?.contentWindow) {
      if (isPlaying) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: "pauseVideo", args: [] }),
          "*"
        );
        setIsPlaying(false);
      } else {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: "playVideo", args: [] }),
          "*"
        );
        setIsPlaying(true);
      }
    }
    resetHUDTimer();
  };

  const handleSpeakLine = (text: string) => {
    playSFX("tap");
    speak(text, isEnglishSong ? "en-US" : "vi-VN", 0.85);
  };

  const handleSpeakWord = (word: string) => {
    playSFX("tap");
    speak(word, isEnglishSong ? "en-US" : "vi-VN", 0.8);
  };

  const hasLyrics = currentSong.lyrics && currentSong.lyrics.length > 0;
  const hasVocab = currentSong.keyVocab && currentSong.keyVocab.length > 0;

  // Lock body scroll and prevent BottomNav from showing
  useEffect(() => {
    document.body.classList.add("video-modal-open");
    return () => {
      document.body.classList.remove("video-modal-open");
    };
  }, []);

  return (
    <motion.div
      id="karaoke-player-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-md select-none"
    >
      {/* Top Controls Header - 100% Synchronized with SafeVideoModal */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-2.5 sm:p-4 bg-gradient-to-b from-black/85 via-black/50 to-transparent">
        {/* Song Info & Emoji Avatar */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 mr-2">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-xl sm:text-2xl shrink-0 shadow-inner">
            {currentSong.emoji || "🎵"}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-md bg-white/20 text-amber-300 truncate max-w-[120px] sm:max-w-none">
                {isEnglishSong ? "English Nursery" : "Bài Hát Thiếu Nhi"}
              </span>
              <span className="text-[10px] sm:text-[11px] text-white/70 hidden md:inline">
                Karaoke Lời Nhạc
              </span>
            </div>
            <h2
              className="text-white text-xs sm:text-sm md:text-base font-bold truncate drop-shadow-md"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {currentSong.title}
            </h2>
          </div>
        </div>

        {/* Action Buttons in Identical Order and Size to SafeVideoModal */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* 1. Quick Drawer Button: Gợi ý bài hát như YouTube Kids */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playSFX("tap");
              setShowQuickDrawer(!showQuickDrawer);
            }}
            className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full border text-xs sm:text-sm font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
              showQuickDrawer
                ? "bg-cyan-500 text-white border-cyan-400 shadow-md shadow-cyan-500/30"
                : "bg-white/20 border-white/30 text-white hover:bg-white/30"
            }`}
            title="Xem danh sách bài hát gợi ý như YouTube Kids"
          >
            <span className="text-sm sm:text-base">🎈</span>
            <span className="hidden md:inline">Gợi Ý Bài Hát</span>
            <span className="md:hidden">Gợi Ý</span>
          </motion.button>

          {/* 2. Random Surprise Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleRandomSongSurprise}
            className="px-2 sm:px-2.5 py-1.5 rounded-full border border-amber-400/40 bg-gradient-to-r from-amber-400/20 to-orange-500/20 text-amber-300 hover:bg-amber-400/30 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-sm"
            title="Đổi sang 1 bài hát ngẫu nhiên bất ngờ"
          >
            <span>🎲</span>
            <span className="hidden lg:inline">Ngẫu nhiên</span>
          </motion.button>


          {/* 3. Toggle Lyrics & Learning Button */}
          {hasLyrics && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playSFX("tap");
                setShowLyricsPanel(!showLyricsPanel);
              }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-full border text-xs sm:text-sm font-bold flex items-center gap-1 transition-all cursor-pointer shadow-sm ${
                showLyricsPanel
                  ? "bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-400/40 hover:bg-amber-300 font-black"
                  : "bg-white/20 text-white/95 border-white/30 hover:bg-white/30"
              }`}
              title={showLyricsPanel ? "Ẩn góc lời bài hát để mở rộng video" : "Bật góc lời bài hát & từ vựng"}
            >
              <BookOpen size={15} />
              <span className="hidden sm:inline">{showLyricsPanel ? "Ẩn Lời Nhạc" : "Lời Bài Hát"}</span>
              <span className="sm:hidden">{showLyricsPanel ? "Ẩn Lời" : "Lời Hát"}</span>
            </motion.button>
          )}

          {/* 4. Favorite Button */}
          {onToggleFavorite && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                playSFX("tap");
                onToggleFavorite();
              }}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                isFavorite
                  ? "bg-red-500/30 border-red-400 text-red-400"
                  : "bg-white/15 border-white/25 text-white/70 hover:bg-white/25"
              }`}
              title={isFavorite ? "Bỏ yêu thích" : "Lưu vào bài hát yêu thích"}
            >
              <Heart size={16} fill={isFavorite ? "#F87171" : "none"} />
            </motion.button>
          )}

          {/* 5. Toddler Screen Lock Button */}
          <motion.button
            id="karaoke-toddler-lock-btn"
            whileTap={{ scale: 0.9 }}
            onClick={toggleLock}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
              isLocked
                ? "bg-amber-500 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/40"
                : "bg-white/15 border-white/25 text-white/70 hover:bg-white/25"
            }`}
            title={isLocked ? "Bấm để mở khóa thao tác" : "Khóa màn hình cho bé xem"}
          >
            {isLocked ? <Lock size={16} strokeWidth={2.5} /> : <Unlock size={16} />}
          </motion.button>

          {/* 6. Close Button */}
          <button
            onClick={handleClose}
            disabled={isLocked}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-colors text-white ${
              isLocked
                ? "opacity-30 cursor-not-allowed bg-white/10 border-white/10"
                : "bg-white/20 hover:bg-white/30 border-white/30 cursor-pointer"
            }`}
            title="Đóng video bài hát"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Main Content Area: Player Stage + Lyrics Side Panel (100% matched layout) */}
      <div className="flex-1 w-full h-full flex flex-col lg:flex-row items-center justify-center z-10 pt-16 sm:pt-20 pb-3 px-3 sm:px-6 gap-3 sm:gap-5 overflow-hidden">
        {/* Video / Player Container */}
        <div
          className={`w-full h-full transition-all duration-300 flex items-center justify-center relative ${
            showLyricsPanel
              ? "lg:w-3/5 xl:w-2/3 max-h-[55vh] sm:max-h-[60vh] lg:max-h-[85vh]"
              : "w-full max-w-6xl max-h-[85vh]"
          }`}
        >
          <div className="w-full h-full relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-white/15 bg-black">
            {/* YouTube Embed Player (Optimized for Web App / PWA) */}
            {currentSong.youtubeId ? (
              <iframe
                ref={iframeRef}
                key={`${currentSong.id}-${iframeKey}`}
                src={`https://www.youtube.com/embed/${currentSong.youtubeId}?autoplay=1&controls=1&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&enablejsapi=1&origin=${typeof window !== "undefined" ? encodeURIComponent(window.location.origin) : ""}`}
                title={currentSong.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
                onLoad={() => {
                  try {
                    iframeRef.current?.contentWindow?.postMessage(
                      JSON.stringify({ event: "listening", id: 1, channel: "widget" }),
                      "*"
                    );
                    iframeRef.current?.contentWindow?.postMessage(
                      JSON.stringify({ event: "command", func: "addEventListener", args: ["onStateChange"] }),
                      "*"
                    );
                  } catch {}
                }}
              />
            ) : currentSong.localVideo ? (
              <video
                ref={videoRef}
                key={`${currentSong.id}-${iframeKey}`}
                src={currentSong.localVideo}
                autoPlay
                playsInline
                controls={false}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleSongFinished}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="absolute inset-0 w-full h-full object-contain bg-black"
              />
            ) : null}


            {/* Transparent click layer to open Toddler HUD on tap */}
            {!showQuickDrawer && !isSongEnded && !isLocked && !showHUD && (
              <div
                id="karaoke-video-hud-overlay"
                onClick={handleOpenHUD}
                onPointerDown={handleOpenHUD}
                className="absolute inset-0 z-20 cursor-pointer pointer-events-auto select-none"
                style={{ backgroundColor: "rgba(0,0,0,0.01)", WebkitTapHighlightColor: "transparent" }}
                title="Chạm vào màn hình để hiện các nút điều khiển cho bé"
              />
            )}

            {/* Toddler Interactive Player HUD on Screen Tap (YouTube Kids style) */}
            <AnimatePresence>
              {showHUD && !isLocked && !isSongEnded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={handleCloseHUD}
                  className="absolute inset-0 z-30 bg-black/45 backdrop-blur-[2px] flex flex-col justify-between p-3.5 sm:p-5 cursor-pointer select-none"
                >
                  {/* Top HUD Hint Bar */}
                  <div
                    className="flex items-center justify-between pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white/85 text-[11px] font-bold border border-white/20 flex items-center gap-1.5 shadow-md">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      <span>Chạm màn hình để ẩn nút</span>
                    </div>

                    <button
                      onClick={handleCloseHUD}
                      className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center border border-white/25 transition-colors cursor-pointer"
                      title="Ẩn điều khiển"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Center Chunky YouTube Kids Controls: Previous, Giant Play/Pause, Next */}
                  <div
                    className="flex items-center justify-center gap-3.5 sm:gap-6 my-auto pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Previous Song Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handlePreviousSong}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 hover:bg-white/30 active:bg-cyan-500/40 text-white flex items-center justify-center shadow-xl border-2 border-white/30 backdrop-blur-md transition-transform cursor-pointer"
                      title="Xem bài hát trước"
                    >
                      <SkipBack size={24} fill="white" />
                    </motion.button>

                    {/* Giant Center Play / Pause Button */}
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={togglePlay}
                      className={`w-18 h-18 sm:w-22 sm:h-22 rounded-full flex items-center justify-center text-white shadow-[0_0_35px_rgba(6,182,212,0.6)] border-4 border-white/70 transition-transform cursor-pointer ${
                        isPlaying
                          ? "bg-gradient-to-tr from-cyan-500 via-sky-400 to-blue-600"
                          : "bg-gradient-to-tr from-amber-400 via-orange-400 to-amber-500 animate-pulse"
                      }`}
                      title={isPlaying ? "Tạm dừng bài hát" : "Tiếp tục phát"}
                    >
                      {isPlaying ? (
                        <Pause size={36} fill="white" />
                      ) : (
                        <Play size={38} fill="white" className="ml-1" />
                      )}
                    </motion.button>

                    {/* Next Song Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleNextSongShortcut}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 hover:bg-white/30 active:bg-cyan-500/40 text-white flex items-center justify-center shadow-xl border-2 border-white/30 backdrop-blur-md transition-transform cursor-pointer"
                      title="Xem bài hát tiếp theo"
                    >
                      <SkipForward size={24} fill="white" />
                    </motion.button>

                    {/* Quick Replay Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleReplaySong}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-white/25 text-white/90 flex items-center justify-center shadow-lg border border-white/20 backdrop-blur-md transition-transform hidden sm:flex cursor-pointer"
                      title="Xem lại từ đầu"
                    >
                      <RotateCcw size={18} />
                    </motion.button>
                  </div>

                  {/* Bottom HUD Quick Row */}
                  <div
                    className="flex items-center justify-between pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => {
                        playSFX("pop");
                        setShowQuickDrawer(true);
                        setShowHUD(false);
                      }}
                      className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-white text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-lg border-2 border-cyan-300 cursor-pointer"
                    >
                      <span className="text-base sm:text-lg">🎈</span>
                      <span>Xem danh sách bài hát gợi ý</span>
                    </button>

                    <button
                      onClick={handleReplaySong}
                      className="sm:hidden text-white/90 hover:text-white text-xs font-semibold flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/20 border border-white/20 cursor-pointer"
                    >
                      <RotateCcw size={12} />
                      <span>Xem lại</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating YouTube Kids Quick Button on Song */}
            {!showQuickDrawer && !isSongEnded && !isLocked && !showHUD && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => {
                  playSFX("pop");
                  setShowQuickDrawer(true);
                }}
                className="absolute bottom-3 right-3 sm:bottom-3.5 sm:right-4 z-30 px-3.5 sm:px-4.5 py-2 sm:py-2.5 rounded-full bg-slate-950/90 hover:bg-slate-900 active:scale-95 text-white border-2 border-amber-400/80 hover:border-amber-300 backdrop-blur-md flex items-center gap-2 sm:gap-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_25px_rgba(251,191,36,0.45)] transition-all cursor-pointer select-none"
                title="Mở danh sách video gợi ý"
              >
                <span className="text-lg sm:text-xl animate-bounce">🎈</span>
                <span
                  className="text-amber-300 text-xs sm:text-sm font-black tracking-wide"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Video gợi ý
                </span>
              </motion.button>
            )}

            {/* YouTube Kids In-Video Recommendation Drawer */}
            <YouTubeKidsVideoDrawer
              isOpen={showQuickDrawer}
              onClose={() => setShowQuickDrawer(false)}
              recommendations={songRecommendations}
              onSelect={handleSelectNextSong}
              onRefresh={handleRefreshSongRecommendations}
              isAutoPlayNext={isAutoPlayNext}
              onToggleAutoPlayNext={() => setIsAutoPlayNext(!isAutoPlayNext)}
              onRandomSurprise={handleRandomSongSurprise}
            />

            {/* In-App Recommendation End Screen Overlay */}
            <AnimatePresence>
              {isSongEnded && (
                <VideoEndRecommendation
                  currentTitle={currentSong.title}
                  recommendations={songRecommendations}
                  onSelect={handleSelectNextSong}
                  onReplay={handleReplaySong}
                  onClose={handleClose}
                  onRefresh={handleRefreshSongRecommendations}
                />
              )}
            </AnimatePresence>

            {/* Toddler 3-Tap Safety Screen Lock Overlay (YouTube Kids Standard) */}
            {isLocked && (
              <div
                onClick={handleUnlockTap}
                className="absolute inset-0 z-50 bg-black/75 flex flex-col items-center justify-center backdrop-blur-sm cursor-pointer select-none p-4"
              >
                <motion.div
                  key={unlockTapCount}
                  initial={{ scale: 0.9, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-slate-900/95 border-2 border-amber-400 rounded-3xl p-5 sm:p-7 max-w-sm w-full text-center shadow-[0_0_50px_rgba(251,191,36,0.35)] flex flex-col items-center gap-3"
                >
                  <div className="w-16 h-16 rounded-full bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center text-amber-300 shadow-inner">
                    <Lock size={30} strokeWidth={2.5} />
                  </div>

                  <h3
                    className="text-white text-base sm:text-lg font-black"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {unlockTapCount === 0 && "Màn hình đang khóa"}
                    {unlockTapCount === 1 && "Chạm thêm 2 lần nữa nhé!"}
                    {unlockTapCount === 2 && "Chạm thêm 1 lần nữa là mở nè!"}
                    {unlockTapCount >= 3 && "Mở khóa thành công! 🎉"}
                  </h3>

                  <p className="text-amber-200/80 text-xs sm:text-sm">
                    {unlockTapCount < 3
                      ? "Bé hoặc Ba Mẹ chạm 3 lần liên tiếp để mở khóa"
                      : "Đang mở màn hình cho bé..."}
                  </p>

                  {/* 3 Progress Dots */}
                  <div className="flex items-center gap-2.5 mt-1">
                    {[0, 1, 2].map((dotIdx) => (
                      <div
                        key={dotIdx}
                        className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                          dotIdx < unlockTapCount
                            ? "bg-amber-400 scale-125 shadow-md shadow-amber-400"
                            : "bg-white/20 border border-white/30"
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-[11px] text-white/50 mt-1">
                    ({unlockTapCount}/3 chạm)
                  </span>
                </motion.div>
              </div>
            )}
          </div>
        </div>

        {/* Lyrics & Vocabulary Panel (Collapsible, matching SafeVideoModal exactly) */}
        <AnimatePresence>
          {showLyricsPanel && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="w-full lg:w-2/5 xl:w-1/3 flex-1 lg:h-full lg:max-h-[85vh] bg-slate-900/85 backdrop-blur-xl border border-white/15 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 text-white shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header & Star Achievement & Minimize Button */}
              <div className="flex items-center justify-between pb-2.5 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{currentSong.emoji || "🎵"}</span>
                  <div>
                    <span
                      className="text-xs font-bold text-amber-300 block"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Lời Bài Hát & Học Từ
                    </span>
                    <span className="text-[10px] text-white/60">
                      {isEnglishSong ? "English Nursery Rhyme" : "Bài Hát Thiếu Nhi"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className={`px-2.5 py-1 rounded-full text-xs font-black flex items-center gap-1.5 border transition-all ${
                      hasAwardedStars
                        ? "bg-amber-400/20 text-amber-300 border-amber-400/50 shadow-md shadow-amber-400/20"
                        : "bg-white/10 text-white/50 border-white/15"
                    }`}
                  >
                    <Award size={13} className={hasAwardedStars ? "text-amber-400" : ""} />
                    <span>{hasAwardedStars ? "+5 ⭐ Đã nhận" : "+5 ⭐ Xem hát"}</span>
                  </div>

                  <button
                    onClick={() => {
                      playSFX("tap");
                      setShowLyricsPanel(false);
                    }}
                    className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
                    title="Ẩn góc lời bài hát để mở rộng video"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto scroll-area space-y-3 pt-2.5 pr-1">
                {/* Key Vocabulary Section (if available) */}
                {hasVocab && (
                  <div>
                    <div className="flex items-center justify-between mb-2 gap-2">
                      <span className="text-xs font-bold text-white/90 flex items-center gap-1.5">
                        <Sparkles size={14} className="text-yellow-400" />
                        <span>Từ vựng trọng tâm ({currentSong.keyVocab?.length} từ):</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                      {currentSong.keyVocab?.map((item, idx) => (
                        <motion.button
                          key={idx}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => handleSpeakWord(item.en)}
                          className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:bg-primary/30 border border-white/10 flex items-center justify-between text-left transition-all group cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">
                              {item.emoji || "✨"}
                            </span>
                            <div className="min-w-0">
                              <div className="flex items-baseline gap-1.5 flex-wrap">
                                <span
                                  className="font-bold text-yellow-300 text-sm block leading-none"
                                  style={{ fontFamily: "var(--font-heading)" }}
                                >
                                  {item.en}
                                </span>
                                {item.phonetic && (
                                  <span className="text-[10px] text-amber-300/70 font-mono">
                                    {item.phonetic}
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-white/80 mt-0.5 block truncate">
                                {item.vi}
                              </span>
                            </div>
                          </div>

                          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/70 group-hover:text-white group-hover:bg-primary transition-colors shrink-0">
                            <Volume2 size={14} />
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Lyrics Section */}
                {hasLyrics && (
                  <div>
                    <div className="flex items-center justify-between mb-2 gap-2">
                      <span className="text-xs font-bold text-white/90 flex items-center gap-1.5">
                        <Sparkles size={14} className="text-yellow-400" />
                        <span>Lời bài hát ({currentSong.lyrics.length} câu):</span>
                      </span>

                      <button
                        onClick={() => setShowTranslation(!showTranslation)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full border flex items-center gap-1 transition-colors cursor-pointer ${
                          showTranslation
                            ? "bg-amber-400/20 text-amber-300 border-amber-400/40"
                            : "bg-white/10 text-white/60 border-white/20"
                        }`}
                        title="Bật/tắt dịch nghĩa tiếng Việt"
                      >
                        <Languages size={12} />
                        <span>{showTranslation ? "Dịch: Bật" : "Dịch: Tắt"}</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {currentSong.lyrics.map((line, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-start justify-between gap-2 transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <p
                              className="text-sm sm:text-base font-bold text-white leading-snug"
                              style={{ fontFamily: "var(--font-heading)" }}
                            >
                              {line.text}
                            </p>
                            {showTranslation && line.translation && (
                              <p className="text-xs text-amber-200/75 mt-1 italic font-medium">
                                {line.translation}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => handleSpeakLine(line.text)}
                            className="p-1.5 rounded-full bg-white/10 hover:bg-primary text-white shrink-0 active:scale-90 transition-all cursor-pointer"
                            title="Nghe đọc câu này"
                          >
                            <Volume2 size={13} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
