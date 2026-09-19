"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/layout/BackButton";
import BottomNav from "@/components/layout/BottomNav";
import SafeVideoModal from "@/components/videos/SafeVideoModal";
import KaraokePlayer from "@/components/shared/KaraokePlayer";
import {
  educationalVideos,
  educationalChannels,
  educationalCategories,
  EducationalVideo,
} from "@/data/educationalVideos";
import { songsEn, songsVi, Song } from "@/data/songs";
import { useAppStore } from "@/stores/appStore";
import { playSFX } from "@/utils/soundEffects";
import {
  Search,
  Heart,
  Play,
  Clock,
  Sparkles,
  Music,
  Tv,
  X,
  ChevronRight,
  Flame,
  BookOpen,
} from "lucide-react";

type MainTab = "all" | "edu" | "sing_en" | "sing_vi" | "favorites";

function VideosContent() {
  const searchParams = useSearchParams();
  const initialTabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<MainTab>(() => {
    if (initialTabParam === "sing_en" || initialTabParam === "sing") return "sing_en";
    if (initialTabParam === "sing_vi") return "sing_vi";
    if (initialTabParam === "favorites") return "favorites";
    if (initialTabParam === "all") return "all";
    return "edu";
  });

  const { totalStars } = useAppStore();
  const [selectedChannel, setSelectedChannel] = useState("all");
  const [selectedEduCategory, setSelectedEduCategory] = useState("all");
  const [songEnTheme, setSongEnTheme] = useState("all");
  const [songViTheme, setSongViTheme] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeEduVideo, setActiveEduVideo] = useState<EducationalVideo | null>(null);
  const [activeSong, setActiveSong] = useState<Song | null>(null);

  // Sync tab if URL param changes
  useEffect(() => {
    if (initialTabParam === "sing_en" || initialTabParam === "sing") setActiveTab("sing_en");
    else if (initialTabParam === "sing_vi") setActiveTab("sing_vi");
    else if (initialTabParam === "favorites") setActiveTab("favorites");
    else if (initialTabParam === "all") setActiveTab("all");
    else setActiveTab("edu");
  }, [initialTabParam]);

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

  // Toggle favorite for both videos and songs
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

  // Main YouTube Kids categories definition - Danh mục Bé Học đặt đầu tiên
  const tabs = [
    {
      id: "edu" as MainTab,
      label: "Video Bé Học",
      emoji: "📺",
      badge: `${educationalVideos.length}`,
      color: "#06B6D4",
      bgGradient: "from-cyan-500 to-blue-500",
      activeShadow: "shadow-cyan-200",
    },
    {
      id: "all" as MainTab,
      label: "Tất Cả",
      emoji: "🌟",
      badge: `${educationalVideos.length + songsEn.length + songsVi.length}`,
      color: "#F59E0B",
      bgGradient: "from-amber-500 to-orange-500",
      activeShadow: "shadow-amber-200",
    },
    {
      id: "sing_en" as MainTab,
      label: "Hát Tiếng Anh",
      emoji: "🇬🇧",
      badge: `${songsEn.length}`,
      color: "#8B5CF6",
      bgGradient: "from-indigo-500 to-purple-500",
      activeShadow: "shadow-purple-200",
    },
    {
      id: "sing_vi" as MainTab,
      label: "Bài Hát Việt",
      emoji: "🇻🇳",
      badge: `${songsVi.length}`,
      color: "#EC4899",
      bgGradient: "from-rose-500 to-pink-500",
      activeShadow: "shadow-rose-200",
    },
    {
      id: "favorites" as MainTab,
      label: "Yêu Thích",
      emoji: "❤️",
      badge: `${favorites.length}`,
      color: "#EF4444",
      bgGradient: "from-red-500 to-rose-600",
      activeShadow: "shadow-red-200",
    },
  ];

  // Theme filters for English Songs
  const englishSongThemes = [
    { id: "all", label: "Tất cả bài hát", emoji: "🎶" },
    { id: "action", label: "Nhảy múa & Vui", emoji: "💃", keywords: ["happy", "dance", "shark", "bus", "monkey", "jump"] },
    { id: "animals", label: "Động vật đáng yêu", emoji: "🦁", keywords: ["macdonald", "sheep", "shark", "monkey", "spider", "bingo", "lamb", "duck"] },
    { id: "learning", label: "Chữ cái & Đếm số", emoji: "🔤", keywords: ["abc", "hickory", "monkey", "head"] },
    { id: "bedtime", label: "Giờ ngủ êm dịu", emoji: "🌙", keywords: ["twinkle", "boat", "hush", "sleep", "star"] },
  ];

  // Theme filters for Vietnamese Songs
  const vietnameseSongThemes = [
    { id: "all", label: "Tất cả bài hát", emoji: "🇻🇳" },
    { id: "family", label: "Gia đình & Mẹ", emoji: "👨‍👩‍👧", keywords: ["nha", "me", "ba", "chau"] },
    { id: "animals", label: "Con vật ngộ nghĩnh", emoji: "🦆", keywords: ["vit", "ech", "than lan", "meo", "ga", "ong", "co"] },
    { id: "folk", label: "Đồng dao & Vui vẻ", emoji: "🥁", keywords: ["bac kim thang", "bong bong", "qua gi", "trai dat"] },
  ];

  // Filtering Educational Videos
  const filteredEduVideos = useMemo(() => {
    return educationalVideos.filter((vid) => {
      if (selectedChannel !== "all") {
        const chan = educationalChannels.find((c) => c.id === selectedChannel);
        if (chan?.channelName && vid.channel !== chan.channelName) {
          return false;
        }
      }
      if (selectedEduCategory !== "all" && vid.category !== selectedEduCategory) {
        return false;
      }
      if (activeTab === "favorites" && !favorites.includes(vid.id)) {
        return false;
      }
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
  }, [selectedChannel, selectedEduCategory, activeTab, favorites, searchQuery]);

  // Filtering English Songs
  const filteredSongsEn = useMemo(() => {
    return songsEn.filter((song) => {
      if (activeTab === "favorites" && !favorites.includes(song.id)) {
        return false;
      }
      if (songEnTheme !== "all") {
        const themeObj = englishSongThemes.find((t) => t.id === songEnTheme);
        if (themeObj?.keywords) {
          const text = (song.id + " " + song.title).toLowerCase();
          const matchTheme = themeObj.keywords.some((kw) => text.includes(kw));
          if (!matchTheme) return false;
        }
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = song.title.toLowerCase().includes(q);
        const matchesVocab = song.keyVocab?.some(
          (v) => v.en.toLowerCase().includes(q) || v.vi.toLowerCase().includes(q)
        );
        const matchesLyric = song.lyrics.some((l) => l.text.toLowerCase().includes(q));
        return matchesTitle || matchesVocab || matchesLyric;
      }
      return true;
    });
  }, [activeTab, favorites, songEnTheme, searchQuery]);

  // Filtering Vietnamese Songs
  const filteredSongsVi = useMemo(() => {
    return songsVi.filter((song) => {
      if (activeTab === "favorites" && !favorites.includes(song.id)) {
        return false;
      }
      if (songViTheme !== "all") {
        const themeObj = vietnameseSongThemes.find((t) => t.id === songViTheme);
        if (themeObj?.keywords) {
          const text = (song.id + " " + song.title).toLowerCase();
          const matchTheme = themeObj.keywords.some((kw) => text.includes(kw));
          if (!matchTheme) return false;
        }
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = song.title.toLowerCase().includes(q);
        const matchesLyric = song.lyrics.some((l) => l.text.toLowerCase().includes(q));
        return matchesTitle || matchesLyric;
      }
      return true;
    });
  }, [activeTab, favorites, songViTheme, searchQuery]);

  // Total items matching in search mode
  const totalSearchResults =
    filteredEduVideos.length + filteredSongsEn.length + filteredSongsVi.length;

  return (
    <div className="min-h-dvh flex flex-col bg-[#F8FAFC]">
      {/* Active Educational Video Player Modal */}
      <AnimatePresence>
        {activeEduVideo && (
          <SafeVideoModal
            video={activeEduVideo}
            onClose={() => setActiveEduVideo(null)}
            isFavorite={favorites.includes(activeEduVideo.id)}
            onToggleFavorite={() => toggleFavorite(activeEduVideo.id)}
            onSelectVideo={(newVideo) => setActiveEduVideo(newVideo)}
          />
        )}
      </AnimatePresence>

      {/* Active Song Karaoke Player Modal */}
      <AnimatePresence>
        {activeSong && (
          <KaraokePlayer
            song={activeSong}
            onClose={() => setActiveSong(null)}
            isFavorite={favorites.includes(activeSong.id)}
            onToggleFavorite={() => toggleFavorite(activeSong.id)}
            onSelectSong={(newSong) => setActiveSong(newSong)}
          />
        )}
      </AnimatePresence>

      {/* Top Header Bar */}
      <div className="pt-3 sm:pt-4 pb-2 px-3 sm:px-6 relative z-10 max-w-6xl mx-auto w-full flex items-center justify-between">
        <BackButton label="Home" />

        {/* Brand center badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold border border-red-200 shadow-sm">
          <Play size={13} fill="#B91C1C" />
          <span>YouTube Kids • Không Quảng Cáo</span>
        </div>

        {/* Stars Counter */}
        <div className="glass-card px-3 py-1.5 text-sm font-bold flex items-center gap-1.5 shadow-sm border border-amber-200">
          <span>⭐</span>
          <span style={{ color: "var(--color-primary)", fontFamily: "var(--font-heading)" }}>
            {totalStars}
          </span>
        </div>
      </div>

      {/* Main YouTube Kids Visual Category Bar */}
      <div className="px-3 sm:px-6 max-w-6xl mx-auto w-full relative z-10 mb-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1.5 px-0.5 sm:flex-wrap">
          {tabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playSFX("tap");
                  setActiveTab(tab.id);
                }}
                className={`relative px-3.5 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-2xl sm:rounded-3xl flex items-center gap-2 sm:gap-2.5 shrink-0 transition-all font-bold cursor-pointer border ${
                  isSelected
                    ? `bg-gradient-to-r ${tab.bgGradient} text-white shadow-lg ${tab.activeShadow} scale-105 border-transparent`
                    : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200/80 shadow-sm"
                }`}
              >
                <span className="text-lg sm:text-2xl md:text-3xl drop-shadow-sm">{tab.emoji}</span>
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-xs sm:text-sm md:text-base font-extrabold whitespace-nowrap" style={{ fontFamily: "var(--font-heading)" }}>
                    {tab.label}
                  </span>
                </div>
                <span
                  className={`text-[10px] sm:text-xs md:text-sm font-black px-1.5 sm:px-2 py-0.5 rounded-full ${
                    isSelected ? "bg-white/30 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {tab.badge}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="mt-2.5 relative">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm bài học, bài hát, nhân vật (Ms Rachel, Baby Shark, Con heo đất, ABC...)"
            className="w-full pl-9 pr-9 py-2 rounded-2xl bg-white border border-gray-200 text-xs sm:text-sm text-slate-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Sub-Filters: Channels & Categories for Educational Videos */}
        {activeTab === "edu" && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 space-y-2.5"
          >
            {/* Channels Tray: Big Chunky Character Avatar Cards (YouTube Kids style) */}
            <div className="relative">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1.5 px-0.5 scroll-smooth">
                {educationalChannels.map((chan) => {
                  const isSelected = selectedChannel === chan.id;
                  const videoCount =
                    chan.id === "all"
                      ? educationalVideos.length
                      : educationalVideos.filter((v) => v.channel === chan.channelName).length;

                  return (
                    <motion.button
                      key={chan.id}
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => {
                        playSFX("tap");
                        setSelectedChannel(chan.id);
                      }}
                      className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl shrink-0 transition-all font-bold cursor-pointer border shadow-sm ${
                        isSelected
                          ? "bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-cyan-400 scale-102"
                          : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200/90 hover:border-cyan-300"
                      }`}
                    >
                      {/* Chunky Colorful Emoji Circle */}
                      <div
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-lg sm:text-xl shrink-0 shadow-inner ${
                          isSelected ? "bg-white/20 text-white" : ""
                        }`}
                        style={{
                          backgroundColor: isSelected ? undefined : `${chan.color || "#06b6d4"}18`,
                          color: isSelected ? "#fff" : chan.color,
                        }}
                      >
                        {chan.emoji}
                      </div>

                      {/* Channel Name & Video Count Badge */}
                      <div className="flex flex-col items-start text-left leading-tight">
                        <span
                          className="text-xs sm:text-sm font-black whitespace-nowrap"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {chan.name}
                        </span>
                        <span
                          className={`text-[10px] font-bold ${
                            isSelected ? "text-cyan-300" : "text-gray-400"
                          }`}
                        >
                          {videoCount} bài
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Subject Category Chips: Cute, Large Rounded-Full Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 px-0.5 scroll-smooth">
              {educationalCategories.map((cat) => {
                const isSelected = selectedEduCategory === cat.id;
                return (
                  <motion.button
                    key={cat.id}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => {
                      playSFX("tap");
                      setSelectedEduCategory(cat.id);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 shrink-0 transition-all border ${
                      isSelected
                        ? "bg-cyan-500 text-white border-cyan-500 shadow-md shadow-cyan-500/30 scale-102"
                        : "bg-white text-slate-700 hover:bg-cyan-50/70 border-slate-200 shadow-sm"
                    }`}
                  >
                    <span className="text-base">{cat.emoji}</span>
                    <span>{cat.name}</span>
                  </motion.button>
                );
              })}

              {/* Reset Filter Button */}
              {(selectedChannel !== "all" || selectedEduCategory !== "all") && (
                <motion.button
                  whileTap={{ scale: 0.94 }}
                  onClick={() => {
                    playSFX("pop");
                    setSelectedChannel("all");
                    setSelectedEduCategory("all");
                  }}
                  className="px-2.5 py-1.5 rounded-full text-xs font-bold text-rose-500 bg-rose-50 hover:bg-rose-100 border border-rose-200 whitespace-nowrap flex items-center gap-1 shrink-0 transition-all cursor-pointer"
                >
                  <X size={13} />
                  <span>Xem tất cả</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* Sub-Filters: Themes for English Songs */}
        {activeTab === "sing_en" && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar py-1.5 px-0.5 scroll-smooth"
          >
            {englishSongThemes.map((theme) => {
              const isSelected = songEnTheme === theme.id;
              return (
                <motion.button
                  key={theme.id}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => {
                    playSFX("tap");
                    setSongEnTheme(theme.id);
                  }}
                  className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap flex items-center gap-2 shrink-0 transition-all border ${
                    isSelected
                      ? "bg-indigo-600 text-white border-indigo-700 shadow-md shadow-indigo-500/30 scale-102"
                      : "bg-white text-gray-700 hover:bg-indigo-50 border-gray-200 shadow-sm"
                  }`}
                >
                  <span className="text-lg">{theme.emoji}</span>
                  <span>{theme.label}</span>
                </motion.button>
              );
            })}
          </motion.div>
        )}

        {/* Sub-Filters: Themes for Vietnamese Songs */}
        {activeTab === "sing_vi" && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar py-1.5 px-0.5 scroll-smooth"
          >
            {vietnameseSongThemes.map((theme) => {
              const isSelected = songViTheme === theme.id;
              return (
                <motion.button
                  key={theme.id}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => {
                    playSFX("tap");
                    setSongViTheme(theme.id);
                  }}
                  className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap flex items-center gap-2 shrink-0 transition-all border ${
                    isSelected
                      ? "bg-rose-500 text-white border-rose-600 shadow-md shadow-rose-500/30 scale-102"
                      : "bg-white text-gray-700 hover:bg-rose-50 border-gray-200 shadow-sm"
                  }`}
                >
                  <span className="text-lg">{theme.emoji}</span>
                  <span>{theme.label}</span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 px-3 sm:px-6 pb-24 lg:pb-16 scroll-area relative z-10 max-w-6xl mx-auto w-full">
        {/* Search Result View (when query is active) */}
        {searchQuery.trim() ? (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">
                Tìm thấy <strong className="text-primary">{totalSearchResults}</strong> kết quả cho "{searchQuery}"
              </span>
            </div>

            {totalSearchResults === 0 ? (
              <div className="text-center py-16">
                <span className="text-5xl block mb-2">🔍</span>
                <p className="font-bold text-base text-gray-700">Không tìm thấy nội dung phù hợp</p>
                <p className="text-xs text-gray-500 mt-1">Bé thử tìm với từ khóa khác như "shark", "con vịt", "rachel" nhé!</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-md"
                >
                  Xóa tìm kiếm
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Educational search matches */}
                {filteredEduVideos.length > 0 && (
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-800 mb-2 flex items-center gap-1.5" style={{ fontFamily: "var(--font-heading)" }}>
                      <span>📺 Video Mầm Non</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-700 font-bold">{filteredEduVideos.length}</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredEduVideos.map((vid) => (
                        <EduVideoCard
                          key={vid.id}
                          video={vid}
                          isFavorite={favorites.includes(vid.id)}
                          onToggleFavorite={() => toggleFavorite(vid.id)}
                          onSelect={() => setActiveEduVideo(vid)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* English song matches */}
                {filteredSongsEn.length > 0 && (
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-800 mb-2 flex items-center gap-1.5" style={{ fontFamily: "var(--font-heading)" }}>
                      <span>🇬🇧 Hát Tiếng Anh</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-bold">{filteredSongsEn.length}</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredSongsEn.map((song) => (
                        <SongVideoCard
                          key={song.id}
                          song={song}
                          langLabel="🇬🇧 Tiếng Anh"
                          isFavorite={favorites.includes(song.id)}
                          onToggleFavorite={() => toggleFavorite(song.id)}
                          onSelect={() => setActiveSong(song)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Vietnamese song matches */}
                {filteredSongsVi.length > 0 && (
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-800 mb-2 flex items-center gap-1.5" style={{ fontFamily: "var(--font-heading)" }}>
                      <span>🇻🇳 Bài Hát Việt</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold">{filteredSongsVi.length}</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredSongsVi.map((song) => (
                        <SongVideoCard
                          key={song.id}
                          song={song}
                          langLabel="🇻🇳 Tiếng Việt"
                          isFavorite={favorites.includes(song.id)}
                          onToggleFavorite={() => toggleFavorite(song.id)}
                          onSelect={() => setActiveSong(song)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* TAB: TẤT CẢ (Discovery Feed phong cách YouTube Kids) */}
            {activeTab === "all" && (
              <div className="space-y-6">
                {/* Section 1: Video Kênh Mầm Non */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-cyan-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                        📺
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-extrabold text-slate-800 leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                          Video Mầm Non Nổi Bật
                        </h2>
                        <p className="text-[11px] text-gray-500">Ms Rachel, Caitie & Kênh quốc tế</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        playSFX("tap");
                        setActiveTab("edu");
                      }}
                      className="text-xs font-bold text-cyan-600 hover:text-cyan-700 flex items-center gap-0.5 bg-cyan-50 hover:bg-cyan-100 px-3 py-1.5 rounded-xl transition-all"
                    >
                      <span>Xem tất cả</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {educationalVideos.slice(0, 3).map((vid) => (
                      <EduVideoCard
                        key={vid.id}
                        video={vid}
                        isFavorite={favorites.includes(vid.id)}
                        onToggleFavorite={() => toggleFavorite(vid.id)}
                        onSelect={() => setActiveEduVideo(vid)}
                      />
                    ))}
                  </div>
                </div>

                {/* Section Safari: Động Vật Hoang Dã Thực Tế 4K */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                        🦁
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-extrabold text-slate-800 leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                          Safari Động Vật Hoang Dã 4K
                        </h2>
                        <p className="text-[11px] text-amber-700 font-medium">Động vật thực tế ngoài đời • Âm thanh thiên nhiên • Không thuyết minh</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        playSFX("tap");
                        setSelectedChannel("wild-safari");
                        setActiveTab("edu");
                      }}
                      className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-0.5 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl transition-all border border-amber-200"
                    >
                      <span>Xem cả {educationalVideos.filter((v) => v.channel === "Wild Safari").length} video</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {educationalVideos
                      .filter((v) => v.channel === "Wild Safari")
                      .slice(0, 3)
                      .map((vid) => (
                        <EduVideoCard
                          key={vid.id}
                          video={vid}
                          isFavorite={favorites.includes(vid.id)}
                          onToggleFavorite={() => toggleFavorite(vid.id)}
                          onSelect={() => setActiveEduVideo(vid)}
                        />
                      ))}
                  </div>
                </div>

                {/* Section 2: Hát Tiếng Anh */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-indigo-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                        🇬🇧
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-extrabold text-slate-800 leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                          Bài Hát Tiếng Anh Vui Nhộn
                        </h2>
                        <p className="text-[11px] text-gray-500">29 ca khúc có lời & hát karaoke</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        playSFX("tap");
                        setActiveTab("sing_en");
                      }}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-0.5 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl transition-all"
                    >
                      <span>Xem tất cả</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {songsEn.slice(0, 3).map((song) => (
                      <SongVideoCard
                        key={song.id}
                        song={song}
                        langLabel="🇬🇧 Tiếng Anh"
                        isFavorite={favorites.includes(song.id)}
                        onToggleFavorite={() => toggleFavorite(song.id)}
                        onSelect={() => setActiveSong(song)}
                      />
                    ))}
                  </div>
                </div>

                {/* Section 3: Bài Hát Việt */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                        🇻🇳
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-extrabold text-slate-800 leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                          Giai Điệu Thiếu Nhi Quen Thuộc
                        </h2>
                        <p className="text-[11px] text-gray-500">Bắc kim thang, Con heo đất, Chú ếch con</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        playSFX("tap");
                        setActiveTab("sing_vi");
                      }}
                      className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-0.5 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl transition-all"
                    >
                      <span>Xem tất cả</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {songsVi.slice(0, 3).map((song) => (
                      <SongVideoCard
                        key={song.id}
                        song={song}
                        langLabel="🇻🇳 Tiếng Việt"
                        isFavorite={favorites.includes(song.id)}
                        onToggleFavorite={() => toggleFavorite(song.id)}
                        onSelect={() => setActiveSong(song)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: VIDEO BÉ HỌC */}
            {activeTab === "edu" && (
              <div>
                {filteredEduVideos.length === 0 ? (
                  <div className="text-center py-16">
                    <span className="text-5xl block mb-2">🔍</span>
                    <p className="font-bold text-base text-gray-700">Không có video phù hợp bộ lọc</p>
                    <button
                      onClick={() => {
                        setSelectedChannel("all");
                        setSelectedEduCategory("all");
                      }}
                      className="mt-3 px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold shadow-md"
                    >
                      Xem tất cả video học
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredEduVideos.map((video) => (
                      <EduVideoCard
                        key={video.id}
                        video={video}
                        isFavorite={favorites.includes(video.id)}
                        onToggleFavorite={() => toggleFavorite(video.id)}
                        onSelect={() => setActiveEduVideo(video)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: HÁT TIẾNG ANH */}
            {activeTab === "sing_en" && (
              <div>
                {filteredSongsEn.length === 0 ? (
                  <div className="text-center py-16">
                    <span className="text-5xl block mb-2">🎶</span>
                    <p className="font-bold text-base text-gray-700">Không có bài hát phù hợp</p>
                    <button
                      onClick={() => setSongEnTheme("all")}
                      className="mt-3 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md"
                    >
                      Xem tất cả bài hát tiếng Anh
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredSongsEn.map((song) => (
                      <SongVideoCard
                        key={song.id}
                        song={song}
                        langLabel="🇬🇧 Tiếng Anh"
                        isFavorite={favorites.includes(song.id)}
                        onToggleFavorite={() => toggleFavorite(song.id)}
                        onSelect={() => setActiveSong(song)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: BÀI HÁT VIỆT */}
            {activeTab === "sing_vi" && (
              <div>
                {filteredSongsVi.length === 0 ? (
                  <div className="text-center py-16">
                    <span className="text-5xl block mb-2">🎵</span>
                    <p className="font-bold text-base text-gray-700">Không có bài hát phù hợp</p>
                    <button
                      onClick={() => setSongViTheme("all")}
                      className="mt-3 px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-md"
                    >
                      Xem tất cả bài hát Việt
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredSongsVi.map((song) => (
                      <SongVideoCard
                        key={song.id}
                        song={song}
                        langLabel="🇻🇳 Tiếng Việt"
                        isFavorite={favorites.includes(song.id)}
                        onToggleFavorite={() => toggleFavorite(song.id)}
                        onSelect={() => setActiveSong(song)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: YÊU THÍCH */}
            {activeTab === "favorites" && (
              <div>
                {favorites.length === 0 ? (
                  <div className="text-center py-16 text-slate-500">
                    <span className="text-6xl block mb-3">❤️</span>
                    <h3 className="font-extrabold text-lg text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>
                      Bé chưa lưu video hoặc bài hát nào
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                      Bấm vào biểu tượng trái tim ❤️ ở bất kỳ video hay bài hát nào để lưu vào đây nhé!
                    </p>
                    <button
                      onClick={() => setActiveTab("all")}
                      className="mt-4 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-bold shadow-md hover:scale-105 transition-transform"
                    >
                      Khám phá nội dung ngay
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Saved Educational Videos */}
                    {filteredEduVideos.length > 0 && (
                      <div>
                        <h3 className="font-extrabold text-sm sm:text-base text-slate-800 mb-2 flex items-center gap-1.5" style={{ fontFamily: "var(--font-heading)" }}>
                          <span>📺 Video Mầm Non Yêu Thích</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600 font-bold">{filteredEduVideos.length}</span>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {filteredEduVideos.map((vid) => (
                            <EduVideoCard
                              key={vid.id}
                              video={vid}
                              isFavorite={true}
                              onToggleFavorite={() => toggleFavorite(vid.id)}
                              onSelect={() => setActiveEduVideo(vid)}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Saved English Songs */}
                    {filteredSongsEn.length > 0 && (
                      <div>
                        <h3 className="font-extrabold text-sm sm:text-base text-slate-800 mb-2 flex items-center gap-1.5" style={{ fontFamily: "var(--font-heading)" }}>
                          <span>🇬🇧 Bài Hát Tiếng Anh Yêu Thích</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600 font-bold">{filteredSongsEn.length}</span>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {filteredSongsEn.map((song) => (
                            <SongVideoCard
                              key={song.id}
                              song={song}
                              langLabel="🇬🇧 Tiếng Anh"
                              isFavorite={true}
                              onToggleFavorite={() => toggleFavorite(song.id)}
                              onSelect={() => setActiveSong(song)}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Saved Vietnamese Songs */}
                    {filteredSongsVi.length > 0 && (
                      <div>
                        <h3 className="font-extrabold text-sm sm:text-base text-slate-800 mb-2 flex items-center gap-1.5" style={{ fontFamily: "var(--font-heading)" }}>
                          <span>🇻🇳 Bài Hát Việt Yêu Thích</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600 font-bold">{filteredSongsVi.length}</span>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {filteredSongsVi.map((song) => (
                            <SongVideoCard
                              key={song.id}
                              song={song}
                              langLabel="🇻🇳 Tiếng Việt"
                              isFavorite={true}
                              onToggleFavorite={() => toggleFavorite(song.id)}
                              onSelect={() => setActiveSong(song)}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {!activeEduVideo && !activeSong && <BottomNav />}
    </div>
  );
}

// Educational Video Card Component
function EduVideoCard({
  video,
  isFavorite,
  onToggleFavorite,
  onSelect,
}: {
  video: EducationalVideo;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onSelect: () => void;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      className="glass-card p-3 sm:p-4 flex flex-col justify-between hover:border-cyan-300 transition-all group shadow-md hover:shadow-xl rounded-3xl relative overflow-hidden bg-white/95"
    >
      <div>
        {/* Card Top: Channel & Favorite */}
        <div className="flex items-center justify-between gap-2 mb-2">
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
                onToggleFavorite();
              }}
              className="p-1 rounded-full text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
              title="Lưu yêu thích"
            >
              <Heart
                size={16}
                fill={isFavorite ? "#EF4444" : "none"}
                className={isFavorite ? "text-red-500" : ""}
              />
            </button>
          </div>
        </div>

        {/* Video Thumbnail Preview */}
        <div
          onClick={() => {
            playSFX("tap");
            onSelect();
          }}
          className="relative h-36 sm:h-40 rounded-2xl overflow-hidden cursor-pointer group-hover:scale-[1.01] transition-transform flex flex-col justify-between p-3 shadow-inner"
          style={{
            background: `linear-gradient(135deg, ${video.channelColor || "#0ea5e9"}dd, #0f172a)`
          }}
        >
          {!imgFailed && (
            <img
              src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
              alt={video.title}
              onError={() => setImgFailed(true)}
              className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-95 transition-opacity"
              loading="lazy"
            />
          )}

          {imgFailed && (
            <div className="absolute inset-0 flex items-center justify-center opacity-25 select-none pointer-events-none">
              <span className="text-7xl">{video.channelAvatar || "📺"}</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

          {/* Top Badges */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[10px] font-bold text-white px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 flex items-center gap-1">
              <span>{video.categoryEmoji}</span>
              <span>{video.categoryNameVi}</span>
            </span>

            <span className="text-[10px] font-semibold text-white px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md flex items-center gap-1">
              <Clock size={11} />
              <span>{video.duration}</span>
            </span>
          </div>

          {/* Center Play Button */}
          <div className="relative z-10 self-center my-auto">
            <div className="w-12 h-12 rounded-full bg-cyan-500 text-white flex items-center justify-center shadow-[0_0_18px_rgba(6,182,212,0.6)] group-hover:scale-110 transition-transform">
              <Play size={20} fill="white" className="ml-1" />
            </div>
          </div>

          {/* Bottom Badges */}
          <div className="relative z-10 flex items-center justify-between text-white/90 text-[10px]">
            <span className="font-bold text-yellow-300 flex items-center gap-1">
              <Sparkles size={11} />
              Nhận +5 ⭐
            </span>
            <span className="font-bold bg-white/20 px-2 py-0.5 rounded-md backdrop-blur-md">
              Xem an toàn ›
            </span>
          </div>
        </div>

        {/* Video Title */}
        <h3
          onClick={() => {
            playSFX("tap");
            onSelect();
          }}
          className="font-bold text-xs sm:text-sm text-slate-800 mt-2.5 leading-snug line-clamp-2 cursor-pointer hover:text-cyan-600 transition-colors"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {video.title}
        </h3>
      </div>

      {/* Vocab preview */}
      <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between gap-1">
        <div className="flex items-center gap-1 overflow-hidden min-w-0">
          <span className="text-[10px] font-bold text-gray-500 shrink-0">Học từ:</span>
          <div className="flex items-center gap-1 truncate">
            {video.keyVocab.slice(0, 2).map((v, i) => (
              <span
                key={i}
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-cyan-50 text-cyan-700 border border-cyan-100"
              >
                {v.en}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            playSFX("tap");
            onSelect();
          }}
          className="text-xs font-extrabold text-cyan-600 hover:text-cyan-700 shrink-0 flex items-center"
        >
          <span>Học ngay ›</span>
        </button>
      </div>
    </motion.div>
  );
}

// Song Video Card Component (for English & Vietnamese songs)
function SongVideoCard({
  song,
  langLabel,
  isFavorite,
  onToggleFavorite,
  onSelect,
}: {
  song: Song;
  langLabel: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onSelect: () => void;
}) {
  const thumbUrl = song.youtubeId
    ? `https://img.youtube.com/vi/${song.youtubeId}/hqdefault.jpg`
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      className="glass-card p-3 sm:p-4 flex flex-col justify-between hover:border-purple-300 transition-all group shadow-md hover:shadow-xl rounded-3xl relative overflow-hidden bg-white/95"
    >
      <div>
        {/* Card Top: Song Category & Favorite */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-xl shrink-0">{song.emoji}</span>
            <span className="font-bold text-xs text-slate-700 truncate" style={{ fontFamily: "var(--font-heading)" }}>
              {langLabel}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1">
              <Music size={10} />
              <span>Karaoke</span>
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                playSFX("tap");
                onToggleFavorite();
              }}
              className="p-1 rounded-full text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
              title="Lưu yêu thích"
            >
              <Heart
                size={16}
                fill={isFavorite ? "#EF4444" : "none"}
                className={isFavorite ? "text-red-500" : ""}
              />
            </button>
          </div>
        </div>

        {/* Video Thumbnail Preview */}
        <div
          onClick={() => {
            playSFX("tap");
            onSelect();
          }}
          className="relative h-36 sm:h-40 rounded-2xl overflow-hidden cursor-pointer group-hover:scale-[1.01] transition-transform bg-slate-900 flex flex-col justify-between p-3 shadow-inner"
        >
          {thumbUrl ? (
            <img
              src={thumbUrl}
              alt={song.title}
              className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-95 transition-opacity"
              loading="lazy"
            />
          ) : (
            <div
              className="absolute inset-0 opacity-80"
              style={{ background: song.color || "#8B5CF6" }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

          {/* Top Badges */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[10px] font-bold text-white px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 flex items-center gap-1">
              <span>🎵</span>
              <span>Có Lyric & Lời dịch</span>
            </span>

            <span className="text-[10px] font-semibold text-white px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md flex items-center gap-1">
              <span>{song.lyrics.length} câu</span>
            </span>
          </div>

          {/* Center Play Button */}
          <div className="relative z-10 self-center my-auto">
            <div
              className="w-12 h-12 rounded-full text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg"
              style={{ backgroundColor: song.color || "#A855F7" }}
            >
              <Play size={20} fill="white" className="ml-1" />
            </div>
          </div>

          {/* Bottom Badges */}
          <div className="relative z-10 flex items-center justify-between text-white/90 text-[10px]">
            <span className="font-bold text-yellow-300 flex items-center gap-1">
              <Sparkles size={11} />
              Nhận +5 ⭐
            </span>
            <span className="font-bold bg-white/20 px-2 py-0.5 rounded-md backdrop-blur-md">
              Hát cùng bé ›
            </span>
          </div>
        </div>

        {/* Song Title */}
        <h3
          onClick={() => {
            playSFX("tap");
            onSelect();
          }}
          className="font-bold text-xs sm:text-sm text-slate-800 mt-2.5 leading-snug line-clamp-2 cursor-pointer hover:text-purple-600 transition-colors"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {song.title}
        </h3>
      </div>

      {/* Lyric / Vocab snippet */}
      <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between gap-1">
        <div className="flex items-center gap-1 overflow-hidden min-w-0">
          {song.keyVocab && song.keyVocab.length > 0 ? (
            <div className="flex items-center gap-1 truncate">
              <span className="text-[10px] font-bold text-gray-500 shrink-0">Từ học:</span>
              {song.keyVocab.slice(0, 2).map((v, i) => (
                <span
                  key={i}
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-100"
                >
                  {v.en}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-[10px] text-gray-500 italic truncate">
              "{song.lyrics[0]?.text || "Bấm để hát karaoke"}"
            </p>
          )}
        </div>

        <button
          onClick={() => {
            playSFX("tap");
            onSelect();
          }}
          className="text-xs font-extrabold text-purple-600 hover:text-purple-700 shrink-0 flex items-center"
        >
          <span>Hát ngay ›</span>
        </button>
      </div>
    </motion.div>
  );
}

export default function VideosPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-dvh flex items-center justify-center bg-[#F8FAFC]">
          <div className="text-center">
            <span className="text-4xl animate-bounce block">📺</span>
            <p className="text-xs text-slate-500 mt-2 font-bold">Đang mở Kênh YouTube Kids...</p>
          </div>
        </div>
      }
    >
      <VideosContent />
    </Suspense>
  );
}
