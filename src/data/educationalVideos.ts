export interface VideoVocab {
  en: string;
  vi: string;
  emoji?: string;
  phonetic?: string;
}

export interface EducationalVideo {
  id: string;
  title: string;
  channel: 
    | "Ms Rachel"
    | "Caitie's Classroom"
    | "Numberblocks"
    | "Alphablocks"
    | "Super Simple"
    | "Danny Go!"
    | "Steve & Maggie"
    | "Oxford Phonics"
    | "Wild Safari"
    | "SciShow Kids"
    | "Gecko's Garage";
  channelAvatar: string;
  channelColor: string;
  youtubeId: string;
  duration: string;
  category: "speech" | "phonics" | "math" | "movement" | "world" | "habits" | "safari" | "vehicles" | "science";
  categoryNameVi: string;
  categoryEmoji: string;
  recommendedAge: "0-3 tuổi" | "3-5 tuổi" | "4-6 tuổi" | "Mọi lứa tuổi";
  description: string;
  parentTip: string;
  keyVocab: VideoVocab[];
  isFeatured?: boolean;
}

export const educationalChannels = [
  {
    id: "all",
    name: "Tất cả",
    emoji: "⭐",
    description: "Toàn bộ video giáo dục tuyển chọn",
  },
  {
    id: "wild-safari",
    channelName: "Wild Safari",
    name: "Safari Động Vật",
    emoji: "🦁",
    color: "#D97706",
    description: "Động vật hoang dã 4K ngoài đời thật, trực quan sinh động, không thuyết minh",
  },
  {
    id: "ms-rachel",
    channelName: "Ms Rachel",
    name: "Ms Rachel",
    emoji: "👧",
    color: "#FF6B8B",
    description: "Phát triển ngôn ngữ sớm, tập nói & cử chỉ tay",
  },
  {
    id: "caities-classroom",
    channelName: "Caitie's Classroom",
    name: "Caitie's Class",
    emoji: "🎨",
    color: "#F59E0B",
    description: "Lớp học sáng tạo, khám phá và kỹ năng xã hội",
  },
  {
    id: "numberblocks",
    channelName: "Numberblocks",
    name: "Numberblocks",
    emoji: "🔢",
    color: "#EF4444",
    description: "Toán học trực quan, đếm số & tư duy logic",
  },
  {
    id: "alphablocks",
    channelName: "Alphablocks",
    name: "Alphablocks",
    emoji: "🔤",
    color: "#3B82F6",
    description: "Đánh vần Phonics, ghép âm & tập đọc tiếng Anh",
  },
  {
    id: "super-simple",
    channelName: "Super Simple",
    name: "Super Simple",
    emoji: "🎵",
    color: "#10B981",
    description: "Bài hát phát âm chuẩn, thói quen & cảm xúc",
  },
  {
    id: "danny-go",
    channelName: "Danny Go!",
    name: "Danny Go!",
    emoji: "🏃",
    color: "#8B5CF6",
    description: "Vận động thể chất, nhảy theo nhạc & Brain Break",
  },
  {
    id: "steve-maggie",
    channelName: "Steve & Maggie",
    name: "Steve & Maggie",
    emoji: "🎩",
    color: "#EC4899",
    description: "Phương pháp phản xạ TPR, tình huống sinh động",
  },
  {
    id: "scishow-kids",
    channelName: "SciShow Kids",
    name: "SciShow Kids",
    emoji: "🔬",
    color: "#06B6D4",
    description: "Khám phá khoa học, vũ trụ & hiện tượng tự nhiên thú vị",
  },
  {
    id: "oxford-phonics",
    channelName: "Oxford Phonics",
    name: "Oxford Phonics",
    emoji: "📖",
    color: "#06B6D4",
    description: "Ngữ âm chuẩn quốc tế Cambridge & Oxford",
  },
  {
    id: "geckos-garage",
    channelName: "Gecko's Garage",
    name: "Gecko's Garage",
    emoji: "🚗",
    color: "#F97316",
    description: "Xe cộ, gara sửa xe, xe cứu hoả cứu hộ vui nhộn",
  },
];

export const educationalCategories = [
  { id: "all", name: "Tất cả chủ đề", emoji: "🌟" },
  { id: "safari", name: "Động vật 4K", emoji: "🦁" },
  { id: "speech", name: "Bé tập nói", emoji: "🗣️" },
  { id: "phonics", name: "Chữ cái ABC", emoji: "🔤" },
  { id: "math", name: "Đếm số 123", emoji: "🔢" },
  { id: "movement", name: "Nhảy múa vui", emoji: "🏃" },
  { id: "vehicles", name: "Xe & Cứu hộ", emoji: "🚗" },
  { id: "science", name: "Khoa học nhí", emoji: "🔬" },
  { id: "world", name: "Khám phá", emoji: "🌍" },
  { id: "habits", name: "Thói quen tốt", emoji: "💖" },
];

import educationalVideosData from "./educationalVideos.json";

export const educationalVideos: EducationalVideo[] = educationalVideosData as EducationalVideo[];

export function getRecommendedVideos(
  currentVideo: EducationalVideo,
  count = 20,
  _randomMode = false
): EducationalVideo[] {
  const others = educationalVideos.filter((v) => v.id !== currentVideo.id);

  // Fisher-Yates shuffle helper
  const shuffle = <T>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  // 1. Lấy đúng 5 video cùng kênh (nếu kênh có ít hơn 5 thì lấy tối đa có thể)
  const sameChannelPool = shuffle(others.filter((v) => v.channel === currentVideo.channel));
  const sameChannelPicks = sameChannelPool.slice(0, 5);

  // 2. Lấy đúng 15 video ngẫu nhiên từ các kênh khác nhau trong kho video
  const otherChannelPool = shuffle(others.filter((v) => v.channel !== currentVideo.channel));
  const neededOthers = Math.max(0, count - sameChannelPicks.length);
  const otherPicks = otherChannelPool.slice(0, neededOthers);

  return [...sameChannelPicks, ...otherPicks];
}
