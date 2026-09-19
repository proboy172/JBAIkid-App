"use client";

import { useState, useRef, useEffect } from "react";
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
} from "lucide-react";
import { EducationalVideo, educationalVideos, getRecommendedVideos } from "@/data/educationalVideos";
import { useAppStore } from "@/stores/appStore";
import { playSFX } from "@/utils/soundEffects";
import { useSpeech } from "@/hooks/useSpeech";
import VideoEndRecommendation, { RecommendedItem } from "./VideoEndRecommendation";

interface SafeVideoModalProps {
  video: EducationalVideo;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onSelectVideo?: (newVideo: EducationalVideo) => void;
}

export default function SafeVideoModal({
  video,
  onClose,
  isFavorite,
  onToggleFavorite,
  onSelectVideo,
}: SafeVideoModalProps) {
  const { addStars } = useAppStore();
  const { speak } = useSpeech();
  const [currentVideo, setCurrentVideo] = useState<EducationalVideo>(video);
  const [hasAwardedStars, setHasAwardedStars] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [showVocabPanel, setShowVocabPanel] = useState(true);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const openTimeRef = useRef<number>(Date.now());
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Sync state if video prop changes
  useEffect(() => {
    setCurrentVideo(video);
    setIsVideoEnded(false);
    setHasAwardedStars(false);
    openTimeRef.current = Date.now();
  }, [video]);

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

  // Randomized 6 recommendations like YouTube Kids
  const [recommendations, setRecommendations] = useState<RecommendedItem[]>(() =>
    getRecommendedVideos(currentVideo, 6).map((v) => ({
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
      getRecommendedVideos(currentVideo, 6).map((v) => ({
        id: v.id,
        title: v.title,
        thumbnail: `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`,
        channelOrArtist: v.channel,
        avatarOrEmoji: v.channelAvatar,
        duration: v.duration,
        categoryName: v.categoryNameVi,
      }))
    );
  }, [currentVideo]);

  const handleRefreshRecommendations = () => {
    setRecommendations(
      getRecommendedVideos(currentVideo, 6).map((v) => ({
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
  };

  const handleSelectNextVideo = (nextId: string) => {
    const nextVid = educationalVideos.find((v) => v.id === nextId);
    if (nextVid) {
      setCurrentVideo(nextVid);
      setIsVideoEnded(false);
      setIframeKey((prev) => prev + 1);
      setHasAwardedStars(false);
      openTimeRef.current = Date.now();
      onSelectVideo?.(nextVid);
    }
  };

  const handleReplay = () => {
    setIsVideoEnded(false);
    setIframeKey((prev) => prev + 1);
    openTimeRef.current = Date.now();
  };

  const handleClose = () => {
    if (isLocked) {
      playSFX("pop");
      return;
    }
    playSFX("tap");
    const elapsedSeconds = (Date.now() - openTimeRef.current) / 1000;
    if (!hasAwardedStars && elapsedSeconds >= 15) {
      addStars(5);
      setHasAwardedStars(true);
      playSFX("star");
    }
    onClose();
  };

  const handleSpeakWord = (word: string) => {
    playSFX("tap");
    speak(word, "en-US", 0.85);
  };

  const toggleLock = () => {
    playSFX("tap");
    setIsLocked(!isLocked);
  };

  // Continuous Handshake & Message Listener for YouTube Iframe Player
  useEffect(() => {
    // Handshake: Required by YouTube to start streaming postMessage events
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

        // 1. Direct onStateChange === 0 (YT.PlayerState.ENDED)
        if (
          (data.event === "onStateChange" && (data.info === 0 || data.info === "0")) ||
          (data.event === "infoDelivery" && (data.info?.playerState === 0 || data.info?.playerState === "0"))
        ) {
          handleVideoFinished();
        }

        // 2. Near-end detection via infoDelivery (catches 1:00:20 / 1:00:21)
        if (data.event === "infoDelivery" && data.info) {
          const ct = data.info.currentTime;
          const dur = data.info.duration;
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md select-none"
    >
      {/* Top Controls Header */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-3 sm:p-5 bg-gradient-to-b from-black/80 to-transparent">
        {/* Channel Info & Video Title */}
        <div className="flex items-center gap-3 max-w-[50%] sm:max-w-[60%]">
          <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl shrink-0 shadow-inner">
            {currentVideo.channelAvatar}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/20 text-amber-300">
                {currentVideo.channel}
              </span>
              <span className="text-[11px] text-white/70 hidden sm:inline">
                {currentVideo.categoryNameVi}
              </span>
            </div>
            <h2
              className="text-white text-sm sm:text-base md:text-lg font-bold truncate drop-shadow-md"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {currentVideo.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Next Videos Suggestions Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playSFX("tap");
              setIsVideoEnded(!isVideoEnded);
            }}
            className={`px-3 py-1.5 rounded-full border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isVideoEnded
                ? "bg-cyan-500 text-white border-cyan-400 shadow-md shadow-cyan-500/30"
                : "bg-white/15 border-white/25 text-white/90 hover:bg-white/25"
            }`}
            title="Xem danh sách bài tiếp theo cho bé"
          >
            <span>🎬</span>
            <span className="hidden sm:inline">Bài Tiếp Theo</span>
            <span className="sm:hidden">Tiếp</span>
          </motion.button>

          {/* Toggle Vocab Panel Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playSFX("tap");
              setShowVocabPanel(!showVocabPanel);
            }}
            className={`px-3 py-1.5 rounded-full border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              showVocabPanel
                ? "bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-400/30"
                : "bg-white/15 border-white/25 text-white/90 hover:bg-white/25"
            }`}
            title={showVocabPanel ? "Ẩn góc từ vựng để mở rộng video" : "Bật góc từ vựng & mẹo học"}
          >
            <BookOpen size={16} />
            <span className="hidden sm:inline">{showVocabPanel ? "Ẩn Từ Vựng" : "Bật Từ Vựng"}</span>
            <span className="sm:hidden">{showVocabPanel ? "Ẩn" : "Từ Vựng"}</span>
          </motion.button>

          {/* Favorite Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              playSFX("tap");
              onToggleFavorite();
            }}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
              isFavorite
                ? "bg-red-500/30 border-red-400 text-red-400"
                : "bg-white/15 border-white/25 text-white/70 hover:bg-white/25"
            }`}
            title={isFavorite ? "Bỏ yêu thích" : "Lưu vào video yêu thích"}
          >
            <Heart size={18} fill={isFavorite ? "#F87171" : "none"} />
          </motion.button>

          {/* Toddler Screen Lock Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleLock}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
              isLocked
                ? "bg-amber-500 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/40"
                : "bg-white/15 border-white/25 text-white/70 hover:bg-white/25"
            }`}
            title={isLocked ? "Bấm để mở khóa thao tác" : "Khóa màn hình cho bé xem"}
          >
            {isLocked ? <Lock size={18} strokeWidth={2.5} /> : <Unlock size={18} />}
          </motion.button>

          {/* Close Button */}
          <button
            onClick={handleClose}
            disabled={isLocked}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-colors text-white ${
              isLocked
                ? "opacity-30 cursor-not-allowed bg-white/10 border-white/10"
                : "bg-white/20 hover:bg-white/30 border-white/30 cursor-pointer"
            }`}
            title="Đóng video"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Main Content Area: Player (Top/Left) + Education Details (Bottom/Right) */}
      <div className="flex-1 w-full h-full flex flex-col lg:flex-row items-center justify-center z-10 pt-16 sm:pt-20 pb-3 px-3 sm:px-6 gap-3 sm:gap-5 overflow-hidden">
        {/* Safe YouTube Player Container */}
        <div
          className={`w-full h-full transition-all duration-300 flex items-center justify-center relative ${
            showVocabPanel
              ? "lg:w-3/5 xl:w-2/3 max-h-[55vh] sm:max-h-[60vh] lg:max-h-[85vh]"
              : "w-full max-w-6xl max-h-[85vh]"
          }`}
        >
          <div className="w-full h-full relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-white/15 bg-black">
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
                } catch {}
              }}
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

            {/* Floating Re-open Vocab Button when Panel is Hidden */}
            {!showVocabPanel && (
              <motion.button
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playSFX("tap");
                  setShowVocabPanel(true);
                }}
                className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-30 px-3.5 py-2 rounded-2xl bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-2xl border border-amber-300 hover:bg-amber-300 transition-transform cursor-pointer"
                title="Bật góc từ vựng và mẹo học"
              >
                <BookOpen size={15} />
                <span>Bật Từ Vựng</span>
              </motion.button>
            )}

            {/* Transparent click blocker when toddler screen lock is active */}
            {isLocked && (
              <div
                onClick={toggleLock}
                className="absolute inset-0 z-50 bg-black/20 flex flex-col items-center justify-center backdrop-blur-[1px] cursor-pointer"
              >
                <div className="bg-black/80 px-4 py-2 rounded-2xl border border-amber-400 text-amber-300 flex items-center gap-2 shadow-2xl animate-pulse">
                  <Lock size={18} />
                  <span className="text-xs font-bold">Màn hình đang khóa. Chạm vào đây để mở khóa.</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Education & Key Vocab Panel (Collapsible) */}
        <AnimatePresence>
          {showVocabPanel && (
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

                {/* Key Vocabulary Chips */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white/80 flex items-center gap-1">
                      <Sparkles size={14} className="text-yellow-400" />
                      Từ vựng bé học được qua video (Chạm để nghe):
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                    {currentVideo.keyVocab.map((item, idx) => (
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
                            <span
                              className="font-bold text-yellow-300 text-sm block leading-none"
                              style={{ fontFamily: "var(--font-heading)" }}
                            >
                              {item.en}
                            </span>
                            <span className="text-xs text-white/80 mt-0.5 block truncate">
                              {item.vi}
                            </span>
                          </div>
                        </div>

                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 group-hover:text-white group-hover:bg-primary transition-colors shrink-0">
                          <Volume2 size={15} />
                        </div>
                      </motion.button>
                    ))}
                  </div>
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
