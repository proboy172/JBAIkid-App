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
  ChevronDown,
  ListVideo,
} from "lucide-react";
import { EducationalVideo, educationalVideos, getRecommendedVideos } from "@/data/educationalVideos";
import { useAppStore } from "@/stores/appStore";
import { playSFX, pauseBGMForVideo, resumeBGMAfterVideo } from "@/utils/soundEffects";
import { useSpeech } from "@/hooks/useSpeech";
import { renderAvatar } from "@/utils/avatarHelper";
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
  const [mobileTab, setMobileTab] = useState<"vocab" | "recs">("vocab");
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
  const [isMobile, setIsMobile] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [parentQuiz, setParentQuiz] = useState<{ num1: number; num2: number; ans: number; options: number[] } | null>(null);
  const [supportsHover, setSupportsHover] = useState(false);

  // Touch gesture & smooth scrubbing state
  const [doubleTapRipple, setDoubleTapRipple] = useState<{
    type: "rewind" | "forward";
    id: number;
  } | null>(null);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [scrubTime, setScrubTime] = useState(0);
  const scrubberTrackRef = useRef<HTMLDivElement | null>(null);

  // Gesture handling refs
  const tapTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTapRef = useRef<{ time: number; x: number; y: number } | null>(null);
  const lastHUDToggleTimeRef = useRef<number>(0);
  const hudTimerRef = useRef<NodeJS.Timeout | null>(null);
  const unlockTimerRef = useRef<NodeJS.Timeout | null>(null);
  const currentTimeRef = useRef<number>(0);
  const lastStateUpdateTimeRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(true);
  const showHUDRef = useRef<boolean>(false);
  const openTimeRef = useRef<number>(Date.now());
  const modalRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isFullMode = isFullscreen || isMobileLandscape;

  // Detect hover capability
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
      setSupportsHover(mq.matches);
      const updateHover = (e: MediaQueryListEvent) => setSupportsHover(e.matches);
      try {
        mq.addEventListener("change", updateHover);
        return () => mq.removeEventListener("change", updateHover);
      } catch {
        mq.addListener?.(updateHover);
        return () => mq.removeListener?.(updateHover);
      }
    }
  }, []);

  // Responsive device & orientation detection
  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const hasTouch = "ontouchstart" in window || (navigator && navigator.maxTouchPoints > 0);
      setIsMobile(w < 1024 || (hasTouch && w < 1200));

      const isLandscape = w > h;
      const isMobileDevice = h <= 640 || w <= 1024 || hasTouch;
      setIsMobileLandscape(isLandscape && isMobileDevice);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    const mql = window.matchMedia("(orientation: landscape)");
    const handleMql = () => handleResize();
    try {
      mql.addEventListener("change", handleMql);
    } catch {
      mql.addListener?.(handleMql);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
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
        } catch {}
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

  // Lock body scroll and prevent BottomNav from showing
  useEffect(() => {
    document.body.classList.add("video-modal-open");
    return () => {
      document.body.classList.remove("video-modal-open");
      if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
      if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
      if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);
      if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
      try {
        if (screen.orientation && "unlock" in screen.orientation) {
          screen.orientation.unlock();
        }
      } catch {}
    };
  }, []);

  // Synchronize playing ref and show HUD when paused
  useEffect(() => {
    isPlayingRef.current = isPlaying;
    showHUDRef.current = showHUD;
    if (!isPlaying && !isLocked && !isVideoEnded) {
      setShowHUD(true);
      if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
    }
  }, [isPlaying, showHUD, isLocked, isVideoEnded]);

  // HUD Auto-Hide Timer (4s of inactivity - only hides while video is actively playing)
  const resetHUDTimer = useCallback(() => {
    if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
    if (!isPlayingRef.current) return;
    hudTimerRef.current = setTimeout(() => {
      if (isPlayingRef.current) {
        setShowHUD(false);
      }
    }, 4000);
  }, []);

  const handleOpenHUD = useCallback(() => {
    if (isLocked || isVideoEnded) return;
    lastHUDToggleTimeRef.current = Date.now();
    setCurrentTime(currentTimeRef.current);
    setShowHUD(true);
    resetHUDTimer();
  }, [isLocked, isVideoEnded, resetHUDTimer]);

  const handleCloseHUD = useCallback(() => {
    if (!isPlayingRef.current) return;
    if (Date.now() - lastHUDToggleTimeRef.current < 350) return;
    if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
    setShowHUD(false);
  }, []);

  // Play / Pause Toggle via YouTube postMessage
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

  // Scrubber drag handlers with Pointer Events for 120Hz smooth dragging
  const handleScrubberPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!scrubberTrackRef.current) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    setIsScrubbing(true);
    const rect = scrubberTrackRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetTime = ratio * (duration || 300);
    setScrubTime(targetTime);
    try { if (navigator.vibrate) navigator.vibrate(8); } catch {}
  };

  const handleScrubberPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isScrubbing || !scrubberTrackRef.current) return;
    e.stopPropagation();
    const rect = scrubberTrackRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetTime = ratio * (duration || 300);
    setScrubTime(targetTime);
  };

  const handleScrubberPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isScrubbing) return;
    e.stopPropagation();
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    setIsScrubbing(false);
    const rect = scrubberTrackRef.current?.getBoundingClientRect();
    if (rect) {
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const targetTime = ratio * (duration || 300);
      handleSeek(targetTime);
    } else {
      handleSeek(scrubTime);
    }
    try { if (navigator.vibrate) navigator.vibrate(12); } catch {}
  };

  // Unified Bulletproof Tap & Double-Tap Detector for Video Surface
  const handleVideoSurfaceTap = (clientX: number, clientY: number, target: HTMLElement) => {
    if (isLocked) return;
    const rect = target.getBoundingClientRect();
    const now = Date.now();
    const relX = clientX - rect.left;
    const ratio = relX / rect.width;

    // Detect double-tap: within 300ms & within 50px
    if (
      lastTapRef.current &&
      now - lastTapRef.current.time < 300 &&
      Math.hypot(clientX - lastTapRef.current.x, clientY - lastTapRef.current.y) < 50
    ) {
      if (tapTimerRef.current) {
        clearTimeout(tapTimerRef.current);
        tapTimerRef.current = null;
      }
      lastTapRef.current = null;

      if (ratio < 0.38) {
        // Double-tap left side: Rewind 10s
        handleSkipSeconds(-10);
        setDoubleTapRipple({ type: "rewind", id: Date.now() });
        try { if (navigator.vibrate) navigator.vibrate(12); } catch {}
        setTimeout(() => setDoubleTapRipple(null), 800);
        return;
      } else if (ratio > 0.62) {
        // Double-tap right side: Fast forward 10s
        handleSkipSeconds(10);
        setDoubleTapRipple({ type: "forward", id: Date.now() });
        try { if (navigator.vibrate) navigator.vibrate(12); } catch {}
        setTimeout(() => setDoubleTapRipple(null), 800);
        return;
      } else {
        // Double-tap center: Play / Pause toggle
        togglePlayPause();
        return;
      }
    }

    // First tap: toggle HUD with cooldown protection
    lastTapRef.current = { time: now, x: clientX, y: clientY };

    if (now - lastHUDToggleTimeRef.current > 300) {
      lastHUDToggleTimeRef.current = now;
      setShowHUD((prev) => {
        const next = !prev;
        if (next) resetHUDTimer();
        return next;
      });
    }
  };

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

  const toggleLock = (e?: React.MouseEvent) => {
    e?.stopPropagation();
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
  }, [currentVideo.id, hasAwardedStars, addStars]);

  // Recommendations list
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

  const handlePreviousVideo = (e?: React.MouseEvent) => {
    e?.stopPropagation();
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

  const handleNextVideoShortcut = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    playSFX("tap");
    if (randomMode) {
      handleRandomSurprise();
    } else if (recommendations.length > 0) {
      handleSelectNextVideo(recommendations[0].id);
    } else {
      handleRandomSurprise();
    }
  };

  const handleRandomSurprise = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    playSFX("pop");
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

  const handleReplay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsVideoEnded(false);
    setShowHUD(false);
    setIsPlaying(true);
    setIframeKey((prev) => prev + 1);
    openTimeRef.current = Date.now();
  };

  const handleClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
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

          const ct = data.info.currentTime;
          const dur = data.info.duration;
          if (typeof ct === "number") {
            currentTimeRef.current = ct;
            if (showHUDRef.current) {
              const now = Date.now();
              if (now - lastStateUpdateTimeRef.current > 800) {
                lastStateUpdateTimeRef.current = now;
                setCurrentTime(ct);
              }
            }
          }
          if (typeof dur === "number" && dur > 0) {
            setDuration((prev) => (prev === dur ? prev : dur));
          }
          if (typeof ct === "number" && typeof dur === "number" && dur > 5 && ct >= dur - 1.5) {
            handleVideoFinished();
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
  }, [iframeKey, currentVideo.id]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLocked) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === "Space") {
        e.preventDefault();
        togglePlayPause();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        handleSkipSeconds(-10);
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        handleSkipSeconds(10);
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.code === "Escape") {
        e.preventDefault();
        if (isFullscreen) {
          toggleFullscreen();
        } else {
          handleClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLocked, togglePlayPause, handleSkipSeconds, toggleFullscreen, isFullscreen]);

  return (
    <motion.div
      ref={modalRef}
      id="safe-video-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-[1000] select-none bg-black overflow-hidden ${
        isFullMode
          ? "flex items-center justify-center"
          : isMobile
          ? "flex flex-col bg-[#07090E]"
          : "flex items-center justify-center bg-black/95"
      }`}
    >
      {/* ----------------- DESKTOP TOP CONTROLS HEADER (Hidden in Full Mode & Mobile Portrait) ----------------- */}
      {!isFullMode && !isMobile && (
        <div
          className={`absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-b from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${
            showHUD || isLocked || playbackError ? "opacity-100 pointer-events-auto" : "opacity-90 hover:opacity-100"
          }`}
          style={{
            paddingLeft: "max(env(safe-area-inset-left, 16px), 16px)",
            paddingRight: "max(env(safe-area-inset-right, 16px), 16px)",
            paddingTop: "max(env(safe-area-inset-top, 16px), 16px)",
          }}
        >
          {/* Channel Info & Video Title */}
          <div className="flex items-center gap-3 flex-1 min-w-0 mr-4">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md border border-red-400 shrink-0 select-none">
              <Play size={12} fill="white" className="ml-0.5" />
              <span className="text-xs font-black tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                Kids
              </span>
            </div>

            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl shrink-0 shadow-inner overflow-hidden">
              {renderAvatar(currentVideo.channelAvatar, { alt: currentVideo.channel, sizeClass: "w-full h-full", textClass: "text-2xl" })}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/20 text-amber-300 truncate">
                  {currentVideo.channel}
                </span>
                {currentVideo.isNew && (
                  <span className="text-[10px] font-black text-amber-200 px-2 py-0.5 rounded-md bg-red-600/90 border border-amber-300/80 shrink-0">
                    🔥 MỚI
                  </span>
                )}
                <span className="text-[11px] text-white/70">
                  {currentVideo.categoryNameVi}
                </span>
              </div>
              <h2
                className="text-white text-sm md:text-base font-bold truncate drop-shadow-md"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {currentVideo.title}
              </h2>
            </div>
          </div>

          {/* Desktop Right Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                playSFX("tap");
                setShowQuickDrawer(!showQuickDrawer);
              }}
              className={`px-3 py-1.5 rounded-full border text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                showQuickDrawer
                  ? "bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-500/30"
                  : "bg-white/20 border-white/30 text-white hover:bg-white/30"
              }`}
            >
              <span>🎈</span>
              <span>Gợi Ý</span>
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleRandomSurprise}
              className="px-3 py-1.5 rounded-full border border-amber-400/40 bg-gradient-to-r from-amber-400/20 to-orange-500/20 text-amber-300 hover:bg-amber-400/30 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
            >
              <span>🎲</span>
              <span>Ngẫu nhiên</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                playSFX("tap");
                setShowVocabPanel(!showVocabPanel);
              }}
              className={`px-3 py-1.5 rounded-full border text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-sm ${
                showVocabPanel
                  ? "bg-amber-400 text-slate-950 border-amber-300 font-black"
                  : "bg-white/20 text-white border-white/30 hover:bg-white/30"
              }`}
            >
              <BookOpen size={14} />
              <span>{showVocabPanel ? "Ẩn Từ Vựng" : "Từ Vựng"}</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                playSFX("tap");
                toggleFullscreen();
              }}
              className="w-9 h-9 rounded-full border border-white/25 bg-white/20 text-amber-300 flex items-center justify-center hover:bg-white/30 cursor-pointer"
              title="Toàn màn hình"
            >
              {isFullMode ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                playSFX("tap");
                onToggleFavorite();
              }}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                isFavorite
                  ? "bg-red-500/30 border-red-400 text-red-400"
                  : "bg-white/20 border-white/25 text-white/70 hover:bg-white/30"
              }`}
              title={isFavorite ? "Bỏ yêu thích" : "Yêu thích"}
            >
              <Heart size={16} fill={isFavorite ? "#F87171" : "none"} />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleLock}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                isLocked
                  ? "bg-amber-500 text-slate-950 border-amber-300"
                  : "bg-white/20 border-white/25 text-white/70 hover:bg-white/30"
              }`}
              title="Khóa màn hình cho bé"
            >
              {isLocked ? <Lock size={16} /> : <Unlock size={16} />}
            </motion.button>

            <button
              onClick={handleClose}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 border border-white/30 flex items-center justify-center text-white cursor-pointer"
              title="Đóng video"
            >
              <X size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      )}

      {/* ----------------- MAIN VIDEO STAGE CONTAINER ----------------- */}
      <div
        className={`w-full transition-all duration-300 ${
          isFullMode
            ? "fixed inset-0 h-full flex items-center justify-center p-0 m-0 z-10"
            : isMobile
            ? "w-full aspect-video bg-black relative shrink-0 z-10 shadow-2xl"
            : `flex-1 h-full flex flex-col lg:flex-row items-center justify-center pt-16 pb-4 px-4 gap-4 z-10 ${
                showVocabPanel ? "max-w-7xl" : "max-w-6xl"
              }`
        }`}
      >
        {/* Video Player Box: Edge-to-Edge on Mobile, Elegant Rounded Box on Desktop */}
        <div
          className={`relative overflow-hidden bg-black ${
            isFullMode
              ? "w-full h-full rounded-none"
              : isMobile
              ? "w-full h-full rounded-none"
              : showVocabPanel
              ? "w-full lg:w-3/5 xl:w-2/3 aspect-video rounded-3xl shadow-[0_15px_50px_rgba(0,0,0,0.9)] border border-white/15"
              : "w-full aspect-video rounded-3xl shadow-[0_15px_50px_rgba(0,0,0,0.9)] border border-white/15"
          }`}
        >
          {/* YouTube Embed Player */}
          <iframe
            ref={iframeRef}
            key={`${currentVideo.id}-${iframeKey}`}
            src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=1&controls=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&enablejsapi=1&fs=0&disablekb=1&origin=${typeof window !== "undefined" ? encodeURIComponent(window.location.origin) : ""}`}
            title={currentVideo.title}
            sandbox="allow-scripts allow-same-origin allow-presentation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0 pointer-events-none"
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

          {/* Unified Touch/Click Layer on Video Surface */}
          {!showQuickDrawer && !isVideoEnded && !isLocked && !playbackError && (
            <div
              id="safe-video-unified-touch-surface"
              onClick={(e) => handleVideoSurfaceTap(e.clientX, e.clientY, e.currentTarget)}
              className="absolute inset-0 z-20 cursor-pointer pointer-events-auto select-none"
              style={{
                backgroundColor: "rgba(0,0,0,0.001)",
                WebkitTapHighlightColor: "transparent",
                touchAction: "manipulation",
              }}
              title="Chạm màn hình để bật/tắt điều khiển • Chạm 2 lần hai bên để tua 10 giây"
            />
          )}

          {/* Double Tap Seek Feedback Ripple */}
          <AnimatePresence>
            {doubleTapRipple && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.18 }}
                className={`absolute top-1/2 -translate-y-1/2 z-40 pointer-events-none flex flex-col items-center justify-center p-3.5 sm:p-5 rounded-3xl bg-black/85 backdrop-blur-md border border-cyan-400/60 shadow-[0_0_35px_rgba(6,182,212,0.6)] text-cyan-300 select-none ${
                  doubleTapRipple.type === "rewind" ? "left-6 sm:left-14" : "right-6 sm:right-14"
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-1">
                  {doubleTapRipple.type === "rewind" ? (
                    <RotateCcw size={28} className="text-cyan-400 animate-spin" />
                  ) : (
                    <RotateCw size={28} className="text-cyan-400 animate-spin" />
                  )}
                </div>
                <span className="text-lg sm:text-xl font-black tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                  {doubleTapRipple.type === "rewind" ? "-10s" : "+10s"}
                </span>
                <span className="text-[10px] font-bold text-white/80">
                  {doubleTapRipple.type === "rewind" ? "Tua lùi 10s" : "Tua tới 10s"}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ----------------- MOBILE / FULLSCREEN HUD CONTROLS OVERLAY ----------------- */}
          <AnimatePresence>
            {(showHUD || !isPlaying) && !isLocked && !isVideoEnded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    handleCloseHUD();
                  }
                }}
                className="absolute inset-0 z-30 bg-black/50 backdrop-blur-[1.5px] flex flex-col justify-between p-2.5 sm:p-4 select-none pointer-events-auto cursor-pointer"
              >
                {/* Top Video Header Row */}
                <div className="flex items-center justify-between w-full pointer-events-auto z-10">
                  <div className="flex items-center gap-2 min-w-0 flex-1 mr-2">
                    <button
                      onClick={handleClose}
                      className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 active:scale-90 text-white flex items-center justify-center border border-white/25 shadow-lg transition-transform cursor-pointer shrink-0"
                      style={{ touchAction: "manipulation" }}
                      title="Đóng video"
                    >
                      {isMobile && !isFullMode ? <ChevronDown size={22} /> : <X size={20} />}
                    </button>

                    <div className="min-w-0">
                      <h3 className="text-white text-xs sm:text-sm font-extrabold truncate drop-shadow-md">
                        {currentVideo.title}
                      </h3>
                      <span className="text-[10px] text-amber-300 font-bold block truncate">
                        {currentVideo.channel}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Screen Lock Toggle Button */}
                    <button
                      onClick={toggleLock}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/80 active:scale-90 text-white flex items-center justify-center border border-white/25 shadow-lg transition-transform cursor-pointer"
                      style={{ touchAction: "manipulation" }}
                      title="Khóa màn hình"
                    >
                      <Lock size={16} />
                    </button>

                    {/* Fullscreen Toggle Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playSFX("tap");
                        toggleFullscreen();
                      }}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/80 active:scale-90 text-amber-300 flex items-center justify-center border border-white/25 shadow-lg transition-transform cursor-pointer"
                      style={{ touchAction: "manipulation" }}
                      title={isFullMode ? "Thu nhỏ" : "Toàn màn hình"}
                    >
                      {isFullMode ? <Minimize2 size={16} strokeWidth={2.5} /> : <Maximize2 size={16} strokeWidth={2.5} />}
                    </button>
                  </div>
                </div>

                {/* Center Big Controls Row: Prev, -10s, Giant Play/Pause, +10s, Next */}
                <div className="flex items-center justify-center gap-3 sm:gap-6 my-auto pointer-events-auto z-10">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handlePreviousVideo}
                    className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-black/80 active:scale-90 text-white flex items-center justify-center shadow-xl border border-white/30 backdrop-blur-md cursor-pointer"
                    style={{ touchAction: "manipulation" }}
                    title="Video trước"
                  >
                    <SkipBack size={20} fill="white" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSkipSeconds(-10);
                    }}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 active:scale-90 text-white flex flex-col items-center justify-center border border-white/30 backdrop-blur-md cursor-pointer"
                    style={{ touchAction: "manipulation" }}
                    title="Tua lùi 10s"
                  >
                    <RotateCcw size={16} />
                    <span className="text-[8px] sm:text-[9px] font-black leading-none mt-0.5">-10s</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={togglePlayPause}
                    className={`w-15 h-15 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white shadow-[0_0_35px_rgba(6,182,212,0.6)] border-4 border-white/80 transition-transform cursor-pointer ${
                      isPlaying
                        ? "bg-gradient-to-tr from-cyan-500 via-sky-400 to-blue-600"
                        : "bg-gradient-to-tr from-amber-400 via-orange-400 to-amber-500 animate-pulse"
                    }`}
                    style={{ touchAction: "manipulation" }}
                    title={isPlaying ? "Tạm dừng" : "Tiếp tục phát"}
                  >
                    {isPlaying ? <Pause size={30} fill="white" /> : <Play size={32} fill="white" className="ml-1" />}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSkipSeconds(10);
                    }}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 active:scale-90 text-white flex flex-col items-center justify-center border border-white/30 backdrop-blur-md cursor-pointer"
                    style={{ touchAction: "manipulation" }}
                    title="Tua tới 10s"
                  >
                    <RotateCw size={16} />
                    <span className="text-[8px] sm:text-[9px] font-black leading-none mt-0.5">+10s</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleNextVideoShortcut}
                    className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-black/80 active:scale-90 text-white flex items-center justify-center shadow-xl border border-white/30 backdrop-blur-md cursor-pointer"
                    style={{ touchAction: "manipulation" }}
                    title="Video tiếp"
                  >
                    <SkipForward size={20} fill="white" />
                  </motion.button>
                </div>

                {/* Bottom Scrubber & Time Bar */}
                <div className="w-full pointer-events-auto z-10 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-[11px] font-bold text-white/90 font-mono select-none px-1">
                    <span className="px-1.5 py-0.5 rounded bg-black/70 border border-white/10">
                      {formatTime(isScrubbing ? scrubTime : currentTime)}
                    </span>
                    {isScrubbing && (
                      <span className="px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-black animate-pulse text-[10px]">
                        Đang kéo: {formatTime(scrubTime)}
                      </span>
                    )}
                    <span className="px-1.5 py-0.5 rounded bg-black/70 border border-white/10">
                      {formatTime(duration || 300)}
                    </span>
                  </div>

                  {/* Scrubber Track with Generous Touch Area */}
                  <div
                    ref={scrubberTrackRef}
                    className="relative w-full py-3 cursor-pointer flex items-center select-none"
                    style={{ touchAction: "none" }}
                    onPointerDown={handleScrubberPointerDown}
                    onPointerMove={handleScrubberPointerMove}
                    onPointerUp={handleScrubberPointerUp}
                    onPointerCancel={handleScrubberPointerUp}
                  >
                    <div className="w-full h-2.5 sm:h-3 bg-white/25 rounded-full overflow-hidden relative">
                      <div
                        className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-red-500 rounded-full"
                        style={{
                          width: `${
                            duration > 0
                              ? Math.min(100, ((isScrubbing ? scrubTime : currentTime) / duration) * 100)
                              : 0
                          }%`,
                        }}
                      />
                    </div>

                    <div
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white shadow-xl border-2 border-red-600 flex items-center justify-center pointer-events-none"
                      style={{
                        left: `${
                          duration > 0
                            ? Math.min(100, Math.max(0, ((isScrubbing ? scrubTime : currentTime) / duration) * 100))
                            : 0
                        }%`,
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-red-600" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toddler Lock Screen Overlay */}
          {isLocked && (
            <div
              onClick={handleUnlockTap}
              className="absolute inset-0 z-50 bg-black/90 flex flex-col items-center justify-center backdrop-blur-md cursor-pointer select-none p-4"
            >
              <motion.div
                key={unlockTapCount}
                initial={{ scale: 0.9, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-900 border-2 border-amber-400 rounded-3xl p-5 max-w-sm w-full text-center shadow-[0_0_50px_rgba(251,191,36,0.35)] flex flex-col items-center gap-3 cursor-default"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-amber-300 flex items-center justify-center text-slate-950 shadow-inner">
                  <Lock size={26} strokeWidth={2.5} />
                </div>

                <h3 className="text-white text-base font-black" style={{ fontFamily: "var(--font-heading)" }}>
                  Màn hình đang khóa
                </h3>

                {/* Option A: Math Gate */}
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

                {/* Option B: Toddler 3 Taps */}
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
        </div>

        {/* ----------------- DESKTOP VOCAB PANEL (Side Panel) ----------------- */}
        {!isFullMode && !isMobile && showVocabPanel && (
          <div className="w-full lg:w-2/5 xl:w-1/3 h-full max-h-[85vh] bg-slate-900/90 backdrop-blur-xl border border-white/15 rounded-3xl p-4 text-white shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between pb-2.5 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xl">{currentVideo.categoryEmoji}</span>
                <div>
                  <span className="text-xs font-bold text-amber-300 block" style={{ fontFamily: "var(--font-heading)" }}>
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
                      ? "bg-amber-400/20 text-amber-300 border-amber-400/50"
                      : "bg-white/10 text-white/50 border-white/15"
                  }`}
                >
                  <Award size={13} className={hasAwardedStars ? "text-amber-400" : ""} />
                  <span>{hasAwardedStars ? "+5 ⭐ Đã nhận" : "+5 ⭐ Xem học"}</span>
                </div>
                <button
                  onClick={() => setShowVocabPanel(false)}
                  className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pt-2.5 pr-1">
              {currentVideo.parentTip && (
                <div className="bg-amber-500/15 border border-amber-400/30 p-3 rounded-2xl">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-300 mb-1">
                    <HelpCircle size={13} />
                    <span>Mẹo cho Ba Mẹ đồng hành cùng bé:</span>
                  </div>
                  <p className="text-xs text-amber-100/90 leading-relaxed">
                    {currentVideo.parentTip}
                  </p>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2 gap-2">
                  <span className="text-xs font-bold text-white/90 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-yellow-400" />
                    <span>Từ vựng ({filteredVocab.length} từ):</span>
                  </span>
                  <button
                    onClick={handlePlayAllVocab}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                      isAutoPlayingVocab
                        ? "bg-amber-400 text-slate-950 font-black animate-pulse"
                        : "bg-white/15 hover:bg-white/25 text-white/90 border border-white/20"
                    }`}
                  >
                    <Volume2 size={12} />
                    <span>{isAutoPlayingVocab ? "Dừng đọc" : "Đọc tất cả"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {filteredVocab.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSpeakWord(item.en)}
                      className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-between text-left transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-2xl shrink-0">{item.emoji || "✨"}</span>
                        <div className="min-w-0">
                          <span className="font-bold text-yellow-300 text-sm block leading-none">
                            {item.en}
                          </span>
                          <span className="text-xs text-white/80 mt-0.5 block truncate">
                            {item.vi}
                          </span>
                        </div>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/70">
                        <Volume2 size={14} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ----------------- MOBILE PORTRAIT INTERACTIVE BOTTOM SECTION ----------------- */}
      {!isFullMode && isMobile && (
        <div className="flex-1 w-full flex flex-col min-h-0 bg-[#0A0E17] text-white overflow-hidden z-10 border-t border-white/10">
          {/* Header Row: Title, Channel, and Star Badge */}
          <div className="p-3 border-b border-white/10 shrink-0 bg-slate-900/60">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-base shrink-0 overflow-hidden">
                  {renderAvatar(currentVideo.channelAvatar, { alt: currentVideo.channel, sizeClass: "w-full h-full", textClass: "text-base" })}
                </div>
                <span className="text-xs font-bold text-amber-300 truncate">
                  {currentVideo.channel}
                </span>
                {currentVideo.isNew && (
                  <span className="text-[9px] font-black text-amber-200 px-1.5 py-0.5 rounded bg-red-600 shrink-0">
                    MỚI
                  </span>
                )}
              </div>

              <div
                className={`px-2.5 py-1 rounded-full text-[11px] font-black flex items-center gap-1 border shrink-0 ${
                  hasAwardedStars
                    ? "bg-amber-400/20 text-amber-300 border-amber-400/50"
                    : "bg-white/10 text-white/60 border-white/15"
                }`}
              >
                <Award size={12} className={hasAwardedStars ? "text-amber-400" : ""} />
                <span>{hasAwardedStars ? "+5 ⭐ Đã nhận" : "+5 ⭐ Xem học"}</span>
              </div>
            </div>

            <h2 className="text-white text-xs sm:text-sm font-extrabold line-clamp-2 leading-snug">
              {currentVideo.title}
            </h2>
          </div>

          {/* Quick Action Pill Buttons (Horizontal Scrollable) */}
          <div className="flex items-center gap-2 px-3 py-2 overflow-x-auto no-scrollbar shrink-0 bg-slate-950/40 border-b border-white/10">
            <button
              onClick={() => {
                playSFX("tap");
                onToggleFavorite();
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border transition-all shrink-0 active:scale-95 ${
                isFavorite
                  ? "bg-red-500/30 border-red-400 text-red-400"
                  : "bg-white/10 border-white/20 text-white/80 hover:bg-white/15"
              }`}
            >
              <Heart size={14} fill={isFavorite ? "#F87171" : "none"} />
              <span>{isFavorite ? "Đã thích" : "Yêu thích"}</span>
            </button>

            <button
              onClick={() => {
                playSFX("tap");
                setMobileTab("vocab");
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 border transition-all shrink-0 active:scale-95 ${
                mobileTab === "vocab"
                  ? "bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-400/20"
                  : "bg-white/10 border-white/20 text-white/80"
              }`}
            >
              <BookOpen size={14} />
              <span>Từ vựng ({currentVideo.keyVocab.length})</span>
            </button>

            <button
              onClick={() => {
                playSFX("tap");
                setMobileTab("recs");
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 border transition-all shrink-0 active:scale-95 ${
                mobileTab === "recs"
                  ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-400/20"
                  : "bg-white/10 border-white/20 text-white/80"
              }`}
            >
              <span>🎈</span>
              <span>Gợi ý ({recommendations.length})</span>
            </button>

            <button
              onClick={handleRandomSurprise}
              className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border border-amber-400/30 bg-amber-400/10 text-amber-300 shrink-0 active:scale-95"
            >
              <span>🎲</span>
              <span>Ngẫu nhiên</span>
            </button>

            <button
              onClick={() => {
                playSFX("tap");
                toggleFullscreen();
              }}
              className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border border-white/20 bg-white/10 text-white shrink-0 active:scale-95"
            >
              <Maximize2 size={13} />
              <span>Toàn màn hình</span>
            </button>
          </div>

          {/* Tab Content Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-3 space-y-3">
            {mobileTab === "vocab" && (
              <>
                {currentVideo.parentTip && (
                  <div className="bg-amber-500/15 border border-amber-400/30 p-2.5 rounded-2xl">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-300 mb-1">
                      <HelpCircle size={13} />
                      <span>Mẹo học cho bé:</span>
                    </div>
                    <p className="text-xs text-amber-100/90 leading-relaxed">
                      {currentVideo.parentTip}
                    </p>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white/90 flex items-center gap-1">
                      <Sparkles size={13} className="text-yellow-400" />
                      <span>Từ vựng tiếng Anh:</span>
                    </span>
                    <button
                      onClick={handlePlayAllVocab}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 border ${
                        isAutoPlayingVocab
                          ? "bg-amber-400 text-slate-950 border-amber-300 font-black animate-pulse"
                          : "bg-white/10 text-white/90 border-white/20"
                      }`}
                    >
                      <Volume2 size={12} />
                      <span>{isAutoPlayingVocab ? "Dừng" : "Đọc tất cả"}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {filteredVocab.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSpeakWord(item.en)}
                        className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:bg-cyan-500/20 border border-white/10 flex items-center justify-between text-left transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-2xl shrink-0">{item.emoji || "✨"}</span>
                          <div className="min-w-0">
                            <span className="font-bold text-yellow-300 text-sm block leading-none">
                              {item.en}
                            </span>
                            <span className="text-xs text-white/80 mt-0.5 block truncate">
                              {item.vi}
                            </span>
                          </div>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/70 shrink-0">
                          <Volume2 size={14} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <p className="text-xs text-white/60 leading-relaxed">
                    {currentVideo.description}
                  </p>
                </div>
              </>
            )}

            {mobileTab === "recs" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-white/80 mb-2">
                  <span>Video gợi ý tiếp theo</span>
                  <label className="flex items-center gap-1.5 cursor-pointer text-[11px] text-amber-300">
                    <input
                      type="checkbox"
                      checked={isAutoPlayNext}
                      onChange={(e) => setIsAutoPlayNext(e.target.checked)}
                      className="rounded accent-amber-400"
                    />
                    <span>Tự động phát tiếp</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {recommendations.map((rec) => (
                    <button
                      key={rec.id}
                      onClick={() => handleSelectNextVideo(rec.id)}
                      className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-[0.98] border border-white/10 flex items-center gap-3 text-left transition-all cursor-pointer"
                    >
                      <div className="w-24 sm:w-28 aspect-video rounded-xl overflow-hidden relative shrink-0 bg-black">
                        <img
                          src={rec.thumbnail}
                          alt={rec.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {rec.duration && (
                          <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/80 text-[9px] font-mono text-white font-bold">
                            {rec.duration}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="text-white text-xs font-bold line-clamp-2 leading-tight mb-1">
                          {rec.title}
                        </h4>
                        <div className="flex items-center gap-1 text-[10px] text-amber-300">
                          {renderAvatar(rec.avatarOrEmoji, { alt: rec.channelOrArtist, sizeClass: "w-3.5 h-3.5", textClass: "text-xs" })}
                          <span className="truncate">{rec.channelOrArtist}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
