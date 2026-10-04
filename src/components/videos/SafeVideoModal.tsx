"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Volume2,
  Sparkles,
  Lock,
  Unlock,
  Heart,
  Award,
  HelpCircle,
  BookOpen,
  Shuffle,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipForward,
  Search,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { EducationalVideo, educationalVideos, getRecommendedVideos } from "@/data/educationalVideos";
import { useAppStore } from "@/stores/appStore";
import { playSFX, pauseBGMForVideo, resumeBGMAfterVideo } from "@/utils/soundEffects";
import { useSpeech } from "@/hooks/useSpeech";
import VideoEndRecommendation, { RecommendedItem } from "./VideoEndRecommendation";
import YouTubeKidsVideoDrawer from "./YouTubeKidsVideoDrawer";

interface SafeVideoModalProps {
  video: EducationalVideo;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onSelectVideo?: (newVideo: EducationalVideo) => void;
  randomMode?: boolean;
}

export default function SafeVideoModal({
  video,
  onClose,
  isFavorite,
  onToggleFavorite,
  onSelectVideo,
  randomMode = false,
}: SafeVideoModalProps) {
  const { addStars } = useAppStore();
  const { speak } = useSpeech();
  const [currentVideo, setCurrentVideo] = useState<EducationalVideo>(video);
  const [hasAwardedStars, setHasAwardedStars] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [unlockTapCount, setUnlockTapCount] = useState(0);
  const [showVocabPanel, setShowVocabPanel] = useState(false);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [showQuickDrawer, setShowQuickDrawer] = useState(false);
  const [isAutoPlayNext, setIsAutoPlayNext] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showHUD, setShowHUD] = useState(false);
  const [historyStack, setHistoryStack] = useState<string[]>([]);
  const [vocabSearch, setVocabSearch] = useState("");
  const [isAutoPlayingVocab, setIsAutoPlayingVocab] = useState(false);
  const [playbackError, setPlaybackError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [parentQuiz, setParentQuiz] = useState<{ num1: number; num2: number; ans: number; options: number[] } | null>(null);

  const openTimeRef = useRef<number>(Date.now());
  const modalRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const hudTimerRef = useRef<NodeJS.Timeout | null>(null);
  const unlockTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isFullMode = isFullscreen || isMobileLandscape;

  // Detect mobile landscape orientation
  useEffect(() => {
    let lastLandscape: boolean | null = null;
    const checkOrientation = (isResize = false) => {
      if (typeof window === "undefined") return;
      const isLandscape = window.innerWidth > window.innerHeight;
      const isMobileOrTablet =
        window.innerHeight <= 640 ||
        window.innerWidth <= 1024 ||
        "ontouchstart" in window ||
        (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0);
      setIsMobileLandscape(isLandscape && isMobileOrTablet);

      // ONLY reset scroll if orientation actually changed, NOT on routine resize events!
      if (!isResize || (lastLandscape !== null && lastLandscape !== isLandscape)) {
        window.scrollTo(0, 0);
        if (document.documentElement) document.documentElement.scrollLeft = 0;
        if (document.body) document.body.scrollLeft = 0;
      }
      lastLandscape = isLandscape;
    };

    checkOrientation(false);
    const handleResize = () => checkOrientation(true);
    const handleOrientation = () => checkOrientation(false);

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleOrientation);

    const mql = window.matchMedia("(orientation: landscape)");
    const handleMql = () => checkOrientation(false);
    try {
      mql.addEventListener("change", handleMql);
    } catch {
      mql.addListener?.(handleMql);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientation);
      try {
        mql.removeEventListener("change", handleMql);
      } catch {
        mql.removeListener?.(handleMql);
      }
    };
  }, []);

  // Listen to native browser Fullscreen changes
  useEffect(() => {
    const onFullscreenChange = () => {
      const isDocFull = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isDocFull);
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", onFullscreenChange);
    document.addEventListener("mozfullscreenchange", onFullscreenChange);
    document.addEventListener("MSFullscreenChange", onFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
      document.removeEventListener("mozfullscreenchange", onFullscreenChange);
      document.removeEventListener("MSFullscreenChange", onFullscreenChange);
    };
  }, []);

  // Toggle fullscreen mode with mobile landscape orientation lock support
  const toggleFullscreen = useCallback(async () => {
    try {
      const isDocFull = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );

      if (!isDocFull && !isFullscreen) {
        const elem = modalRef.current || document.documentElement;
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        } else if ((elem as any).webkitRequestFullscreen) {
          await (elem as any).webkitRequestFullscreen();
        } else if ((elem as any).mozRequestFullScreen) {
          await (elem as any).mozRequestFullScreen();
        } else if ((elem as any).msRequestFullscreen) {
          await (elem as any).msRequestFullscreen();
        }
        setIsFullscreen(true);

        try {
          if (screen.orientation && "lock" in screen.orientation) {
            await (screen.orientation as any).lock("landscape");
          }
        } catch {
          // Ignore safely if orientation locking is not supported or permitted
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          await (document as any).mozCancelFullScreen();
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen();
        }
        setIsFullscreen(false);

        try {
          if (screen.orientation && "unlock" in screen.orientation) {
            screen.orientation.unlock();
          }
        } catch {}
      }
    } catch {
      // Fallback to CSS pseudo-fullscreen if native Fullscreen API is rejected (e.g. iOS Safari)
      setIsFullscreen((prev) => !prev);
    }
  }, [isFullscreen]);

  // Sync state if video prop changes
  useEffect(() => {
    setCurrentVideo(video);
    setIsVideoEnded(false);
    setShowQuickDrawer(false);
    setShowHUD(false);
    setShowVocabPanel(false);
    setHasAwardedStars(false);
    setIsPlaying(true);
    setPlaybackError(null);
    setCurrentTime(0);
    setDuration(0);
    openTimeRef.current = Date.now();
  }, [video]);

  // Auto pause background music when opening video, and resume when closing
  useEffect(() => {
    pauseBGMForVideo();
    return () => {
      resumeBGMAfterVideo();
    };
  }, []);

  const lastHUDOpenTimeRef = useRef<number>(0);
  const touchStartPosRef = useRef<{ x: number; y: number; time: number } | null>(null);

  // HUD Auto-Hide Timer (4.5s of inactivity like YouTube Kids)
  const resetHUDTimer = useCallback(() => {
    if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
    hudTimerRef.current = setTimeout(() => {
      setShowHUD(false);
    }, 4500);
  }, []);

  const handleOpenHUD = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    if (isLocked || isVideoEnded) return;
    lastHUDOpenTimeRef.current = Date.now();
    setShowHUD(true);
    resetHUDTimer();
  }, [isLocked, isVideoEnded, resetHUDTimer]);

  const handleCloseHUD = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    // Guard against ghost-clicks immediately after opening (within 150ms)
    if (Date.now() - lastHUDOpenTimeRef.current < 150) return;
    if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
    setShowHUD(false);
  }, []);

  const handleOverlayTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartPosRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now(),
      };
    }
  }, []);

  const handleOverlayTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartPosRef.current) return;
    const touch = e.changedTouches[0];
    const dx = Math.abs(touch.clientX - touchStartPosRef.current.x);
    const dy = Math.abs(touch.clientY - touchStartPosRef.current.y);
    const dt = Date.now() - touchStartPosRef.current.time;
    touchStartPosRef.current = null;
    // Clean tap: small movement and short duration (< 600ms)
    if (dx < 15 && dy < 15 && dt < 600) {
      e.preventDefault(); // Prevents delayed 300ms synthetic click
      handleOpenHUD();
    }
  }, [handleOpenHUD]);

  const handleBackdropTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartPosRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now(),
      };
    }
  }, []);

  const handleBackdropTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartPosRef.current) return;
    const touch = e.changedTouches[0];
    const dx = Math.abs(touch.clientX - touchStartPosRef.current.x);
    const dy = Math.abs(touch.clientY - touchStartPosRef.current.y);
    const dt = Date.now() - touchStartPosRef.current.time;
    touchStartPosRef.current = null;
    if (dx < 15 && dy < 15 && dt < 600) {
      e.preventDefault();
      handleCloseHUD();
    }
  }, [handleCloseHUD]);

  // Play / Pause Toggle via YouTube postMessage with instant state feedback
  const togglePlayPause = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    if (!iframeRef.current?.contentWindow) return;
    playSFX("tap");
    setIsPlaying((prev) => {
      const next = !prev;
      const cmd = next ? "playVideo" : "pauseVideo";
      try {
        iframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: cmd, args: [] }),
          "*"
        );
      } catch {}
      return next;
    });
    resetHUDTimer();
  }, [resetHUDTimer]);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleSeek = useCallback((newSeconds: number) => {
    if (!iframeRef.current?.contentWindow) return;
    try {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: "seekTo", args: [newSeconds, true] }),
        "*"
      );
      setCurrentTime(newSeconds);
    } catch {}
    resetHUDTimer();
  }, [resetHUDTimer]);

  const handleSkipSeconds = useCallback((delta: number) => {
    playSFX("tap");
    const target = Math.max(0, Math.min(duration || 300, currentTime + delta));
    handleSeek(target);
  }, [currentTime, duration, handleSeek]);

  const generateQuiz = () => {
    const n1 = Math.floor(Math.random() * 4) + 2;
    const n2 = Math.floor(Math.random() * 4) + 2;
    const correct = n1 * n2;
    const options = [correct];
    while (options.length < 4) {
      const wrong = correct + (Math.floor(Math.random() * 7) - 3) * 2;
      if (wrong > 0 && !options.includes(wrong)) {
        options.push(wrong);
      }
    }
    options.sort(() => Math.random() - 0.5);
    return { num1: n1, num2: n2, ans: correct, options };
  };

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
      setParentQuiz(generateQuiz());
      setShowHUD(false);
      setShowQuickDrawer(false);
    } else {
      handleUnlockTap();
    }
  };

  // Award 5 stars automatically if the child watches for at least 25 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasAwardedStars) {
        addStars(5);
        setHasAwardedStars(true);
        playSFX("star");
      }
    }, 25000);

    return () => clearTimeout(timer);
  }, [addStars, hasAwardedStars, currentVideo.id]);

  // Rich pool of 20 recommendations like YouTube Kids
  const [recommendations, setRecommendations] = useState<RecommendedItem[]>(() =>
    getRecommendedVideos(currentVideo, 20, randomMode).map((v) => ({
      id: v.id,
      title: v.title,
      thumbnail: `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`,
      channelOrArtist: v.channel,
      avatarOrEmoji: v.channelAvatar,
      duration: v.duration,
      categoryName: v.categoryNameVi,
    }))
  );

  useEffect(() => {
    setRecommendations(
      getRecommendedVideos(currentVideo, 20, randomMode).map((v) => ({
        id: v.id,
        title: v.title,
        thumbnail: `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`,
        channelOrArtist: v.channel,
        avatarOrEmoji: v.channelAvatar,
        duration: v.duration,
        categoryName: v.categoryNameVi,
      }))
    );
  }, [currentVideo, randomMode]);

  const handleRefreshRecommendations = () => {
    setRecommendations(
      getRecommendedVideos(currentVideo, 20, randomMode).map((v) => ({
        id: v.id,
        title: v.title,
        thumbnail: `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`,
        channelOrArtist: v.channel,
        avatarOrEmoji: v.channelAvatar,
        duration: v.duration,
        categoryName: v.categoryNameVi,
      }))
    );
  };

  const handleVideoFinished = () => {
    if (!hasAwardedStars) {
      addStars(5);
      setHasAwardedStars(true);
      playSFX("star");
    }
    setIsVideoEnded(true);
    setShowHUD(false);
  };

  const handleSelectNextVideo = (nextId: string) => {
    const nextVid = educationalVideos.find((v) => v.id === nextId);
    if (nextVid) {
      setHistoryStack((prev) => [...prev, currentVideo.id]);
      setCurrentVideo(nextVid);
      setIsVideoEnded(false);
      setShowQuickDrawer(false);
      setShowHUD(false);
      setIsPlaying(true);
      setIframeKey((prev) => prev + 1);
      setHasAwardedStars(false);
      openTimeRef.current = Date.now();
      onSelectVideo?.(nextVid);
    }
  };

  const handlePreviousVideo = () => {
    playSFX("tap");
    if (historyStack.length > 0) {
      const prevId = historyStack[historyStack.length - 1];
      setHistoryStack((prev) => prev.slice(0, -1));
      const prevVid = educationalVideos.find((v) => v.id === prevId);
      if (prevVid) {
        setCurrentVideo(prevVid);
        setIsVideoEnded(false);
        setShowQuickDrawer(false);
        setShowHUD(false);
        setIsPlaying(true);
        setIframeKey((prev) => prev + 1);
        setHasAwardedStars(false);
        openTimeRef.current = Date.now();
        onSelectVideo?.(prevVid);
        return;
      }
    }
    // Fallback: pick a previous video (if in randomMode, pick across all videos)
    const fallbackPool = randomMode
      ? educationalVideos.filter((v) => v.id !== currentVideo.id)
      : educationalVideos.filter(
          (v) => v.category === currentVideo.category && v.id !== currentVideo.id
        );
    if (fallbackPool.length > 0) {
      const fallbackVid = fallbackPool[Math.floor(Math.random() * fallbackPool.length)];
      handleSelectNextVideo(fallbackVid.id);
    }
  };

  const handleNextVideoShortcut = () => {
    playSFX("tap");
    if (randomMode) {
      // In random mode: surprise random video across entire library
      handleRandomSurprise();
    } else if (recommendations.length > 0) {
      handleSelectNextVideo(recommendations[0].id);
    } else {
      handleRandomSurprise();
    }
  };

  const handleRandomSurprise = () => {
    const others = educationalVideos.filter((v) => v.id !== currentVideo.id);
    if (others.length === 0) return;
    const randomVid = others[Math.floor(Math.random() * others.length)];
    setHistoryStack((prev) => [...prev, currentVideo.id]);
    setCurrentVideo(randomVid);
    setIsVideoEnded(false);
    setShowQuickDrawer(false);
    setShowHUD(false);
    setIsPlaying(true);
    setIframeKey((prev) => prev + 1);
    setHasAwardedStars(false);
    openTimeRef.current = Date.now();
    onSelectVideo?.(randomVid);
  };

  const handleReplay = () => {
    setIsVideoEnded(false);
    setShowHUD(false);
    setIsPlaying(true);
    setIframeKey((prev) => prev + 1);
    openTimeRef.current = Date.now();
  };

  const handleClose = () => {
    if (isLocked) {
      handleUnlockTap();
      return;
    }
    playSFX("tap");
    const elapsedSeconds = (Date.now() - openTimeRef.current) / 1000;
    if (!hasAwardedStars && elapsedSeconds >= 15) {
      addStars(5);
      setHasAwardedStars(true);
      playSFX("star");
    }
    if (
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement
    ) {
      try {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        }
      } catch {}
    }
    try {
      if (screen.orientation && "unlock" in screen.orientation) {
        screen.orientation.unlock();
      }
    } catch {}
    setIsFullscreen(false);
    onClose();
  };

  const handleSpeakWord = (word: string) => {
    playSFX("tap");
    speak(word, "en-US", 0.85);
  };

  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const filteredVocab = (currentVideo.keyVocab || []).filter(
    (item) =>
      item.en.toLowerCase().includes(vocabSearch.toLowerCase()) ||
      item.vi.toLowerCase().includes(vocabSearch.toLowerCase())
  );

  const handlePlayAllVocab = () => {
    if (isAutoPlayingVocab) {
      if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
      setIsAutoPlayingVocab(false);
      return;
    }
    if (filteredVocab.length === 0) return;
    setIsAutoPlayingVocab(true);
    let idx = 0;
    const playNext = () => {
      if (idx >= filteredVocab.length) {
        setIsAutoPlayingVocab(false);
        return;
      }
      const item = filteredVocab[idx];
      playSFX("tap");
      speak(item.en, "en-US", 0.85);
      idx++;
      autoPlayTimeoutRef.current = setTimeout(playNext, 1800);
    };
    playNext();
  };

  useEffect(() => {
    return () => {
      if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
    };
  }, []);

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
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({ event: "command", func: "addEventListener", args: ["onError"] }),
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

        // Player Error handling (100, 101, 150, 2, 5)
        if (data.event === "onError") {
          console.warn("YouTube player onError received:", data.info);
          setPlaybackError("Video tạm thời không khả dụng");
          if (isAutoPlayNext) {
            setTimeout(() => {
              handleNextVideoShortcut();
            }, 3000);
          }
          return;
        }

        // Player State changes
        // 1 = Playing, 2 = Paused, 0 = Ended
        if (data.event === "onStateChange") {
          if (data.info === 1 || data.info === "1") {
            setIsPlaying((prev) => (prev ? prev : true));
            setPlaybackError(null);
          } else if (data.info === 2 || data.info === "2") {
            setIsPlaying((prev) => (!prev ? prev : false));
          } else if (data.info === 0 || data.info === "0") {
            handleVideoFinished();
          }
        }

        if (data.event === "infoDelivery" && data.info) {
          if (data.info.playerState === 1 || data.info.playerState === "1") {
            setIsPlaying((prev) => (prev ? prev : true));
            setPlaybackError(null);
          } else if (data.info.playerState === 2 || data.info.playerState === "2") {
            setIsPlaying((prev) => (!prev ? prev : false));
          } else if (data.info.playerState === 0 || data.info.playerState === "0") {
            handleVideoFinished();
          }

          // Near-end detection & time sync via infoDelivery
          const ct = data.info.currentTime;
          const dur = data.info.duration;
          if (typeof ct === "number") setCurrentTime(ct);
          if (typeof dur === "number" && dur > 0) setDuration(dur);
          if (typeof ct === "number" && typeof dur === "number" && dur > 5 && ct >= dur - 1.5) {
            handleVideoFinished();
          }
        }
      } catch {
        // ignore non-JSON messages
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      clearInterval(interval);
      clearTimeout(stopTimer);
      window.removeEventListener("message", handleMessage);
    };
  }, [iframeKey, currentVideo.id]);

  // Lock body scroll and prevent BottomNav from showing
  useEffect(() => {
    document.body.classList.add("video-modal-open");
    return () => {
      document.body.classList.remove("video-modal-open");
      if (
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      ) {
        try {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if ((document as any).webkitExitFullscreen) {
            (document as any).webkitExitFullscreen();
          }
        } catch {}
      }
      try {
        if (screen.orientation && "unlock" in screen.orientation) {
          screen.orientation.unlock();
        }
      } catch {}
    };
  }, []);


  return (
    <motion.div
      ref={modalRef}
      id="safe-video-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center select-none bg-black overflow-hidden"
    >
      {/* Top Controls Header */}
      <div
        className={`absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-2 sm:p-4 bg-gradient-to-b from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${
          isFullMode && !showHUD && !isLocked && !playbackError
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        }`}
        style={{
          paddingLeft: "max(env(safe-area-inset-left, 8px), 8px)",
          paddingRight: "max(env(safe-area-inset-right, 8px), 8px)",
          paddingTop: "max(env(safe-area-inset-top, 8px), 8px)",
        }}
      >
        {/* Channel Info & Video Title */}
        <div className="flex items-center gap-1.5 sm:gap-3 flex-1 min-w-0 mr-1.5 sm:mr-2">
          {/* Authentic YouTube Kids Logo Badge */}
          <div className="hidden xs:flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md border border-red-400 shrink-0 select-none">
            <Play size={12} fill="white" className="ml-0.5" />
            <span className="text-[10px] sm:text-xs font-black tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
              Kids
            </span>
          </div>

          <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-base sm:text-2xl shrink-0 shadow-inner">
            {currentVideo.channelAvatar}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider px-1 sm:px-2 py-0.5 rounded-md bg-white/20 text-amber-300 truncate max-w-[80px] sm:max-w-none">
                {currentVideo.channel}
              </span>
              {currentVideo.isNew && (
                <span className="text-[8px] sm:text-[10px] font-black text-amber-200 px-1 sm:px-2 py-0.5 rounded-md bg-red-600/90 border border-amber-300/80 shrink-0">
                  🔥 MỚI
                </span>
              )}
              <span className="text-[10px] sm:text-[11px] text-white/70 hidden md:inline">
                {currentVideo.categoryNameVi}
              </span>
            </div>
            <h2
              className="text-white text-xs sm:text-sm md:text-base font-bold truncate drop-shadow-md"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {currentVideo.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Quick Drawer Button: Gợi ý video như YouTube Kids */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playSFX("tap");
              setShowQuickDrawer(!showQuickDrawer);
            }}
            className={`px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-full border text-xs sm:text-sm font-extrabold flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer ${
              showQuickDrawer
                ? "bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-500/30"
                : "bg-white/20 border-white/30 text-white hover:bg-white/30"
            }`}
            title="Xem danh sách video gợi ý như YouTube Kids"
          >
            <span className="text-sm sm:text-base">🎈</span>
            <span className="hidden sm:inline">Gợi Ý</span>
          </motion.button>

          {/* Random Surprise Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleRandomSurprise}
            className="w-7 h-7 sm:w-auto sm:px-2.5 sm:py-1.5 rounded-full border border-amber-400/40 bg-gradient-to-r from-amber-400/20 to-orange-500/20 text-amber-300 hover:bg-amber-400/30 text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer shadow-sm"
            title="Đổi sang 1 video ngẫu nhiên bất ngờ"
          >
            <span>🎲</span>
            <span className="hidden lg:inline">Ngẫu nhiên</span>
          </motion.button>

          {/* Toggle Vocab Panel Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playSFX("tap");
              setShowVocabPanel(!showVocabPanel);
            }}
            className={`px-2 sm:px-3 py-1.5 rounded-full border text-xs sm:text-sm font-bold flex items-center gap-1 transition-all cursor-pointer shadow-sm ${
              showVocabPanel
                ? "bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-400/40 hover:bg-amber-300 font-black"
                : "bg-white/20 text-white/95 border-white/30 hover:bg-white/30"
            }`}
            title={showVocabPanel ? "Ẩn góc từ vựng để mở rộng video" : "Bật góc từ vựng & mẹo học"}
          >
            <BookOpen size={14} />
            <span className="hidden sm:inline">{showVocabPanel ? "Ẩn Từ Vựng" : "Từ Vựng"}</span>
          </motion.button>

          {/* Fullscreen Toggle Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              playSFX("tap");
              toggleFullscreen();
            }}
            className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
              isFullMode
                ? "bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-400/40"
                : "bg-white/20 text-amber-300 border-amber-400/50 hover:bg-white/30"
            }`}
            title={isFullMode ? "Thu nhỏ màn hình" : "Xem toàn màn hình (Full screen)"}
          >
            {isFullMode ? <Minimize2 size={15} strokeWidth={2.5} /> : <Maximize2 size={15} strokeWidth={2.5} />}
          </motion.button>

          {/* Favorite Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              playSFX("tap");
              onToggleFavorite();
            }}
            className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
              isFavorite
                ? "bg-red-500/30 border-red-400 text-red-400"
                : "bg-white/15 border-white/25 text-white/70 hover:bg-white/25"
            }`}
            title={isFavorite ? "Bỏ yêu thích" : "Lưu vào video yêu thích"}
          >
            <Heart size={15} fill={isFavorite ? "#F87171" : "none"} />
          </motion.button>

          {/* Toddler Screen Lock Button */}
          <motion.button
            id="safe-toddler-lock-btn"
            whileTap={{ scale: 0.9 }}
            onClick={toggleLock}
            className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
              isLocked
                ? "bg-amber-500 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/40"
                : "bg-white/15 border-white/25 text-white/70 hover:bg-white/25"
            }`}
            title={isLocked ? "Bấm để mở khóa thao tác" : "Khóa màn hình cho bé xem"}
          >
            {isLocked ? <Lock size={15} strokeWidth={2.5} /> : <Unlock size={15} />}
          </motion.button>

          {/* Close Button */}
          <button
            onClick={handleClose}
            disabled={isLocked}
            className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-colors text-white ${
              isLocked
                ? "opacity-30 cursor-not-allowed bg-white/10 border-white/10"
                : "bg-white/20 hover:bg-white/30 border-white/30 cursor-pointer"
            }`}
            title="Đóng video"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Main Content Area: Player (Top/Left) + Education Details (Bottom/Right) */}
      <div
        className={`flex-1 w-full h-full flex flex-col lg:flex-row items-center justify-center z-10 overflow-hidden ${
          isFullMode
            ? "fixed inset-0 p-0 m-0"
            : "pt-14 sm:pt-20 pb-3 px-2 sm:px-6 gap-3 sm:gap-5"
        }`}
      >
        {/* Safe YouTube Player Container */}
        <div
          className={`w-full transition-all duration-300 flex flex-col items-center justify-center relative ${
            isFullMode
              ? "h-full w-full max-w-none max-h-none p-0 m-0"
              : showVocabPanel
              ? "lg:w-3/5 xl:w-2/3 h-full max-h-[55vh] sm:max-h-[60vh] lg:max-h-[85vh]"
              : "w-full max-w-6xl h-auto max-h-[85vh] lg:h-full"
          }`}
        >
          <div
            className={`w-full relative overflow-hidden bg-black ${
              isFullMode
                ? "h-full rounded-none border-0 shadow-none"
                : "aspect-video max-h-[60vh] sm:max-h-[75vh] lg:max-h-[85vh] rounded-2xl sm:rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-white/15"
            }`}
          >
            <iframe
              ref={iframeRef}
              key={`${currentVideo.id}-${iframeKey}`}
              src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=1&controls=1&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&enablejsapi=1&origin=${typeof window !== "undefined" ? encodeURIComponent(window.location.origin) : ""}`}
              title={currentVideo.title}
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
                  iframeRef.current?.contentWindow?.postMessage(
                    JSON.stringify({ event: "command", func: "addEventListener", args: ["onError"] }),
                    "*"
                  );
                } catch {}
              }}
            />

            {/* Error Fallback Overlay when YouTube video is unavailable / embed restricted */}
            {playbackError && (
              <div className="absolute inset-0 z-40 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center text-white select-none">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-3xl mb-4 border border-amber-500/30 animate-pulse">
                  ⚠️
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  Video tạm thời không khả dụng
                </h3>
                <p className="text-xs sm:text-sm text-white/70 max-w-sm mb-6 leading-relaxed">
                  Đang tự động chuyển sang video thú vị khác cho bé thưởng thức...
                </p>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setPlaybackError(null);
                      handleNextVideoShortcut();
                    }}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-orange-500/30 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                  >
                    ⏭️ Đổi Video Khác Ngay
                  </motion.button>
                  <button
                    onClick={handleClose}
                    className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            )}

            {/* Transparent tap & click layer to open Toddler HUD */}
            {!showQuickDrawer && !isVideoEnded && !isLocked && !showHUD && !playbackError && (
              <div
                id="safe-video-hud-overlay"
                onClick={handleOpenHUD}
                onTouchStart={handleOverlayTouchStart}
                onTouchEnd={handleOverlayTouchEnd}
                className="absolute inset-0 z-20 cursor-pointer pointer-events-auto select-none"
                style={{
                  backgroundColor: "rgba(0,0,0,0.001)",
                  WebkitTapHighlightColor: "transparent",
                  touchAction: "manipulation",
                }}
                title="Chạm vào màn hình để hiện các nút điều khiển cho bé"
              />
            )}

            {/* Toddler Interactive Player HUD on Screen Tap (YouTube Kids style) */}
            <AnimatePresence>
              {showHUD && !isLocked && !isVideoEnded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, pointerEvents: "none" }}
                  transition={{ duration: 0.18 }}
                  onClick={handleCloseHUD}
                  onTouchStart={handleBackdropTouchStart}
                  onTouchEnd={handleBackdropTouchEnd}
                  className="absolute inset-0 z-30 bg-black/45 backdrop-blur-[2px] flex flex-col justify-between p-3.5 sm:p-5 select-none pointer-events-auto cursor-pointer"
                  style={{ touchAction: "manipulation" }}
                >
                  {/* Top HUD Hint Bar */}
                  <div
                    className="flex items-center justify-between pointer-events-auto z-10 cursor-default"
                    onClick={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    onTouchEnd={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-red-600 text-white shadow-md border border-red-400 select-none">
                        <Play size={12} fill="white" className="ml-0.5" />
                        <span className="text-[11px] font-black tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                          YouTube <span className="text-amber-300">Kids</span>
                        </span>
                      </div>
                      <div className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white/85 text-[10px] sm:text-[11px] font-bold border border-white/20 flex items-center gap-1.5 shadow-md">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="hidden sm:inline">Chạm màn hình để ẩn nút</span>
                      </div>
                    </div>

                    <button
                      onClick={handleCloseHUD}
                      className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center border border-white/25 transition-colors cursor-pointer"
                      style={{ touchAction: "manipulation" }}
                      title="Ẩn điều khiển"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Center Chunky YouTube Kids Controls: Prev, -10s, Giant Play/Pause, +10s, Next */}
                  <div
                    className="flex items-center justify-center gap-2 sm:gap-4 md:gap-5 my-auto pointer-events-auto z-10 cursor-default"
                    onClick={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    onTouchEnd={(e) => e.stopPropagation()}
                  >
                    {/* Previous Video Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handlePreviousVideo}
                      className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/20 hover:bg-white/30 active:bg-cyan-500/40 text-white flex items-center justify-center shadow-xl border-2 border-white/30 backdrop-blur-md transition-transform cursor-pointer"
                      style={{ touchAction: "manipulation" }}
                      title="Xem video trước"
                    >
                      <SkipBack size={22} fill="white" />
                    </motion.button>

                    {/* -10s Rewind Button (YouTube Kids style) */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleSkipSeconds(-10)}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/25 text-white flex flex-col items-center justify-center border border-white/25 backdrop-blur-md transition-transform cursor-pointer"
                      style={{ touchAction: "manipulation" }}
                      title="Tua lùi 10 giây"
                    >
                      <RotateCcw size={16} />
                      <span className="text-[8px] sm:text-[9px] font-black leading-none mt-0.5">-10s</span>
                    </motion.button>

                    {/* Giant Center Play / Pause Button */}
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={togglePlayPause}
                      className={`w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-full flex items-center justify-center text-white shadow-[0_0_35px_rgba(6,182,212,0.6)] border-4 border-white/70 transition-transform cursor-pointer ${
                        isPlaying
                          ? "bg-gradient-to-tr from-cyan-500 via-sky-400 to-blue-600"
                          : "bg-gradient-to-tr from-amber-400 via-orange-400 to-amber-500 animate-pulse"
                      }`}
                      style={{ touchAction: "manipulation" }}
                      title={isPlaying ? "Tạm dừng video" : "Tiếp tục phát"}
                    >
                      {isPlaying ? (
                        <Pause size={34} fill="white" />
                      ) : (
                        <Play size={36} fill="white" className="ml-1" />
                      )}
                    </motion.button>

                    {/* +10s Forward Button (YouTube Kids style) */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleSkipSeconds(10)}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/25 text-white flex flex-col items-center justify-center border border-white/25 backdrop-blur-md transition-transform cursor-pointer"
                      style={{ touchAction: "manipulation" }}
                      title="Tua tới 10 giây"
                    >
                      <RotateCw size={16} />
                      <span className="text-[8px] sm:text-[9px] font-black leading-none mt-0.5">+10s</span>
                    </motion.button>

                    {/* Next Video Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleNextVideoShortcut}
                      className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/20 hover:bg-white/30 active:bg-cyan-500/40 text-white flex items-center justify-center shadow-xl border-2 border-white/30 backdrop-blur-md transition-transform cursor-pointer"
                      style={{ touchAction: "manipulation" }}
                      title="Xem video tiếp theo"
                    >
                      <SkipForward size={22} fill="white" />
                    </motion.button>
                  </div>

                  {/* YouTube Kids Authentic Red Scrubber Bar & Controls */}
                  <div
                    className="w-full pointer-events-auto z-10 flex flex-col gap-1.5"
                    onClick={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    onTouchEnd={(e) => e.stopPropagation()}
                  >
                    {/* Time Indicator & Scrubber Track */}
                    <div className="w-full px-1">
                      <div className="flex items-center justify-between text-[11px] font-bold text-white/90 mb-1 font-mono">
                        <span className="px-1.5 py-0.5 rounded bg-black/60 border border-white/10">{formatTime(currentTime)}</span>
                        <span className="px-1.5 py-0.5 rounded bg-black/60 border border-white/10">{formatTime(duration || 300)}</span>
                      </div>
                      <div
                        className="relative w-full h-3 bg-white/25 rounded-full cursor-pointer flex items-center group/scrub"
                        style={{ touchAction: "manipulation" }}
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const clickX = e.clientX - rect.left;
                          const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                          const targetTime = ratio * (duration || 300);
                          handleSeek(targetTime);
                        }}
                      >
                        <div
                          className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-red-500 rounded-full relative"
                          style={{
                            width: `${duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0}%`,
                          }}
                        >
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-lg border-2 border-red-600 group-hover/scrub:scale-125 transition-transform" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom HUD Quick Row */}
                    <div className="flex items-center justify-between w-full px-1">
                      <button
                        onClick={handleReplay}
                        className="text-white/90 hover:text-white text-xs font-semibold flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/20 border border-white/20 cursor-pointer"
                        style={{ touchAction: "manipulation" }}
                      >
                        <RotateCcw size={13} />
                        <span>Xem lại</span>
                      </button>

                      {/* Bottom HUD Fullscreen Button */}
                      <motion.button
                        whileTap={{ scale: 0.92 }}
                        onClick={toggleFullscreen}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-400/30 border border-amber-300 cursor-pointer"
                        style={{ touchAction: "manipulation" }}
                        title={isFullMode ? "Thu nhỏ màn hình" : "Xem toàn màn hình"}
                      >
                        {isFullMode ? <Minimize2 size={13} strokeWidth={2.5} /> : <Maximize2 size={13} strokeWidth={2.5} />}
                        <span>{isFullMode ? "Thu nhỏ" : "Toàn màn hình"}</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating YouTube Kids Quick Button on Video (Synchronized with Image 1) */}
            {!showQuickDrawer && !isVideoEnded && !isLocked && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.93 }}
                onClick={(e) => {
                  e.stopPropagation();
                  playSFX("pop");
                  setShowQuickDrawer(true);
                  setShowHUD(false);
                }}
                className={`absolute z-40 px-3 sm:px-4.5 py-1.5 sm:py-2.5 rounded-full bg-slate-950/90 hover:bg-slate-900 active:scale-95 text-white border-2 border-amber-400/80 hover:border-amber-300 backdrop-blur-md flex items-center gap-1.5 sm:gap-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_25px_rgba(251,191,36,0.45)] transition-all cursor-pointer select-none ${
                  isFullMode && !showHUD ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
                }`}
                style={{
                  right: "max(env(safe-area-inset-right, 12px), 12px)",
                  bottom: "max(env(safe-area-inset-bottom, 12px), 12px)",
                }}
                title="Mở danh sách video gợi ý"
              >
                <span className="text-sm sm:text-lg animate-bounce">🎈</span>
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
              recommendations={recommendations}
              onSelect={handleSelectNextVideo}
              onRefresh={handleRefreshRecommendations}
              isAutoPlayNext={isAutoPlayNext}
              onToggleAutoPlayNext={() => setIsAutoPlayNext(!isAutoPlayNext)}
              onRandomSurprise={handleRandomSurprise}
            />

            {/* In-App Recommendation End Screen Overlay */}
            <AnimatePresence>
              {isVideoEnded && (
                <VideoEndRecommendation
                  currentTitle={currentVideo.title}
                  recommendations={recommendations}
                  onSelect={handleSelectNextVideo}
                  onReplay={handleReplay}
                  onClose={handleClose}
                  onRefresh={handleRefreshRecommendations}
                />
              )}
            </AnimatePresence>

            {/* Toddler 3-Tap + Parental Math Gate Lock Overlay (True YouTube Kids Experience) */}
            {isLocked && (
              <div
                onClick={handleUnlockTap}
                className="absolute inset-0 z-50 bg-black/85 flex flex-col items-center justify-center backdrop-blur-md cursor-pointer select-none p-4"
              >
                <motion.div
                  key={unlockTapCount}
                  initial={{ scale: 0.9, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-slate-900/98 border-2 border-amber-400 rounded-3xl p-5 sm:p-7 max-w-sm w-full text-center shadow-[0_0_50px_rgba(251,191,36,0.35)] flex flex-col items-center gap-3 cursor-default"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-amber-300 flex items-center justify-center text-slate-950 shadow-inner">
                    <Lock size={30} strokeWidth={2.5} />
                  </div>

                  <h3
                    className="text-white text-base sm:text-lg font-black"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Màn hình đang khóa
                  </h3>

                  {/* Option A: For Parents - Quick Math Gate like YouTube Kids */}
                  {parentQuiz && (
                    <div className="w-full bg-white/10 rounded-2xl p-3 border border-white/15 my-1">
                      <div className="text-[11px] font-bold text-amber-300 mb-1 flex items-center justify-center gap-1">
                        <span>🔒 Dành cho Ba Mẹ:</span>
                        <span className="text-white font-mono text-xs font-black">
                          {parentQuiz.num1} × {parentQuiz.num2} = ?
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5 mt-2">
                        {parentQuiz.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => {
                              if (opt === parentQuiz.ans) {
                                playSFX("cheer");
                                setIsLocked(false);
                                setUnlockTapCount(0);
                              } else {
                                playSFX("boop");
                              }
                            }}
                            className="py-1.5 px-2 rounded-xl bg-white/15 hover:bg-amber-400 hover:text-slate-950 text-white font-black text-sm border border-white/20 transition-all active:scale-95 cursor-pointer font-mono"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Option B: For Toddlers - 3 Taps anywhere */}
                  <div
                    onClick={handleUnlockTap}
                    className="w-full py-2 px-3 rounded-2xl bg-amber-400/15 border border-amber-400/30 cursor-pointer hover:bg-amber-400/25 transition-colors"
                  >
                    <p className="text-amber-200 text-xs font-bold">
                      {unlockTapCount === 0 && "Hoặc bé chạm 3 lần để mở khóa"}
                      {unlockTapCount === 1 && "Chạm thêm 2 lần nữa nhé! ✌️"}
                      {unlockTapCount === 2 && "Chạm thêm 1 lần nữa là mở nè! ☝️"}
                      {unlockTapCount >= 3 && "Mở khóa thành công! 🎉"}
                    </p>
                    {/* 3 Progress Dots */}
                    <div className="flex items-center justify-center gap-2.5 mt-2">
                      {[0, 1, 2].map((dotIdx) => (
                        <div
                          key={dotIdx}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            dotIdx < unlockTapCount
                              ? "bg-amber-400 scale-125 shadow-md shadow-amber-400"
                              : "bg-white/20 border border-white/30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

          </div>

          {/* Mobile Portrait Quick Fullscreen CTA Bar */}
          {!isFullMode && (
            <div className="lg:hidden w-full shrink-0 pt-2 px-1">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  playSFX("tap");
                  toggleFullscreen();
                }}
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer border border-amber-300"
              >
                <Maximize2 size={15} strokeWidth={2.5} />
                <span>Bấm xem Toàn Màn Hình (hoặc xoay ngang máy) ⛶</span>
              </motion.button>
            </div>
          )}
        </div>

        {/* Education & Key Vocab Panel (Collapsible) */}
        <AnimatePresence>
          {showVocabPanel && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className={
                isFullMode
                  ? "absolute right-0 top-0 bottom-0 z-40 w-full max-w-xs sm:max-w-sm bg-slate-950/95 backdrop-blur-2xl border-l border-white/20 p-3.5 sm:p-5 text-white shadow-2xl flex flex-col overflow-hidden"
                  : "w-full lg:w-2/5 xl:w-1/3 flex-1 lg:h-full lg:max-h-[85vh] bg-slate-900/85 backdrop-blur-xl border border-white/15 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 text-white shadow-2xl flex flex-col overflow-hidden"
              }
            >
              {/* Header & Star Achievement & Minimize Button */}
              <div className="flex items-center justify-between pb-2.5 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{currentVideo.categoryEmoji}</span>
                  <div>
                    <span
                      className="text-xs font-bold text-amber-300 block"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Góc Từ Vựng & Mẹo Học
                    </span>
                    <span className="text-[10px] text-white/60">
                      Độ tuổi: {currentVideo.recommendedAge}
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
                    <span>{hasAwardedStars ? "+5 ⭐ Đã nhận" : "+5 ⭐ Xem học"}</span>
                  </div>

                  <button
                    onClick={() => {
                      playSFX("tap");
                      setShowVocabPanel(false);
                    }}
                    className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
                    title="Ẩn góc từ vựng để mở rộng video"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto scroll-area space-y-3 pt-2.5 pr-1">
                {/* Parent Tip Box */}
                {currentVideo.parentTip && (
                  <div className="bg-amber-500/15 border border-amber-400/30 p-3 rounded-2xl">
                    <div className="flex items-center justify-between gap-1 text-[11px] font-bold text-amber-300 mb-1">
                      <span className="flex items-center gap-1">
                        <HelpCircle size={13} />
                        Mẹo cho Ba Mẹ đồng hành cùng bé:
                      </span>
                    </div>
                    <p className="text-xs text-amber-100/90 leading-relaxed">
                      {currentVideo.parentTip}
                    </p>
                  </div>
                )}

                {/* Key Vocabulary Section */}
                <div>
                  <div className="flex items-center justify-between mb-2 gap-2">
                    <span className="text-xs font-bold text-white/90 flex items-center gap-1.5">
                      <Sparkles size={14} className="text-yellow-400" />
                      <span>
                        Từ vựng ({filteredVocab.length}
                        {vocabSearch && filteredVocab.length !== currentVideo.keyVocab.length ? `/${currentVideo.keyVocab.length}` : ""} từ):
                      </span>
                    </span>

                    <button
                      onClick={handlePlayAllVocab}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                        isAutoPlayingVocab
                          ? "bg-amber-400 text-slate-950 border border-amber-300 font-black animate-pulse"
                          : "bg-white/15 hover:bg-white/25 text-white/90 border border-white/20"
                      }`}
                      title="Phát âm lần lượt từng từ vựng cho bé nghe"
                    >
                      <Volume2 size={12} />
                      <span>{isAutoPlayingVocab ? "Dừng đọc" : "Đọc tất cả"}</span>
                    </button>
                  </div>

                  {/* Search filter if video has more than 6 words */}
                  {currentVideo.keyVocab.length > 6 && (
                    <div className="relative mb-2.5">
                      <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                      <input
                        type="text"
                        value={vocabSearch}
                        onChange={(e) => setVocabSearch(e.target.value)}
                        placeholder={`Tìm trong ${currentVideo.keyVocab.length} từ vựng...`}
                        className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-white/10 text-white placeholder-white/40 text-xs border border-white/15 focus:outline-none focus:border-amber-400/60"
                      />
                      {vocabSearch && (
                        <button
                          onClick={() => setVocabSearch("")}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white cursor-pointer"
                        >
                          <X size={12} />
                        </button>
                      )}
                    </div>
                  )}

                  {filteredVocab.length === 0 ? (
                    <div className="text-center py-6 text-white/60 text-xs bg-white/5 rounded-xl border border-white/10">
                      <span>Không tìm thấy từ vựng &quot;{vocabSearch}&quot;</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                      {filteredVocab.map((item, idx) => (
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
                  )}
                </div>

                {/* Video Description */}
                <div className="pt-2 border-t border-white/10">
                  <p className="text-xs text-white/70 leading-relaxed">
                    {currentVideo.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
