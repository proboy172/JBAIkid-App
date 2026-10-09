"use client";

import { useState, useMemo, useEffect, useCallback, Suspense, memo } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/layout/BackButton";
import BottomNav from "@/components/layout/BottomNav";
import SafeVideoModal from "@/components/videos/SafeVideoModal";
import KaraokePlayer from "@/components/shared/KaraokePlayer";
import BgmPlayer from "@/components/shared/BgmPlayer";
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
  Mic,
} from "lucide-react";

type MainTab = "all" | "edu" | "sing_en" | "sing_vi" | "favorites";

// Unified item type for the All Videos random feed
export type AllVideoItem =
  | { kind: "edu"; item: EducationalVideo; id: string }
  | { kind: "song_en"; item: Song; id: string }
  | { kind: "song_vi"; item: Song; id: string };

const allCombinedBaseItems: AllVideoItem[] = [
  ...educationalVideos.map((v) => ({ kind: "edu" as const, item: v, id: v.id })),
  ...songsEn.map((s) => ({ kind: "song_en" as const, item: s, id: s.id })),
  ...songsVi.map((s) => ({ kind: "song_vi" as const, item: s, id: s.id })),
];

// Deterministic round-robin interleave across channels for initial SSR render (with new videos prioritized first)
function getInterleavedEduVideos(): EducationalVideo[] {
  const channelNames = [
    "Danny Go!",
    "Wild Safari",
    "Ms Rachel",
    "Numberblocks",
    "Alphablocks",
    "Caitie's Classroom",
    "Super Simple",
    "Steve & Maggie",
    "SciShow Kids",
    "Oxford Phonics",
    "Gecko's Garage",
  ];

  const interleaveList = (list: EducationalVideo[]): EducationalVideo[] => {
    const queues = channelNames.map((c) =>
      list.filter((v) => v.channel === c)
    );
    const otherChannels = list.filter(
      (v) => !channelNames.includes(v.channel as any)
    );
    if (otherChannels.length > 0) queues.push(otherChannels);

    const res: EducationalVideo[] = [];
    let added = true;
    let round = 0;
    while (added) {
      added = false;
      for (const q of queues) {
        if (round < q.length) {
          res.push(q[round]);
          added = true;
        }
      }
      round++;
    }
    return res;
  };

  const newVideos = educationalVideos.filter((v) => v.isNew);
  const olderVideos = educationalVideos.filter((v) => !v.isNew);

  return [...interleaveList(newVideos), ...interleaveList(olderVideos)];
}

// Deterministic interleave for initial SSR render (prevents hydration mismatch, prioritizes new items)
function getInterleavedBaseItems(): AllVideoItem[] {
  const newItems = allCombinedBaseItems.filter((it) => (it.item as any).isNew);
  const oldItems = allCombinedBaseItems.filter((it) => !(it.item as any).isNew);
  return [...newItems, ...oldItems];
}

export interface EduFilterItem {
  id: string;
  name: string;
  emoji: string;
  count: number;
  type: "all" | "channel" | "category";
  target: string;
}

export const eduUnifiedFilters: EduFilterItem[] = [
  { id: "all", name: "Tất cả", emoji: "🌟", count: educationalVideos.length, type: "all", target: "all" },
  { id: "safari", name: "Safari 4K", emoji: "🦁", count: educationalVideos.filter(v => v.category === "safari").length, type: "category", target: "safari" },
  { id: "ms-rachel", name: "Ms Rachel", emoji: "👧", count: educationalVideos.filter(v => v.channel === "Ms Rachel").length, type: "channel", target: "Ms Rachel" },
  { id: "numberblocks", name: "Numberblocks", emoji: "🔢", count: educationalVideos.filter(v => v.channel === "Numberblocks").length, type: "channel", target: "Numberblocks" },
  { id: "alphablocks", name: "Alphablocks", emoji: "🔤", count: educationalVideos.filter(v => v.channel === "Alphablocks").length, type: "channel", target: "Alphablocks" },
  { id: "danny-go", name: "Danny Go! Nhảy", emoji: "🏃", count: educationalVideos.filter(v => v.channel === "Danny Go!").length, type: "channel", target: "Danny Go!" },
  { id: "speech", name: "Bé tập nói", emoji: "🗣️", count: educationalVideos.filter(v => v.category === "speech").length, type: "category", target: "speech" },
  { id: "caities-classroom", name: "Caitie's Class", emoji: "🎨", count: educationalVideos.filter(v => v.channel === "Caitie's Classroom").length, type: "channel", target: "Caitie's Classroom" },
  { id: "super-simple", name: "Super Simple", emoji: "🎵", count: educationalVideos.filter(v => v.channel === "Super Simple").length, type: "channel", target: "Super Simple" },
  { id: "math", name: "Đếm số 123", emoji: "🔢", count: educationalVideos.filter(v => v.category === "math").length, type: "category", target: "math" },
  { id: "geckos-garage", name: "Xe cộ Gecko", emoji: "🚗", count: educationalVideos.filter(v => v.channel === "Gecko's Garage").length, type: "channel", target: "Gecko's Garage" },
  { id: "scishow-kids", name: "Khoa học nhí", emoji: "🔬", count: educationalVideos.filter(v => v.channel === "SciShow Kids").length, type: "channel", target: "SciShow Kids" },
  { id: "phonics", name: "Chữ cái ABC", emoji: "🔤", count: educationalVideos.filter(v => v.category === "phonics").length, type: "category", target: "phonics" },
  { id: "steve-maggie", name: "Steve & Maggie", emoji: "🎩", count: educationalVideos.filter(v => v.channel === "Steve & Maggie").length, type: "channel", target: "Steve & Maggie" },
  { id: "oxford-phonics", name: "Oxford Phonics", emoji: "📖", count: educationalVideos.filter(v => v.channel === "Oxford Phonics").length, type: "channel", target: "Oxford Phonics" },
  { id: "habits", name: "Thói quen tốt", emoji: "💖", count: educationalVideos.filter(v => v.category === "habits").length, type: "category", target: "habits" },
];

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
  const [selectedEduFilter, setSelectedEduFilter] = useState("all");
  const [songEnTheme, setSongEnTheme] = useState("all");
  const [songViTheme, setSongViTheme] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [isListeningVoice, setIsListeningVoice] = useState(false);

  const handleStartVoiceSearch = useCallback(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setShowSearch(true);
      return;
    }
    try {
      playSFX("pop");
      const recognition = new SpeechRecognition();
      recognition.lang = "vi-VN";
      recognition.continuous = false;
      recognition.interimResults = false;
      setIsListeningVoice(true);

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        if (text) {
          playSFX("correct");
          setSearchQuery(text);
          setShowSearch(true);
        }
        setIsListeningVoice(false);
      };

      recognition.onerror = () => {
        setIsListeningVoice(false);
      };

      recognition.onend = () => {
        setIsListeningVoice(false);
      };

      recognition.start();
    } catch {
      setIsListeningVoice(false);
    }
  }, []);

  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeEduVideo, setActiveEduVideo] = useState<EducationalVideo | null>(null);
  const [activeSong, setActiveSong] = useState<Song | null>(null);
  const [visibleEduCount, setVisibleEduCount] = useState(24);
  const [visibleAllCount, setVisibleAllCount] = useState(24);
  const [visibleSingEnCount, setVisibleSingEnCount] = useState(24);
  const [visibleSingViCount, setVisibleSingViCount] = useState(24);
  const [shuffledAllVideos, setShuffledAllVideos] = useState<AllVideoItem[]>(() =>
    getInterleavedBaseItems()
  );
  const [isShuffling, setIsShuffling] = useState(false);
  const [shuffledEduVideos, setShuffledEduVideos] = useState<EducationalVideo[]>(() =>
    getInterleavedEduVideos()
  );
  const [isShufflingEdu, setIsShufflingEdu] = useState(false);

  // Shuffle all videos across entire library without topic grouping
  // Helper to shuffle an array using Fisher-Yates
  const shuffleArray = useCallback(<T,>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }, []);

  // Helper: Prioritize new educational videos at top, both pools randomized
  const shuffleEduWithNewPrioritized = useCallback(
    (videos: EducationalVideo[]): EducationalVideo[] => {
      const newVids = videos.filter((v) => v.isNew);
      const oldVids = videos.filter((v) => !v.isNew);
      return [...shuffleArray(newVids), ...shuffleArray(oldVids)];
    },
    [shuffleArray]
  );

  // Shuffle all videos across entire library: prioritize new items at top, both randomized
  const shuffleAllVideos = useCallback(() => {
    setIsShuffling(true);
    playSFX("pop");
    const newItems = allCombinedBaseItems.filter((it) => (it.item as any).isNew);
    const oldItems = allCombinedBaseItems.filter((it) => !(it.item as any).isNew);
    const result = [...shuffleArray(newItems), ...shuffleArray(oldItems)];
    setShuffledAllVideos(result);
    setVisibleAllCount(24);
    setTimeout(() => setIsShuffling(false), 350);
  }, [shuffleArray]);

  // Shuffle educational videos across all channels & topics (for "Tất cả" mode)
  // Prioritizes new videos at the top and randomizes them
  const shuffleEduVideos = useCallback(() => {
    setIsShufflingEdu(true);
    playSFX("pop");
    const result = shuffleEduWithNewPrioritized(educationalVideos);
    setShuffledEduVideos(result);
    setVisibleEduCount(24);
    setTimeout(() => setIsShufflingEdu(false), 350);
  }, [shuffleEduWithNewPrioritized]);

  // Quick play a random video or song
  const handlePlayRandomVideo = useCallback(() => {
    playSFX("cheer");
    const pool = shuffledAllVideos.length > 0 ? shuffledAllVideos : allCombinedBaseItems;
    const picked = pool[Math.floor(Math.random() * pool.length)];
    if (picked.kind === "edu") {
      setActiveEduVideo(picked.item);
    } else {
      setActiveSong(picked.item);
    }
  }, [shuffledAllVideos]);

  // Initial random shuffle on client mount so each session starts fresh & random with new videos prioritized at top
  useEffect(() => {
    const newItems = allCombinedBaseItems.filter((it) => (it.item as any).isNew);
    const oldItems = allCombinedBaseItems.filter((it) => !(it.item as any).isNew);
    setShuffledAllVideos([...shuffleArray(newItems), ...shuffleArray(oldItems)]);

    setShuffledEduVideos(shuffleEduWithNewPrioritized(educationalVideos));
  }, [shuffleArray, shuffleEduWithNewPrioritized]);

  // Reset pagination when filter, search query or tab changes
  useEffect(() => {
    setVisibleEduCount(24);
    setVisibleAllCount(24);
    setVisibleSingEnCount(24);
    setVisibleSingViCount(24);
  }, [selectedEduFilter, searchQuery, activeTab, songEnTheme, songViTheme]);

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
    // When viewing "Tất cả" (all channels), use the randomized list so videos aren't grouped by topic
    const sourceList = selectedEduFilter === "all" ? shuffledEduVideos : educationalVideos;

    return sourceList.filter((vid) => {
      if (selectedEduFilter !== "all") {
        const item = eduUnifiedFilters.find((f) => f.id === selectedEduFilter);
        if (item) {
          if (item.type === "channel" && vid.channel !== item.target) {
            return false;
          }
          if (item.type === "category" && vid.category !== item.target) {
            return false;
          }
        }
      }
      if (activeTab === "favorites" && !favorites.includes(vid.id)) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = vid.title.toLowerCase().includes(q);
        const matchesChannel = vid.channel.toLowerCase().includes(q);
        const matchesVocab = vid.keyVocab?.some(
          (v) => v.en.toLowerCase().includes(q) || v.vi.toLowerCase().includes(q)
        );
        return matchesTitle || matchesChannel || matchesVocab;
      }
      return true;
    });
  }, [shuffledEduVideos, selectedEduFilter, activeTab, favorites, searchQuery]);

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
    <div className="min-h-dvh w-full max-w-full overflow-x-hidden flex flex-col bg-[#F8FAFC]">
      {/* Active Educational Video Player Modal */}
      <AnimatePresence>
        {activeEduVideo && (
          <SafeVideoModal
            video={activeEduVideo}
            onClose={() => setActiveEduVideo(null)}
            isFavorite={favorites.includes(activeEduVideo.id)}
            onToggleFavorite={() => toggleFavorite(activeEduVideo.id)}
            onSelectVideo={(newVideo) => setActiveEduVideo(newVideo)}
            randomMode={
              activeTab === "all" ||
              (activeTab === "edu" && selectedEduFilter === "all")
            }
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
            randomMode={
              activeTab === "all" ||
              (activeTab === "sing_en" && songEnTheme === "all") ||
              (activeTab === "sing_vi" && songViTheme === "all")
            }
          />
        )}
      </AnimatePresence>

      {/* Top Header Bar */}
      <div className="pt-2 sm:pt-3 pb-1 px-3 sm:px-6 relative z-10 max-w-6xl mx-auto w-full flex items-center justify-between gap-2">
        <BackButton label="Home" />

        {/* YouTube Kids Brand Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black shadow-md shadow-red-500/20 tracking-wide select-none">
          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-xs">
            <Play size={11} className="text-red-600 fill-red-600 ml-0.5" />
          </div>
          <span className="font-extrabold text-[13px] tracking-tight">YouTube <span className="text-amber-300">Kids</span></span>
        </div>

        {/* Desktop / Tablet Search Input with Voice Search */}
        <div className="hidden md:flex items-center relative flex-1 max-w-xs mx-2">
          <Search size={14} className="absolute left-3 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm bài học, bài hát, nhân vật..."
            className="w-full pl-8 pr-16 py-1.5 text-xs rounded-full bg-white border border-gray-200 text-slate-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-xs"
          />
          <div className="absolute right-2 flex items-center gap-1">
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
                title="Xóa tìm kiếm"
              >
                <X size={12} />
              </button>
            )}
            <button
              onClick={handleStartVoiceSearch}
              className={`p-1 rounded-full transition-all cursor-pointer ${
                isListeningVoice
                  ? "bg-red-500 text-white animate-pulse"
                  : "bg-red-50 text-red-600 hover:bg-red-100"
              }`}
              title="Tìm kiếm bằng giọng nói"
            >
              <Mic size={13} />
            </button>
          </div>
        </div>

        {/* Right side controls: Mobile Voice & Search Toggle + BgmPlayer & Stars Counter */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Mobile Voice Search Mic */}
          <button
            onClick={handleStartVoiceSearch}
            className={`md:hidden p-1.5 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
              isListeningVoice
                ? "bg-red-500 text-white border-red-600 animate-pulse shadow-md"
                : "bg-red-50 text-red-600 border-red-200 shadow-xs"
            }`}
            title="Tìm kiếm bằng giọng nói"
          >
            <Mic size={15} />
          </button>

          <button
            onClick={() => setShowSearch((prev) => !prev)}
            className={`md:hidden p-1.5 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
              showSearch || searchQuery
                ? "bg-cyan-50 text-cyan-600 border-cyan-300"
                : "bg-white text-slate-600 border-slate-200 shadow-xs"
            }`}
            title="Tìm kiếm"
          >
            <Search size={15} />
          </button>

          <BgmPlayer />

          <div className="glass-card px-2.5 py-1 text-xs sm:text-sm font-bold flex items-center gap-1 shadow-xs border border-amber-200">
            <span>⭐</span>
            <span style={{ color: "var(--color-primary)", fontFamily: "var(--font-heading)" }}>
              {totalStars}
            </span>
          </div>
        </div>
      </div>

      {/* Voice Search Listening Modal */}
      <AnimatePresence>
        {isListeningVoice && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-xs w-full text-center shadow-2xl border-4 border-red-500 flex flex-col items-center"
            >
              <div className="relative my-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-60" />
                <div className="relative w-20 h-20 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-500/40">
                  <Mic size={38} className="animate-pulse" />
                </div>
              </div>
              <h3 className="text-lg font-black text-slate-800 mb-1">Đang nghe bé nói...</h3>
              <p className="text-xs text-slate-500 font-medium mb-4 leading-relaxed">
                Bé hãy nói tên bài học hoặc bài hát (ví dụ: &quot;Ms Rachel&quot;, &quot;Số đếm&quot;, &quot;Bé tập nhảy&quot;...)
              </p>
              <button
                onClick={() => setIsListeningVoice(false)}
                className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Search Input (collapsible) */}
      <AnimatePresence>
        {(showSearch || searchQuery) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden px-3 max-w-6xl mx-auto w-full relative z-10 mb-1.5 overflow-hidden"
          >
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm bài học, bài hát, nhân vật..."
                className="w-full pl-8 pr-16 py-1.5 text-xs rounded-full bg-white border border-gray-200 text-slate-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-xs"
              />
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setShowSearch(false);
                    }}
                    className="text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
                  >
                    <X size={13} />
                  </button>
                )}
                <button
                  onClick={handleStartVoiceSearch}
                  className="p-1 rounded-full bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer"
                  title="Nói để tìm kiếm"
                >
                  <Mic size={13} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Categories & Sub-Filters Header (Silky smooth 60fps) */}
      <div className="sticky top-0 z-20 bg-[#F8FAFC]/95 backdrop-blur-md pb-1.5 pt-1 border-b border-slate-200/50 shadow-xs">
        {/* Main Category Tabs - Compact, Single Horizontal Row (Never Wrap) */}
        <div className="px-3 sm:px-6 max-w-6xl mx-auto w-full relative z-10 mb-1.5">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 px-0.5 flex-nowrap smooth-horizontal-scroll">
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    playSFX("tap");
                    try { if (navigator.vibrate) navigator.vibrate(10); } catch {}
                    setActiveTab(tab.id);
                  }}
                  className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl flex items-center gap-1.5 sm:gap-2 shrink-0 transition-all font-bold cursor-pointer border ${
                    isSelected
                      ? `bg-gradient-to-r ${tab.bgGradient} text-white shadow-md ${tab.activeShadow} scale-102 border-transparent`
                      : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200/80 shadow-xs"
                  }`}
                  style={{ touchAction: "manipulation" }}
                >
                  <span className="text-base sm:text-lg drop-shadow-xs">{tab.emoji}</span>
                  <span className="text-xs sm:text-sm font-extrabold whitespace-nowrap" style={{ fontFamily: "var(--font-heading)" }}>
                    {tab.label}
                  </span>
                  <span
                    className={`text-[10px] sm:text-xs font-black px-1.5 py-0.2 rounded-full ${
                      isSelected ? "bg-white/30 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {tab.badge}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Sub-Filters Container - Compact, Single Horizontal Row */}
        <div className="px-3 sm:px-6 max-w-6xl mx-auto w-full relative z-10">
          {/* TAB: VIDEO BÉ HỌC Sub-filters */}
          {activeTab === "edu" && !searchQuery && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-0.5 flex-nowrap smooth-horizontal-scroll">
              {/* Quick Shuffle Button */}
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={shuffleEduVideos}
                className={`px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1 shrink-0 transition-all border cursor-pointer ${
                  isShufflingEdu
                    ? "bg-amber-500 text-white border-amber-600 shadow-xs animate-pulse"
                    : "bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-300 shadow-xs"
                }`}
                style={{ touchAction: "manipulation" }}
                title="Đổi thứ tự ngẫu nhiên toàn bộ video"
              >
                <Sparkles size={12} className={isShufflingEdu ? "animate-spin" : "text-amber-500"} />
                <span>{isShufflingEdu ? "Đang trộn..." : "🎲 Trộn"}</span>
              </motion.button>

              {eduUnifiedFilters.map((filter) => {
                const isSelected = selectedEduFilter === filter.id;
                return (
                  <motion.button
                    key={filter.id}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => {
                      playSFX("tap");
                      try { if (navigator.vibrate) navigator.vibrate(8); } catch {}
                      setSelectedEduFilter(filter.id);
                      if (filter.id === "all") {
                        shuffleEduVideos();
                      }
                    }}
                    className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 shrink-0 transition-all border cursor-pointer ${
                      isSelected
                        ? "bg-cyan-500 text-white border-cyan-500 shadow-xs shadow-cyan-500/30 scale-102"
                        : "bg-white text-slate-700 hover:bg-cyan-50/70 border-slate-200/90 shadow-xs"
                    }`}
                    style={{ touchAction: "manipulation" }}
                  >
                    <span className="text-sm">{filter.emoji}</span>
                    <span>{filter.name}</span>
                    <span
                      className={`text-[10px] font-bold px-1 py-0.2 rounded-full ${
                        isSelected ? "bg-white/25 text-white" : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {filter.count}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* TAB: TẤT CẢ Sub-filters / Actions */}
          {activeTab === "all" && !searchQuery && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-0.5 flex-nowrap smooth-horizontal-scroll">
              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={shuffleAllVideos}
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 shrink-0 transition-all border cursor-pointer ${
                  isShuffling
                    ? "bg-amber-500 text-white border-amber-600 shadow-xs animate-pulse"
                    : "bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-300 shadow-xs"
                }`}
                style={{ touchAction: "manipulation" }}
              >
                <Sparkles size={12} className={isShuffling ? "animate-spin" : "text-amber-500"} />
                <span>{isShuffling ? "Đang trộn..." : "🎲 Trộn ngẫu nhiên 534 video"}</span>
              </motion.button>
              <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">
                Tổng hợp Video Bé Học + Bài hát tiếng Anh & tiếng Việt
              </span>
            </div>
          )}

          {/* TAB: HÁT TIẾNG ANH Sub-filters */}
          {activeTab === "sing_en" && !searchQuery && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-0.5 flex-nowrap smooth-horizontal-scroll">
              {englishSongThemes.map((theme) => {
                const isSelected = songEnTheme === theme.id;
                return (
                  <motion.button
                    key={theme.id}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => {
                      playSFX("tap");
                      try { if (navigator.vibrate) navigator.vibrate(8); } catch {}
                      setSongEnTheme(theme.id);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 shrink-0 transition-all border cursor-pointer ${
                      isSelected
                        ? "bg-indigo-600 text-white border-indigo-700 shadow-xs shadow-indigo-500/30 scale-102"
                        : "bg-white text-gray-700 hover:bg-indigo-50 border-gray-200 shadow-xs"
                    }`}
                    style={{ touchAction: "manipulation" }}
                  >
                    <span className="text-sm">{theme.emoji}</span>
                    <span>{theme.label}</span>
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* TAB: BÀI HÁT VIỆT Sub-filters */}
          {activeTab === "sing_vi" && !searchQuery && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-0.5 flex-nowrap smooth-horizontal-scroll">
              {vietnameseSongThemes.map((theme) => {
                const isSelected = songViTheme === theme.id;
                return (
                  <motion.button
                    key={theme.id}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => {
                      playSFX("tap");
                      try { if (navigator.vibrate) navigator.vibrate(8); } catch {}
                      setSongViTheme(theme.id);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 shrink-0 transition-all border cursor-pointer ${
                      isSelected
                        ? "bg-rose-500 text-white border-rose-600 shadow-xs shadow-rose-500/30 scale-102"
                        : "bg-white text-gray-700 hover:bg-rose-50 border-gray-200 shadow-xs"
                    }`}
                    style={{ touchAction: "manipulation" }}
                  >
                    <span className="text-sm">{theme.emoji}</span>
                    <span>{theme.label}</span>
                  </motion.button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Content Section (Native window scrolling with hardware acceleration) */}
      <div className="flex-1 px-3 sm:px-6 pb-36 sm:pb-40 lg:pb-44 relative z-10 max-w-6xl mx-auto w-full">
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
            {/* TAB: TẤT CẢ (Feed Ngẫu Nhiên Toàn Bộ Video - Không Theo Chủ Đề) */}
            {activeTab === "all" && (
              <div className="space-y-5">
                {/* Control Banner for All Videos Random Mode */}
                <div className="rounded-3xl p-4 sm:p-5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 border border-amber-300/30">
                  <div className="flex items-center gap-3.5 text-center md:text-left">
                    <motion.div
                      animate={isShuffling ? { rotate: 360, scale: [1, 1.2, 1] } : { rotate: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner shrink-0"
                    >
                      🎲
                    </motion.div>
                    <div>
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <h2
                          className="text-base sm:text-lg font-extrabold leading-tight text-white drop-shadow-sm"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          Tất Cả Video & Bài Hát
                        </h2>
                        <span className="text-[11px] font-black bg-white/25 px-2 py-0.5 rounded-full">
                          {shuffledAllVideos.length} video
                        </span>
                      </div>
                      <p className="text-xs text-amber-50 font-medium mt-0.5">
                        Xáo trộn ngẫu nhiên tự do toàn bộ nội dung, không phân chia theo chủ đề
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
                    {/* Shuffle Button */}
                    <motion.button
                      whileTap={{ scale: 0.94 }}
                      onClick={shuffleAllVideos}
                      className="flex-1 md:flex-initial px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 border border-white/30 text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer select-none"
                      title="Trộn lại ngẫu nhiên toàn bộ danh sách"
                    >
                      <Sparkles size={16} />
                      <span>{isShuffling ? "Đang trộn..." : "Trộn ngẫu nhiên"}</span>
                    </motion.button>

                    {/* Quick Play Random Button */}
                    <motion.button
                      whileTap={{ scale: 0.94 }}
                      onClick={handlePlayRandomVideo}
                      className="flex-1 md:flex-initial px-4 sm:px-5 py-2.5 rounded-2xl bg-white text-slate-900 hover:bg-amber-50 text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer select-none"
                      title="Phát ngẫu nhiên 1 video hoặc bài hát bất kỳ"
                    >
                      <Play size={16} fill="#0f172a" />
                      <span>Phát ngẫu nhiên</span>
                    </motion.button>
                  </div>
                </div>

                {/* Unified Random Grid (Mixed Educational Videos and Songs) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {shuffledAllVideos.slice(0, visibleAllCount).map((entry) => {
                    if (entry.kind === "edu") {
                      return (
                        <EduVideoCard
                          key={entry.id}
                          video={entry.item}
                          isFavorite={favorites.includes(entry.id)}
                          onToggleFavorite={() => toggleFavorite(entry.id)}
                          onSelect={() => setActiveEduVideo(entry.item)}
                        />
                      );
                    }
                    if (entry.kind === "song_en") {
                      return (
                        <SongVideoCard
                          key={entry.id}
                          song={entry.item}
                          langLabel="🇬🇧 Tiếng Anh"
                          isFavorite={favorites.includes(entry.id)}
                          onToggleFavorite={() => toggleFavorite(entry.id)}
                          onSelect={() => setActiveSong(entry.item)}
                        />
                      );
                    }
                    return (
                      <SongVideoCard
                        key={entry.id}
                        song={entry.item}
                        langLabel="🇻🇳 Tiếng Việt"
                        isFavorite={favorites.includes(entry.id)}
                        onToggleFavorite={() => toggleFavorite(entry.id)}
                        onSelect={() => setActiveSong(entry.item)}
                      />
                    );
                  })}
                </div>

                {/* Load More Button for All Tab */}
                {visibleAllCount < shuffledAllVideos.length && (
                  <div className="mt-8 mb-6 sm:mb-8 flex flex-col items-center justify-center">
                    <button
                      onClick={() => {
                        playSFX("tap");
                        setVisibleAllCount((prev) => prev + 24);
                      }}
                      className="btn-3d btn-3d-primary px-6 py-3 text-sm font-extrabold flex items-center gap-2 shadow-lg"
                    >
                      <span>Xem thêm 24 video nữa</span>
                      <span className="bg-white/25 px-2 py-0.5 rounded-full text-xs">
                        (còn {shuffledAllVideos.length - visibleAllCount} video)
                      </span>
                      <ChevronRight size={16} />
                    </button>
                    <p className="text-xs text-gray-500 mt-2 font-medium">
                      Đang hiển thị {Math.min(visibleAllCount, shuffledAllVideos.length)} / {shuffledAllVideos.length} video ngẫu nhiên (chạy mát máy cho bé)
                    </p>
                  </div>
                )}
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
                        setSelectedEduFilter("all");
                      }}
                      className="mt-3 px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold shadow-md cursor-pointer"
                    >
                      Xem tất cả video học
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredEduVideos.slice(0, visibleEduCount).map((video) => (
                        <EduVideoCard
                          key={video.id}
                          video={video}
                          isFavorite={favorites.includes(video.id)}
                          onToggleFavorite={() => toggleFavorite(video.id)}
                          onSelect={() => setActiveEduVideo(video)}
                        />
                      ))}
                    </div>

                    {/* Load More Button - Reduces DOM & VRAM Load for Cool Tablet Experience */}
                    {visibleEduCount < filteredEduVideos.length && (
                      <div className="mt-8 mb-6 sm:mb-8 flex flex-col items-center justify-center">
                        <button
                          onClick={() => {
                            playSFX("tap");
                            setVisibleEduCount((prev) => prev + 24);
                          }}
                          className="btn-3d btn-3d-primary px-6 py-3 text-sm font-extrabold flex items-center gap-2 shadow-lg"
                        >
                          <span>Xem thêm 24 video nữa</span>
                          <span className="bg-white/25 px-2 py-0.5 rounded-full text-xs">
                            (còn {filteredEduVideos.length - visibleEduCount} video)
                          </span>
                          <ChevronRight size={16} />
                        </button>
                        <p className="text-xs text-gray-500 mt-2 font-medium">
                          Đang hiển thị {Math.min(visibleEduCount, filteredEduVideos.length)} / {filteredEduVideos.length} video (tối ưu mượt và mát máy cho bé)
                        </p>
                      </div>
                    )}
                  </>
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
                      className="mt-3 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md cursor-pointer"
                    >
                      Xem tất cả bài hát tiếng Anh
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredSongsEn.slice(0, visibleSingEnCount).map((song) => (
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

                    {visibleSingEnCount < filteredSongsEn.length && (
                      <div className="mt-8 mb-6 sm:mb-8 flex flex-col items-center justify-center">
                        <button
                          onClick={() => {
                            playSFX("tap");
                            setVisibleSingEnCount((prev) => prev + 24);
                          }}
                          className="btn-3d btn-3d-secondary px-6 py-3 text-sm font-extrabold flex items-center gap-2 shadow-lg"
                        >
                          <span>Xem thêm 24 bài hát nữa</span>
                          <span className="bg-white/25 px-2 py-0.5 rounded-full text-xs">
                            (còn {filteredSongsEn.length - visibleSingEnCount} bài)
                          </span>
                          <ChevronRight size={16} />
                        </button>
                        <p className="text-xs text-gray-500 mt-2 font-medium">
                          Đang hiển thị {Math.min(visibleSingEnCount, filteredSongsEn.length)} / {filteredSongsEn.length} bài hát
                        </p>
                      </div>
                    )}
                  </>
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
                      className="mt-3 px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-md cursor-pointer"
                    >
                      Xem tất cả bài hát Việt
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredSongsVi.slice(0, visibleSingViCount).map((song) => (
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

                    {visibleSingViCount < filteredSongsVi.length && (
                      <div className="mt-8 mb-6 sm:mb-8 flex flex-col items-center justify-center">
                        <button
                          onClick={() => {
                            playSFX("tap");
                            setVisibleSingViCount((prev) => prev + 24);
                          }}
                          className="btn-3d btn-3d-secondary px-6 py-3 text-sm font-extrabold flex items-center gap-2 shadow-lg"
                        >
                          <span>Xem thêm 24 bài hát nữa</span>
                          <span className="bg-white/25 px-2 py-0.5 rounded-full text-xs">
                            (còn {filteredSongsVi.length - visibleSingViCount} bài)
                          </span>
                          <ChevronRight size={16} />
                        </button>
                        <p className="text-xs text-gray-500 mt-2 font-medium">
                          Đang hiển thị {Math.min(visibleSingViCount, filteredSongsVi.length)} / {filteredSongsVi.length} bài hát
                        </p>
                      </div>
                    )}
                  </>
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

// Educational Video Card Component (Memoized for silky-smooth 60fps scrolling)
const EduVideoCard = memo(function EduVideoCard({
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
    <div
      style={{ contentVisibility: "auto", containIntrinsicSize: "0 340px" }}
      className="p-3 sm:p-4 flex flex-col justify-between hover:border-cyan-300 transition-all group shadow-md hover:shadow-xl rounded-3xl relative overflow-hidden bg-white border border-slate-100"
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
            try { if (navigator.vibrate) navigator.vibrate(10); } catch {}
            onSelect();
          }}
          className="relative h-36 sm:h-40 rounded-2xl overflow-hidden cursor-pointer group-hover:scale-[1.01] active:scale-[0.98] transition-transform flex flex-col justify-between p-3 shadow-inner"
          style={{
            touchAction: "manipulation",
            background: `linear-gradient(135deg, ${video.channelColor || "#0ea5e9"}dd, #0f172a)`
          }}
        >
          {!imgFailed && (
            <img
              src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
              alt={video.title}
              onError={() => setImgFailed(true)}
              decoding="async"
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
          <div className="relative z-10 flex items-center justify-between gap-1.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-white px-2 py-0.5 rounded-lg bg-black/80 border border-white/20 flex items-center gap-1 shadow-sm">
                <span>{video.categoryEmoji}</span>
                <span>{video.categoryNameVi}</span>
              </span>
              {video.isNew && (
                <span className="text-[10px] font-black text-amber-200 px-2 py-0.5 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 border border-amber-300/80 flex items-center gap-0.5 shadow-sm animate-pulse">
                  <Sparkles size={10} className="text-amber-300" />
                  <span>MỚI</span>
                </span>
              )}
            </div>

            <span className="text-[10px] font-semibold text-white px-2 py-0.5 rounded-lg bg-black/80 flex items-center gap-1 shadow-sm">
              <Clock size={11} />
              <span>{video.duration}</span>
            </span>
          </div>

          {/* Center Play Button */}
          <div className="relative z-10 self-center my-auto">
            <div className="w-12 h-12 rounded-full bg-cyan-500 text-white flex items-center justify-center shadow-[0_0_18px_rgba(6,182,212,0.6)] group-hover:scale-110 active:scale-95 transition-transform">
              <Play size={20} fill="white" className="ml-1" />
            </div>
          </div>

          {/* Bottom Badges */}
          <div className="relative z-10 flex items-center justify-between text-white/90 text-[10px]">
            <span className="font-bold text-yellow-300 flex items-center gap-1 drop-shadow">
              <Sparkles size={11} />
              Nhận +5 ⭐
            </span>
            <span className="font-bold bg-black/60 text-cyan-300 px-2 py-0.5 rounded-md border border-cyan-400/30">
              Xem an toàn ›
            </span>
          </div>
        </div>

        {/* Video Title */}
        <h3
          onClick={() => {
            playSFX("tap");
            try { if (navigator.vibrate) navigator.vibrate(10); } catch {}
            onSelect();
          }}
          className="font-bold text-xs sm:text-sm text-slate-800 mt-2.5 leading-snug line-clamp-2 cursor-pointer hover:text-cyan-600 active:text-cyan-700 transition-colors"
          style={{ fontFamily: "var(--font-heading)", touchAction: "manipulation" }}
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
            try { if (navigator.vibrate) navigator.vibrate(10); } catch {}
            onSelect();
          }}
          className="text-xs font-extrabold text-cyan-600 hover:text-cyan-700 shrink-0 flex items-center cursor-pointer active:scale-95 transition-transform"
          style={{ touchAction: "manipulation" }}
        >
          <span>Học ngay ›</span>
        </button>
      </div>
    </div>
  );
});

// Song Video Card Component (Memoized for silky-smooth 60fps scrolling)
const SongVideoCard = memo(function SongVideoCard({
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
    <div
      style={{ contentVisibility: "auto", containIntrinsicSize: "0 340px", touchAction: "manipulation" }}
      className="p-3 sm:p-4 flex flex-col justify-between hover:border-purple-300 transition-all group shadow-md hover:shadow-xl rounded-3xl relative overflow-hidden bg-white border border-slate-100"
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
                try { if (navigator.vibrate) navigator.vibrate(8); } catch {}
                onToggleFavorite();
              }}
              className="p-1 rounded-full text-gray-400 hover:text-red-500 transition-colors cursor-pointer active:scale-90"
              style={{ touchAction: "manipulation" }}
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
            try { if (navigator.vibrate) navigator.vibrate(10); } catch {}
            onSelect();
          }}
          className="relative h-36 sm:h-40 rounded-2xl overflow-hidden cursor-pointer group-hover:scale-[1.01] active:scale-[0.98] transition-transform bg-slate-900 flex flex-col justify-between p-3 shadow-inner"
          style={{ touchAction: "manipulation" }}
        >
          {thumbUrl ? (
            <img
              src={thumbUrl}
              alt={song.title}
              decoding="async"
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
            <span className="text-[10px] font-bold text-white px-2 py-0.5 rounded-lg bg-black/80 border border-white/20 flex items-center gap-1 shadow-sm">
              <span>🎵</span>
              <span>Có Lyric & Lời dịch</span>
            </span>

            <span className="text-[10px] font-semibold text-white px-2 py-0.5 rounded-lg bg-black/80 flex items-center gap-1 shadow-sm">
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
            <span className="font-bold text-yellow-300 flex items-center gap-1 drop-shadow">
              <Sparkles size={11} />
              Nhận +5 ⭐
            </span>
            <span className="font-bold bg-black/60 text-purple-300 px-2 py-0.5 rounded-md border border-purple-400/30">
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
    </div>
  );
});

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
