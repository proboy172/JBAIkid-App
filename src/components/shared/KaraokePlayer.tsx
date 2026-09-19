"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, RotateCcw, BookOpen, Volume2, Languages, Sparkles } from "lucide-react";
import { Song, songsEn, songsVi, getRecommendedSongs } from "@/data/songs";
import { useAppStore } from "@/stores/appStore";
import { playSFX } from "@/utils/soundEffects";
import { useSpeech } from "@/hooks/useSpeech";
import VideoEndRecommendation, { RecommendedItem } from "@/components/videos/VideoEndRecommendation";

export default function KaraokePlayer({
  song,
  onClose,
  onSelectSong,
}: {
  song: Song;
  onClose: () => void;
  onSelectSong?: (newSong: Song) => void;
}) {
  const { addStars } = useAppStore();
  const { speak } = useSpeech();
  const [currentSong, setCurrentSong] = useState<Song>(song);
  const [hasAwardedStars, setHasAwardedStars] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showLyricsPanel, setShowLyricsPanel] = useState(false);
  const [showTranslation, setShowTranslation] = useState(true);
  const [isSongEnded, setIsSongEnded] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const openTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    setCurrentSong(song);
    setIsSongEnded(false);
    setHasAwardedStars(false);
    openTimeRef.current = Date.now();
  }, [song]);

  // Randomized 6 song recommendations
  const [songRecommendations, setSongRecommendations] = useState<RecommendedItem[]>(() =>
    getRecommendedSongs(currentSong, 6).map((s) => ({
      id: s.id,
      title: s.title,
      thumbnail: s.youtubeId
        ? `https://img.youtube.com/vi/${s.youtubeId}/hqdefault.jpg`
        : "/images/karaoke-thumb.jpg",
      channelOrArtist: songsEn.some((en) => en.id === s.id) ? "English Song" : "Bài Hát Việt",
      avatarOrEmoji: s.emoji,
      duration: `${s.lyrics.length} câu`,
      categoryName: "Karaoke Thiếu Nhi",
    }))
  );

  useEffect(() => {
    setSongRecommendations(
      getRecommendedSongs(currentSong, 6).map((s) => ({
        id: s.id,
        title: s.title,
        thumbnail: s.youtubeId
          ? `https://img.youtube.com/vi/${s.youtubeId}/hqdefault.jpg`
          : "/images/karaoke-thumb.jpg",
        channelOrArtist: songsEn.some((en) => en.id === s.id) ? "English Song" : "Bài Hát Việt",
        avatarOrEmoji: s.emoji,
        duration: `${s.lyrics.length} câu`,
        categoryName: "Karaoke Thiếu Nhi",
      }))
    );
  }, [currentSong]);

  const handleRefreshSongRecommendations = () => {
    setSongRecommendations(
      getRecommendedSongs(currentSong, 6).map((s) => ({
        id: s.id,
        title: s.title,
        thumbnail: s.youtubeId
          ? `https://img.youtube.com/vi/${s.youtubeId}/hqdefault.jpg`
          : "/images/karaoke-thumb.jpg",
        channelOrArtist: songsEn.some((en) => en.id === s.id) ? "English Song" : "Bài Hát Việt",
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

        // 1. onStateChange === 0
        if (
          (data.event === "onStateChange" && (data.info === 0 || data.info === "0")) ||
          (data.event === "infoDelivery" && (data.info?.playerState === 0 || data.info?.playerState === "0"))
        ) {
          handleSongFinished();
        }

        // 2. Near-end detection
        if (data.event === "infoDelivery" && data.info) {
          const ct = data.info.currentTime;
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

  const handleSongFinished = () => {
    if (!hasAwardedStars) {
      addStars(5);
      setHasAwardedStars(true);
      playSFX("star");
    }
    setIsSongEnded(true);
  };

  const handleSelectNextSong = (nextId: string) => {
    const all = [...songsEn, ...songsVi];
    const nextS = all.find((s) => s.id === nextId);
    if (nextS) {
      setCurrentSong(nextS);
      setIsSongEnded(false);
      setIframeKey((prev) => prev + 1);
      setHasAwardedStars(false);
      openTimeRef.current = Date.now();
      onSelectSong?.(nextS);
    }
  };

  const handleReplaySong = () => {
    setIsSongEnded(false);
    if (currentSong.localVideo && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      setIframeKey((prev) => prev + 1);
    }
    openTimeRef.current = Date.now();
  };

  const handleClose = () => {
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

  const handleSpeakLine = (text: string) => {
    playSFX("tap");
    speak(text, "en-US", 0.85);
  };

  const handleSpeakWord = (word: string) => {
    playSFX("tap");
    speak(word, "en-US", 0.8);
  };

  const hasLyrics = currentSong.lyrics && currentSong.lyrics.length > 0;
  const hasVocab = currentSong.keyVocab && currentSong.keyVocab.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-black overflow-hidden flex flex-col"
    >
      {/* Background Video - Full screen (if local file) */}
      {currentSong.localVideo && (
        <div className="absolute inset-0 z-0 bg-black">
          <video
            ref={videoRef}
            src={currentSong.localVideo}
            autoPlay
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleSongFinished}
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* Top Bar Header */}
      <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-4 sm:px-6 pt-[max(env(safe-area-inset-top),24px)] pb-3 bg-gradient-to-b from-black/85 via-black/50 to-transparent pointer-events-auto">
        <div className="flex items-center gap-2 min-w-0 pr-2">
          <span className="text-2xl sm:text-3xl shrink-0">{currentSong.emoji}</span>
          <h2 className="text-white text-base sm:text-xl font-bold truncate drop-shadow-md" style={{ fontFamily: "var(--font-heading)" }}>
            {currentSong.title}
          </h2>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Next Songs Suggestions Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playSFX("tap");
              setIsSongEnded(!isSongEnded);
            }}
            className={`px-3 py-1.5 rounded-full border text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-md backdrop-blur-md cursor-pointer ${
              isSongEnded
                ? "bg-purple-600 text-white border-purple-400 shadow-purple-500/40"
                : "bg-white/20 text-white hover:bg-white/30 border-white/30"
            }`}
            title="Xem danh sách bài hát tiếp theo cho bé"
          >
            <span>🎵</span>
            <span className="hidden sm:inline">Bài Tiếp Theo</span>
            <span className="sm:hidden">Tiếp</span>
          </motion.button>

          {/* Toggle Lyrics & Learning Button */}
          {hasLyrics && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playSFX("tap");
                setShowLyricsPanel(!showLyricsPanel);
              }}
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-md backdrop-blur-md border ${
                showLyricsPanel
                  ? "bg-primary text-white border-primary/50 shadow-primary/40"
                  : "bg-white/20 text-white hover:bg-white/30 border-white/30"
              }`}
              title="Xem lời bài hát & học từ vựng"
            >
              <BookOpen size={15} />
              <span className="hidden sm:inline">Học Lời Bài Hát</span>
              <span className="sm:hidden">Lời bài hát</span>
            </motion.button>
          )}

          <button
            onClick={handleClose}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer text-white"
            title="Đóng video"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Main Stage: Player Area + Optional Side Lyrics in Landscape */}
      <div className="flex-1 w-full h-full flex flex-col md:flex-row items-center justify-center z-10 pt-16 pb-4 px-2 sm:px-4 gap-4 overflow-hidden">
        
        {/* YouTube Embed Player (if not local) */}
        {!currentSong.localVideo && (
          <div className={`w-full h-full transition-all duration-300 flex items-center justify-center ${showLyricsPanel ? "md:w-3/5 lg:w-2/3" : "max-w-6xl mx-auto"}`}>
            <div className="w-full h-full max-h-[85vh] relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
              <iframe
                ref={iframeRef}
                key={`${currentSong.id}-${iframeKey}`}
                src={`https://www.youtube.com/embed/${currentSong.youtubeId}?autoplay=1&controls=1&rel=0&modestbranding=1&enablejsapi=1&origin=${typeof window !== "undefined" ? encodeURIComponent(window.location.origin) : ""}`}
                title={currentSong.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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

              {/* In-App Recommendation End Screen Overlay for YouTube Song */}
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
            </div>
          </div>
        )}

        {/* In-App Recommendation End Screen Overlay for Local Video */}
        {currentSong.localVideo && (
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
        )}

        {/* Side Panel in Landscape (when lyrics active) */}
        <AnimatePresence>
          {showLyricsPanel && hasLyrics && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="hidden md:flex flex-col w-2/5 lg:w-1/3 h-full max-h-[85vh] bg-slate-900/90 backdrop-blur-xl border border-white/15 rounded-2xl p-4 text-white shadow-2xl overflow-hidden"
            >
              {/* Lyrics Panel Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 shrink-0">
                <div className="flex items-center gap-1.5">
                  <Sparkles size={16} className="text-amber-400" />
                  <span className="font-bold text-sm text-amber-300" style={{ fontFamily: "var(--font-heading)" }}>
                    Lời Bài Hát & Học Từ
                  </span>
                </div>

                <button
                  onClick={() => setShowTranslation(!showTranslation)}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full border flex items-center gap-1 transition-colors ${
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

              {/* Key Vocab Chips */}
              {hasVocab && (
                <div className="mb-3 shrink-0 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <div className="text-[11px] font-bold text-white/70 mb-1.5 flex items-center gap-1">
                    <span>💡 Từ vựng quan trọng:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto scroll-area">
                    {currentSong.keyVocab?.map((v, i) => (
                      <button
                        key={i}
                        onClick={() => handleSpeakWord(v.en)}
                        className="bg-white/15 hover:bg-white/25 active:scale-95 px-2 py-1 rounded-lg text-xs font-semibold text-white flex items-center gap-1 border border-white/20 transition-all cursor-pointer"
                        title={`Nghe phát âm: ${v.en} (${v.vi})`}
                      >
                        <span>{v.emoji || "✨"}</span>
                        <span className="font-bold text-yellow-300">{v.en}</span>
                        <span className="text-[10px] text-white/80">({v.vi})</span>
                        <Volume2 size={11} className="text-white/60 ml-0.5" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Scrollable Lyric Lines */}
              <div className="flex-1 overflow-y-auto scroll-area space-y-2.5 pr-1">
                {currentSong.lyrics.map((line, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-bold text-white leading-snug group-hover:text-amber-200 transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                        {line.text}
                      </p>
                      <button
                        onClick={() => handleSpeakLine(line.text)}
                        className="p-1 rounded-full bg-white/10 hover:bg-primary text-white shrink-0 active:scale-90 transition-all"
                        title="Nghe phát âm câu này"
                      >
                        <Volume2 size={13} />
                      </button>
                    </div>
                    {showTranslation && line.translation && (
                      <p className="text-xs text-amber-300/85 mt-1 font-medium italic">
                        {line.translation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Bottom Sheet for Lyrics (on small screens) */}
      <AnimatePresence>
        {showLyricsPanel && hasLyrics && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="md:hidden fixed inset-x-0 bottom-0 z-40 h-[65vh] bg-slate-950/95 backdrop-blur-2xl border-t border-white/20 rounded-t-3xl p-4 text-white shadow-2xl flex flex-col"
          >
            {/* Sheet Handle */}
            <div className="w-12 h-1.5 bg-white/30 rounded-full mx-auto mb-3 shrink-0" />

            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-1.5">
                <Sparkles size={16} className="text-amber-400" />
                <span className="font-bold text-sm text-amber-300" style={{ fontFamily: "var(--font-heading)" }}>
                  Lời Bài Hát & Từ Vựng
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowTranslation(!showTranslation)}
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 transition-colors ${
                    showTranslation
                      ? "bg-amber-400/20 text-amber-300 border-amber-400/40"
                      : "bg-white/10 text-white/60 border-white/20"
                  }`}
                >
                  <Languages size={11} />
                  <span>{showTranslation ? "Dịch: Bật" : "Dịch: Tắt"}</span>
                </button>
                <button
                  onClick={() => setShowLyricsPanel(false)}
                  className="p-1 text-white/60 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Key Vocab Chips */}
            {hasVocab && (
              <div className="my-2 shrink-0 bg-white/5 p-2 rounded-xl border border-white/10">
                <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto scroll-area">
                  {currentSong.keyVocab?.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => handleSpeakWord(v.en)}
                      className="bg-white/15 active:scale-95 px-2 py-0.5 rounded text-[11px] font-semibold text-white flex items-center gap-1 border border-white/20"
                    >
                      <span>{v.emoji || "✨"}</span>
                      <span className="font-bold text-yellow-300">{v.en}</span>
                      <span className="text-[10px] text-white/80">({v.vi})</span>
                      <Volume2 size={10} className="text-white/60" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Lyrics List */}
            <div className="flex-1 overflow-y-auto scroll-area space-y-2 pt-1 pb-6 pr-1">
              {currentSong.lyrics.map((line, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-start justify-between gap-2"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white leading-snug" style={{ fontFamily: "var(--font-heading)" }}>
                      {line.text}
                    </p>
                    {showTranslation && line.translation && (
                      <p className="text-xs text-amber-300/85 mt-0.5 italic">
                        {line.translation}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleSpeakLine(line.text)}
                    className="p-1.5 rounded-full bg-white/10 text-white shrink-0 active:scale-90"
                    title="Nghe phát âm"
                  >
                    <Volume2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Local Video Controls Overlay */}
      {currentSong.localVideo && (
        <div className="absolute bottom-0 inset-x-0 h-[25vh] z-20 flex items-end justify-between px-6 pb-6 pointer-events-none bg-gradient-to-t from-black/80 via-black/20 to-transparent">
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
    </motion.div>
  );
}
