"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/layout/BackButton";
import BottomNav from "@/components/layout/BottomNav";
import SafeVideoModal from "@/components/videos/SafeVideoModal";
import {
  educationalVideos,
  educationalChannels,
  educationalCategories,
  EducationalVideo,
} from "@/data/educationalVideos";
import { useAppStore } from "@/stores/appStore";
import { playSFX } from "@/utils/soundEffects";
import { Search, Heart, Play, Clock, Sparkles, Filter, CheckCircle2 } from "lucide-react";

export default function VideosPage() {
  const { totalStars } = useAppStore();
  const [selectedChannel, setSelectedChannel] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeVideo, setActiveVideo] = useState<EducationalVideo | null>(null);

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("jbaikid_favorite_videos");
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      try {
        localStorage.setItem("jbaikid_favorite_videos", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Filtered videos
  const filteredVideos = useMemo(() => {
    return educationalVideos.filter((vid) => {
      // Channel match
      if (selectedChannel !== "all") {
        const chan = educationalChannels.find((c) => c.id === selectedChannel);
        if (chan?.channelName && vid.channel !== chan.channelName) {
          return false;
        }
      }

      // Category match
      if (selectedCategory !== "all" && vid.category !== selectedCategory) {
        return false;
      }

      // Favorites filter
      if (onlyFavorites && !favorites.includes(vid.id)) {
        return false;
      }

      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = vid.title.toLowerCase().includes(q);
        const matchesChannel = vid.channel.toLowerCase().includes(q);
        const matchesVocab = vid.keyVocab.some(
          (v) => v.en.toLowerCase().includes(q) || v.vi.toLowerCase().includes(q)
        );
        return matchesTitle || matchesChannel || matchesVocab;
      }

      return true;
    });
  }, [selectedChannel, selectedCategory, searchQuery, onlyFavorites, favorites]);

  return (
    <div className="min-h-dvh flex flex-col">
      {/* Active Video Player Modal */}
      <AnimatePresence>
        {activeVideo && (
          <SafeVideoModal
            video={activeVideo}
            onClose={() => setActiveVideo(null)}
            isFavorite={favorites.includes(activeVideo.id)}
            onToggleFavorite={() => toggleFavorite(activeVideo.id)}
          />
        )}
      </AnimatePresence>

      {/* Top Header Bar */}
      <div className="pt-3 sm:pt-5 pb-2 px-4 sm:px-6 relative z-10 max-w-6xl mx-auto w-full flex items-center justify-between">
        <BackButton label="Home" />

        {/* Stars Counter */}
        <div className="glass-card px-3 py-1.5 text-sm font-bold flex items-center gap-1.5 shadow-sm border border-amber-200">
          <span>⭐</span>
          <span style={{ color: "var(--color-primary)", fontFamily: "var(--font-heading)" }}>
            {totalStars}
          </span>
        </div>
      </div>

      {/* Title & Introduction */}
      <div className="px-4 sm:px-6 text-center max-w-4xl mx-auto w-full relative z-10 mb-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100/80 text-cyan-800 text-xs font-bold mb-1 border border-cyan-200 shadow-sm">
            <Sparkles size={13} className="text-cyan-600" />
            <span>100% An Toàn • Không Quảng Cáo • Chuẩn Giáo Dục</span>
          </div>

          <h1
            className="text-2xl sm:text-3xl font-extrabold text-slate-800"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            📺 Video Kênh Học Mầm Non
          </h1>
          <p className="text-xs sm:text-sm text-text-light mt-0.5">
            Tuyển chọn Ms Rachel, Caitie, Numberblocks & kênh tinh hoa thế giới cho bé!
          </p>
        </motion.div>
      </div>

      {/* Search & Filter Bar */}
      <div className="px-4 sm:px-6 max-w-6xl mx-auto w-full relative z-10 mb-3 space-y-2.5">
        {/* Search Input & Favorite Quick Button */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo bài học, từ vựng hoặc kênh (Ms Rachel, Phonics...)"
              className="w-full pl-9 pr-4 py-2 rounded-2xl bg-white/80 border border-gray-200 text-xs sm:text-sm text-slate-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 backdrop-blur-md shadow-sm"
            />
          </div>

          {/* Favorites Filter Tab */}
          <button
            onClick={() => {
              playSFX("tap");
              setOnlyFavorites(!onlyFavorites);
            }}
            className={`px-3 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-sm border ${
              onlyFavorites
                ? "bg-red-500 text-white border-red-600 shadow-red-200"
                : "bg-white/80 text-gray-700 hover:text-red-500 border-gray-200"
            }`}
          >
            <Heart size={15} fill={onlyFavorites ? "white" : "none"} />
            <span className="hidden sm:inline">Yêu thích</span>
            {favorites.length > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                onlyFavorites ? "bg-white/30 text-white" : "bg-red-100 text-red-600"
              }`}>
                {favorites.length}
              </span>
            )}
          </button>
        </div>

        {/* Channel Horizontal Scroller */}
        <div className="flex items-center gap-2 overflow-x-auto scroll-area pb-1 pt-0.5">
          {educationalChannels.map((chan) => {
            const isSelected = selectedChannel === chan.id;
            return (
              <button
                key={chan.id}
                onClick={() => {
                  playSFX("tap");
                  setSelectedChannel(chan.id);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 shrink-0 transition-all border shadow-sm ${
                  isSelected
                    ? "bg-slate-900 text-white border-slate-950 shadow-md scale-105"
                    : "bg-white/80 text-gray-700 hover:bg-white border-gray-200"
                }`}
              >
                <span>{chan.emoji}</span>
                <span>{chan.name}</span>
              </button>
            );
          })}
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto scroll-area pb-1">
          {educationalCategories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  playSFX("tap");
                  setSelectedCategory(cat.id);
                }}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold whitespace-nowrap flex items-center gap-1 shrink-0 transition-all ${
                  isSelected
                    ? "bg-cyan-500 text-white shadow-sm"
                    : "bg-white/60 text-gray-600 hover:bg-white/90 border border-gray-200/60"
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Video Cards Grid */}
      <div className="flex-1 px-4 sm:px-6 pb-24 lg:pb-16 scroll-area relative z-10 max-w-6xl mx-auto w-full">
        {filteredVideos.length === 0 ? (
          <div className="text-center py-16 text-text-light">
            <span className="text-5xl block mb-2">🔍</span>
            <p className="font-bold text-base text-gray-700">Không tìm thấy video phù hợp</p>
            <p className="text-xs text-gray-500 mt-1">Bé thử chọn kênh khác hoặc xóa từ khóa tìm kiếm nhé!</p>
            <button
              onClick={() => {
                setSelectedChannel("all");
                setSelectedCategory("all");
                setSearchQuery("");
                setOnlyFavorites(false);
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-md"
            >
              Xem tất cả video
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVideos.map((video, idx) => {
              const isFav = favorites.includes(video.id);

              return (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(idx * 0.05, 0.3), type: "spring", stiffness: 300 }}
                  className="glass-card p-4 flex flex-col justify-between hover:border-cyan-300 transition-all group shadow-md hover:shadow-xl rounded-3xl relative overflow-hidden bg-white/90"
                >
                  {/* Card Top: Channel & Favorite */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-xl shrink-0">{video.channelAvatar}</span>
                        <span className="font-bold text-xs text-slate-700 truncate" style={{ fontFamily: "var(--font-heading)" }}>
                          {video.channel}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                          {video.recommendedAge}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            playSFX("tap");
                            toggleFavorite(video.id);
                          }}
                          className="p-1 rounded-full text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                          title="Lưu yêu thích"
                        >
                          <Heart
                            size={16}
                            fill={isFav ? "#EF4444" : "none"}
                            className={isFav ? "text-red-500" : ""}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Video Visual Poster / Thumbnail Preview Card */}
                    <div
                      onClick={() => {
                        playSFX("tap");
                        setActiveVideo(video);
                      }}
                      className="relative h-40 sm:h-44 rounded-2xl overflow-hidden cursor-pointer group-hover:scale-[1.02] transition-transform bg-gradient-to-br from-slate-800 to-slate-950 flex flex-col justify-between p-3.5 shadow-inner"
                    >
                      {/* Background Image / Thumbnail from YouTube */}
                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                        alt={video.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity"
                        loading="lazy"
                      />

                      {/* Dark overlay for contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

                      {/* Top Badges */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-white px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 flex items-center gap-1">
                          <span>{video.categoryEmoji}</span>
                          <span>{video.categoryNameVi}</span>
                        </span>

                        <span className="text-[11px] font-semibold text-white px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md flex items-center gap-1">
                          <Clock size={11} />
                          <span>{video.duration}</span>
                        </span>
                      </div>

                      {/* Center Play Button */}
                      <div className="relative z-10 self-center my-auto">
                        <div className="w-14 h-14 rounded-full bg-cyan-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.6)] group-hover:scale-115 transition-transform">
                          <Play size={24} fill="white" className="ml-1" />
                        </div>
                      </div>

                      {/* Bottom Quick Info */}
                      <div className="relative z-10 flex items-center justify-between text-white/90 text-xs">
                        <span className="text-[11px] font-bold text-yellow-300 flex items-center gap-1">
                          <Sparkles size={12} />
                          Nhận +5 ⭐ khi học
                        </span>
                        <span className="text-[11px] font-bold bg-white/20 px-2 py-0.5 rounded-md backdrop-blur-md">
                          Xem an toàn ›
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => {
                        playSFX("tap");
                        setActiveVideo(video);
                      }}
                      className="font-bold text-sm sm:text-base text-slate-800 mt-3 leading-snug line-clamp-2 cursor-pointer hover:text-cyan-600 transition-colors"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {video.title}
                    </h3>
                  </div>

                  {/* Card Bottom: Key Vocab Preview */}
                  <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 overflow-hidden min-w-0">
                      <span className="text-[11px] font-bold text-gray-500 shrink-0">Từ học:</span>
                      <div className="flex items-center gap-1 truncate">
                        {video.keyVocab.slice(0, 3).map((v, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-bold px-1.5 py-0.5 rounded-md bg-cyan-50 text-cyan-700 border border-cyan-100"
                          >
                            {v.en}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        playSFX("tap");
                        setActiveVideo(video);
                      }}
                      className="text-xs font-extrabold text-cyan-600 hover:text-cyan-700 shrink-0 flex items-center gap-0.5"
                    >
                      <span>Học ngay</span>
                      <span>›</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
